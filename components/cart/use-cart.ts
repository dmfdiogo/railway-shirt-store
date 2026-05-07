"use client";

import { useSyncExternalStore } from "react";

export type CartItem = {
  priceId: string;
  slug: string;
  productName: string;
  variantLabel: string;
  image: string | null;
  currency: string;
  unitAmount: number;
  quantity: number;
  size?: string;
};

type CartItemInput = Omit<CartItem, "quantity"> & {
  quantity?: number;
};

const CART_STORAGE_KEY = "beart-cart";
const CART_EVENT = "beart-cart-updated";
const EMPTY_CART: CartItem[] = [];
let cachedCartItems: CartItem[] = EMPTY_CART;
let cachedCartRaw = "[]";

function isBrowser() {
  return typeof window !== "undefined";
}

function sanitizeCartItem(value: unknown): CartItem | null {
  if (!value || typeof value !== "object") return null;

  const candidate = value as Partial<CartItem>;
  if (
    typeof candidate.priceId !== "string" ||
    typeof candidate.slug !== "string" ||
    typeof candidate.productName !== "string" ||
    typeof candidate.variantLabel !== "string" ||
    typeof candidate.currency !== "string" ||
    typeof candidate.unitAmount !== "number"
  ) {
    return null;
  }

  return {
    priceId: candidate.priceId,
    slug: candidate.slug,
    productName: candidate.productName,
    variantLabel: candidate.variantLabel,
    image: typeof candidate.image === "string" ? candidate.image : null,
    currency: candidate.currency,
    unitAmount: candidate.unitAmount,
    quantity:
      typeof candidate.quantity === "number" && candidate.quantity > 0
        ? Math.floor(candidate.quantity)
        : 1,
    size: typeof candidate.size === "string" ? candidate.size : undefined,
  };
}

function readCartSnapshot(): CartItem[] {
  if (!isBrowser()) return [];

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY) ?? "[]";
    if (raw === cachedCartRaw) {
      return cachedCartItems;
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      cachedCartItems = EMPTY_CART;
      cachedCartRaw = "[]";
      return cachedCartItems;
    }

    cachedCartItems = parsed.map(sanitizeCartItem).filter(Boolean) as CartItem[];
    cachedCartRaw = raw;
    return cachedCartItems;
  } catch {
    cachedCartItems = EMPTY_CART;
    cachedCartRaw = "[]";
    return cachedCartItems;
  }
}

function writeCartSnapshot(items: CartItem[]) {
  if (!isBrowser()) return;

  cachedCartItems = items;
  cachedCartRaw = JSON.stringify(items);
  window.localStorage.setItem(CART_STORAGE_KEY, cachedCartRaw);
  window.dispatchEvent(new Event(CART_EVENT));
}

function subscribe(callback: () => void) {
  if (!isBrowser()) return () => {};

  const handleStorage = (event: StorageEvent) => {
    if (!event.key || event.key === CART_STORAGE_KEY) {
      callback();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(CART_EVENT, callback);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(CART_EVENT, callback);
  };
}

export function addCartItem(item: CartItemInput) {
  const items = readCartSnapshot();
  const quantity = item.quantity && item.quantity > 0 ? Math.floor(item.quantity) : 1;
  const existingIndex = items.findIndex((entry) => entry.priceId === item.priceId);

  if (existingIndex >= 0) {
    const existing = items[existingIndex];
    items[existingIndex] = {
      ...existing,
      quantity: existing.quantity + quantity,
      image: existing.image ?? item.image,
    };
  } else {
    items.push({
      ...item,
      image: item.image ?? null,
      quantity,
    });
  }

  writeCartSnapshot(items);
}

export function removeCartItem(priceId: string) {
  writeCartSnapshot(readCartSnapshot().filter((item) => item.priceId !== priceId));
}

export function updateCartItemQuantity(priceId: string, quantity: number) {
  if (quantity <= 0) {
    removeCartItem(priceId);
    return;
  }

  writeCartSnapshot(
    readCartSnapshot().map((item) =>
      item.priceId === priceId ? { ...item, quantity: Math.floor(quantity) } : item
    )
  );
}

export function clearCart() {
  writeCartSnapshot([]);
}

export function getCartCount(items: CartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function getCartSubtotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.unitAmount * item.quantity, 0);
}

export function useCart() {
  const items = useSyncExternalStore(subscribe, readCartSnapshot, () => EMPTY_CART);

  return {
    items,
    count: getCartCount(items),
    subtotal: getCartSubtotal(items),
    addItem: addCartItem,
    removeItem: removeCartItem,
    updateQuantity: updateCartItemQuantity,
    clear: clearCart,
  };
}