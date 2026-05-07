import Link from "next/link";

import { MysticBackground } from "@/components/ui/mystic-background";

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0A0A0C] text-white">
      <MysticBackground />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_50%_8%,rgba(107,60,246,0.18),transparent_62%)]"
      />

      <main className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20 sm:px-10">
        <section className="w-full max-w-2xl rounded-[2.2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-8 py-10 text-center shadow-[0_28px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#8B5CF6]">404</p>
          <h1 className="font-display mt-4 text-4xl font-extrabold uppercase tracking-[-0.05em] text-white sm:text-5xl">
            Essa peça saiu da vitrine.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-white/60">
            A rota que você tentou abrir não existe ou foi movida. Volte ao catálogo principal e continue a navegação a partir da coleção.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2E5BFF_0%,#6B3CF6_100%)] px-8 text-base font-semibold text-white shadow-[0_16px_42px_rgba(61,79,255,0.34)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_54px_rgba(107,60,246,0.42)]"
            >
              Voltar ao catálogo
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-8 text-base font-semibold text-white/76 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
            >
              Ir para a home
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}