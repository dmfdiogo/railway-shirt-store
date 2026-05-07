"use client";

import { useEffect, useState } from "react";

import { DEFAULT_SHIPPING_REGION, resolveShippingOption, type ShippingRegionCode } from "@/lib/shipping";

export const SHIPPING_REGION_STORAGE_KEY = "beart-shipping-region";

function normalizeShippingRegion(value?: string | null): ShippingRegionCode {
  return resolveShippingOption(value).code;
}

function readStoredShippingRegion(): ShippingRegionCode {
  if (typeof window === "undefined") {
    return DEFAULT_SHIPPING_REGION;
  }

  return normalizeShippingRegion(window.localStorage.getItem(SHIPPING_REGION_STORAGE_KEY));
}

function writeStoredShippingRegion(region: ShippingRegionCode) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(SHIPPING_REGION_STORAGE_KEY, region);
}

export function clearStoredShippingRegion() {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(SHIPPING_REGION_STORAGE_KEY);
}

export function useShippingRegion() {
  const [shippingRegion, setShippingRegionState] = useState<ShippingRegionCode>(DEFAULT_SHIPPING_REGION);

  useEffect(() => {
    setShippingRegionState(readStoredShippingRegion());

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== SHIPPING_REGION_STORAGE_KEY) return;
      setShippingRegionState(normalizeShippingRegion(event.newValue));
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const setShippingRegion = (value: string) => {
    const normalized = normalizeShippingRegion(value);
    setShippingRegionState(normalized);
    writeStoredShippingRegion(normalized);
  };

  return {
    setShippingRegion,
    shippingOption: resolveShippingOption(shippingRegion),
    shippingRegion,
  };
}