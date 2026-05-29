import {
  radius,
  spacing,
  surfaces,
  typography,
} from "@/app/lib/designTokens";

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
        padding: `${spacing.xs}px ${spacing.sm}px`,

        borderRadius: radius.full,

        border: `1px solid ${surfaces.border}`,

        background: surfaces.cardSoft,

        fontSize: typography.fontSize.sm,

        color: surfaces.muted,

        fontWeight: 500,

        whiteSpace: "nowrap",
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
        gap: spacing.sm,
        flexWrap: "wrap",
        marginTop: spacing.sm,
      }}
    >
      <Chip label="Match" value={matchScore} />
      <Chip label="Trend" value={trendScore} />
      <Chip label="Rating" value={rating} />
    </div>
  );
}