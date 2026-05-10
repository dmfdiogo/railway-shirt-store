import type { Metadata } from "next";
import { AlertTriangle, ArrowRight, CreditCard, ShieldCheck, Truck } from "lucide-react";
import { headers } from "next/headers";
import { connection } from "next/server";
import Link from "next/link";
import { redirect } from "next/navigation";

import { CheckoutElementsShell } from "@/components/checkout/checkout-elements-shell";
import { MysticBackground } from "@/components/ui/mystic-background";
import { Navbar } from "@/components/ui/navbar";
import { SiteFooter } from "@/components/ui/site-footer";
import { auth, isAuthConfigured } from "@/lib/auth";
import { buildNoIndexMetadata } from "@/lib/seo";
import { getStripePublishableKey, getStripeServerClient } from "@/lib/stripe";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Checkout seguro — Be Art",
  description: "Finalize o pagamento da Be Art sem sair do site usando componentes seguros do Stripe com tema alinhado a loja.",
  path: "/checkout",
});

function CheckoutUnavailableState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[2rem] border border-red-300/20 bg-red-500/10 p-8 text-red-50 shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-red-100/80">
        <AlertTriangle className="h-4 w-4" aria-hidden="true" />
        Checkout indisponível
      </p>
      <h1 className="font-display mt-4 text-3xl font-extrabold uppercase tracking-[-0.04em] text-white sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-8 text-red-50/84">{description}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/cart"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#2E5BFF_0%,#6B3CF6_100%)] px-6 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(79,70,229,0.24)]"
        >
          Voltar ao carrinho
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link
          href="/shop"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 text-sm font-semibold text-white/76 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
        >
          Continuar comprando
        </Link>
      </div>
    </div>
  );
}

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  await connection();

  const authReady = isAuthConfigured();
  const session = authReady
    ? await auth.api.getSession({ headers: await headers() }).catch(() => null)
    : null;

  const { session_id } = await searchParams;

  let clientSecret: string | null = null;
  let checkoutStatus: string | null = null;

  if (session_id) {
    try {
      const stripeSession = await getStripeServerClient().checkout.sessions.retrieve(session_id);
      clientSecret = stripeSession.client_secret;
      checkoutStatus = stripeSession.status;
    } catch {
      checkoutStatus = null;
    }
  }

  if (session_id && checkoutStatus === "complete") {
    redirect(`/checkout/success?session_id=${encodeURIComponent(session_id)}`);
  }

  const publishableKey = (() => {
    try {
      return getStripePublishableKey();
    } catch {
      return null;
    }
  })();

  const canRenderCheckout = Boolean(session_id && clientSecret && publishableKey && checkoutStatus === "open");

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0A0A0C] px-6 py-12 text-white sm:px-10 lg:px-16">
      <MysticBackground />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[-8rem] h-[24rem] bg-[radial-gradient(ellipse_at_top,rgba(46,91,255,0.24),transparent_55%)] opacity-90 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-10rem] h-[28rem] bg-[radial-gradient(ellipse_at_bottom,rgba(107,60,246,0.2),transparent_58%)] opacity-90 blur-3xl"
      />

      <Navbar sessionActive={!!session} authReady={authReady} />

      <section className="relative z-10 flex min-h-screen flex-col justify-between pt-20">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 py-10 lg:grid lg:grid-cols-[minmax(0,0.72fr)_minmax(26rem,0.88fr)] lg:items-start">
          <div className="rounded-[2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-8 shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#8B5CF6]">Checkout local</p>
            <h1 className="font-display mt-4 text-4xl font-extrabold uppercase tracking-[-0.05em] text-white sm:text-5xl">
              Finalize sem sair da Be Art.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/62 sm:text-lg">
              O pagamento continua protegido pelo Stripe, mas agora acontece dentro do site com a mesma atmosfera da loja e redirecionamento apenas quando um método exigir autenticação externa.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                {
                  icon: ShieldCheck,
                  title: "Proteção Stripe",
                  description: "Cartões, Link e validações seguem no ambiente seguro do Stripe.",
                },
                {
                  icon: Truck,
                  title: "Frete preservado",
                  description: "As opções calculadas antes do pagamento continuam refletidas no pedido.",
                },
                {
                  icon: CreditCard,
                  title: "Fluxo contínuo",
                  description: "O cliente só sai da página quando o método escolhido realmente precisa.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-white/[0.08] bg-[#0D0E13]/72 p-4"
                >
                  <item.icon className="h-5 w-5 text-[#A5ADFF]" aria-hidden="true" />
                  <h2 className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-white">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-white/54">{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div>
            {canRenderCheckout ? (
              <CheckoutElementsShell
                clientSecret={clientSecret as string}
                publishableKey={publishableKey as string}
                sessionId={session_id as string}
              />
            ) : !session_id ? (
              <CheckoutUnavailableState
                title="Sessão não encontrada."
                description="Abra este checkout a partir do carrinho ou da página de produto para gerar uma sessão válida de pagamento."
              />
            ) : !publishableKey ? (
              <CheckoutUnavailableState
                title="Falta configurar a chave pública do Stripe."
                description="Defina NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ou STRIPE_PUBLISHABLE_KEY no ambiente para montar o checkout local com segurança."
              />
            ) : checkoutStatus === "expired" ? (
              <CheckoutUnavailableState
                title="Esta sessão expirou."
                description="Crie um novo checkout a partir do carrinho para recalcular a sessão e continuar o pagamento."
              />
            ) : (
              <CheckoutUnavailableState
                title="Não foi possível abrir o checkout."
                description="A sessão retornada pelo Stripe não está mais disponível para uso embutido. Gere um novo checkout e tente novamente."
              />
            )}
          </div>
        </div>

        <SiteFooter authReady={authReady} sessionActive={!!session} />
      </section>
    </main>
  );
}