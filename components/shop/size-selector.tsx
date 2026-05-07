"use client";

import { useEffect, useState } from "react";

import { useShippingRegion } from "@/components/cart/use-shipping-region";
import { addCartItem } from "@/components/cart/use-cart";
import { SHIPPING_OPTIONS } from "@/lib/shipping";

type VariantOption = {
  stripePriceId: string;
  label: string;
  price: number;
  currency: string;
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
  const [selected, setSelected] = useState<VariantOption>(variants[0]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const { setShippingRegion, shippingOption, shippingRegion } = useShippingRegion();

  const hasSingleVariant = variants.length === 1;
  const isSizeVariant = variants.every((variant) => variant.size);
  const estimatedTotal = selected.price + shippingOption.amount;

  useEffect(() => {
    if (!feedback) return;

    const timeoutId = window.setTimeout(() => setFeedback(null), 2200);
    return () => window.clearTimeout(timeoutId);
  }, [feedback]);

  const handleAddToCart = () => {
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
    setFeedback("Adicionado ao carrinho.");
  };

  return (
    <>
      <input type="hidden" name="priceId" value={selected.stripePriceId} />
      <input type="hidden" name="shippingRegion" value={shippingRegion} />

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
                  aria-pressed={isSelected}
                  className={`inline-flex h-12 min-w-12 items-center justify-center rounded-xl border px-3 font-mono text-sm font-semibold transition ${
                    isSelected
                      ? "border-[#6B3CF6] bg-[linear-gradient(135deg,#2E5BFF_0%,#6B3CF6_100%)] text-white shadow-[0_10px_24px_rgba(79,70,229,0.26)]"
                      : "border-white/10 bg-white/[0.04] text-white/72 hover:border-white/20 hover:bg-white/[0.07]"
                  }`}
                >
                  {variant.size}
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
                  aria-pressed={isSelected}
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${
                    isSelected
                      ? "border-[#6B3CF6] bg-[linear-gradient(135deg,rgba(46,91,255,0.18)_0%,rgba(107,60,246,0.2)_100%)]"
                      : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]"
                  }`}
                >
                  <span className="flex-1 text-white/78">{variant.label}</span>
                  <span className="font-semibold text-white">
                    {formatCurrency(variant.price, variant.currency)}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
        <label htmlFor="product-shipping-region" className="text-xs font-semibold uppercase tracking-[0.3em] text-white/46">
          Regiao de entrega
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
          <span>{shippingOption.checkoutLabel}</span>
          <span>{formatCurrency(shippingOption.amount, selected.currency)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-sm text-white/54">
          <span>Entrega estimada</span>
          <span>{shippingOption.deliveryWindowLabel}</span>
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
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-6 text-base font-semibold text-white/76 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
        >
          Adicionar ao carrinho
        </button>

        <button
          type="submit"
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2E5BFF_0%,#6B3CF6_100%)] px-8 text-base font-semibold text-white shadow-[0_12px_30px_rgba(79,70,229,0.24)] transition hover:shadow-[0_16px_36px_rgba(107,60,246,0.34)]"
        >
          Comprar agora
        </button>
      </div>

      {feedback ? <p className="mt-3 text-sm text-[#BFC6FF]">{feedback}</p> : null}
    </>
  );
}