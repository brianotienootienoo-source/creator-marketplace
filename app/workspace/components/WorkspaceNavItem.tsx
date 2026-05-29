"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  label: string;
  href: string;
  icon: React.ElementType;
};

export default function WorkspaceNavItem({
  label,
  href,
  icon: Icon,
}: Props) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        flex items-center gap-3 rounded-xl px-4 py-3 transition-all
        ${
          isActive
            ? "bg-[#f5f7fb] text-black"
            : "text-neutral-500 hover:bg-[#fafafa] hover:text-black"
        }
      `}
    >
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
    </Link>
  );
}