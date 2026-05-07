"use client";

import { useState } from "react";

import { useShippingQuote } from "@/components/cart/use-shipping-quote";
import { useShippingRegion } from "@/components/cart/use-shipping-region";
import { addCartItem } from "@/components/cart/use-cart";
import { pushToast } from "@/components/ui/toaster";
import { SHIPPING_OPTIONS, serializeCheckoutShippingOption } from "@/lib/shipping";

type VariantOption = {
  available: boolean;
  stripePriceId: string;
  label: string;
  price: number;
  currency: string;
  stockQuantity: number | null;
  size?: string;
};

type SizeSelectorProps = {
  productImage: string | null;
  productName: string;
  productSlug: string;
  variants: VariantOption[];
};

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

export function SizeSelector({
  productImage,
  productName,
  productSlug,
  variants,
}: SizeSelectorProps) {
  const [selected, setSelected] = useState<VariantOption>(
    variants.find((variant) => variant.available) ?? variants[0]
  );
  const { setShippingRegion, shippingOption, shippingRegion } = useShippingRegion();
  const { integrationAvailable, isLoading, postalCode, quoteError, quotes, selectedQuote, selectQuote, setPostalCode } =
    useShippingQuote([
      {
        priceId: selected.stripePriceId,
        quantity: 1,
      },
    ]);

  const hasSingleVariant = variants.length === 1;
  const isSizeVariant = variants.every((variant) => variant.size);
  const activeShippingOption = selectedQuote ?? shippingOption;
  const estimatedTotal = selected.price + activeShippingOption.amount;
  const hasAvailableVariants = variants.some((variant) => variant.available);

  const handleAddToCart = () => {
    if (!selected.available) return;

    addCartItem({
      priceId: selected.stripePriceId,
      slug: productSlug,
      productName,
      variantLabel: selected.label,
      image: productImage,
      currency: selected.currency,
      unitAmount: selected.price,
      size: selected.size,
    });
    pushToast({
      tone: "success",
      title: "Adicionado ao carrinho",
      description: `${productName} · ${selected.label}`,
    });
  };

  return (
    <>
      <input type="hidden" name="priceId" value={selected.stripePriceId} />
      <input type="hidden" name="shippingRegion" value={shippingRegion} />
      <input type="hidden" name="shippingQuote" value={serializeCheckoutShippingOption(selectedQuote)} />

      {hasSingleVariant ? (
        <div className="mb-2 flex items-end justify-between gap-4">
          <span className="text-sm font-medium uppercase tracking-[0.18em] text-white/48">Peça</span>
          <span className="font-display text-3xl font-extrabold tracking-[-0.04em] text-white tabular-nums">
            {formatCurrency(selected.price, selected.currency)}
          </span>
        </div>
      ) : isSizeVariant ? (
        <>
          <div className="mb-2 flex items-end justify-between gap-4">
            <span className="text-sm font-medium uppercase tracking-[0.18em] text-white/48">Tamanho</span>
            <span className="font-display text-3xl font-extrabold tracking-[-0.04em] text-white tabular-nums">
              {formatCurrency(selected.price, selected.currency)}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {variants.map((variant) => {
              const isSelected = variant.stripePriceId === selected.stripePriceId;
              return (
                <button
                  key={variant.stripePriceId}
                  type="button"
                  onClick={() => setSelected(variant)}
                  disabled={!variant.available}
                  aria-pressed={isSelected}
                  className={`inline-flex h-12 min-w-12 items-center justify-center gap-2 rounded-xl border px-3 font-mono text-sm font-semibold transition ${
                    !variant.available
                      ? "border-red-300/20 bg-red-500/10 text-red-100"
                      : isSelected
                      ? "border-[#6B3CF6] bg-[linear-gradient(135deg,#2E5BFF_0%,#6B3CF6_100%)] text-white shadow-[0_10px_24px_rgba(79,70,229,0.26)]"
                      : "border-white/10 bg-white/[0.04] text-white/72 hover:border-white/20 hover:bg-white/[0.07]"
                  }`}
                >
                  {variant.size}
                  {!variant.available ? <span className="text-[10px] uppercase tracking-[0.18em]">Esg.</span> : null}
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <fieldset>
          <legend className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-white/48">
            Escolha uma opção
          </legend>
          <div className="space-y-2">
            {variants.map((variant) => {
              const isSelected = variant.stripePriceId === selected.stripePriceId;
              return (
                <button
                  key={variant.stripePriceId}
                  type="button"
                  onClick={() => setSelected(variant)}
                  disabled={!variant.available}
                  aria-pressed={isSelected}
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${
                    !variant.available
                      ? "border-red-300/20 bg-red-500/10"
                      : isSelected
                      ? "border-[#6B3CF6] bg-[linear-gradient(135deg,rgba(46,91,255,0.18)_0%,rgba(107,60,246,0.2)_100%)]"
                      : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]"
                  }`}
                >
                  <span className={`flex-1 ${variant.available ? "text-white/78" : "text-red-100"}`}>
                    {variant.label}
                  </span>
                  {!variant.available ? (
                    <span className="rounded-full border border-red-300/20 bg-red-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-red-100">
                      Esgotado
                    </span>
                  ) : null}
                  <span className={`font-semibold ${variant.available ? "text-white" : "text-red-100"}`}>
                    {formatCurrency(variant.price, variant.currency)}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
        <label htmlFor="product-shipping-postal-code" className="text-xs font-semibold uppercase tracking-[0.3em] text-white/46">
          CEP de entrega
        </label>
        <input
          id="product-shipping-postal-code"
          inputMode="numeric"
          maxLength={9}
          value={postalCode}
          onChange={(event) => setPostalCode(event.target.value)}
          placeholder="00000-000"
          className="mt-3 h-12 w-full rounded-2xl border border-white/10 bg-[#0D0E13] px-4 text-sm font-medium text-white outline-none transition placeholder:text-white/22 focus:border-[#6B3CF6]"
        />

        {isLoading ? <p className="mt-3 text-sm text-white/56">Consultando servicos disponiveis...</p> : null}

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
                    {formatCurrency(quote.amount, selected.currency)}
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
              {quoteError ?? "Melhor Envio indisponivel neste ambiente. Use a regiao abaixo enquanto a integracao e configurada."}
            </p>
          </div>
        ) : null}

        <label htmlFor="product-shipping-region" className="mt-4 block text-xs font-semibold uppercase tracking-[0.3em] text-white/46">
          Regiao de fallback
        </label>
        <select
          id="product-shipping-region"
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

        <div className="mt-4 flex items-center justify-between text-sm text-white/54">
          <span>{activeShippingOption.checkoutLabel}</span>
          <span>{formatCurrency(activeShippingOption.amount, selected.currency)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-sm text-white/54">
          <span>Entrega estimada</span>
          <span>{activeShippingOption.deliveryWindowLabel}</span>
        </div>
        <div className="mt-4 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-medium uppercase tracking-[0.18em] text-white/42">Total estimado</span>
          <span className="font-display text-2xl font-extrabold text-white">
            {formatCurrency(estimatedTotal, selected.currency)}
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!selected.available || !hasAvailableVariants}
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-6 text-base font-semibold text-white/76 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
        >
          {selected.available ? "Adicionar ao carrinho" : "Indisponível"}
        </button>

        <button
          type="submit"
          disabled={!selected.available || !hasAvailableVariants}
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2E5BFF_0%,#6B3CF6_100%)] px-8 text-base font-semibold text-white shadow-[0_12px_30px_rgba(79,70,229,0.24)] transition hover:shadow-[0_16px_36px_rgba(107,60,246,0.34)]"
        >
          {selected.available ? "Comprar agora" : "Sem estoque"}
        </button>
      </div>

      {!hasAvailableVariants ? (
        <p className="mt-3 rounded-2xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          Todas as variações desta peça estão esgotadas no momento.
        </p>
      ) : !selected.available ? (
        <p className="mt-3 rounded-2xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          Esta variação está esgotada. Escolha outra opção para continuar.
        </p>
      ) : null}
    </>
  );
}