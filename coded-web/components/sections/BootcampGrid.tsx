"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ApplyModal from "@/components/ui/ApplyModal";
import StaggerGrid from "@/components/motion/StaggerGrid";
import { colors } from "@/design-system";
import { fontSize, fontWeight, lineHeight } from "@/design-system/typography";
import { spacing } from "@/design-system/spacing";
import { cssTransition } from "@/design-system/motion";
import type { Bootcamp } from "@/data/programs";

export default function BootcampGrid({ programs }: { programs: Bootcamp[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Bootcamp | null>(null);

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
        gap: spacing.cardGap,
        width: "100%",
      }} staggerDelay={0.12} className="bootcamp-grid">
        {programs.map((boot) => (
          <Card key={boot.title} style={{
            padding: spacing.cardPaddingLarge,
            display: "flex",
            flexDirection: "column",
            gap: spacing.gap.md,
          }}>
            <Link
              href={`/programs/${boot.slug}`}
              style={{
                textDecoration: "none",
                color: boot.color,
                fontSize: fontSize.h3,
                fontWeight: fontWeight.bold,
                transition: cssTransition.color,
              }}
            >
              {boot.title}
            </Link>
            <p style={{
              color: colors.text.body,
              fontSize: fontSize.body,
              lineHeight: lineHeight.relaxed,
              flex: 1,
            }}>
              {boot.desc}
            </p>
            <div style={{ display: "flex", gap: spacing.gap.sm, alignSelf: "flex-start" }}>
              <Button
                variant="track"
                trackColor={boot.color}
                onClick={() => {
                  setSelectedProgram(boot);
                  setModalOpen(true);
                }}
              >
                Apply Now
              </Button>
              <Button
                variant="outline"
                href={`/programs/${boot.slug}`}
                style={{
                  color: colors.text.heading,
                  borderColor: colors.border.light,
                  padding: "14px 24px",
                }}
              >
                Learn More
              </Button>
            </div>
          </Card>
        ))}
      </StaggerGrid>

      <ApplyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        programSlug={selectedProgram?.slug}
        programName={selectedProgram?.title}
      />

      <style>{`
        @media (max-width: 768px) {
          .bootcamp-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Container>
  );
}
