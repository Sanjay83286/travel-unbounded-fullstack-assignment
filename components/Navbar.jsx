"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * Site header. A Client Component because it tracks the open/closed state of the
 * mobile menu and highlights the active route.
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6"
      >
        <Link
          href="/"
          onClick={closeMenu}
          className="flex flex-col leading-none"
        >
          <span className="text-lg font-bold tracking-tight text-brand-800 sm:text-xl">
            Travel Unbounded
          </span>
          <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-ink-500">
            Experiential Travel
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-brand-600 ${
                pathname === link.href ? "text-brand-600" : "text-ink-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Plan Your Trip
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-stone-300 text-ink-900 md:hidden"
        >
          <span aria-hidden="true" className="text-xl leading-none">
            {isMenuOpen ? "✕" : "☰"}
          </span>
        </button>
      </nav>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div id="mobile-menu" className="border-t border-stone-200 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                  pathname === link.href
                    ? "bg-brand-50 text-brand-700"
                    : "text-ink-500"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={closeMenu}
              className="mt-1 rounded-lg bg-brand-600 px-3 py-2.5 text-center text-sm font-semibold text-white"
            >
              Plan Your Trip
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
