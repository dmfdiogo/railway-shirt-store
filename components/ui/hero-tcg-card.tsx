"use client";

import { useState } from "react";
import Image from "next/image";

export function HeroTcgCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showBack, setShowBack] = useState(false);

  function handleFlip() {
    setIsFlipped(true);
    setTimeout(() => setShowBack(true), 300);
  }

  function handleUnflip() {
    setIsFlipped(false);
    setTimeout(() => setShowBack(false), 300);
  }

  return (
    <div
      style={{
        transform: isFlipped ? "scaleX(-1)" : "scaleX(1)",
        transition: "transform 600ms cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      {/* FRONT */}
      {!showBack && (
        <article
          className="hero-tcg-card group relative isolate overflow-hidden rounded-[2.35rem] border border-white/10 bg-[linear-gradient(155deg,rgba(23,24,34,0.96)_0%,rgba(15,15,22,0.98)_42%,rgba(9,10,16,0.98)_100%)] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:p-6"
        >
          <div aria-hidden="true" className="tcg-gleam pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.18),transparent_22%),radial-gradient(circle_at_76%_14%,rgba(130,146,255,0.20),transparent_30%),radial-gradient(circle_at_74%_82%,rgba(139,92,246,0.24),transparent_30%),radial-gradient(circle_at_18%_74%,rgba(46,91,255,0.18),transparent_28%)]" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-[1px] rounded-[2.25rem] border border-white/[0.06]" />
          <div aria-hidden="true" className="tcg-foil pointer-events-none absolute inset-y-[-18%] left-[-34%] w-[72%] bg-[linear-gradient(115deg,transparent_16%,rgba(255,255,255,0.02)_28%,rgba(255,255,255,0.28)_42%,rgba(163,191,255,0.24)_50%,rgba(255,255,255,0.02)_61%,transparent_72%)] opacity-70 mix-blend-screen" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-6 top-5 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-70" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-6 bottom-5 h-px bg-gradient-to-r from-transparent via-[#7C7CFF]/55 to-transparent opacity-75" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-14 top-18 font-display text-[9rem] font-black uppercase tracking-[-0.08em] text-white/[0.045]">
            BA
          </div>

          <div className="relative z-10 flex min-h-[30rem] flex-col justify-between">
            <div className="flex items-start justify-between gap-4 text-[11px] font-medium uppercase tracking-[0.34em] text-white/44">
              <div>
                <p>Be Art</p>
                <p className="mt-2 tracking-[0.28em] text-white/28">Trading Aura 01</p>
              </div>
              <button
                onClick={handleFlip}
                type="button"
                className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[10px] text-white transition hover:border-[#6B3CF6]/50 hover:bg-[#6B3CF6]/20"
                aria-label="Ver camiseta"
              >
                Virar Card
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>

            <div className="mt-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.42em] text-[#B9BEFF]">
                Be Art Signature
              </p>
              <h2 className="font-display mt-5 max-w-[10ch] text-[clamp(2.6rem,4vw,4.6rem)] font-black uppercase leading-[0.88] tracking-[-0.06em] text-white">
                Vista a noite do seu jeito.
              </h2>
              <p className="mt-5 max-w-[28ch] text-base leading-7 text-white/62">
                Be Art e uma loja de camisetas de rave pensada para noites intensas, contraste preciso e elegancia em ambientes de luz baixa.
              </p>
            </div>

            <div className="mt-10 space-y-3 text-sm text-white/68">
              {[
                "Loja autoral de ravewear com identidade clara.",
                "Metal, brilho e sombra combinados para criar atmosfera.",
                "Peças que acompanham seu estilo sem precisar exagerar.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 border-t border-white/10 pt-3.5 first:border-t-0 first:pt-0">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[linear-gradient(135deg,#EEF2FF_0%,#7C7CFF_45%,#6B3CF6_100%)] shadow-[0_0_14px_rgba(109,120,255,0.55)]" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-end justify-between gap-5 border-t border-white/10 pt-4">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/32">Categoria</p>
                <p className="mt-2 font-display text-xl font-bold uppercase tracking-[0.08em] text-white/90">
                  Ravewear
                </p>
              </div>
              <p className="max-w-[10rem] text-right text-[11px] uppercase tracking-[0.26em] text-white/38">
                loja de camisetas para noites elétricas
              </p>
            </div>
          </div>
        </article>
      )}

      {/* BACK */}
      {showBack && (
        <article
          className="relative isolate overflow-hidden rounded-[2.35rem] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.52)]"
          style={{ transform: "scaleX(-1)", minHeight: "38rem" }}
        >
          {/* Full-bleed shirt image */}
          <Image
            src="/beart-shirt.webp"
            alt="Be Art Shirt"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 30vw"
          />

          {/* Same TCG effects as the front */}
          <div aria-hidden="true" className="tcg-gleam pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.18),transparent_22%),radial-gradient(circle_at_76%_14%,rgba(130,146,255,0.20),transparent_30%),radial-gradient(circle_at_74%_82%,rgba(139,92,246,0.24),transparent_30%),radial-gradient(circle_at_18%_74%,rgba(46,91,255,0.18),transparent_28%)]" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-[1px] rounded-[2.25rem] border border-white/[0.06]" />
          <div aria-hidden="true" className="tcg-foil pointer-events-none absolute inset-y-[-18%] left-[-34%] w-[72%] bg-[linear-gradient(115deg,transparent_16%,rgba(255,255,255,0.02)_28%,rgba(255,255,255,0.28)_42%,rgba(163,191,255,0.24)_50%,rgba(255,255,255,0.02)_61%,transparent_72%)] opacity-70 mix-blend-screen" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-6 top-5 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-70" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-6 bottom-5 h-px bg-gradient-to-r from-transparent via-[#7C7CFF]/55 to-transparent opacity-75" />

          {/* Voltar button */}
          <div className="absolute inset-x-5 top-5 z-10 flex items-start justify-between">
            <div className="text-[11px] font-medium uppercase tracking-[0.34em] text-white/60">
              <p>Be Art</p>
              <p className="mt-1 tracking-[0.28em] text-white/38">Trading Aura 01</p>
            </div>
            <button
              onClick={handleUnflip}
              type="button"
              className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[10px] text-white/80 backdrop-blur-md transition hover:bg-black/60 hover:text-white"
              aria-label="Voltar"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Frente
            </button>
          </div>

          {/* Bottom label */}
          <div className="absolute inset-x-5 bottom-5 z-10 flex items-end justify-between">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">Ravewear</p>
            <span className="rounded-full border border-[#7C7CFF]/30 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B9BEFF]/80 backdrop-blur-md">
              Holo Rare
            </span>
          </div>
        </article>
      )}
    </div>
  );
}
