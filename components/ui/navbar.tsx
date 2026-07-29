"use client";

import {
  ArrowRight,
  LogIn,
  Menu,
  Sparkles,
  ShoppingBag,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { useCart } from "@/components/cart/use-cart";

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
          <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-white">
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            Catálogo
          </Link>
          <Link href="/art" className="inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-white">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Art
          </Link>
          <Link href="/cart" className="relative inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-white">
            <ShoppingCart className="h-4 w-4" aria-hidden="true" />
            Carrinho
            {count > 0 ? (
              <span className="ml-2 inline-flex min-w-5 items-center justify-center rounded-full bg-[#7C7CFF] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                {count}
              </span>
            ) : null}
          </Link>
          {isLoggedIn ? (
            <Link href="/account" className="inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-white">
              <UserRound className="h-4 w-4" aria-hidden="true" />
              Minha conta
            </Link>
          ) : authReady ? (
            <Link href="/sign-in" className="inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-white">
              <LogIn className="h-4 w-4" aria-hidden="true" />
              Entrar
            </Link>
          ) : null}
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#2E5BFF_0%,#6B3CF6_100%)] px-5 py-2 text-sm font-semibold text-white shadow-[0_12px_34px_rgba(61,79,255,0.34)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(76,70,229,0.42)]"
          >
            Ver coleção
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
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
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
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
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition hover:bg-white/[0.05] hover:text-white"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                Catálogo
              </Link>
            </li>
            <li>
              <Link
                href="/art"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition hover:bg-white/[0.05] hover:text-white"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Art
              </Link>
            </li>
            <li>
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition hover:bg-white/[0.05] hover:text-white"
              >
                <span className="inline-flex items-center gap-3">
                  <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                  Carrinho
                </span>
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
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition hover:bg-white/[0.05] hover:text-white"
                >
                  <UserRound className="h-4 w-4" aria-hidden="true" />
                  Minha conta
                </Link>
              </li>
            ) : authReady ? (
              <>
                <li>
                  <Link
                    href="/sign-in"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition hover:bg-white/[0.05] hover:text-white"
                  >
                    <LogIn className="h-4 w-4" aria-hidden="true" />
                    Entrar
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sign-up"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition hover:bg-white/[0.05] hover:text-white"
                  >
                    <UserRound className="h-4 w-4" aria-hidden="true" />
                    Criar conta
                  </Link>
                </li>
              </>
            ) : null}
            <li className="pt-2">
              <Link
                href="/shop"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#2E5BFF_0%,#6B3CF6_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_34px_rgba(61,79,255,0.34)] transition hover:opacity-95"
              >
                Ver coleção
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
