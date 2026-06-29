"use client";

import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import { fontSize, fontWeight, lineHeight } from "@/design-system/typography";
import { gradients } from "@/design-system/colors";
import { containerStyle } from "@/design-system/spacing";

export default function CTASection() {
  return (
    <Reveal>
      <section id="apply" style={{
        background: gradients.primaryCta,
        padding: "96px 0",
        textAlign: "center",
      }}>
        <div style={containerStyle}>
          <h2 style={{
            fontSize: fontSize.h2,
            fontWeight: fontWeight.black,
            color: "white",
            marginBottom: "16px",
            lineHeight: lineHeight.tight,
          }}>
            Ready to build real skills?
          </h2>
          <p style={{
            color: "rgba(255,255,255,0.85)",
            fontSize: "18px",
            marginBottom: "40px",
            lineHeight: lineHeight.relaxed,
          }}>
            Join the next cohort. Seats are limited.
          </p>
          <Button variant="inverted">Apply Now →</Button>
        </div>
      </section>
    </Reveal>
  );
}
