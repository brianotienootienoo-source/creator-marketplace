import { getBrandOpportunities } from "@/app/lib/feed";

/* -----------------------------
   NORMALISE BRAND ID
------------------------------*/
export function normalizeBrandId(id: string) {
  return id?.toLowerCase()?.trim();
}

/* -----------------------------
   GET ALL BRANDS (CURRENT SOURCE)
------------------------------*/
export function getAllBrands() {
  return getBrandOpportunities();
}

/* -----------------------------
   GET BRAND BY ID
------------------------------*/
export function getBrandById(id: string) {
  const normalizedId = normalizeBrandId(id);

  return getBrandOpportunities().find(
    (b) => b.id === normalizedId
  );
}