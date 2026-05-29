"use client";

type Props = {
  mode: "normal" | "signal";
  onToggle: () => void;
};

export default function ViewModeToggle({ mode, onToggle }: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: 16,
      }}
    >
      <button
        onClick={onToggle}
        style={{
          padding: "8px 12px",
          borderRadius: 10,
          border: "1px solid #e5e7eb",
          background: mode === "signal" ? "#111" : "#fff",
          color: mode === "signal" ? "#fff" : "#111",
          fontSize: 12,
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        {mode === "signal" ? "Signal View Active" : "Normal View"}
      </button>
    </div>
  );
}