import type Stripe from "stripe";
import { NextResponse } from "next/server";

import { auth, isAuthConfigured } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getAppUrl, getStripeServerClient } from "@/lib/stripe";

export const runtime = "nodejs";

const CHECKOUT_QUANTITY = 1;
const DEFAULT_PRODUCT_NAME = "Beart Store Shirt";

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
    rawProduct && !rawProduct.deleted && rawProduct.images.length > 0
      ? rawProduct.images[0]
      : null;
  const sku = price.lookup_key ?? price.id;
  // Use nickname as the variant label (e.g. "P", "M", "G/GG", "Edição Limitada").
  // Falls back to the product name when no nickname is set.
  const variantName = price.nickname ?? productName;
  const marketingFeatures =
    rawProduct && !rawProduct.deleted
      ? rawProduct.marketing_features.map((f) => f.name ?? "").filter(Boolean)
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

export async function POST(request: Request) {
  try {
    const stripe = getStripeServerClient();
    const appUrl = getAppUrl(new URL(request.url).origin);
    const authSession = isAuthConfigured()
      ? await auth.api.getSession({ headers: request.headers }).catch(() => null)
      : null;

    // Accept priceId from form body; fall back to STRIPE_PRICE_ID env var.
    const contentType = request.headers.get("content-type") ?? "";
    let priceId: string | null = null;
    if (contentType.includes("application/x-www-form-urlencoded")) {
      const body = await request.formData();
      priceId = (body.get("priceId") as string | null) ?? null;
    }
    if (!priceId) {
      priceId = process.env.STRIPE_PRICE_ID ?? null;
    }
    if (!priceId) {
      return NextResponse.json({ error: "No priceId provided." }, { status: 400 });
    }

    const stripePrice = await stripe.prices.retrieve(priceId, {
      expand: ["product"],
    });
    const priceDetails = getPriceDetails(stripePrice);
    const stripeCustomer = authSession?.user.id
      ? await prisma.stripeCustomer.findFirst({
          where: {
            OR: [
              { userId: authSession.user.id },
              { email: authSession.user.email },
            ],
          },
          select: {
            stripeCustomerId: true,
          },
        })
      : null;
    const product = await prisma.product.upsert({
      where: {
        stripeProductId: priceDetails.stripeProductId,
      },
      update: {
        active: stripePrice.active,
        description: priceDetails.productDescription,
        image: priceDetails.productImage,
        marketingFeatures: priceDetails.marketingFeatures,
        name: priceDetails.productName,
      },
      create: {
        active: stripePrice.active,
        description: priceDetails.productDescription,
        image: priceDetails.productImage,
        marketingFeatures: priceDetails.marketingFeatures,
        name: priceDetails.productName,
        slug: slugify(`${priceDetails.productName}-${priceDetails.stripeProductId}`),
        stripeProductId: priceDetails.stripeProductId,
      },
    });
    const variant = await prisma.productVariant.upsert({
      where: {
        stripePriceId: stripePrice.id,
      },
      update: {
        active: stripePrice.active,
        currency: priceDetails.currency,
        name: priceDetails.variantName,
        productId: product.id,
        sku: priceDetails.sku,
        unitAmount: priceDetails.unitAmount,
      },
      create: {
        active: stripePrice.active,
        currency: priceDetails.currency,
        name: priceDetails.variantName,
        productId: product.id,
        sku: priceDetails.sku,
        stripePriceId: stripePrice.id,
        unitAmount: priceDetails.unitAmount,
      },
    });
    const totalAmount = priceDetails.unitAmount * CHECKOUT_QUANTITY;
    const order = await prisma.order.create({
      data: {
        currency: priceDetails.currency,
        email: authSession?.user.email,
        subtotalAmount: totalAmount,
        totalAmount,
        userId: authSession?.user.id,
        items: {
          create: {
            name: priceDetails.variantName,
            productVariantId: variant.id,
            quantity: CHECKOUT_QUANTITY,
            sku: priceDetails.sku,
            stripePriceId: stripePrice.id,
            totalAmount,
            unitAmount: priceDetails.unitAmount,
          },
        },
      },
    });
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: CHECKOUT_QUANTITY,
        },
      ],
      client_reference_id: order.id,
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/cancel`,
      billing_address_collection: "auto",
      allow_promotion_codes: true,
      customer: stripeCustomer?.stripeCustomerId,
      customer_email: stripeCustomer ? undefined : authSession?.user.email,
      metadata: {
        orderId: order.id,
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
        { status: 500 },
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
    const message = error instanceof Error ? error.message : "Unable to create Stripe checkout session.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}