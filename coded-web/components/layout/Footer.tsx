import Link from "next/link";

const footerSections = [
  {
    title: "Bootcamps",
    links: [
      { label: "Web Development", href: "/bootcamps/web-development" },
      { label: "Data Science & AI", href: "/bootcamps/data-science" },
      { label: "Cybersecurity", href: "/bootcamps/cybersecurity" },
      { label: "AI App Developer", href: "/bootcamps/ai-app-developer" },
    ],
  },
  {
    title: "Programs",
    links: [
      { label: "Kids & Youth", href: "/youth" },
      { label: "For Companies", href: "/companies" },
      { label: "Community", href: "/community" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/joincoded",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.51a8.27 8.27 0 0 0 4.76 1.5v-3.4a4.85 4.85 0 0 1-1-.08z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-coded-border bg-coded-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="inline-flex items-center">
                <span className="text-xl font-bold tracking-tight text-coded-white">
                  CODED
                </span>
              </Link>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-coded-muted max-w-xs leading-relaxed">
                The go-to place for AI &amp; tech education
              </p>
              <div className="mt-6 flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-coded-muted hover:text-coded-white transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-coded-white">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-coded-muted hover:text-coded-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-coded-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-coded-muted">
            <span>2026 &copy; CODED</span>
            <span className="hidden sm:inline">|</span>
            <a href="tel:+96560791018" className="hover:text-coded-white transition-colors">
              +965 6079 1018
            </a>
            <span className="hidden sm:inline">|</span>
            <a href="mailto:hello@joincoded.com" className="hover:text-coded-white transition-colors">
              hello@joincoded.com
            </a>
          </div>
          <div className="text-xs text-coded-muted">
            Kuwait Free Trade Zone
          </div>
        </div>
      </div>
    </footer>
  );
}
