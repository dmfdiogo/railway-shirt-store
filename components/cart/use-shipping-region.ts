"use client";

import { useSyncExternalStore } from "react";

import { DEFAULT_SHIPPING_REGION, resolveShippingOption, type ShippingRegionCode } from "@/lib/shipping";

export const SHIPPING_REGION_STORAGE_KEY = "beart-shipping-region";
const SHIPPING_REGION_EVENT = "beart-shipping-region-updated";

function normalizeShippingRegion(value?: string | null): ShippingRegionCode {
  return resolveShippingOption(value).code;
}

function readStoredShippingRegion(): ShippingRegionCode {
  if (typeof window === "undefined") {
    return DEFAULT_SHIPPING_REGION;
  }

  return normalizeShippingRegion(window.localStorage.getItem(SHIPPING_REGION_STORAGE_KEY));
}

function subscribeToStoredShippingRegion(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const handleStorage = (event: StorageEvent) => {
    if (!event.key || event.key === SHIPPING_REGION_STORAGE_KEY) {
      callback();
    }
  };
  const handleLocalUpdate = () => callback();

  window.addEventListener("storage", handleStorage);
  window.addEventListener(SHIPPING_REGION_EVENT, handleLocalUpdate);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(SHIPPING_REGION_EVENT, handleLocalUpdate);
  };
}

function writeStoredShippingRegion(region: ShippingRegionCode) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(SHIPPING_REGION_STORAGE_KEY, region);
  window.dispatchEvent(new Event(SHIPPING_REGION_EVENT));
}

export function clearStoredShippingRegion() {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(SHIPPING_REGION_STORAGE_KEY);
  window.dispatchEvent(new Event(SHIPPING_REGION_EVENT));
}

export function useShippingRegion() {
  const shippingRegion = useSyncExternalStore(
    subscribeToStoredShippingRegion,
    readStoredShippingRegion,
    () => DEFAULT_SHIPPING_REGION
  );

  const setShippingRegion = (value: string) => {
    const normalized = normalizeShippingRegion(value);
    writeStoredShippingRegion(normalized);
  };

  return {
    setShippingRegion,
    shippingOption: resolveShippingOption(shippingRegion),
    shippingRegion,
  };
}