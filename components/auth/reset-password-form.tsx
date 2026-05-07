"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

import { resetPassword } from "@/lib/auth-client";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (!token) {
    return (
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(18,19,28,0.94)_0%,rgba(11,12,19,0.98)_100%)] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:p-10">
        <p className="text-sm font-mono uppercase tracking-[0.3em] text-[#A5ADFF]">Link inválido</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white">Este link expirou ou é inválido.</h1>
        <p className="mt-4 text-sm leading-6 text-white/62">Solicite um novo link de redefinição de senha.</p>
        <Link
          href="/forgot-password"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2E5BFF_0%,#6B3CF6_100%)] px-6 text-sm font-medium text-white shadow-[0_16px_38px_rgba(61,79,255,0.34)] transition hover:-translate-y-0.5"
        >
          Solicitar novo link
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(18,19,28,0.94)_0%,rgba(11,12,19,0.98)_100%)] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:p-10">
        <p className="text-sm font-mono uppercase tracking-[0.3em] text-[#A5ADFF]">Senha atualizada</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white">Sua senha foi redefinida.</h1>
        <p className="mt-4 text-sm leading-6 text-white/62">Você já pode entrar com a nova senha.</p>
        <Link
          href="/sign-in"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2E5BFF_0%,#6B3CF6_100%)] px-6 text-sm font-medium text-white shadow-[0_16px_38px_rgba(61,79,255,0.34)] transition hover:-translate-y-0.5"
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
    <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(18,19,28,0.94)_0%,rgba(11,12,19,0.98)_100%)] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:p-10">
      <p className="text-sm font-mono uppercase tracking-[0.3em] text-[#A5ADFF]">Nova senha</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white">Escolha uma nova senha.</h1>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-white/72">
          Nova senha
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#6D78FF]/45 focus:bg-white/[0.07]"
            placeholder="Pelo menos 8 caracteres"
          />
        </label>

        <label className="block text-sm font-medium text-white/72">
          Confirmar senha
          <input
            name="confirm"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#6D78FF]/45 focus:bg-white/[0.07]"
            placeholder="Repita a nova senha"
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
          {isPending ? "Salvando..." : "Redefinir senha"}
        </button>
      </form>
    </div>
  );
}