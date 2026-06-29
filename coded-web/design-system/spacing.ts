export const spacing = {
  sectionY: "96px",
  sectionYCompact: "56px",
  containerMax: "1152px",
  containerPadding: "0 40px",
  cardPadding: "32px",
  cardPaddingLarge: "36px",
  cardGap: "24px",
  eyebrowToHeading: "16px",
  headingToContent: "56px",
  ctaTopMargin: "40px",
  navbarHeight: "64px",
  gap: {
    xs: "8px",
    sm: "12px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "40px",
    section: "48px",
  },
} as const;

export const containerStyle: React.CSSProperties = {
  maxWidth: spacing.containerMax,
  width: "100%",
  margin: "0 auto",
  padding: spacing.containerPadding,
};

export const sectionStyle = (bg: string, padding: string = spacing.sectionY): React.CSSProperties => ({
  backgroundColor: bg,
  padding: `${padding} 0`,
  width: "100%",
});

export const radius = {
  card: "16px",
  pill: "999px",
  socialIcon: "8px",
  input: "12px",
} as const;
