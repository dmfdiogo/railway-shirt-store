"use client";

import { useEffect, useSyncExternalStore } from "react";

type ToastTone = "neutral" | "success";

type ToastItem = {
  description?: string;
  id: string;
  title: string;
  tone: ToastTone;
};

type ToastInput = Omit<ToastItem, "id">;

const listeners = new Set<() => void>();
const EMPTY_TOASTS: ToastItem[] = [];
let toastQueue: ToastItem[] = [];

function emitToastChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return toastQueue;
}

export function pushToast(input: ToastInput) {
  if (typeof window === "undefined") return;

  const toast: ToastItem = {
    ...input,
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
  };

  toastQueue = [...toastQueue.slice(-2), toast];
  emitToastChange();

  window.setTimeout(() => {
    toastQueue = toastQueue.filter((entry) => entry.id !== toast.id);
    emitToastChange();
  }, 2800);
}

export function Toaster() {
  const toasts = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY_TOASTS);

  useEffect(() => undefined, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-[70] flex flex-col items-center gap-3 px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast-enter pointer-events-auto w-full max-w-sm rounded-[1.4rem] border px-4 py-3 shadow-[0_24px_60px_rgba(0,0,0,0.32)] backdrop-blur-2xl ${
            toast.tone === "success"
              ? "border-emerald-300/20 bg-emerald-500/10 text-emerald-50"
              : "border-white/12 bg-[linear-gradient(180deg,rgba(18,19,28,0.94),rgba(11,12,19,0.98))] text-white"
          }`}
        >
          <p className="text-sm font-semibold">{toast.title}</p>
          {toast.description ? <p className="mt-1 text-sm opacity-75">{toast.description}</p> : null}
        </div>
      ))}
    </div>
  );
}