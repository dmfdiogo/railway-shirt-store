import { NextResponse } from "next/server";

import { auth, isAuthConfigured } from "@/lib/auth";
import {
  canManageOrders,
  isManualFulfillmentStatus,
  updateOrderFulfillmentStatus,
} from "@/lib/orders";

export async function POST(request: Request) {
  const redirectUrl = new URL("/admin/orders", request.url);

  if (!isAuthConfigured()) {
    return new NextResponse(null, { status: 404 });
  }

  const session = await auth.api.getSession({ headers: request.headers }).catch(() => null);

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in?redirectTo=%2Fadmin%2Forders", request.url), 303);
  }

  if (!canManageOrders(session.user.email)) {
    return new NextResponse(null, { status: 404 });
  }

  const formData = await request.formData();
  const orderId = formData.get("orderId");
  const fulfillmentStatus = formData.get("fulfillmentStatus");

  if (typeof orderId !== "string" || typeof fulfillmentStatus !== "string" || !isManualFulfillmentStatus(fulfillmentStatus)) {
    redirectUrl.searchParams.set("error", "Parâmetros inválidos para atualizar o pedido.");
    return NextResponse.redirect(redirectUrl, 303);
  }

  try {
    const result = await updateOrderFulfillmentStatus({
      fulfillmentStatus,
      orderId,
    });

    redirectUrl.searchParams.set("updated", orderId.slice(-8).toUpperCase());

    if (result.shippingEmailSent) {
      redirectUrl.searchParams.set("emailed", "1");
    }

    if (result.shippingEmailFailed) {
      redirectUrl.searchParams.set("emailFailed", "1");
    }
  } catch (error) {
    redirectUrl.searchParams.set(
      "error",
      error instanceof Error ? error.message : "Não foi possível atualizar o pedido."
    );
  }

  return NextResponse.redirect(redirectUrl, 303);
}