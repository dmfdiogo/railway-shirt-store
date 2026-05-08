import { NextRequest, NextResponse } from "next/server";

import { auth, isAuthConfigured } from "@/lib/auth";
import {
  canManageMelhorEnvio,
  exchangeMelhorEnvioAuthorizationCode,
  getMelhorEnvioActorCookieName,
  getMelhorEnvioStateCookieName,
} from "@/lib/melhor-envio";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const requestActor = request.cookies.get(getMelhorEnvioActorCookieName())?.value;
  const requestState = request.cookies.get(getMelhorEnvioStateCookieName())?.value;
  const publicAppUrl = process.env.APP_URL ?? process.env.BETTER_AUTH_URL ?? url.origin;
  const session = isAuthConfigured()
    ? await auth.api.getSession({ headers: request.headers }).catch(() => null)
    : null;

  const redirectUrl = new URL("/operacoes/frete", publicAppUrl);

  if (!code || !state || !requestState || requestState !== state) {
    redirectUrl.searchParams.set("melhor-envio", "invalid-state");
    const response = NextResponse.redirect(redirectUrl, 302);
    response.cookies.set(getMelhorEnvioStateCookieName(), "", { maxAge: 0, path: "/" });
    response.cookies.set(getMelhorEnvioActorCookieName(), "", { maxAge: 0, path: "/" });
    return response;
  }

  if (!session || !requestActor || session.user.id !== requestActor || !canManageMelhorEnvio(session.user.email)) {
    redirectUrl.searchParams.set("melhor-envio", "invalid-state");
    redirectUrl.searchParams.set("message", "Conclua a autorizacao com a mesma conta que iniciou a conexao.");
    const response = NextResponse.redirect(redirectUrl, 302);
    response.cookies.set(getMelhorEnvioStateCookieName(), "", { maxAge: 0, path: "/" });
    response.cookies.set(getMelhorEnvioActorCookieName(), "", { maxAge: 0, path: "/" });
    return response;
  }

  try {
    await exchangeMelhorEnvioAuthorizationCode(code);
    redirectUrl.searchParams.set("melhor-envio", "connected");
  } catch (error) {
    redirectUrl.searchParams.set("melhor-envio", "error");
    if (error instanceof Error) {
      redirectUrl.searchParams.set("message", error.message);
    }
  }

  const response = NextResponse.redirect(redirectUrl, 302);
  response.cookies.set(getMelhorEnvioStateCookieName(), "", { maxAge: 0, path: "/" });
  response.cookies.set(getMelhorEnvioActorCookieName(), "", { maxAge: 0, path: "/" });
  return response;
}