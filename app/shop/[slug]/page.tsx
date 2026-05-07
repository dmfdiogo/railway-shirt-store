import type { Metadata } from "next";
import { ViewTransition } from "react";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import Image from "next/image";
import Link from "next/link";

import { auth, isAuthConfigured } from "@/lib/auth";
import { getStorefrontProductBySlug, getStorefrontProducts } from "@/lib/storefront";
import { SITE_NAME, absoluteUrl } from "@/lib/seo";
import { SizeSelector } from "@/components/shop/size-selector";
import { ProductGallery } from "@/components/shop/product-gallery";
import { MysticBackground } from "@/components/ui/mystic-background";
import { Navbar } from "@/components/ui/navbar";
import { SiteFooter } from "@/components/ui/site-footer";

export const runtime = "nodejs";

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

function buildProductDescription(product: NonNullable<Awaited<ReturnType<typeof getStorefrontProductBySlug>>>) {
  return (
    product.seoDescription ??
    product.description ??
    product.marketingFeatures[0] ??
    "Camiseta Be Art com presença visual, atmosfera noturna e acabamento premium."
  );
}

function scoreRelatedProduct(
  current: NonNullable<Awaited<ReturnType<typeof getStorefrontProductBySlug>>>,
  candidate: Awaited<ReturnType<typeof getStorefrontProducts>>[number]
) {
  let score = 0;

  if (current.category && candidate.category === current.category) {
    score += 5;
  }

  score += candidate.colors.filter((color) => current.colors.includes(color)).length * 2;
  score += candidate.seoTags.filter((tag) => current.seoTags.includes(tag)).length;

  return score;
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
  const title = product.seoTitle ?? `${product.name} — Be Art`;
  const canonicalPath = `/shop/${product.slug}`;
  const firstImage = product.ogImage ?? product.images[0];
  const imageUrl = firstImage
    ? firstImage.startsWith("http")
      ? firstImage
      : absoluteUrl(firstImage)
    : undefined;

  return {
    title,
    description,
    keywords: product.seoTags.length > 0 ? product.seoTags : undefined,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
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
      title,
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

  const relatedProducts = (await getStorefrontProducts())
    .filter((candidate) => candidate.slug !== product.slug)
    .map((candidate) => ({
      candidate,
      score: scoreRelatedProduct(product, candidate),
    }))
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score;
      return left.candidate.startingPrice - right.candidate.startingPrice;
    })
    .slice(0, 3)
    .map(({ candidate }) => candidate);

  const productUrl = absoluteUrl(`/shop/${product.slug}`);
  const productImageUrls = product.images
    .filter(Boolean)
    .map((image) => (image.startsWith("http") ? image : absoluteUrl(image)));
  const hasAvailableVariants = product.variants.some((variant) => variant.available);
  const variantPrices = product.variants.map((variant) => variant.price);
  const priceCurrency = product.variants[0]?.currency?.toUpperCase() ?? "BRL";
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: buildProductDescription(product),
    image: productImageUrls,
    category: product.category ?? undefined,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    keywords: product.seoTags.length > 0 ? product.seoTags.join(", ") : undefined,
    offers: {
      "@type": "AggregateOffer",
      url: productUrl,
      priceCurrency,
      lowPrice: Math.min(...variantPrices) / 100,
      highPrice: Math.max(...variantPrices) / 100,
      offerCount: product.variants.length,
      availability: hasAvailableVariants ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Catálogo",
        item: absoluteUrl("/shop"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: productUrl,
      },
    ],
  };

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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="relative z-10 px-6 pb-24 pt-28 sm:px-10 sm:pt-32 lg:px-16">
        <ViewTransition enter="slide-up" default="none">
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
            transitionTypes={["nav-back"]}
            className="inline-flex items-center gap-2 text-sm font-medium text-white/45 transition hover:text-white"
          >
            ← Catálogo
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.94fr)_34rem] lg:items-stretch">
            <ProductGallery images={product.images} name={product.name} transitionName={`product-${product.slug}`} />

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

          {relatedProducts.length > 0 ? (
            <section className="mt-16 rounded-[2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-6 py-7 shadow-[0_22px_70px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:px-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-[#BFC6FF]">
                    Continuação da navegação
                  </p>
                  <h2 className="font-display mt-3 text-2xl font-extrabold uppercase tracking-[-0.04em] sm:text-3xl">
                    Mais peças com a mesma direção.
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-white/58">
                    Continue a exploração a partir deste produto com links para peças relacionadas e para o recorte completo da categoria.
                  </p>
                </div>

                {product.category ? (
                  <Link
                    href={`/shop?category=${encodeURIComponent(product.category)}`}
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#6B3CF6]/30 bg-[#6B3CF6]/10 px-5 text-sm font-semibold text-white transition hover:border-[#6B3CF6]/55 hover:bg-[#6B3CF6]/16"
                  >
                    Ver toda a categoria {product.category}
                  </Link>
                ) : (
                  <Link
                    href="/shop"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm font-semibold text-white/76 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                  >
                    Voltar ao catálogo
                  </Link>
                )}
              </div>

              <ul className="mt-8 grid gap-4 md:grid-cols-3">
                {relatedProducts.map((relatedProduct) => (
                  <li key={relatedProduct.slug}>
                    <Link
                      href={`/shop/${relatedProduct.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-[1.7rem] border border-white/[0.08] bg-[#0F1016] transition duration-300 hover:-translate-y-1 hover:border-[#4F46E5]/36 hover:shadow-[0_18px_50px_rgba(79,70,229,0.18)]"
                    >
                      <div className="relative aspect-[1/1] overflow-hidden bg-[linear-gradient(145deg,#111118,#0c0c13)]">
                        {relatedProduct.image ? (
                          <Image
                            src={relatedProduct.image}
                            alt={relatedProduct.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : null}
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(79,70,229,0.18),transparent_40%),linear-gradient(180deg,transparent,rgba(10,10,12,0.46))]"
                        />
                      </div>

                      <div className="flex flex-1 flex-col p-4">
                        {relatedProduct.category ? (
                          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#BFC6FF]">
                            {relatedProduct.category}
                          </p>
                        ) : null}
                        <h3 className="font-display mt-2 text-lg font-bold uppercase tracking-[0.03em] text-white">
                          {relatedProduct.name}
                        </h3>
                        <p className="mt-2 text-sm font-semibold text-[#7C7CFF]">
                          A partir de {formatCurrency(relatedProduct.startingPrice, relatedProduct.currency)}
                        </p>
                        <p className="mt-4 text-sm text-white/54">
                          Ver produto relacionado
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
        </ViewTransition>
      </main>
      <SiteFooter authReady={authReady} sessionActive={!!session} />
    </div>
  );
}