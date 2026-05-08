"use client";

import AnimatedCard from "@/app/components/ui/AnimatedCard";
import CardShell from "@/app/components/ui/CardShell";
import { getCreatorStars, getCreatorLabel } from "@/app/lib/creatorIntelligence";

/* -----------------------------
   TYPES
------------------------------*/
type Props = {
  creator: {
    id: string;
    name: string;
    category?: string;
  };
  score: number;
};

/* -----------------------------
   GLOBAL CREATOR CARD (SOURCE OF TRUTH UI)
------------------------------*/
export default function CreatorCard({ creator, score }: Props) {
  return (
    <AnimatedCard>
      <CardShell>

        {/* NAME */}
        <h4 style={{ margin: 0 }}>{creator.name}</h4>

        {/* CATEGORY */}
        <p style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
          {creator.category}
        </p>

        {/* LABEL */}
        <p style={{ fontSize: 12, color: "#999", marginTop: 4 }}>
          {getCreatorLabel(score)}
        </p>

        {/* STARS */}
        <p style={{ marginTop: 8 }}>
          {getCreatorStars(score)}
        </p>

      </CardShell>
    </AnimatedCard>
  );
}