"use client";

import { ReactNode, useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Drawer({ open, onClose, children }: Props) {
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* PANEL */}
      <div
        className="
          absolute right-0 top-0 h-full w-full max-w-xl
          bg-white shadow-2xl
          flex flex-col
        "
      >
        {/* HEADER STRIP */}
        <div className="flex items-center justify-between border-b border-[#e5e7eb] px-5 py-4">
          <p className="text-sm font-semibold text-black">
            Preview
          </p>

          <button
            onClick={onClose}
            className="text-sm text-neutral-500 hover:text-black"
          >
            Close
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-5">
          {children}
        </div>
      </div>
    </div>
  );
}