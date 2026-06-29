"use client";

import { motion } from "framer-motion";
import { hover } from "@/design-system/motion";

interface HoverCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  variant?: "default" | "subtle";
}

export default function HoverCard({ children, style, variant = "default" }: HoverCardProps) {
  const preset = variant === "subtle" ? hover.cardSubtle : hover.card;

  return (
    <motion.div
      style={style}
      whileHover={preset.whileHover}
      transition={preset.transition}
    >
      {children}
    </motion.div>
  );
}
