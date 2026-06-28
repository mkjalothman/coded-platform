"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { label: "Bootcamps", href: "/bootcamps" },
  { label: "Companies", href: "/companies" },
  { label: "Kids & Youth", href: "/youth" },
  { label: "Community", href: "/community" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-white transition-shadow duration-200 ${
          scrolled ? "shadow-md" : "shadow-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center border-2 border-coded-navy rounded-[6px] px-3.5 py-1.5 mr-8"
            >
              <span className="text-lg font-bold tracking-tight text-coded-navy">
                CODED
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-coded-text hover:text-coded-navy transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-[8px] bg-coded-teal text-white hover:bg-coded-teal/90 transition-colors"
              >
                Apply Now
              </Link>
            </div>

            <button
              className="lg:hidden p-2 text-coded-text hover:text-coded-navy"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
