"use client";

import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import { colors } from "@/design-system";
import { fontSize, fontWeight } from "@/design-system/typography";
import { stats } from "@/data/programs";

export default function StatsBar() {
  return (
    <Container bg={colors.surface.dark}>
      <Reveal>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "40px",
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
                  lineHeight: 1,
                  display: "block",
                }}
              />
              <div style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: fontSize.body,
                marginTop: "12px",
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
