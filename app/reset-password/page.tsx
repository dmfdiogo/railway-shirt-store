"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useTransition } from "react";

import { resetPassword } from "@/lib/auth-client";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (!token) {
    return (
      <div className="w-full max-w-md rounded-[2rem] border border-stone-950/10 bg-white/90 p-8 shadow-[0_24px_70px_rgba(44,32,18,0.14)] backdrop-blur sm:p-10">
        <p className="text-sm font-mono uppercase tracking-[0.3em] text-stone-500">Link inválido</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-stone-950">
          Este link expirou ou é inválido.
        </h1>
        <p className="mt-4 text-sm leading-6 text-stone-600">
          Solicite um novo link de redefinição de senha.
        </p>
        <Link
          href="/forgot-password"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-stone-950 px-6 text-sm font-medium text-stone-50 transition hover:bg-stone-800"
        >
          Solicitar novo link
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="w-full max-w-md rounded-[2rem] border border-stone-950/10 bg-white/90 p-8 shadow-[0_24px_70px_rgba(44,32,18,0.14)] backdrop-blur sm:p-10">
        <p className="text-sm font-mono uppercase tracking-[0.3em] text-stone-500">Senha atualizada</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-stone-950">
          Sua senha foi redefinida.
        </h1>
        <p className="mt-4 text-sm leading-6 text-stone-600">
          Você já pode entrar com a nova senha.
        </p>
        <Link
          href="/sign-in"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-stone-950 px-6 text-sm font-medium text-stone-50 transition hover:bg-stone-800"
        >
          Entrar
        </Link>
      </div>
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const newPassword = String(formData.get("password") ?? "");
    const confirm = String(formData.get("confirm") ?? "");

    if (newPassword !== confirm) {
      setError("As senhas não coincidem.");
      return;
    }

    startTransition(async () => {
      const result = await resetPassword({ token, newPassword });

      if (result.error) {
        setError(result.error.message || "Não foi possível redefinir a senha.");
        return;
      }

      setDone(true);
      router.push("/sign-in");
    });
  }

  return (
    <div className="w-full max-w-md rounded-[2rem] border border-stone-950/10 bg-white/90 p-8 shadow-[0_24px_70px_rgba(44,32,18,0.14)] backdrop-blur sm:p-10">
      <p className="text-sm font-mono uppercase tracking-[0.3em] text-stone-500">Nova senha</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-stone-950">
        Escolha uma nova senha.
      </h1>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-stone-700">
          Nova senha
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            className="mt-2 block w-full rounded-2xl border border-stone-950/10 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-stone-950/30 focus:bg-white"
            placeholder="Pelo menos 8 caracteres"
          />
        </label>

        <label className="block text-sm font-medium text-stone-700">
          Confirmar senha
          <input
            name="confirm"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            className="mt-2 block w-full rounded-2xl border border-stone-950/10 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-stone-950/30 focus:bg-white"
            placeholder="Repita a nova senha"
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
          {isPending ? "Salvando..." : "Redefinir senha"}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#f7ebd6_0%,#efe2cf_100%)] px-6 py-12 text-stone-950">
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}
