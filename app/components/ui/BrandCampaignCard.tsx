type Props = {
  title: string;
  niche: string;
  budget: string;
};

export default function BrandCampaignCard({
  title,
  niche,
  budget,
}: Props) {
  return (
    <div
      style={{
        padding: 14,
        border: "1px solid #eee",
        borderRadius: 12,
        background: "#fff",
        boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
      }}
    >
      <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>
        {title}
      </h3>

      <p style={{ fontSize: 12, color: "#666", marginTop: 6 }}>
        {niche}
      </p>

      <p style={{ fontSize: 12, marginTop: 10, fontWeight: 600 }}>
        💰 {budget}
      </p>
    </div>
  );
}