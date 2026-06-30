"use client";

import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/motion/ScrollReveal";
import Marquee from "@/components/motion/Marquee";
import { spacing } from "@/design-system";
import { eyebrowStyle } from "@/design-system/typography";

export default function CompanyLogos({ companies }: { companies: string[] }) {
  return (
    <Container
      id="companies"
      bg="rgba(20, 36, 63, 0.7)"
      padding={spacing.sectionYCompact}
      style={{
        position: "relative",
        zIndex: 1,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      } as React.CSSProperties}
    >
      <ScrollReveal>
        <p style={{ ...eyebrowStyle, marginBottom: "32px" }}>
          Trusted by Leading Companies in Kuwait
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.2} direction="none">
        <Marquee duration={20}>
          {companies.map(c => (
            <span key={c} style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "18px",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}>
              {c}
            </span>
          ))}
        </Marquee>
      </ScrollReveal>
    </Container>
  );
}
