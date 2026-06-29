import Reveal from "@/components/motion/Reveal";
import { colors } from "@/design-system";
import { eyebrowStyle, sectionHeadingStyle, bodyStyle } from "@/design-system/typography";
import { spacing } from "@/design-system/spacing";

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
  headingColor = colors.text.heading,
  subtitleDelay = 0.1,
}: SectionHeaderProps) {
  return (
    <>
      <Reveal>
        <p style={eyebrowStyle}>{eyebrow}</p>
        <h2 style={{
          ...sectionHeadingStyle(headingColor),
          marginBottom: subtitle ? spacing.eyebrowToHeading : spacing.headingToContent,
        }}>
          {heading}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={subtitleDelay}>
          <p style={{
            ...bodyStyle,
            textAlign: "center",
            marginBottom: spacing.headingToContent,
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
