import type { Metadata } from "next";

import { BeArtShell } from "@/components/ui/beart-shell";
import { buildMarketingMetadata } from "@/lib/seo";

const exchangeItems = [
  "Solicitações devem ser feitas em até 7 dias corridos após o recebimento do pedido.",
  "A peça precisa retornar sem sinais de uso, lavagem ou alteração.",
  "Itens promocionais e personalizados dependem de análise prévia do suporte.",
  "Ao receber a devolução, a Be Art confirma o estado da peça e orienta a troca ou crédito.",
];

export const metadata: Metadata = buildMarketingMetadata({
  title: "Política de troca — Be Art",
  description:
    "Consulte a política de troca da Be Art para entender prazos, condições da peça e regras do pós-compra.",
  path: "/politica-de-troca",
});

export default function ExchangePolicyPage() {
  return (
    <BeArtShell authReady footer navbar contentClassName="relative z-10 px-6 pb-20 pt-28 sm:px-10 sm:pt-32 lg:px-16">
      <section className="mx-auto max-w-4xl rounded-[2.2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-8 py-10 shadow-[0_28px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#8B5CF6]">Politica de troca</p>
        <h1 className="font-display mt-4 text-4xl font-extrabold uppercase tracking-[-0.05em] text-white sm:text-5xl">
          Regras claras para pós-compra.
        </h1>
        <ul className="mt-8 space-y-3">
          {exchangeItems.map((item) => (
            <li key={item} className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] px-5 py-4 text-base leading-8 text-white/62">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </BeArtShell>
  );
}