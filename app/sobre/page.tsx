import type { Metadata } from "next";

import { BeArtShell } from "@/components/ui/beart-shell";
import { buildMarketingMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMarketingMetadata({
  title: "Sobre a Be Art — Marca, proposta e identidade",
  description:
    "Conheça a proposta da Be Art: ravewear autoral com atmosfera noturna, acabamento premium e direção visual precisa.",
  path: "/sobre",
});

export default function AboutPage() {
  return (
    <BeArtShell authReady footer navbar contentClassName="relative z-10 px-6 pb-20 pt-28 sm:px-10 sm:pt-32 lg:px-16">
      <section className="mx-auto max-w-4xl rounded-[2.2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-8 py-10 shadow-[0_28px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#8B5CF6]">Sobre a Be Art</p>
        <h1 className="font-display mt-4 text-4xl font-extrabold uppercase tracking-[-0.05em] text-white sm:text-5xl">
          Presença visual sem excesso.
        </h1>
        <div className="mt-6 space-y-5 text-base leading-8 text-white/62">
          <p>
            A Be Art nasce para vestir noites intensas com uma linguagem mais precisa, menos caricata e mais autoral. A coleção mistura arte aplicada, contraste controlado e caimento pensado para quem quer impacto sem ruído.
          </p>
          <p>
            O projeto da loja segue a mesma ideia: atmosfera escura, checkout direto e atenção aos detalhes que sustentam uma marca premium de ravewear desde o primeiro clique até o pós-compra.
          </p>
        </div>
      </section>
    </BeArtShell>
  );
}