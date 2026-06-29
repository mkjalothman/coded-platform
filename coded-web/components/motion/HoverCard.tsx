"use client";

import { motion } from "framer-motion";
import { hover } from "@/design-system/motion";

interface HoverCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function HoverCard({ children, style }: HoverCardProps) {
  return (
    <motion.div
      style={style}
      whileHover={hover.card.whileHover}
      transition={hover.card.transition}
    >
      {children}
    </motion.div>
  );
}
