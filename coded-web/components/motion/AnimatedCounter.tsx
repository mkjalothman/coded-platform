"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  style?: React.CSSProperties;
  className?: string;
}

export default function AnimatedCounter({
  target,
  suffix = "",
  duration = 2,
  style,
  className,
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(target);

  useEffect(() => {
    if (!inView) return;

    setCount(0);
    let start = 0;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      if (current !== start) {
        start = current;
        setCount(current);
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return (
    <span ref={ref} style={style} className={className}>
      {count}
      {suffix}
    </span>
  );
}
