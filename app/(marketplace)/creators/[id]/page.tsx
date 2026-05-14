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
   * 🧠 UNIFIED INTELLIGENCE LAYER (SINGLE SOURCE OF TRUTH)
   */
  const intelligence = getUnifiedIntelligenceSync(creator);

  const avatarSrc =
    creator.avatar || `https://i.pravatar.cc/150?u=${creator.id}`;

  const bannerSrc =
    creator.banner ||
    `https://picsum.photos/1200/400?random=${creator.id}`;

  return (
    <div className="max-w-4xl mx-auto pb-10">

      {/* ===================== */}
      {/* HERO */}
      {/* ===================== */}
      <CreatorHero
        bannerSrc={bannerSrc}
        avatarSrc={avatarSrc}
        name={creator.name}
      />

      {/* ===================== */}
      {/* IDENTITY */}
      {/* ===================== */}
      <CreatorIdentity
        name={creator.name}
        username={creator.username}
        bio={creator.bio}
        niche={creator.niche}
      />

      {/* ===================== */}
      {/* STATS */}
      {/* ===================== */}
      <CreatorStats
        niche={creator.niche}
        followers={creator.metrics?.followers || 0}
        engagement={creator.metrics?.engagement || 0}
      />

      {/* ===================== */}
      {/* QUICK METRICS STRIP */}
      {/* ===================== */}
      <div
        style={{
          marginTop: 12,
          display: "flex",
          justifyContent: "space-between",
          padding: 12,
          border: "1px solid #eee",
          borderRadius: 10,
          background: "#fafafa",
          fontSize: 12,
        }}
      >
        <span>
          Followers: {creator.metrics?.followers?.toLocaleString?.() ?? 0}
        </span>

        <span>
          Engagement: {creator.metrics?.engagement ?? 0}%
        </span>

        <span>
          Brand Score: {creator.ratingScore ?? 0}
        </span>

        <span>
          Platforms: {creator.platformFollowers
            ? Object.keys(creator.platformFollowers).length
            : 0}
        </span>
      </div>

      {/* ===================== */}
      {/* PLATFORM REACH */}
      {/* ===================== */}
      <div
        style={{
          marginTop: 16,
          padding: 12,
          border: "1px solid #eee",
          borderRadius: 10,
          background: "#fff",
          fontSize: 12,
        }}
      >
        <p style={{ fontWeight: 700, marginBottom: 8 }}>
          Platform Reach
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {creator.platformFollowers?.youtube && (
            <span>YouTube: {creator.platformFollowers.youtube.toLocaleString()}</span>
          )}

          {creator.platformFollowers?.tiktok && (
            <span>TikTok: {creator.platformFollowers.tiktok.toLocaleString()}</span>
          )}

          {creator.platformFollowers?.instagram && (
            <span>Instagram: {creator.platformFollowers.instagram.toLocaleString()}</span>
          )}

          {creator.platformFollowers?.twitch && (
            <span>Twitch: {creator.platformFollowers.twitch.toLocaleString()}</span>
          )}

          {creator.platformFollowers?.x && (
            <span>X: {creator.platformFollowers.x.toLocaleString()}</span>
          )}
        </div>
      </div>

      {/* ===================== */}
      {/* AUDIENCE SNAPSHOT */}
      {/* ===================== */}
      <div
        style={{
          marginTop: 16,
          padding: 12,
          border: "1px solid #eee",
          borderRadius: 10,
          background: "#fafafa",
          fontSize: 12,
        }}
      >
        <p style={{ fontWeight: 700, marginBottom: 8 }}>
          Audience Snapshot
        </p>

        <p>
          Age Range: {creator.audience?.primaryAgeRange ?? "N/A"}
        </p>

        <p>
          Locations: {creator.audience?.topLocations?.join(", ") ?? "N/A"}
        </p>

        <p>
          Interests: {creator.audience?.interests?.join(", ") ?? "N/A"}
        </p>
      </div>

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
        <p>
          Tier: <strong>{intelligence.readiness.tier}</strong>
        </p>

        <p>Score: {intelligence.readiness.score}</p>

        <p>Best Fit: {intelligence.readiness.bestFit}</p>
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

      {/* ===================== */}
      {/* PORTFOLIO GRID */}
      {/* ===================== */}
      <div style={{ marginTop: 16 }}>
        <p style={{ fontWeight: 700, marginBottom: 10 }}>
          Portfolio
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 10,
          }}
        >
          {(creator.portfolio ?? []).map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #eee",
                borderRadius: 10,
                padding: 10,
                background: "#fff",
              }}
            >
              <img
                src={item.thumbnail}
                style={{
                  width: "100%",
                  borderRadius: 8,
                  marginBottom: 8,
                }}
              />

              <p style={{ fontWeight: 600, fontSize: 12 }}>
                {item.title}
              </p>

              <p style={{ fontSize: 11, color: "#777" }}>
                {item.platform}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ===================== */}
      {/* CTA LAYER */}
      {/* ===================== */}
      <div
        style={{
          marginTop: 24,
          padding: 16,
          border: "1px solid #eee",
          borderRadius: 10,
          background: "#fafafa",
          display: "flex",
          gap: 10,
          justifyContent: "space-between",
        }}
      >
        <button style={{ padding: 10, border: "1px solid #ccc", borderRadius: 8 }}>
          Invite Creator
        </button>

        <button style={{ padding: 10, border: "1px solid #ccc", borderRadius: 8 }}>
          Send Campaign
        </button>

        <button style={{ padding: 10, border: "1px solid #ccc", borderRadius: 8 }}>
          Save Profile
        </button>
      </div>

    </div>
  );
}