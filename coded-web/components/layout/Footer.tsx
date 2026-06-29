"use client";

import { colors } from "@/design-system";
import { spacing } from "@/design-system/spacing";
import { footerSections, socialLinks } from "@/data/navigation";

function SocialIcon({ href, label, iconPath, fill }: {
  href: string;
  label: string;
  iconPath: string;
  fill?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: colors.text.bodyDark,
        transition: "color 0.2s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        borderRadius: "8px",
        backgroundColor: "rgba(255,255,255,0.05)",
      }}
      onMouseEnter={e => (e.currentTarget.style.color = colors.brand.teal)}
      onMouseLeave={e => (e.currentTarget.style.color = colors.text.bodyDark)}
      aria-label={label}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={fill ? "currentColor" : "none"}
        stroke={fill ? undefined : "currentColor"}
        strokeWidth={fill ? undefined : "2"}
        strokeLinecap={fill ? undefined : "round"}
        strokeLinejoin={fill ? undefined : "round"}
        dangerouslySetInnerHTML={{ __html: iconPath }}
      />
    </a>
  );
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: colors.surface.dark }}>
      <div style={{
        maxWidth: spacing.containerMax,
        margin: "0 auto",
        padding: spacing.containerPadding,
      }}>
        <div style={{ padding: "64px 0 48px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
            gap: "48px",
          }} className="footer-grid">
            <div>
              <a href="/" style={{
                border: "2px solid white",
                padding: "4px 10px",
                display: "inline-block",
                textDecoration: "none",
                marginBottom: "16px",
              }}>
                <span style={{ color: "white", fontWeight: 700, fontSize: "18px" }}>CODED</span>
              </a>
              <p style={{
                color: colors.text.bodyDark,
                fontSize: "11px",
                letterSpacing: "0.15em",
                fontWeight: 600,
                textTransform: "uppercase",
                lineHeight: 1.6,
                maxWidth: "200px",
                marginBottom: "24px",
              }}>
                The Go-To Place for AI & Tech Education in Kuwait
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {socialLinks.map(social => (
                  <SocialIcon
                    key={social.label}
                    href={social.href}
                    label={social.label}
                    iconPath={social.iconPath}
                    fill={social.fill}
                  />
                ))}
              </div>
            </div>

            {footerSections.map(section => (
              <div key={section.title}>
                <h3 style={{
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "20px",
                  letterSpacing: "0.02em",
                }}>
                  {section.title}
                </h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                  {section.links.map(link => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        style={{
                          color: colors.text.bodyDark,
                          fontSize: "14px",
                          textDecoration: "none",
                          transition: "color 0.2s ease",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = "white")}
                        onMouseLeave={e => (e.currentTarget.style.color = colors.text.bodyDark)}
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
          borderTop: `1px solid ${colors.border.dark}`,
          padding: "24px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}>
          <span style={{ color: colors.text.bodyDark, fontSize: "13px" }}>
            2026 &copy; CODED. All rights reserved.
          </span>
          <span style={{ color: colors.text.bodyDark, fontSize: "13px" }}>
            Kuwait Free Trade Zone
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
