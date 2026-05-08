"use client";

import { button } from "@/app/lib/designTokens";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  variant?: "primary" | "secondary";
  style?: React.CSSProperties;
};

export default function Button({
  children,
  onClick,
  disabled,
  fullWidth,
  variant = "primary",
  style,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        height: button.height,
        minWidth: button.minWidth,
        borderRadius: button.radius,
        padding: "0 14px",
        border: "none",
        cursor: "pointer",
        width: fullWidth ? "100%" : undefined,
        background: variant === "primary" ? "#000" : "#e5e7eb",
        color: variant === "primary" ? "#fff" : "#111",
        opacity: disabled ? 0.6 : 1,
        transition: "transform 0.15s ease, opacity 0.15s ease",
        ...style,
      }}
    >
      {children}
    </button>
  );
}