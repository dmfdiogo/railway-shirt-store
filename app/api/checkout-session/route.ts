import type Stripe from "stripe";
import { NextResponse } from "next/server";

import { auth, isAuthConfigured } from "@/lib/auth";
import {
  buildMelhorEnvioProductFromStripePrice,
  calculateMelhorEnvioShippingQuotes,
} from "@/lib/melhor-envio";
import prisma from "@/lib/prisma";
import {
  buildShippingSku,
  parseCheckoutShippingOption,
  resolveShippingOption,
  type CheckoutShippingOption,
  type ShippingRegionCode,
} from "@/lib/shipping";
import {
  consumeRateLimit,
  createRateLimitHeaders,
  getRateLimitIdentifier,
} from "@/lib/rate-limit";
import { getAppUrl, getStripeServerClient } from "@/lib/stripe";

export const runtime = "nodejs";

const DEFAULT_PRODUCT_NAME = "Beart Store Shirt";

type CheckoutLineInput = {
  priceId: string;
  quantity: number;
};

type CheckoutRequestInput = {
  checkoutLines: CheckoutLineInput[];
  fallbackShippingRegion: ShippingRegionCode | null;
  selectedShippingQuote: CheckoutShippingOption | null;
};

class CheckoutValidationError extends Error {}

function dedupeStrings(values: Array<string | null | undefined>) {
  return Array.from(new Set(values.map((value) => value?.trim()).filter(Boolean) as string[]));
}

function normalizeList(value: string | undefined) {
  return dedupeStrings((value ?? "").split(","));
}

function getMetadataValue(metadata: Record<string, string>, keys: string[]) {
  for (const key of keys) {
    const value = metadata[key]?.trim();
    if (value) return value;
  }

  return null;
}

function normalizeCategory(metadata: Record<string, string>) {
  const direct = getMetadataValue(metadata, ["category"]);
  if (direct) return direct;

  const first = normalizeList(metadata.categories)[0];
  return first ?? null;
}

function normalizeSeoTags(metadata: Record<string, string>) {
  return dedupeStrings([
    ...normalizeList(metadata.seo_tags),
    ...normalizeList(metadata.seoTags),
    ...normalizeList(metadata.seo_keywords),
    ...normalizeList(metadata.seoKeywords),
  ]);
}

function sanitizeFeatures(features: string[]) {
  return features.filter((feature) => {
    const normalized = feature.trim();
    if (!normalized) return false;
    if (/^feature\s*\d+$/i.test(normalized)) return false;
    if (/^test(e)?$/i.test(normalized)) return false;
    return true;
  });
}

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
  const metadata = rawProduct && !rawProduct.deleted ? ((rawProduct.metadata ?? {}) as Record<string, string>) : {};
  const stripeProductId = typeof price.product === "string" ? price.product : price.product.id;
  const productName = rawProduct && !rawProduct.deleted ? rawProduct.name : DEFAULT_PRODUCT_NAME;
  const productDescription = rawProduct && !rawProduct.deleted ? rawProduct.description : null;
  const productImage =
    rawProduct && !rawProduct.deleted && rawProduct.images.length > 0 ? rawProduct.images[0] : null;
  const sku = price.lookup_key ?? price.id;
  const variantName = price.nickname ?? productName;
  const marketingFeatures =
    rawProduct && !rawProduct.deleted
      ? sanitizeFeatures(rawProduct.marketing_features.map((feature) => feature.name ?? "").filter(Boolean))
      : [];

  return {
    currency: price.currency,
    category: normalizeCategory(metadata),
    colors: normalizeList(metadata.colors),
    marketingFeatures,
    ogImage: getMetadataValue(metadata, ["og_image", "ogImage"]) ?? productImage,
    productDescription,
    productActive: rawProduct && !rawProduct.deleted ? rawProduct.active : price.active,
    productImage,
    productName,
    seoDescription: getMetadataValue(metadata, ["seo_description", "seoDescription"]),
    seoTags: normalizeSeoTags(metadata),
    seoTitle: getMetadataValue(metadata, ["seo_title", "seoTitle"]),
    sizes: normalizeList(metadata.sizes),
    variantName,
    sku,
    stripeProductId,
    unitAmount: price.unit_amount,
  };
}

function buildOrderItemName(productName: string, variantName: string) {
  const normalizedProductName = productName.trim().toLowerCase();
  const normalizedVariantName = variantName.trim().toLowerCase();

  if (!normalizedVariantName || normalizedVariantName === normalizedProductName) {
    return productName;
  }

  if (normalizedVariantName.includes(normalizedProductName)) {
    return variantName;
  }

  return `${productName} · ${variantName}`;
}

function assertPriceIsCheckoutable(price: Stripe.Price) {
  if (!price.active) {
    throw new CheckoutValidationError("Este item nao esta mais disponivel para compra.");
  }

  const rawProduct = typeof price.product === "string" ? null : price.product;

  if (rawProduct?.deleted) {
    throw new CheckoutValidationError("Este item nao esta mais disponivel para compra.");
  }

  if (rawProduct && !rawProduct.active) {
    throw new CheckoutValidationError("Este item nao esta mais disponivel para compra.");
  }
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
  let fallbackShippingRegion: ShippingRegionCode | null = null;
  let selectedShippingQuote: CheckoutShippingOption | null = null;

  if (contentType.includes("application/x-www-form-urlencoded")) {
    const body = await request.formData();
    fallbackShippingRegion = resolveShippingOption(
      typeof body.get("shippingRegion") === "string" ? (body.get("shippingRegion") as string) : null
    ).code;
    selectedShippingQuote = parseCheckoutShippingOption(
      typeof body.get("shippingQuote") === "string" ? (body.get("shippingQuote") as string) : null
    );

    const cart = parseCartPayload(body.get("cart"));
    if (cart) return { checkoutLines: cart, fallbackShippingRegion, selectedShippingQuote };

    const priceId = typeof body.get("priceId") === "string" ? (body.get("priceId") as string) : null;
    const quantityValue = typeof body.get("quantity") === "string" ? Number(body.get("quantity")) : 1;
    const quantity = Number.isFinite(quantityValue) && quantityValue > 0 ? Math.floor(quantityValue) : 1;

    if (priceId) {
      return { checkoutLines: [{ priceId, quantity }], fallbackShippingRegion, selectedShippingQuote };
    }
  }

  return null;
}

async function ensureVariant(price: Stripe.Price) {
  const priceDetails = getPriceDetails(price);

  const product = await prisma.product.upsert({
    where: { stripeProductId: priceDetails.stripeProductId },
    update: {
      active: priceDetails.productActive,
      category: priceDetails.category,
      colors: priceDetails.colors,
      description: priceDetails.productDescription,
      image: priceDetails.productImage,
      marketingFeatures: priceDetails.marketingFeatures,
      name: priceDetails.productName,
      ogImage: priceDetails.ogImage,
      seoDescription: priceDetails.seoDescription,
      seoTags: priceDetails.seoTags,
      seoTitle: priceDetails.seoTitle,
      sizes: priceDetails.sizes,
    },
    create: {
      active: priceDetails.productActive,
      category: priceDetails.category,
      colors: priceDetails.colors,
      description: priceDetails.productDescription,
      image: priceDetails.productImage,
      marketingFeatures: priceDetails.marketingFeatures,
      name: priceDetails.productName,
      ogImage: priceDetails.ogImage,
      seoDescription: priceDetails.seoDescription,
      seoTags: priceDetails.seoTags,
      seoTitle: priceDetails.seoTitle,
      sizes: priceDetails.sizes,
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
    const rateLimit = consumeRateLimit({
      identifier: getRateLimitIdentifier(request),
      maxRequests: 12,
      namespace: "checkout-session",
      windowMs: 10 * 60 * 1000,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many checkout attempts. Please wait a moment and try again." },
        { status: 429, headers: createRateLimitHeaders(rateLimit) }
      );
    }

    const stripe = getStripeServerClient();
    const appUrl = getAppUrl(new URL(request.url).origin);
    const authSession = isAuthConfigured()
      ? await auth.api.getSession({ headers: request.headers }).catch(() => null)
      : null;

    const checkoutRequest = await resolveCheckoutRequest(request);
    if (!checkoutRequest || checkoutRequest.checkoutLines.length === 0) {
      return NextResponse.json({ error: "No checkout items provided." }, { status: 400 });
    }

    const { checkoutLines, fallbackShippingRegion, selectedShippingQuote } = checkoutRequest;

    const stripePrices = await Promise.all(
      checkoutLines.map((line) =>
        stripe.prices.retrieve(line.priceId, {
          expand: ["product"],
        })
      )
    );
    stripePrices.forEach(assertPriceIsCheckoutable);

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
        name: buildOrderItemName(priceDetails.productName, priceDetails.variantName),
        productVariantId: variant.id,
        quantity: line.quantity,
        sku: priceDetails.sku,
        stripePriceId: stripePrices[index].id,
        totalAmount,
        unitAmount: priceDetails.unitAmount,
      };
    });

    const subtotalAmount = orderItems.reduce((sum, item) => sum + item.totalAmount, 0);
    let shippingOption: CheckoutShippingOption = resolveShippingOption(fallbackShippingRegion);

    if (selectedShippingQuote?.source === "melhor_envio" && selectedShippingQuote.postalCode) {
      try {
        const quotedOptions = await calculateMelhorEnvioShippingQuotes({
          products: stripePrices.map((price, index) =>
            buildMelhorEnvioProductFromStripePrice(price, checkoutLines[index].quantity)
          ),
          toPostalCode: selectedShippingQuote.postalCode,
        });
        const matchedQuote = quotedOptions.find((option) => option.code === selectedShippingQuote.code);

        if (matchedQuote) {
          shippingOption = matchedQuote;
        }
      } catch {
        shippingOption = resolveShippingOption(fallbackShippingRegion);
      }
    }

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
        sku: buildShippingSku(shippingOption),
        stripePriceId: null,
        totalAmount: shippingAmount,
        unitAmount: shippingAmount,
      });
    }

    const order = await prisma.order.create({
      data: {
        currency,
        email: authSession?.user.email,
        shippingAmount,
        shippingCarrierName: shippingOption.carrierName,
        shippingDeliveryWindowLabel: shippingOption.deliveryWindowLabel,
        shippingPostalCode: shippingOption.postalCode,
        shippingRegion: fallbackShippingRegion,
        shippingServiceCode: shippingOption.code,
        shippingServiceName: shippingOption.serviceName ?? shippingOption.displayLabel,
        shippingSource: shippingOption.source,
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
        shippingCarrierName: shippingOption.carrierName ?? "",
        shippingPostalCode: shippingOption.postalCode ?? "",
        shippingRegion: fallbackShippingRegion ?? "",
        shippingServiceCode: shippingOption.code,
        shippingServiceName: shippingOption.serviceName ?? shippingOption.displayLabel,
        shippingSource: shippingOption.source,
        source: "beart-store",
        userId: authSession?.user.id ?? "",
      },
    });

    if (!session.url) {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          canceledAt: new Date(),
          fulfillmentStatus: "canceled",
          paymentStatus: "canceled",
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
        paymentStatus: "checkout_open",
        stripeCheckoutSessionId: session.id,
      },
    });

    const response = NextResponse.redirect(session.url, 303);
    const rateLimitHeaders = createRateLimitHeaders(rateLimit);
    rateLimitHeaders.forEach((value, key) => {
      response.headers.set(key, value);
    });

    return response;
  } catch (error) {
    if (error instanceof CheckoutValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const message =
      error instanceof Error ? error.message : "Unable to create Stripe checkout session.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}