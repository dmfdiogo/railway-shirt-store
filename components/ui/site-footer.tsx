import Link from "next/link";

type SiteFooterProps = {
  authReady?: boolean;
  sessionActive?: boolean;
};

export function SiteFooter({ authReady = false, sessionActive = false }: SiteFooterProps) {
  return (
    <footer className="border-t border-white/[0.06] px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-sm">
          <Link
            href="/"
            className="font-display text-xl font-extrabold uppercase tracking-widest text-white"
          >
            Be Art<span className="text-[#7C7CFF]">.</span>
          </Link>
          <p className="mt-3 text-sm leading-7 text-white/42">
            Ravewear com atmosfera noturna, acabamento premium e presença visual pensada para pista, foto e rua.
          </p>
        </div>

        <nav className="grid gap-2 text-sm" aria-label="Institucional">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#A5ADFF]">
            Institucional
          </p>
          <Link href="/sobre" className="text-white/40 transition hover:text-white/78">
            Sobre
          </Link>
          <Link href="/contato" className="text-white/40 transition hover:text-white/78">
            Contato
          </Link>
          <Link href="/politica-de-troca" className="text-white/40 transition hover:text-white/78">
            Politica de troca
          </Link>
        </nav>

        <nav className="grid gap-2 text-sm" aria-label="Loja">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#A5ADFF]">
            Loja
          </p>
          <Link href="/shop" className="text-white/40 transition hover:text-white/78">
            Catalogo
          </Link>
          <Link href="/cart" className="text-white/40 transition hover:text-white/78">
            Carrinho
          </Link>
          {sessionActive ? (
            <Link href="/account" className="text-white/40 transition hover:text-white/78">
              Minha conta
            </Link>
          ) : authReady ? (
            <Link href="/sign-in" className="text-white/40 transition hover:text-white/78">
              Entrar
            </Link>
          ) : null}
        </nav>

        <div className="text-sm text-white/28 lg:text-right">
          <p>Atendimento</p>
          <a className="mt-2 block text-white/46 transition hover:text-white/78" href="mailto:contato@beartstore.com.br">
            contato@beartstore.com.br
          </a>
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-white/22">© 2026 Be Art</p>
        </div>
      </div>
    </footer>
  );
}