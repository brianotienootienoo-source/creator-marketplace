"use client";

type Props = {
  score: number;
  color?: string;
};

export default function StarRating({ score, color = "#3b82f6" }: Props) {
  const s = Math.max(0, Math.min(100, Number(score) || 0));

  const stars = Math.max(1, Math.ceil((s / 100) * 5));

  return (
    <div style={{ display: "flex", gap: 2 }}>
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
    </div>
  );
}