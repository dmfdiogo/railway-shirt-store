import { headers } from "next/headers";
import { connection } from "next/server";

import { SignOutButton } from "@/components/auth/sign-out-button";
import { auth, isAuthConfigured } from "@/lib/auth";

const requiredStripeEnv = [
  "STRIPE_SECRET_KEY",
  "STRIPE_PRICE_ID",
  "STRIPE_WEBHOOK_SECRET",
];

const requiredPlatformEnv = [
  "DATABASE_URL",
  "BETTER_AUTH_SECRET",
  "BETTER_AUTH_URL",
];

export default async function Home() {
  await connection();

  const stripeReady = requiredStripeEnv.every((key) => Boolean(process.env[key]));
  const platformReady = requiredPlatformEnv.every((key) => Boolean(process.env[key]));
  const authReady = isAuthConfigured();
  const session = authReady
    ? await auth.api.getSession({ headers: await headers() }).catch(() => null)
    : null;

  return (
    <main className="relative flex flex-1 overflow-hidden bg-[radial-gradient(circle_at_top,#ffd36d_0%,#f6efe4_26%,#efe3ce_56%,#d8c3a5_100%)] px-6 py-10 text-stone-950 sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(124,58,237,0.06),transparent_42%),linear-gradient(225deg,rgba(15,23,42,0.10),transparent_35%)]" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 lg:flex-row">
        <section className="flex-1 rounded-[2rem] border border-stone-950/10 bg-[#fff7ea]/90 p-8 shadow-[0_30px_80px_rgba(79,54,31,0.18)] backdrop-blur sm:p-10">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-mono uppercase tracking-[0.35em] text-stone-500">
                Railway Shirt Store
              </p>
              <h1 className="mt-3 max-w-2xl text-5xl font-semibold leading-none tracking-[-0.06em] sm:text-6xl">
                Checkout pronto para deploy no Railway com Stripe no servidor.
              </h1>
            </div>
            <div className="hidden rounded-full border border-stone-950/10 bg-stone-950 px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-stone-50 lg:block">
              {stripeReady ? "Stripe armado" : "Falta configurar Stripe"}
            </div>
          </div>

          <p className="max-w-2xl text-lg leading-8 text-stone-700">
            Este app agora cria pedidos locais antes do Stripe Checkout, confirma o pagamento via webhook e pode associar compras a uma conta Better Auth quando o cliente estiver autenticado.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <article className="rounded-[1.5rem] border border-stone-950/10 bg-white/80 p-5">
              <p className="text-sm font-mono uppercase tracking-[0.28em] text-stone-500">Deploy</p>
              <p className="mt-3 text-base leading-7 text-stone-700">
                Projeto Railway criado e pronto para receber o serviço web desta aplicação.
              </p>
            </article>
            <article className="rounded-[1.5rem] border border-stone-950/10 bg-white/80 p-5">
              <p className="text-sm font-mono uppercase tracking-[0.28em] text-stone-500">Payments</p>
              <p className="mt-3 text-base leading-7 text-stone-700">
                A compra redireciona para o Stripe Checkout e o webhook finaliza o pedido com idempotência no backend.
              </p>
            </article>
            <article className="rounded-[1.5rem] border border-stone-950/10 bg-white/80 p-5">
              <p className="text-sm font-mono uppercase tracking-[0.28em] text-stone-500">Conta</p>
              <p className="mt-3 text-base leading-7 text-stone-700">
                Better Auth entra por email e senha para recuperar histórico e anexar checkout ao usuário quando houver sessão.
              </p>
            </article>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {session ? (
              <>
                <a
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-950/10 bg-white/80 px-6 text-sm font-medium text-stone-900 transition hover:bg-white"
                  href="/account"
                >
                  Ver minha conta
                </a>
                <SignOutButton />
              </>
            ) : authReady ? (
              <>
                <a
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-950/10 bg-white/80 px-6 text-sm font-medium text-stone-900 transition hover:bg-white"
                  href="/sign-in"
                >
                  Entrar
                </a>
                <a
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-950/10 bg-white/80 px-6 text-sm font-medium text-stone-900 transition hover:bg-white"
                  href="/sign-up"
                >
                  Criar conta
                </a>
              </>
            ) : (
              <p className="max-w-xl rounded-[1.5rem] border border-amber-400/40 bg-amber-100/70 px-5 py-4 text-sm leading-6 text-stone-700">
                Configure <strong>BETTER_AUTH_SECRET</strong> e <strong>BETTER_AUTH_URL</strong> para ativar login e área de pedidos.
              </p>
            )}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="/shop"
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-stone-950 px-8 text-base font-medium text-stone-50 transition hover:-translate-y-0.5 hover:bg-stone-800"
            >
              Ver catálogo
            </a>
            <form action="/api/checkout-session" method="POST">
              <button
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-stone-950/20 bg-white/80 px-8 text-base font-medium text-stone-900 transition hover:-translate-y-0.5 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                type="submit"
                disabled={!stripeReady || !platformReady}
              >
                Comprar via Stripe Checkout
              </button>
            </form>
            <p className="max-w-md text-sm leading-6 text-stone-600">
              {stripeReady && platformReady
                ? session
                  ? "Sua sessão pode ser vinculada ao pedido automaticamente antes do redirecionamento para o Stripe."
                  : "O backend cria o pedido local primeiro e depois abre a Checkout Session hospedada no Stripe."
                : "Defina Stripe, DATABASE_URL e Better Auth para habilitar checkout persistido e histórico de conta."}
            </p>
          </div>
        </section>

        <aside className="w-full max-w-xl rounded-[2rem] border border-stone-950/10 bg-stone-950 p-8 text-stone-50 shadow-[0_24px_70px_rgba(24,24,27,0.28)] sm:p-10">
          <p className="text-sm font-mono uppercase tracking-[0.35em] text-amber-300/80">
            Runtime Checklist
          </p>
          <p className="mt-6 text-xs font-mono uppercase tracking-[0.24em] text-stone-400">
            Stripe
          </p>
          <ul className="mt-6 space-y-4 text-sm leading-7 text-stone-300">
            {requiredStripeEnv.map((envName) => (
              <li
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                key={envName}
              >
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-stone-300">
                  {envName}
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-amber-200">
                  {process.env[envName] ? "ok" : "missing"}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-xs font-mono uppercase tracking-[0.24em] text-stone-400">
            Persistence + Auth
          </p>
          <ul className="mt-4 space-y-4 text-sm leading-7 text-stone-300">
            {requiredPlatformEnv.map((envName) => (
              <li
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                key={envName}
              >
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-stone-300">
                  {envName}
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-amber-200">
                  {process.env[envName] ? "ok" : "missing"}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-[1.5rem] bg-amber-300 px-5 py-5 text-stone-950">
            <p className="text-sm font-mono uppercase tracking-[0.28em]">Fluxo atual</p>
            <ol className="mt-4 space-y-3 text-sm leading-6">
              <li>1. O botão cria um pedido local com item, valor e moeda antes de tocar no Stripe.</li>
              <li>2. A Checkout Session recebe o `orderId` no metadata e abre o pagamento hospedado.</li>
              <li>3. O webhook fecha o pedido como pago ou cancelado e guarda o evento processado.</li>
            </ol>
          </div>
        </aside>
      </div>
    </main>
  );
}
