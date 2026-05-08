"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

import type { CheckoutShippingOption } from "@/lib/shipping";

export type ShippingQuoteLineInput = {
  priceId: string;
  quantity: number;
};

export const SHIPPING_POSTAL_CODE_STORAGE_KEY = "beart-shipping-postal-code";
const SHIPPING_POSTAL_CODE_EVENT = "beart-shipping-postal-code-updated";

function normalizePostalCode(value: string) {
  return value.replace(/\D/g, "").slice(0, 8);
}

function readStoredPostalCode() {
  if (typeof window === "undefined") return "";

  return normalizePostalCode(window.localStorage.getItem(SHIPPING_POSTAL_CODE_STORAGE_KEY) ?? "");
}

function subscribeToStoredPostalCode(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const handleStorage = (event: StorageEvent) => {
    if (!event.key || event.key === SHIPPING_POSTAL_CODE_STORAGE_KEY) {
      callback();
    }
  };
  const handleLocalUpdate = () => callback();

  window.addEventListener("storage", handleStorage);
  window.addEventListener(SHIPPING_POSTAL_CODE_EVENT, handleLocalUpdate);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(SHIPPING_POSTAL_CODE_EVENT, handleLocalUpdate);
  };
}

function writeStoredPostalCode(postalCode: string) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(SHIPPING_POSTAL_CODE_STORAGE_KEY, postalCode);
  window.dispatchEvent(new Event(SHIPPING_POSTAL_CODE_EVENT));
}

export function clearStoredShippingPostalCode() {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(SHIPPING_POSTAL_CODE_STORAGE_KEY);
  window.dispatchEvent(new Event(SHIPPING_POSTAL_CODE_EVENT));
}

export function useShippingQuote(
  lines: ShippingQuoteLineInput[],
  fallbackShippingRegion: string,
) {
  const [quotes, setQuotes] = useState<CheckoutShippingOption[]>([]);
  const [quoteSignature, setQuoteSignature] = useState<string | null>(null);
  const [selectedQuoteCode, setSelectedQuoteCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [integrationAvailable, setIntegrationAvailable] = useState(true);
  const postalCode = useSyncExternalStore(subscribeToStoredPostalCode, readStoredPostalCode, () => "");

  const normalizedPostalCode = normalizePostalCode(postalCode);
  const requestSignature = JSON.stringify(lines);
  const activeQuoteSignature = `${normalizedPostalCode}:${fallbackShippingRegion}:${requestSignature}`;
  const canQuote = normalizedPostalCode.length === 8 && lines.length > 0;
  const hasFreshQuoteState = canQuote && quoteSignature === activeQuoteSignature;

  useEffect(() => {
    if (!canQuote) {
      return;
    }

    let cancelled = false;
    const nextLines = JSON.parse(requestSignature) as ShippingQuoteLineInput[];

    const requestQuotes = async () => {
      setIsLoading(true);
      setQuoteSignature(null);

      try {
        const response = await fetch("/api/shipping/quote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fallbackShippingRegion,
            items: nextLines,
            toPostalCode: normalizedPostalCode,
          }),
        });

        const payload = (await response.json()) as {
          error?: string;
          fallbackReason?: string | null;
          integrationAvailable?: boolean;
          quotes?: CheckoutShippingOption[];
        };

        if (!response.ok) {
          throw new Error(payload.error ?? "Nao foi possivel calcular o frete.");
        }

        if (cancelled) return;

        const nextQuotes = Array.isArray(payload.quotes) ? payload.quotes : [];

        setIntegrationAvailable(payload.integrationAvailable ?? true);
        setQuoteError(payload.fallbackReason ?? null);
        setQuotes(nextQuotes);
        setQuoteSignature(activeQuoteSignature);
        setSelectedQuoteCode((current) =>
          nextQuotes.some((quote) => quote.code === current) ? current : nextQuotes[0]?.code ?? null
        );
      } catch (error) {
        if (cancelled) return;

        setIntegrationAvailable(true);
        setQuoteError(error instanceof Error ? error.message : "Nao foi possivel calcular o frete.");
        setQuotes([]);
        setQuoteSignature(activeQuoteSignature);
        setSelectedQuoteCode(null);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void requestQuotes();

    return () => {
      cancelled = true;
    };
  }, [activeQuoteSignature, canQuote, fallbackShippingRegion, normalizedPostalCode, requestSignature]);

  const setPostalCode = (value: string) => {
    const normalized = normalizePostalCode(value);
    writeStoredPostalCode(normalized);
  };

  return {
    integrationAvailable: hasFreshQuoteState ? integrationAvailable : true,
    isLoading: canQuote ? isLoading : false,
    postalCode,
    quoteError: hasFreshQuoteState ? quoteError : null,
    quotes: hasFreshQuoteState ? quotes : [],
    selectedQuote:
      hasFreshQuoteState ? quotes.find((quote) => quote.code === selectedQuoteCode) ?? null : null,
    selectQuote: setSelectedQuoteCode,
    setPostalCode,
  };
}