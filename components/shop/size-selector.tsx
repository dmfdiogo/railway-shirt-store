"use client";

import { useState } from "react";

type VariantOption = {
  stripePriceId: string;
  label: string;
  price: number;
  currency: string;
  size?: string;
};

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

export function SizeSelector({ variants }: { variants: VariantOption[] }) {
  const [selected, setSelected] = useState<VariantOption>(variants[0]);

  const isSizeVariant = variants.every((v) => v.size);

  if (isSizeVariant) {
    return (
      <>
        <div className="mb-3 flex items-end justify-between gap-4">
          <span className="text-sm font-medium text-stone-700">Tamanho:</span>
          <span className="text-2xl font-semibold tracking-[-0.04em] text-stone-950 tabular-nums">
            {formatCurrency(selected.price, selected.currency)}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {variants.map((v) => {
            const isSelected = v.stripePriceId === selected.stripePriceId;
            return (
              <label key={v.stripePriceId} className="cursor-pointer">
                <input
                  type="radio"
                  name="priceId"
                  value={v.stripePriceId}
                  defaultChecked={v.stripePriceId === variants[0].stripePriceId}
                  onChange={() => setSelected(v)}
                  className="sr-only"
                />
                <span
                  className={`inline-flex h-12 min-w-12 items-center justify-center rounded-xl border-2 px-3 font-mono text-sm font-semibold transition ${
                    isSelected
                      ? "border-stone-950 bg-stone-950 text-stone-50"
                      : "border-stone-200 bg-white/80 text-stone-700 hover:border-stone-400"
                  }`}
                >
                  {v.size}
                </span>
              </label>
            );
          })}
        </div>

        <button
          type="submit"
          className="mt-6 inline-flex w-full min-h-12 items-center justify-center rounded-full bg-stone-950 px-8 text-base font-medium text-stone-50 transition hover:bg-stone-800"
        >
          Comprar agora
        </button>
      </>
    );
  }

  // Fallback: radio list for non-size variants
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-medium text-stone-700">Escolha uma opção:</legend>
      <div className="space-y-2">
        {variants.map((v, i) => (
          <label
            key={v.stripePriceId}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-stone-200 bg-white/80 px-4 py-3 transition hover:border-stone-400"
          >
            <input
              type="radio"
              name="priceId"
              value={v.stripePriceId}
              defaultChecked={i === 0}
              className="accent-stone-950"
            />
            <span className="flex-1 text-stone-800">{v.label}</span>
            <span className="font-semibold text-stone-950">
              {formatCurrency(v.price, v.currency)}
            </span>
          </label>
        ))}
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex w-full min-h-12 items-center justify-center rounded-full bg-stone-950 px-8 text-base font-medium text-stone-50 transition hover:bg-stone-800"
      >
        Comprar agora
      </button>
    </fieldset>
  );
}
