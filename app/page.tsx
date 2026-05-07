import type { Metadata } from "next";
import { headers } from "next/headers";
import { connection } from "next/server";
import Image from "next/image";
import Link from "next/link";

import { auth, isAuthConfigured } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getStorefrontProducts } from "@/lib/storefront";
import { getStripeServerClient } from "@/lib/stripe";
import { buildMarketingMetadata, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/seo";
import { MysticBackground } from "@/components/ui/mystic-background";
import { Navbar } from "@/components/ui/navbar";
import { SiteFooter } from "@/components/ui/site-footer";

export const runtime = "nodejs";

export const metadata: Metadata = buildMarketingMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: "/",
});

type FeaturedProduct = {
  slug: string;
  name: string;
  image: string | null;
  price: number;
  currency: string;
};

async function getFeaturedProducts(limit = 4): Promise<FeaturedProduct[]> {
  try {
    const variants = await prisma.productVariant.findMany({
      where: { active: true },
      include: { product: true },
      orderBy: { createdAt: "asc" },
    });

    if (variants.length > 0) {
      const seen = new Set<string>();
      const products: FeaturedProduct[] = [];
      for (const v of variants) {
        if (!seen.has(v.product.slug)) {
          seen.add(v.product.slug);
          products.push({
            slug: v.product.slug,
            name: v.product.name,
            image: v.product.image,
            price: v.unitAmount,
            currency: v.currency,
          });
          if (products.length >= limit) break;
        }
      }
      return products;
    }

    const stripe = getStripeServerClient();
    const prices = await stripe.prices.list({
      active: true,
      limit: limit * 2,
      expand: ["data.product"],
    });

    const seen2 = new Set<string>();
    const products2: FeaturedProduct[] = [];
    for (const p of prices.data) {
      if (p.unit_amount === null) continue;
      const prod =
        typeof p.product !== "string" && !p.product.deleted ? p.product : null;
      const key = prod?.id ?? p.id;
      if (!seen2.has(key)) {
        seen2.add(key);
        products2.push({
          slug: prod?.name
            ? prod.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
            : p.id,
          name: prod?.name ?? "Beart Store Shirt",
          image: prod?.images?.[0] ?? null,
          price: p.unit_amount,
          currency: p.currency,
        });
        if (products2.length >= limit) break;
      }
    }
    return products2;
  } catch {
    return [];
  }
}

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

const benefits = [
  {
    icon: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
    title: "Presença Visual",
    description:
      "Cortes limpos, contraste forte e arte aplicada com cuidado para criar presença sem exagero.",
    accent: "#2563EB",
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
        />
      </svg>
    ),
    title: "Acabamento Premium",
    description:
      "Algodão encorpado, toque refinado e caimento seguro para atravessar a noite com conforto e estrutura.",
    accent: "#6B21A8",
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
        />
      </svg>
    ),
    title: "Mistério Noturno",
    description:
      "Paleta escura, brilhos controlados e uma linguagem visual que remete ao silêncio, à pista e ao desconhecido.",
    accent: "#2563EB",
  },
];

export default async function Home() {
  await connection();

  const authReady = isAuthConfigured();
  const session = authReady
    ? await auth.api.getSession({ headers: await headers() }).catch(() => null)
    : null;

  const [featured, storefrontProducts] = await Promise.all([
    getFeaturedProducts(4),
    getStorefrontProducts(),
  ]);
  const featuredCategories = Array.from(
    new Set(storefrontProducts.map((product) => product.category).filter(Boolean) as string[])
  ).slice(0, 4);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0A0A0C] text-white">
      {/* Animated background — WebGL nebula with CSS fallback */}
      <MysticBackground />

      {/* Grain texture overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* ── NAVBAR ───────────────────────────────────────────── */}
      <Navbar sessionActive={!!session} authReady={authReady} />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative flex min-h-screen items-start overflow-hidden px-6 pb-10 pt-24 sm:pt-28"
        aria-label="Hero"
      >
        {/* Ambient background glows */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[780px] w-[980px] -translate-x-1/2 -translate-y-[42%] rounded-full bg-[#6B21A8]/24 blur-[150px]" />
          <div className="absolute bottom-0 left-0 h-[520px] w-[760px] -translate-x-1/3 translate-y-1/3 rounded-full bg-[#2563EB]/18 blur-[130px]" />
          <div className="absolute bottom-1/4 right-0 h-[420px] w-[560px] translate-x-1/3 rounded-full bg-[#7C3AED]/16 blur-[110px]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.08fr)_26rem] lg:items-start">
          <div className="max-w-3xl">
            <div className="hero-badge mb-8 inline-flex items-center gap-2 rounded-full border border-[#6B21A8]/30 bg-[#6B21A8]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-purple-300/90">
              <span
                className="h-1.5 w-1.5 rounded-full bg-purple-300"
                style={{ animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" }}
                aria-hidden="true"
              />
              Ravewear premium
            </div>

            <h1 className="font-display text-[clamp(2.2rem,4.2vw,4.2rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.04em]">
              <span className="hero-line-1 block text-white">Presença</span>
              <span className="hero-line-2 block bg-gradient-to-r from-[#EEF2FF] via-[#6D78FF] to-[#8B5CF6] bg-clip-text text-transparent">
                noturna.
              </span>
            </h1>

            <p className="hero-sub mt-6 max-w-xl text-base leading-8 text-white/58 sm:text-lg">
              Uma loja de camisetas de rave com construção refinada, atmosfera escura e um visual marcante para quem gosta de sofisticação e mistério sem excessos.
            </p>

            <div className="hero-cta mt-8 flex flex-wrap items-center gap-4">
            <a
              href="/shop"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[linear-gradient(135deg,#2E5BFF_0%,#6B3CF6_100%)] px-8 py-4 text-base font-semibold text-white shadow-[0_16px_42px_rgba(61,79,255,0.34)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_54px_rgba(107,60,246,0.42)]"
            >
              Ver coleção
              <svg
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </a>

            {!session && authReady && (
              <a
                href="/sign-up"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-8 py-4 text-base font-semibold text-white/76 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
              >
                Criar conta
              </a>
            )}
            </div>

          </div>

          <aside className="relative lg:justify-self-end">
            <article className="hero-tcg-card group relative isolate overflow-hidden rounded-[2.35rem] border border-white/10 bg-[linear-gradient(155deg,rgba(23,24,34,0.96)_0%,rgba(15,15,22,0.98)_42%,rgba(9,10,16,0.98)_100%)] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:p-6">
              <div aria-hidden="true" className="tcg-gleam absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.18),transparent_22%),radial-gradient(circle_at_76%_14%,rgba(130,146,255,0.20),transparent_30%),radial-gradient(circle_at_74%_82%,rgba(139,92,246,0.24),transparent_30%),radial-gradient(circle_at_18%_74%,rgba(46,91,255,0.18),transparent_28%)]" />
              <div aria-hidden="true" className="absolute inset-[1px] rounded-[2.25rem] border border-white/[0.06]" />
              <div aria-hidden="true" className="tcg-foil absolute inset-y-[-18%] left-[-34%] w-[72%] bg-[linear-gradient(115deg,transparent_16%,rgba(255,255,255,0.02)_28%,rgba(255,255,255,0.28)_42%,rgba(163,191,255,0.24)_50%,rgba(255,255,255,0.02)_61%,transparent_72%)] opacity-70 mix-blend-screen" />
              <div aria-hidden="true" className="absolute inset-x-6 top-5 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-70" />
              <div aria-hidden="true" className="absolute inset-x-6 bottom-5 h-px bg-gradient-to-r from-transparent via-[#7C7CFF]/55 to-transparent opacity-75" />
              <div aria-hidden="true" className="absolute -right-14 top-18 font-display text-[9rem] font-black uppercase tracking-[-0.08em] text-white/[0.045]">
                BA
              </div>

              <div className="relative flex min-h-[30rem] flex-col justify-between">
                <div className="flex items-start justify-between gap-4 text-[11px] font-medium uppercase tracking-[0.34em] text-white/44">
                  <div>
                    <p>Be Art</p>
                    <p className="mt-2 tracking-[0.28em] text-white/28">Trading Aura 01</p>
                  </div>
                  <span className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1 text-[10px] text-white/54">
                    Holo Rare
                  </span>
                </div>

                <div className="mt-10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.42em] text-[#B9BEFF]">
                    Be Art Signature
                  </p>
                  <h2 className="font-display mt-5 max-w-[10ch] text-[clamp(2.6rem,4vw,4.6rem)] font-black uppercase leading-[0.88] tracking-[-0.06em] text-white">
                    Vista a noite do seu jeito.
                  </h2>
                  <p className="mt-5 max-w-[28ch] text-base leading-7 text-white/62">
                    Be Art e uma loja de camisetas de rave pensada para noites intensas, contraste preciso e elegancia em ambientes de luz baixa.
                  </p>
                </div>

                <div className="mt-10 space-y-3 text-sm text-white/68">
                  {[
                    "Loja autoral de ravewear com identidade clara.",
                    "Metal, brilho e sombra combinados para criar atmosfera.",
                    "Peças que acompanham seu estilo sem precisar exagerar.",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 border-t border-white/10 pt-3.5 first:border-t-0 first:pt-0">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[linear-gradient(135deg,#EEF2FF_0%,#7C7CFF_45%,#6B3CF6_100%)] shadow-[0_0_14px_rgba(109,120,255,0.55)]" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-end justify-between gap-5 border-t border-white/10 pt-4">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/32">Categoria</p>
                    <p className="mt-2 font-display text-xl font-bold uppercase tracking-[0.08em] text-white/90">
                      Ravewear
                    </p>
                  </div>
                  <p className="max-w-[10rem] text-right text-[11px] uppercase tracking-[0.26em] text-white/38">
                    loja de camisetas para noites elétricas
                  </p>
                </div>
              </div>
            </article>
          </aside>
        </div>

      </section>

      {featuredCategories.length > 0 ? (
        <>
          <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
          <section className="px-6 py-16 sm:py-20" aria-labelledby="catalog-paths-heading">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-6 py-7 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-2xl sm:px-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#6B21A8]">
                  Navegação interna
                </p>
                <h2
                  id="catalog-paths-heading"
                  className="font-display mt-3 text-3xl font-extrabold uppercase tracking-[-0.04em] sm:text-4xl"
                >
                  Entre direto nos recortes mais fortes do catálogo.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-white/56 sm:text-base">
                  Use estes atalhos para saltar da home para categorias e seguir dos cards para as páginas de produto sem depender só da navegação principal.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/shop"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm font-semibold text-white/76 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                >
                  Ver catálogo completo
                </Link>
                {featuredCategories.map((category) => (
                  <Link
                    key={category}
                    href={`/shop?category=${encodeURIComponent(category)}`}
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#6B3CF6]/30 bg-[#6B3CF6]/10 px-5 text-sm font-semibold text-white transition hover:border-[#6B3CF6]/55 hover:bg-[#6B3CF6]/16"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}

      {/* ── BENEFITS ─────────────────────────────────────────── */}
      <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
      <section className="px-6 py-24 sm:py-32" aria-labelledby="benefits-heading">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#6B21A8]">
              Por que Be Art
            </p>
            <h2
              id="benefits-heading"
              className="font-display mt-3 text-4xl font-extrabold uppercase sm:text-5xl"
            >
              O que nos define
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {benefits.map((b) => (
              <article
                key={b.title}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0F0F14] p-8 transition hover:border-white/[0.13]"
              >
                {/* Hover radial glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(ellipse at top left, ${b.accent}18, transparent 65%)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{
                    color: b.accent,
                    background: `${b.accent}18`,
                  }}
                >
                  {b.icon}
                </div>

                <h3 className="font-display mb-3 text-lg font-bold uppercase tracking-wide text-white">
                  {b.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/45">
                  {b.description}
                </p>

                {/* Accent line at bottom */}
                <div
                  className="mt-6 h-px w-12 rounded-full opacity-40 transition-all duration-300 group-hover:w-full group-hover:opacity-60"
                  style={{ background: b.accent }}
                  aria-hidden="true"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE ─────────────────────────────────── */}
      <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
      <section className="px-6 py-24 sm:py-32" aria-labelledby="showcase-heading">
        <div className="mx-auto max-w-7xl">
          <header className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#6B21A8]">
                Vitrine
              </p>
              <h2
                id="showcase-heading"
                className="font-display mt-3 text-4xl font-extrabold uppercase sm:text-5xl"
              >
                Peças em destaque
              </h2>
            </div>
            <a
              href="/shop"
              className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-white/35 transition hover:text-white sm:inline-flex"
            >
              Ver todos
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          </header>

          {featured.length === 0 ? (
            /* Skeleton placeholders */
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Carregando produtos">
              {Array.from({ length: 4 }).map((_, i) => (
                <li
                  key={i}
                  className="rounded-2xl border border-white/[0.07] bg-[#0F0F14] p-4"
                  aria-hidden="true"
                >
                  <div className="aspect-square w-full animate-pulse rounded-xl bg-white/[0.05]" />
                  <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-white/[0.05]" />
                  <div className="mt-2 h-3 w-1/3 animate-pulse rounded bg-white/[0.05]" />
                </li>
              ))}
            </ul>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list">
              {featured.map((product) => (
                <li key={product.slug}>
                  <a
                    href={`/shop/${product.slug}`}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0F0F14] transition duration-300 hover:border-[#2563EB]/35 hover:shadow-[0_0_40px_rgba(37,99,235,0.09)]"
                  >
                    {/* Product image */}
                    <div className="relative aspect-square w-full overflow-hidden bg-[linear-gradient(145deg,#111118,#0c0c13)]">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <span
                            className="select-none text-7xl opacity-20 grayscale"
                            aria-hidden="true"
                          >
                            👕
                          </span>
                        </div>
                      )}

                      {/* Overlay on hover */}
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#0A0A0C]/55 opacity-0 transition duration-300 group-hover:opacity-100">
                        <span className="translate-y-2 rounded-full bg-[#2563EB] px-5 py-2 text-sm font-semibold text-white shadow-[0_0_24px_rgba(37,99,235,0.6)] transition-transform duration-300 group-hover:translate-y-0">
                          Ver produto
                        </span>
                      </div>

                      {/* Top corner accent line */}
                      <div
                        aria-hidden="true"
                        className="absolute left-0 top-0 h-0.5 w-0 bg-gradient-to-r from-[#2563EB] to-[#6B21A8] transition-all duration-500 group-hover:w-full"
                      />
                    </div>

                    {/* Product info */}
                    <div className="p-4">
                      <h3 className="font-display line-clamp-1 text-sm font-bold uppercase tracking-wide text-white">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-[#2563EB]">
                        {formatPrice(product.price, product.currency)}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}

          {/* Mobile link */}
          <div className="mt-10 flex justify-center sm:hidden">
            <a
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-white/50 transition hover:border-white/20 hover:text-white"
            >
              Ver toda a coleção
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
      <section className="px-6 py-16 sm:py-20">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-[#2563EB]/20 bg-[#0F0F14] px-8 py-14 text-center sm:py-20">
          {/* Background glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.12),transparent_65%)]"
          />
          {/* Corner decorations */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 h-24 w-24 rounded-br-[3rem] bg-gradient-to-br from-[#6B21A8]/15 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 right-0 h-24 w-24 rounded-tl-[3rem] bg-gradient-to-tl from-[#2563EB]/15 to-transparent"
          />

          <p className="relative text-xs font-semibold uppercase tracking-[0.4em] text-[#6B21A8]">
            Entre na atmosfera da coleção
          </p>
          <h2 className="font-display relative mt-4 text-4xl font-extrabold uppercase sm:text-5xl">
            Vista a noite
            <br />
            <span className="bg-gradient-to-r from-[#2563EB] to-[#6B21A8] bg-clip-text text-transparent">
              com personalidade.
            </span>
          </h2>
          <p className="relative mx-auto mt-5 max-w-sm text-sm leading-relaxed text-white/45">
            Conheça as peças, acompanhe novos modelos e compre com a mesma calma elegante que a marca quer transmitir.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            {session ? (
              <a
                href="/account"
                className="inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-8 py-4 text-base font-semibold text-white shadow-[0_0_28px_rgba(37,99,235,0.35)] transition hover:-translate-y-0.5 hover:bg-[#1d4ed8] hover:shadow-[0_0_48px_rgba(37,99,235,0.5)]"
              >
                Ir para minha conta
              </a>
            ) : authReady ? (
              <>
                <a
                  href="/sign-up"
                  className="inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-8 py-4 text-base font-semibold text-white shadow-[0_0_28px_rgba(37,99,235,0.35)] transition hover:-translate-y-0.5 hover:bg-[#1d4ed8] hover:shadow-[0_0_48px_rgba(37,99,235,0.5)]"
                >
                  Criar conta grátis
                </a>
                <a
                  href="/shop"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white/70 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                  Ver coleção
                </a>
              </>
            ) : (
              <a
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-8 py-4 text-base font-semibold text-white shadow-[0_0_28px_rgba(37,99,235,0.35)] transition hover:-translate-y-0.5 hover:bg-[#1d4ed8] hover:shadow-[0_0_48px_rgba(37,99,235,0.5)]"
              >
                Explorar coleção
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <SiteFooter authReady={authReady} sessionActive={!!session} />
    </div>
  );
}
