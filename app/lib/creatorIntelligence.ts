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

  const followerScore = Math.log10(followers + 10) * 20;
  const engagementScore = engagement * 120;
  const historyScore = (brandHistory / 100) * 40;

  return Math.round(followerScore + engagementScore + historyScore);
}

/* =========================
   LABEL SYSTEM
========================= */
export function getCreatorLabel(score: number) {
  if (score >= 120) return "Elite Creator";
  if (score >= 80) return "High Performer";
  if (score >= 50) return "Mid Tier";
  if (score >= 25) return "Emerging";
  return "New Creator";
}

/* =========================
   GLOBAL COLOR (SINGLE SOURCE OF TRUTH)
========================= */
export function getCreatorColor(score: number) {
  return "#3b82f6";
}

/* =========================
   ⭐ GLOBAL STAR SYSTEM (FIXED + CONSISTENT)
   - prevents empty stars
   - same logic everywhere (brand page, homepage, live feed)
========================= */
export function getCreatorStars(score: number) {
  const s = Math.max(0, Math.min(100, Number(score) || 0));

  const rawStars = (s / 100) * 5;

  // IMPORTANT FIX: ensures minimum 1 star always shows
  const stars = Math.max(1, Math.ceil(rawStars));

  return Array.from({ length: 5 })
    .map((_, i) => (i < stars ? "★" : "☆"))
    .join("");
}

/* =========================
   OPTIONAL: NORMALIZER (USED ACROSS APP)
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