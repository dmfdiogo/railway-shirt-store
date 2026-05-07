import type { Metadata } from "next";
import { headers } from "next/headers";
import { connection } from "next/server";

import { auth, isAuthConfigured } from "@/lib/auth";
import { CartPageContent } from "@/components/cart/cart-page-content";
import { MysticBackground } from "@/components/ui/mystic-background";
import { Navbar } from "@/components/ui/navbar";

export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Carrinho — Be Art",
  description: "Revise as peças escolhidas antes de seguir para o checkout da Be Art.",
  alternates: {
    canonical: "/cart",
  },
};

export default async function CartPage() {
  await connection();

  const authReady = isAuthConfigured();
  const session = authReady
    ? await auth.api.getSession({ headers: await headers() }).catch(() => null)
    : null;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0A0A0C] text-white">
      <MysticBackground />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-8rem] h-[28rem] bg-[radial-gradient(ellipse_at_bottom,rgba(107,60,246,0.2),transparent_58%)] opacity-90 blur-3xl"
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

      <main className="relative z-10 px-6 pb-20 pt-28 sm:px-10 sm:pt-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <CartPageContent />
        </div>
      </main>
    </div>
  );
}