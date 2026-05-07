"use client";

import { useEffect } from "react";

import {
  applyThemePreference,
  readThemePreference,
  THEME_PREFERENCE_EVENT,
} from "@/components/ui/theme-preferences";

export function ThemeController() {
  useEffect(() => {
    const updateTheme = () => applyThemePreference(readThemePreference());
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    updateTheme();

    window.addEventListener(THEME_PREFERENCE_EVENT, updateTheme as EventListener);
    window.addEventListener("storage", updateTheme);
    mediaQuery.addEventListener("change", updateTheme);

    return () => {
      window.removeEventListener(THEME_PREFERENCE_EVENT, updateTheme as EventListener);
      window.removeEventListener("storage", updateTheme);
      mediaQuery.removeEventListener("change", updateTheme);
    };
  }, []);

  return null;
}