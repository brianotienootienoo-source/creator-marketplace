import { getMatches } from "@/app/lib/matchEngine";
import { getBrandUniverse } from "@/app/lib/brandUniverse";

/* -----------------------------
   SAFE BRAND INTELLIGENCE ENGINE
------------------------------*/
export function getBrandIntelligence(brandId: string) {
  const normalizedId = brandId?.toLowerCase?.()?.trim();

  const matches = getMatches();
  const brands = getBrandUniverse();

  const targetBrand = brands.find(
    (b) => b.id?.toLowerCase?.() === normalizedId
  );

  // 🛡 SAFE GUARD: prevent runtime crash
  const safeMatches = matches.filter((m) => {
    if (!m) return false;

    // case 1: new structure (flattened / safe)
    if (m.brandId) {
      return m.brandId?.toLowerCase?.() === normalizedId;
    }

    // case 2: legacy structure (nested brand object)
    if (m.brand?.id) {
      return m.brand.id?.toLowerCase?.() === normalizedId;
    }

    return false;
  });

  const totalMatches = safeMatches.length;

  const avgScore =
    totalMatches === 0
      ? 0
      : safeMatches.reduce((acc, m) => acc + (m.score ?? 0), 0) /
        totalMatches;

  const demandScore = targetBrand
    ? (targetBrand.demandScore ?? 0) + totalMatches * 3
    : totalMatches * 2;

  return {
    brandId: normalizedId,
    totalMatches,
    avgScore: Math.round(avgScore),
    demandScore: Math.round(demandScore),
    topMatches: safeMatches.slice(0, 5),
  };
}