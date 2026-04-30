"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    pathname === path
      ? "text-[var(--primary)] font-medium"
      : "text-gray-500 hover:text-[var(--primary)] transition";

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">

      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">

        {/* BRAND */}
        <Link href="/" className="font-bold text-lg tracking-tight">
          CreatorMarket
        </Link>

        {/* LINKS */}
        <div className="flex gap-6 text-sm items-center">

          <Link href="/" className={linkClass("/")}>
            Home
          </Link>

          <Link href="/feed" className={linkClass("/feed")}>
            Feed
          </Link>

          <Link href="/browse" className={linkClass("/browse")}>
            Browse
          </Link>

          <Link href="/following" className={linkClass("/following")}>
            Following
          </Link>

          {/* CTA */}
          <Link
            href="/join"
            className="
              bg-[var(--primary)]
              text-white
              px-4 py-1.5
              rounded-full
              text-sm
              shadow-md
              hover:shadow-lg
              hover:translate-y-[-1px]
              transition
            "
          >
            Join
          </Link>

        </div>

      </div>
    </nav>
  );
}