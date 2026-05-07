"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { signIn, signUp } from "@/lib/auth-client";

type AuthMode = "sign-in" | "sign-up";

type EmailAuthFormProps = {
  callbackPath?: string;
  googleEnabled?: boolean;
  mode: AuthMode;
  requireEmailVerification?: boolean;
};

export function EmailAuthForm({
  callbackPath = "/account",
  googleEnabled = false,
  mode,
  requireEmailVerification = false,
}: EmailAuthFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const isSignUp = mode === "sign-up";

  function handleGoogleAuth() {
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const result = await signIn.social({
        callbackURL: callbackPath,
        errorCallbackURL: isSignUp ? "/sign-up" : "/sign-in",
        provider: "google",
        // Allow Google auth from both entry points so first-time users
        // are not blocked when they start from the sign-in screen.
        requestSignUp: true,
      });

      if (result.error) {
        setError(result.error.message || "Google authentication failed.");
        return;
      }
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    startTransition(async () => {
      const result = isSignUp
        ? await signUp.email({
            callbackURL: callbackPath,
            email,
            name,
            password,
          })
        : await signIn.email({
            callbackURL: callbackPath,
            email,
            password,
          });

      if (result.error) {
        const errorCode = String(result.error.code ?? "");
        if (errorCode === "EMAIL_NOT_VERIFIED") {
          setError("Seu email ainda nao foi confirmado. Enviamos um novo link para sua caixa de entrada.");
          return;
        }

        setError(result.error.message || "Authentication failed.");
        return;
      }

      if (isSignUp && requireEmailVerification) {
        form.reset();
        setSuccess("Conta criada. Confirme seu email pelo link enviado antes do primeiro login.");
        return;
      }

      router.push(callbackPath);
      router.refresh();
    });
  }

  const authSwitchHref = callbackPath === "/account"
    ? isSignUp ? "/sign-in" : "/sign-up"
    : `${isSignUp ? "/sign-in" : "/sign-up"}?redirectTo=${encodeURIComponent(callbackPath)}`;

  return (
    <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(18,19,28,0.94)_0%,rgba(11,12,19,0.98)_100%)] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:p-10">
      <p className="text-sm font-mono uppercase tracking-[0.3em] text-[#A5ADFF]">
        {isSignUp ? "Criar conta" : "Entrar"}
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white">
        {isSignUp ? "Guarde seus pedidos e volte depois." : "Acesse sua conta da loja."}
      </h1>
      <p className="mt-4 text-sm leading-6 text-white/62">
        {isSignUp ? "Sua conta serve para acompanhar pedidos e concentrar histórico." : "Use email e senha para recuperar pedidos associados ao seu perfil."}
      </p>
      {isSignUp && requireEmailVerification ? (
        <p className="mt-3 rounded-2xl border border-amber-300/20 bg-amber-500/10 px-4 py-3 text-sm leading-6 text-amber-100">
          A verificacao de email e obrigatoria antes do primeiro login com email e senha.
        </p>
      ) : null}

      {googleEnabled ? (
        <div className="mt-8">
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={isPending}
            className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-white/12 bg-white/[0.06] px-6 text-sm font-medium text-white transition hover:bg-white/[0.1] disabled:cursor-not-allowed disabled:bg-white/[0.04] disabled:text-white/35"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/12 bg-white/[0.08] text-xs font-semibold text-white">
              G
            </span>
            {isPending ? "Redirecionando..." : isSignUp ? "Continuar com Google" : "Entrar com Google"}
          </button>

          <div className="mt-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/35">ou</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
        </div>
      ) : null}

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        {isSignUp ? (
          <label className="block text-sm font-medium text-white/72">
            Nome
            <input
              name="name"
              type="text"
              autoComplete="name"
              required
              className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#6D78FF]/45 focus:bg-white/[0.07]"
              placeholder="Diogo Furmann"
            />
          </label>
        ) : null}

        <label className="block text-sm font-medium text-white/72">
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#6D78FF]/45 focus:bg-white/[0.07]"
            placeholder="voce@exemplo.com"
          />
        </label>

        <label className="block text-sm font-medium text-white/72">
          Senha
          <input
            name="password"
            type="password"
            autoComplete={isSignUp ? "new-password" : "current-password"}
            required
            minLength={8}
            className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#6D78FF]/45 focus:bg-white/[0.07]"
            placeholder="Pelo menos 8 caracteres"
          />
        </label>

        {error ? (
          <div className="rounded-2xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="rounded-2xl border border-emerald-300/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
            {success}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#2E5BFF_0%,#6B3CF6_100%)] px-6 text-sm font-medium text-white shadow-[0_16px_38px_rgba(61,79,255,0.34)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(107,60,246,0.38)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Processando..." : isSignUp ? "Criar conta" : "Entrar"}
        </button>
      </form>

      <p className="mt-6 text-sm leading-6 text-white/58">
        {isSignUp ? "Já tem conta? " : "Ainda não tem conta? "}
        <Link
          href={authSwitchHref}
          className="font-medium text-white underline decoration-white/25 underline-offset-4"
        >
          {isSignUp ? "Entrar" : "Criar conta"}
        </Link>
      </p>
      {!isSignUp ? (
        <p className="mt-2 text-sm leading-6 text-white/58">
          <Link
            href="/forgot-password"
            className="font-medium text-white underline decoration-white/25 underline-offset-4"
          >
            Esqueceu a senha?
          </Link>
        </p>
      ) : null}
    </div>
  );
}