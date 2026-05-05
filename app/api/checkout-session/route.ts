import { NextResponse } from "next/server";

import { getAppUrl, getStripePriceId, getStripeServerClient } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const stripe = getStripeServerClient();
    const appUrl = getAppUrl(new URL(request.url).origin);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: getStripePriceId(),
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/cancel`,
      billing_address_collection: "auto",
      allow_promotion_codes: true,
      metadata: {
        source: "railway-shirt-store",
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL." },
        { status: 500 },
      );
    }

    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create Stripe checkout session.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}