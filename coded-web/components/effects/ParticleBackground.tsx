"use client";

import { useCallback, useMemo } from "react";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";
import { useTheme } from "@/components/providers/ThemeContext";

const THEME_PARTICLES: Record<string, { color: string; opacity: number; speed: number; count: number }> = {
  bootcamp:   { color: "#00b8a9", opacity: 0.3,  speed: 0.8, count: 60 },
  kids:       { color: "#ef4444", opacity: 0.25, speed: 1.2, count: 45 },
  youth:      { color: "#3b82f6", opacity: 0.35, speed: 1.5, count: 75 },
  enterprise: { color: "#6366f1", opacity: 0.2,  speed: 0.4, count: 35 },
};

function ParticleCanvas({ color, opacity, speed, count }: { color: string; opacity: number; speed: number; count: number }) {
  const options = useMemo(() => ({
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" as const },
        onClick: { enable: true, mode: "push" as const },
      },
      modes: {
        grab: { distance: 140, links: { opacity: 0.5 } },
        push: { quantity: 4 },
      },
    },
    particles: {
      color: { value: color },
      links: { color, distance: 150, enable: true, opacity: 0.15, width: 1 },
      move: { direction: "none" as const, enable: true, outModes: { default: "bounce" as const }, random: false, speed, straight: false },
      number: { density: { enable: true, width: 900, height: 900 }, value: count },
      opacity: { value: opacity },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  }), [color, opacity, speed, count]);

  return (
    <Particles
      id="tsparticles"
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}
      options={options}
    />
  );
}

export default function ParticleBackground() {
  const { theme } = useTheme();
  const tp = THEME_PARTICLES[theme] ?? THEME_PARTICLES.bootcamp;

  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <ParticlesProvider init={init}>
      <ParticleCanvas color={tp.color} opacity={tp.opacity} speed={tp.speed} count={tp.count} />
    </ParticlesProvider>
  );
}
