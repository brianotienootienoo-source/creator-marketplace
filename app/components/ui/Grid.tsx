import React from "react";
import { layout } from "@/app/lib/designTokens";

type Props = {
  children: React.ReactNode;
  min?: number;
  style?: React.CSSProperties;
};

export default function Grid({ children, min = 220, style }: Props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fill, minmax(${min}px, 1fr))`,
        gap: layout.gridGap,
        ...style,
      }}
    >
      {children}
    </div>
  );
}