import { campaigns } from "@/app/data/campaigns";
import { getBrandOpportunities } from "@/app/lib/feed";

export function getBrandMetrics(brandId: string) {
  const brands = getBrandOpportunities();
  const brand = brands.find((b) => b.id === brandId);

  const brandCampaigns = campaigns.filter(
    (c) => c.brandId?.toLowerCase() === brandId.toLowerCase()
  );

  // 📊 1. TOTAL CAMPAIGNS
  const totalCampaigns = brandCampaigns.length;

  // 🔥 2. ACTIVE CAMPAIGNS (heuristic-based)
  const activeCampaigns = brandCampaigns.filter((c) => {
    const deadline = c.deadline?.toLowerCase() || "";
    return deadline.includes("day") || deadline.includes("hour");
  }).length;

  // 💰 3. BETTER BUDGET ESTIMATION
  const estimatedBudget = brandCampaigns.reduce((acc, c) => {
    const numbers = c.budget.match(/\d+/g);

    if (!numbers || numbers.length === 0) return acc;

    const low = parseInt(numbers[0]);
    const high = numbers[1] ? parseInt(numbers[1]) : low;

    const avg = (low + high) / 2;

    return acc + avg;
  }, 0);

  // 🧠 4. SMARTER DEMAND SCORE (NON-LINEAR)
  const baseDemand = brand?.demandScore || 0;

  const campaignPressure = totalCampaigns * 3;
  const activityBoost = activeCampaigns * 5;
  const budgetWeight = Math.min(estimatedBudget / 1000, 20);

  const demandScore = Math.round(
    baseDemand + campaignPressure + activityBoost + budgetWeight
  );

  // 📊 5. CAMPAIGN NICHE ANALYSIS
  const nicheMap: Record<string, number> = {};

  brandCampaigns.forEach((c) => {
    const niche = c.niche || "Unknown";
    nicheMap[niche] = (nicheMap[niche] || 0) + 1;
  });

  const dominantNiche =
    Object.entries(nicheMap).sort((a, b) => b[1] - a[1])[0]?.[0] ||
    "Mixed";

  // 🔥 6. CAMPAIGN INTENSITY LEVEL
  let intensity: "Low" | "Medium" | "High" = "Low";

  if (totalCampaigns >= 5 || activeCampaigns >= 3) {
    intensity = "High";
  } else if (totalCampaigns >= 3 || activeCampaigns >= 2) {
    intensity = "Medium";
  }

  return {
    totalCampaigns,
    activeCampaigns,
    estimatedBudget: Math.round(estimatedBudget),
    demandScore,
    dominantNiche,
    intensity,
  };
}