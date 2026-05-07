import { cache } from "react";

import prisma from "@/lib/prisma";
import { getStripeServerClient } from "@/lib/stripe";

export type StorefrontVariantOption = {
  available: boolean;
  stripePriceId: string;
  label: string;
  price: number;
  currency: string;
  stockQuantity: number | null;
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
  seoTitle: string | null;
  seoDescription: string | null;
  seoTags: string[];
  ogImage: string | null;
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
  seoTitle: string | null;
  seoDescription: string | null;
  seoTags: string[];
  ogImage: string | null;
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
  seoTitle: string | null;
  seoDescription: string | null;
  seoTags: string[];
  ogImage: string | null;
};

type StorefrontProductExtras = {
  images: string[];
  colors: string[];
  sizes: string[];
  category: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  seoTags: string[];
  ogImage: string | null;
};

function dedupeStrings(values: Array<string | null | undefined>) {
  return Array.from(new Set(values.map((value) => value?.trim()).filter(Boolean) as string[]));
}

function normalizeList(value: string | undefined) {
  return dedupeStrings((value ?? "").split(","));
}

function getMetadataValue(metadata: Record<string, string>, keys: string[]) {
  for (const key of keys) {
    const value = metadata[key]?.trim();
    if (value) return value;
  }

  return null;
}

function normalizeCategory(metadata: Record<string, string>) {
  const direct = getMetadataValue(metadata, ["category"]);
  if (direct) return direct;

  const first = normalizeList(metadata.categories)[0];
  return first ?? null;
}

function normalizeSeoTags(metadata: Record<string, string>) {
  return dedupeStrings([
    ...normalizeList(metadata.seo_tags),
    ...normalizeList(metadata.seoTags),
    ...normalizeList(metadata.seo_keywords),
    ...normalizeList(metadata.seoKeywords),
  ]);
}

function resolveProductExtras(metadata: Record<string, string>, images: string[]): StorefrontProductExtras {
  return {
    images: dedupeStrings(images),
    colors: normalizeList(metadata.colors),
    sizes: normalizeList(metadata.sizes),
    category: normalizeCategory(metadata),
    seoTitle: getMetadataValue(metadata, ["seo_title", "seoTitle"]),
    seoDescription: getMetadataValue(metadata, ["seo_description", "seoDescription"]),
    seoTags: normalizeSeoTags(metadata),
    ogImage: getMetadataValue(metadata, ["og_image", "ogImage"]),
  };
}

function parseStockQuantity(metadata: Record<string, string>) {
  const rawValue = metadata.stock?.trim();
  if (!rawValue) return null;

  const parsedValue = Number(rawValue);
  if (!Number.isFinite(parsedValue)) return null;

  return Math.max(0, Math.floor(parsedValue));
}

function getAvailability(metadata: Record<string, string>) {
  const stockQuantity = parseStockQuantity(metadata);
  return {
    available: stockQuantity === null ? true : stockQuantity > 0,
    stockQuantity,
  };
}

async function resolveVariantAvailability(priceIds: string[]) {
  const uniquePriceIds = Array.from(new Set(priceIds.filter(Boolean)));
  if (uniquePriceIds.length === 0) {
    return new Map<string, ReturnType<typeof getAvailability>>();
  }

  try {
    const stripe = getStripeServerClient();
    const entries = await Promise.all(
      uniquePriceIds.map(async (priceId) => {
        const price = await stripe.prices.retrieve(priceId);
        return [priceId, getAvailability((price.metadata ?? {}) as Record<string, string>)] as const;
      })
    );

    return new Map(entries);
  } catch {
    return new Map<string, ReturnType<typeof getAvailability>>();
  }
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

    return prices.data.flatMap((price) => {
      if (price.unit_amount === null) return [];

      const rawProduct =
        typeof price.product !== "string" && !price.product.deleted ? price.product : null;

      if (!rawProduct || !rawProduct.active) return [];

      const metadata = (rawProduct.metadata ?? {}) as Record<string, string>;
      const extras = resolveProductExtras(metadata, rawProduct.images ?? []);

      return [
        {
          slug: slugify(`${rawProduct.name}-${rawProduct.id}`),
          stripeProductId: rawProduct.id,
          name: rawProduct.name,
          description: rawProduct.description ?? null,
          image: rawProduct.images?.[0] ?? null,
          images: extras.images,
          price: price.unit_amount,
          currency: price.currency,
          stripePriceId: price.id,
          marketingFeatures: sanitizeFeatures(
            rawProduct.marketing_features?.map((feature) => feature.name ?? "").filter(Boolean) ?? []
          ),
          colors: extras.colors,
          sizes: extras.sizes,
          category: extras.category,
          seoTitle: extras.seoTitle,
          seoDescription: extras.seoDescription,
          seoTags: extras.seoTags,
          ogImage: extras.ogImage ?? rawProduct.images?.[0] ?? null,
        },
      ];
    });
  } catch {
    return [];
  }
}

async function listDatabaseCatalogItems(): Promise<CatalogItem[]> {
  try {
    const variants = await prisma.productVariant.findMany({
      where: {
        active: true,
        product: {
          active: true,
        },
      },
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
      colors: variant.product.colors,
      sizes:
        variant.product.sizes.length > 0
          ? variant.product.sizes
          : variant.name.startsWith("Tamanho ")
            ? [variant.name.replace("Tamanho ", "")]
            : [],
      category: variant.product.category,
      seoTitle: variant.product.seoTitle,
      seoDescription: variant.product.seoDescription,
      seoTags: variant.product.seoTags,
      ogImage: variant.product.ogImage,
    }));
  } catch {
    return [];
  }
}

async function resolveStripeProductExtras(stripeProductId: string | null | undefined) {
  if (!stripeProductId) {
    return {
      images: [],
      colors: [],
      sizes: [],
      category: null,
      seoTitle: null,
      seoDescription: null,
      seoTags: [],
      ogImage: null,
    };
  }

  try {
    const stripe = getStripeServerClient();
    const product = await stripe.products.retrieve(stripeProductId);

    if (product.deleted) {
      return {
        images: [],
        colors: [],
        sizes: [],
        category: null,
        seoTitle: null,
        seoDescription: null,
        seoTags: [],
        ogImage: null,
      };
    }

    const metadata = (product.metadata ?? {}) as Record<string, string>;
    return {
      ...resolveProductExtras(metadata, product.images ?? []),
      ogImage: getMetadataValue(metadata, ["og_image", "ogImage"]) ?? product.images?.[0] ?? null,
    };
  } catch {
    return {
      images: [],
      colors: [],
      sizes: [],
      category: null,
      seoTitle: null,
      seoDescription: null,
      seoTags: [],
      ogImage: null,
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
        seoTitle: item.seoTitle,
        seoDescription: item.seoDescription,
        seoTags: item.seoTags,
        ogImage: item.ogImage,
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
    existing.seoTitle = existing.seoTitle ?? item.seoTitle;
    existing.seoDescription = existing.seoDescription ?? item.seoDescription;
    existing.seoTags = existing.seoTags.length > 0 ? existing.seoTags : item.seoTags;
    existing.ogImage = existing.ogImage ?? item.ogImage;

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

    if (product && !product.active) {
      return null;
    }

    if (product && product.variants.length > 0) {
      const stripeExtras = await resolveStripeProductExtras(product.stripeProductId);
      const availabilityByPriceId = await resolveVariantAvailability(
        product.variants.map((variant) => variant.stripePriceId)
      );
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
        colors: stripeExtras.colors.length > 0 ? stripeExtras.colors : product.colors,
        sizes:
          stripeExtras.sizes.length > 0
            ? stripeExtras.sizes
            : product.sizes.length > 0
              ? product.sizes
              : dedupeStrings(sizeVariants),
        category: stripeExtras.category ?? product.category,
        seoTitle: stripeExtras.seoTitle ?? product.seoTitle,
        seoDescription: stripeExtras.seoDescription ?? product.seoDescription,
        seoTags: stripeExtras.seoTags.length > 0 ? stripeExtras.seoTags : product.seoTags,
        ogImage: stripeExtras.ogImage ?? product.ogImage ?? images[0] ?? product.image,
        variants: product.variants.map((variant) => ({
          ...(availabilityByPriceId.get(variant.stripePriceId) ?? {
            available: true,
            stockQuantity: null,
          }),
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
        if (!rawProduct.active) return false;
        return slugify(`${rawProduct.name}-${rawProduct.id}`) === slug;
      });

      if (matchingPrices.length === 0) return null;

      const rawProduct = matchingPrices[0].product;
      if (typeof rawProduct === "string" || rawProduct.deleted) return null;

      const metadata = (rawProduct.metadata ?? {}) as Record<string, string>;
      const extras = resolveProductExtras(metadata, rawProduct.images ?? []);

      return {
        slug,
        name: rawProduct.name,
        description: rawProduct.description ?? null,
        image: extras.images[0] ?? null,
        images: extras.images,
        marketingFeatures: sanitizeFeatures(
          rawProduct.marketing_features?.map((feature) => feature.name ?? "").filter(Boolean) ?? []
        ),
        colors: extras.colors,
        sizes: extras.sizes,
        category: extras.category,
        seoTitle: extras.seoTitle,
        seoDescription: extras.seoDescription,
        seoTags: extras.seoTags,
        ogImage: extras.ogImage ?? extras.images[0] ?? null,
        variants: matchingPrices
          .sort((a, b) => a.unit_amount! - b.unit_amount!)
          .map((price) => ({
            ...getAvailability((price.metadata ?? {}) as Record<string, string>),
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