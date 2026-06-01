import { db } from "../core/db";

/**
 * 🧪 A2 SIMULATION LAYER
 * Injects synthetic proposals for intelligence testing only
 */

export function seedProposalSimulation() {
  // Prevent duplicate seeding in dev hot reload
  if (db.proposals.length > 0) return;

  const now = Date.now();

  db.proposals.push(
    {
      id: "p1",
      creatorId: "creator-1",
      opportunityId: "campaign-1",
      status: "pending",
      createdAt: new Date(now - 1000 * 60 * 60 * 24).toISOString(),
    },
    {
      id: "p2",
      creatorId: "creator-1",
      opportunityId: "campaign-2",
      status: "accepted",
      createdAt: new Date(now - 1000 * 60 * 60 * 48).toISOString(),
    },
    {
      id: "p3",
      creatorId: "creator-1",
      opportunityId: "campaign-3",
      status: "rejected",
      createdAt: new Date(now - 1000 * 60 * 60 * 72).toISOString(),
    }
  );
}