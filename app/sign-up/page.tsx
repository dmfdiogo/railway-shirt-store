import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { EmailAuthForm } from "@/components/auth/email-auth-form";
import { BeArtShell } from "@/components/ui/beart-shell";
import { auth, isAuthConfigured, isEmailVerificationConfigured, isGoogleAuthConfigured } from "@/lib/auth";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Criar conta — Be Art",
  description: "Crie sua conta Be Art para acompanhar pedidos e centralizar seu histórico de compra.",
  path: "/sign-up",
});

function resolveRedirectPath(value?: string) {
  if (!value?.startsWith("/") || value.startsWith("//")) {
    return "/account";
  }

  return value;
}

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>;
}) {
  if (!isAuthConfigured()) {
    return (
      <BeArtShell contentClassName="relative flex min-h-screen items-center justify-center px-6 py-12" footer>
        <section className="relative w-full max-w-2xl rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(18,19,28,0.94)_0%,rgba(11,12,19,0.98)_100%)] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:p-10">
          <p className="text-sm font-mono uppercase tracking-[0.3em] text-[#A5ADFF]">Auth pendente</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white">
            A conta depende da configuração do Better Auth.
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/62">
            Defina <strong>BETTER_AUTH_SECRET</strong> e <strong>BETTER_AUTH_URL</strong> para ativar cadastro e sessão.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2E5BFF_0%,#6B3CF6_100%)] px-6 text-sm font-medium text-white shadow-[0_16px_38px_rgba(61,79,255,0.34)] transition hover:-translate-y-0.5"
          >
            Voltar para a loja
          </Link>
        </section>
      </BeArtShell>
    );
  }

  const redirectPath = resolveRedirectPath((await searchParams).redirectTo);

  const session = await auth.api.getSession({ headers: await headers() }).catch(() => null);

  if (session) {
    redirect(redirectPath);
  }

  return (
    <BeArtShell authReady contentClassName="relative flex min-h-screen items-center justify-center px-6 py-12" footer>
      <div className="relative w-full max-w-md">
        <EmailAuthForm
          callbackPath={redirectPath}
          mode="sign-up"
          googleEnabled={isGoogleAuthConfigured()}
          requireEmailVerification={isEmailVerificationConfigured()}
        />
      </div>
    </BeArtShell>
  );
}