import type { Metadata } from "next";
import { headers } from "next/headers";
import { connection } from "next/server";
import Image from "next/image";
import Link from "next/link";

import { auth, isAuthConfigured } from "@/lib/auth";
import { getStorefrontProducts } from "@/lib/storefront";
import { MysticBackground } from "@/components/ui/mystic-background";
import { Navbar } from "@/components/ui/navbar";

export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Catálogo — Be Art",
  description:
    "Explore o catálogo Be Art com camisetas de rave de presença noturna, acabamento premium e linguagem visual autoral.",
  alternates: {
    canonical: "/shop",
  },
  openGraph: {
    title: "Catálogo — Be Art",
    description:
      "Camisetas de rave com contraste preciso, presença visual e atmosfera noturna.",
    url: "/shop",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Catálogo — Be Art",
    description:
      "Camisetas de rave com contraste preciso, presença visual e atmosfera noturna.",
  },
};

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

function getQueryValue(value: string | string[] | undefined) {
  return typeof value === "string" ? value : "";
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ color?: string | string[]; category?: string | string[] }>;
}) {
  await connection();

  const authReady = isAuthConfigured();
  const session = authReady
    ? await auth.api.getSession({ headers: await headers() }).catch(() => null)
    : null;

  const [products, resolvedSearchParams] = await Promise.all([
    getStorefrontProducts(),
    searchParams,
  ]);

  const selectedColor = getQueryValue(resolvedSearchParams.color);
  const selectedCategory = getQueryValue(resolvedSearchParams.category);

  const colors = Array.from(new Set(products.flatMap((product) => product.colors))).sort((a, b) =>
    a.localeCompare(b, "pt-BR")
  );
  const categories = Array.from(
    new Set(products.map((product) => product.category).filter(Boolean) as string[])
  ).sort((a, b) => a.localeCompare(b, "pt-BR"));

  const filteredProducts = products.filter((product) => {
    if (selectedColor && !product.colors.includes(selectedColor)) return false;
    if (selectedCategory && product.category !== selectedCategory) return false;
    return true;
  });

  const hasActiveFilters = Boolean(selectedColor || selectedCategory);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0E0D10] text-white">
      <MysticBackground />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(240,235,228,0.07),rgba(240,235,228,0.02)_24%,transparent_58%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_50%_0%,rgba(238,231,222,0.16),transparent_62%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[22rem] h-[28rem] bg-[radial-gradient(circle_at_50%_30%,rgba(188,176,158,0.08),transparent_66%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      <Navbar sessionActive={!!session} authReady={authReady} />

      <main className="relative z-10 px-6 pb-16 pt-28 sm:px-10 sm:pt-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <header className="mb-10 rounded-[2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-6 py-6 shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:px-8 sm:py-7">
            <Link
              href="/"
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-white/45 transition hover:text-white"
            >
              ← Início
            </Link>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#8B5CF6]">
                  Catálogo
                </p>
                <h1 className="font-display mt-3 max-w-3xl text-2xl font-extrabold uppercase leading-[0.96] tracking-[-0.04em] sm:text-3xl lg:text-[2.7rem]">
                  Camisetas para presença noturna.
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/56 sm:text-base">
                  Todos os produtos ativos aparecem aqui com a mesma linguagem escura, sofisticada e precisa da landing.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:w-[22rem]">
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3.5 backdrop-blur-xl">
                  <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/35">
                    Itens visíveis
                  </p>
                  <p className="font-display mt-2 text-3xl font-extrabold text-white">
                    {filteredProducts.length}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3.5 backdrop-blur-xl">
                  <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/35">
                    Filtros
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/62">
                    {hasActiveFilters ? "Cor e categoria aplicadas em tempo real." : "Use cor e categoria para lapidar a vitrine."}
                  </p>
                </div>
              </div>
            </div>

            <form className="mt-6 grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto_auto]" method="GET">
              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/38">Cor</span>
                <select
                  name="color"
                  defaultValue={selectedColor}
                  className="min-h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none transition focus:border-[#6B3CF6]/60"
                >
                  <option value="">Todas as cores</option>
                  {colors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/38">Categoria</span>
                <select
                  name="category"
                  defaultValue={selectedCategory}
                  className="min-h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none transition focus:border-[#6B3CF6]/60 disabled:text-white/30"
                  disabled={categories.length === 0}
                >
                  <option value="">Todas as categorias</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center self-end rounded-full bg-[linear-gradient(135deg,#2E5BFF_0%,#6B3CF6_100%)] px-6 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(79,70,229,0.24)] transition hover:shadow-[0_16px_36px_rgba(107,60,246,0.34)]"
              >
                Aplicar filtros
              </button>

              <Link
                href="/shop"
                className="inline-flex min-h-12 items-center justify-center self-end rounded-full border border-white/10 bg-white/[0.04] px-6 text-sm font-semibold text-white/72 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
              >
                Limpar
              </Link>
            </form>
          </header>

          {filteredProducts.length === 0 ? (
            <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-10 text-center backdrop-blur-xl">
              <p className="font-display text-2xl font-bold uppercase text-white">Nada corresponde a este recorte.</p>
              <p className="mt-3 text-white/58">
                Ajuste cor ou categoria para voltar a ver as peças disponíveis.
              </p>
              <Link
                href="/shop"
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm font-semibold text-white/76 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
              >
                Ver catálogo completo
              </Link>
            </div>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/shop/${product.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(15,15,20,0.95),rgba(10,10,14,0.88))] shadow-[0_20px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#4F46E5]/40 hover:shadow-[0_28px_70px_rgba(79,70,229,0.16)]"
                  >
                    <div className="relative aspect-[4/4.35] w-full overflow-hidden bg-[linear-gradient(145deg,#12131a,#0a0b10)]">
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(79,70,229,0.22),transparent_42%),radial-gradient(circle_at_78%_78%,rgba(37,99,235,0.16),transparent_32%)]"
                      />
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#ebe3d8] p-5">
                          <div className="absolute left-5 top-5 rounded-full border border-black/8 bg-white/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.28em] text-black/38">
                            Sem foto
                          </div>
                          <div className="relative flex flex-col items-center gap-4 text-center">
                            <div className="flex h-28 w-28 items-center justify-center rounded-full border border-black/8 bg-white/60 shadow-[0_18px_38px_rgba(73,55,35,0.12)]">
                              <span className="select-none text-5xl opacity-40 grayscale" aria-hidden="true">
                                👕
                              </span>
                            </div>
                            <div>
                              <p className="font-display text-xl font-bold uppercase tracking-[0.16em] text-black/70">
                                Be Art
                              </p>
                              <p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-black/34">
                                Visual de coleção
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="pointer-events-none absolute left-0 top-0 h-0.5 w-0 bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] transition-all duration-500 group-hover:w-full" />
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          {product.category ? (
                            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.24em] text-[#B8C0FF]">
                              {product.category}
                            </p>
                          ) : null}
                          <h2 className="font-display text-lg font-bold uppercase leading-tight tracking-[0.02em] text-white sm:text-xl">
                            {product.name}
                          </h2>
                        </div>
                        {product.variantCount > 1 ? (
                          <span className="inline-block shrink-0 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/52">
                            {product.variantCount} opções
                          </span>
                        ) : null}
                      </div>

                      {product.description ? (
                        <p className="mt-3 line-clamp-3 text-sm leading-7 text-white/52">
                          {product.description}
                        </p>
                      ) : null}

                      {product.marketingFeatures.length > 0 ? (
                        <ul className="mt-4 space-y-2">
                          {product.marketingFeatures.slice(0, 2).map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-sm text-white/68">
                              <span className="text-[#7C7CFF]" aria-hidden="true">
                                ✦
                              </span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      {product.colors.length > 0 ? (
                        <div className="mt-4 flex flex-wrap items-center gap-1.5">
                          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/32">Cores</span>
                          {product.colors.map((color) => (
                            <span key={color} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white/72">
                              {color}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      {product.sizes.length > 0 ? (
                        <div className="mt-3 flex flex-wrap items-center gap-1.5">
                          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/32">Tamanhos</span>
                          {product.sizes.map((size) => (
                            <span key={size} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-mono text-white/72">
                              {size}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      <div className="mt-auto flex items-end justify-between gap-4 pt-7">
                        <div>
                          {product.variantCount > 1 ? (
                            <p className="text-xs uppercase tracking-[0.18em] text-white/30">a partir de</p>
                          ) : null}
                          <span className="font-display text-2xl font-extrabold text-white">
                            {formatCurrency(product.startingPrice, product.currency)}
                          </span>
                        </div>

                        <span className="inline-flex min-h-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2E5BFF_0%,#6B3CF6_100%)] px-5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(79,70,229,0.24)] transition group-hover:shadow-[0_16px_36px_rgba(107,60,246,0.34)]">
                          Ver produto →
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}