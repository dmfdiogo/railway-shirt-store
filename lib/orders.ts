import { sendOrderShippedEmail } from "@/lib/email";
import prisma from "@/lib/prisma";

const MANUAL_FULFILLMENT_STATUSES = ["processing", "shipped", "delivered"] as const;

export type ManualFulfillmentStatus = (typeof MANUAL_FULFILLMENT_STATUSES)[number];

function getOperatorEmails() {
  return (process.env.ORDER_OPERATOR_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

export function canManageOrders(email?: string | null) {
  const operatorEmails = getOperatorEmails();

  if (operatorEmails.length === 0) {
    return process.env.NODE_ENV !== "production";
  }

  return email ? operatorEmails.includes(email.trim().toLowerCase()) : false;
}

export function isOrderOperatorRestrictionEnabled() {
  return getOperatorEmails().length > 0;
}

export function isManualFulfillmentStatus(value: string): value is ManualFulfillmentStatus {
  return MANUAL_FULFILLMENT_STATUSES.includes(value as ManualFulfillmentStatus);
}

function canTransitionFulfillmentStatus(current: string, next: ManualFulfillmentStatus) {
  if (current === next) {
    return true;
  }

  if (current === "pending" && next === "processing") {
    return true;
  }

  if (current === "processing" && next === "shipped") {
    return true;
  }

  if (current === "shipped" && next === "delivered") {
    return true;
  }

  return false;
}

export async function updateOrderFulfillmentStatus({
  fulfillmentStatus,
  orderId,
}: {
  fulfillmentStatus: ManualFulfillmentStatus;
  orderId: string;
}) {
  const existingOrder = await prisma.order.findUnique({
    where: { id: orderId },
    select: {
      completedAt: true,
      deliveredAt: true,
      email: true,
      fulfillmentStatus: true,
      id: true,
      paymentStatus: true,
      processingAt: true,
      shippedAt: true,
      shippingNotificationSentAt: true,
    },
  });

  if (!existingOrder) {
    throw new Error("Pedido não encontrado.");
  }

  if (existingOrder.paymentStatus !== "paid") {
    throw new Error("Apenas pedidos pagos podem entrar no fluxo manual de envio.");
  }

  if (!canTransitionFulfillmentStatus(existingOrder.fulfillmentStatus, fulfillmentStatus)) {
    throw new Error("Transição de status logístico inválida para este pedido.");
  }

  const now = new Date();
  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: {
      fulfillmentStatus,
      deliveredAt:
        fulfillmentStatus === "delivered" ? existingOrder.deliveredAt ?? now : undefined,
      processingAt:
        fulfillmentStatus === "processing" ? existingOrder.processingAt ?? now : undefined,
      shippedAt:
        fulfillmentStatus === "shipped" ? existingOrder.shippedAt ?? now : undefined,
    },
    select: {
      email: true,
      id: true,
      paymentStatus: true,
      shippingNotificationSentAt: true,
    },
  });

  let shippingEmailSent = false;
  let shippingEmailFailed = false;

  if (
    fulfillmentStatus === "shipped" &&
    updatedOrder.email &&
    !updatedOrder.shippingNotificationSentAt &&
    updatedOrder.paymentStatus === "paid"
  ) {
    try {
      await sendOrderShippedEmail({
        to: updatedOrder.email,
        orderId: updatedOrder.id,
      });

      await prisma.order.update({
        where: { id: updatedOrder.id },
        data: {
          shippingNotificationSentAt: now,
        },
      });

      shippingEmailSent = true;
    } catch (error) {
      shippingEmailFailed = true;
      console.error("Failed to send shipped notification email", error);
    }
  }

  return { shippingEmailFailed, shippingEmailSent };
}

export async function updateOrderTrackingDetails({
  orderId,
  trackingCode,
  trackingUrl,
}: {
  orderId: string;
  trackingCode: string | null;
  trackingUrl: string | null;
}) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: {
      id: true,
      paymentStatus: true,
    },
  });

  if (!order) {
    throw new Error("Pedido não encontrado.");
  }

  if (order.paymentStatus !== "paid") {
    throw new Error("Só faz sentido registrar rastreio para pedidos pagos.");
  }

  const normalizedTrackingCode = trackingCode?.trim() ? trackingCode.trim() : null;
  const normalizedTrackingUrl = trackingUrl?.trim() ? trackingUrl.trim() : null;

  if (normalizedTrackingUrl) {
    try {
      const parsed = new URL(normalizedTrackingUrl);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        throw new Error("URL inválida");
      }
    } catch {
      throw new Error("A URL de rastreio precisa ser http(s) válida.");
    }
  }

  await prisma.order.update({
    where: { id: orderId },
    data: {
      trackingCode: normalizedTrackingCode,
      trackingUrl: normalizedTrackingUrl,
    },
  });
}