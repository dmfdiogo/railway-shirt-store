"use client";

import Image from "next/image";
import { useState } from "react";
import { ViewTransition } from "react";

type ProductGalleryProps = {
  images: string[];
  name: string;
  transitionName?: string;
};

export function ProductGallery({ images, name, transitionName }: ProductGalleryProps) {
  const galleryImages = images.length > 0 ? images : [];
  const [selectedImage, setSelectedImage] = useState(galleryImages[0] ?? null);
  const [isZoomed, setIsZoomed] = useState(false);
  const resolvedTransitionName = transitionName ?? `${name}-image`;

  if (!selectedImage) {
    return (
      <section className="relative overflow-hidden rounded-[2.2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] shadow-[0_28px_80px_rgba(0,0,0,0.28)] lg:h-full">
        <div className="relative flex aspect-[4/4.5] h-full w-full items-center justify-center overflow-hidden bg-[linear-gradient(145deg,#131520,#090A0F)] p-5 lg:aspect-auto">
          <div aria-hidden="true" className="absolute inset-x-[18%] top-[18%] h-28 rounded-full bg-[#6B3CF6]/18 blur-[50px]" />
          <div aria-hidden="true" className="absolute bottom-[14%] right-[20%] h-24 w-24 rounded-full bg-[#2E5BFF]/14 blur-[40px]" />
          <div className="relative flex flex-col items-center gap-4 text-center">
            <div className="flex h-32 w-32 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] shadow-[0_18px_38px_rgba(0,0,0,0.28)]">
              <span className="select-none text-6xl opacity-35 grayscale" aria-hidden="true">
                👕
              </span>
            </div>
            <div>
              <p className="font-display text-2xl font-bold uppercase tracking-[0.16em] text-white/82">
                Be Art
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-white/34">
                Visual de coleção
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative flex flex-col overflow-hidden rounded-[2.2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] shadow-[0_28px_80px_rgba(0,0,0,0.28)] lg:h-full">
        <ViewTransition name={resolvedTransitionName} share="morph">
          <button
            type="button"
            onClick={() => setIsZoomed(true)}
            className="group relative aspect-[4/4.5] w-full overflow-hidden bg-[linear-gradient(145deg,#131520,#090A0F)] text-left lg:h-full lg:min-h-[34rem] lg:flex-1 lg:aspect-auto"
            aria-label={`Ampliar imagem de ${name}`}
          >
            <Image
              src={selectedImage}
              alt={name}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-center transition duration-500 group-hover:scale-[1.06]"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_32%),linear-gradient(180deg,transparent_20%,rgba(8,8,12,0.38)_100%)]" />
            <span className="absolute right-4 top-4 rounded-full border border-white/12 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/82 backdrop-blur-md">
              Zoom
            </span>
          </button>
        </ViewTransition>

        {galleryImages.length > 1 ? (
          <div className="flex gap-2 overflow-x-auto border-t border-white/8 bg-[#0D0E13] p-3 sm:grid sm:grid-cols-5 sm:overflow-visible">
            {galleryImages.map((image, index) => {
              const isSelected = image === selectedImage;
              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className={`relative aspect-square min-w-20 overflow-hidden rounded-2xl border transition sm:min-w-0 ${
                    isSelected
                      ? "border-[#6B3CF6] shadow-[0_0_0_1px_rgba(107,60,246,0.18)]"
                      : "border-white/10 opacity-75 hover:opacity-100"
                  }`}
                  aria-label={`Ver imagem ${index + 1} de ${galleryImages.length} de ${name}`}
                  aria-pressed={isSelected}
                >
                  <Image
                    src={image}
                    alt={`${name} ${index + 1}`}
                    fill
                    sizes="120px"
                    className="object-cover object-center"
                  />
                </button>
              );
            })}
          </div>
        ) : null}
      </section>

      {isZoomed ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-6 backdrop-blur-xl" role="dialog" aria-modal="true">
          <button
            type="button"
            onClick={() => setIsZoomed(false)}
            className="absolute right-6 top-6 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white"
          >
            Fechar
          </button>
          <div className="relative h-[80vh] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0D0E13] shadow-[0_30px_90px_rgba(0,0,0,0.52)]">
            <Image src={selectedImage} alt={name} fill sizes="100vw" className="object-contain" priority />
          </div>
        </div>
      ) : null}
    </>
  );
}