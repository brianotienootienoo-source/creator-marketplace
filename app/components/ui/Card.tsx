type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: Props) {
  return (
    <div
      className={`
        bg-white
        border border-gray-100
        rounded-2xl
        shadow-sm
        hover:shadow-lg
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
}