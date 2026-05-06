import { connection } from "next/server";
import Link from "next/link";

import prisma from "@/lib/prisma";

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

  const { session_id } = await searchParams;

  const order = session_id
    ? await prisma.order.findFirst({
        where: { stripeCheckoutSessionId: session_id },
        include: { items: true },
      })
    : null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#fdf2cc_0%,#f4ecdf_100%)] px-6 py-12 text-stone-950">
      <section className="w-full max-w-2xl rounded-[2rem] border border-stone-950/10 bg-white/85 p-8 shadow-[0_24px_80px_rgba(66,45,25,0.18)] backdrop-blur sm:p-10">
        <p className="text-sm font-mono uppercase tracking-[0.3em] text-stone-500">Pagamento recebido</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
          Pedido confirmado.
        </h1>
        <p className="mt-4 text-lg leading-8 text-stone-700">
          Obrigado pela compra! Seu pagamento foi processado com sucesso.
        </p>

        {order ? (
          <div className="mt-8 rounded-[1.5rem] border border-stone-950/8 bg-stone-50/80 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-stone-500">Pedido</p>
                <p className="mt-1 font-mono text-sm text-stone-700">#{order.id.slice(-8).toUpperCase()}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider ${
                  order.status === "paid"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {order.status === "paid" ? "Pago" : "Processando"}
              </span>
            </div>

            {order.items.length > 0 ? (
              <ul className="mt-6 divide-y divide-stone-950/6">
                {order.items.map((item) => (
                  <li key={item.id} className="flex items-center justify-between gap-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-stone-900">{item.name}</p>
                      <p className="text-xs text-stone-500">Qtd: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-stone-900">
                      {formatCurrency(item.totalAmount, order.currency)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-4 flex items-center justify-between border-t border-stone-950/8 pt-4">
              <p className="text-sm font-medium text-stone-700">Total</p>
              <p className="text-lg font-semibold text-stone-950">
                {formatCurrency(order.totalAmount, order.currency)}
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-6">
            <p className="text-sm text-amber-800">
              Seu pedido está sendo processado. Em alguns instantes ele aparecerá no seu histórico.
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-stone-950 px-6 text-sm font-medium text-stone-50 transition hover:bg-stone-800"
            href="/account"
          >
            Ver meus pedidos
          </Link>
          <Link
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-950/10 px-6 text-sm font-medium text-stone-700 transition hover:bg-stone-950/5"
            href="/"
          >
            Voltar para a loja
          </Link>
        </div>
      </section>
    </main>
  );
}