"use client";

import { useCallback, useState } from "react";

/** Open/closed state for the sidebar. */
export function useAyvensMapsToggle(initialOpen = true) {
  const [open, setOpen] = useState(initialOpen);
  const toggle = useCallback(() => setOpen((o) => !o), []);
  return { open, setOpen, toggle };
}

/**
 * The animated triangle inside the toggle button.
 * Points left while the sidebar is open ("click to hide") and smoothly
 * turns to point right while it is closed ("click to show").
 */
export default function AyvensMapsToggleIcon({
  open,
  duration = 250,
}: {
  open: boolean;
  /** Animation length in ms. */
  duration?: number;
}) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="#000"
      aria-hidden="true"
      style={{
        transform: open ? "rotate(0deg)" : "rotate(180deg)",
        transition: `transform ${duration}ms ease`,
      }}
    >
      <polygon points="18 3 4 12 18 21" />
    </svg>
  );
}
