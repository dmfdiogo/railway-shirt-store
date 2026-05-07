import { cache } from "react";

import prisma from "@/lib/prisma";
import { getStripeServerClient } from "@/lib/stripe";

export type StorefrontVariantOption = {
  stripePriceId: string;
  label: string;
  price: number;
  currency: string;
  size?: string;
};

export type StorefrontProductCard = {
  slug: string;
  name: string;
  description: string | null;
  image: string | null;
  images: string[];
  startingPrice: number;
  currency: string;
  marketingFeatures: string[];
  colors: string[];
  sizes: string[];
  category: string | null;
  variantCount: number;
};

export type StorefrontProductDetail = {
  slug: string;
  name: string;
  description: string | null;
  image: string | null;
  images: string[];
  marketingFeatures: string[];
  colors: string[];
  sizes: string[];
  category: string | null;
  variants: StorefrontVariantOption[];
};

type CatalogItem = {
  slug: string;
  stripeProductId: string;
  name: string;
  description: string | null;
  image: string | null;
  images: string[];
  price: number;
  currency: string;
  stripePriceId: string;
  marketingFeatures: string[];
  colors: string[];
  sizes: string[];
  category: string | null;
};

function dedupeStrings(values: Array<string | null | undefined>) {
  return Array.from(new Set(values.map((value) => value?.trim()).filter(Boolean) as string[]));
}

function normalizeList(value: string | undefined) {
  return dedupeStrings((value ?? "").split(","));
}

function normalizeCategory(metadata: Record<string, string>) {
  const direct = metadata.category?.trim();
  if (direct) return direct;

  const first = normalizeList(metadata.categories)[0];
  return first ?? null;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function sanitizeFeatures(features: string[]) {
  return features.filter((feature) => {
    const normalized = feature.trim();
    if (!normalized) return false;
    if (/^feature\s*\d+$/i.test(normalized)) return false;
    if (/^test(e)?$/i.test(normalized)) return false;
    return true;
  });
}

export function getSiteUrl() {
  return process.env.APP_URL ?? "http://localhost:3000";
}

async function listStripeCatalogItems(): Promise<CatalogItem[]> {
  try {
    const stripe = getStripeServerClient();
    const prices = await stripe.prices.list({
      active: true,
      limit: 100,
      expand: ["data.product"],
    });

    return prices.data
      .filter((price) => price.unit_amount !== null)
      .map((price) => {
        const rawProduct =
          typeof price.product !== "string" && !price.product.deleted ? price.product : null;
        const metadata = (rawProduct?.metadata ?? {}) as Record<string, string>;
        const name = rawProduct?.name ?? "Be Art Shirt";

        return {
          slug: slugify(`${name}-${rawProduct?.id ?? ""}`),
          stripeProductId: rawProduct?.id ?? "",
          name,
          description: rawProduct?.description ?? null,
          image: rawProduct?.images?.[0] ?? null,
          images: dedupeStrings(rawProduct?.images ?? []),
          price: price.unit_amount!,
          currency: price.currency,
          stripePriceId: price.id,
          marketingFeatures: sanitizeFeatures(
            rawProduct?.marketing_features?.map((feature) => feature.name ?? "").filter(Boolean) ?? []
          ),
          colors: normalizeList(metadata.colors),
          sizes: normalizeList(metadata.sizes),
          category: normalizeCategory(metadata),
        };
      });
  } catch {
    return [];
  }
}

async function listDatabaseCatalogItems(): Promise<CatalogItem[]> {
  try {
    const variants = await prisma.productVariant.findMany({
      where: { active: true },
      include: { product: true },
      orderBy: { createdAt: "asc" },
    });

    return variants.map((variant) => ({
      slug: variant.product.slug,
      stripeProductId: variant.product.stripeProductId ?? "",
      name: variant.product.name,
      description: variant.product.description,
      image: variant.product.image,
      images: variant.product.image ? [variant.product.image] : [],
      price: variant.unitAmount,
      currency: variant.currency,
      stripePriceId: variant.stripePriceId,
      marketingFeatures: sanitizeFeatures(variant.product.marketingFeatures),
      colors: [],
      sizes: variant.name.startsWith("Tamanho ") ? [variant.name.replace("Tamanho ", "")] : [],
      category: null,
    }));
  } catch {
    return [];
  }
}

async function resolveStripeProductExtras(stripeProductId: string | null | undefined) {
  if (!stripeProductId) {
    return {
      images: [] as string[],
      colors: [] as string[],
      sizes: [] as string[],
      category: null as string | null,
    };
  }

  try {
    const stripe = getStripeServerClient();
    const product = await stripe.products.retrieve(stripeProductId);

    if (product.deleted) {
      return {
        images: [] as string[],
        colors: [] as string[],
        sizes: [] as string[],
        category: null as string | null,
      };
    }

    const metadata = (product.metadata ?? {}) as Record<string, string>;
    return {
      images: dedupeStrings(product.images ?? []),
      colors: normalizeList(metadata.colors),
      sizes: normalizeList(metadata.sizes),
      category: normalizeCategory(metadata),
    };
  } catch {
    return {
      images: [] as string[],
      colors: [] as string[],
      sizes: [] as string[],
      category: null as string | null,
    };
  }
}

export const getStorefrontProducts = cache(async (): Promise<StorefrontProductCard[]> => {
  const [stripeItems, dbItems] = await Promise.all([
    listStripeCatalogItems(),
    listDatabaseCatalogItems(),
  ]);

  const merged = new Map<string, CatalogItem>();

  for (const item of [...stripeItems, ...dbItems]) {
    const existing = merged.get(item.stripePriceId);
    if (!existing) {
      merged.set(item.stripePriceId, item);
      continue;
    }

    merged.set(item.stripePriceId, {
      ...existing,
      ...item,
      description: item.description ?? existing.description,
      image: item.image ?? existing.image,
      images: dedupeStrings([...existing.images, ...item.images]),
      marketingFeatures:
        item.marketingFeatures.length > 0 ? item.marketingFeatures : existing.marketingFeatures,
      colors: item.colors.length > 0 ? item.colors : existing.colors,
      sizes: item.sizes.length > 0 ? item.sizes : existing.sizes,
      category: item.category ?? existing.category,
    });
  }

  const products = new Map<string, StorefrontProductCard>();
  for (const item of merged.values()) {
    const existing = products.get(item.slug);
    if (!existing) {
      products.set(item.slug, {
        slug: item.slug,
        name: item.name,
        description: item.description,
        image: item.image,
        images: item.images,
        startingPrice: item.price,
        currency: item.currency,
        marketingFeatures: item.marketingFeatures,
        colors: item.colors,
        sizes: item.sizes,
        category: item.category,
        variantCount: 1,
      });
      continue;
    }

    existing.variantCount += 1;
    existing.images = dedupeStrings([...existing.images, ...item.images]);
    existing.image = existing.image ?? item.image;
    existing.marketingFeatures =
      existing.marketingFeatures.length > 0 ? existing.marketingFeatures : item.marketingFeatures;
    existing.colors = existing.colors.length > 0 ? existing.colors : item.colors;
    existing.sizes = existing.sizes.length > 0 ? existing.sizes : item.sizes;
    existing.category = existing.category ?? item.category;

    if (item.price < existing.startingPrice) {
      existing.startingPrice = item.price;
      existing.currency = item.currency;
    }
  }

  return Array.from(products.values());
});

export const getStorefrontProductBySlug = cache(
  async (slug: string): Promise<StorefrontProductDetail | null> => {
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
      const stripeExtras = await resolveStripeProductExtras(product.stripeProductId);
      const sizeVariants = product.variants
        .map((variant) => (variant.name.startsWith("Tamanho ") ? variant.name.replace("Tamanho ", "") : null))
        .filter(Boolean) as string[];

      const images = dedupeStrings([
        ...stripeExtras.images,
        product.image,
      ]);

      return {
        slug: product.slug,
        name: product.name,
        description: product.description,
        image: images[0] ?? product.image,
        images,
        marketingFeatures: sanitizeFeatures(product.marketingFeatures),
        colors: stripeExtras.colors,
        sizes: stripeExtras.sizes.length > 0 ? stripeExtras.sizes : dedupeStrings(sizeVariants),
        category: stripeExtras.category,
        variants: product.variants.map((variant) => ({
          stripePriceId: variant.stripePriceId,
          label: variant.name,
          price: variant.unitAmount,
          currency: variant.currency,
          size: variant.name.startsWith("Tamanho ") ? variant.name.replace("Tamanho ", "") : undefined,
        })),
      };
    }

    try {
      const stripe = getStripeServerClient();
      const prices = await stripe.prices.list({
        active: true,
        limit: 100,
        expand: ["data.product"],
      });

      const matchingPrices = prices.data.filter((price) => {
        if (price.unit_amount === null) return false;
        if (typeof price.product === "string") return false;
        const rawProduct = price.product;
        if (rawProduct.deleted) return false;
        return slugify(`${rawProduct.name}-${rawProduct.id}`) === slug;
      });

      if (matchingPrices.length === 0) return null;

      const rawProduct = matchingPrices[0].product;
      if (typeof rawProduct === "string" || rawProduct.deleted) return null;

      const metadata = (rawProduct.metadata ?? {}) as Record<string, string>;
      const images = dedupeStrings(rawProduct.images ?? []);

      return {
        slug,
        name: rawProduct.name,
        description: rawProduct.description ?? null,
        image: images[0] ?? null,
        images,
        marketingFeatures: sanitizeFeatures(
          rawProduct.marketing_features?.map((feature) => feature.name ?? "").filter(Boolean) ?? []
        ),
        colors: normalizeList(metadata.colors),
        sizes: normalizeList(metadata.sizes),
        category: normalizeCategory(metadata),
        variants: matchingPrices
          .sort((a, b) => a.unit_amount! - b.unit_amount!)
          .map((price) => ({
            stripePriceId: price.id,
            label: price.nickname ?? rawProduct.name,
            price: price.unit_amount!,
            currency: price.currency,
            size: (price.metadata as Record<string, string>)?.size ?? undefined,
          })),
      };
    } catch {
      return null;
    }
  }
);