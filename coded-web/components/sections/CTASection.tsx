"use client";

import { useState } from "react";
import ScrollReveal from "@/components/motion/ScrollReveal";
import Button from "@/components/ui/Button";
import ApplyModal from "@/components/ui/ApplyModal";
import { fontSize, fontWeight, lineHeight } from "@/design-system/typography";
import { containerStyle, spacing } from "@/design-system/spacing";

export default function CTASection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <ScrollReveal direction="scale">
      <section id="apply" style={{
        position: "relative",
        zIndex: 1,
        background: "linear-gradient(135deg, rgba(0,184,169,0.15), rgba(20,36,63,0.9) 50%, rgba(0,184,169,0.08))",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        padding: `${spacing.sectionY} 0`,
        textAlign: "center",
        borderTop: "1px solid rgba(0,184,169,0.1)",
        borderBottom: "1px solid rgba(0,184,169,0.1)",
      }}>
        <div style={containerStyle}>
          <h2 style={{
            fontSize: fontSize.h2,
            fontWeight: fontWeight.black,
            color: "var(--theme-text)",
            marginBottom: spacing.gap.md,
            lineHeight: lineHeight.tight,
          }}>
            Ready to build real skills?
          </h2>
          <p style={{
            color: "var(--theme-text-muted)",
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
    </ScrollReveal>
  );
}
