import Link from "next/link";

import { EmailAuthForm } from "@/components/auth/email-auth-form";
import { isAuthConfigured } from "@/lib/auth";

export default function SignInPage() {
  if (!isAuthConfigured()) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#f7ebd6_0%,#efe2cf_100%)] px-6 py-12 text-stone-950">
        <section className="w-full max-w-2xl rounded-[2rem] border border-stone-950/10 bg-white/90 p-8 shadow-[0_24px_70px_rgba(44,32,18,0.14)] backdrop-blur sm:p-10">
          <p className="text-sm font-mono uppercase tracking-[0.3em] text-stone-500">Auth pendente</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            Configure Better Auth antes de liberar login.
          </h1>
          <p className="mt-6 text-lg leading-8 text-stone-700">
            Defina <strong>BETTER_AUTH_SECRET</strong> e <strong>BETTER_AUTH_URL</strong> para ativar a autenticação.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-stone-950 px-6 text-sm font-medium text-stone-50 transition hover:bg-stone-800"
          >
            Voltar para a loja
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#f7ebd6_0%,#efe2cf_100%)] px-6 py-12 text-stone-950">
      <EmailAuthForm mode="sign-in" />
    </main>
  );
}