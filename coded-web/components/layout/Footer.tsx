"use client";

const footerSections = [
  {
    title: "Programs",
    links: [
      { label: "Cybersecurity", href: "#" },
      { label: "AI App Developer", href: "#" },
      { label: "Agentic AI", href: "#" },
      { label: "AI & Data Science", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "For Companies", href: "#" },
      { label: "Kids & Youth", href: "#" },
      { label: "Community", href: "#" },
      { label: "About Us", href: "#" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "hello@joincoded.com", href: "mailto:hello@joincoded.com" },
      { label: "+965 6079 1018", href: "tel:+96560791018" },
      { label: "Kuwait Free Trade Zone", href: "#" },
      { label: "coded.kw", href: "https://coded.kw" },
    ],
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/joincoded",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/joincoded",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@joincoded",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.51a8.27 8.27 0 0 0 4.76 1.5v-3.4a4.85 4.85 0 0 1-1-.08z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/joincoded",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0d1436' }}>
      <div style={{
        maxWidth: '1152px',
        margin: '0 auto',
        padding: '0 40px',
      }}>
        <div style={{ padding: '64px 0 48px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
            gap: '48px',
          }} className="footer-grid">
            <div>
              <a href="/" style={{
                border: '2px solid white',
                padding: '4px 10px',
                display: 'inline-block',
                textDecoration: 'none',
                marginBottom: '16px',
              }}>
                <span style={{ color: 'white', fontWeight: 700, fontSize: '18px' }}>CODED</span>
              </a>
              <p style={{
                color: '#8892b0',
                fontSize: '11px',
                letterSpacing: '0.15em',
                fontWeight: 600,
                textTransform: 'uppercase',
                lineHeight: 1.6,
                maxWidth: '200px',
                marginBottom: '24px',
              }}>
                The Go-To Place for AI & Tech Education in Kuwait
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {socialLinks.map(social => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#8892b0',
                      transition: 'color 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#00b8a9')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#8892b0')}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {footerSections.map(section => (
              <div key={section.title}>
                <h3 style={{
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 700,
                  marginBottom: '20px',
                  letterSpacing: '0.02em',
                }}>
                  {section.title}
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {section.links.map(link => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        style={{
                          color: '#8892b0',
                          fontSize: '14px',
                          textDecoration: 'none',
                          transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#8892b0')}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          borderTop: '1px solid #1e2d6b',
          padding: '24px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <span style={{ color: '#8892b0', fontSize: '13px' }}>
            2026 &copy; CODED. All rights reserved.
          </span>
          <span style={{ color: '#8892b0', fontSize: '13px' }}>
            Kuwait Free Trade Zone
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
