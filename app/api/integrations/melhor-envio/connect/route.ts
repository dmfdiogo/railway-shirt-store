import { NextRequest, NextResponse } from "next/server";

import { auth, isAuthConfigured } from "@/lib/auth";
import {
  canManageMelhorEnvio,
  getMelhorEnvioActorCookieName,
  getMelhorEnvioAuthorizationUrl,
  getMelhorEnvioStateCookieName,
  isMelhorEnvioOAuthConfigured,
} from "@/lib/melhor-envio";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (!isMelhorEnvioOAuthConfigured()) {
    return NextResponse.json(
      { error: "Melhor Envio OAuth ainda nao foi configurado neste ambiente." },
      { status: 500 }
    );
  }

  const session = isAuthConfigured()
    ? await auth.api.getSession({ headers: request.headers }).catch(() => null)
    : null;

  if (!session) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("redirectTo", "/operacoes/frete");
    return NextResponse.redirect(signInUrl, 302);
  }

  if (!canManageMelhorEnvio(session.user.email)) {
    return NextResponse.json({ error: "Acesso negado a integracao do Melhor Envio." }, { status: 403 });
  }

  const state = crypto.randomUUID();
  const response = NextResponse.redirect(getMelhorEnvioAuthorizationUrl(state), 302);

  response.cookies.set(getMelhorEnvioStateCookieName(), state, {
    httpOnly: true,
    maxAge: 60 * 10,
    path: "/",
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
  });
  response.cookies.set(getMelhorEnvioActorCookieName(), session.user.id, {
    httpOnly: true,
    maxAge: 60 * 10,
    path: "/",
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
  });

  return response;
}