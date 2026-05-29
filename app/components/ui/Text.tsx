import React from "react";

import { typography, surfaces } from "@/app/lib/designTokens";

type Props = {
  children: React.ReactNode;

  size?: "xs" | "sm" | "base" | "md" | "lg" | "xl" | "2xl";
  weight?: 400 | 500 | 600 | 700;
  color?: string;
  muted?: boolean;
  style?: React.CSSProperties;
};

export default function Text({
  children,
  size = "base",
  weight = 400,
  color,
  muted = false,
  style,
}: Props) {
  return (
    <p
      style={{
        margin: 0,
        fontSize: typography.fontSize[size],
        fontWeight: weight,
        lineHeight: typography.lineHeight.relaxed,
        color: color || (muted ? surfaces.muted : surfaces.text),
        ...style,
      }}
    >
      {children}
    </p>
  );
}