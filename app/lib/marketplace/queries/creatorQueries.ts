import { mockCreators } from "@/app/lib/marketplace/mock/mockCreators";

/**
 * 🧠 SINGLE SOURCE QUERY LAYER (7.5 FOUNDATION)
 * No UI changes yet — just safe abstraction layer
 */

export function getAllCreators() {
  return mockCreators;
}

export function getHomeCreators() {
  return mockCreators.slice(0, 4);
}

export function getCreatorsForBrand(brand: string) {
  if (brand.toLowerCase() === "spotify") {
    return mockCreators.filter((c) =>
      c.niche?.toLowerCase().includes("music") ||
      c.niche?.toLowerCase().includes("entertainment")
    );
  }

  return mockCreators.slice(0, 3);
}