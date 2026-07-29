import type { Metadata } from "next";

import { FlowerOfLifeReveal } from "@/components/art/flower-of-life-reveal";
import { Navbar } from "@/components/ui/navbar";
import { SiteFooter } from "@/components/ui/site-footer";
import { buildNoIndexMetadata } from "@/lib/seo";
import { isAuthConfigured } from "@/lib/auth";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Art Lab — Sacred Geometry Reveal",
  description:
    "Pagina de teste da Be Art para estudar revelacao por mascaras geometricas com background atmosferico e sweep neon.",
  path: "/art",
});

export default function ArtPage() {
  const authReady = isAuthConfigured();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0A0A0C] text-white">
      <Navbar sessionActive={false} authReady={authReady} />

      <FlowerOfLifeReveal
        eyebrow="Art Lab"
        title="Geometrias sagradas acesas por varredura neon."
        description="Experimento em tres camadas: fundo atmosferico, faixa neon em movimento e mascaras geometricas alternaveis, incluindo malhas repetidas e simbolos hero unicos, para revelar o pattern apenas na passagem de luz."
      />

      <section className="relative z-10 px-6 pb-20 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-6 rounded-[2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-8 shadow-[0_28px_80px_rgba(0,0,0,0.3)] backdrop-blur-2xl lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-[#B7FFF2]">
              Estrutura
            </p>
            <h2 className="font-display mt-4 text-3xl font-extrabold uppercase tracking-[-0.05em] text-white sm:text-4xl">
              O reveal continua preso a transform, mesmo com trocas de mascara.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/64">
              A pagina agora funciona como um laboratorio de geometria sagrada: alem das malhas repetidas, o reveal tambem aceita simbolos unicos em escala hero para Flower of Life, Metatron, espiral de Fibonacci e uma mandala ornamental. O movimento principal continua usando `transform` e `will-change: transform` para deixar a animacao mais estavel durante a passagem do gradiente.
            </p>
          </div>

          <div className="grid gap-4 text-sm text-white/60">
            <div className="rounded-[1.4rem] border border-white/10 bg-black/20 px-5 py-4 backdrop-blur-xl">
              Fundo: `MysticBackground` com glows adicionais para manter o mesmo clima da landing.
            </div>
            <div className="rounded-[1.4rem] border border-white/10 bg-black/20 px-5 py-4 backdrop-blur-xl">
              Mascara: selecao entre quatro SVGs em `public/`, todos aplicados em SVG mask responsiva ocupando o viewport.
            </div>
            <div className="rounded-[1.4rem] border border-white/10 bg-black/20 px-5 py-4 backdrop-blur-xl">
              Hero symbols: opcoes centralizadas para Metatron, Flower of Life, Fibonacci e uma mandala grande, usando encaixe `meet` em vez de textura cortada.
            </div>
            <div className="rounded-[1.4rem] border border-white/10 bg-black/20 px-5 py-4 backdrop-blur-xl">
              Escala: presets `normal`, `grande` e `gigante` alterando o enquadramento da mascara sem reescrever a animacao.
            </div>
            <div className="rounded-[1.4rem] border border-white/10 bg-black/20 px-5 py-4 backdrop-blur-xl">
              Sweep: gradiente neon largo com blur e uma segunda passada mais nitida para reforcar o acendimento.
            </div>
          </div>
        </div>
      </section>

      <SiteFooter authReady={authReady} sessionActive={false} />
    </div>
  );
}