"use client";

import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import Marquee from "@/components/motion/Marquee";
import { colors, spacing } from "@/design-system";
import { eyebrowStyle } from "@/design-system/typography";
export default function CompanyLogos({ companies }: { companies: string[] }) {
  return (
    <Container id="companies" bg={colors.surface.light} padding={spacing.sectionYCompact}>
      <Reveal>
        <p style={{ ...eyebrowStyle, marginBottom: "32px" }}>
          Trusted by Leading Companies in Kuwait
        </p>
      </Reveal>
      <Marquee duration={20}>
        {companies.map(c => (
          <span key={c} style={{
            color: "#9ca3af",
            fontSize: "18px",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}>
            {c}
          </span>
        ))}
      </Marquee>
    </Container>
  );
}
