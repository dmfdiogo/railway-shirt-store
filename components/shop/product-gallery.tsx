"use client";

import Image from "next/image";
import { useState } from "react";

type ProductGalleryProps = {
  images: string[];
  name: string;
};

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const galleryImages = images.length > 0 ? images : [];
  const [selectedImage, setSelectedImage] = useState(galleryImages[0] ?? null);

  if (!selectedImage) {
    return (
      <section className="relative overflow-hidden rounded-[2.2rem] border border-black/10 bg-white shadow-[0_28px_80px_rgba(0,0,0,0.22)] lg:h-full">
        <div className="relative flex aspect-[4/4.5] h-full w-full items-center justify-center overflow-hidden bg-[#F4F0E8] p-5 lg:aspect-auto">
          <div aria-hidden="true" className="absolute inset-x-[18%] top-[18%] h-28 rounded-full bg-[#6B3CF6]/12 blur-[50px]" />
          <div aria-hidden="true" className="absolute bottom-[14%] right-[20%] h-24 w-24 rounded-full bg-[#2E5BFF]/10 blur-[40px]" />
          <div className="relative flex flex-col items-center gap-4 text-center">
            <div className="flex h-32 w-32 items-center justify-center rounded-full border border-black/8 bg-white/60 shadow-[0_18px_38px_rgba(73,55,35,0.12)]">
              <span className="select-none text-6xl opacity-35 grayscale" aria-hidden="true">
                👕
              </span>
            </div>
            <div>
              <p className="font-display text-2xl font-bold uppercase tracking-[0.16em] text-black/72">
                Be Art
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-black/34">
                Visual de coleção
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex flex-col overflow-hidden rounded-[2.2rem] border border-black/10 bg-white shadow-[0_28px_80px_rgba(0,0,0,0.22)] lg:h-full">
      <div className="relative aspect-[4/4.5] w-full overflow-hidden bg-white lg:h-full lg:min-h-[34rem] lg:flex-1 lg:aspect-auto">
        <Image
          src={selectedImage}
          alt={name}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover object-center"
          priority
        />
      </div>

      {galleryImages.length > 1 ? (
        <div className="grid grid-cols-4 gap-2 border-t border-black/8 bg-[#F3F0EA] p-3 sm:grid-cols-5">
          {galleryImages.map((image, index) => {
            const isSelected = image === selectedImage;
            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={`relative aspect-square overflow-hidden rounded-2xl border transition ${
                  isSelected
                    ? "border-[#6B3CF6] shadow-[0_0_0_1px_rgba(107,60,246,0.15)]"
                    : "border-black/10 opacity-75 hover:opacity-100"
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
  );
}