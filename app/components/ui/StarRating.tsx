"use client";

import React from "react";

/* -----------------------------
   GLOBAL STAR RENDERER
   - used everywhere (brand page, homepage, live creators)
   - ensures consistency across entire app
------------------------------*/

type Props = {
  score: number;
};

export default function StarRating({ score }: Props) {
  const s = Math.max(0, Math.min(100, Number(score) || 0));

  const stars = Math.ceil((s / 100) * 5);

  const getColor = (value: number) => {
    if (value >= 80) return "#3b82f6"; // BLUE = viral
    if (value >= 60) return "#22c55e"; // GREEN = high
    if (value >= 40) return "#facc15"; // YELLOW = medium (cleaner gold)
    return "#8B5A2B"; // DARK BROWN = low
  };

  const color = getColor(s);

  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          style={{
            color: i < stars ? color : "#e5e7eb",
            fontSize: 14,
          }}
        >
          ★
        </span>
      ))}
    </span>
  );
}