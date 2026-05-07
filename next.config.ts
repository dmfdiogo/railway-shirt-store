import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      // Stripe product image CDN
      { protocol: "https", hostname: "files.stripe.com" },
      // Common image hosts used by Stripe uploads
      { protocol: "https", hostname: "**.stripe.com" },
    ],
  },
};

export default nextConfig;
