"use client";

import { motion } from "framer-motion";

interface HoverCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function HoverCard({ children, style }: HoverCardProps) {
  return (
    <motion.div
      style={style}
      whileHover={{
        y: -6,
        scale: 1.02,
        boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
