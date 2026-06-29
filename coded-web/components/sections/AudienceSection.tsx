"use client";

import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import StaggerGrid from "@/components/motion/StaggerGrid";
import { colors } from "@/design-system";
import { fontSize, fontWeight, lineHeight } from "@/design-system/typography";
import { spacing } from "@/design-system/spacing";
import { audiences } from "@/data/programs";

export default function AudienceSection() {
  return (
    <Container id="audience" bg={colors.surface.white}>
      <SectionHeader eyebrow="WHO WE SERVE" heading="Who is CODED for?" />
      <StaggerGrid style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: spacing.cardGap,
      }} staggerDelay={0.15} className="audience-grid">
        {audiences.map((aud) => (
          <Card key={aud.title} variant="colored" bg={aud.bg} style={{
            padding: spacing.cardPaddingLarge,
            minHeight: "360px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            gap: spacing.gap.sm,
          }}>
            <Badge>{aud.badge}</Badge>
            <h3 style={{ fontSize: fontSize.h3, fontWeight: fontWeight.bold, color: colors.text.headingLight }}>
              {aud.title}
            </h3>
            <p style={{ color: colors.text.onColoredMuted, fontSize: fontSize.body, lineHeight: lineHeight.relaxed }}>
              {aud.desc}
            </p>
            <Button variant="frosted" style={{ alignSelf: "flex-start", marginTop: "8px" }}>
              {aud.cta}
            </Button>
          </Card>
        ))}
      </StaggerGrid>

      <style>{`
        @media (max-width: 768px) {
          .audience-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Container>
  );
}
