"use client";

import { useEffect, useEffectEvent, useState } from "react";

import type { CheckoutShippingOption } from "@/lib/shipping";

export type ShippingQuoteLineInput = {
  priceId: string;
  quantity: number;
};

export const SHIPPING_POSTAL_CODE_STORAGE_KEY = "beart-shipping-postal-code";

function normalizePostalCode(value: string) {
  return value.replace(/\D/g, "").slice(0, 8);
}

function readStoredPostalCode() {
  if (typeof window === "undefined") return "";

  return normalizePostalCode(window.localStorage.getItem(SHIPPING_POSTAL_CODE_STORAGE_KEY) ?? "");
}

function writeStoredPostalCode(postalCode: string) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(SHIPPING_POSTAL_CODE_STORAGE_KEY, postalCode);
}

export function clearStoredShippingPostalCode() {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(SHIPPING_POSTAL_CODE_STORAGE_KEY);
}

export function useShippingQuote(lines: ShippingQuoteLineInput[]) {
  const [postalCode, setPostalCodeState] = useState("");
  const [quotes, setQuotes] = useState<CheckoutShippingOption[]>([]);
  const [selectedQuoteCode, setSelectedQuoteCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [integrationAvailable, setIntegrationAvailable] = useState(true);

  const normalizedPostalCode = normalizePostalCode(postalCode);
  const requestSignature = JSON.stringify(lines);

  useEffect(() => {
    setPostalCodeState(readStoredPostalCode());

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== SHIPPING_POSTAL_CODE_STORAGE_KEY) return;
      setPostalCodeState(normalizePostalCode(event.newValue ?? ""));
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const requestQuotes = useEffectEvent(async (destinationPostalCode: string, nextLines: ShippingQuoteLineInput[]) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/shipping/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: nextLines,
          toPostalCode: destinationPostalCode,
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

      const nextQuotes = Array.isArray(payload.quotes) ? payload.quotes : [];

      setIntegrationAvailable(payload.integrationAvailable ?? true);
      setQuoteError(payload.fallbackReason ?? null);
      setQuotes(nextQuotes);
      setSelectedQuoteCode((current) =>
        nextQuotes.some((quote) => quote.code === current) ? current : nextQuotes[0]?.code ?? null
      );
    } catch (error) {
      setIntegrationAvailable(true);
      setQuoteError(error instanceof Error ? error.message : "Nao foi possivel calcular o frete.");
      setQuotes([]);
      setSelectedQuoteCode(null);
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    if (normalizedPostalCode.length !== 8 || lines.length === 0) {
      setIsLoading(false);
      setQuoteError(null);
      setQuotes([]);
      setSelectedQuoteCode(null);
      return;
    }

    void requestQuotes(normalizedPostalCode, lines);
  }, [normalizedPostalCode, requestQuotes, requestSignature, lines]);

  const setPostalCode = (value: string) => {
    const normalized = normalizePostalCode(value);
    setPostalCodeState(normalized);
    writeStoredPostalCode(normalized);
  };

  return {
    integrationAvailable,
    isLoading,
    postalCode,
    quoteError,
    quotes,
    selectedQuote: quotes.find((quote) => quote.code === selectedQuoteCode) ?? null,
    selectQuote: setSelectedQuoteCode,
    setPostalCode,
  };
}