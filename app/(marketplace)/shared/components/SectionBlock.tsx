type Props = {
  title?: string;
  children: React.ReactNode;
  tone?: "neutral" | "soft" | "strong";
};

export function SectionBlock({ title, children, tone = "neutral" }: Props) {
  const toneStyles = {
    neutral: "#fff",
    soft: "#fafafa",
    strong: "#f3f4f6",
  };

  return (
    <div
      style={{
        marginTop: 16,
        padding: 14,
        border: "1px solid #eee",
        borderRadius: 12,
        background: toneStyles[tone],
      }}
    >
      {title && (
        <p
          style={{
            fontWeight: 700,
            fontSize: 13,
            marginBottom: 10,
          }}
        >
          {title}
        </p>
      )}

      {children}
    </div>
  );
}