"use client";

import { useEffect, useState } from "react";
import MarketplaceCard from "@/app/components/ui/MarketplaceCard";
import CreatorCard from "@/app/components/ui/CreatorCard";
import { campaigns } from "@/app/data/campaigns";
import { buildFeedV2 } from "@/app/lib/feedV2";
import ViewAllButton from "@/app/components/ui/ViewAllButton";

export default function Home() {
  const [feed, setFeed] = useState<any[]>([]);

  useEffect(() => {
    setFeed(buildFeedV2() || []);
  }, []);

  const creators = feed.filter((f) => f?.type === "creator");
  const brands = feed.filter((f) => f?.type === "brand");

  return (
    <main style={{ padding: 40, fontFamily: "sans-serif" }}>

      {/* HERO */}
      <section style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700 }}>
          Creator–Brand Marketplace
        </h1>
        <p style={{ marginTop: 10, color: "#555" }}>
          Connect brands with creators through live opportunities and campaigns.
        </p>
      </section>

      {/* BRAND SIGNALS */}
      <section style={{ marginBottom: 40 }}>
        <h2>Brand Signals</h2>

        <div
          style={{
            display: "flex",
            gap: 12,
            overflowX: "auto",
            marginTop: 10,
            paddingBottom: 8,
            alignItems: "stretch",
          }}
        >
          {brands.slice(0, 6).map((b) => (
            <div key={b.id} style={{ minWidth: 180, display: "flex" }}>
              <MarketplaceCard
                title={b.name}
                subtitle={b.subtitle}
                footer="Active brand demand"
                actionLabel="View"
                isAction={false}
                href={`/brands/${b.id}`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* LIVE CAMPAIGNS */}
      <section style={{ marginBottom: 40 }}>
        <h2>Live Campaigns</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 12,
            marginTop: 10,
          }}
        >
          {campaigns.map((campaign) => (
            <MarketplaceCard
              key={campaign.id}
              title={campaign.title}
              subtitle={campaign.niche}
              footer={`${campaign.budget}`}
              image={campaign.image}
              actionLabel="Apply"
              isAction={true}
              brandId={campaign.brandId}
              creatorId="demo-creator"
              campaignId={campaign.id}
            />
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <ViewAllButton />
        </div>
      </section>

      {/* DISCOVER */}
      <section style={{ marginBottom: 40 }}>
        <h2>Discover</h2>

        <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
          <MarketplaceCard
            title="Trending Niches"
            subtitle="Fashion, Music, Comedy"
            isAction={false}
            href="/discover/trending"
          />

          <MarketplaceCard
            title="Platform Activity"
            subtitle="Live engagement across creators & brands"
            isAction={false}
            href="/discover/activity"
          />

          <MarketplaceCard
            title="Opportunities Heatmap"
            subtitle="Where brand demand is rising"
            isAction={false}
            href="/discover/heatmap"
          />
        </div>
      </section>

      {/* LIVE CREATORS */}
      <section style={{ marginTop: 40 }}>
        <h2>Live Creators</h2>

        <div
          style={{
            display: "flex",
            gap: 14,
            overflowX: "auto",
            paddingBottom: 10,
          }}
        >
          {creators.slice(0, 12).map((c) => (
            <div key={`${c.id}-${c.name}`} style={{ minWidth: 200 }}>
              <CreatorCard
                creator={{
                  id: c.id,
                  name: c.name,
                  category: c.category,
                  avatar: c.avatar,
                }}
                score={c.score}
              />
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}