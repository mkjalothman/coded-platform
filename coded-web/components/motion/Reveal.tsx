"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { reveal } from "@/design-system/motion";

type RevealVariant = "fadeUp" | "fadeDown" | "fadeIn" | "fadeScale" | "slideLeft" | "slideRight";

interface RevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export default function Reveal({
  children,
  variant = "fadeUp",
  delay: delayOverride = 0,
  duration: durationOverride,
  className,
  once = true,
}: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: reveal.viewMargin });
  const v = reveal[variant];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={v.initial}
      animate={inView ? v.visible : v.initial}
      transition={reveal.transition(durationOverride, delayOverride)}
    >
      {children}
    </motion.div>
  );
}
