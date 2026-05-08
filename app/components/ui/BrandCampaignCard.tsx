"use client";

import AnimatedCard from "@/app/components/ui/AnimatedCard";
import CardShell from "@/app/components/ui/CardShell";
import { spacing } from "@/app/lib/designTokens";

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
    <AnimatedCard>
      <CardShell>
        <h4 style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>
          {title}
        </h4>

        <p
          style={{
            fontSize: 12,
            color: "#6b7280",
            marginTop: spacing.xs,
          }}
        >
          {niche}
        </p>

        <p
          style={{
            fontSize: 13,
            fontWeight: 600,
            marginTop: spacing.sm,
          }}
        >
          {budget}
        </p>
      </CardShell>
    </AnimatedCard>
  );
}