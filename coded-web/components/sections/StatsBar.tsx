"use client";

import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/motion/ScrollReveal";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import { fontSize, fontWeight, lineHeight } from "@/design-system/typography";
import { spacing } from "@/design-system/spacing";
import type { Stat } from "@/data/programs";

export default function StatsBar({ stats }: { stats: Stat[] }) {
  return (
    <Container bg="transparent" style={{ position: "relative", zIndex: 1 }}>
      <ScrollReveal>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: spacing.gap.xxl,
          textAlign: "center",
        }} className="stats-grid">
          {stats.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 0.1} direction="scale">
              <AnimatedCounter
                target={s.num}
                suffix={s.suffix}
                duration={2}
                style={{
                  fontSize: fontSize.stat,
                  fontWeight: fontWeight.black,
                  color: "var(--theme-accent)",
                  lineHeight: lineHeight.stat,
                  display: "block",
                }}
              />
              <div style={{
                color: "var(--theme-text-muted)",
                fontSize: fontSize.body,
                marginTop: spacing.gap.sm,
                fontWeight: fontWeight.medium,
                letterSpacing: "0.02em",
              }}>
                {s.label}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>

      <style>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 32px !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Container>
  );
}
