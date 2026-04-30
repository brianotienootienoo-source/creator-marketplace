type Props = {
  src: string;
  size?: number;
};

export default function Avatar({ src, size = 40 }: Props) {
  return (
    <div
      style={{ width: size, height: size }}
      className="
        rounded-full
        overflow-hidden
        border border-gray-200
        shadow-sm
        bg-gray-100
      "
    >
      <img src={src} className="w-full h-full object-cover" />
    </div>
  );
}