"use client";

import Link from "next/link";

import { useCart } from "@/components/cart/use-cart";
import { useShippingRegion } from "@/components/cart/use-shipping-region";

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

const recoveryReasons = [
  "Cartao recusado ou limite indisponivel no momento da tentativa.",
  "Prazo de entrega ou frete ainda precisam de uma ultima validacao.",
  "O cliente preferiu revisar tamanhos, cores ou quantidade antes de concluir.",
];

export function CartCancelRecovery() {
  const { count, items, subtotal } = useCart();
  const { shippingOption } = useShippingRegion();

  const currency = items[0]?.currency ?? "brl";
  const estimatedTotal = subtotal + shippingOption.amount;

  return (
    <section className="w-full max-w-5xl rounded-[2.2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-7 shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#8B5CF6]">Checkout interrompido</p>
          <h1 className="font-display mt-4 text-4xl font-extrabold uppercase tracking-[-0.05em] text-white sm:text-5xl">
            Seu carrinho continua salvo.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/62 sm:text-lg">
            Nenhuma cobranca foi confirmada. Voce pode retomar do ponto em que parou ou voltar ao catalogo para ajustar a selecao antes de tentar novamente.
          </p>

          <div className="mt-8 grid gap-3">
            {recoveryReasons.map((reason) => (
              <div
                key={reason}
                className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] px-5 py-4 text-sm leading-7 text-white/64"
              >
                {reason}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/cart"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2E5BFF_0%,#6B3CF6_100%)] px-8 text-base font-semibold text-white shadow-[0_12px_30px_rgba(79,70,229,0.24)] transition hover:shadow-[0_16px_36px_rgba(107,60,246,0.34)]"
            >
              Retomar checkout
            </Link>
            <Link
              href="/shop"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-8 text-base font-semibold text-white/76 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
            >
              Voltar ao catalogo
            </Link>
          </div>
        </div>

        <aside className="rounded-[1.8rem] border border-white/[0.08] bg-[#0D0E13]/80 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.26)]">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#8B5CF6]">Resumo salvo</p>

          {items.length > 0 ? (
            <>
              <div className="mt-6 flex items-center justify-between text-sm text-white/54">
                <span>Itens no carrinho</span>
                <span>{count}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-white/54">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal, currency)}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-white/54">
                <span>{shippingOption.displayLabel}</span>
                <span>{formatCurrency(shippingOption.amount, currency)}</span>
              </div>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/34">{shippingOption.description}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/34">Entrega estimada: {shippingOption.deliveryWindowLabel}</p>
              <div className="mt-5 h-px bg-gradient-to-r from-transparent via-white/[0.09] to-transparent" />
              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm font-medium uppercase tracking-[0.18em] text-white/42">Total estimado</span>
                <span className="font-display text-3xl font-extrabold text-white">
                  {formatCurrency(estimatedTotal, currency)}
                </span>
              </div>

              <ul className="mt-6 space-y-3">
                {items.slice(0, 3).map((item) => (
                  <li key={item.priceId} className="rounded-[1.2rem] border border-white/8 bg-white/[0.03] px-4 py-3">
                    <p className="text-sm font-medium text-white">{item.productName}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/36">
                      {item.variantLabel} · qtd {item.quantity}
                    </p>
                  </li>
                ))}
              </ul>

              {items.length > 3 ? (
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-white/34">
                  +{items.length - 3} item(ns) aguardando no carrinho
                </p>
              ) : null}
            </>
          ) : (
            <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-white/[0.04] px-5 py-5 text-sm leading-7 text-white/58">
              O checkout foi interrompido, mas nao encontramos itens salvos neste navegador. Volte ao catalogo para montar um novo pedido.
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}