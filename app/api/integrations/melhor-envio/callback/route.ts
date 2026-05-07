import { NextRequest, NextResponse } from "next/server";

import { auth, isAuthConfigured } from "@/lib/auth";
import {
  exchangeMelhorEnvioAuthorizationCode,
  getMelhorEnvioActorCookieName,
  getMelhorEnvioStateCookieName,
} from "@/lib/melhor-envio";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const requestState = request.cookies.get(getMelhorEnvioStateCookieName())?.value;
  const requestActor = request.cookies.get(getMelhorEnvioActorCookieName())?.value;
  const session = isAuthConfigured()
    ? await auth.api.getSession({ headers: request.headers }).catch(() => null)
    : null;

  const redirectUrl = new URL("/operacoes/frete", url.origin);

  if (!code || !state || !requestState || requestState !== state || !session || !requestActor || requestActor !== session.user.id) {
    redirectUrl.searchParams.set("melhor-envio", "invalid-state");
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