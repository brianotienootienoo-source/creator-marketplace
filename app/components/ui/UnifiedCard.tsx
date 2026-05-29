"use client";

import React from "react";
import { cardSystem } from "@/app/lib/design/cardSystem";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  compact?: boolean;
};

export default function UnifiedCard({ children, onClick, compact }: Props) {
  const height = compact
    ? cardSystem.height.compact
    : cardSystem.height.base;

  return (
    <div
      onClick={onClick}
      style={{
        width: "100%",
        minHeight: height,

        padding: cardSystem.padding,
        borderRadius: cardSystem.radius,

        background: "#fff",
        border: cardSystem.border,

        boxShadow: cardSystem.shadow.idle,

        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        cursor: onClick ? "pointer" : "default",

        transition: "transform 0.18s ease, box-shadow 0.18s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = `translateY(${cardSystem.motion.lift}px) scale(${cardSystem.motion.scale})`;
        el.style.boxShadow = cardSystem.shadow.hover;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(0px) scale(1)";
        el.style.boxShadow = cardSystem.shadow.idle;
      }}
    >
      {children}
    </div>
  );
}