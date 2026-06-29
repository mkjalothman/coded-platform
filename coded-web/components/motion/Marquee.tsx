"use client";

import { motion } from "framer-motion";
import { marquee as marqueeMotion, spacing } from "@/design-system";

interface MarqueeProps {
  children: React.ReactNode;
  duration?: number;
}

export default function Marquee({ children, duration = 25 }: MarqueeProps) {
  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <motion.div
        style={{ display: "flex", gap: spacing.gap.section, width: "max-content" }}
        animate={marqueeMotion.animate}
        transition={marqueeMotion.transition(duration)}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
