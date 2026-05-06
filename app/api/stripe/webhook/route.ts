import Stripe from "stripe";

import { sendOrderConfirmationEmail } from "@/lib/email";
import prisma from "@/lib/prisma";
import {
  getStripeServerClient,
  getStripeWebhookSecret,
} from "@/lib/stripe";

export const runtime = "nodejs";

function getCheckoutOrderId(session: Stripe.Checkout.Session) {
  return session.metadata?.orderId ?? session.client_reference_id ?? null;
}

async function persistWebhookEvent(
  event: Stripe.Event,
  session?: Stripe.Checkout.Session,
): Promise<{ confirmationEmail: { to: string; orderId: string } | null }> {
  const payload = JSON.parse(JSON.stringify(event.data.object));
  const stripeCustomerId =
    session?.customer && typeof session.customer === "string"
      ? session.customer
      : null;
  const stripePaymentIntentId =
    session?.payment_intent && typeof session.payment_intent === "string"
      ? session.payment_intent
      : null;
  const customerEmail =
    session?.customer_details?.email ??
    session?.customer_email ??
    null;

  let confirmationEmail: { to: string; orderId: string } | null = null;

  await prisma.$transaction(async (tx) => {
    const requestedOrderId = session ? getCheckoutOrderId(session) : null;
    const order = requestedOrderId
      ? await tx.order.findUnique({
          where: { id: requestedOrderId },
          select: { id: true, userId: true },
        })
      : null;

    if (session && order) {
      if (event.type === "checkout.session.completed") {
        await tx.order.update({
          where: { id: order.id },
          data: {
            completedAt: new Date(),
            email: customerEmail ?? undefined,
            status: "paid",
            stripeCheckoutSessionId: session.id,
            stripeCustomerId: stripeCustomerId ?? undefined,
            stripePaymentIntentId: stripePaymentIntentId ?? undefined,
          },
        });

        if (customerEmail) {
          confirmationEmail = { to: customerEmail, orderId: order.id };
        }
      }

      if (event.type === "checkout.session.expired") {
        await tx.order.update({
          where: { id: order.id },
          data: {
            canceledAt: new Date(),
            status: "canceled",
            stripeCheckoutSessionId: session.id,
          },
        });
      }
    }

    if (stripeCustomerId && (customerEmail || order?.userId)) {
      await tx.stripeCustomer.upsert({
        where: { stripeCustomerId },
        update: {
          email: customerEmail ?? undefined,
          userId: order?.userId ?? undefined,
        },
        create: {
          email: customerEmail ?? undefined,
          stripeCustomerId,
          userId: order?.userId ?? undefined,
        },
      });
    }

    await tx.webhookEvent.upsert({
      where: { stripeEventId: event.id },
      update: {
        orderId: order?.id,
        payload,
        type: event.type,
      },
      create: {
        orderId: order?.id,
        payload,
        stripeEventId: event.id,
        type: event.type,
      },
    });
  });

  return { confirmationEmail };
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return new Response("Missing Stripe signature.", { status: 400 });
  }

  const payload = await request.text();

  try {
    const stripe = getStripeServerClient();
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      getStripeWebhookSecret(),
    );

    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.expired"
    ) {
      const session = event.data.object as Stripe.Checkout.Session;

      const { confirmationEmail } = await persistWebhookEvent(event, session);

      console.log(event.type, {
        orderId: getCheckoutOrderId(session),
        sessionId: session.id,
        customerEmail: session.customer_details?.email ?? null,
        amountTotal: session.amount_total,
        currency: session.currency,
      });

      if (confirmationEmail) {
        try {
          const order = await prisma.order.findUnique({
            where: { id: confirmationEmail.orderId },
            select: {
              totalAmount: true,
              currency: true,
              items: {
                select: {
                  name: true,
                  quantity: true,
                  unitAmount: true,
                  totalAmount: true,
                },
              },
            },
          });

          if (order) {
            await sendOrderConfirmationEmail({
              to: confirmationEmail.to,
              orderId: confirmationEmail.orderId,
              items: order.items,
              totalAmount: order.totalAmount,
              currency: order.currency,
            });
            console.log("order confirmation email sent", { to: confirmationEmail.to });
          }
        } catch (emailError) {
          // Do not fail the webhook if the email fails — Stripe should not retry.
          console.error("Failed to send order confirmation email", emailError);
        }
      }
    } else {
      await persistWebhookEvent(event);
    }

    return Response.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid Stripe webhook payload.";

    return new Response(message, { status: 400 });
  }
}