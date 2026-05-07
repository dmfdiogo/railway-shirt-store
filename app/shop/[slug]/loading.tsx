import { ViewTransition } from "react";

export default function ProductLoading() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0A0A0C] px-6 pb-24 pt-28 text-white sm:px-10 sm:pt-32 lg:px-16">
      <ViewTransition exit="slide-down">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-4 w-48 rounded-full bg-white/8" />
          <div className="mt-4 h-4 w-32 rounded-full bg-white/8" />
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.94fr)_34rem]">
            <div className="rounded-[2.2rem] border border-white/[0.08] bg-white/[0.04]">
              <div className="aspect-[4/4.5] bg-white/8 lg:min-h-[34rem]" />
              <div className="flex gap-2 p-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="h-20 flex-1 rounded-2xl bg-white/8" />
                ))}
              </div>
            </div>

            <div className="rounded-[2.2rem] border border-white/[0.08] bg-white/[0.04] p-6">
              <div className="h-3 w-20 rounded-full bg-white/8" />
              <div className="mt-3 h-12 w-4/5 rounded-full bg-white/10" />
              <div className="mt-4 h-4 w-full rounded-full bg-white/8" />
              <div className="mt-2 h-4 w-5/6 rounded-full bg-white/8" />
              <div className="mt-6 h-24 rounded-[1.6rem] bg-white/8" />
              <div className="mt-6 h-44 rounded-[1.6rem] bg-white/8" />
              <div className="mt-5 flex gap-3">
                <div className="h-12 flex-1 rounded-full bg-white/8" />
                <div className="h-12 flex-1 rounded-full bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      </ViewTransition>
    </main>
  );
}