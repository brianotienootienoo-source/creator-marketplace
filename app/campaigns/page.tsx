import { campaigns } from "@/app/data/campaigns";
import MarketplaceCard from "@/app/components/ui/MarketplaceCard";

export default function CampaignsPage() {
  return (
    <main style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>
        All Campaigns
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 12,
          marginTop: 20,
        }}
      >
        {campaigns.map((c) => (
          <MarketplaceCard
            key={c.id}
            title={c.title}
            subtitle={c.niche}
            footer={c.budget}
            image={c.image}
            actionLabel="View"
            isAction={false}
            campaignId={c.id}
          />
        ))}
      </div>
    </main>
  );
}