"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { label: "Bootcamps", href: "/bootcamps" },
  { label: "Companies", href: "/companies" },
  { label: "Kids & Youth", href: "/youth" },
  { label: "Community", href: "/community" },
  { label: "About", href: "/about" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/60" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-coded-bg border-l border-coded-border p-6 flex flex-col">
        <div className="flex justify-end mb-8">
          <button
            onClick={onClose}
            className="text-coded-muted hover:text-coded-white p-2"
            aria-label="Close menu"
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
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-coded-muted hover:text-coded-white px-4 py-3 rounded-[8px] hover:bg-coded-surface transition-colors text-lg"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-8">
          <Button variant="primary" size="lg" className="w-full">
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
}
