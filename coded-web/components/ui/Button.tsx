"use client";

import { motion } from "framer-motion";
import { gradients, shadows, colors, overlay } from "@/design-system";
import { fontSize as fs, fontWeight as fw } from "@/design-system/typography";
import { radius, spacing } from "@/design-system/spacing";
import { hover, cssTransition } from "@/design-system/motion";

type ButtonVariant = "primary" | "outline" | "track" | "frosted" | "inverted";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  trackColor?: string;
  href?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

const baseStyle: React.CSSProperties = {
  borderRadius: radius.pill,
  fontWeight: fw.bold,
  fontSize: fs.nav,
  border: "none",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: spacing.gap.xs,
  textDecoration: "none",
  transition: cssTransition.all,
};

const variants: Record<ButtonVariant, (trackColor?: string) => React.CSSProperties> = {
  primary: () => ({
    ...baseStyle,
    background: gradients.primaryCta,
    color: colors.text.headingLight,
    padding: "14px 32px",
    boxShadow: shadows.primaryButton,
  }),
  outline: () => ({
    ...baseStyle,
    background: "transparent",
    color: colors.text.headingLight,
    padding: "14px 32px",
    border: `1.5px solid ${overlay.frostedBorder}`,
    fontWeight: fw.semibold,
  }),
  track: (trackColor) => ({
    ...baseStyle,
    background: gradients.trackButton(trackColor || colors.brand.teal),
    color: colors.text.headingLight,
    padding: "14px 32px",
    boxShadow: shadows.trackButton(trackColor || colors.brand.teal),
  }),
  frosted: () => ({
    ...baseStyle,
    backgroundColor: overlay.frostedBg,
    color: colors.text.headingLight,
    padding: "12px 28px",
    fontSize: fs.small,
    border: `1.5px solid ${overlay.frostedBorder}`,
    backdropFilter: "blur(4px)",
  }),
  inverted: () => ({
    ...baseStyle,
    backgroundColor: colors.surface.white,
    color: colors.brand.tealDark,
    padding: "16px 48px",
    fontWeight: fw.black,
    fontSize: fs.body,
    boxShadow: shadows.ctaButton,
  }),
};

export default function Button({
  children,
  variant = "primary",
  trackColor,
  href,
  onClick,
  style: extraStyle,
  className,
}: ButtonProps) {
  const variantStyle = variants[variant](trackColor);
  const combined = { ...variantStyle, ...extraStyle };
  const hoverPreset = variant === "inverted" ? hover.buttonScaleLarge : hover.buttonScale;

  if (href) {
    return (
      <motion.a href={href} style={combined} className={className} {...hoverPreset}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button onClick={onClick} style={combined} className={className} {...hoverPreset}>
      {children}
    </motion.button>
  );
}
