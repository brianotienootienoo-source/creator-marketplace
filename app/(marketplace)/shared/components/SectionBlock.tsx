import {
  layout,
  radius,
  spacing,
  surfaces,
  typography,
} from "@/app/lib/designTokens";

type Props = {
  title?: string;

  children: React.ReactNode;

  tone?: "neutral" | "soft" | "strong";
};

export function SectionBlock({
  title,
  children,
  tone = "neutral",
}: Props) {
  const toneStyles = {
    neutral: surfaces.card,
    soft: surfaces.cardSoft,
    strong: "#f3f4f6",
  };

  return (
    <section
      style={{
        marginTop: layout.blockGap,

        padding: spacing.xl,

        border: `1px solid ${surfaces.border}`,
        borderRadius: radius.lg,

        background: toneStyles[tone],

        boxShadow: surfaces.shadowSoft,
      }}
    >
      {title && (
        <div
          style={{
            marginBottom: spacing.lg,
          }}
        >
          <h3
            style={{
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.semibold,
            }}
          >
            {title}
          </h3>
        </div>
      )}

      {children}
    </section>
  );
}