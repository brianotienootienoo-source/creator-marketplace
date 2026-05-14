import { getCreatorProfile } from "@/app/lib/marketplace/queries/creatorQueries";
import { getUnifiedIntelligenceSync } from "@/app/lib/marketplace/intelligence/unifiedIntelligenceSync";

import { CreatorHero } from "../components/CreatorHero";
import { CreatorIdentity } from "../components/CreatorIdentity";
import { CreatorStats } from "../components/CreatorStats";
import { ProfileCard } from "../components/ProfileCard";

export default async function CreatorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const creator = getCreatorProfile(id);

  if (!creator) {
    return (
      <div className="p-6">
        Creator not found
        <br />
        <span className="text-sm text-gray-500">
          Looking for ID: {id}
        </span>
      </div>
    );
  }

  /**
   * 🧠 SINGLE SOURCE OF TRUTH INTELLIGENCE
   * Everything (profile, brand, campaigns, readiness) flows from here
   */
  const intelligence = getUnifiedIntelligenceSync(creator);

  const avatarSrc =
    creator.avatar || `https://i.pravatar.cc/150?u=${creator.id}`;

  const bannerSrc =
    creator.banner ||
    `https://picsum.photos/1200/400?random=${creator.id}`;

  return (
    <div className="max-w-4xl mx-auto pb-10">

      {/* HERO */}
      <CreatorHero
        bannerSrc={bannerSrc}
        avatarSrc={avatarSrc}
        name={creator.name}
      />

      {/* IDENTITY */}
      <CreatorIdentity
        name={creator.name}
        username={creator.username}
        bio={creator.bio}
        niche={creator.niche}
      />

      {/* STATS */}
      <CreatorStats
        niche={creator.niche}
        followers={creator.metrics?.followers || 0}
        engagement={creator.metrics?.engagement || 0}
      />

      {/* ===================== */}
      {/* INTELLIGENCE PANEL */}
      {/* ===================== */}
      <ProfileCard
        title={intelligence.meta.label}
        tone={intelligence.formatted.tone}
      >
        <p style={{ fontSize: 13, color: "#666" }}>
          {intelligence.meta.reason}
        </p>

        <div
          style={{
            marginTop: 12,
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            fontSize: 12,
            color: "#777",
          }}
        >
          <span>Match Score: {intelligence.formatted.matchScore}</span>
          <span>Trend Score: {intelligence.formatted.trendScore}</span>
          <span>Rating: {intelligence.formatted.ratingScore}</span>
        </div>
      </ProfileCard>

      {/* ===================== */}
      {/* READINESS */}
      {/* ===================== */}
      <ProfileCard
        title="Opportunity Readiness"
        tone={
          intelligence.readiness.tier === "A"
            ? "strong"
            : intelligence.readiness.tier === "B"
            ? "good"
            : "weak"
        }
      >
        <p style={{ fontSize: 13, color: "#666" }}>
          Tier: <strong>{intelligence.readiness.tier}</strong>
        </p>

        <p style={{ fontSize: 13, color: "#666" }}>
          Score: {intelligence.readiness.score}
        </p>

        <p style={{ fontSize: 13, color: "#666" }}>
          Best Fit: {intelligence.readiness.bestFit}
        </p>
      </ProfileCard>

      {/* ===================== */}
      {/* CAMPAIGNS */}
      {/* ===================== */}
      <ProfileCard title="Recommended Campaigns">
        {intelligence.campaigns.length === 0 ? (
          <p style={{ fontSize: 13, color: "#888" }}>
            No strong matches found yet
          </p>
        ) : (
          intelligence.campaigns.slice(0, 3).map((c: any) => (
            <div key={c.id} style={{ marginBottom: 10 }}>
              <p style={{ fontWeight: 700 }}>{c.title}</p>
              <p style={{ fontSize: 12, color: "#777" }}>
                Score: {c.score}
              </p>
              <p style={{ fontSize: 12, color: "#999" }}>
                {c.reason}
              </p>
            </div>
          ))
        )}
      </ProfileCard>

    </div>
  );
}