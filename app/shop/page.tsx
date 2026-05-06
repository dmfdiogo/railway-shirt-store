import { connection } from "next/server";
import Image from "next/image";

import prisma from "@/lib/prisma";
import { getStripeServerClient } from "@/lib/stripe";

export const runtime = "nodejs";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

type CatalogItem = {
  id: string;
  slug: string;
  stripeProductId: string;
  name: string;
  variantLabel: string | null;
  description: string | null;
  image: string | null;
  price: number;
  currency: string;
  stripePriceId: string;
  marketingFeatures: string[];
  colors: string[];
  sizes: string[];
};

async function getCatalogItems(): Promise<CatalogItem[]> {
  // Prefer DB (populated after first checkout)
  const variants = await prisma.productVariant.findMany({
    where: { active: true },
    include: { product: true },
    orderBy: { createdAt: "asc" },
  });

  if (variants.length > 0) {
    return variants.map((v) => ({
      id: v.id,
      slug: v.product.slug,
      stripeProductId: v.product.stripeProductId ?? "",
      name: v.product.name,
      variantLabel: v.name !== v.product.name ? v.name : null,
      description: v.product.description,
      image: v.product.image,
      price: v.unitAmount,
      currency: v.currency,
      stripePriceId: v.stripePriceId,
      marketingFeatures: v.product.marketingFeatures,
      colors: [],
      sizes: [],
    }));
  }

  // Fallback: list all active prices from Stripe (before any checkout has happened)
  try {
    const stripe = getStripeServerClient();
    const prices = await stripe.prices.list({
      active: true,
      limit: 100,
      expand: ["data.product"],
    });

    return prices.data
      .filter((p) => p.unit_amount !== null)
      .map((p) => {
        const rawProduct =
          typeof p.product !== "string" && !p.product.deleted ? p.product : null;
        const productName = rawProduct?.name ?? "Beart Store Shirt";
        const variantLabel = p.nickname && p.nickname !== productName ? p.nickname : null;
        const features = rawProduct?.marketing_features?.map((f) => f.name ?? "").filter(Boolean) ?? [];
        const meta = rawProduct?.metadata ?? {};
        const colors = meta.colors ? meta.colors.split(",").map((s: string) => s.trim()).filter(Boolean) : [];
        const sizes = meta.sizes ? meta.sizes.split(",").map((s: string) => s.trim()).filter(Boolean) : [];
        return {
          id: p.id,
          slug: slugify(`${productName}-${rawProduct?.id ?? ""}`),
          stripeProductId: rawProduct?.id ?? "",
          name: productName,
          variantLabel,
          description: rawProduct?.description ?? null,
          image: rawProduct?.images?.[0] ?? null,
          price: p.unit_amount!,
          currency: p.currency,
          stripePriceId: p.id,
          marketingFeatures: features,
          colors,
          sizes,
        };
      });
  } catch {
    return [];
  }
}

type ProductCard = {
  slug: string;
  name: string;
  description: string | null;
  image: string | null;
  startingPrice: number;
  currency: string;
  marketingFeatures: string[];
  colors: string[];
  sizes: string[];
  variantCount: number;
};

function groupByProduct(items: CatalogItem[]): ProductCard[] {
  const map = new Map<string, ProductCard>();
  for (const item of items) {
    const existing = map.get(item.slug);
    if (!existing) {
      map.set(item.slug, {
        slug: item.slug,
        name: item.name,
        description: item.description,
        image: item.image,
        startingPrice: item.price,
        currency: item.currency,
        marketingFeatures: item.marketingFeatures,
        colors: item.colors,
        sizes: item.sizes,
        variantCount: 1,
      });
    } else {
      existing.variantCount++;
      if (item.price < existing.startingPrice) {
        existing.startingPrice = item.price;
        existing.currency = item.currency;
      }
      if (existing.colors.length === 0 && item.colors.length > 0) {
        existing.colors = item.colors;
      }
      if (existing.sizes.length === 0 && item.sizes.length > 0) {
        existing.sizes = item.sizes;
      }
    }
  }
  return Array.from(map.values());
}

export default async function ShopPage() {
  await connection();

  const items = await getCatalogItems();
  const products = groupByProduct(items);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#ffd36d_0%,#f6efe4_26%,#efe3ce_56%,#d8c3a5_100%)] px-6 py-12 text-stone-950 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12">
          <a
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition hover:text-stone-950"
          >
            ← Início
          </a>
          <p className="text-sm font-mono uppercase tracking-[0.35em] text-stone-500">Catálogo</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
            Produtos da loja.
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-stone-700">
            Escolha o produto e finalize a compra de forma segura via Stripe Checkout.
          </p>
        </header>

        {products.length === 0 ? (
          <div className="rounded-[2rem] border border-stone-950/10 bg-white/80 p-10 text-center">
            <p className="text-stone-600">Nenhum produto disponível no momento.</p>
          </div>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <li key={product.slug}>
                <a
                  href={`/shop/${product.slug}`}
                  className="flex flex-col rounded-[2rem] border border-stone-950/10 bg-white/85 p-7 shadow-[0_12px_40px_rgba(66,45,25,0.12)] backdrop-blur transition hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(66,45,25,0.18)]"
                >
                {/* Product image */}
                <div className="mb-6 overflow-hidden rounded-[1.5rem] bg-[linear-gradient(135deg,#f6efe4,#ffd36d30)] aspect-square w-full relative">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="text-6xl select-none" aria-hidden="true">
                        👕
                      </span>
                    </div>
                  )}
                </div>

                  <div className="flex flex-1 flex-col">
                    <h2 className="text-xl font-semibold tracking-[-0.03em] text-stone-950">
                      {product.name}
                    </h2>
                    {product.variantCount > 1 ? (
                      <span className="mt-1 inline-block w-fit rounded-full bg-stone-100 px-3 py-0.5 text-xs font-medium text-stone-600">
                        {product.variantCount} opções
                      </span>
                    ) : null}
                    {product.description ? (
                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-stone-600">
                        {product.description}
                      </p>
                    ) : null}

                    {product.marketingFeatures.length > 0 ? (
                      <ul className="mt-3 space-y-1">
                        {product.marketingFeatures.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-stone-700">
                            <span className="text-amber-500" aria-hidden="true">✓</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {product.colors.length > 0 ? (
                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        <span className="text-xs text-stone-500 font-medium">Cores:</span>
                        {product.colors.map((c) => (
                          <span key={c} className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-0.5 text-xs text-stone-700">{c}</span>
                        ))}
                      </div>
                    ) : null}

                    {product.sizes.length > 0 ? (
                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        <span className="text-xs text-stone-500 font-medium">Tamanhos:</span>
                        {product.sizes.map((s) => (
                          <span key={s} className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-0.5 text-xs font-mono text-stone-700">{s}</span>
                        ))}
                      </div>
                    ) : null}

                    <div className="mt-auto pt-6 flex items-center justify-between gap-4">
                      <div>
                        {product.variantCount > 1 ? (
                          <p className="text-xs text-stone-500">a partir de</p>
                        ) : null}
                        <span className="text-2xl font-semibold tracking-[-0.04em]">
                          {formatCurrency(product.startingPrice, product.currency)}
                        </span>
                      </div>
                      <span className="inline-flex min-h-11 items-center justify-center rounded-full bg-stone-950 px-5 text-sm font-medium text-stone-50">
                        Ver produto →
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
