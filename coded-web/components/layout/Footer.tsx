"use client";

import { colors, overlay } from "@/design-system";
import { fontSize, fontWeight } from "@/design-system/typography";
import { spacing, radius } from "@/design-system/spacing";
import { cssTransition } from "@/design-system/motion";
import { footerSections, socialLinks } from "@/data/navigation";

function smoothScroll(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (href.startsWith("#")) {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

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
        transition: cssTransition.color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        borderRadius: radius.socialIcon,
        backgroundColor: overlay.subtleBg,
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
    <footer className="theme-transition" style={{ backgroundColor: "rgba(20, 36, 63, 0.85)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", position: "relative", zIndex: 1 }}>
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
                fontSize: fontSize.eyebrow,
                letterSpacing: "0.15em",
                fontWeight: fontWeight.semibold,
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
                  color: colors.text.headingLight,
                  fontSize: fontSize.small,
                  fontWeight: fontWeight.bold,
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
                        onClick={(e) => smoothScroll(e, link.href)}
                        target={link.href.startsWith("http") || link.href.startsWith("mailto:") || link.href.startsWith("tel:") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        style={{
                          color: colors.text.bodyDark,
                          fontSize: fontSize.small,
                          textDecoration: "none",
                          transition: cssTransition.color,
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
