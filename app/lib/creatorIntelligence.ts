type Creator = {
  id: string;
  name: string;
  category?: string;
  followers?: number;
  engagementRate?: number;
  pastBrandScore?: number;
};

/* =========================
   CORE SCORING ENGINE
========================= */
export function getCreatorScore(creator: Creator) {
  const followers = creator.followers ?? 1000;
  const engagement = creator.engagementRate ?? 0.05;
  const brandHistory = creator.pastBrandScore ?? 50;

  const followerScore = Math.min(40, Math.log10(followers + 10) * 6);
  const engagementScore = Math.min(40, engagement * 400);
  const historyScore = Math.min(20, (brandHistory / 100) * 20);

  const finalScore =
    followerScore +
    engagementScore +
    historyScore;

  return Math.round(Math.max(0, Math.min(100, finalScore)));
}

/* =========================
   LABEL SYSTEM (NO EMOJIS)
========================= */
export function getCreatorLabel(score: number) {
  if (score >= 80) return "High Performer";
  if (score >= 50) return "Mid Tier";
  if (score >= 25) return "Emerging";
  return "New Creator";
}

/* =========================
   COLOR SYSTEM
========================= */
export function getCreatorColor(score: number) {
  return "#3b82f6";
}

/* =========================
   STAR SYSTEM (CLEAN)
========================= */
export function getCreatorStars(score: number) {
  const s = Math.max(0, Math.min(100, Number(score) || 0));
  const rawStars = (s / 100) * 5;

  const stars = Math.max(1, Math.ceil(rawStars));

  return Array.from({ length: 5 })
    .map((_, i) => (i < stars ? "★" : "☆"))
    .join("");
}

/* =========================
   NORMALIZER
========================= */
export function normalizeCreator(creator: Creator) {
  const score = getCreatorScore(creator);

  return {
    ...creator,
    score,
    label: getCreatorLabel(score),
    color: getCreatorColor(score),
    stars: getCreatorStars(score),
  };
}