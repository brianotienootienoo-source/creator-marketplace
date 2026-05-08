"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CardShell from "@/app/components/ui/CardShell";
import Button from "@/app/components/ui/Button";
import { spacing } from "@/app/lib/designTokens";

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
    <CardShell style={{ minWidth: 180, overflow: "hidden" }}>
      {image && (
        <img
          src={image}
          style={{ width: "100%", height: 110, objectFit: "cover" }}
        />
      )}

      <div style={{ paddingTop: spacing.sm }}>
        <p style={{ fontWeight: 600, margin: 0 }}>{title}</p>

        {subtitle && (
          <p style={{ fontSize: 12, color: "#666" }}>{subtitle}</p>
        )}

        {footer && (
          <p style={{ fontSize: 12, color: "#999" }}>{footer}</p>
        )}

        {actionLabel && (
          <Button
            onClick={handleClick}
            disabled={loading || applied}
            fullWidth
          >
            {loading ? "Loading..." : applied ? "Applied ✓" : actionLabel}
          </Button>
        )}
      </div>
    </CardShell>
  );
}