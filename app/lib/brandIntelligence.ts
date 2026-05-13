import { getMatches } from "@/app/lib/matchEngine";
import { getBrandUniverse } from "@/app/lib/brandUniverse";

/**
 * BRAND INTELLIGENCE ENGINE (FULL CONTRACT LOCK)
 */
export function getBrandIntelligence(brandId: string) {
  const normalizedId =
    brandId?.toLowerCase?.()?.trim() ?? "";

  const matches = getMatches();
  const brands = getBrandUniverse();

  const targetBrand = brands.find(
    (b) => b.id?.toLowerCase?.()?.trim?.() === normalizedId
  );

  /**
   * 🔒 CONTRACT RULE:
   * matchEngine returns FLAT STRUCTURE ONLY
   */
  const safeMatches = matches.filter((m) => {
    if (!m) return false;

    const matchBrandId =
      m?.brandId?.toLowerCase?.()?.trim?.();

    return matchBrandId === normalizedId;
  });

  const totalMatches = safeMatches.length;

  const avgScore =
    totalMatches > 0
      ? safeMatches.reduce(
          (acc, m) => acc + (m?.score ?? 0),
          0
        ) / totalMatches
      : 0;

  const baseDemand = targetBrand?.demandScore ?? 0;

  const demandScore =
    baseDemand + totalMatches * 3;

  return {
    brandId: normalizedId,
    totalMatches,
    avgScore: Math.round(avgScore),
    demandScore: Math.round(demandScore),
    topMatches: safeMatches.slice(0, 5),
  };
}