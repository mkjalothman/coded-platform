"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import FloatingCode from "@/components/effects/FloatingCode";
import { heroStagger, reveal, easing } from "@/design-system";
import { fontWeight, lineHeight } from "@/design-system/typography";
import { containerStyle, spacing } from "@/design-system/spacing";

function KineticHeadline() {
  const line1 = "Build Real Tech Skills";
  const line2 = "Not Just Knowledge";
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <>
        <span style={{ display: "block" }}>{line1}</span>
        <span style={{ display: "block", color: "var(--theme-accent)" }}>{line2}</span>
      </>
    );
  }

  const charVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: 0.4 + i * 0.03,
        duration: 0.5,
        ease: easing.apple,
      },
    }),
  };

  return (
    <>
      <span style={{ display: "block" }}>
        {line1.split("").map((ch, i) => (
          <motion.span
            key={`l1-${i}`}
            custom={i}
            variants={charVariants}
            initial="hidden"
            animate="visible"
            style={{ display: "inline-block", whiteSpace: ch === " " ? "pre" : undefined }}
          >
            {ch}
          </motion.span>
        ))}
      </span>
      <span style={{ display: "block", color: "var(--theme-accent)" }}>
        {line2.split("").map((ch, i) => (
          <motion.span
            key={`l2-${i}`}
            custom={line1.length + i}
            variants={charVariants}
            initial="hidden"
            animate="visible"
            style={{ display: "inline-block", whiteSpace: ch === " " ? "pre" : undefined }}
          >
            {ch}
          </motion.span>
        ))}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.3 }}
          style={{
            display: "inline-block",
            width: "4px",
            height: "0.8em",
            backgroundColor: "var(--theme-accent)",
            marginLeft: "6px",
            verticalAlign: "middle",
            animation: "blink 1s steps(1) infinite",
          }}
        />
      </span>
    </>
  );
}

export default function HeroSection() {
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
      onMouseMove={handleMouseMove}
      className="section-transparent"
      style={{
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
          background: `radial-gradient(700px circle at ${glowPos.x}% ${glowPos.y}%, var(--theme-accent-glow), transparent 60%)`,
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

      <FloatingCode />
      <div style={{ ...containerStyle, textAlign: "center" as const, width: "100%", position: "relative" as const, zIndex: 1 }}>
        <motion.p {...fade(heroStagger.delays[0])} style={{
          color: "var(--theme-accent)",
          fontSize: "11px",
          letterSpacing: "0.2em",
          fontWeight: fontWeight.semibold,
          textTransform: "uppercase" as const,
          marginBottom: spacing.gap.lg,
        }}>
          1st Coding Academy in the Arab World — Est 2015
        </motion.p>

        <h1
          style={{
            fontSize: "var(--font-size-hero)",
            lineHeight: lineHeight.tight,
            fontWeight: fontWeight.black,
            color: "var(--theme-text)",
            marginBottom: spacing.gap.lg,
            maxWidth: "800px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <KineticHeadline />
        </h1>

        <motion.p {...fade(heroStagger.delays[2])} style={{
          fontSize: "18px",
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
          <Button href="#programs">Explore Programs <span>→</span></Button>
          <Button variant="outline" href="#companies">CODED For Companies →</Button>
        </motion.div>
      </div>
    </section>
  );
}
