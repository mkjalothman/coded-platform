"use client";

import HoverCard from "@/components/motion/HoverCard";
import { colors, shadows, radius } from "@/design-system";

type CardVariant = "light" | "dark" | "colored";

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  bg?: string;
  style?: React.CSSProperties;
}

const variantStyles: Record<CardVariant, React.CSSProperties> = {
  light: {
    backgroundColor: colors.surface.white,
    borderRadius: radius.card,
    boxShadow: shadows.card,
    border: `1px solid ${colors.border.cardSubtle}`,
  },
  dark: {
    backgroundColor: colors.surface.darkCard,
    borderRadius: radius.card,
    border: `1px solid ${colors.border.dark}`,
  },
  colored: {
    borderRadius: radius.card,
  },
};

export default function Card({ children, variant = "light", bg, style }: CardProps) {
  const base = variantStyles[variant];
  const combined: React.CSSProperties = {
    ...base,
    ...(bg ? { backgroundColor: bg } : {}),
    padding: "32px",
    ...style,
  };

  return (
    <HoverCard style={combined}>
      {children}
    </HoverCard>
  );
}
