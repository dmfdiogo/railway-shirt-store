import "dotenv/config";

import prisma from "@/lib/prisma";
import { getStripeServerClient } from "@/lib/stripe";

type ProductPlan = {
  active: boolean;
  name?: string;
  description?: string;
  marketingFeatures?: string[];
  metadata?: Record<string, string>;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

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

function sanitizeFeatures(features: string[]) {
  return features.filter((feature) => {
    const normalized = feature.trim();
    if (!normalized) return false;
    if (/^feature\s*\d+$/i.test(normalized)) return false;
    if (/^test(e)?$/i.test(normalized)) return false;
    return true;
  });
}

const PRODUCT_PLANS: Record<string, ProductPlan> = {
  prod_UT5wpRlJ9cfDkn: {
    active: true,
    description:
      "Camiseta AC/DC com visual rock clássico, algodão encorpado e modelagem unissex para uma presença forte no dia a dia.",
    marketingFeatures: [
      "Algodão encorpado com toque confortável",
      "Modelagem unissex para uso diário",
      "Estampa de banda com presença visual marcante",
    ],
    metadata: {
      category: "Bandas clássicas",
      colors: "Preto,Branco,Cinza",
      sizes: "P,M,G,GG",
      seo_title: "Camiseta AC/DC Rock Edition | Camiseta de Banda Premium Be Art",
      seo_description:
        "Camiseta AC/DC com estética rock clássica, algodão encorpado, modelagem unissex e acabamento premium da Be Art.",
      seo_tags: "camiseta ac dc,camiseta de banda,camiseta rock,acdc,streetwear premium",
      og_image:
        "https://files.stripe.com/links/MDB8YWNjdF8xUk1CWXlERUFnVmpyZHF3fGZsX3Rlc3RfUUZGMldaTUdaY0c1U09NdXZqZkVGcVR2002SZD63l2",
    },
  },
  prod_UT5wbKPt0m6eeD: {
    active: true,
    description:
      "Camiseta Red Hot Chili Peppers com a star logo em destaque, caimento unissex e tecido confortável para uso diário.",
    marketingFeatures: [
      "Estampa icônica da star logo",
      "Modelagem unissex de caimento confortável",
      "Tecido macio para rotina e shows",
    ],
    metadata: {
      category: "Bandas clássicas",
      colors: "Preto",
      seo_title: "Camiseta Red Hot Chili Peppers Star Logo | Be Art",
      seo_description:
        "Camiseta Red Hot Chili Peppers com star logo, modelagem unissex e visual de banda para compor looks casuais com identidade.",
      seo_tags:
        "camiseta red hot chili peppers,camiseta rhcp,camiseta de banda,star logo,camiseta rock",
      og_image:
        "https://files.stripe.com/links/MDB8YWNjdF8xUk1CWXlERUFnVmpyZHF3fGZsX3Rlc3RfR3haN1N0bHFacDJmWFdka01KYjg3SzY2000XIQ66IU",
    },
  },
  prod_UT5wSdGYDfCngk: {
    active: true,
    description:
      "Camiseta Led Zeppelin com os quatro símbolos da banda, tecido respirável e visual clássico para um guarda-roupa com personalidade.",
    marketingFeatures: [
      "Arte com os quatro símbolos do Led Zeppelin",
      "Tecido respirável com toque confortável",
      "Peça unissex com visual clássico de banda",
    ],
    metadata: {
      category: "Bandas clássicas",
      colors: "Preto",
      seo_title: "Camiseta Led Zeppelin Symbols | Camiseta de Banda Be Art",
      seo_description:
        "Camiseta Led Zeppelin com os símbolos clássicos da banda, tecido confortável e acabamento pensado para uso diário.",
      seo_tags:
        "camiseta led zeppelin,camiseta de banda,camiseta rock,led zeppelin symbols,streetwear rock",
      og_image:
        "https://files.stripe.com/links/MDB8YWNjdF8xUk1CWXlERUFnVmpyZHF3fGZsX3Rlc3RfekwyZ1Exb2VaNUREREtXWUthMnpENkJz00lKG56V5w",
    },
  },
  prod_UT5uVySVve4oPi: {
    active: true,
    description:
      "Camiseta Pink Floyd inspirada em Dark Side of the Moon, em algodão premium e com presença visual limpa para uso casual.",
    marketingFeatures: [
      "Arte inspirada em Dark Side of the Moon",
      "Algodão premium com toque macio",
      "Modelagem unissex para composições versáteis",
    ],
    metadata: {
      category: "Bandas clássicas",
      colors: "Preto",
      seo_title: "Camiseta Pink Floyd Dark Side | Camiseta Premium Be Art",
      seo_description:
        "Camiseta Pink Floyd inspirada em Dark Side of the Moon, com algodão premium, visual icônico e acabamento da Be Art.",
      seo_tags:
        "camiseta pink floyd,camiseta dark side of the moon,camiseta de banda,camiseta rock,camiseta premium",
      og_image:
        "https://files.stripe.com/links/MDB8YWNjdF8xUk1CWXlERUFnVmpyZHF3fGZsX3Rlc3RfMDJkTVp1VEkxMFlIWGVTNmpUZ2xOSU4z006zUyPioV",
    },
  },
  prod_UT5ySIDyI6l1qC: {
    active: false,
    metadata: {
      catalog_segment: "internal_test",
    },
  },
  prod_USfCVYsjQH0xW7: {
    active: false,
    metadata: {
      catalog_segment: "internal_test",
    },
  },
};

async function main() {
  const stripe = getStripeServerClient();
  const products = await stripe.products.list({ limit: 100 });

  for (const product of products.data) {
    const plan = PRODUCT_PLANS[product.id];
    if (!plan) continue;

    const nextMetadata = {
      ...(product.metadata ?? {}),
      ...(plan.metadata ?? {}),
    };

    await stripe.products.update(product.id, {
      active: plan.active,
      description: plan.description,
      marketing_features: plan.marketingFeatures?.map((name) => ({ name })),
      metadata: nextMetadata,
      name: plan.name,
    });

    if (!plan.active) {
      const prices = await stripe.prices.list({ product: product.id, limit: 100 });
      await Promise.all(
        prices.data
          .filter((price) => price.active)
          .map((price) => stripe.prices.update(price.id, { active: false }))
      );
    }
  }

  const activePrices = await stripe.prices.list({ active: true, limit: 100, expand: ["data.product"] });
  const syncedProductIds = new Set<string>();
  const syncedVariantIds = new Set<string>();

  for (const price of activePrices.data) {
    if (price.unit_amount === null) continue;
    if (typeof price.product === "string") continue;

    const product = price.product;
    if (product.deleted || !product.active) continue;

    const metadata = (product.metadata ?? {}) as Record<string, string>;
    const images = dedupeStrings(product.images ?? []);
    const storedProduct = await prisma.product.upsert({
      where: { stripeProductId: product.id },
      update: {
        active: product.active,
        category: normalizeCategory(metadata),
        colors: normalizeList(metadata.colors),
        description: product.description ?? null,
        image: images[0] ?? null,
        marketingFeatures: sanitizeFeatures(
          product.marketing_features?.map((feature) => feature.name ?? "").filter(Boolean) ?? []
        ),
        name: product.name,
        ogImage: getMetadataValue(metadata, ["og_image", "ogImage"]) ?? images[0] ?? null,
        seoDescription: getMetadataValue(metadata, ["seo_description", "seoDescription"]),
        seoTags: normalizeSeoTags(metadata),
        seoTitle: getMetadataValue(metadata, ["seo_title", "seoTitle"]),
        sizes: normalizeList(metadata.sizes),
      },
      create: {
        active: product.active,
        category: normalizeCategory(metadata),
        colors: normalizeList(metadata.colors),
        description: product.description ?? null,
        image: images[0] ?? null,
        marketingFeatures: sanitizeFeatures(
          product.marketing_features?.map((feature) => feature.name ?? "").filter(Boolean) ?? []
        ),
        name: product.name,
        ogImage: getMetadataValue(metadata, ["og_image", "ogImage"]) ?? images[0] ?? null,
        seoDescription: getMetadataValue(metadata, ["seo_description", "seoDescription"]),
        seoTags: normalizeSeoTags(metadata),
        seoTitle: getMetadataValue(metadata, ["seo_title", "seoTitle"]),
        sizes: normalizeList(metadata.sizes),
        slug: slugify(`${product.name}-${product.id}`),
        stripeProductId: product.id,
      },
    });

    syncedProductIds.add(storedProduct.id);

    const variant = await prisma.productVariant.upsert({
      where: { stripePriceId: price.id },
      update: {
        active: price.active,
        currency: price.currency,
        name: price.nickname ?? product.name,
        productId: storedProduct.id,
        sku: price.lookup_key ?? price.id,
        unitAmount: price.unit_amount,
      },
      create: {
        active: price.active,
        currency: price.currency,
        name: price.nickname ?? product.name,
        productId: storedProduct.id,
        sku: price.lookup_key ?? price.id,
        stripePriceId: price.id,
        unitAmount: price.unit_amount,
      },
    });

    syncedVariantIds.add(variant.id);
  }

  await prisma.product.updateMany({
    where: {
      stripeProductId: {
        in: Object.entries(PRODUCT_PLANS)
          .filter(([, plan]) => !plan.active)
          .map(([productId]) => productId),
      },
    },
    data: { active: false },
  });

  await prisma.productVariant.updateMany({
    where: {
      product: {
        stripeProductId: {
          in: Object.entries(PRODUCT_PLANS)
            .filter(([, plan]) => !plan.active)
            .map(([productId]) => productId),
        },
      },
    },
    data: { active: false },
  });

  console.log(`Stripe catalog normalized. Active products synced: ${syncedProductIds.size}.`);
}

main()
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });