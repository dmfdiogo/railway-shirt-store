import { NextResponse } from "next/server";

import { auth, isAuthConfigured } from "@/lib/auth";
import { canManageOrders, updateOrderTrackingDetails } from "@/lib/orders";

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
  const trackingCode = formData.get("trackingCode");
  const trackingUrl = formData.get("trackingUrl");

  if (typeof orderId !== "string") {
    redirectUrl.searchParams.set("error", "Pedido inválido para atualizar rastreio.");
    return NextResponse.redirect(redirectUrl, 303);
  }

  try {
    await updateOrderTrackingDetails({
      orderId,
      trackingCode: typeof trackingCode === "string" ? trackingCode : null,
      trackingUrl: typeof trackingUrl === "string" ? trackingUrl : null,
    });

    redirectUrl.searchParams.set("updated", orderId.slice(-8).toUpperCase());
  } catch (error) {
    redirectUrl.searchParams.set(
      "error",
      error instanceof Error ? error.message : "Não foi possível atualizar o rastreio."
    );
  }

  return NextResponse.redirect(redirectUrl, 303);
}