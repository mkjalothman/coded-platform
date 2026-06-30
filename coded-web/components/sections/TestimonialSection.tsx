"use client";

import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import StaggerGrid from "@/components/motion/StaggerGrid";
import { colors, gradients } from "@/design-system";
import { fontSize, fontWeight, lineHeight } from "@/design-system/typography";
import type { Testimonial } from "@/data/testimonials";

export default function TestimonialSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <Container id="testimonials" bg="var(--theme-bg-lifted)" style={{ transition: "background-color 0.5s ease" }}>
      <SectionHeader eyebrow="TESTIMONIALS" heading="What our graduates say" headingColor="white" />
      <StaggerGrid style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "24px",
      }} staggerDelay={0.15} className="testimonial-grid">
        {testimonials.map(t => (
          <Card key={t.name} variant="dark" style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}>
            <p style={{
              color: colors.text.bodySubtle,
              fontSize: fontSize.body,
              lineHeight: lineHeight.relaxed,
              marginBottom: "24px",
              fontStyle: "italic",
            }}>
              &ldquo;{t.quote}&rdquo;
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: gradients.primaryCta,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: fontWeight.bold,
                color: "white",
                fontSize: fontSize.small,
                flexShrink: 0,
              }}>
                {t.initials}
              </div>
              <div>
                <div style={{ color: "white", fontWeight: fontWeight.bold, fontSize: fontSize.small }}>{t.name}</div>
                <div style={{ color: colors.text.bodyDark, fontSize: "12px" }}>{t.track}</div>
              </div>
            </div>
          </Card>
        ))}
      </StaggerGrid>

      <style>{`
        @media (max-width: 768px) {
          .testimonial-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Container>
  );
}
