"use client";

import { useState, useEffect, useCallback } from "react";
import MobileMenu from "./MobileMenu";
import Button from "@/components/ui/Button";
import { colors, shadows } from "@/design-system";
import { spacing } from "@/design-system/spacing";
import { navbar, cssTransition } from "@/design-system/motion";
import { navLinks } from "@/data/navigation";

function smoothScroll(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      smoothScroll(href);
    }
  }, []);

  return (
    <>
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: scrolled ? "rgba(20, 36, 63, 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${colors.border.navScrolled}` : "1px solid transparent",
        boxShadow: scrolled ? shadows.navbarScrolled : "none",
        transition: navbar.transition,
      }}>
        <div style={{
          maxWidth: spacing.containerMax,
          margin: "0 auto",
          padding: spacing.containerPadding,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: spacing.navbarHeight,
        }}>
          <a href="/" style={{
            border: "2px solid white",
            padding: "4px 10px",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
          }}>
            <span style={{ color: "white", fontWeight: 700, fontSize: "18px", letterSpacing: "-0.01em" }}>CODED</span>
          </a>

          <div className="nav-desktop-links" style={{
            alignItems: "center",
            gap: "32px",
          }}>
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  color: colors.text.navDefault,
                  fontSize: "14px",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: cssTransition.color,
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = colors.brand.teal)}
                onMouseLeave={e => (e.currentTarget.style.color = colors.text.navDefault)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <Button
            href="#apply"
            onClick={(e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => handleNavClick(e as React.MouseEvent<HTMLAnchorElement>, "#apply")}
            style={{
              padding: "10px 24px",
              fontSize: "14px",
            }}
            className="nav-desktop-cta"
          >
            Apply Now
          </Button>

          <button
            onClick={() => setMobileOpen(true)}
            className="nav-mobile-toggle"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              color: "white",
            }}
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <style>{`
        .nav-desktop-links { display: none; }
        .nav-desktop-cta { display: none !important; }
        .nav-mobile-toggle { display: block; }

        @media (min-width: 768px) {
          .nav-desktop-links { display: flex; }
          .nav-desktop-cta { display: inline-flex !important; }
          .nav-mobile-toggle { display: none; }
        }
      `}</style>
    </>
  );
}
