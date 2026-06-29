"use client";

import { motion } from "framer-motion";
import { gradients, shadows, colors } from "@/design-system";
import { radius } from "@/design-system/spacing";
import { hover } from "@/design-system/motion";

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
  fontWeight: 700,
  fontSize: "15px",
  border: "none",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  textDecoration: "none",
  transition: "all 0.2s ease",
};

const variants: Record<ButtonVariant, (trackColor?: string) => React.CSSProperties> = {
  primary: () => ({
    ...baseStyle,
    background: gradients.primaryCta,
    color: "white",
    padding: "14px 32px",
    boxShadow: shadows.primaryButton,
  }),
  outline: () => ({
    ...baseStyle,
    background: "transparent",
    color: "white",
    padding: "14px 32px",
    border: "1.5px solid rgba(255,255,255,0.3)",
    fontWeight: 600,
  }),
  track: (trackColor) => ({
    ...baseStyle,
    background: gradients.trackButton(trackColor || colors.brand.teal),
    color: "white",
    padding: "14px 32px",
    boxShadow: shadows.trackButton(trackColor || colors.brand.teal),
  }),
  frosted: () => ({
    ...baseStyle,
    backgroundColor: "rgba(255,255,255,0.15)",
    color: "white",
    padding: "12px 28px",
    fontSize: "14px",
    border: "1.5px solid rgba(255,255,255,0.2)",
    backdropFilter: "blur(4px)",
  }),
  inverted: () => ({
    ...baseStyle,
    backgroundColor: "white",
    color: colors.brand.tealDark,
    padding: "16px 48px",
    fontWeight: 800,
    fontSize: "16px",
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
