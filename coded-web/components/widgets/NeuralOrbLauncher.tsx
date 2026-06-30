"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    id: "background",
    question: "What describes you best?",
    options: [
      { label: "Working professional", value: "working professional looking to upskill" },
      { label: "Fresh graduate", value: "fresh graduate starting my career" },
      { label: "Career changer", value: "changing careers into tech" },
      { label: "Business owner", value: "business owner wanting to understand tech" },
    ],
  },
  {
    id: "interest",
    question: "What excites you most?",
    options: [
      { label: "Building AI products", value: "building AI-powered products and apps" },
      { label: "Cybersecurity & defense", value: "cybersecurity and protecting systems" },
      { label: "Data & machine learning", value: "data science and machine learning" },
      { label: "AI agents & automation", value: "AI agents and workflow automation" },
    ],
  },
  {
    id: "availability",
    question: "When can you study?",
    options: [
      { label: "Evenings after work", value: "evenings after work" },
      { label: "Flexible schedule", value: "flexible schedule" },
      { label: "I want to start ASAP", value: "as soon as possible" },
      { label: "Planning ahead", value: "planning for next semester" },
    ],
  },
];

const programData = [
  {
    slug: "ai-app-developer",
    title: "AI App Developer",
    color: "#00b8a9",
    price: "KWD 450",
    duration: "12 weeks",
    nextCohort: "Aug 12, 2025",
    seats: 7,
    description: "Build full-stack AI products from frontend to backend using modern tools and real workflows.",
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    color: "#1a2570",
    price: "KWD 350",
    duration: "10 weeks",
    nextCohort: "Oct 5, 2025",
    seats: 20,
    description: "Real attack and defense techniques. Hands-on labs, no dry theory.",
  },
  {
    slug: "ai-data-science",
    title: "AI & Data Science",
    color: "#9b59b6",
    price: "KWD 380",
    duration: "10 weeks",
    nextCohort: "Oct 12, 2025",
    seats: 20,
    description: "Work with real data, build models, and turn insights into decisions.",
  },
  {
    slug: "agentic-ai",
    title: "Agentic AI",
    color: "#2d6a4f",
    price: "KWD 400",
    duration: "10 weeks",
    nextCohort: "Sep 8, 2025",
    seats: 18,
    description: "Design and deploy AI agents that reason, plan, and execute tasks autonomously.",
  },
];

function matchProgram(answers: Record<string, string>): (typeof programData)[0] {
  const interest = answers.interest || "";
  if (interest.includes("cybersecurity")) return programData[1];
  if (interest.includes("data science")) return programData[2];
  if (interest.includes("agents")) return programData[3];
  return programData[0];
}

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: "5px", justifyContent: "center", padding: "20px 0" }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            backgroundColor: "#00b8a9",
          }}
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -4, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function NeuralOrbLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<(typeof programData)[0] | null>(null);
  const [aiExplanation, setAiExplanation] = useState("");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (isOpen) return;
    const timer = setTimeout(() => setShowTooltip(true), 4000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (step >= 1 && step <= questions.length) {
      setShowQuestion(false);
      const timer = setTimeout(() => setShowQuestion(true), prefersReducedMotion ? 0 : 550);
      return () => clearTimeout(timer);
    }
    setShowQuestion(true);
  }, [step, prefersReducedMotion]);

  const handleAnswer = useCallback(
    async (questionId: string, value: string) => {
      const newAnswers = { ...answers, [questionId]: value };
      setAnswers(newAnswers);

      const isLastQuestion = step === questions.length;
      if (!isLastQuestion) {
        setStep(step + 1);
        return;
      }

      setStep(4);
      try {
        const response = await fetch("/api/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            background: newAnswers.background,
            goals: newAnswers.interest,
            segment: newAnswers.availability,
          }),
        });
        const data = await response.json();
        const recs = data.recommendations;
        if (recs && recs.length > 0) {
          const topSlug = recs[0].slug || recs[0].program;
          const recommended = programData.find((p) => p.slug === topSlug) || matchProgram(newAnswers);
          setResult(recommended);
          setAiExplanation(recs[0].reason || recommended.description);
        } else {
          const recommended = matchProgram(newAnswers);
          setResult(recommended);
          setAiExplanation(recommended.description);
        }
      } catch {
        const recommended = matchProgram(newAnswers);
        setResult(recommended);
        setAiExplanation(recommended.description);
      }
      setStep(5);
    },
    [answers, step]
  );

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
    setAiExplanation("");
    setShowQuestion(true);
  };

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
    setShowTooltip(false);
  };

  const motionProps = useMemo(() => {
    if (prefersReducedMotion) return { initial: false as const, animate: {}, exit: {} };
    return {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
      transition: { duration: 0.3, ease: "easeOut" as const },
    };
  }, [prefersReducedMotion]);

  return (
    <>
      {/* Launcher */}
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "10px",
        }}
      >
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              style={{
                backgroundColor: "rgba(13,20,54,0.92)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                color: "#ccd6f6",
                padding: "8px 14px",
                borderRadius: "10px",
                fontSize: "12px",
                fontWeight: 500,
                boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
                border: "1px solid rgba(0,184,169,0.12)",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                letterSpacing: "0.01em",
              }}
            >
              Need help choosing? 🤖
            </motion.div>
          )}
        </AnimatePresence>

        {/* </> glyph button */}
        <motion.button
          onClick={toggleOpen}
          aria-label={isOpen ? "Close program advisor" : "Open program advisor"}
          whileHover={prefersReducedMotion ? {} : { scale: 1.06 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.94 }}
          className="ft-launcher"
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            border: "1px solid rgba(0,184,169,0.2)",
            cursor: "pointer",
            position: "relative",
            background: "rgba(13,20,54,0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 20px rgba(0,184,169,0.15), 0 4px 16px rgba(0,0,0,0.3)",
            transition: "box-shadow 0.3s ease, border-color 0.3s ease",
          }}
        >
          <span
            style={{
              color: "#00b8a9",
              fontSize: "16px",
              fontWeight: 700,
              fontFamily: "var(--font-mono, ui-monospace, monospace)",
              lineHeight: 1,
              letterSpacing: "-0.5px",
            }}
          >
            &lt;/&gt;
          </span>
        </motion.button>
      </div>

      {/* Backdrop — mobile only */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ft-backdrop"
            onClick={toggleOpen}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.55)",
              zIndex: 9997,
            }}
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ft-panel"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 420, damping: 36 }}
            style={{
              position: "fixed",
              bottom: "88px",
              right: "24px",
              width: "380px",
              maxHeight: "min(540px, calc(100vh - 120px))",
              background: "rgba(13,20,54,0.85)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: "18px",
              border: "1px solid",
              borderImage: "linear-gradient(135deg, rgba(30,45,107,0.6), rgba(0,184,169,0.25)) 1",
              boxShadow: "0 16px 56px rgba(0,0,0,0.45), 0 0 32px rgba(0,184,169,0.05), inset 0 1px 0 rgba(255,255,255,0.03)",
              zIndex: 9998,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "16px 18px",
                borderBottom: "1px solid rgba(30,45,107,0.4)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexShrink: 0,
              }}
            >
              {/* Mini terminal icon */}
              <div
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "6px",
                  background: "rgba(0,184,169,0.06)",
                  border: "1px solid rgba(0,184,169,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    color: "#00b8a9",
                    fontSize: "10px",
                    fontWeight: 700,
                    fontFamily: "var(--font-mono, ui-monospace, monospace)",
                    opacity: 0.8,
                  }}
                >
                  &gt;_
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#e6f1ff", fontSize: "13px", fontWeight: 600 }}>
                  Find Your Path
                </div>
                <div style={{ color: "#4a5568", fontSize: "10px", fontWeight: 500, letterSpacing: "0.04em" }}>
                  AI ADVISOR
                </div>
              </div>
              <button
                onClick={toggleOpen}
                aria-label="Close panel"
                className="ft-close-btn"
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "6px",
                  border: "1px solid rgba(30,45,107,0.4)",
                  backgroundColor: "transparent",
                  color: "#4a5568",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  lineHeight: 1,
                  flexShrink: 0,
                  transition: "all 0.15s ease",
                }}
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div
              style={{
                padding: "24px 20px",
                overflowY: "auto",
                flex: 1,
              }}
            >
              <AnimatePresence mode="wait">
                {/* Step 0: Intro */}
                {step === 0 && (
                  <motion.div key="intro" {...motionProps} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "10px",
                        background: "rgba(0,184,169,0.05)",
                        border: "1px solid rgba(0,184,169,0.1)",
                        margin: "0 auto 24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          color: "#00b8a9",
                          fontSize: "18px",
                          fontFamily: "var(--font-mono, ui-monospace, monospace)",
                          fontWeight: 600,
                          opacity: 0.7,
                        }}
                      >
                        ?
                      </span>
                    </div>
                    <h3 style={{ color: "#e6f1ff", fontSize: "17px", fontWeight: 700, marginBottom: "10px", letterSpacing: "-0.01em" }}>
                      Not sure where to start?
                    </h3>
                    <p style={{ color: "#4a5568", fontSize: "13px", lineHeight: 1.7, marginBottom: "28px", maxWidth: "260px", margin: "0 auto 28px" }}>
                      3 quick questions. I&apos;ll match you to the right CODED program.
                    </p>
                    <motion.button
                      onClick={() => setStep(1)}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.015, boxShadow: "0 6px 24px rgba(0,184,169,0.3)" }}
                      whileTap={prefersReducedMotion ? {} : { scale: 0.985 }}
                      style={{
                        background: "linear-gradient(135deg, #00b8a9, #00a08e)",
                        color: "white",
                        padding: "12px 24px",
                        borderRadius: "10px",
                        fontWeight: 600,
                        fontSize: "13px",
                        border: "none",
                        cursor: "pointer",
                        boxShadow: "0 4px 16px rgba(0,184,169,0.2)",
                        width: "100%",
                        letterSpacing: "0.02em",
                      }}
                    >
                      Start →
                    </motion.button>
                  </motion.div>
                )}

                {/* Steps 1-3: Questions */}
                {step >= 1 && step <= questions.length && (
                  <motion.div key={`q-${step}`} {...motionProps}>
                    {!showQuestion ? (
                      <TypingDots />
                    ) : (
                      <>
                        {/* Progress bar */}
                        <div style={{ display: "flex", gap: "4px", marginBottom: "24px" }}>
                          {questions.map((_, i) => (
                            <div
                              key={i}
                              style={{
                                height: "2px",
                                flex: 1,
                                borderRadius: "999px",
                                backgroundColor: i < step ? "#00b8a9" : "rgba(30,45,107,0.5)",
                                transition: "background-color 0.4s ease",
                              }}
                            />
                          ))}
                        </div>

                        <p style={{ color: "#4a5568", fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "6px", textAlign: "center" }}>
                          Question {step} of {questions.length}
                        </p>

                        <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#e6f1ff", marginBottom: "22px", textAlign: "center", lineHeight: 1.4 }}>
                          {questions[step - 1].question}
                        </h3>

                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          {questions[step - 1].options.map((option, i) => (
                            <motion.button
                              key={option.value}
                              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.05, duration: 0.25 }}
                              onClick={() => handleAnswer(questions[step - 1].id, option.value)}
                              className="ft-pill-btn"
                              whileHover={prefersReducedMotion ? {} : { y: -2, boxShadow: "0 4px 12px rgba(0,184,169,0.1)" }}
                              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                              style={{
                                backgroundColor: "rgba(17,29,74,0.4)",
                                border: "1px solid rgba(30,45,107,0.45)",
                                borderRadius: "999px",
                                padding: "12px 18px",
                                color: "#ccd6f6",
                                fontSize: "13px",
                                fontWeight: 500,
                                cursor: "pointer",
                                textAlign: "center",
                                lineHeight: 1.3,
                                transition: "border-color 0.2s ease, background-color 0.2s ease",
                              }}
                            >
                              {option.label}
                            </motion.button>
                          ))}
                        </div>
                      </>
                    )}
                  </motion.div>
                )}

                {/* Step 4: Loading */}
                {step === 4 && (
                  <motion.div key="loading" {...motionProps} style={{ textAlign: "center", padding: "40px 0" }}>
                    <TypingDots />
                    <p style={{ color: "#4a5568", fontSize: "12px", fontWeight: 500, marginTop: "8px" }}>
                      Analyzing...
                    </p>
                  </motion.div>
                )}

                {/* Step 5: Result */}
                {step === 5 && result && (
                  <motion.div key="result" {...motionProps}>
                    <p style={{ color: "#00b8a9", fontSize: "10px", letterSpacing: "0.14em", fontWeight: 600, marginBottom: "16px", textTransform: "uppercase", textAlign: "center" }}>
                      Your match
                    </p>

                    <motion.div
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12, duration: 0.35 }}
                      style={{
                        backgroundColor: "rgba(17,29,74,0.45)",
                        border: "1px solid rgba(30,45,107,0.4)",
                        borderRadius: "14px",
                        overflow: "hidden",
                        display: "flex",
                        marginBottom: "12px",
                      }}
                    >
                      {/* Left accent bar */}
                      <div
                        style={{
                          width: "4px",
                          flexShrink: 0,
                          background: `linear-gradient(180deg, ${result.color}, ${result.color}66)`,
                          borderRadius: "4px 0 0 4px",
                        }}
                      />

                      <div style={{ padding: "18px 16px", flex: 1 }}>
                        <div
                          style={{
                            display: "inline-block",
                            backgroundColor: "rgba(0,184,169,0.08)",
                            color: "#00b8a9",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            fontSize: "9px",
                            fontWeight: 700,
                            marginBottom: "12px",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            fontFamily: "var(--font-mono, ui-monospace, monospace)",
                          }}
                        >
                          recommended
                        </div>

                        <h3 style={{ fontSize: "19px", fontWeight: 700, color: "#e6f1ff", marginBottom: "8px", letterSpacing: "-0.01em" }}>
                          {result.title}
                        </h3>

                        <p style={{ color: "#4a5568", fontSize: "12px", lineHeight: 1.65, marginBottom: "16px", fontStyle: "italic" }}>
                          &ldquo;{aiExplanation}&rdquo;
                        </p>

                        {/* Stats — two rows, minimal */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px", marginBottom: "18px" }}>
                          {[
                            { label: "Duration", value: result.duration },
                            { label: "Price", value: result.price },
                            { label: "Next cohort", value: result.nextCohort },
                            { label: "Seats", value: `${result.seats} left` },
                          ].map((item) => (
                            <div key={item.label}>
                              <div style={{ color: "#4a5568", fontSize: "9px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2px" }}>
                                {item.label}
                              </div>
                              <div style={{ color: "#ccd6f6", fontSize: "12px", fontWeight: 600 }}>
                                {item.value}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div style={{ display: "flex", gap: "8px" }}>
                          <motion.a
                            href={`/programs/${result.slug}`}
                            whileHover={prefersReducedMotion ? {} : { scale: 1.015 }}
                            whileTap={prefersReducedMotion ? {} : { scale: 0.985 }}
                            style={{
                              background: `linear-gradient(135deg, ${result.color}, ${result.color}bb)`,
                              color: "white",
                              padding: "10px 18px",
                              borderRadius: "8px",
                              fontWeight: 600,
                              fontSize: "12px",
                              textDecoration: "none",
                              boxShadow: `0 4px 14px ${result.color}30`,
                              flex: 1,
                              textAlign: "center",
                              letterSpacing: "0.02em",
                            }}
                          >
                            Apply Now →
                          </motion.a>
                          <motion.button
                            onClick={reset}
                            whileHover={prefersReducedMotion ? {} : { borderColor: "rgba(0,184,169,0.25)" }}
                            style={{
                              backgroundColor: "transparent",
                              color: "#4a5568",
                              padding: "10px 12px",
                              borderRadius: "8px",
                              fontWeight: 500,
                              fontSize: "12px",
                              border: "1px solid rgba(30,45,107,0.4)",
                              cursor: "pointer",
                              whiteSpace: "nowrap",
                              transition: "all 0.2s ease",
                            }}
                          >
                            Retry
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .ft-launcher:hover {
          box-shadow: 0 0 28px rgba(0,184,169,0.25), 0 4px 20px rgba(0,0,0,0.35) !important;
          border-color: rgba(0,184,169,0.35) !important;
        }
        .ft-close-btn:hover {
          border-color: rgba(0,184,169,0.25) !important;
          color: #00b8a9 !important;
        }
        .ft-pill-btn:hover {
          border-color: rgba(0,184,169,0.3) !important;
          background-color: rgba(0,184,169,0.05) !important;
        }
        @media (min-width: 641px) {
          .ft-backdrop { display: none !important; }
        }
        @media (max-width: 640px) {
          .ft-panel {
            bottom: 0 !important;
            right: 0 !important;
            left: 0 !important;
            width: 100% !important;
            max-height: 70vh !important;
            border-radius: 18px 18px 0 0 !important;
          }
        }
      `}</style>
    </>
  );
}
