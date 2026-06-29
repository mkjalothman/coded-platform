"use client";

import { useState } from "react";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import ApplyModal from "@/components/ui/ApplyModal";
import { colors } from "@/design-system";
import { fontSize, fontWeight, lineHeight } from "@/design-system/typography";
import { gradients } from "@/design-system/colors";
import { containerStyle, spacing } from "@/design-system/spacing";

export default function CTASection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Reveal>
      <section id="apply" style={{
        background: gradients.primaryCta,
        padding: `${spacing.sectionY} 0`,
        textAlign: "center",
      }}>
        <div style={containerStyle}>
          <h2 style={{
            fontSize: fontSize.h2,
            fontWeight: fontWeight.black,
            color: colors.text.headingLight,
            marginBottom: spacing.gap.md,
            lineHeight: lineHeight.tight,
          }}>
            Ready to build real skills?
          </h2>
          <p style={{
            color: colors.text.onCtaMuted,
            fontSize: fontSize.subtitle,
            marginBottom: spacing.ctaTopMargin,
            lineHeight: lineHeight.relaxed,
          }}>
            Join the next cohort. Seats are limited.
          </p>
          <Button variant="inverted" onClick={() => setModalOpen(true)}>Apply Now →</Button>
        </div>
      </section>

      <ApplyModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Reveal>
  );
}
