import { db } from "../core/db";
import { Opportunity } from "./opportunitySchema";

// seed only once (temporary bootstrap)
const seedIfEmpty = () => {
  if (db.opportunities.length > 0) return;

  db.opportunities.push(
    {
      id: "nova-studios",
      title: "Summer Lifestyle Campaign",
      brandId: "Nova Studios",
      category: "Lifestyle",
      description:
        "A seasonal campaign focused on summer fashion and outdoor storytelling.",
      budgetMin: 2000,
      budgetMax: 2400,
      location: "Global",
      timeline: "2 weeks",
      deliverables: ["Reel", "Posts", "Stories"],
      match: "High Match",
    },
    {
      id: "pulse-energy",
      title: "Fitness Creator Partnership",
      brandId: "Pulse Energy",
      category: "Fitness",
      description: "Fitness product launch campaign.",
      budgetMin: 1800,
      budgetMax: 1800,
      location: "Global",
      timeline: "10 days",
      deliverables: ["Reel", "Story"],
      match: "Recommended",
    },
    {
      id: "aether-fashion",
      title: "Streetwear Creator Feature",
      brandId: "Aether Fashion",
      category: "Fashion",
      description: "Streetwear-focused creator collaboration.",
      budgetMin: 3100,
      budgetMax: 3100,
      location: "Global",
      timeline: "3 weeks",
      deliverables: ["Photoshoot", "Reel"],
      match: "Trending",
    }
  );
};

export function getOpportunityById(id: string) {
  seedIfEmpty();
  return db.opportunities.find((o) => o.id === id) || null;
}

export function getAllOpportunities() {
  seedIfEmpty();
  return db.opportunities;
}