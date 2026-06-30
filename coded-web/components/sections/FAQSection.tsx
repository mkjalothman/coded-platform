"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { accordion } from "@/design-system";
import { fontSize, fontWeight, lineHeight } from "@/design-system/typography";
import { spacing } from "@/design-system/spacing";
import type { FAQ } from "@/data/programs";

function FAQItem({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const rotateProps = accordion.rotate(isOpen);

  return (
    <div style={{
      borderBottom: "1px solid rgba(255,255,255,0.08)",
    }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          padding: `${spacing.gap.lg} 0`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: spacing.gap.md,
        }}
      >
        <span style={{
          fontSize: fontSize.subtitle,
          fontWeight: fontWeight.semibold,
          color: "var(--theme-text)",
          lineHeight: 1.4,
        }}>
          {question}
        </span>
        <motion.span
          animate={rotateProps.animate}
          transition={rotateProps.transition}
          style={{
            fontSize: "24px",
            color: "var(--theme-accent)",
            fontWeight: fontWeight.bold,
            flexShrink: 0,
            lineHeight: 1,
          }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={accordion.expand.initial}
            animate={accordion.expand.animate}
            exit={accordion.expand.exit}
            transition={accordion.expand.transition}
            style={{ overflow: "hidden" }}
          >
            <p style={{
              color: "var(--theme-text-muted)",
              fontSize: fontSize.body,
              lineHeight: lineHeight.relaxed,
              paddingBottom: spacing.gap.lg,
              maxWidth: "700px",
            }}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Container
      id="faq"
      bg="rgba(20, 36, 63, 0.7)"
      style={{
        position: "relative",
        zIndex: 1,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      } as React.CSSProperties}
    >
      <ScrollReveal>
        <SectionHeader eyebrow="FAQ" heading="Frequently Asked Questions" headingColor="white" />
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <div style={{ maxWidth: "768px", margin: "0 auto" }}>
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </ScrollReveal>
    </Container>
  );
}
