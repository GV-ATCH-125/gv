"use client";

import AyvensMapsToggleIcon from "@/components/functionality/ayvens-maps-toggle";

type Props = {
  open: boolean;
  onToggle: () => void;
};

/** Tab attached to the right edge of the sidebar; slides together with it. */
export default function AyvensMapsToggle({ open, onToggle }: Props) {
  const label = open ? "Hide sidebar" : "Show sidebar";
  return (
    <button
      type="button"
      className="sidebar-toggle"
      onClick={onToggle}
      aria-label={label}
      aria-expanded={open}
      title={label}
    >
      <AyvensMapsToggleIcon open={open} />
    </button>
  );
}
