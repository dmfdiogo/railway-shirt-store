import { notFound } from "next/navigation";
import { connection } from "next/server";
import Image from "next/image";

import prisma from "@/lib/prisma";
import { getStripeServerClient } from "@/lib/stripe";
import { SizeSelector } from "@/components/shop/size-selector";

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

type VariantOption = {
  stripePriceId: string;
  label: string;
  price: number;
  currency: string;
  size?: string;
};

type ProductDetail = {
  name: string;
  description: string | null;
  image: string | null;
  marketingFeatures: string[];
  colors: string[];
  sizes: string[];
  variants: VariantOption[];
};

async function getProductDetail(slug: string): Promise<ProductDetail | null> {
  // DB path — populated after first checkout
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      variants: {
        where: { active: true },
        orderBy: { unitAmount: "asc" },
      },
    },
  });

  if (product && product.variants.length > 0) {
    return {
      name: product.name,
      description: product.description,
      image: product.image,
      marketingFeatures: product.marketingFeatures,
      colors: [],
      sizes: [],
      variants: product.variants.map((v) => ({
        stripePriceId: v.stripePriceId,
        label: v.name,
        price: v.unitAmount,
        currency: v.currency,
        size: v.name.startsWith("Tamanho ") ? v.name.replace("Tamanho ", "") : undefined,
      })),
    };
  }

  // Stripe fallback — before any checkout has happened
  try {
    const stripe = getStripeServerClient();
    const prices = await stripe.prices.list({
      active: true,
      limit: 100,
      expand: ["data.product"],
    });

    const matchingPrices = prices.data.filter((p) => {
      if (p.unit_amount === null) return false;
      if (typeof p.product === "string") return false;
      const prod = p.product;
      if (prod.deleted) return false;
      return slugify(`${prod.name}-${prod.id}`) === slug;
    });

    if (matchingPrices.length === 0) return null;

    const rawProduct = matchingPrices[0].product;
    if (typeof rawProduct === "string" || rawProduct.deleted) return null;

    const meta = rawProduct.metadata ?? {};
    const colors = meta.colors
      ? meta.colors.split(",").map((s: string) => s.trim()).filter(Boolean)
      : [];
    const sizes = meta.sizes
      ? meta.sizes.split(",").map((s: string) => s.trim()).filter(Boolean)
      : [];

    return {
      name: rawProduct.name,
      description: rawProduct.description ?? null,
      image: rawProduct.images?.[0] ?? null,
      marketingFeatures:
        rawProduct.marketing_features?.map((f) => f.name ?? "").filter(Boolean) ?? [],
      colors,
      sizes,
      variants: matchingPrices
        .sort((a, b) => a.unit_amount! - b.unit_amount!)
        .map((p) => ({
          stripePriceId: p.id,
          label: p.nickname ?? rawProduct.name,
          price: p.unit_amount!,
          currency: p.currency,
          size: (p.metadata as Record<string, string>)?.size ?? undefined,
        })),
    };
  } catch {
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await connection();
  const { slug } = await params;
  const product = await getProductDetail(slug);

  if (!product) notFound();

  const firstVariant = product.variants[0];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#ffd36d_0%,#f6efe4_26%,#efe3ce_56%,#d8c3a5_100%)] px-6 py-12 text-stone-950 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <a
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition hover:text-stone-950"
        >
          ← Catálogo
        </a>

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left: Product image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#f6efe4,#ffd36d30)] shadow-[0_12px_40px_rgba(66,45,25,0.12)]">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="select-none text-9xl" aria-hidden="true">
                  👕
                </span>
              </div>
            )}
          </div>

          {/* Right: Product info */}
          <div className="flex flex-col">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-stone-500">
              Produto
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
              {product.name}
            </h1>

            {product.description ? (
              <p className="mt-5 text-base leading-7 text-stone-600">{product.description}</p>
            ) : null}

            {product.marketingFeatures.length > 0 ? (
              <ul className="mt-5 space-y-2">
                {product.marketingFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-stone-700">
                    <span className="flex-shrink-0 text-amber-500" aria-hidden="true">
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            ) : null}

            {product.colors.length > 0 ? (
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-stone-500">Cores:</span>
                {product.colors.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-sm text-stone-700"
                  >
                    {c}
                  </span>
                ))}
              </div>
            ) : null}

            <hr className="my-7 border-stone-200" />

            <form action="/api/checkout-session" method="POST">
              {product.variants.length > 1 ? (
                <SizeSelector variants={product.variants} />
              ) : (
                <>
                  <input type="hidden" name="priceId" value={firstVariant.stripePriceId} />
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-3xl font-semibold tracking-[-0.04em]">
                      {formatCurrency(firstVariant.price, firstVariant.currency)}
                    </span>
                    <button
                      type="submit"
                      className="inline-flex min-h-12 items-center justify-center rounded-full bg-stone-950 px-8 text-base font-medium text-stone-50 transition hover:bg-stone-800"
                    >
                      Comprar agora
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
