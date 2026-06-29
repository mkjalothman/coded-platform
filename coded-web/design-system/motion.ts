export const easings = {
  smooth: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
};

export const reveal = {
  initial: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  hidden: (y: number = 30) => ({ opacity: 0, y }),
  transition: (duration: number = 0.6, delay: number = 0) => ({
    duration,
    delay,
    ease: easings.smooth,
  }),
  viewMargin: "-60px" as const,
};

export const stagger = {
  initial: { opacity: 0, y: 30, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
  viewMargin: "-40px" as const,
  transition: (i: number, staggerDelay: number = 0.1) => ({
    duration: 0.5,
    delay: i * staggerDelay,
    ease: easings.smooth,
  }),
};

export const hover = {
  card: {
    whileHover: { y: -6, scale: 1.02, boxShadow: "0 12px 40px rgba(0,0,0,0.12)" },
    transition: { duration: 0.25, ease: "easeOut" as const },
  },
  buttonScale: {
    whileHover: { scale: 1.04 },
    whileTap: { scale: 0.97 },
  },
  buttonScaleLarge: {
    whileHover: { scale: 1.06 },
    whileTap: { scale: 0.97 },
  },
};

export const heroStagger = {
  delays: [0.2, 0.4, 0.6, 0.8],
  transition: (delay: number) => ({
    duration: 0.6,
    delay,
  }),
};
