"use client";

import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  hover?: boolean;
  lift?: boolean;
};

export default function CardShell({
  children,
  className,
  style,
  hover = true,
  lift = false,
}: Props) {
  return (
    <div
      className={className}
      style={{
        padding: 16,
        border: "1px solid #e5e7eb",
        borderRadius: 14,
        background: "#fff",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",

        ...(hover && { cursor: "pointer" }),

        ...(lift && hover && {
          transform: "translateY(-2px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        }),

        ...style,
      }}
    >
      {children}
    </div>
  );
}