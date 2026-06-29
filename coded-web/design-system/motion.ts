// Centralized motion system — Apple-level UI interactions
// All animation values are Framer Motion-compatible

// --- Easing Curves ---
// Inspired by Apple's HIG and modern AI-native interfaces

export const easing = {
  // Primary easing — smooth deceleration, feels natural and premium
  smooth: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
  // Apple-style spring-like ease — fast attack, gentle settle
  apple: [0.22, 1.0, 0.36, 1.0] as [number, number, number, number],
  // Emphatic entrance — overshoots slightly then settles (perceived snappiness)
  overshoot: [0.34, 1.56, 0.64, 1.0] as [number, number, number, number],
  // Gentle ease-out for exits and collapses
  gentleOut: [0.0, 0.0, 0.58, 1.0] as [number, number, number, number],
  // Linear for marquee / infinite loops
  linear: [0, 0, 1, 1] as [number, number, number, number],
  // Elastic settle — spring-like without physics config
  elastic: [0.68, -0.55, 0.27, 1.55] as [number, number, number, number],
};

// --- Duration Scale ---
// Consistent timing tokens (seconds)

export const duration = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.35,
  medium: 0.5,
  slow: 0.7,
  slower: 1.0,
  counter: 2.0,
};

// --- Delay Scale ---

export const delay = {
  none: 0,
  micro: 0.05,
  short: 0.1,
  medium: 0.2,
  long: 0.4,
  hero: [0.15, 0.3, 0.5, 0.7] as readonly number[],
};

// --- Spring Presets ---
// Physics-based springs for natural motion

export const spring = {
  gentle: { type: "spring" as const, stiffness: 120, damping: 14, mass: 1 },
  snappy: { type: "spring" as const, stiffness: 300, damping: 24, mass: 0.8 },
  bouncy: { type: "spring" as const, stiffness: 400, damping: 15, mass: 0.5 },
};

// --- Reveal Variants (scroll-triggered entrances) ---

export const reveal = {
  fadeUp: {
    initial: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    initial: { opacity: 0, y: -16 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeScale: {
    initial: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
  },
  slideLeft: {
    initial: { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    initial: { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0 },
  },
  transition: (dur: number = duration.medium, del: number = delay.none) => ({
    duration: dur,
    delay: del,
    ease: easing.apple,
  }),
  viewMargin: "-80px" as const,
};

// --- Stagger Variants (children entrance orchestration) ---

export const stagger = {
  container: {
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay.short,
      },
    },
  },
  item: {
    initial: { opacity: 0, y: 20, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: duration.medium,
        ease: easing.apple,
      },
    },
  },
  // Legacy function API for StaggerGrid component
  initial: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
  viewMargin: "-60px" as const,
  transition: (i: number, staggerDelay: number = 0.08) => ({
    duration: duration.medium,
    delay: i * staggerDelay,
    ease: easing.apple,
  }),
};

// --- Hover Interactions ---

export const hover = {
  card: {
    whileHover: {
      y: -6,
      scale: 1.018,
      boxShadow: "0 16px 48px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
    },
    transition: { duration: duration.normal, ease: easing.apple },
  },
  cardSubtle: {
    whileHover: { y: -3, scale: 1.008 },
    transition: { duration: duration.normal, ease: easing.apple },
  },
  buttonScale: {
    whileHover: { scale: 1.04 },
    whileTap: { scale: 0.97 },
    transition: { duration: duration.fast, ease: easing.apple },
  },
  buttonScaleLarge: {
    whileHover: { scale: 1.06 },
    whileTap: { scale: 0.96 },
    transition: { duration: duration.fast, ease: easing.apple },
  },
  glow: {
    whileHover: {
      boxShadow: "0 0 20px rgba(0, 184, 169, 0.3), 0 8px 32px rgba(0, 184, 169, 0.15)",
    },
    transition: { duration: duration.normal, ease: easing.smooth },
  },
  lift: {
    whileHover: { y: -2 },
    whileTap: { y: 0 },
    transition: { duration: duration.fast, ease: easing.apple },
  },
};

// --- Hero Stagger (page entrance orchestration) ---

export const heroStagger = {
  delays: delay.hero,
  transition: (del: number) => ({
    duration: duration.slow,
    delay: del,
    ease: easing.apple,
  }),
};

// --- Accordion / Expand-Collapse ---

export const accordion = {
  expand: {
    initial: { height: 0, opacity: 0 },
    animate: { height: "auto" as const, opacity: 1 },
    exit: { height: 0, opacity: 0 },
    transition: { duration: duration.normal, ease: easing.gentleOut },
  },
  rotate: (isOpen: boolean) => ({
    animate: { rotate: isOpen ? 45 : 0 },
    transition: { duration: duration.fast, ease: easing.apple },
  }),
};

// --- Marquee / Infinite Scroll ---

export const marquee = {
  animate: { x: ["0%", "-50%"] as [string, string] },
  transition: (dur: number = 25) => ({
    x: {
      repeat: Infinity,
      repeatType: "loop" as const,
      duration: dur,
      ease: "linear" as const,
    },
  }),
};

// --- Navbar ---

export const navbar = {
  transition: `all ${duration.normal}s cubic-bezier(${easing.apple.join(",")})`,
};

// --- CSS Transition Strings (for inline style transitions) ---

export const cssTransition = {
  color: `color ${duration.fast}s cubic-bezier(${easing.smooth.join(",")})`,
  background: `background-color ${duration.fast}s cubic-bezier(${easing.smooth.join(",")})`,
  all: `all ${duration.fast}s cubic-bezier(${easing.smooth.join(",")})`,
  allSlow: `all ${duration.normal}s cubic-bezier(${easing.apple.join(",")})`,
  transform: `transform ${duration.fast}s cubic-bezier(${easing.apple.join(",")})`,
  shadow: `box-shadow ${duration.normal}s cubic-bezier(${easing.smooth.join(",")})`,
};

// --- Backward compat aliases ---
export const easings = { smooth: easing.smooth };
