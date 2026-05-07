import type { Metadata } from "next";
import { connection } from "next/server";
import { headers } from "next/headers";
import Link from "next/link";

import { CartSuccessReset } from "@/components/cart/cart-success-reset";
import { MysticBackground } from "@/components/ui/mystic-background";
import { Navbar } from "@/components/ui/navbar";
import { SiteFooter } from "@/components/ui/site-footer";
import { auth, isAuthConfigured } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Pedido confirmado — Be Art",
  description: "Página de confirmação de checkout da Be Art para uso transacional pós-pagamento.",
  path: "/checkout/success",
});

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

export default async function CheckoutSuccessPage({
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

  const order = session_id
    ? await prisma.order.findFirst({
        where: { stripeCheckoutSessionId: session_id },
        include: { items: true },
      })
    : null;

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

      <CartSuccessReset />
      <Navbar sessionActive={!!session} authReady={authReady} />

      <section className="relative z-10 flex min-h-screen flex-col justify-between pt-20">
        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-3xl rounded-[2.2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-8 shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#8B5CF6]">Pagamento recebido</p>
          <h1 className="font-display mt-4 text-4xl font-extrabold uppercase tracking-[-0.05em] text-white sm:text-5xl">
            Pedido confirmado.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/62 sm:text-lg">
            O checkout foi concluido com sucesso. Sua compra ja entrou no fluxo da Be Art e o historico fica disponivel na area da conta.
          </p>

          {order ? (
            <div className="mt-8 rounded-[1.8rem] border border-white/[0.08] bg-[#0D0E13]/80 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.26)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#A5ADFF]">Pedido</p>
                  <p className="mt-2 font-mono text-sm text-white/62">#{order.id.slice(-8).toUpperCase()}</p>
                </div>
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] ${
                    order.status === "paid"
                      ? "border-emerald-300/20 bg-emerald-500/10 text-emerald-100"
                      : "border-amber-300/20 bg-amber-500/10 text-amber-100"
                  }`}
                >
                  {order.status === "paid" ? "Pago" : "Processando"}
                </span>
              </div>

              {order.items.length > 0 ? (
                <ul className="mt-6 space-y-3">
                  {order.items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-4 rounded-[1.2rem] border border-white/8 bg-white/[0.03] px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-medium text-white">{item.name}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/36">Qtd {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-white">
                        {formatCurrency(item.totalAmount, order.currency)}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-6 h-px bg-gradient-to-r from-transparent via-white/[0.09] to-transparent" />
              <div className="mt-5 flex items-center justify-between">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/42">Total</p>
                <p className="font-display text-3xl font-extrabold text-white">
                  {formatCurrency(order.totalAmount, order.currency)}
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-[1.5rem] border border-amber-300/20 bg-amber-500/10 p-6">
              <p className="text-sm leading-7 text-amber-100">
                Seu pedido esta sendo processado. Em instantes ele aparecera no historico da sua conta.
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2E5BFF_0%,#6B3CF6_100%)] px-6 text-sm font-medium text-white shadow-[0_16px_38px_rgba(61,79,255,0.34)] transition hover:-translate-y-0.5"
              href="/account"
            >
              Ver meus pedidos
            </Link>
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-6 text-sm font-medium text-white/76 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
              href="/"
            >
              Voltar para a loja
            </Link>
          </div>
        </div>
        </div>
        <SiteFooter authReady={authReady} sessionActive={!!session} />
      </section>
    </main>
  );
}