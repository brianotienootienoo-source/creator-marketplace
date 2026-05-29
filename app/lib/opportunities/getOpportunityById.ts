import {
  Opportunity,
  OpportunityMedia,
  OpportunityInstruction,
  OpportunityContext,
} from "@/app/lib/workspace/opportunities/opportunitySchema";

type OpportunityDetail = {
  opportunity: Opportunity;
  media: OpportunityMedia[];
  instructions: OpportunityInstruction[];
  context?: OpportunityContext;
};

const MOCK: Record<string, OpportunityDetail> = {
  "nova-studios": {
    opportunity: {
      id: "nova-studios",
      title: "Summer Lifestyle Campaign",
      brandId: "Nova Studios",
      category: "Lifestyle",
      description:
        "A seasonal campaign focused on summer fashion, outdoor aesthetics, and lifestyle storytelling.",
      budgetMin: 2000,
      budgetMax: 2400,
      location: "Global",
      timeline: "2 weeks",
      deliverables: ["Reel", "3 Posts", "Story Set"],
      match: "High Match",
    },

    media: [
      { id: "m1", url: "https://picsum.photos/400/300?1" },
      { id: "m2", url: "https://picsum.photos/400/300?2" },
      { id: "m3", url: "https://picsum.photos/400/300?3" },
    ],

    instructions: [
      { id: "i1", text: "Use natural outdoor lighting" },
      { id: "i2", text: "Tag @NovaStudios in all posts" },
      { id: "i3", text: "Maintain summer lifestyle aesthetic" },
    ],

    context: {
      brandStory:
        "Nova Studios focuses on modern lifestyle storytelling through creators worldwide.",
      brandValues: ["Authenticity", "Aesthetic Quality", "Youth Culture"],
    },
  },
};

export function getOpportunityById(id: string): OpportunityDetail | null {
  return MOCK[id] || null;
}