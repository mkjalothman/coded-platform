"use client";

import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal, { StaggerReveal, StaggerItem } from "@/components/motion/ScrollReveal";
import { fontSize, fontWeight, lineHeight } from "@/design-system/typography";
import type { Step } from "@/data/programs";

export default function HowItWorks({ steps }: { steps: Step[] }) {
  return (
    <Container
      id="how-it-works"
      bg="rgba(20, 36, 63, 0.65)"
      style={{
        position: "relative",
        zIndex: 1,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      } as React.CSSProperties}
    >
      <ScrollReveal>
        <SectionHeader eyebrow="HOW IT WORKS" heading="How CODED actually teaches" headingColor="white" />
      </ScrollReveal>
      <StaggerReveal style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "24px",
      }} staggerDelay={0.12} className="steps-grid">
        {steps.map(h => (
          <StaggerItem key={h.num}>
            <div style={{
              padding: "32px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 16,
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}>
              <div style={{
                color: "var(--theme-accent)",
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
                color: "var(--theme-text)",
                marginBottom: "12px",
              }}>
                {h.title}
              </h3>
              <p style={{
                color: "var(--theme-text-muted)",
                fontSize: fontSize.body,
                lineHeight: lineHeight.relaxed,
              }}>
                {h.desc}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerReveal>

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
