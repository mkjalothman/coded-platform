"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { easing } from "@/design-system/motion";

type Direction = "up" | "down" | "left" | "right" | "scale" | "none";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  style?: React.CSSProperties;
  once?: boolean;
  stagger?: number;
  as?: keyof typeof motion;
}

const getInitial = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up":    return { opacity: 0, y: distance };
    case "down":  return { opacity: 0, y: -distance };
    case "left":  return { opacity: 0, x: -distance };
    case "right": return { opacity: 0, x: distance };
    case "scale": return { opacity: 0, scale: 0.92 };
    case "none":  return { opacity: 0 };
  }
};

const getVisible = (direction: Direction) => {
  switch (direction) {
    case "up":
    case "down":  return { opacity: 1, y: 0 };
    case "left":
    case "right": return { opacity: 1, x: 0 };
    case "scale": return { opacity: 1, scale: 1 };
    case "none":  return { opacity: 1 };
  }
};

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 40,
  className,
  style,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-60px" });
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={getInitial(direction, distance)}
      animate={inView ? getVisible(direction) : getInitial(direction, distance)}
      transition={{
        duration,
        delay,
        ease: easing.apple,
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerReveal({
  children,
  className,
  style,
  staggerDelay = 0.1,
  direction = "up",
  distance = 30,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  staggerDelay?: number;
  direction?: Direction;
  distance?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  style,
  direction = "up",
  distance = 30,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  direction?: Direction;
  distance?: number;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: getInitial(direction, distance),
        visible: {
          ...getVisible(direction),
          transition: { duration: 0.6, ease: easing.apple },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
