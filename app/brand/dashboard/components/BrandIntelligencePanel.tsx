type Props = {
  matchScore?: number;
  trendScore?: number;
  rating?: number;
  reason?: string;
};

export function BrandIntelligencePanel({
  matchScore = 0,
  trendScore = 0,
  rating = 0,
  reason,
}: Props) {
  return (
    <div
      style={{
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
        border: "1px solid #eee",
        background: "#fafafa",
      }}
    >
      <p style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>
        {reason || "Based on creator universe signals and engagement patterns"}
      </p>

      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          fontSize: 12,
          color: "#777",
        }}
      >
        <span>Match: {matchScore}</span>
        <span>Trend: {trendScore}</span>
        <span>Rating: {rating}</span>
      </div>
    </div>
  );
}