import MarketplaceCard from "@/app/components/ui/MarketplaceCard";
import { campaigns } from "@/app/data/campaigns";
import { buildFeedV2 } from "@/app/lib/feedV2";
import ViewAllButton from "@/app/components/ui/ViewAllButton";

/* -----------------------------
   NO MORE LOCAL SLUGGING LOGIC
   (we trust feed IDs only)
------------------------------*/

export default function Home() {
  const feed = buildFeedV2() || [];

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

      {/* 1. BRAND SIGNALS */}
      <section style={{ marginBottom: 40 }}>
        <h2>Brand Signals</h2>

        <div style={{ display: "flex", gap: 12, overflowX: "auto", marginTop: 10 }}>
          {brands.slice(0, 6).map((b) => (
            <MarketplaceCard
              key={b?.id}
              title={b?.title}
              subtitle={b?.subtitle}
              footer="Active brand demand"
              actionLabel="View"
              isAction={false}

              // 🔥 CRITICAL: NEVER compute slug here again
              href={`/brands/${b?.id}`}
            />
          ))}
        </div>
      </section>

      {/* 2. LIVE CAMPAIGNS */}
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

      {/* 3. DISCOVER */}
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

      {/* 4. LIVE CREATORS */}
      <section style={{ marginTop: 40 }}>
        <h2>Live Creators</h2>

        <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 10 }}>
          {creators.slice(0, 12).map((c) => (
            <div key={c?.id} style={{ minWidth: 90, textAlign: "center" }}>
              <img
                src={c?.image}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #eee",
                }}
              />
              <p style={{ fontSize: 11, marginTop: 6 }}>
                {c?.title}
              </p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}