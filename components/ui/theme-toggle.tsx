"use client";

import { useEffect, useState } from "react";

import {
  readThemePreference,
  type ThemePreference,
  writeThemePreference,
  THEME_PREFERENCE_EVENT,
} from "@/components/ui/theme-preferences";

function getLabel(preference: ThemePreference) {
  return preference === "dark" ? "Escuro fixo" : "Seguir sistema";
}

export function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>("system");

  useEffect(() => {
    const syncPreference = () => setPreference(readThemePreference());

    syncPreference();
    window.addEventListener(THEME_PREFERENCE_EVENT, syncPreference as EventListener);
    window.addEventListener("storage", syncPreference);

    return () => {
      window.removeEventListener(THEME_PREFERENCE_EVENT, syncPreference as EventListener);
      window.removeEventListener("storage", syncPreference);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => writeThemePreference(preference === "dark" ? "system" : "dark")}
      className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/68 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
      aria-label={`Tema atual: ${getLabel(preference)}. Alternar preferência de tema.`}
    >
      <span aria-hidden="true" className="text-sm">
        {preference === "dark" ? "☾" : "◐"}
      </span>
      {getLabel(preference)}
    </button>
  );
}