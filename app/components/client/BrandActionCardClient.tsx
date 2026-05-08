"use client";

import { useState } from "react";
import BrandInsights from "@/app/components/ui/BrandInsights";
import CardShell from "@/app/components/ui/CardShell";
import AnimatedCard from "@/app/components/ui/AnimatedCard";
import Button from "@/app/components/ui/Button";
import { spacing } from "@/app/lib/designTokens";

export default function BrandActionCardClient({
  brandId,
}: {
  brandId: string;
}) {
  const [showStats, setShowStats] = useState(false);

  return (
    <AnimatedCard>
      <CardShell>
        <div style={{ marginTop: spacing.sm }}>
          <Button onClick={() => setShowStats((s) => !s)}>
            {showStats ? "Hide Key Stats" : "View Key Stats"}
          </Button>
        </div>

        {showStats && (
          <div style={{ marginTop: spacing.md }}>
            <BrandInsights brandId={brandId} />
          </div>
        )}
      </CardShell>
    </AnimatedCard>
  );
}