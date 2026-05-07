// app/lib/applicationsStore.ts

import { normalizeBrandId } from "./brandUtils";

export type Application = {
  id: string;
  brandId: string;
  creatorId: string;
  status: "pending" | "approved" | "rejected";
};

// 🧠 MOCK APPLICATION DATA (foundation layer)
export const applications: Application[] = [
  {
    id: "app-1",
    brandId: "netflix",
    creatorId: "creator-1",
    status: "pending",
  },
  {
    id: "app-2",
    brandId: "nike",
    creatorId: "creator-2",
    status: "approved",
  },
  {
    id: "app-3",
    brandId: "spotify",
    creatorId: "creator-3",
    status: "pending",
  },
];

// 🧠 GET APPLICATIONS FOR A BRAND
export function getApplicationsByBrand(brandId: string) {
  const id = normalizeBrandId(brandId);
  return applications.filter((a) => a.brandId === id);
}

// 🧠 GET APPLICATION STATS FOR A BRAND
export function getBrandApplicationStats(brandId: string) {
  const apps = getApplicationsByBrand(brandId);

  return {
    totalApplications: apps.length,
    pending: apps.filter((a) => a.status === "pending").length,
    approved: apps.filter((a) => a.status === "approved").length,
    rejected: apps.filter((a) => a.status === "rejected").length,
  };
}