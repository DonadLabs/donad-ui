/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function NavBar() {
  const pathname = usePathname();

  // Helper function to check if link is active
  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <Link href="/" className="flex items-center justify-center">
        <img
          src="/images/logo.png" // This references public/images/logo.png
          alt="Donad Logo"
          className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
        />
        <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
          Donad
        </span>
      </Link>

      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Link
          href="/"
          className={`text-sm font-medium transition-colors ${
            isActive("/") ? "text-purple-600" : "hover:text-purple-600"
          }`}
        >
          Beranda
        </Link>
        <Link
          href="/explore-donation"
          className={`text-sm font-medium transition-colors ${
            isActive("/explore-donation")
              ? "text-purple-600"
              : "hover:text-purple-600"
          }`}
        >
          Jelajahi Donasi
        </Link>
        <Link
          href="/start-fundraising"
          className={`text-sm font-medium transition-colors ${
            isActive("/start-fundraising")
              ? "text-purple-600"
              : "hover:text-purple-600"
          }`}
        >
          Mulai Fundraising
        </Link>
        <Link
          href="/faucet"
          className={`text-sm font-medium transition-colors ${
            isActive("/faucet") ? "text-purple-600" : "hover:text-purple-600"
          }`}
        >
          Faucet
        </Link>
        <ConnectButton />
      </nav>
    </header>
  );
}
