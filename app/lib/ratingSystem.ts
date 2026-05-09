type Rating = {
  stars: number;
  label: string;
  color: string;
};

/* =========================
   VISUAL RATING SYSTEM (TUNED)
   - wider spread for better differentiation
========================= */

export function getCreatorRating(score: number): Rating {
  const s = Math.max(0, Math.min(100, Number(score) || 0));

  let stars = 1;
  let label = "New Creator";
  let color = "#3b82f6";

  if (s >= 81) {
    stars = 5;
    label = "Elite Creator";
    color = "#2563eb";
  } else if (s >= 66) {
    stars = 4;
    label = "High Performer";
    color = "#16a34a";
  } else if (s >= 46) {
    stars = 3;
    label = "Mid Tier";
    color = "#f59e0b";
  } else if (s >= 26) {
    stars = 2;
    label = "Emerging";
    color = "#f97316";
  } else {
    stars = 1;
    label = "New Creator";
    color = "#92400e";
  }

  return { stars, label, color };
}

/* =========================
   STAR OUTPUT
========================= */

export function getStars(score: number) {
  const { stars } = getCreatorRating(score);

  return Array.from({ length: 5 })
    .map((_, i) => (i < stars ? "★" : "☆"))
    .join("");
}

/* =========================
   COLOR ONLY
========================= */

export function getColor(score: number) {
  return getCreatorRating(score).color;
}

/* =========================
   LABEL ONLY
========================= */

export function getLabel(score: number) {
  return getCreatorRating(score).label;
}