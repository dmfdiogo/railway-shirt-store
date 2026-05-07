import type Stripe from "stripe";
import { NextResponse } from "next/server";

import { auth, isAuthConfigured } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { resolveShippingOption } from "@/lib/shipping";
import { getAppUrl, getStripeServerClient } from "@/lib/stripe";

export const runtime = "nodejs";

const DEFAULT_PRODUCT_NAME = "Beart Store Shirt";

type CheckoutLineInput = {
  priceId: string;
  quantity: number;
};

type CheckoutRequestInput = {
  checkoutLines: CheckoutLineInput[];
  shippingOption: ReturnType<typeof resolveShippingOption>;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function getPriceDetails(price: Stripe.Price) {
  if (price.unit_amount === null) {
    throw new Error("Stripe price must define unit_amount for checkout.");
  }

  const rawProduct = typeof price.product === "string" ? null : price.product;
  const stripeProductId = typeof price.product === "string" ? price.product : price.product.id;
  const productName = rawProduct && !rawProduct.deleted ? rawProduct.name : DEFAULT_PRODUCT_NAME;
  const productDescription = rawProduct && !rawProduct.deleted ? rawProduct.description : null;
  const productImage =
    rawProduct && !rawProduct.deleted && rawProduct.images.length > 0 ? rawProduct.images[0] : null;
  const sku = price.lookup_key ?? price.id;
  const variantName = price.nickname ?? productName;
  const marketingFeatures =
    rawProduct && !rawProduct.deleted
      ? rawProduct.marketing_features.map((feature) => feature.name ?? "").filter(Boolean)
      : [];

  return {
    currency: price.currency,
    marketingFeatures,
    productDescription,
    productImage,
    productName,
    variantName,
    sku,
    stripeProductId,
    unitAmount: price.unit_amount,
  };
}

function parseCartPayload(value: FormDataEntryValue | null): CheckoutLineInput[] | null {
  if (typeof value !== "string" || !value.trim()) return null;

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return null;

    const normalized = parsed
      .map((entry) => {
        if (!entry || typeof entry !== "object") return null;
        const candidate = entry as { priceId?: unknown; quantity?: unknown };
        if (typeof candidate.priceId !== "string") return null;

        const quantity =
          typeof candidate.quantity === "number" && candidate.quantity > 0
            ? Math.floor(candidate.quantity)
            : 1;

        return { priceId: candidate.priceId, quantity };
      })
      .filter(Boolean) as CheckoutLineInput[];

    if (normalized.length === 0) return null;

    const merged = new Map<string, number>();
    for (const item of normalized) {
      merged.set(item.priceId, (merged.get(item.priceId) ?? 0) + item.quantity);
    }

    return Array.from(merged.entries()).map(([priceId, quantity]) => ({ priceId, quantity }));
  } catch {
    return null;
  }
}

async function resolveCheckoutRequest(request: Request): Promise<CheckoutRequestInput | null> {
  const contentType = request.headers.get("content-type") ?? "";
  let shippingOption = resolveShippingOption();

  if (contentType.includes("application/x-www-form-urlencoded")) {
    const body = await request.formData();
    shippingOption = resolveShippingOption(
      typeof body.get("shippingRegion") === "string" ? (body.get("shippingRegion") as string) : null
    );

    const cart = parseCartPayload(body.get("cart"));
    if (cart) return { checkoutLines: cart, shippingOption };

    const priceId = typeof body.get("priceId") === "string" ? (body.get("priceId") as string) : null;
    const quantityValue = typeof body.get("quantity") === "string" ? Number(body.get("quantity")) : 1;
    const quantity = Number.isFinite(quantityValue) && quantityValue > 0 ? Math.floor(quantityValue) : 1;

    if (priceId) {
      return { checkoutLines: [{ priceId, quantity }], shippingOption };
    }
  }

  if (process.env.STRIPE_PRICE_ID) {
    return {
      checkoutLines: [{ priceId: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      shippingOption,
    };
  }

  return null;
}

async function ensureVariant(price: Stripe.Price) {
  const priceDetails = getPriceDetails(price);

  const product = await prisma.product.upsert({
    where: { stripeProductId: priceDetails.stripeProductId },
    update: {
      active: price.active,
      description: priceDetails.productDescription,
      image: priceDetails.productImage,
      marketingFeatures: priceDetails.marketingFeatures,
      name: priceDetails.productName,
    },
    create: {
      active: price.active,
      description: priceDetails.productDescription,
      image: priceDetails.productImage,
      marketingFeatures: priceDetails.marketingFeatures,
      name: priceDetails.productName,
      slug: slugify(`${priceDetails.productName}-${priceDetails.stripeProductId}`),
      stripeProductId: priceDetails.stripeProductId,
    },
  });

  const variant = await prisma.productVariant.upsert({
    where: { stripePriceId: price.id },
    update: {
      active: price.active,
      currency: priceDetails.currency,
      name: priceDetails.variantName,
      productId: product.id,
      sku: priceDetails.sku,
      unitAmount: priceDetails.unitAmount,
    },
    create: {
      active: price.active,
      currency: priceDetails.currency,
      name: priceDetails.variantName,
      productId: product.id,
      sku: priceDetails.sku,
      stripePriceId: price.id,
      unitAmount: priceDetails.unitAmount,
    },
  });

  return { priceDetails, variant };
}

export async function POST(request: Request) {
  try {
    const stripe = getStripeServerClient();
    const appUrl = getAppUrl(new URL(request.url).origin);
    const authSession = isAuthConfigured()
      ? await auth.api.getSession({ headers: request.headers }).catch(() => null)
      : null;

    const checkoutRequest = await resolveCheckoutRequest(request);
    if (!checkoutRequest || checkoutRequest.checkoutLines.length === 0) {
      return NextResponse.json({ error: "No checkout items provided." }, { status: 400 });
    }

    const { checkoutLines, shippingOption } = checkoutRequest;

    const stripePrices = await Promise.all(
      checkoutLines.map((line) =>
        stripe.prices.retrieve(line.priceId, {
          expand: ["product"],
        })
      )
    );

    const resolved = await Promise.all(stripePrices.map((price) => ensureVariant(price)));
    const currencies = new Set(resolved.map(({ priceDetails }) => priceDetails.currency));

    if (currencies.size > 1) {
      return NextResponse.json(
        { error: "O carrinho mistura moedas diferentes, o que não é suportado." },
        { status: 400 }
      );
    }

    const stripeCustomer = authSession?.user.id
      ? await prisma.stripeCustomer.findFirst({
          where: {
            OR: [{ userId: authSession.user.id }, { email: authSession.user.email }],
          },
          select: { stripeCustomerId: true },
        })
      : null;

    const orderItems: Array<{
      name: string;
      productVariantId: string | null;
      quantity: number;
      sku: string | null;
      stripePriceId: string | null;
      totalAmount: number;
      unitAmount: number;
    }> = resolved.map(({ priceDetails, variant }, index) => {
      const line = checkoutLines[index];
      const totalAmount = priceDetails.unitAmount * line.quantity;

      return {
        name: priceDetails.variantName,
        productVariantId: variant.id,
        quantity: line.quantity,
        sku: priceDetails.sku,
        stripePriceId: stripePrices[index].id,
        totalAmount,
        unitAmount: priceDetails.unitAmount,
      };
    });

    const subtotalAmount = orderItems.reduce((sum, item) => sum + item.totalAmount, 0);
    const shippingAmount = shippingOption.amount;
    const totalAmount = subtotalAmount + shippingAmount;
    const currency = resolved[0]?.priceDetails.currency;

    if (!currency) {
      return NextResponse.json({ error: "Unable to resolve checkout currency." }, { status: 500 });
    }

    if (shippingAmount > 0) {
      orderItems.push({
        name: shippingOption.orderLineLabel,
        productVariantId: null,
        quantity: 1,
        sku: `shipping:${shippingOption.code}`,
        stripePriceId: null,
        totalAmount: shippingAmount,
        unitAmount: shippingAmount,
      });
    }

    const order = await prisma.order.create({
      data: {
        currency,
        email: authSession?.user.email,
        subtotalAmount,
        totalAmount,
        userId: authSession?.user.id,
        items: {
          create: orderItems,
        },
      },
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: checkoutLines.map((line) => ({
        price: line.priceId,
        quantity: line.quantity,
      })),
      client_reference_id: order.id,
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      billing_address_collection: "auto",
      allow_promotion_codes: true,
      shipping_address_collection: {
        allowed_countries: ["BR"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: shippingOption.checkoutLabel,
            fixed_amount: {
              amount: shippingAmount,
              currency,
            },
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: shippingOption.minimumBusinessDays,
              },
              maximum: {
                unit: "business_day",
                value: shippingOption.maximumBusinessDays,
              },
            },
          },
        },
      ],
      customer: stripeCustomer?.stripeCustomerId,
      customer_email: stripeCustomer ? undefined : authSession?.user.email,
      metadata: {
        cartSize: String(checkoutLines.length),
        orderId: order.id,
        shippingAmount: String(shippingAmount),
        shippingRegion: shippingOption.code,
        source: "beart-store",
        userId: authSession?.user.id ?? "",
      },
    });

    if (!session.url) {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          canceledAt: new Date(),
          status: "canceled",
        },
      });

      return NextResponse.json(
        { error: "Stripe did not return a checkout URL." },
        { status: 500 }
      );
    }

    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: "checkout_open",
        stripeCheckoutSessionId: session.id,
      },
    });

    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to create Stripe checkout session.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}