"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CardShell from "@/app/components/ui/CardShell";
import Button from "@/app/components/ui/Button";
import { spacing } from "@/app/lib/designTokens";

// 🧠 6.3 Match feedback system (correct export)
import { recordMatchFeedback } from "@/app/lib/matches/matchFeedbackStore";

type Props = {
  title: string;
  subtitle?: string;
  image?: string;
  footer?: string;
  actionLabel?: string;
  brandId?: string;
  creatorId?: string;
  isAction?: boolean;
  campaignId?: string;
  href?: string;
};

export default function MarketplaceCard({
  title,
  subtitle,
  image,
  footer,
  actionLabel,
  brandId,
  creatorId,
  isAction = false,
  campaignId,
  href,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleClick = async () => {
    const pairId = `${creatorId ?? "unknown"}-${brandId ?? title.toLowerCase()}`;

    // 🧠 6.3 FEEDBACK SIGNAL
    recordMatchFeedback({
      pairId,
      type: isAction ? "apply" : "view",
      intensity: isAction ? 0.8 : 0.3,
    });

    if (isAction) {
      if (loading || applied) return;
      if (!creatorId) return;

      setLoading(true);

      try {
        await fetch("/api/proposals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            creatorId,
            brandId: brandId || title.toLowerCase(),
            message: "Hey! I’d love to collaborate.",
          }),
        });

        setApplied(true);
      } finally {
        setLoading(false);
      }

      return;
    }

    const target = campaignId ? `/campaigns/${campaignId}` : href;
    if (target) router.push(target);
  };

  return (
    <CardShell
      style={{
        minWidth: 180,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      {/* IMAGE */}
      {image && (
        <div
          style={{
            width: "100%",
            height: 100,
            overflow: "hidden",
            borderRadius: 8,
            marginBottom: spacing.sm,
            flexShrink: 0,
          }}
        >
          <img
            src={image}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      )}

      {/* CONTENT */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          flex: 1,
        }}
      >
        <p style={{ fontWeight: 600, margin: 0 }}>{title}</p>

        {subtitle && (
          <p style={{ fontSize: 12, color: "#666", margin: 0 }}>
            {subtitle}
          </p>
        )}

        {footer && (
          <p style={{ fontSize: 12, color: "#999", margin: 0 }}>
            {footer}
          </p>
        )}
      </div>

      {/* BUTTON */}
      {actionLabel && (
        <div style={{ marginTop: spacing.sm }}>
          <Button
            onClick={handleClick}
            disabled={loading || applied}
            fullWidth
          >
            {loading ? "Loading..." : applied ? "Applied ✓" : actionLabel}
          </Button>
        </div>
      )}
    </CardShell>
  );
}