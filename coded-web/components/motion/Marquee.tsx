"use client";

import { motion } from "framer-motion";

interface MarqueeProps {
  children: React.ReactNode;
  duration?: number;
}

export default function Marquee({ children, duration = 25 }: MarqueeProps) {
  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <motion.div
        style={{ display: "flex", gap: "48px", width: "max-content" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration,
            ease: "linear",
          },
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
