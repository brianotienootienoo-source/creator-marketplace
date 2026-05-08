import React from "react";
import { spacing } from "@/app/lib/designTokens";

type Props = {
  children: React.ReactNode;
  gap?: keyof typeof spacing;
  style?: React.CSSProperties;
};

export default function Stack({ children, gap = "md", style }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: spacing[gap],
        ...style,
      }}
    >
      {children}
    </div>
  );
}