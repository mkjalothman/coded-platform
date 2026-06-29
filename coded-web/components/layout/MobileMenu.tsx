"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { colors, gradients, shadows, overlay } from "@/design-system";
import { cssTransition } from "@/design-system/motion";
import { navLinks } from "@/data/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function smoothScrollAndClose(href: string, onClose: () => void) {
  onClose();
  if (href.startsWith("#")) {
    const id = href.replace("#", "");
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  }
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 60 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ position: "fixed", inset: 0, backgroundColor: overlay.backdrop }}
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              maxWidth: "320px",
              backgroundColor: colors.surface.dark,
              borderLeft: `1px solid ${colors.border.dark}`,
              padding: "24px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "32px" }}>
              <button
                onClick={onClose}
                style={{
                  background: "none",
                  border: "none",
                  color: colors.text.bodyDark,
                  cursor: "pointer",
                  padding: "8px",
                }}
                aria-label="Close menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href.startsWith("#")) {
                      e.preventDefault();
                      smoothScrollAndClose(link.href, onClose);
                    } else {
                      onClose();
                    }
                  }}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: 500,
                    transition: cssTransition.background,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = overlay.subtleBg)}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div style={{ marginTop: "auto", paddingTop: "32px" }}>
              <a
                href="#apply"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollAndClose("#apply", onClose);
                }}
                style={{
                  display: "block",
                  textAlign: "center",
                  background: gradients.primaryCta,
                  color: "white",
                  padding: "14px 32px",
                  borderRadius: "999px",
                  fontWeight: 700,
                  fontSize: "15px",
                  textDecoration: "none",
                  boxShadow: shadows.primaryButton,
                }}
              >
                Apply Now
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
