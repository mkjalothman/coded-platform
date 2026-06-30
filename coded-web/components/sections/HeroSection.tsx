"use client";

import { useRef, useCallback, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import ParticleBackground from "@/components/effects/ParticleBackground";
import FloatingCode from "@/components/effects/FloatingCode";
import TypewriterText from "@/components/effects/TypewriterText";
import { heroStagger, reveal } from "@/design-system";
import { fontSize, fontWeight, lineHeight } from "@/design-system/typography";
import { containerStyle, spacing } from "@/design-system/spacing";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const reducedMotion = useReducedMotion();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setGlowPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, [reducedMotion]);

  const fade = (del: number) => ({
    initial: reveal.fadeUp.initial,
    animate: reveal.fadeUp.visible,
    transition: heroStagger.transition(del),
  });

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="theme-transition"
      style={{
        backgroundColor: "var(--theme-bg)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: spacing.navbarHeight,
        paddingBottom: spacing.navbarHeight,
        position: "relative" as const,
        overflow: "hidden",
      }}
    >
      {/* Cursor-reactive glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(600px circle at ${glowPos.x}% ${glowPos.y}%, var(--theme-accent-glow), transparent 60%)`,
          transition: reducedMotion ? "none" : "background 0.15s ease-out",
          zIndex: 0,
        }}
      />
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "radial-gradient(ellipse 80% 50% at 50% 40%, var(--theme-glow-spread), transparent 70%)",
          zIndex: 0,
        }}
      />

      <ParticleBackground />
      <FloatingCode />
      <div style={{ ...containerStyle, textAlign: "center" as const, width: "100%", position: "relative" as const, zIndex: 1 }}>
        <motion.p {...fade(heroStagger.delays[0])} style={{
          color: "var(--theme-accent)",
          fontSize: fontSize.eyebrow,
          letterSpacing: "0.15em",
          fontWeight: fontWeight.semibold,
          textTransform: "uppercase" as const,
          marginBottom: spacing.gap.lg,
        }}>
          1st Coding Academy in the Arab World — Est 2015
        </motion.p>

        <motion.h1
          initial={reveal.fadeUp.initial}
          animate={reveal.fadeUp.visible}
          transition={heroStagger.transition(heroStagger.delays[1])}
          style={{
            fontSize: fontSize.hero,
            lineHeight: lineHeight.tight,
            fontWeight: fontWeight.black,
            color: "var(--theme-text)",
            marginBottom: spacing.gap.lg,
            maxWidth: "800px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <TypewriterText
            lines={["Build Real Tech Skills", "Not Just Knowledge"]}
            speed={60}
          />
        </motion.h1>

        <motion.p {...fade(heroStagger.delays[2])} style={{
          fontSize: fontSize.subtitle,
          color: "var(--theme-text-muted)",
          lineHeight: lineHeight.relaxed,
          margin: "0 auto",
          maxWidth: "600px",
          marginBottom: spacing.ctaTopMargin,
        }}>
          CODED programs are hands-on from day one — projects, coaching, and real standards.
          Join as an adult, teen, or kid. Leave with work you can show.
        </motion.p>

        <motion.div {...fade(heroStagger.delays[3])} style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: spacing.gap.md,
          flexWrap: "wrap" as const,
        }}>
          <Button href="#bootcamps">Explore Bootcamps <span>→</span></Button>
          <Button variant="outline" href="#companies">CODED For Companies →</Button>
        </motion.div>
      </div>
    </section>
  );
}
