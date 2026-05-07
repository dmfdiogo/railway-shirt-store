"use client";

import Link from "next/link";
import { useState } from "react";

import { useCart } from "@/components/cart/use-cart";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useSession } from "@/lib/auth-client";

interface NavbarProps {
  sessionActive: boolean;
  authReady: boolean;
}

export function Navbar({ sessionActive, authReady }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { data: session } = useSession();
  const isLoggedIn = sessionActive || Boolean(session?.user);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/[0.06] bg-[#08080B]/72 backdrop-blur-2xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-[0.1em] text-white sm:text-xl"
        >
          Be Art<span className="text-[#7C7CFF]">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {isLoggedIn ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-500/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-100">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden="true" />
              Sessao ativa
            </span>
          ) : null}
          <Link href="/shop" className="text-sm font-medium text-white/50 transition-colors hover:text-white">
            Catálogo
          </Link>
          <Link href="/cart" className="relative text-sm font-medium text-white/50 transition-colors hover:text-white">
            Carrinho
            {count > 0 ? (
              <span className="ml-2 inline-flex min-w-5 items-center justify-center rounded-full bg-[#7C7CFF] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                {count}
              </span>
            ) : null}
          </Link>
          {isLoggedIn ? (
            <Link href="/account" className="text-sm font-medium text-white/50 transition-colors hover:text-white">
              Minha conta
            </Link>
          ) : authReady ? (
            <Link href="/sign-in" className="text-sm font-medium text-white/50 transition-colors hover:text-white">
              Entrar
            </Link>
          ) : null}
          <Link
            href="/shop"
            className="rounded-full bg-[linear-gradient(135deg,#2E5BFF_0%,#6B3CF6_100%)] px-5 py-2 text-sm font-semibold text-white shadow-[0_12px_34px_rgba(61,79,255,0.34)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(76,70,229,0.42)]"
          >
            Ver coleção
          </Link>
          <ThemeToggle />
        </nav>

        {/* Mobile: hamburger */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/[0.06] hover:text-white md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            /* X icon */
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            /* Hamburger icon */
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu drawer */}
      {open && (
        <nav
          className="border-t border-white/[0.06] bg-[#0A0A0C]/95 px-6 py-5 md:hidden"
          aria-label="Menu mobile"
        >
          <ul className="flex flex-col gap-1">
            <li>
              <Link
                href="/shop"
                onClick={() => setOpen(false)}
                className="flex items-center rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition hover:bg-white/[0.05] hover:text-white"
              >
                Catálogo
              </Link>
            </li>
            <li>
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition hover:bg-white/[0.05] hover:text-white"
              >
                <span>Carrinho</span>
                {count > 0 ? (
                  <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-[#7C7CFF] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    {count}
                  </span>
                ) : null}
              </Link>
            </li>
            {isLoggedIn ? (
              <li>
                <Link
                  href="/account"
                  onClick={() => setOpen(false)}
                  className="flex items-center rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition hover:bg-white/[0.05] hover:text-white"
                >
                  Minha conta
                </Link>
              </li>
            ) : authReady ? (
              <>
                <li>
                  <Link
                    href="/sign-in"
                    onClick={() => setOpen(false)}
                    className="flex items-center rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition hover:bg-white/[0.05] hover:text-white"
                  >
                    Entrar
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sign-up"
                    onClick={() => setOpen(false)}
                    className="flex items-center rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition hover:bg-white/[0.05] hover:text-white"
                  >
                    Criar conta
                  </Link>
                </li>
              </>
            ) : null}
            <li className="pt-2">
              <div className="px-4 pb-3">
                <ThemeToggle />
              </div>
            </li>
            <li>
              {isLoggedIn ? (
                <div className="mx-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-500/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden="true" />
                  Sessao ativa
                </div>
              ) : null}
            </li>
            <li className="pt-2">
              <Link
                href="/shop"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#2E5BFF_0%,#6B3CF6_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_34px_rgba(61,79,255,0.34)] transition hover:opacity-95"
              >
                Ver coleção
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
