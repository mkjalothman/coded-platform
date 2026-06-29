import Reveal from "@/components/motion/Reveal";
import { eyebrowStyle, sectionHeadingStyle, bodyStyle } from "@/design-system/typography";

interface SectionHeaderProps {
  eyebrow: string;
  heading: string;
  subtitle?: string;
  headingColor?: string;
  subtitleDelay?: number;
}

export default function SectionHeader({
  eyebrow,
  heading,
  subtitle,
  headingColor = "#0a0f2e",
  subtitleDelay = 0.1,
}: SectionHeaderProps) {
  return (
    <>
      <Reveal>
        <p style={eyebrowStyle}>{eyebrow}</p>
        <h2 style={{
          ...sectionHeadingStyle(headingColor),
          marginBottom: subtitle ? "16px" : "56px",
        }}>
          {heading}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={subtitleDelay}>
          <p style={{
            ...bodyStyle,
            textAlign: "center",
            marginBottom: "56px",
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
          }}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </>
  );
}
