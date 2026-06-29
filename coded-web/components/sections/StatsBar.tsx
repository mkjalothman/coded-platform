"use client";

import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import { colors } from "@/design-system";
import { fontSize, fontWeight, lineHeight } from "@/design-system/typography";
import { spacing } from "@/design-system/spacing";
import type { Stat } from "@/data/programs";

export default function StatsBar({ stats }: { stats: Stat[] }) {
  return (
    <Container bg={colors.surface.dark}>
      <Reveal>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: spacing.gap.xxl,
          textAlign: "center",
        }} className="stats-grid">
          {stats.map(s => (
            <div key={s.label}>
              <AnimatedCounter
                target={s.num}
                suffix={s.suffix}
                duration={2}
                style={{
                  fontSize: fontSize.stat,
                  fontWeight: fontWeight.black,
                  color: colors.brand.teal,
                  lineHeight: lineHeight.stat,
                  display: "block",
                }}
              />
              <div style={{
                color: colors.text.onDarkMuted,
                fontSize: fontSize.body,
                marginTop: spacing.gap.sm,
                fontWeight: fontWeight.medium,
                letterSpacing: "0.02em",
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

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
