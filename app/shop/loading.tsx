import { ViewTransition } from "react";

export default function ShopLoading() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0A0A0C] px-6 pb-16 pt-28 text-white sm:px-10 sm:pt-32 lg:px-16">
      <ViewTransition exit="slide-down">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.04] px-6 py-7 backdrop-blur-2xl">
            <div className="h-3 w-28 rounded-full bg-white/10" />
            <div className="mt-4 h-12 max-w-xl rounded-full bg-white/10" />
            <div className="mt-4 h-4 max-w-2xl rounded-full bg-white/8" />
            <div className="mt-8 grid gap-3 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-12 rounded-2xl bg-white/8" />
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.04]">
                <div className="aspect-[4/4.35] bg-white/8" />
                <div className="space-y-3 p-5">
                  <div className="h-3 w-24 rounded-full bg-white/8" />
                  <div className="h-7 w-2/3 rounded-full bg-white/10" />
                  <div className="h-4 w-full rounded-full bg-white/8" />
                  <div className="h-4 w-5/6 rounded-full bg-white/8" />
                  <div className="h-10 w-32 rounded-full bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ViewTransition>
    </main>
  );
}