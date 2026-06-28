"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { label: "Bootcamps", href: "#bootcamps" },
  { label: "Companies", href: "#companies" },
  { label: "Kids & Youth", href: "#audience" },
  { label: "Community", href: "#community" },
  { label: "About", href: "#about" },
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
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: scrolled ? 'rgba(13, 20, 54, 0.95)' : '#0d1436',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(30, 45, 107, 0.6)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.3)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <div style={{
          maxWidth: '1152px',
          margin: '0 auto',
          padding: '0 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}>
          <a href="/" style={{
            border: '2px solid white',
            padding: '4px 10px',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
          }}>
            <span style={{ color: 'white', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.01em' }}>CODED</span>
          </a>

          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="hidden md:flex">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '14px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#00b8a9')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
              >
                {link.label}
              </a>
            ))}
          </div>

          <motion.a
            href="#apply"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: 'linear-gradient(135deg, #00b8a9 0%, #00a896 100%)',
              color: 'white',
              padding: '10px 24px',
              borderRadius: '999px',
              fontWeight: 700,
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(0,184,169,0.3)',
              display: 'inline-flex',
              alignItems: 'center',
            }}
            className="hidden md:inline-flex"
          >
            Apply Now
          </motion.a>

          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              color: 'white',
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
    </>
  );
}
