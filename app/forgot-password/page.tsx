"use client";

import Link from "next/link";
import { useState, useTransition } from "react";

import { requestPasswordReset } from "@/lib/auth-client";

export default function ForgotPasswordPage() {
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
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#f7ebd6_0%,#efe2cf_100%)] px-6 py-12 text-stone-950">
      <div className="w-full max-w-md rounded-[2rem] border border-stone-950/10 bg-white/90 p-8 shadow-[0_24px_70px_rgba(44,32,18,0.14)] backdrop-blur sm:p-10">
        <p className="text-sm font-mono uppercase tracking-[0.3em] text-stone-500">
          Recuperar acesso
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-stone-950">
          Redefina sua senha.
        </h1>

        {sent ? (
          <>
            <p className="mt-6 text-base leading-7 text-stone-700">
              Se o email estiver cadastrado, você receberá um link para redefinir sua senha em breve. Verifique também a pasta de spam.
            </p>
            <Link
              href="/sign-in"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-stone-950 px-6 text-sm font-medium text-stone-50 transition hover:bg-stone-800"
            >
              Voltar para o login
            </Link>
          </>
        ) : (
          <>
            <p className="mt-4 text-sm leading-6 text-stone-600">
              Informe o email da sua conta e enviaremos um link de redefinição.
            </p>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-stone-700">
                Email
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-2 block w-full rounded-2xl border border-stone-950/10 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-stone-950/30 focus:bg-white"
                  placeholder="voce@exemplo.com"
                />
              </label>

              {error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isPending}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-stone-950 px-6 text-sm font-medium text-stone-50 transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-400"
              >
                {isPending ? "Enviando..." : "Enviar link de redefinição"}
              </button>
            </form>

            <p className="mt-6 text-sm leading-6 text-stone-600">
              Lembrou a senha?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-stone-950 underline decoration-stone-300 underline-offset-4"
              >
                Entrar
              </Link>
            </p>
          </>
        )}
      </div>
    </main>
  );
}
