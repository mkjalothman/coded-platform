import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import StaggerGrid from "@/components/motion/StaggerGrid";
import { colors, gradients } from "@/design-system";
import { fontSize, fontWeight, lineHeight } from "@/design-system/typography";
import { spacing, containerStyle } from "@/design-system/spacing";

export const metadata: Metadata = {
  title: "About CODED | Kuwait's First Coding Academy",
  description:
    "Founded in 2015, CODED is Kuwait's first coding academy. We've trained 3,000+ graduates across cybersecurity, AI, data science, and web development.",
};

const milestones = [
  { year: "2015", text: "Founded as Kuwait's first coding bootcamp" },
  { year: "2017", text: "Launched enterprise training programs" },
  { year: "2019", text: "Expanded to Kids & Youth programs" },
  { year: "2021", text: "Reached 1,000+ graduates milestone" },
  { year: "2023", text: "Launched AI & Data Science tracks" },
  { year: "2025", text: "Introduced Agentic AI and Cybersecurity bootcamps" },
];

const values = [
  {
    title: "Build, Don't Lecture",
    desc: "Every session ends with something you made. We believe skills come from doing, not watching.",
  },
  {
    title: "Real Standards",
    desc: "Our curriculum mirrors how tech teams actually work — version control, code review, deployment, and collaboration.",
  },
  {
    title: "Community First",
    desc: "Your cohort becomes your professional network. Alumni stay connected through events, mentorship, and hiring channels.",
  },
  {
    title: "Kuwait-Rooted",
    desc: "Built in Kuwait, for Kuwait. We partner with 50+ local companies and understand the regional tech landscape.",
  },
];

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{
        backgroundColor: colors.surface.dark,
        backgroundImage: gradients.heroGlow,
        paddingTop: `calc(${spacing.navbarHeight} + 64px)`,
        paddingBottom: "80px",
      }}>
        <div style={{ ...containerStyle, textAlign: "center" }}>
          <Reveal>
            <Badge style={{ marginBottom: spacing.gap.lg }}>ABOUT CODED</Badge>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 style={{
              fontSize: fontSize.hero,
              fontWeight: fontWeight.black,
              color: colors.text.headingLight,
              lineHeight: lineHeight.tight,
              marginBottom: spacing.gap.lg,
              maxWidth: "800px",
              marginLeft: "auto",
              marginRight: "auto",
            }}>
              Kuwait&apos;s First<br />
              <span style={{ color: colors.brand.teal }}>Coding Academy</span>
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{
              fontSize: fontSize.subtitle,
              color: colors.text.bodyDark,
              lineHeight: lineHeight.relaxed,
              maxWidth: "600px",
              margin: "0 auto",
            }}>
              Since 2015, we&apos;ve been building the next generation of tech talent
              in the Arab world — one cohort at a time.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission */}
      <Container bg={colors.surface.white}>
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <SectionHeader
            eyebrow="OUR MISSION"
            heading="Close the gap between education and industry"
          />
          <Reveal>
            <p style={{
              color: colors.text.body,
              fontSize: fontSize.subtitle,
              lineHeight: lineHeight.loose,
              marginTop: `-${spacing.gap.lg}`,
            }}>
              Traditional education teaches theory. The industry needs builders.
              CODED bridges that gap with intensive, project-based programs where
              you learn by shipping real products — not memorizing slides. Our
              graduates leave with portfolios, not just certificates.
            </p>
          </Reveal>
        </div>
      </Container>

      {/* Values */}
      <Container bg={colors.surface.light}>
        <SectionHeader eyebrow="WHAT WE BELIEVE" heading="Our Values" />
        <StaggerGrid style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: spacing.cardGap,
          maxWidth: "800px",
          margin: "0 auto",
        }} staggerDelay={0.1} className="values-grid">
          {values.map((v) => (
            <Card key={v.title} style={{
              padding: spacing.cardPaddingLarge,
              display: "flex",
              flexDirection: "column",
              gap: spacing.gap.sm,
            }}>
              <h3 style={{
                fontSize: fontSize.h3,
                fontWeight: fontWeight.bold,
                color: colors.text.heading,
              }}>
                {v.title}
              </h3>
              <p style={{
                color: colors.text.body,
                fontSize: fontSize.body,
                lineHeight: lineHeight.relaxed,
              }}>
                {v.desc}
              </p>
            </Card>
          ))}
        </StaggerGrid>
      </Container>

      {/* Timeline */}
      <Container bg={colors.surface.white}>
        <SectionHeader eyebrow="OUR JOURNEY" heading="Milestones" />
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          {milestones.map((m, i) => (
            <Reveal key={m.year} delay={i * 0.05}>
              <div style={{
                display: "flex",
                alignItems: "flex-start",
                gap: spacing.gap.lg,
                paddingBottom: spacing.gap.lg,
                borderLeft: i < milestones.length - 1
                  ? `2px solid ${colors.border.light}`
                  : "2px solid transparent",
                marginLeft: "20px",
                paddingLeft: spacing.gap.lg,
                position: "relative",
              }}>
                <div style={{
                  position: "absolute",
                  left: "-7px",
                  top: "4px",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: colors.brand.teal,
                  border: `2px solid ${colors.surface.white}`,
                }} />
                <div>
                  <p style={{
                    color: colors.brand.teal,
                    fontSize: fontSize.small,
                    fontWeight: fontWeight.bold,
                    marginBottom: "4px",
                  }}>
                    {m.year}
                  </p>
                  <p style={{
                    color: colors.text.body,
                    fontSize: fontSize.body,
                    lineHeight: lineHeight.relaxed,
                  }}>
                    {m.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Contact / CTA */}
      <Container bg={colors.surface.light}>
        <Reveal>
          <Card style={{
            background: gradients.primaryCta,
            padding: "56px 40px",
            textAlign: "center",
            border: "none",
            maxWidth: "720px",
            margin: "0 auto",
          }}>
            <h2 style={{
              fontSize: fontSize.h2,
              fontWeight: fontWeight.black,
              color: colors.text.headingLight,
              marginBottom: spacing.gap.sm,
            }}>
              Get in touch
            </h2>
            <p style={{
              color: colors.text.onCtaMuted,
              fontSize: fontSize.subtitle,
              lineHeight: lineHeight.relaxed,
              marginBottom: spacing.gap.lg,
            }}>
              Visit us at the Kuwait Free Trade Zone, or reach out directly.
            </p>
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: spacing.gap.md,
              flexWrap: "wrap",
            }}>
              <Button variant="inverted" href="mailto:hello@joincoded.com">
                hello@joincoded.com
              </Button>
              <Button variant="outline" href="tel:+96560791018">
                +965 6079 1018
              </Button>
            </div>
          </Card>
        </Reveal>
      </Container>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .values-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
