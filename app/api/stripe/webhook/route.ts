import Stripe from "stripe";

import { sendOrderConfirmationEmail } from "@/lib/email";
import prisma from "@/lib/prisma";
import {
  getStripeServerClient,
  getStripeWebhookSecret,
} from "@/lib/stripe";

export const runtime = "nodejs";

const CHECKOUT_SESSION_TERMINAL_EVENTS = new Set([
  "checkout.session.async_payment_failed",
  "checkout.session.async_payment_succeeded",
  "checkout.session.completed",
  "checkout.session.expired",
]);

function isPaidCheckoutSession(session: Stripe.Checkout.Session, eventType: Stripe.Event.Type) {
  return (
    eventType === "checkout.session.async_payment_succeeded" ||
    ((eventType === "checkout.session.completed") &&
      (session.payment_status === "paid" || session.payment_status === "no_payment_required"))
  );
}

function isCanceledCheckoutSessionEvent(eventType: Stripe.Event.Type) {
  return (
    eventType === "checkout.session.async_payment_failed" ||
    eventType === "checkout.session.expired"
  );
}

function getCheckoutOrderId(session: Stripe.Checkout.Session) {
  return session.metadata?.orderId ?? session.client_reference_id ?? null;
}

async function persistWebhookEvent(
  event: Stripe.Event,
  session?: Stripe.Checkout.Session,
): Promise<{ confirmationEmail: { to: string; orderId: string } | null }> {
  const eventAlreadyPersisted = await prisma.webhookEvent.findUnique({
    where: { stripeEventId: event.id },
    select: { id: true },
  });
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
          select: {
            fulfillmentStatus: true,
            id: true,
            paymentStatus: true,
            userId: true,
          },
        })
      : null;

    if (session && order) {
      if (isPaidCheckoutSession(session, event.type)) {
        const shouldSendConfirmationEmail = !eventAlreadyPersisted && order.paymentStatus !== "paid";

        await tx.order.update({
          where: { id: order.id },
          data: {
            canceledAt: null,
            completedAt: order.paymentStatus === "paid" ? undefined : new Date(),
            email: customerEmail ?? undefined,
            fulfillmentStatus:
              order.fulfillmentStatus === "pending" || order.fulfillmentStatus === "canceled"
                ? "processing"
                : undefined,
            paymentStatus: "paid",
            processingAt:
              order.fulfillmentStatus === "pending" || order.fulfillmentStatus === "canceled"
                ? new Date()
                : undefined,
            stripeCheckoutSessionId: session.id,
            stripeCustomerId: stripeCustomerId ?? undefined,
            stripePaymentIntentId: stripePaymentIntentId ?? undefined,
          },
        });

        if (shouldSendConfirmationEmail && customerEmail) {
          confirmationEmail = { to: customerEmail, orderId: order.id };
        }
      }

      if (
        isCanceledCheckoutSessionEvent(event.type) &&
        order.paymentStatus !== "paid" &&
        order.paymentStatus !== "canceled" &&
        order.paymentStatus !== "refunded"
      ) {
        await tx.order.update({
          where: { id: order.id },
          data: {
            canceledAt: new Date(),
            fulfillmentStatus: "canceled",
            paymentStatus: "canceled",
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

    if (!eventAlreadyPersisted) {
      await tx.webhookEvent.create({
        data: {
          orderId: order?.id,
          payload,
          stripeEventId: event.id,
          type: event.type,
        },
      });
    } else {
      await tx.webhookEvent.update({
        where: { stripeEventId: event.id },
        data: {
          orderId: order?.id,
          payload,
          type: event.type,
        },
      });
    }
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

    if (CHECKOUT_SESSION_TERMINAL_EVENTS.has(event.type)) {
      const session = event.data.object as Stripe.Checkout.Session;

      const { confirmationEmail } = await persistWebhookEvent(event, session);

      console.log(event.type, {
        orderId: getCheckoutOrderId(session),
        sessionId: session.id,
        customerEmail: session.customer_details?.email ?? null,
        amountTotal: session.amount_total,
        currency: session.currency,
        paymentStatus: session.payment_status,
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