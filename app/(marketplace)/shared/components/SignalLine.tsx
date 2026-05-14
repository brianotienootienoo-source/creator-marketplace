type Props = {
  matchScore?: number;
  trendScore?: number;
  rating?: number;
};

function Chip({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <span
      style={{
        padding: "4px 8px",
        borderRadius: 999,
        border: "1px solid #eee",
        background: "#fafafa",
        fontSize: 12,
        color: "#555",
      }}
    >
      {label}: {value}
    </span>
  );
}

export function SignalLine({
  matchScore = 0,
  trendScore = 0,
  rating = 0,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        marginTop: 8,
      }}
    >
      <Chip label="Match" value={matchScore} />
      <Chip label="Trend" value={trendScore} />
      <Chip label="Rating" value={rating} />
    </div>
  );
}