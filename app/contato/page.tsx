import type { Metadata } from "next";

import { BeArtShell } from "@/components/ui/beart-shell";
import { buildMarketingMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMarketingMetadata({
  title: "Contato — Atendimento da Be Art",
  description:
    "Entre em contato com a Be Art para falar sobre pedidos, tamanhos, disponibilidade, suporte e colaborações.",
  path: "/contato",
});

export default function ContactPage() {
  return (
    <BeArtShell authReady footer navbar contentClassName="relative z-10 px-6 pb-20 pt-28 sm:px-10 sm:pt-32 lg:px-16">
      <section className="mx-auto max-w-4xl rounded-[2.2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-8 py-10 shadow-[0_28px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#8B5CF6]">Contato</p>
        <h1 className="font-display mt-4 text-4xl font-extrabold uppercase tracking-[-0.05em] text-white sm:text-5xl">
          Atendimento direto da loja.
        </h1>
        <div className="mt-6 space-y-5 text-base leading-8 text-white/62">
          <p>
            Para dúvidas sobre pedidos, tamanhos, disponibilidade ou colaboração, fale com a equipe pelo canal principal abaixo.
          </p>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-5 py-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/38">Email</p>
            <a href="mailto:contato@beartstore.com.br" className="mt-3 inline-flex text-lg font-medium text-white transition hover:text-[#BFC6FF]">
              contato@beartstore.com.br
            </a>
          </div>
        </div>
      </section>
    </BeArtShell>
  );
}