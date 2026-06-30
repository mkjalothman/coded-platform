"use client";

import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import ScrollReveal, { StaggerReveal, StaggerItem } from "@/components/motion/ScrollReveal";
import { colors, gradients } from "@/design-system";
import { fontSize, fontWeight, lineHeight } from "@/design-system/typography";
import type { Testimonial } from "@/data/testimonials";

export default function TestimonialSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <Container id="testimonials" bg="transparent" style={{ position: "relative", zIndex: 1 }}>
      <ScrollReveal>
        <SectionHeader eyebrow="TESTIMONIALS" heading="What our graduates say" headingColor="white" />
      </ScrollReveal>
      <StaggerReveal style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "24px",
      }} staggerDelay={0.15} className="testimonial-grid">
        {testimonials.map(t => (
          <StaggerItem key={t.name}>
            <Card variant="dark" style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              background: "rgba(20, 36, 63, 0.6)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.06)",
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
          </StaggerItem>
        ))}
      </StaggerReveal>

      <style>{`
        @media (max-width: 768px) {
          .testimonial-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Container>
  );
}
