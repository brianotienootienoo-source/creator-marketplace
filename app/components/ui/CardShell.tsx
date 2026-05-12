"use client";

import React from "react";
import { radius, spacing } from "@/app/lib/designTokens";

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  hover?: boolean;
  lift?: boolean;

  // NEW: layout control (ONLY affects marketplace grids)
  compact?: boolean;
};

export default function CardShell({
  children,
  className,
  style,
  hover = true,
  lift = false,
  compact = false,
}: Props) {
  return (
    <div
      className={className}
      style={{
        padding: spacing?.md ?? 12,
        border: "1px solid #e5e7eb",
        borderRadius: radius?.md ?? 12,
        background: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",

        transition: "transform 0.18s ease, box-shadow 0.18s ease",
        cursor: hover ? "pointer" : "default",

        overflow: "hidden",

        // 🔥 KEY FIX: prevents elongated cards in grid layouts
        width: "100%",
        maxWidth: compact ? 280 : "100%",

        ...style,
      }}
    >
      {children}
    </div>
  );
}