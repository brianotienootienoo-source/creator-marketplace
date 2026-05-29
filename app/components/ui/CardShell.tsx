"use client";

import React from "react";
import { radius, spacing, surfaces } from "@/app/lib/designTokens";

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  compact?: boolean;
};

export default function CardShell({
  children,
  className,
  style,
  compact = false,
}: Props) {
  return (
    <div
      className={className}
      style={{
        padding: spacing.md,
        border: `1px solid ${surfaces.border}`,
        borderRadius: radius.md,
        background: surfaces.card,
        boxShadow: surfaces.shadowSoft,

        width: "100%",
        maxWidth: compact ? 280 : "100%",

        overflow: "hidden",

        ...style,
      }}
    >
      {children}
    </div>
  );
}