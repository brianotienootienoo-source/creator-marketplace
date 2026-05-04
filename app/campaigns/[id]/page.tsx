import { campaigns } from "@/app/data/campaigns";
import MarketplaceCard from "@/app/components/ui/MarketplaceCard";

type Props = {
  params: {
    id: string;
  };
};

export default function CampaignPage({ params }: Props) {
  const campaign = campaigns.find((c) => c.id === params.id);

  if (!campaign) {
    return (
      <main style={{ padding: 40, fontFamily: "sans-serif" }}>
        <h1>Campaign not found</h1>
        <p style={{ color: "#666", marginTop: 10 }}>
          Invalid or missing campaign ID.
        </p>
      </main>
    );
  }

  return (
    <main style={{ padding: 40, fontFamily: "sans-serif" }}>

      <button
        onClick={() => window.history.back()}
        style={{
          marginBottom: 20,
          padding: "6px 10px",
          borderRadius: 8,
          border: "1px solid #ddd",
          background: "#fff",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      <section style={{ marginBottom: 30 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>
          {campaign.title}
        </h1>

        <p style={{ color: "#666", marginTop: 6 }}>
          Brand: <strong>{campaign.brandId}</strong>
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
        }}
      >
        <img
          src={campaign.image}
          style={{ width: "100%", borderRadius: 12 }}
        />

        <div>
          <MarketplaceCard
            title="Campaign Overview"
            subtitle={campaign.niche}
            footer={`Deadline: ${campaign.deadline}`}
            actionLabel="Apply Now"
            isAction={true}
            brandId={campaign.brandId}
            creatorId="demo-creator"
          />

          <div
            style={{
              marginTop: 16,
              padding: 14,
              border: "1px solid #eee",
              borderRadius: 12,
            }}
          >
            <p><strong>💰 Budget:</strong> {campaign.budget}</p>
            <p style={{ marginTop: 6 }}>
              <strong>📦 Deliverables:</strong> {campaign.deliverables}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}