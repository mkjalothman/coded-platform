import type { ReactNode } from "react";

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Bootcamps", href: "#bootcamps" },
  { label: "Companies", href: "#companies" },
  { label: "Kids & Youth", href: "#audience" },
  { label: "Community", href: "#community" },
  { label: "About", href: "#about" },
];

export interface FooterSection {
  title: string;
  links: { label: string; href: string }[];
}

export const footerSections: FooterSection[] = [
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

export interface SocialLink {
  label: string;
  href: string;
  iconPath: string;
  fill?: boolean;
  viewBox?: string;
}

export const socialLinks: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://instagram.com/joincoded",
    iconPath: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/joincoded",
    iconPath: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@joincoded",
    iconPath: '<path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.51a8.27 8.27 0 0 0 4.76 1.5v-3.4a4.85 4.85 0 0 1-1-.08z"/>',
    fill: true,
  },
  {
    label: "X",
    href: "https://x.com/joincoded",
    iconPath: '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>',
    fill: true,
  },
];

export const chatStarters = [
  "I'm a university student",
  "Training for my company",
  "My kid wants to learn to code",
  "Which bootcamp is right for me?",
];
