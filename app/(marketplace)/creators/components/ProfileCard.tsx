export function ProfileCard({
  title,
  children,
  tone = "neutral",
}: {
  title: string;
  children: React.ReactNode;
  tone?: "neutral" | "good" | "strong" | "weak";
}) {
  const styles = {
    neutral: {
      border: "1px solid #eee",
      background: "#fff",
    },
    good: {
      border: "1px solid #dbeafe",
      background: "#f8fafc",
    },
    strong: {
      border: "1px solid #bbf7d0",
      background: "#f0fdf4",
    },
    weak: {
      border: "1px solid #fee2e2",
      background: "#fef2f2",
    },
  };

  return (
    <div
      style={{
        marginTop: 16,
        padding: 16,
        borderRadius: 12,
        ...styles[tone],
        transition: "all 0.2s ease",
      }}
    >
      <h3
        style={{
          fontWeight: 600,
          marginBottom: 10,
          fontSize: 14,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h3>

      <div style={{ fontSize: 14, lineHeight: 1.5 }}>
        {children}
      </div>
    </div>
  );
}