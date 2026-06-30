"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "@/components/providers/ThemeContext";

const THEME_COLORS: Record<string, { primary: string; secondary: string }> = {
  bootcamp:   { primary: "#00b8a9", secondary: "#1a5c6e" },
  kids:       { primary: "#ef4444", secondary: "#7a2020" },
  youth:      { primary: "#3b82f6", secondary: "#1e3a6e" },
  enterprise: { primary: "#6366f1", secondary: "#3a2d7a" },
};

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseSpeed: number;
  r: number;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export default function GlobalNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const scrollRef = useRef(0);
  const rafRef = useRef(0);
  const colorRef = useRef({ primary: [0, 184, 169], secondary: [26, 92, 110] });
  const targetColorRef = useRef({ primary: [0, 184, 169], secondary: [26, 92, 110] });
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const tc = THEME_COLORS[theme] ?? THEME_COLORS.bootcamp;
    targetColorRef.current = {
      primary: hexToRgb(tc.primary),
      secondary: hexToRgb(tc.secondary),
    };
  }, [theme]);

  const nodeCount = isMobile ? 28 : 55;
  const linkDist = isMobile ? 120 : 160;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    if (nodesRef.current.length !== nodeCount) {
      nodesRef.current = Array.from({ length: nodeCount }, () => {
        const speed = 0.15 + Math.random() * 0.25;
        const angle = Math.random() * Math.PI * 2;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          baseSpeed: speed,
          r: 1.2 + Math.random() * 1.3,
        };
      });
    }

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    const onResize = () => resize();

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    function tick() {
      const nodes = nodesRef.current;
      const c = colorRef.current;
      const tc = targetColorRef.current;

      c.primary[0] = lerp(c.primary[0], tc.primary[0], 0.03);
      c.primary[1] = lerp(c.primary[1], tc.primary[1], 0.03);
      c.primary[2] = lerp(c.primary[2], tc.primary[2], 0.03);
      c.secondary[0] = lerp(c.secondary[0], tc.secondary[0], 0.03);
      c.secondary[1] = lerp(c.secondary[1], tc.secondary[1], 0.03);
      c.secondary[2] = lerp(c.secondary[2], tc.secondary[2], 0.03);

      const scroll = scrollRef.current;
      const maxScroll = document.documentElement.scrollHeight - h;
      const scrollProg = maxScroll > 0 ? Math.min(scroll / maxScroll, 1) : 0;
      const speedMult = 1 + scrollProg * 0.5;

      ctx!.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const n of nodes) {
        n.x += n.vx * speedMult;
        n.y += n.vy * speedMult;

        if (n.x < -10) n.x = w + 10;
        if (n.x > w + 10) n.x = -10;
        if (n.y < -10) n.y = h + 10;
        if (n.y > h + 10) n.y = -10;

        const dx = mx - n.x;
        const dy = my - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200 * 0.008;
          n.vx += dx * force;
          n.vy += dy * force;
        }

        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (speed > n.baseSpeed * 2.5) {
          n.vx *= 0.98;
          n.vy *= 0.98;
        }
      }

      const pr = c.primary;
      const sr = c.secondary;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDist) {
            const alpha = (1 - dist / linkDist) * 0.12;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.strokeStyle = `rgba(${pr[0] | 0},${pr[1] | 0},${pr[2] | 0},${alpha})`;
            ctx!.lineWidth = 0.8;
            ctx!.stroke();
          }
        }
      }

      for (const n of nodes) {
        const dist = Math.sqrt((mx - n.x) ** 2 + (my - n.y) ** 2);
        const nearMouse = dist < 200;
        const nodeAlpha = nearMouse ? 0.5 + (200 - dist) / 200 * 0.4 : 0.25;
        const nodeR = nearMouse ? n.r * 1.4 : n.r;

        ctx!.beginPath();
        ctx!.arc(n.x, n.y, nodeR, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${pr[0] | 0},${pr[1] | 0},${pr[2] | 0},${nodeAlpha})`;
        ctx!.fill();

        if (nearMouse) {
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, nodeR + 3, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${pr[0] | 0},${pr[1] | 0},${pr[2] | 0},0.06)`;
          ctx!.fill();
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [nodeCount, linkDist, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
