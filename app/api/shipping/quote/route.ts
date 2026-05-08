import { NextResponse } from "next/server";

import {
  buildMelhorEnvioProductFromStripePrice,
  calculateMelhorEnvioShippingQuotes,
  isMelhorEnvioConfigured,
  normalizePostalCode,
} from "@/lib/melhor-envio";
import { resolveShippingOption } from "@/lib/shipping";
import { getStripeServerClient } from "@/lib/stripe";

export const runtime = "nodejs";

type QuoteLineInput = {
  priceId: string;
  quantity: number;
};

function parseRequestBody(value: unknown): {
  fallbackShippingRegion: string | null;
  items: QuoteLineInput[];
  toPostalCode: string;
} | null {
  if (!value || typeof value !== "object") return null;

  const candidate = value as { fallbackShippingRegion?: unknown; items?: unknown; toPostalCode?: unknown };
  if (!Array.isArray(candidate.items) || typeof candidate.toPostalCode !== "string") return null;

  const items = candidate.items
    .map((item) => {
      if (!item || typeof item !== "object") return null;

      const line = item as { priceId?: unknown; quantity?: unknown };
      if (typeof line.priceId !== "string") return null;

      const quantity =
        typeof line.quantity === "number" && Number.isFinite(line.quantity) && line.quantity > 0
          ? Math.floor(line.quantity)
          : 1;

      return {
        priceId: line.priceId,
        quantity,
      };
    })
    .filter(Boolean) as QuoteLineInput[];

  const toPostalCode = normalizePostalCode(candidate.toPostalCode);
  if (items.length === 0 || toPostalCode.length !== 8) return null;

  return {
    fallbackShippingRegion:
      typeof candidate.fallbackShippingRegion === "string" ? candidate.fallbackShippingRegion : null,
    items,
    toPostalCode,
  };
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid quote payload." }, { status: 400 });
  }

  const parsed = parseRequestBody(body);
  if (!parsed) {
    return NextResponse.json({ error: "CEP ou itens invalidos para cotacao." }, { status: 400 });
  }

  const fallbackQuote = resolveShippingOption(parsed.fallbackShippingRegion);

  if (!isMelhorEnvioConfigured()) {
    return NextResponse.json({
      fallbackReason: "Melhor Envio ainda nao esta configurado neste ambiente.",
      integrationAvailable: false,
      quotes: [fallbackQuote],
    });
  }

  try {
    const stripe = getStripeServerClient();
    const prices = await Promise.all(
      parsed.items.map((item) =>
        stripe.prices.retrieve(item.priceId, {
          expand: ["product"],
        })
      )
    );

    const quotes = await calculateMelhorEnvioShippingQuotes({
      products: prices.map((price, index) => buildMelhorEnvioProductFromStripePrice(price, parsed.items[index].quantity)),
      toPostalCode: parsed.toPostalCode,
    });

    return NextResponse.json({
      fallbackReason: quotes.length === 0 ? "Nenhum servico disponivel para este CEP agora. Usando tabela fixa como fallback." : null,
      integrationAvailable: true,
      quotes: quotes.length > 0 ? quotes : [fallbackQuote],
    });
  } catch (error) {
    return NextResponse.json({
      fallbackReason:
        error instanceof Error
          ? `${error.message} Usando tabela fixa como fallback.`
          : "Nao foi possivel consultar o Melhor Envio agora. Usando tabela fixa como fallback.",
      integrationAvailable: false,
      quotes: [fallbackQuote],
    });
  }
}