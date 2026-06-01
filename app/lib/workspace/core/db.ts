import { Proposal } from "../proposals/proposalSchema";
import { Opportunity } from "../opportunities/opportunitySchema";

type DB = {
  proposals: Proposal[];
  opportunities: Opportunity[];s
};

/**
 * 🧪 SEED DATA (C2 ACTIVATION LAYER)
 * This is temporary test data to activate A2 intelligence pipeline
 */

export const db: DB = {
  proposals: [
    {
      id: "p1",
      creatorId: "creator-1",
      opportunityId: "campaign-1",
      status: "pending",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      matchScore: 82,
      creator: {
        id: "creator-1",
        category: "Music",
        followers: 12000,
        engagementRate: 0.065,
        pastBrandScore: 35,
      },
    },
    {
      id: "p2",
      creatorId: "creator-1",
      opportunityId: "campaign-2",
      status: "viewed",
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      matchScore: 65,
      creator: {
        id: "creator-1",
        category: "Music",
        followers: 12000,
        engagementRate: 0.065,
        pastBrandScore: 35,
      },
    },
    {
      id: "p3",
      creatorId: "creator-1",
      opportunityId: "campaign-3",
      status: "accepted",
      createdAt: new Date(Date.now() - 259200000).toISOString(),
      matchScore: 90,
      creator: {
        id: "creator-1",
        category: "Music",
        followers: 12000,
        engagementRate: 0.065,
        pastBrandScore: 35,
      },
    },
  ],

  opportunities: [],
};