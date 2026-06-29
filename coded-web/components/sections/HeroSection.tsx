"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { colors, gradients, heroStagger } from "@/design-system";
import { fontSize, fontWeight, lineHeight } from "@/design-system/typography";
import { containerStyle, spacing } from "@/design-system/spacing";

export default function HeroSection() {
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: heroStagger.transition(delay),
  });

  return (
    <section style={{
      backgroundColor: colors.surface.dark,
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "center",
      backgroundImage: gradients.heroGlow,
      paddingTop: spacing.navbarHeight,
      paddingBottom: spacing.navbarHeight,
    }}>
      <div style={{ ...containerStyle, textAlign: "center" as const, width: "100%" }}>
        <motion.p {...fade(heroStagger.delays[0])} style={{
          color: colors.brand.teal,
          fontSize: fontSize.eyebrow,
          letterSpacing: "0.15em",
          fontWeight: fontWeight.semibold,
          textTransform: "uppercase" as const,
          marginBottom: spacing.gap.lg,
        }}>
          1st Coding Academy in the Arab World — Est 2015
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: heroStagger.delays[1] }}
          style={{
            fontSize: fontSize.hero,
            lineHeight: lineHeight.tight,
            fontWeight: fontWeight.black,
            color: colors.text.headingLight,
            marginBottom: spacing.gap.lg,
            maxWidth: "800px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Build Real Tech Skills<br />
          <span style={{ color: colors.brand.teal }}>Not Just Knowledge</span>
        </motion.h1>

        <motion.p {...fade(heroStagger.delays[2])} style={{
          fontSize: fontSize.subtitle,
          color: colors.text.bodyDark,
          lineHeight: lineHeight.relaxed,
          margin: "0 auto",
          maxWidth: "600px",
          marginBottom: spacing.ctaTopMargin,
        }}>
          CODED programs are hands-on from day one — projects, coaching, and real standards.
          Join as an adult, teen, or kid. Leave with work you can show.
        </motion.p>

        <motion.div {...fade(heroStagger.delays[3])} style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: spacing.gap.md,
          flexWrap: "wrap" as const,
        }}>
          <Button href="#bootcamps">Explore Bootcamps <span>→</span></Button>
          <Button variant="outline" href="#companies">CODED For Companies →</Button>
        </motion.div>
      </div>
    </section>
  );
}
