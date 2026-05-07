"use client";

import { useEffect } from "react";

import { clearStoredShippingRegion } from "@/components/cart/use-shipping-region";
import { clearCart } from "@/components/cart/use-cart";

export function CartSuccessReset() {
  useEffect(() => {
    clearCart();
    clearStoredShippingRegion();
  }, []);

  return null;
}