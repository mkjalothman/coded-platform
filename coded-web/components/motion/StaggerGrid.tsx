"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StaggerGridProps {
  children: React.ReactNode[];
  className?: string;
  style?: React.CSSProperties;
  staggerDelay?: number;
}

export default function StaggerGrid({
  children,
  className,
  style,
  staggerDelay = 0.1,
}: StaggerGridProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className={className} style={style}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={
            inView
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 30, scale: 0.97 }
          }
          transition={{
            duration: 0.5,
            delay: i * staggerDelay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
