"use client";

import Image from "next/image";
import Link from "next/link";

import { useShippingQuote } from "@/components/cart/use-shipping-quote";
import { useShippingRegion } from "@/components/cart/use-shipping-region";
import { useCart } from "@/components/cart/use-cart";
import { SHIPPING_OPTIONS, serializeCheckoutShippingOption } from "@/lib/shipping";

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

export function CartPageContent() {
  const { items, subtotal, removeItem, updateQuantity } = useCart();
  const { setShippingRegion, shippingOption, shippingRegion } = useShippingRegion();
  const { integrationAvailable, isLoading, postalCode, quoteError, quotes, selectedQuote, selectQuote, setPostalCode } =
    useShippingQuote(items.map((item) => ({ priceId: item.priceId, quantity: item.quantity })));
  const checkoutPayload = JSON.stringify(
    items.map((item) => ({ priceId: item.priceId, quantity: item.quantity }))
  );
  const activeShippingOption = selectedQuote ?? shippingOption;
  const estimatedTotal = subtotal + activeShippingOption.amount;

  if (items.length === 0) {
    return (
      <section className="rounded-[2.2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-8 py-10 text-center shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#8B5CF6]">Carrinho</p>
        <h1 className="font-display mt-4 text-4xl font-extrabold uppercase tracking-[-0.05em] text-white sm:text-5xl">
          Seu carrinho está vazio.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-white/58">
          Adicione peças da coleção para montar o checkout antes de seguir para o Stripe.
        </p>
        <div className="mx-auto mt-6 grid max-w-2xl gap-3 text-left sm:grid-cols-2">
          <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] px-5 py-4 text-sm leading-7 text-white/62">
            Escolha uma peça no catálogo e adicione a variação correta antes de calcular o frete.
          </div>
          <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] px-5 py-4 text-sm leading-7 text-white/62">
            Quando houver itens salvos, o resumo do carrinho fica persistido neste navegador.
          </div>
        </div>
        <Link
          href="/shop"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2E5BFF_0%,#6B3CF6_100%)] px-8 text-base font-semibold text-white shadow-[0_16px_42px_rgba(61,79,255,0.34)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_54px_rgba(107,60,246,0.42)]"
        >
          Explorar catálogo
        </Link>
      </section>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
      <section className="rounded-[2.2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-6">
        <div className="flex items-end justify-between gap-6 border-b border-white/[0.08] pb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#8B5CF6]">Carrinho</p>
            <h1 className="font-display mt-3 text-3xl font-extrabold uppercase tracking-[-0.05em] text-white sm:text-4xl">
              Peças reservadas.
            </h1>
          </div>
          <p className="text-sm text-white/46">{items.length} item(ns)</p>
        </div>

        <ul className="divide-y divide-white/[0.08]">
          {items.map((item) => (
            <li key={item.priceId} className="grid gap-4 py-5 sm:grid-cols-[7rem_minmax(0,1fr)]">
              <div className="relative aspect-[4/4.5] overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-[linear-gradient(145deg,#16161d,#0d0e13)]">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.productName}
                    fill
                    sizes="160px"
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#ebe3d8] text-4xl opacity-50">
                    👕
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <Link href={`/shop/${item.slug}`} className="font-display text-xl font-bold uppercase tracking-[0.01em] text-white hover:text-[#BFC6FF]">
                    {item.productName}
                  </Link>
                  <p className="mt-2 text-sm text-white/54">{item.variantLabel}</p>
                  {item.size ? (
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-white/36">
                      Tamanho {item.size}
                    </p>
                  ) : null}
                  <p className="mt-3 font-display text-2xl font-extrabold text-white">
                    {formatCurrency(item.unitAmount * item.quantity, item.currency)}
                  </p>
                </div>

                <div className="flex flex-col items-start gap-3 sm:items-end">
                  <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.priceId, item.quantity - 1)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/72 transition hover:bg-white/[0.08] hover:text-white"
                      aria-label={`Diminuir quantidade de ${item.productName}`}
                    >
                      −
                    </button>
                    <span className="min-w-10 text-center text-sm font-semibold text-white">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.priceId, item.quantity + 1)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/72 transition hover:bg-white/[0.08] hover:text-white"
                      aria-label={`Aumentar quantidade de ${item.productName}`}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.priceId)}
                    className="text-sm font-medium text-white/46 transition hover:text-white"
                  >
                    Remover
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <aside className="rounded-[2.2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#8B5CF6]">Resumo</p>

        <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
          <label htmlFor="shipping-postal-code" className="text-xs font-semibold uppercase tracking-[0.3em] text-white/46">
            CEP de entrega
          </label>
          <input
            id="shipping-postal-code"
            name="shipping-postal-code"
            inputMode="numeric"
            maxLength={9}
            value={postalCode}
            onChange={(event) => setPostalCode(event.target.value)}
            placeholder="00000-000"
            className="mt-3 h-12 w-full rounded-2xl border border-white/10 bg-[#0D0E13] px-4 text-sm font-medium text-white outline-none transition placeholder:text-white/22 focus:border-[#6B3CF6]"
          />
          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-white/36">
            {selectedQuote
              ? `${selectedQuote.checkoutLabel} · ${selectedQuote.deliveryWindowLabel}`
              : "Digite um CEP valido para cotar fretes reais do Melhor Envio."}
          </p>

          {isLoading ? (
            <p className="mt-3 text-sm text-white/56">Consultando servicos disponiveis...</p>
          ) : null}

          {quotes.length > 0 ? (
            <div className="mt-4 space-y-2">
              {quotes.map((quote) => {
                const isSelected = selectedQuote?.code === quote.code;

                return (
                  <button
                    key={quote.code}
                    type="button"
                    onClick={() => selectQuote(quote.code)}
                    aria-pressed={isSelected}
                    className={`flex w-full items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-left transition ${
                      isSelected
                        ? "border-[#6B3CF6] bg-[linear-gradient(135deg,rgba(46,91,255,0.18)_0%,rgba(107,60,246,0.2)_100%)]"
                        : "border-white/10 bg-black/10 hover:border-white/20 hover:bg-white/[0.05]"
                    }`}
                  >
                    <span>
                      <span className="block text-sm font-semibold text-white">{quote.displayLabel}</span>
                      <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-white/42">
                        {quote.deliveryWindowLabel}
                      </span>
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {formatCurrency(quote.amount, items[0].currency)}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : null}

          {!integrationAvailable || quoteError ? (
            <div className="mt-4 rounded-2xl border border-amber-300/20 bg-amber-500/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-100/90">
                Fallback manual
              </p>
              <p className="mt-2 text-sm leading-6 text-amber-50/82">
                {quoteError ?? "Melhor Envio indisponivel neste ambiente. Use a tabela fixa por regiao enquanto configuramos as credenciais."}
              </p>
            </div>
          ) : null}

          <label htmlFor="shipping-region" className="mt-4 block text-xs font-semibold uppercase tracking-[0.3em] text-white/46">
            Regiao de fallback
          </label>
          <select
            id="shipping-region"
            name="shipping-region"
            value={shippingRegion}
            onChange={(event) => setShippingRegion(event.target.value)}
            className="mt-3 h-12 w-full rounded-2xl border border-white/10 bg-[#0D0E13] px-4 text-sm font-medium text-white outline-none transition focus:border-[#6B3CF6]"
          >
            {SHIPPING_OPTIONS.map((option) => (
              <option key={option.code} value={option.code}>
                {option.displayLabel} · {option.description}
              </option>
            ))}
          </select>
          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-white/36">{shippingOption.checkoutLabel} · {shippingOption.deliveryWindowLabel}</p>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm text-white/56">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal, items[0].currency)}</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm text-white/56">
          <span>Frete</span>
          <span>{formatCurrency(activeShippingOption.amount, items[0].currency)}</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm text-white/56">
          <span>Descontos</span>
          <span>Aplicados no Stripe</span>
        </div>
        <div className="mt-5 h-px bg-gradient-to-r from-transparent via-white/[0.09] to-transparent" />
        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm font-medium uppercase tracking-[0.18em] text-white/42">Total estimado</span>
          <span className="font-display text-3xl font-extrabold text-white">
            {formatCurrency(estimatedTotal, items[0].currency)}
          </span>
        </div>

        <form action="/api/checkout-session" method="POST" className="mt-6">
          <input type="hidden" name="cart" value={checkoutPayload} />
          <input type="hidden" name="shippingRegion" value={shippingRegion} />
          <input type="hidden" name="shippingQuote" value={serializeCheckoutShippingOption(selectedQuote)} />
          <button
            type="submit"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#2E5BFF_0%,#6B3CF6_100%)] px-8 text-base font-semibold text-white shadow-[0_12px_30px_rgba(79,70,229,0.24)] transition hover:shadow-[0_16px_36px_rgba(107,60,246,0.34)]"
          >
            Ir para o checkout
          </button>
        </form>

        <Link
          href="/shop"
          className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-8 text-base font-semibold text-white/76 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
        >
          Continuar comprando
        </Link>
      </aside>
    </div>
  );
}