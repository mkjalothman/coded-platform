"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

export default function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  y = 30,
  className,
  once = true,
}: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
