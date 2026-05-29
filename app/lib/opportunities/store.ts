import {
  Opportunity,
  OpportunityMedia,
  OpportunityInstruction,
} from "./types";

export const opportunities: Opportunity[] = [
  {
    id: "nova-studios",

    brandId: "nova",
    title: "Summer Lifestyle Campaign",
    description:
      "A summer-focused lifestyle campaign highlighting outdoor fashion.",

    category: "Fashion",
    niche: ["Lifestyle", "Outdoor"],

    budgetMin: 2000,
    budgetMax: 2600,
    currency: "USD",

    timeline: "2 weeks",
    location: "Remote",
    remote: true,

    deliverables: ["1 Reel", "3 Stories"],

    status: "active",

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];