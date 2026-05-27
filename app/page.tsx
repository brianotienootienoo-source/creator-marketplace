"use client";

import { useEffect, useMemo, useState } from "react";
import MarketplaceCard from "@/app/components/ui/MarketplaceCard";
import CreatorCard from "@/app/components/ui/CreatorCard";
import { campaigns } from "@/app/data/campaigns";
import ViewAllButton from "@/app/components/ui/ViewAllButton";

import { routeFeedStreams } from "@/app/lib/streams/streamRouter";
import { getActiveStreamMode } from "@/app/lib/streams/streamSwitchEngine";

type FeedItem = {
  type?: "creator" | "brand" | "match";
  id?: string;
  name?: string;
  subtitle?: string;
  category?: string;
  avatar?: string;
  score?: number;
};

export default function Home() {
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [debug, setDebug] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/feed?limit=50");
        const json = await res.json();

        setFeed(Array.isArray(json?.data) ? json.data : []);
        setDebug(json?.meta ?? null);
      } catch (err) {
        console.error("Feed load failed:", err);
        setFeed([]);
        setDebug(null);
      }
    }

    load();
  }, []);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const streams = useMemo(() => routeFeedStreams(feed), [feed]);

  const mode = useMemo(() => {
    if (!hydrated) return "forYou";
    return getActiveStreamMode();
  }, [hydrated]);

  const activeFeed = feed ?? [];

  const creators = activeFeed.filter((f) => f?.type === "creator");
  const brands = activeFeed.filter((f) => f?.type === "brand");

  return (
    <main style={{ padding: 40, fontFamily: "sans-serif" }}>
      <section style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700 }}>
          Creator–Brand Marketplace
        </h1>

        <p style={{ marginTop: 10, color: "#555" }}>
          Connect brands with creators through live opportunities and campaigns.
        </p>

        <p style={{ fontSize: 12, color: "#999", marginTop: 6 }}>
          Stream mode: {mode}
        </p>

        {debug && (
          <p style={{ fontSize: 11, color: "#888", marginTop: 6 }}>
            Orchestrator → mode: {debug.mode} | source: {debug.source}
          </p>
        )}
      </section>

      {/* BRAND SIGNALS */}
      <section style={{ marginBottom: 40 }}>
        <h2>Brand Signals</h2>

        <div style={{ display: "flex", gap: 12, overflowX: "auto", marginTop: 10 }}>
          {brands.length === 0 ? (
            <p style={{ color: "#999" }}>No brand signals available</p>
          ) : (
            brands.slice(0, 6).map((b) => (
              <div key={b.id ?? "brand"} style={{ minWidth: 180 }}>
                <MarketplaceCard
                  title={b?.name ?? "Brand"}
                  subtitle={b?.subtitle ?? ""}
                  footer="Active brand demand"
                  actionLabel="View"
                  isAction={false}
                  href={`/brands/${b?.id ?? "#"}`}
                />
              </div>
            ))
          )}
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

        <div style={{ display: "flex", gap: 12 }}>
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

        <div style={{ display: "flex", gap: 14, overflowX: "auto" }}>
          {creators.length === 0 ? (
            <p style={{ color: "#999" }}>No creators available</p>
          ) : (
            creators.slice(0, 12).map((c) => (
              <div key={`${c.id}-${c.name}`} style={{ minWidth: 200 }}>
                <CreatorCard
                  creator={{
                    id: c.id,
                    name: c.name,
                    category: c.category,
                    avatar: c.avatar,
                  }}
                  score={c.score ?? 0}
                />
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}