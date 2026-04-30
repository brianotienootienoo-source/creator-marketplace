"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path
      ? "text-black border-b-2 border-black pb-1"
      : "text-gray-500 hover:text-black";

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b">

      {/* Brand */}
      <Link href="/" className="font-bold text-xl">
        CreatorMarket
      </Link>

      {/* Links */}
      <div className="flex gap-6 text-sm items-center">

        <Link href="/" className={isActive("/")}>
          Home
        </Link>

        <Link href="/feed" className={isActive("/feed")}>
          Feed
        </Link>

        <Link href="/browse" className={isActive("/browse")}>
          Browse
        </Link>

        <Link href="/following" className={isActive("/following")}>
          Following
        </Link>

        <Link
          href="/join"
          className={`px-3 py-1 rounded-lg transition ${
            pathname === "/join"
              ? "bg-gray-800 text-white"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          Join
        </Link>

      </div>
    </nav>
  );
}