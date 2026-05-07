"use client";

import Link from "next/link";
import { useState, useTransition } from "react";

import { requestPasswordReset } from "@/lib/auth-client";

export function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();

    startTransition(async () => {
      const result = await requestPasswordReset({
        email,
        redirectTo: "/reset-password",
      });

      if (result.error) {
        setError(result.error.message || "Não foi possível enviar o email.");
        return;
      }

      setSent(true);
    });
  }

  return (
    <div className="relative w-full max-w-md rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(18,19,28,0.94)_0%,rgba(11,12,19,0.98)_100%)] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:p-10">
      <p className="text-sm font-mono uppercase tracking-[0.3em] text-[#A5ADFF]">Recuperar acesso</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white">Redefina sua senha.</h1>

      {sent ? (
        <>
          <p className="mt-6 text-base leading-7 text-white/62">
            Se o email estiver cadastrado, você receberá um link para redefinir sua senha em breve. Verifique também a pasta de spam.
          </p>
          <Link
            href="/sign-in"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2E5BFF_0%,#6B3CF6_100%)] px-6 text-sm font-medium text-white shadow-[0_16px_38px_rgba(61,79,255,0.34)] transition hover:-translate-y-0.5"
          >
            Voltar para o login
          </Link>
        </>
      ) : (
        <>
          <p className="mt-4 text-sm leading-6 text-white/62">
            Informe o email da sua conta e enviaremos um link de redefinição.
          </p>
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
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

            {error ? (
              <div className="rounded-2xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#2E5BFF_0%,#6B3CF6_100%)] px-6 text-sm font-medium text-white shadow-[0_16px_38px_rgba(61,79,255,0.34)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "Enviando..." : "Enviar link de redefinição"}
            </button>
          </form>

          <p className="mt-6 text-sm leading-6 text-white/58">
            Lembrou a senha?{" "}
            <Link href="/sign-in" className="font-medium text-white underline decoration-white/25 underline-offset-4">
              Entrar
            </Link>
          </p>
        </>
      )}
    </div>
  );
}