import type { Metadata } from "next";

export const SITE_NAME = "Be Art";
export const SITE_TITLE = "Be Art — Camisetas de Rave";
export const SITE_DESCRIPTION =
  "Camisetas de rave com presença, sofisticação e atmosfera noturna. Moda premium para quem quer vestir poder e mistério.";
export const DEFAULT_OG_IMAGE_PATH = "/opengraph-image";

export const NO_INDEX_ROBOTS: NonNullable<Metadata["robots"]> = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export function getSiteUrl() {
  return process.env.APP_URL ?? "http://localhost:3000";
}

export function absoluteUrl(path = "/") {
  return new URL(path, getSiteUrl()).toString();
}

export function buildMarketingMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "pt_BR",
      type: "website",
      images: [
        {
          url: DEFAULT_OG_IMAGE_PATH,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE_PATH],
    },
  };
}

export function buildNoIndexMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    robots: NO_INDEX_ROBOTS,
  };
}