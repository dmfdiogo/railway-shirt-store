"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { signIn, signUp } from "@/lib/auth-client";

type AuthMode = "sign-in" | "sign-up";

type EmailAuthFormProps = {
  mode: AuthMode;
};

export function EmailAuthForm({ mode }: EmailAuthFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const isSignUp = mode === "sign-up";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    startTransition(async () => {
      const result = isSignUp
        ? await signUp.email({
            email,
            name,
            password,
          })
        : await signIn.email({
            email,
            password,
          });

      if (result.error) {
        setError(result.error.message || "Authentication failed.");
        return;
      }

      router.push("/account");
      router.refresh();
    });
  }

  return (
    <div className="w-full max-w-md rounded-[2rem] border border-stone-950/10 bg-white/90 p-8 shadow-[0_24px_70px_rgba(44,32,18,0.14)] backdrop-blur sm:p-10">
      <p className="text-sm font-mono uppercase tracking-[0.3em] text-stone-500">
        {isSignUp ? "Criar conta" : "Entrar"}
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-stone-950">
        {isSignUp ? "Guarde seus pedidos e volte depois." : "Acesse sua conta da loja."}
      </h1>
      <p className="mt-4 text-sm leading-6 text-stone-600">
        {isSignUp ? "Sua conta serve para acompanhar pedidos e concentrar histórico." : "Use email e senha para recuperar pedidos associados ao seu perfil."}
      </p>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        {isSignUp ? (
          <label className="block text-sm font-medium text-stone-700">
            Nome
            <input
              name="name"
              type="text"
              autoComplete="name"
              required
              className="mt-2 block w-full rounded-2xl border border-stone-950/10 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-stone-950/30 focus:bg-white"
              placeholder="Diogo Furmann"
            />
          </label>
        ) : null}

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

        <label className="block text-sm font-medium text-stone-700">
          Senha
          <input
            name="password"
            type="password"
            autoComplete={isSignUp ? "new-password" : "current-password"}
            required
            minLength={8}
            className="mt-2 block w-full rounded-2xl border border-stone-950/10 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-stone-950/30 focus:bg-white"
            placeholder="Pelo menos 8 caracteres"
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
          {isPending ? "Processando..." : isSignUp ? "Criar conta" : "Entrar"}
        </button>
      </form>

      <p className="mt-6 text-sm leading-6 text-stone-600">
        {isSignUp ? "Já tem conta? " : "Ainda não tem conta? "}
        <Link
          href={isSignUp ? "/sign-in" : "/sign-up"}
          className="font-medium text-stone-950 underline decoration-stone-300 underline-offset-4"
        >
          {isSignUp ? "Entrar" : "Criar conta"}
        </Link>
      </p>
      {!isSignUp ? (
        <p className="mt-2 text-sm leading-6 text-stone-600">
          <Link
            href="/forgot-password"
            className="font-medium text-stone-950 underline decoration-stone-300 underline-offset-4"
          >
            Esqueceu a senha?
          </Link>
        </p>
      ) : null}
    </div>
  );
}