"use client";

import { useState } from "react";

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
    keywords: ["ai", "building", "products", "apps", "developer"],
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
    keywords: ["security", "cyber", "defense", "protecting"],
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
    keywords: ["data", "machine learning", "science", "models"],
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
    keywords: ["agents", "automation", "agentic", "workflows"],
  },
];

function matchProgram(answers: Record<string, string>): typeof programData[0] {
  const interest = answers.interest || "";
  if (interest.includes("cybersecurity")) return programData[1];
  if (interest.includes("data science")) return programData[2];
  if (interest.includes("agents")) return programData[3];
  return programData[0];
}

export default function FindYourPath() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<(typeof programData)[0] | null>(null);
  const [aiExplanation, setAiExplanation] = useState("");

  const handleAnswer = async (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    const isLastQuestion = step === questions.length;

    if (!isLastQuestion) {
      setStep(step + 1);
      return;
    }

    if (isLastQuestion) {
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
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
    setAiExplanation("");
  };

  return (
    <section
      id="find-your-path"
      style={{
        backgroundColor: "#0d1436",
        padding: "96px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "400px",
          background: "radial-gradient(ellipse, #00b8a920 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "0 40px",
          position: "relative",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        {step === 0 && (
          <div>
            <p
              style={{
                color: "#00b8a9",
                fontSize: "11px",
                letterSpacing: "0.15em",
                fontWeight: 600,
                marginBottom: "16px",
                textTransform: "uppercase",
              }}
            >
              AI-POWERED ADVISOR
            </p>
            <h2
              style={{
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 800,
                color: "white",
                lineHeight: 1.1,
                marginBottom: "16px",
              }}
            >
              Find your perfect
              <br />
              <span style={{ color: "#00b8a9" }}>CODED program</span>
            </h2>
            <p
              style={{
                color: "#8892b0",
                fontSize: "17px",
                lineHeight: 1.7,
                marginBottom: "40px",
                maxWidth: "500px",
                margin: "0 auto 40px",
              }}
            >
              Answer 3 quick questions and our AI will recommend the exact program built for where
              you are right now.
            </p>
            <button
              onClick={() => setStep(1)}
              style={{
                background: "linear-gradient(135deg, #00b8a9, #00a896)",
                color: "white",
                padding: "16px 40px",
                borderRadius: "999px",
                fontWeight: 700,
                fontSize: "16px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 8px 32px rgba(0,184,169,0.3)",
              }}
            >
              Find my program →
            </button>
          </div>
        )}

        {step >= 1 && step <= questions.length && (
          <div>
            <div
              style={{
                display: "flex",
                gap: "8px",
                justifyContent: "center",
                marginBottom: "48px",
              }}
            >
              {questions.map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: "3px",
                    width: "60px",
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
                fontSize: "13px",
                marginBottom: "16px",
                fontWeight: 500,
              }}
            >
              Question {step} of {questions.length}
            </p>

            <h2
              style={{
                fontSize: "clamp(24px, 4vw, 40px)",
                fontWeight: 800,
                color: "white",
                marginBottom: "40px",
                lineHeight: 1.2,
              }}
            >
              {questions[step - 1].question}
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
              className="find-path-grid"
            >
              {questions[step - 1].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(questions[step - 1].id, option.value)}
                  style={{
                    backgroundColor: "#111d4a",
                    border: "1.5px solid #1e2d6b",
                    borderRadius: "16px",
                    padding: "24px 20px",
                    color: "white",
                    fontSize: "15px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    textAlign: "left",
                    lineHeight: 1.4,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#00b8a9";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#0d2040";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#1e2d6b";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#111d4a";
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <div
              style={{
                width: "64px",
                height: "64px",
                border: "3px solid #1e2d6b",
                borderTop: "3px solid #00b8a9",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 32px",
              }}
            />
            <p style={{ color: "#8892b0", fontSize: "18px" }}>Finding your perfect match...</p>
          </div>
        )}

        {step === 5 && result && (
          <div>
            <p
              style={{
                color: "#00b8a9",
                fontSize: "11px",
                letterSpacing: "0.15em",
                fontWeight: 600,
                marginBottom: "24px",
                textTransform: "uppercase",
              }}
            >
              YOUR PERFECT MATCH
            </p>

            <div
              style={{
                backgroundColor: "#111d4a",
                border: `2px solid ${result.color}`,
                borderRadius: "24px",
                padding: "40px",
                marginBottom: "32px",
                textAlign: "left",
                boxShadow: `0 8px 40px ${result.color}22`,
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  backgroundColor: result.color + "20",
                  color: result.color,
                  padding: "4px 14px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: 700,
                  marginBottom: "16px",
                  letterSpacing: "0.05em",
                }}
              >
                RECOMMENDED FOR YOU
              </div>

              <h3
                style={{
                  fontSize: "32px",
                  fontWeight: 800,
                  color: "white",
                  marginBottom: "12px",
                }}
              >
                {result.title}
              </h3>

              <p
                style={{
                  color: "#8892b0",
                  fontSize: "15px",
                  lineHeight: 1.7,
                  marginBottom: "24px",
                  fontStyle: "italic",
                }}
              >
                &ldquo;{aiExplanation}&rdquo;
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "24px",
                  flexWrap: "wrap",
                  marginBottom: "32px",
                }}
              >
                {[
                  { label: "Duration", value: result.duration },
                  { label: "Starting from", value: result.price },
                  { label: "Next cohort", value: result.nextCohort },
                  { label: "Seats left", value: `${result.seats} remaining` },
                ].map((item) => (
                  <div key={item.label}>
                    <div
                      style={{
                        color: "#8892b0",
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        marginBottom: "4px",
                      }}
                    >
                      {item.label}
                    </div>
                    <div style={{ color: "white", fontSize: "15px", fontWeight: 700 }}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a
                  href={`/programs/${result.slug}`}
                  style={{
                    background: `linear-gradient(135deg, ${result.color}, ${result.color}cc)`,
                    color: "white",
                    padding: "14px 32px",
                    borderRadius: "999px",
                    fontWeight: 700,
                    fontSize: "15px",
                    textDecoration: "none",
                    boxShadow: `0 4px 20px ${result.color}44`,
                    display: "inline-block",
                  }}
                >
                  Apply Now →
                </a>
                <button
                  onClick={reset}
                  style={{
                    backgroundColor: "transparent",
                    color: "#8892b0",
                    padding: "14px 32px",
                    borderRadius: "999px",
                    fontWeight: 600,
                    fontSize: "15px",
                    border: "1.5px solid #1e2d6b",
                    cursor: "pointer",
                  }}
                >
                  Start over
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 640px) {
          .find-path-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
