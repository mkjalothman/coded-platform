export const colors = {
  brand: {
    teal: "#00b8a9",
    tealDark: "#00a896",
    navy: "#14243f",
    navyDeep: "#14243f",
    navyMid: "#1a2d52",
  },

  track: {
    cybersecurity: "#1a2570",
    aiAppDev: "#00b8a9",
    agenticAi: "#2d6a4f",
    aiDataScience: "#9b59b6",
  } as Record<string, string>,

  audience: {
    kids: "#ef4444",
    youth: "#3b82f6",
    enterprise: "#0a0f2e",
  },

  surface: {
    light: "#f4f5f7",
    white: "#ffffff",
    dark: "#14243f",
    darkCard: "#1a2d52",
  },

  text: {
    heading: "#0a0f2e",
    headingLight: "#ffffff",
    body: "#6b7280",
    bodyDark: "#8892b0",
    bodySubtle: "#cbd5e1",
    bodyChat: "#e2e8f0",
    navDefault: "rgba(255,255,255,0.7)",
    onDarkMuted: "rgba(255,255,255,0.7)",
    onColoredMuted: "rgba(255,255,255,0.75)",
    onCtaMuted: "rgba(255,255,255,0.85)",
  },

  border: {
    light: "#e5e7eb",
    cardSubtle: "rgba(0,0,0,0.04)",
    dark: "#1e3a6e",
    navScrolled: "rgba(30,58,110,0.6)",
  },
} as const;

export const gradients = {
  primaryCta: "linear-gradient(135deg, #00b8a9 0%, #00a896 100%)",
  heroGlow: "radial-gradient(ellipse 70% 50% at 50% 50%, #1a3a8a33 0%, transparent 70%)",
  trackButton: (color: string) => `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
} as const;

export const shadows = {
  card: "0 2px 16px rgba(0,0,0,0.06)",
  primaryButton: "0 4px 16px rgba(0,184,169,0.3)",
  trackButton: (color: string) => `0 4px 16px ${color}4d`,
  ctaButton: "0 4px 24px rgba(0,0,0,0.15)",
  navbarScrolled: "0 4px 20px rgba(0,0,0,0.3)",
  chatFloat: "0 4px 20px rgba(0,184,169,0.4)",
  chatFloatHover: "0 6px 28px rgba(0,184,169,0.5)",
  chatPanel: "0 12px 48px rgba(0,0,0,0.25)",
  hoverCard: "0 12px 40px rgba(0,0,0,0.12)",
} as const;

export const overlay = {
  frostedBg: "rgba(255,255,255,0.15)",
  frostedBorder: "rgba(255,255,255,0.2)",
  subtleBg: "rgba(255,255,255,0.05)",
  backdrop: "rgba(0,0,0,0.5)",
} as const;
