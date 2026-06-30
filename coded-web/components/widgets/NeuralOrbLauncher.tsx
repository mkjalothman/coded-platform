"use client";

import { useState, useEffect, useCallback } from "react";

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

export default function NeuralOrbLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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
  };

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
    setShowTooltip(false);
  };

  const animDuration = prefersReducedMotion ? "0s" : "3s";
  const pulseAnimation = prefersReducedMotion ? "none" : "orbPulse 3s ease-in-out infinite";
  const lineAnimation = prefersReducedMotion ? "none" : "orbLineFloat 4s ease-in-out infinite";

  return (
    <>
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
        {showTooltip && !isOpen && (
          <div
            style={{
              backgroundColor: "#111d4a",
              color: "#ccd6f6",
              padding: "10px 16px",
              borderRadius: "12px",
              fontSize: "13px",
              fontWeight: 500,
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              border: "1px solid #1e2d6b",
              animation: prefersReducedMotion ? "none" : "tooltipFadeIn 0.5s ease forwards",
              opacity: prefersReducedMotion ? 1 : 0,
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}
          >
            Need help choosing? 🤖
          </div>
        )}

        {/* Neural Orb Button */}
        <button
          onClick={toggleOpen}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={isOpen ? "Close program advisor" : "Open program advisor"}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            position: "relative",
            background: "transparent",
            padding: 0,
            transition: "transform 0.3s ease",
            transform: isHovered && !isOpen ? "scale(1.1)" : "scale(1)",
          }}
        >
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              filter: `drop-shadow(0 0 ${isHovered ? "16px" : "10px"} rgba(0,184,169,${isHovered ? "0.6" : "0.35"}))`,
              transition: "filter 0.3s ease",
            }}
          >
            {/* Outer glow circle */}
            <circle
              cx="30"
              cy="30"
              r="28"
              fill="none"
              stroke="rgba(0,184,169,0.15)"
              strokeWidth="1"
              style={{ animation: pulseAnimation }}
            />

            {/* Connection lines radiating outward */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const innerR = 14;
              const outerR = isHovered ? 27 : 24;
              const x1 = 30 + Math.cos(rad) * innerR;
              const y1 = 30 + Math.sin(rad) * innerR;
              const x2 = 30 + Math.cos(rad) * outerR;
              const y2 = 30 + Math.sin(rad) * outerR;
              return (
                <line
                  key={angle}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(0,184,169,0.4)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  style={{
                    transition: "all 0.4s ease",
                    animation: lineAnimation,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              );
            })}

            {/* Small endpoint nodes */}
            {[0, 90, 180, 270].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const r = isHovered ? 26 : 23;
              return (
                <circle
                  key={`node-${angle}`}
                  cx={30 + Math.cos(rad) * r}
                  cy={30 + Math.sin(rad) * r}
                  r="2"
                  fill="rgba(0,184,169,0.5)"
                  style={{ transition: "all 0.4s ease" }}
                />
              );
            })}

            {/* Core orb gradient */}
            <defs>
              <radialGradient id="orbGrad" cx="40%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#00d4c1" />
                <stop offset="50%" stopColor="#00b8a9" />
                <stop offset="100%" stopColor="#0d1436" />
              </radialGradient>
            </defs>
            <circle cx="30" cy="30" r="14" fill="url(#orbGrad)" />

            {/* Inner highlight */}
            <circle cx="26" cy="26" r="4" fill="rgba(255,255,255,0.12)" />

            {/* Close X icon when open */}
            {isOpen && (
              <g stroke="white" strokeWidth="2" strokeLinecap="round">
                <line x1="22" y1="22" x2="38" y2="38" />
                <line x1="38" y1="22" x2="22" y2="38" />
              </g>
            )}
          </svg>
        </button>
      </div>

      {/* Panel */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "24px",
            width: "min(400px, calc(100vw - 48px))",
            maxHeight: "min(560px, calc(100vh - 140px))",
            backgroundColor: "#0d1436",
            borderRadius: "20px",
            border: "1px solid #1e2d6b",
            boxShadow: "0 12px 48px rgba(0,0,0,0.5), 0 0 30px rgba(0,184,169,0.08)",
            zIndex: 9998,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            animation: prefersReducedMotion ? "none" : "panelSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          {/* Panel header */}
          <div
            style={{
              padding: "20px 24px 16px",
              borderBottom: "1px solid #1e2d6b",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #00b8a9, #0d1436)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 12px rgba(0,184,169,0.3)",
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="4" fill="rgba(0,184,169,0.8)" />
                {[0, 72, 144, 216, 288].map((a) => {
                  const rad = (a * Math.PI) / 180;
                  return (
                    <line
                      key={a}
                      x1={8 + Math.cos(rad) * 4}
                      y1={8 + Math.sin(rad) * 4}
                      x2={8 + Math.cos(rad) * 7}
                      y2={8 + Math.sin(rad) * 7}
                      stroke="rgba(0,184,169,0.5)"
                      strokeWidth="1"
                    />
                  );
                })}
              </svg>
            </div>
            <div>
              <div style={{ color: "white", fontSize: "15px", fontWeight: 700 }}>
                Find Your Path
              </div>
              <div style={{ color: "#8892b0", fontSize: "11px" }}>AI-powered program advisor</div>
            </div>
          </div>

          {/* Panel body - scrollable */}
          <div
            style={{
              padding: "20px 24px",
              overflowY: "auto",
              flex: 1,
            }}
          >
            {/* Step 0: Intro */}
            {step === 0 && (
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, #00b8a920 0%, transparent 70%)",
                    border: "1px solid #00b8a930",
                    margin: "0 auto 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="6" fill="none" stroke="#00b8a9" strokeWidth="1.5" />
                    {[0, 60, 120, 180, 240, 300].map((a) => {
                      const rad = (a * Math.PI) / 180;
                      return (
                        <circle
                          key={a}
                          cx={12 + Math.cos(rad) * 10}
                          cy={12 + Math.sin(rad) * 10}
                          r="1.5"
                          fill="#00b8a960"
                        />
                      );
                    })}
                  </svg>
                </div>
                <h3
                  style={{
                    color: "white",
                    fontSize: "18px",
                    fontWeight: 700,
                    marginBottom: "8px",
                  }}
                >
                  Not sure where to start?
                </h3>
                <p
                  style={{
                    color: "#8892b0",
                    fontSize: "13px",
                    lineHeight: 1.6,
                    marginBottom: "24px",
                  }}
                >
                  Answer 3 quick questions and I&apos;ll recommend the perfect CODED program for you.
                </p>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    background: "linear-gradient(135deg, #00b8a9, #00a896)",
                    color: "white",
                    padding: "12px 28px",
                    borderRadius: "999px",
                    fontWeight: 700,
                    fontSize: "14px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(0,184,169,0.3)",
                    width: "100%",
                  }}
                >
                  Let&apos;s go →
                </button>
              </div>
            )}

            {/* Steps 1-3: Questions */}
            {step >= 1 && step <= questions.length && (
              <div>
                {/* Progress dots */}
                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                    justifyContent: "center",
                    marginBottom: "24px",
                  }}
                >
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      style={{
                        height: "3px",
                        width: "40px",
                        borderRadius: "999px",
                        backgroundColor: i < step ? "#00b8a9" : "#1e2d6b",
                        transition: "background-color 0.3s ease",
                      }}
                    />
                  ))}
                </div>

                <p
                  style={{
                    color: "#8892b0",
                    fontSize: "11px",
                    marginBottom: "8px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    textAlign: "center",
                  }}
                >
                  {step} of {questions.length}
                </p>

                <h3
                  style={{
                    fontSize: "17px",
                    fontWeight: 700,
                    color: "white",
                    marginBottom: "20px",
                    textAlign: "center",
                    lineHeight: 1.3,
                  }}
                >
                  {questions[step - 1].question}
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {questions[step - 1].options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(questions[step - 1].id, option.value)}
                      className="orb-option-btn"
                      style={{
                        backgroundColor: "#111d4a",
                        border: "1px solid #1e2d6b",
                        borderRadius: "12px",
                        padding: "14px 16px",
                        color: "white",
                        fontSize: "13px",
                        fontWeight: 600,
                        cursor: "pointer",
                        textAlign: "left",
                        lineHeight: 1.4,
                        transition: "all 0.2s ease",
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Loading */}
            {step === 4 && (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    border: "3px solid #1e2d6b",
                    borderTop: "3px solid #00b8a9",
                    borderRadius: "50%",
                    animation: prefersReducedMotion ? "none" : "spin 1s linear infinite",
                    margin: "0 auto 20px",
                  }}
                />
                <p style={{ color: "#8892b0", fontSize: "14px" }}>
                  Finding your match...
                </p>
              </div>
            )}

            {/* Step 5: Result */}
            {step === 5 && result && (
              <div>
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

                <div
                  style={{
                    backgroundColor: "#111d4a",
                    border: `1.5px solid ${result.color}`,
                    borderRadius: "16px",
                    padding: "20px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      backgroundColor: result.color + "20",
                      color: result.color,
                      padding: "3px 10px",
                      borderRadius: "999px",
                      fontSize: "10px",
                      fontWeight: 700,
                      marginBottom: "12px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    RECOMMENDED
                  </div>

                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: 800,
                      color: "white",
                      marginBottom: "8px",
                    }}
                  >
                    {result.title}
                  </h3>

                  <p
                    style={{
                      color: "#8892b0",
                      fontSize: "13px",
                      lineHeight: 1.6,
                      marginBottom: "16px",
                      fontStyle: "italic",
                    }}
                  >
                    &ldquo;{aiExplanation}&rdquo;
                  </p>

                  {/* Stats grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "12px",
                      marginBottom: "20px",
                    }}
                  >
                    {[
                      { label: "Duration", value: result.duration },
                      { label: "Price", value: result.price },
                      { label: "Next cohort", value: result.nextCohort },
                      { label: "Seats left", value: `${result.seats}` },
                    ].map((item) => (
                      <div key={item.label}>
                        <div
                          style={{
                            color: "#8892b0",
                            fontSize: "10px",
                            fontWeight: 600,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            marginBottom: "2px",
                          }}
                        >
                          {item.label}
                        </div>
                        <div
                          style={{
                            color: "white",
                            fontSize: "13px",
                            fontWeight: 700,
                          }}
                        >
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <a
                      href={`/programs/${result.slug}`}
                      style={{
                        background: `linear-gradient(135deg, ${result.color}, ${result.color}cc)`,
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "999px",
                        fontWeight: 700,
                        fontSize: "13px",
                        textDecoration: "none",
                        boxShadow: `0 4px 16px ${result.color}44`,
                        flex: 1,
                        textAlign: "center",
                      }}
                    >
                      Apply Now →
                    </a>
                    <button
                      onClick={reset}
                      style={{
                        backgroundColor: "transparent",
                        color: "#8892b0",
                        padding: "10px 16px",
                        borderRadius: "999px",
                        fontWeight: 600,
                        fontSize: "13px",
                        border: "1px solid #1e2d6b",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Restart
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes orbPulse {
          0%, 100% { r: 28; opacity: 1; }
          50% { r: 29; opacity: 0.6; }
        }
        @keyframes orbLineFloat {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        @keyframes tooltipFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes panelSlideIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .orb-option-btn:hover {
          border-color: #00b8a9 !important;
          background-color: #0d2040 !important;
        }
      `}</style>
    </>
  );
}
