import { headers } from "next/headers";
import { connection } from "next/server";
import Image from "next/image";

import { auth, isAuthConfigured } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getStripeServerClient } from "@/lib/stripe";
import { MysticBackground } from "@/components/ui/mystic-background";

export const runtime = "nodejs";

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
    title: "Drops Limitados",
    description:
      "Cada coleção é produzida em quantidade restrita. Quando acabar, acabou. Exclusividade que diz quem você é.",
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
    title: "Tecido Premium",
    description:
      "Algodão 100% penteado ring-spun. Leve, resistente, confortável para horas na pista sem perder a forma.",
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
    title: "Arte Underground",
    description:
      "Design criado por artistas da cena eletrônica. Cada peça é uma declaração de pertencimento à cultura noturna.",
    accent: "#2563EB",
  },
];

export default async function Home() {
  await connection();

  const authReady = isAuthConfigured();
  const session = authReady
    ? await auth.api.getSession({ headers: await headers() }).catch(() => null)
    : null;

  const featured = await getFeaturedProducts(4);

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
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/[0.06] bg-[#0A0A0C]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a
            href="/"
            className="font-display text-xl font-extrabold uppercase tracking-widest text-white"
          >
            BEART<span className="text-[#2563EB]">.</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
            <a
              href="/shop"
              className="text-sm font-medium text-white/50 transition-colors hover:text-white"
            >
              Catálogo
            </a>
            {session ? (
              <a
                href="/account"
                className="text-sm font-medium text-white/50 transition-colors hover:text-white"
              >
                Minha conta
              </a>
            ) : authReady ? (
              <a
                href="/sign-in"
                className="text-sm font-medium text-white/50 transition-colors hover:text-white"
              >
                Entrar
              </a>
            ) : null}
            <a
              href="/shop"
              className="rounded-full bg-[#2563EB] px-5 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] transition hover:bg-[#1d4ed8] hover:shadow-[0_0_32px_rgba(37,99,235,0.5)]"
            >
              Comprar agora
            </a>
          </nav>

          {/* Mobile CTA */}
          <a
            href="/shop"
            className="rounded-full bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1d4ed8] md:hidden"
            aria-label="Ir para o catálogo"
          >
            Shop
          </a>
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-16"
        aria-label="Hero"
      >
        {/* Ambient background glows */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6B21A8]/18 blur-[140px]" />
          <div className="absolute bottom-0 left-0 h-[500px] w-[700px] -translate-x-1/3 translate-y-1/3 rounded-full bg-[#2563EB]/12 blur-[120px]" />
          <div className="absolute bottom-1/4 right-0 h-[400px] w-[500px] translate-x-1/3 rounded-full bg-[#6B21A8]/10 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-6xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#6B21A8]/30 bg-[#6B21A8]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-purple-400">
            <span
              className="h-1.5 w-1.5 rounded-full bg-purple-400"
              style={{ animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" }}
              aria-hidden="true"
            />
            Coleção 2026 — Drops Limitados
          </div>

          {/* Main heading */}
          <h1 className="font-display text-[clamp(4.5rem,15vw,14rem)] font-extrabold uppercase leading-none tracking-tight">
            <span className="block text-white">BEART</span>
            <span className="block bg-gradient-to-r from-[#2563EB] via-[#4f46e5] to-[#6B21A8] bg-clip-text text-transparent">
              STORE
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-white/45 sm:text-lg">
            Camisetas para quem vive pela música. Peças premium, drops limitados,
            identidade que pulsa no escuro.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/shop"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#2563EB] px-8 py-4 text-base font-semibold text-white shadow-[0_0_28px_rgba(37,99,235,0.35)] transition hover:-translate-y-0.5 hover:bg-[#1d4ed8] hover:shadow-[0_0_52px_rgba(37,99,235,0.55)]"
            >
              Explorar coleção
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
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white/70 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                Criar conta
              </a>
            )}
          </div>

          {/* Stats strip */}
          <div className="mt-16 flex flex-wrap justify-center gap-px overflow-hidden rounded-2xl border border-white/[0.07]">
            {[
              { value: "100%", label: "Algodão Premium" },
              { value: "Drops", label: "Coleções Exclusivas" },
              { value: "24h", label: "Entrega Express" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-1 flex-col items-center justify-center bg-white/[0.03] px-8 py-5 min-w-[120px]"
              >
                <span className="font-display text-2xl font-extrabold text-white">
                  {stat.value}
                </span>
                <span className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-white/35">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          aria-hidden="true"
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/20">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────── */}
      <section className="px-6 py-24 sm:py-32" aria-labelledby="benefits-heading">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#6B21A8]">
              Por que Beart
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
                Drops em destaque
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
            Não perca o próximo drop
          </p>
          <h2 className="font-display relative mt-4 text-4xl font-extrabold uppercase sm:text-5xl">
            Viver a noite
            <br />
            <span className="bg-gradient-to-r from-[#2563EB] to-[#6B21A8] bg-clip-text text-transparent">
              é uma arte.
            </span>
          </h2>
          <p className="relative mx-auto mt-5 max-w-sm text-sm leading-relaxed text-white/45">
            Crie sua conta e receba notificações exclusivas antes de cada lançamento.
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
      <footer className="border-t border-white/[0.06] px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 sm:flex-row sm:justify-between">
          <a
            href="/"
            className="font-display text-xl font-extrabold uppercase tracking-widest text-white"
          >
            BEART<span className="text-[#2563EB]">.</span>
          </a>

          <nav
            className="flex flex-wrap justify-center gap-6"
            aria-label="Rodapé"
          >
            <a
              href="/shop"
              className="text-sm text-white/35 transition hover:text-white/80"
            >
              Catálogo
            </a>
            <a
              href="#"
              className="text-sm text-white/35 transition hover:text-white/80"
            >
              Sobre
            </a>
            <a
              href="#"
              className="text-sm text-white/35 transition hover:text-white/80"
            >
              Contato
            </a>
            <a
              href="#"
              className="text-sm text-white/35 transition hover:text-white/80"
            >
              Política de troca
            </a>
          </nav>

          <p className="text-xs text-white/20">© 2026 Beart Store</p>
        </div>
      </footer>
    </div>
  );
}
