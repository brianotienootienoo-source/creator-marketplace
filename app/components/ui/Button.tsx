type Props = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
};

export default function Button({
  children,
  variant = "primary",
  onClick,
  className = "",
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full text-sm font-medium
        transition-all duration-200
        active:scale-[0.98]

        ${
          variant === "primary"
            ? `
              bg-[#1d9bf0]
              text-white
              shadow-md
              hover:shadow-lg
              hover:bg-[#1878c9]
            `
            : `
              bg-gray-100
              text-gray-800
              hover:bg-gray-200
            `
        }

        ${className}
      `}
    >
      {children}
    </button>
  );
}