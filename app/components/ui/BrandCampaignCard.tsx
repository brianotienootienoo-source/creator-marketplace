"use client";

import AnimatedCard from "@/app/components/ui/AnimatedCard";
import CardShell from "@/app/components/ui/CardShell";

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
        <h4>{title}</h4>
        <p className="muted">{niche}</p>
        <p className="strong">{budget}</p>
      </CardShell>

      {/* 🎨 TYPOGRAPHY SYSTEM */}
      <style jsx>{`
        h4 {
          font-size: 14px;
          font-weight: 600;
          margin: 0;
        }

        .muted {
          font-size: 12px;
          color: #6b7280;
          margin-top: 4px;
        }

        .strong {
          font-size: 13px;
          font-weight: 600;
          margin-top: 8px;
        }
      `}</style>
    </AnimatedCard>
  );
}