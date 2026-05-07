"use client";

export const THEME_PREFERENCE_STORAGE_KEY = "beart-theme-preference";
export const THEME_PREFERENCE_EVENT = "beart-theme-preference-updated";

export type ThemePreference = "system" | "dark";
export type ResolvedTheme = "dark" | "soft";

function getMediaQuery() {
  if (typeof window === "undefined") return null;
  return window.matchMedia("(prefers-color-scheme: dark)");
}

export function resolveThemePreference(preference: ThemePreference): ResolvedTheme {
  if (preference === "dark") {
    return "dark";
  }

  return getMediaQuery()?.matches ? "dark" : "soft";
}

export function readThemePreference(): ThemePreference {
  if (typeof window === "undefined") {
    return "system";
  }

  const stored = window.localStorage.getItem(THEME_PREFERENCE_STORAGE_KEY);
  return stored === "dark" ? "dark" : "system";
}

export function applyThemePreference(preference: ThemePreference) {
  if (typeof document === "undefined") return;

  const resolvedTheme = resolveThemePreference(preference);
  const root = document.documentElement;

  root.dataset.themePreference = preference;
  root.dataset.theme = resolvedTheme;
  root.style.colorScheme = resolvedTheme === "dark" ? "dark" : "light";
}

export function writeThemePreference(preference: ThemePreference) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(THEME_PREFERENCE_STORAGE_KEY, preference);
  applyThemePreference(preference);
  window.dispatchEvent(new CustomEvent(THEME_PREFERENCE_EVENT, { detail: preference }));
}