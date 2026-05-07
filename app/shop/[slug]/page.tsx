import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import Link from "next/link";

import { auth, isAuthConfigured } from "@/lib/auth";
import { getSiteUrl, getStorefrontProductBySlug } from "@/lib/storefront";
import { SizeSelector } from "@/components/shop/size-selector";
import { ProductGallery } from "@/components/shop/product-gallery";
import { MysticBackground } from "@/components/ui/mystic-background";
import { Navbar } from "@/components/ui/navbar";

export const runtime = "nodejs";

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

function buildProductDescription(product: NonNullable<Awaited<ReturnType<typeof getStorefrontProductBySlug>>>) {
  return (
    product.description ??
    product.marketingFeatures[0] ??
    "Camiseta Be Art com presença visual, atmosfera noturna e acabamento premium."
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getStorefrontProductBySlug(slug);

  if (!product) {
    return {
      title: "Produto não encontrado — Be Art",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = buildProductDescription(product);
  const canonicalPath = `/shop/${product.slug}`;
  const firstImage = product.images[0];
  const imageUrl = firstImage
    ? firstImage.startsWith("http")
      ? firstImage
      : new URL(firstImage, getSiteUrl()).toString()
    : undefined;

  return {
    title: `${product.name} — Be Art`,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${product.name} — Be Art`,
      description,
      url: canonicalPath,
      type: "website",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: product.name,
            },
          ]
        : undefined,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: `${product.name} — Be Art`,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await connection();

  const authReady = isAuthConfigured();
  const session = authReady
    ? await auth.api.getSession({ headers: await headers() }).catch(() => null)
    : null;
  const { slug } = await params;
  const product = await getStorefrontProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0A0A0C] text-white">
      <MysticBackground />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-10rem] h-[28rem] bg-[radial-gradient(ellipse_at_bottom,rgba(107,60,246,0.22),transparent_58%)] opacity-90 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-4rem] left-1/2 h-[22rem] w-[72rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(46,91,255,0.12),transparent_62%)] blur-[90px]"
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

      <main className="relative z-10 px-6 pb-24 pt-28 sm:px-10 sm:pt-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-white/42">
              <li>
                <Link href="/" className="transition hover:text-white">
                  Início
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/24">
                /
              </li>
              <li>
                <Link href="/shop" className="transition hover:text-white">
                  Catálogo
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/24">
                /
              </li>
              <li className="max-w-[18rem] truncate text-white/70">{product.name}</li>
            </ol>
          </nav>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/45 transition hover:text-white"
          >
            ← Catálogo
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.94fr)_34rem] lg:items-stretch">
            <ProductGallery images={product.images} name={product.name} />

            <section className="rounded-[2.2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-6 py-6 shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:px-7 lg:h-full">
              {product.category ? (
                <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-[#BFC6FF]">
                  {product.category}
                </p>
              ) : null}
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.45em] text-[#8B5CF6]">
                Produto
              </p>
              <h1 className="font-display mt-3 text-[clamp(2.2rem,3.8vw,4rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.05em]">
                {product.name}
              </h1>

              {product.description ? (
                <p className="mt-4 text-base leading-7 text-white/58">{product.description}</p>
              ) : null}

              {product.marketingFeatures.length > 0 ? (
                <ul className="mt-5 space-y-2.5 rounded-[1.6rem] border border-white/[0.08] bg-white/[0.03] p-4">
                  {product.marketingFeatures.slice(0, 2).map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm leading-6 text-white/70">
                      <span className="flex-shrink-0 text-[#7C7CFF]" aria-hidden="true">
                        ✦
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              ) : null}

              {product.colors.length > 0 ? (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/32">Cores</span>
                  {product.colors.map((color) => (
                    <span
                      key={color}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-white/72"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="my-5 h-px bg-gradient-to-r from-transparent via-white/[0.09] to-transparent" />

              <form action="/api/checkout-session" method="POST">
                <SizeSelector
                  productImage={product.image}
                  productName={product.name}
                  productSlug={product.slug}
                  variants={product.variants}
                />
              </form>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}