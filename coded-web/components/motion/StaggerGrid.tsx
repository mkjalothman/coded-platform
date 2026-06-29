"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { stagger } from "@/design-system/motion";

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
  staggerDelay = 0.08,
}: StaggerGridProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: stagger.viewMargin });

  return (
    <div ref={ref} className={className} style={style}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={stagger.initial}
          animate={inView ? stagger.visible : stagger.initial}
          transition={stagger.transition(i, staggerDelay)}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
