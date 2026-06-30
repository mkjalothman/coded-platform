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
    <div style={{ display: "flex", gap: "4px", justifyContent: "center", padding: "16px 0" }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "#00b8a9",
          }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function CompletedPills({ step, answers }: { step: number; answers: Record<string, string> }) {
  const completed = questions.slice(0, step - 1);
  if (completed.length === 0) return null;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
      {completed.map((q) => {
        const selectedOption = q.options.find((o) => o.value === answers[q.id]);
        return (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              backgroundColor: "rgba(0,184,169,0.08)",
              border: "1px solid rgba(0,184,169,0.2)",
              borderRadius: "999px",
              padding: "4px 10px",
              fontSize: "11px",
              color: "#00b8a9",
              fontWeight: 500,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10">
              <path d="M2 5.5L4 7.5L8 3" stroke="#00b8a9" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {selectedOption?.label}
          </motion.div>
        );
      })}
    </div>
  );
}

export default function NeuralOrbLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
      const timer = setTimeout(() => setShowQuestion(true), prefersReducedMotion ? 0 : 600);
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
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
      transition: { type: "spring" as const, stiffness: 300, damping: 30 },
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
          gap: "12px",
        }}
      >
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.4 }}
              style={{
                backgroundColor: "rgba(13,20,54,0.9)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                color: "#ccd6f6",
                padding: "10px 16px",
                borderRadius: "12px",
                fontSize: "13px",
                fontWeight: 500,
                boxShadow: "0 4px 24px rgba(0,0,0,0.4), 0 0 8px rgba(0,184,169,0.06)",
                border: "1px solid rgba(0,184,169,0.15)",
                whiteSpace: "nowrap",
                pointerEvents: "none",
              }}
            >
              Need help choosing? 🤖
            </motion.div>
          )}
        </AnimatePresence>

        {/* Orb button — 48px, single concentric ring */}
        <motion.button
          onClick={toggleOpen}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={isOpen ? "Close program advisor" : "Open program advisor"}
          whileHover={prefersReducedMotion ? {} : { scale: 1.08 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            position: "relative",
            background: "transparent",
            padding: 0,
          }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" style={{ position: "absolute", top: 0, left: 0 }}>
            <defs>
              <radialGradient id="ngOrbGrad" cx="38%" cy="35%" r="55%">
                <stop offset="0%" stopColor="#00d4c1" />
                <stop offset="60%" stopColor="#00b8a9" />
                <stop offset="100%" stopColor="#0a1030" />
              </radialGradient>
              <filter id="ngGlow">
                <feGaussianBlur stdDeviation={isHovered ? "4" : "2.5"} />
              </filter>
            </defs>
            {/* Glow layer */}
            <circle cx="24" cy="24" r="11" fill="#00b8a9" opacity="0.3" filter="url(#ngGlow)" />
            {/* Concentric ring */}
            <circle
              cx="24"
              cy="24"
              r="21"
              fill="none"
              stroke="rgba(0,184,169,0.12)"
              strokeWidth="0.75"
              className="ng-ring"
            />
            {/* Core orb */}
            <circle cx="24" cy="24" r="11" fill="url(#ngOrbGrad)" />
            {/* Highlight */}
            <circle cx="21" cy="21" r="3" fill="rgba(255,255,255,0.1)" />
          </svg>
        </motion.button>
      </div>

      {/* Backdrop — mobile only */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ng-backdrop"
            onClick={toggleOpen}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.6)",
              zIndex: 9997,
            }}
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ng-panel"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            style={{
              position: "fixed",
              bottom: "88px",
              right: "24px",
              width: "388px",
              maxHeight: "min(540px, calc(100vh - 120px))",
              background: "rgba(13,20,54,0.88)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderRadius: "20px",
              border: "1px solid rgba(0,184,169,0.15)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,184,169,0.06), inset 0 1px 0 rgba(255,255,255,0.03)",
              zIndex: 9998,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Animated border glow — conic gradient overlay */}
            <div
              className="ng-border-glow"
              style={{
                position: "absolute",
                inset: "-1px",
                borderRadius: "21px",
                padding: "1px",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />

            {/* Header */}
            <div
              style={{
                padding: "18px 20px",
                borderBottom: "1px solid rgba(0,184,169,0.08)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flexShrink: 0,
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(0,184,169,0.2), rgba(13,20,54,0.6))",
                  border: "1px solid rgba(0,184,169,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <circle cx="6" cy="6" r="3" fill="none" stroke="#00b8a9" strokeWidth="1" opacity="0.8" />
                  <circle cx="6" cy="6" r="1.5" fill="#00b8a9" opacity="0.6" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#e6f1ff", fontSize: "13px", fontWeight: 600, letterSpacing: "0.01em" }}>
                  Find Your Path
                </div>
                <div style={{ color: "#5a6a8a", fontSize: "10px", fontWeight: 500, letterSpacing: "0.03em" }}>
                  AI-POWERED ADVISOR
                </div>
              </div>
              <button
                onClick={toggleOpen}
                aria-label="Close panel"
                className="ng-close-btn"
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "8px",
                  border: "1px solid rgba(0,184,169,0.1)",
                  backgroundColor: "rgba(0,184,169,0.04)",
                  color: "#5a6a8a",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  lineHeight: 1,
                  flexShrink: 0,
                  transition: "all 0.2s ease",
                }}
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div
              style={{
                padding: "24px 22px",
                overflowY: "auto",
                flex: 1,
                position: "relative",
                zIndex: 1,
              }}
            >
              <AnimatePresence mode="wait">
                {/* Step 0: Intro */}
                {step === 0 && (
                  <motion.div key="intro" {...motionProps} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(0,184,169,0.1) 0%, transparent 70%)",
                        border: "1px solid rgba(0,184,169,0.12)",
                        margin: "0 auto 24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20">
                        <circle cx="10" cy="10" r="5" fill="none" stroke="#00b8a9" strokeWidth="1" opacity="0.6" />
                        {[0, 72, 144, 216, 288].map((a) => {
                          const rad = (a * Math.PI) / 180;
                          return (
                            <circle key={a} cx={10 + Math.cos(rad) * 8} cy={10 + Math.sin(rad) * 8} r="1.2" fill="rgba(0,184,169,0.35)" />
                          );
                        })}
                      </svg>
                    </div>
                    <h3 style={{ color: "#e6f1ff", fontSize: "18px", fontWeight: 700, marginBottom: "10px", letterSpacing: "-0.01em" }}>
                      Not sure where to start?
                    </h3>
                    <p style={{ color: "#5a6a8a", fontSize: "13px", lineHeight: 1.7, marginBottom: "28px", maxWidth: "280px", margin: "0 auto 28px" }}>
                      Answer 3 quick questions and I&apos;ll recommend the perfect CODED program for you.
                    </p>
                    <motion.button
                      onClick={() => setStep(1)}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.02, boxShadow: "0 6px 28px rgba(0,184,169,0.35)" }}
                      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                      style={{
                        background: "linear-gradient(135deg, #00b8a9, #00a896)",
                        color: "white",
                        padding: "13px 28px",
                        borderRadius: "999px",
                        fontWeight: 600,
                        fontSize: "13px",
                        border: "none",
                        cursor: "pointer",
                        boxShadow: "0 4px 20px rgba(0,184,169,0.25)",
                        width: "100%",
                        letterSpacing: "0.02em",
                      }}
                    >
                      Let&apos;s go →
                    </motion.button>
                  </motion.div>
                )}

                {/* Steps 1-3: Questions */}
                {step >= 1 && step <= questions.length && (
                  <motion.div key={`q-${step}`} {...motionProps}>
                    <CompletedPills step={step} answers={answers} />

                    {!showQuestion ? (
                      <TypingDots />
                    ) : (
                      <>
                        <p
                          style={{
                            color: "#5a6a8a",
                            fontSize: "10px",
                            marginBottom: "6px",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            textAlign: "center",
                          }}
                        >
                          {step} of {questions.length}
                        </p>

                        <h3
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#e6f1ff",
                            marginBottom: "22px",
                            textAlign: "center",
                            lineHeight: 1.35,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {questions[step - 1].question}
                        </h3>

                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          {questions[step - 1].options.map((option, i) => (
                            <motion.button
                              key={option.value}
                              initial={prefersReducedMotion ? false : { opacity: 0, x: 16 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.06, type: "spring", stiffness: 400, damping: 30 }}
                              onClick={() => handleAnswer(questions[step - 1].id, option.value)}
                              className="ng-option-btn"
                              whileHover={prefersReducedMotion ? {} : { y: -1, boxShadow: "0 4px 16px rgba(0,184,169,0.12)" }}
                              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                              style={{
                                backgroundColor: "rgba(17,29,74,0.6)",
                                border: "1px solid rgba(30,45,107,0.5)",
                                borderRadius: "12px",
                                padding: "14px 16px",
                                color: "#ccd6f6",
                                fontSize: "13px",
                                fontWeight: 500,
                                cursor: "pointer",
                                textAlign: "left",
                                lineHeight: 1.4,
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
                  <motion.div key="loading" {...motionProps} style={{ textAlign: "center", padding: "36px 0" }}>
                    <div style={{ marginBottom: "20px" }}>
                      <TypingDots />
                    </div>
                    <p style={{ color: "#5a6a8a", fontSize: "13px", fontWeight: 500 }}>
                      Analyzing your answers...
                    </p>
                  </motion.div>
                )}

                {/* Step 5: Result */}
                {step === 5 && result && (
                  <motion.div key="result" {...motionProps}>
                    <p
                      style={{
                        color: "#00b8a9",
                        fontSize: "10px",
                        letterSpacing: "0.15em",
                        fontWeight: 600,
                        marginBottom: "16px",
                        textTransform: "uppercase",
                        textAlign: "center",
                      }}
                    >
                      YOUR PERFECT MATCH
                    </p>

                    <motion.div
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 30 }}
                      style={{
                        backgroundColor: "rgba(17,29,74,0.5)",
                        border: "1px solid rgba(0,184,169,0.12)",
                        borderRadius: "16px",
                        overflow: "hidden",
                        marginBottom: "12px",
                      }}
                    >
                      {/* Gradient header stripe */}
                      <div
                        style={{
                          height: "4px",
                          background: `linear-gradient(90deg, ${result.color}, ${result.color}88, ${result.color})`,
                        }}
                      />

                      <div style={{ padding: "20px" }}>
                        <div
                          style={{
                            display: "inline-block",
                            backgroundColor: "rgba(0,184,169,0.08)",
                            color: "#00b8a9",
                            padding: "3px 10px",
                            borderRadius: "999px",
                            fontSize: "9px",
                            fontWeight: 700,
                            marginBottom: "14px",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                          }}
                        >
                          RECOMMENDED
                        </div>

                        <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#e6f1ff", marginBottom: "8px", letterSpacing: "-0.01em" }}>
                          {result.title}
                        </h3>

                        <p style={{ color: "#5a6a8a", fontSize: "12px", lineHeight: 1.6, marginBottom: "18px", fontStyle: "italic" }}>
                          &ldquo;{aiExplanation}&rdquo;
                        </p>

                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "14px",
                            marginBottom: "20px",
                            padding: "14px",
                            backgroundColor: "rgba(0,0,0,0.15)",
                            borderRadius: "10px",
                          }}
                        >
                          {[
                            { label: "Duration", value: result.duration },
                            { label: "Price", value: result.price },
                            { label: "Next cohort", value: result.nextCohort },
                            { label: "Seats left", value: `${result.seats} remaining` },
                          ].map((item) => (
                            <div key={item.label}>
                              <div style={{ color: "#5a6a8a", fontSize: "9px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "3px" }}>
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
                            whileHover={prefersReducedMotion ? {} : { scale: 1.02, boxShadow: `0 6px 24px ${result.color}44` }}
                            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                            style={{
                              background: `linear-gradient(135deg, ${result.color}, ${result.color}cc)`,
                              color: "white",
                              padding: "11px 20px",
                              borderRadius: "999px",
                              fontWeight: 600,
                              fontSize: "12px",
                              textDecoration: "none",
                              boxShadow: `0 4px 16px ${result.color}33`,
                              flex: 1,
                              textAlign: "center",
                              letterSpacing: "0.02em",
                            }}
                          >
                            Apply Now →
                          </motion.a>
                          <motion.button
                            onClick={reset}
                            whileHover={prefersReducedMotion ? {} : { borderColor: "rgba(0,184,169,0.3)" }}
                            style={{
                              backgroundColor: "transparent",
                              color: "#5a6a8a",
                              padding: "11px 14px",
                              borderRadius: "999px",
                              fontWeight: 500,
                              fontSize: "12px",
                              border: "1px solid rgba(30,45,107,0.5)",
                              cursor: "pointer",
                              whiteSpace: "nowrap",
                              transition: "all 0.2s ease",
                            }}
                          >
                            Restart
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
        @keyframes ngRingPulse {
          0%, 100% { opacity: 0.12; transform: scale(1); }
          50% { opacity: 0.06; transform: scale(1.06); }
        }
        @keyframes ngBorderRotate {
          from { --ng-angle: 0deg; }
          to { --ng-angle: 360deg; }
        }
        .ng-ring {
          transform-origin: center;
          animation: ngRingPulse 3s ease-in-out infinite;
        }
        .ng-close-btn:hover {
          border-color: rgba(0,184,169,0.3) !important;
          color: #00b8a9 !important;
          background-color: rgba(0,184,169,0.08) !important;
        }
        .ng-option-btn:hover {
          border-color: rgba(0,184,169,0.3) !important;
          background-color: rgba(0,184,169,0.06) !important;
        }
        .ng-border-glow {
          background: conic-gradient(
            from var(--ng-angle, 0deg),
            transparent 0%,
            rgba(0,184,169,0.15) 25%,
            transparent 50%,
            rgba(30,45,107,0.3) 75%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: ngBorderRotate 8s linear infinite;
        }
        @property --ng-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        @media (min-width: 641px) {
          .ng-backdrop { display: none !important; }
        }
        @media (max-width: 640px) {
          .ng-panel {
            bottom: 0 !important;
            right: 0 !important;
            left: 0 !important;
            width: 100% !important;
            max-height: 70vh !important;
            border-radius: 20px 20px 0 0 !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ng-ring { animation: none; }
          .ng-border-glow { animation: none; }
        }
      `}</style>
    </>
  );
}
