"use client";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { label: "Bootcamps", href: "#bootcamps" },
  { label: "Companies", href: "#companies" },
  { label: "Kids & Youth", href: "#audience" },
  { label: "Community", href: "#community" },
  { label: "About", href: "#about" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 60 }}>
      <div
        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
        onClick={onClose}
      />
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        maxWidth: '320px',
        backgroundColor: '#0d1436',
        borderLeft: '1px solid #1e2d6b',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#8892b0',
              cursor: 'pointer',
              padding: '8px',
            }}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 500,
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div style={{ marginTop: 'auto', paddingTop: '32px' }}>
          <a
            href="#apply"
            onClick={onClose}
            style={{
              display: 'block',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #00b8a9 0%, #00a896 100%)',
              color: 'white',
              padding: '14px 32px',
              borderRadius: '999px',
              fontWeight: 700,
              fontSize: '15px',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(0,184,169,0.3)',
            }}
          >
            Apply Now
          </a>
        </div>
      </div>
    </div>
  );
}
