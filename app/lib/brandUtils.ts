/* -----------------------------
   NORMALISE BRAND ID
------------------------------*/
export function normalizeBrandId(id: string) {
  return id?.toLowerCase()?.trim();
}

/* -----------------------------
   BRAND LOOKUP (TEMPORARY LOCAL SOURCE)
   NOTE: This will be replaced by brandUniverse.ts integration
------------------------------*/
const fallbackBrands = [
  {
    id: "netflix",
    name: "Netflix",
    description: "Global streaming platform producing original films and series.",
    category: "Entertainment",
    demandScore: 92,
    status: "active",
    budgetRange: "$300 - $800",
    creatorFit: "Film & TV creators",
  },
  {
    id: "nike",
    name: "Nike",
    description: "Leading global sportswear and performance brand.",
    category: "Fitness & Lifestyle",
    demandScore: 88,
    status: "active",
    budgetRange: "$200 - $1000",
    creatorFit: "Fitness & lifestyle creators",
  },
  {
    id: "spotify",
    name: "Spotify",
    description: "Digital music streaming service connecting artists and listeners.",
    category: "Music",
    demandScore: 85,
    status: "active",
    budgetRange: "$150 - $600",
    creatorFit: "Music creators",
  },
];

/* -----------------------------
   GET ALL BRANDS (SAFE SOURCE)
   NOW DERIVED FROM SINGLE PLACE
------------------------------*/
export function getAllBrands() {
  return fallbackBrands;
}

/* -----------------------------
   GET BRAND BY ID
------------------------------*/
export function getBrandById(id: string) {
  const normalizedId = normalizeBrandId(id);

  return fallbackBrands.find((b) => b.id === normalizedId);
}