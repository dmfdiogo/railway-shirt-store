import type { Metadata } from "next";

import { CartCancelRecovery } from "@/components/cart/cart-cancel-recovery";
import { SiteFooter } from "@/components/ui/site-footer";
import { MysticBackground } from "@/components/ui/mystic-background";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Checkout cancelado — Be Art",
  description: "Recupere o carrinho e volte ao catálogo após encerrar o checkout da Be Art.",
  path: "/checkout/cancel",
});

export default function CheckoutCancelPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0A0A0C] px-6 py-12 text-white sm:px-10 lg:px-16">
      <MysticBackground />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[-8rem] h-[24rem] bg-[radial-gradient(ellipse_at_top,rgba(46,91,255,0.24),transparent_55%)] opacity-90 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-10rem] h-[28rem] bg-[radial-gradient(ellipse_at_bottom,rgba(107,60,246,0.2),transparent_58%)] opacity-90 blur-3xl"
      />

      <div className="relative z-10 flex min-h-screen flex-col justify-between">
        <div className="flex flex-1 items-center justify-center py-8">
          <CartCancelRecovery />
        </div>
        <SiteFooter />
      </div>
    </main>
  );
}