"use client";

import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import StaggerGrid from "@/components/motion/StaggerGrid";
import { colors } from "@/design-system";
import { fontSize, fontWeight, lineHeight } from "@/design-system/typography";
import { bootcamps } from "@/data/programs";

export default function BootcampGrid() {
  return (
    <Container id="bootcamps" bg={colors.surface.light}>
      <SectionHeader
        eyebrow="BOOTCAMPS"
        heading="Discover Your Perfect Bootcamp Match Today"
        subtitle="Intensive programs for adults who want to change direction, or upgrade their skills."
      />
      <StaggerGrid style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "24px",
      }} staggerDelay={0.12} className="bootcamp-grid">
        {bootcamps.map((boot) => (
          <Card key={boot.title} style={{
            padding: "36px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}>
            <h3 style={{
              fontSize: fontSize.h3,
              fontWeight: fontWeight.bold,
              color: boot.color,
            }}>
              {boot.title}
            </h3>
            <p style={{
              color: colors.text.body,
              fontSize: fontSize.body,
              lineHeight: lineHeight.relaxed,
              flex: 1,
            }}>
              {boot.desc}
            </p>
            <Button variant="track" trackColor={boot.color} style={{ alignSelf: "flex-start" }}>
              Apply Now
            </Button>
          </Card>
        ))}
      </StaggerGrid>

      <style>{`
        @media (max-width: 768px) {
          .bootcamp-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Container>
  );
}
