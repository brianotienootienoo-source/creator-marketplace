import type { BrandContract } from "@/app/lib/contracts/brandContracts";
import { getBrandUniverse } from "@/app/lib/brandUniverse";

/* -----------------------------
   NORMALISE BRAND ID
------------------------------*/
export function normalizeBrandId(id?: string): string {
  if (typeof id !== "string") return "";
  return id.toLowerCase().trim();
}

/* -----------------------------
   GET ALL BRANDS
   🔒 SINGLE SOURCE OF TRUTH
------------------------------*/
export function getAllBrands(): BrandContract[] {
  return getBrandUniverse();
}

/* -----------------------------
   GET BRAND BY ID
------------------------------*/
export function getBrandById(
  id?: string
): BrandContract | undefined {
  const normalizedId = normalizeBrandId(id);

  if (!normalizedId) return undefined;

  const brands = getBrandUniverse();

  return brands.find((b) => {
    const brandId = normalizeBrandId(b?.id);
    return brandId === normalizedId;
  });
}