"use client";

import { useSyncExternalStore } from "react";

let nowSnapshot = 0;
let timerId: number | undefined;
const nowListeners = new Set<() => void>();

function tickNow() {
  nowSnapshot = Date.now();
  nowListeners.forEach((listener) => listener());
}

function subscribeNow(listener: () => void) {
  nowListeners.add(listener);
  if (nowListeners.size === 1) {
    tickNow();
    timerId = window.setInterval(tickNow, 1000);
  }

  return () => {
    nowListeners.delete(listener);
    if (nowListeners.size === 0 && timerId !== undefined) {
      window.clearInterval(timerId);
      timerId = undefined;
      nowSnapshot = 0;
    }
  };
}

export function useHydrated() {
  return useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
}

export function useNow() {
  return useSyncExternalStore(subscribeNow, () => nowSnapshot, () => 0);
}
