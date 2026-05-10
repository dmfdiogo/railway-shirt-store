import { NextResponse } from "next/server";

import { auth, isAuthConfigured } from "@/lib/auth";
import { canManageOrders } from "@/lib/orders";
import prisma from "@/lib/prisma";
import {
  consumeRateLimit,
  createRateLimitHeaders,
  getRateLimitIdentifier,
} from "@/lib/rate-limit";

type LookupField = "orderId" | "checkoutSessionId" | "paymentIntentId";

function maskEmail(email: string | null) {
  if (!email) {
    return null;
  }

  const [localPart, domain] = email.split("@");

  if (!localPart || !domain) {
    return "***";
  }

  const visibleLocal = localPart.slice(0, 2);

  return `${visibleLocal}${"*".repeat(Math.max(3, localPart.length - visibleLocal.length))}@${domain}`;
}

function getLookup(searchParams: URLSearchParams) {
  const entries = [
    ["orderId", searchParams.get("orderId")],
    ["checkoutSessionId", searchParams.get("checkoutSessionId")],
    ["paymentIntentId", searchParams.get("paymentIntentId")],
  ].filter((entry): entry is [LookupField, string] => typeof entry[1] === "string" && entry[1].trim().length > 0);

  if (entries.length !== 1) {
    return null;
  }

  const [field, value] = entries[0];

  return {
    field,
    value: value.trim(),
  };
}

function jsonWithHeaders(body: unknown, init?: ResponseInit) {
  const response = NextResponse.json(body, init);
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export async function GET(request: Request) {
  if (!isAuthConfigured()) {
    return new NextResponse(null, { status: 404 });
  }

  const session = await auth.api.getSession({ headers: request.headers }).catch(() => null);

  if (!session || !canManageOrders(session.user.email)) {
    return new NextResponse(null, { status: 404 });
  }

  const rateLimitResult = consumeRateLimit({
    identifier: session.user.email?.trim().toLowerCase() || getRateLimitIdentifier(request),
    maxRequests: 30,
    namespace: "internal-order-verify",
    windowMs: 5 * 60 * 1000,
  });
  const rateLimitHeaders = createRateLimitHeaders(rateLimitResult);

  if (!rateLimitResult.allowed) {
    return jsonWithHeaders(
      { error: "Muitas consultas operacionais em pouco tempo. Tente novamente em instantes." },
      { headers: rateLimitHeaders, status: 429 }
    );
  }

  const { searchParams } = new URL(request.url);
  const lookup = getLookup(searchParams);

  if (!lookup) {
    return jsonWithHeaders(
      {
        error:
          "Informe exatamente um identificador: orderId, checkoutSessionId ou paymentIntentId.",
      },
      { headers: rateLimitHeaders, status: 400 }
    );
  }

  const order = await prisma.order.findUnique({
    where:
      lookup.field === "orderId"
        ? { id: lookup.value }
        : lookup.field === "checkoutSessionId"
          ? { stripeCheckoutSessionId: lookup.value }
          : { stripePaymentIntentId: lookup.value },
    select: {
      completedAt: true,
      createdAt: true,
      currency: true,
      email: true,
      fulfillmentStatus: true,
      id: true,
      paymentStatus: true,
      processingAt: true,
      shippingAmount: true,
      stripeCheckoutSessionId: true,
      stripePaymentIntentId: true,
      subtotalAmount: true,
      totalAmount: true,
      updatedAt: true,
      stripeEvents: {
        orderBy: { processedAt: "desc" },
        take: 10,
        select: {
          processedAt: true,
          stripeEventId: true,
          type: true,
        },
      },
    },
  });

  if (!order) {
    return jsonWithHeaders(
      {
        lookup,
        order: null,
        error: "Pedido não encontrado para o identificador informado.",
      },
      { headers: rateLimitHeaders, status: 404 }
    );
  }

  return jsonWithHeaders(
    {
      lookup,
      order: {
        completedAt: order.completedAt,
        createdAt: order.createdAt,
        currency: order.currency,
        emailMasked: maskEmail(order.email),
        fulfillmentStatus: order.fulfillmentStatus,
        id: order.id,
        paymentStatus: order.paymentStatus,
        processingAt: order.processingAt,
        shippingAmount: order.shippingAmount,
        stripeCheckoutSessionId: order.stripeCheckoutSessionId,
        stripePaymentIntentId: order.stripePaymentIntentId,
        subtotalAmount: order.subtotalAmount,
        totalAmount: order.totalAmount,
        updatedAt: order.updatedAt,
        webhookEvents: order.stripeEvents,
      },
    },
    { headers: rateLimitHeaders, status: 200 }
  );
}