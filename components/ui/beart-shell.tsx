import type { ReactNode } from "react";

import { MysticBackground } from "@/components/ui/mystic-background";
import { Navbar } from "@/components/ui/navbar";
import { SiteFooter } from "@/components/ui/site-footer";

type BeArtShellProps = {
  authReady?: boolean;
  children: ReactNode;
  contentClassName?: string;
  footer?: boolean;
  navbar?: boolean;
  sessionActive?: boolean;
};

export function BeArtShell({
  authReady = false,
  children,
  contentClassName,
  footer = false,
  navbar = false,
  sessionActive = false,
}: BeArtShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0C] text-white">
      <MysticBackground />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[-8rem] h-[24rem] bg-[radial-gradient(ellipse_at_top,rgba(46,91,255,0.22),transparent_55%)] opacity-90 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-10rem] h-[28rem] bg-[radial-gradient(ellipse_at_bottom,rgba(107,60,246,0.2),transparent_58%)] opacity-90 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {navbar ? <Navbar sessionActive={sessionActive} authReady={authReady} /> : null}

      <main className={contentClassName}>{children}</main>

      {footer ? <SiteFooter authReady={authReady} sessionActive={sessionActive} /> : null}
    </div>
  );
}