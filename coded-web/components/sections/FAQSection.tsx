"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/motion/Reveal";
import { colors } from "@/design-system";
import { fontSize, fontWeight, lineHeight } from "@/design-system/typography";
import { faqs } from "@/data/programs";

function FAQItem({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div style={{
      borderBottom: `1px solid ${colors.border.light}`,
    }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          padding: "24px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: "16px",
        }}
      >
        <span style={{
          fontSize: "18px",
          fontWeight: fontWeight.semibold,
          color: colors.text.heading,
          lineHeight: 1.4,
        }}>
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            fontSize: "24px",
            color: colors.brand.teal,
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
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <p style={{
              color: colors.text.body,
              fontSize: fontSize.body,
              lineHeight: lineHeight.relaxed,
              paddingBottom: "24px",
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

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Container id="faq" bg={colors.surface.white}>
      <SectionHeader eyebrow="FAQ" heading="Frequently Asked Questions" />
      <Reveal>
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
      </Reveal>
    </Container>
  );
}
