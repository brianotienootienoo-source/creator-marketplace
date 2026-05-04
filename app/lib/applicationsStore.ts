export type Application = {
  id: string;
  brandId: string;
  creatorId: string;
  message: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: number;
};

const store: Application[] = [];

/**
 * Add a new application
 */
export function addApplication(app: Omit<Application, "id" | "status" | "createdAt">) {
  const newApp: Application = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    status: "pending",
    createdAt: Date.now(),
    ...app,
  };

  store.push(newApp);
  return newApp;
}

/**
 * Get applications for a brand
 */
export function getApplicationsByBrand(brandId: string) {
  return store
    .filter((a) => a.brandId === brandId)
    .sort((a, b) => b.createdAt - a.createdAt);
}