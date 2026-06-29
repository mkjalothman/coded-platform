import { colors } from "./colors";

export const fontSize = {
  hero: "var(--font-size-hero)",
  h2: "var(--font-size-h2)",
  h3: "22px",
  subtitle: "18px",
  body: "16px",
  nav: "15px",
  small: "14px",
  chip: "13px",
  caption: "12px",
  eyebrow: "11px",
  stat: "64px",
} as const;

export const fontWeight = {
  black: 800,
  bold: 700,
  semibold: 600,
  medium: 500,
} as const;

export const lineHeight = {
  tight: 1.1,
  stat: 1,
  normal: 1.6,
  relaxed: 1.7,
  loose: 1.75,
} as const;

export const eyebrowStyle: React.CSSProperties = {
  color: colors.brand.teal,
  fontSize: fontSize.eyebrow,
  letterSpacing: "0.15em",
  fontWeight: fontWeight.semibold,
  textTransform: "uppercase",
  textAlign: "center",
  marginBottom: "16px",
};

export const sectionHeadingStyle = (color: string = colors.text.heading): React.CSSProperties => ({
  fontSize: fontSize.h2,
  fontWeight: fontWeight.black,
  color,
  textAlign: "center",
  marginBottom: "16px",
  lineHeight: lineHeight.tight,
});

export const bodyStyle: React.CSSProperties = {
  color: colors.text.body,
  fontSize: fontSize.body,
  lineHeight: lineHeight.relaxed,
};
