"use client";

import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import StaggerGrid from "@/components/motion/StaggerGrid";
import { colors } from "@/design-system";
import { fontSize, fontWeight, lineHeight } from "@/design-system/typography";
import type { Step } from "@/data/programs";

export default function HowItWorks({ steps }: { steps: Step[] }) {
  return (
    <Container bg={colors.surface.light}>
      <SectionHeader eyebrow="HOW IT WORKS" heading="How CODED actually teaches" />
      <StaggerGrid style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "24px",
      }} staggerDelay={0.12} className="steps-grid">
        {steps.map(h => (
          <Card key={h.num} style={{ padding: "32px" }}>
            <div style={{
              color: colors.brand.teal,
              fontSize: fontSize.eyebrow,
              fontWeight: fontWeight.bold,
              marginBottom: "16px",
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
            }}>
              STEP {h.num}
            </div>
            <h3 style={{
              fontSize: fontSize.h3,
              fontWeight: fontWeight.bold,
              color: colors.text.heading,
              marginBottom: "12px",
            }}>
              {h.title}
            </h3>
            <p style={{
              color: colors.text.body,
              fontSize: fontSize.body,
              lineHeight: lineHeight.relaxed,
            }}>
              {h.desc}
            </p>
          </Card>
        ))}
      </StaggerGrid>

      <style>{`
        @media (max-width: 960px) {
          .steps-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Container>
  );
}
