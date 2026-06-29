"use client";

import { useState } from "react";
import Link from "next/link";
import { use } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ApplyModal from "@/components/ui/ApplyModal";
import Reveal from "@/components/motion/Reveal";
import StaggerGrid from "@/components/motion/StaggerGrid";
import { colors, gradients, shadows } from "@/design-system";
import { fontSize, fontWeight, lineHeight } from "@/design-system/typography";
import { spacing, containerStyle } from "@/design-system/spacing";

interface ProgramData {
  name: string;
  slug: string;
  description: string;
  accent_color: string;
}

const programDetails: Record<string, { duration: string; format: string; level: string; highlights: string[] }> = {
  cybersecurity: {
    duration: "14 weeks",
    format: "Hybrid — in-person + online support",
    level: "Beginner-friendly",
    highlights: [
      "Learn real attack and defense techniques hands-on",
      "Build a portfolio of security audits and penetration tests",
      "Work with industry-standard tools: Burp Suite, Wireshark, Metasploit",
      "Capstone: conduct a full security assessment of a live application",
    ],
  },
  "ai-app-developer": {
    duration: "12 weeks",
    format: "Hybrid — in-person + online support",
    level: "Beginner-friendly",
    highlights: [
      "Build full-stack applications from frontend to backend",
      "Ship real products using modern frameworks and workflows",
      "Learn API design, databases, authentication, and deployment",
      "Capstone: deploy a production-ready web application",
    ],
  },
  "agentic-ai": {
    duration: "10 weeks",
    format: "Hybrid — in-person + online support",
    level: "Intermediate",
    highlights: [
      "Build autonomous AI agents that reason, plan, and execute tasks",
      "Work with cutting-edge frameworks: LangChain, CrewAI, AutoGen",
      "Design multi-agent systems that collaborate on complex problems",
      "Capstone: deploy an autonomous agent solving a real business problem",
    ],
  },
  "ai-data-science": {
    duration: "12 weeks",
    format: "Hybrid — in-person + online support",
    level: "Beginner-friendly",
    highlights: [
      "Analyze real datasets and build predictive models",
      "Master Python, pandas, scikit-learn, and visualization tools",
      "Learn applied AI: NLP, computer vision, and recommendation systems",
      "Capstone: end-to-end data science project with real-world data",
    ],
  },
};

export default function ProgramPage({
  program,
}: {
  program: ProgramData;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const details = programDetails[program.slug] || {
    duration: "10–14 weeks",
    format: "Hybrid — in-person + online support",
    level: "Beginner-friendly",
    highlights: [
      "Hands-on, project-based learning from day one",
      "Build a professional portfolio of real projects",
      "Small cohorts with direct instructor feedback",
      "Career support and alumni network access",
    ],
  };

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
        <div style={{ ...containerStyle }}>
          <Reveal>
            <Link
              href="/#bootcamps"
              style={{
                color: colors.text.bodyDark,
                fontSize: fontSize.small,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: spacing.gap.lg,
              }}
            >
              ← All Programs
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <Badge style={{
              backgroundColor: `${program.accent_color}33`,
              color: program.accent_color,
              marginBottom: spacing.gap.md,
            }}>
              BOOTCAMP
            </Badge>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 style={{
              fontSize: fontSize.hero,
              fontWeight: fontWeight.black,
              color: colors.text.headingLight,
              lineHeight: lineHeight.tight,
              marginBottom: spacing.gap.lg,
              maxWidth: "700px",
            }}>
              {program.name}
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p style={{
              fontSize: fontSize.subtitle,
              color: colors.text.bodyDark,
              lineHeight: lineHeight.relaxed,
              maxWidth: "600px",
              marginBottom: spacing.ctaTopMargin,
            }}>
              {program.description}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <Button
              variant="track"
              trackColor={program.accent_color}
              onClick={() => setModalOpen(true)}
            >
              Apply Now →
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Details */}
      <Container bg={colors.surface.light}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <StaggerGrid style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: spacing.cardGap,
            marginBottom: spacing.headingToContent,
          }} staggerDelay={0.1} className="program-details-grid">
            {[
              { label: "Duration", value: details.duration },
              { label: "Format", value: details.format },
              { label: "Level", value: details.level },
            ].map((item) => (
              <Card key={item.label} style={{ textAlign: "center" as const, padding: spacing.cardPaddingLarge }}>
                <p style={{
                  color: program.accent_color,
                  fontSize: fontSize.eyebrow,
                  fontWeight: fontWeight.semibold,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  marginBottom: spacing.gap.xs,
                }}>
                  {item.label}
                </p>
                <p style={{
                  color: colors.text.heading,
                  fontSize: fontSize.body,
                  fontWeight: fontWeight.bold,
                }}>
                  {item.value}
                </p>
              </Card>
            ))}
          </StaggerGrid>

          <Reveal>
            <h2 style={{
              fontSize: fontSize.h3,
              fontWeight: fontWeight.bold,
              color: colors.text.heading,
              marginBottom: spacing.gap.lg,
            }}>
              What you&apos;ll learn
            </h2>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: spacing.gap.md, marginBottom: spacing.headingToContent }}>
            {details.highlights.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: spacing.gap.sm,
                }}>
                  <span style={{
                    color: program.accent_color,
                    fontSize: "20px",
                    lineHeight: 1.4,
                    flexShrink: 0,
                  }}>
                    ✓
                  </span>
                  <p style={{
                    color: colors.text.body,
                    fontSize: fontSize.body,
                    lineHeight: lineHeight.relaxed,
                  }}>
                    {item}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <Card style={{
              background: gradients.trackButton(program.accent_color),
              padding: "40px",
              textAlign: "center" as const,
              border: "none",
            }}>
              <h3 style={{
                fontSize: fontSize.h3,
                fontWeight: fontWeight.bold,
                color: colors.text.headingLight,
                marginBottom: spacing.gap.sm,
              }}>
                Ready to start?
              </h3>
              <p style={{
                color: colors.text.onCtaMuted,
                fontSize: fontSize.body,
                lineHeight: lineHeight.relaxed,
                marginBottom: spacing.gap.lg,
              }}>
                Join the next cohort. Seats are limited.
              </p>
              <Button
                variant="inverted"
                onClick={() => setModalOpen(true)}
              >
                Apply Now →
              </Button>
            </Card>
          </Reveal>
        </div>
      </Container>

      <Footer />

      <ApplyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        programSlug={program.slug}
        programName={program.name}
      />

      <style>{`
        @media (max-width: 768px) {
          .program-details-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
