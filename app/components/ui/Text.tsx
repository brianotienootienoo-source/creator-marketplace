import React from "react";

type Props = {
  children: React.ReactNode;
  size?: 12 | 13 | 14 | 16 | 20 | 24 | 32;
  weight?: 400 | 500 | 600 | 700 | 800;
  color?: string;
  style?: React.CSSProperties;
};

export default function Text({
  children,
  size = 14,
  weight = 400,
  color = "#111",
  style,
}: Props) {
  return (
    <p
      style={{
        fontSize: size,
        fontWeight: weight,
        color,
        margin: 0,
        ...style,
      }}
    >
      {children}
    </p>
  );
}