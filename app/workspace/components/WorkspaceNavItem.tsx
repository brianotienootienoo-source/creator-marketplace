"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
};

export default function WorkspaceNavItem({
  label,
  href,
  icon: Icon,
  badge,
}: Props) {
  const pathname = usePathname();

  const isActive =
    pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={`
        flex items-center justify-between gap-3 rounded-xl px-4 py-3 transition-all
        ${
          isActive
            ? "bg-[#f5f7fb] text-black"
            : "text-neutral-500 hover:bg-[#fafafa] hover:text-black"
        }
      `}
    >
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">
        <Icon size={18} />

        <span
          className={`
            transition-all
            ${
              isActive
                ? "text-[14px] font-semibold text-black"
                : "text-[13px] font-medium"
            }
          `}
        >
          {label}
        </span>
      </div>

      {/* RIGHT SIDE BADGE */}
      {typeof badge === "number" && badge > 0 && (
        <span className="min-w-[20px] rounded-full bg-black px-2 py-0.5 text-center text-xs text-white">
          {badge}
        </span>
      )}
    </Link>
  );
}