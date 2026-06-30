"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { colors, spring, easing } from "@/design-system";

/* ────────────────────────────────────────────
   Types
   ──────────────────────────────────────────── */

interface Program {
  slug: string;
  name: string;
  description: string;
  accent_color: string;
  category: string;
  price: string;
  duration: string;
  next_cohort: string;
  seats_left: number;
}

interface QuestionDef {
  id: string;
  question: string;
  options: { label: string; value: string; icon: string }[];
}

/* ────────────────────────────────────────────
   Fallback programs (never breaks if Supabase is down)
   ──────────────────────────────────────────── */

const FALLBACK_PROGRAMS: Program[] = [
  { slug: "ai-app-developer", name: "AI App Developer", accent_color: colors.track.aiAppDev, category: "bootcamp", price: "KWD 450", duration: "12 weeks", next_cohort: "Aug 12, 2025", seats_left: 7, description: "Build full-stack AI products from frontend to backend using modern tools and real workflows." },
  { slug: "cybersecurity", name: "Cybersecurity", accent_color: colors.track.cybersecurity, category: "bootcamp", price: "KWD 350", duration: "10 weeks", next_cohort: "Oct 5, 2025", seats_left: 20, description: "Real attack and defense techniques. Hands-on labs, no dry theory." },
  { slug: "ai-data-science", name: "AI & Data Science", accent_color: colors.track.aiDataScience, category: "bootcamp", price: "KWD 380", duration: "10 weeks", next_cohort: "Oct 12, 2025", seats_left: 20, description: "Work with real data, build models, and turn insights into decisions." },
  { slug: "agentic-ai", name: "Agentic AI Bootcamp", accent_color: colors.track.agenticAi, category: "bootcamp", price: "KWD 400", duration: "10 weeks", next_cohort: "Sep 8, 2025", seats_left: 18, description: "Design and deploy AI agents that reason, plan, and execute tasks autonomously." },
  { slug: "kids", name: "Spark Your Kid", accent_color: "#ef4444", category: "kids", price: "KWD 150", duration: "Weekends & breaks", next_cohort: "Rolling enrollment", seats_left: 15, description: "A guided start that builds logic, creativity, and confidence through coding." },
  { slug: "youth", name: "Launch Your Tech Career", accent_color: "#3b82f6", category: "youth", price: "KWD 250", duration: "Semester-based", next_cohort: "Sep 2025", seats_left: 25, description: "Year-round programs for students and fresh graduates to build real skills." },
  { slug: "enterprise", name: "Build Job Skills", accent_color: "#0a0f2e", category: "enterprise", price: "Custom pricing", duration: "Flexible", next_cohort: "On demand", seats_left: 0, description: "Intensive, career-focused training for teams with custom curriculum." },
];

/* ────────────────────────────────────────────
   Question bank
   ──────────────────────────────────────────── */

const audienceQ: QuestionDef = {
  id: "audience",
  question: "Who is this for?",
  options: [
    { label: "Myself (adult)", value: "adult", icon: "briefcase" },
    { label: "A teen (14–24)", value: "youth", icon: "cap" },
    { label: "A child (6–13)", value: "child", icon: "spark" },
    { label: "A company", value: "enterprise", icon: "building" },
  ],
};

const adultQuestions: QuestionDef[] = [
  audienceQ,
  {
    id: "background",
    question: "What describes you best?",
    options: [
      { label: "Working professional", value: "working professional looking to upskill", icon: "briefcase" },
      { label: "Fresh graduate", value: "fresh graduate starting my career", icon: "cap" },
      { label: "Career changer", value: "changing careers into tech", icon: "arrows" },
      { label: "Business owner", value: "business owner wanting to understand tech", icon: "building" },
    ],
  },
  {
    id: "interest",
    question: "What excites you most?",
    options: [
      { label: "Building AI products", value: "building AI-powered products and apps", icon: "spark" },
      { label: "Cybersecurity & defense", value: "cybersecurity and protecting systems", icon: "shield" },
      { label: "Data & machine learning", value: "data science and machine learning", icon: "chart" },
      { label: "AI agents & automation", value: "AI agents and workflow automation", icon: "bot" },
    ],
  },
  {
    id: "availability",
    question: "When can you study?",
    options: [
      { label: "Evenings after work", value: "evenings after work", icon: "moon" },
      { label: "Flexible schedule", value: "flexible schedule", icon: "clock" },
      { label: "I want to start ASAP", value: "as soon as possible", icon: "bolt" },
      { label: "Planning ahead", value: "planning for next semester", icon: "calendar" },
    ],
  },
];

const youthQuestions: QuestionDef[] = [
  audienceQ,
  {
    id: "interest",
    question: "What sounds most interesting?",
    options: [
      { label: "Building apps & websites", value: "building apps and websites", icon: "spark" },
      { label: "AI & machine learning", value: "AI and machine learning", icon: "bot" },
      { label: "Cybersecurity & hacking", value: "cybersecurity and ethical hacking", icon: "shield" },
      { label: "Not sure yet", value: "exploring options", icon: "arrows" },
    ],
  },
];

const kidsQuestions: QuestionDef[] = [
  audienceQ,
  {
    id: "goal",
    question: "What's the goal for your child?",
    options: [
      { label: "Learn to think logically", value: "develop logical thinking", icon: "chart" },
      { label: "Build fun projects", value: "build fun creative projects", icon: "spark" },
      { label: "Get ahead in school", value: "gain an academic advantage", icon: "cap" },
      { label: "See if they like coding", value: "explore if coding is a fit", icon: "arrows" },
    ],
  },
];

const enterpriseQuestions: QuestionDef[] = [
  audienceQ,
  {
    id: "need",
    question: "What does your team need?",
    options: [
      { label: "AI & automation skills", value: "AI and automation upskilling", icon: "bot" },
      { label: "Cybersecurity training", value: "cybersecurity awareness and training", icon: "shield" },
      { label: "Data literacy", value: "data analysis and literacy", icon: "chart" },
      { label: "Custom program", value: "a custom-designed training program", icon: "building" },
    ],
  },
];

function getQuestionSet(audience: string): QuestionDef[] {
  switch (audience) {
    case "youth": return youthQuestions;
    case "child": return kidsQuestions;
    case "enterprise": return enterpriseQuestions;
    default: return adultQuestions;
  }
}

/* ────────────────────────────────────────────
   Local matching (fallback when AI API unavailable)
   ──────────────────────────────────────────── */

function matchPrograms(answers: Record<string, string>, programs: Program[]): { primary: Program; secondary: Program | null; reason: string } {
  const audience = answers.audience || "adult";
  const interest = answers.interest || "";
  const goal = answers.goal || "";
  const need = answers.need || "";
  const background = answers.background || "";
  const availability = answers.availability || "";

  const bootcamps = programs.filter((p) => p.category === "bootcamp");
  const find = (slug: string) => programs.find((p) => p.slug === slug);

  if (audience === "child") {
    const kids = find("kids") || FALLBACK_PROGRAMS[4];
    return { primary: kids, secondary: find("youth") || null, reason: `Because your child is in the 6–13 age range, this program builds coding confidence through fun, guided projects.` };
  }

  if (audience === "youth") {
    const youth = find("youth") || FALLBACK_PROGRAMS[5];
    let secondary: Program | null = null;
    let reason = "Designed for students and fresh graduates ready to build real tech skills.";
    if (interest.includes("cybersecurity")) {
      secondary = find("cybersecurity") || null;
      reason = "Great for teens interested in cybersecurity — start with our youth track and level up.";
    } else if (interest.includes("AI")) {
      secondary = find("ai-app-developer") || null;
      reason = "Perfect for teens excited about AI — our youth track gets you started building.";
    }
    return { primary: youth, secondary, reason };
  }

  if (audience === "enterprise") {
    const enterprise = find("enterprise") || FALLBACK_PROGRAMS[6];
    let secondary: Program | null = null;
    if (need.includes("cybersecurity")) secondary = find("cybersecurity") || null;
    else if (need.includes("AI")) secondary = find("ai-app-developer") || null;
    else if (need.includes("data")) secondary = find("ai-data-science") || null;
    return { primary: enterprise, secondary, reason: `Custom training designed around your team's needs with flexible scheduling.` };
  }

  // Adult bootcamp matching
  let primary: Program = bootcamps[0] || FALLBACK_PROGRAMS[0];
  let secondary: Program | null = null;

  if (interest.includes("cybersecurity")) {
    primary = find("cybersecurity") || FALLBACK_PROGRAMS[1];
    secondary = find("ai-app-developer") || null;
  } else if (interest.includes("data science")) {
    primary = find("ai-data-science") || FALLBACK_PROGRAMS[2];
    secondary = find("ai-app-developer") || null;
  } else if (interest.includes("agents")) {
    primary = find("agentic-ai") || FALLBACK_PROGRAMS[3];
    secondary = find("ai-app-developer") || null;
  } else {
    primary = find("ai-app-developer") || FALLBACK_PROGRAMS[0];
    secondary = find("agentic-ai") || null;
  }

  const bgSnippet = background.includes("career") ? "as someone changing careers" : background.includes("graduate") ? "as a fresh graduate" : background.includes("professional") ? "as a working professional" : "";
  const timeSnippet = availability.includes("evening") ? " with evening sessions that fit your schedule" : availability.includes("ASAP") || availability.includes("soon") ? " and you can start right away" : "";

  return { primary, secondary, reason: `${bgSnippet ? `Perfect ${bgSnippet}` : "Based on your interests"} — this track focuses on ${interest.includes("cybersecurity") ? "hands-on security skills" : interest.includes("data") ? "real data and models" : interest.includes("agents") ? "autonomous AI agents" : "building AI products"}${timeSnippet}.` };
}

/* ────────────────────────────────────────────
   Sub-components
   ──────────────────────────────────────────── */

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: "6px", justifyContent: "center", padding: "20px 0" }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: colors.brand.teal }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1, 0.7] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function OptionIcon({ icon }: { icon: string }) {
  const s = { stroke: colors.brand.teal, strokeWidth: 1.5, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const svgProps = { width: 16, height: 16, viewBox: "0 0 16 16" };
  switch (icon) {
    case "briefcase": return <svg {...svgProps}><rect x="2" y="5" width="12" height="9" rx="1.5" {...s} /><path d="M5.5 5V3.5a1 1 0 011-1h3a1 1 0 011 1V5" {...s} /></svg>;
    case "cap": return <svg {...svgProps}><path d="M8 2L1.5 6l6.5 4 6.5-4L8 2z" {...s} /><path d="M3.5 8v3.5c0 1 2 2.5 4.5 2.5s4.5-1.5 4.5-2.5V8" {...s} /></svg>;
    case "arrows": return <svg {...svgProps}><path d="M4 12l4-4 4 4M4 4l4 4 4-4" {...s} /></svg>;
    case "building": return <svg {...svgProps}><rect x="3" y="2" width="10" height="12" rx="1" {...s} /><path d="M6 5h1M9 5h1M6 8h1M9 8h1M6 11h4" {...s} /></svg>;
    case "spark": return <svg {...svgProps}><path d="M8 1l1.5 4.5H14l-3.5 3 1.5 5L8 10.5 3.5 13.5l1.5-5L1.5 5.5H6z" {...s} /></svg>;
    case "shield": return <svg {...svgProps}><path d="M8 1.5L2.5 4v4c0 3.5 2.5 5.5 5.5 6.5 3-1 5.5-3 5.5-6.5V4L8 1.5z" {...s} /></svg>;
    case "chart": return <svg {...svgProps}><path d="M2 13h12M4 13V8M7 13V5M10 13V7M13 13V3" {...s} /></svg>;
    case "bot": return <svg {...svgProps}><rect x="3" y="5" width="10" height="8" rx="2" {...s} /><circle cx="6" cy="9" r="1" fill={colors.brand.teal} /><circle cx="10" cy="9" r="1" fill={colors.brand.teal} /><path d="M8 2v3M5 3.5h6" {...s} /></svg>;
    case "moon": return <svg {...svgProps}><path d="M13 9A5 5 0 117 3a4 4 0 006 6z" {...s} /></svg>;
    case "clock": return <svg {...svgProps}><circle cx="8" cy="8" r="6" {...s} /><path d="M8 4v4l3 2" {...s} /></svg>;
    case "bolt": return <svg {...svgProps}><path d="M9 1L3 9h4.5L6 15l7-8H8.5z" {...s} /></svg>;
    case "calendar": return <svg {...svgProps}><rect x="2" y="3" width="12" height="11" rx="1.5" {...s} /><path d="M2 7h12M5 1v3M11 1v3" {...s} /></svg>;
    default: return null;
  }
}

function ProgressSegments({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ display: "flex", gap: "3px", marginBottom: "24px" }}>
      {Array.from({ length: total }, (_, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={{
            backgroundColor: i < current ? colors.brand.teal : "rgba(30,45,107,0.5)",
            scaleX: i < current ? 1 : 0.92,
          }}
          transition={{ duration: 0.4, ease: easing.apple }}
          style={{ height: "3px", flex: 1, borderRadius: "999px", transformOrigin: "left" }}
        />
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────
   Main Component
   ──────────────────────────────────────────── */

export default function NeuralOrbLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [showQuestion, setShowQuestion] = useState(true);

  const [step, setStep] = useState(1); // 1-based question index
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Program | null>(null);
  const [secondaryResult, setSecondaryResult] = useState<Program | null>(null);
  const [aiExplanation, setAiExplanation] = useState("");
  const [phase, setPhase] = useState<"questions" | "loading" | "result">("questions");

  // Lead capture
  const [leadEmail, setLeadEmail] = useState("");
  const [leadName, setLeadName] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);

  // Programs from Supabase
  const [programs, setPrograms] = useState<Program[]>(FALLBACK_PROGRAMS);
  const programsFetched = useRef(false);

  // Fetch programs once
  useEffect(() => {
    if (programsFetched.current) return;
    programsFetched.current = true;

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return;

    fetch(`${url}/rest/v1/programs?select=slug,name,description,accent_color,category,price,duration,next_cohort,seats_left&order=sort`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    })
      .then((r) => r.json())
      .then((data: Program[]) => {
        if (Array.isArray(data) && data.length > 0) setPrograms(data);
      })
      .catch(() => {});
  }, []);

  // Reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Tooltip delay
  useEffect(() => {
    if (isOpen) return;
    const timer = setTimeout(() => setShowTooltip(true), 5000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Typing-dots delay between questions
  useEffect(() => {
    if (phase !== "questions") return;
    setShowQuestion(false);
    const timer = setTimeout(() => setShowQuestion(true), prefersReducedMotion ? 0 : 400);
    return () => clearTimeout(timer);
  }, [step, phase, prefersReducedMotion]);

  const questionSet = useMemo(() => getQuestionSet(answers.audience || ""), [answers.audience]);
  const totalQuestions = questionSet.length;
  const currentQ = questionSet[step - 1] as QuestionDef | undefined;

  const handleAnswer = useCallback(
    async (questionId: string, value: string) => {
      const newAnswers = { ...answers, [questionId]: value };
      setAnswers(newAnswers);

      // After audience question, the question set might change
      const newSet = questionId === "audience" ? getQuestionSet(value) : questionSet;
      const isLast = step >= newSet.length;

      if (!isLast) {
        setStep(step + 1);
        return;
      }

      // Last question → analyze
      setPhase("loading");

      let primary: Program;
      let secondary: Program | null;
      let reason: string;

      try {
        const response = await fetch("/api/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            background: newAnswers.background,
            goals: newAnswers.interest || newAnswers.goal || newAnswers.need,
            segment: newAnswers.audience === "child" ? "kids" : newAnswers.audience,
          }),
        });
        const data = await response.json();
        const recs = data.recommendations;
        if (recs && recs.length > 0) {
          const topSlug = recs[0].slug || recs[0].program;
          primary = programs.find((p) => p.slug === topSlug) || matchPrograms(newAnswers, programs).primary;
          reason = recs[0].reason || primary.description;
          const secSlug = recs[1]?.slug;
          secondary = secSlug ? programs.find((p) => p.slug === secSlug) || null : matchPrograms(newAnswers, programs).secondary;
        } else {
          ({ primary, secondary, reason } = matchPrograms(newAnswers, programs));
        }
      } catch {
        ({ primary, secondary, reason } = matchPrograms(newAnswers, programs));
      }

      setResult(primary);
      setSecondaryResult(secondary?.slug === primary.slug ? null : secondary);
      setAiExplanation(reason);
      setPhase("result");
    },
    [answers, step, programs, questionSet]
  );

  const goBack = useCallback(() => {
    if (step <= 1) return;
    const prevQ = questionSet[step - 2];
    if (prevQ) {
      const newAnswers = { ...answers };
      delete newAnswers[prevQ.id];
      // If going back to audience question, also clear downstream answers
      if (prevQ.id === "audience") {
        setAnswers({ });
      } else {
        setAnswers(newAnswers);
      }
    }
    setStep(step - 1);
  }, [step, answers, questionSet]);

  const reset = () => {
    setStep(1);
    setAnswers({});
    setResult(null);
    setSecondaryResult(null);
    setAiExplanation("");
    setPhase("questions");
    setLeadEmail("");
    setLeadName("");
    setLeadSubmitted(false);
    setLeadSubmitting(false);
    setShowQuestion(true);
  };

  const toggleOpen = () => {
    if (!isOpen) reset();
    setIsOpen((prev) => !prev);
    setShowTooltip(false);
  };

  const submitLead = async () => {
    if (!leadEmail || !result) return;
    setLeadSubmitting(true);
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (url && key) {
        await fetch(`${url}/rest/v1/leads`, {
          method: "POST",
          headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            email: leadEmail,
            name: leadName,
            recommended_program: result.slug,
            answers,
          }),
        });
      }
    } catch {}
    setLeadSubmitted(true);
    setLeadSubmitting(false);
  };

  const motionProps = useMemo(() => {
    if (prefersReducedMotion) return { initial: false as const, animate: {}, exit: {} };
    return {
      initial: { opacity: 0, y: 14 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
      transition: { duration: 0.35, ease: easing.apple },
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
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.92 }}
              transition={{ duration: 0.4, ease: easing.apple }}
              style={{
                backgroundColor: "rgba(10,15,46,0.94)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                color: colors.text.bodySubtle,
                padding: "10px 16px",
                borderRadius: "12px",
                fontSize: "13px",
                fontWeight: 500,
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                border: "1px solid rgba(0,184,169,0.12)",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                letterSpacing: "0.01em",
              }}
            >
              Not sure which program?
            </motion.div>
          )}
        </AnimatePresence>

        {/* Orb button */}
        <motion.button
          onClick={toggleOpen}
          aria-label={isOpen ? "Close program advisor" : "Open program advisor"}
          whileHover={prefersReducedMotion ? {} : { scale: 1.08 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.94 }}
          className="ng-launcher"
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            position: "relative",
            background: "transparent",
            padding: 0,
          }}
        >
          <svg width="56" height="56" viewBox="0 0 56 56" style={{ position: "absolute", top: 0, left: 0 }}>
            <defs>
              <radialGradient id="ngOrbFill" cx="40%" cy="35%" r="55%">
                <stop offset="0%" stopColor="#00d4c1" />
                <stop offset="55%" stopColor={colors.brand.teal} />
                <stop offset="100%" stopColor={colors.brand.navyDeep} />
              </radialGradient>
              <filter id="ngGlow"><feGaussianBlur stdDeviation="3" /></filter>
            </defs>
            <circle cx="28" cy="28" r="26" fill="none" stroke="rgba(0,184,169,0.1)" strokeWidth="0.75" className="ng-ring-outer" />
            <circle cx="28" cy="28" r="15" fill={colors.brand.teal} opacity="0.2" filter="url(#ngGlow)" />
            <circle cx="28" cy="28" r="15" fill="url(#ngOrbFill)" />
            <circle cx="24" cy="24" r="4" fill="rgba(255,255,255,0.08)" />
            <g transform="translate(28,28)">
              <path d="M0-5L3 0 0 5-3 0z" fill="rgba(255,255,255,0.9)" />
              <path d="M0 0L3 0 0 5-3 0z" fill="rgba(255,255,255,0.5)" />
            </g>
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
            style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", zIndex: 9997 }}
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
            transition={spring.snappy}
            style={{
              position: "fixed",
              bottom: "96px",
              right: "24px",
              width: "392px",
              maxHeight: "min(620px, calc(100vh - 130px))",
              background: "rgba(10,15,46,0.92)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              borderRadius: "20px",
              border: "1px solid rgba(0,184,169,0.12)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 0 40px rgba(0,184,169,0.04), inset 0 1px 0 rgba(255,255,255,0.04)",
              zIndex: 9998,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Animated border glow */}
            <div className="ng-border-glow" style={{ position: "absolute", inset: "-1px", borderRadius: "21px", padding: "1px", pointerEvents: "none", zIndex: 0 }} />
            {/* Dot pattern */}
            <div className="ng-dots" style={{ position: "absolute", inset: 0, borderRadius: "20px", pointerEvents: "none", zIndex: 0, opacity: 0.35 }} />

            {/* Header */}
            <div style={{
              padding: "16px 20px",
              borderBottom: "1px solid rgba(0,184,169,0.06)",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexShrink: 0,
              position: "relative",
              zIndex: 1,
            }}>
              {/* Back button (visible when step > 1 and still in questions phase) */}
              {phase === "questions" && step > 1 && (
                <button
                  onClick={goBack}
                  aria-label="Go back"
                  className="ng-close-btn"
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    border: "1px solid rgba(0,184,169,0.08)",
                    backgroundColor: "rgba(0,184,169,0.03)",
                    color: colors.text.bodyDark,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    lineHeight: 1,
                    flexShrink: 0,
                    transition: "all 0.2s ease",
                  }}
                >
                  &#8592;
                </button>
              )}
              {/* Compass icon */}
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, rgba(0,184,169,0.12), rgba(0,184,169,0.03))",
                border: "1px solid rgba(0,184,169,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="6.5" fill="none" stroke="rgba(0,184,169,0.4)" strokeWidth="1" />
                  <circle cx="8" cy="8" r="1" fill={colors.brand.teal} />
                  <path d="M8 3L9.5 7.5 8 8 6.5 7.5z" fill={colors.brand.teal} opacity="0.9" />
                  <path d="M8 13L6.5 8.5 8 8 9.5 8.5z" fill={colors.brand.teal} opacity="0.4" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#e6f1ff", fontSize: "14px", fontWeight: 600, letterSpacing: "-0.01em" }}>Find Your Path</div>
                <div style={{ color: colors.text.bodyDark, fontSize: "10px", fontWeight: 500, letterSpacing: "0.04em", opacity: 0.7 }}>AI-POWERED ADVISOR</div>
              </div>
              <button
                onClick={toggleOpen}
                aria-label="Close panel"
                className="ng-close-btn"
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  border: "1px solid rgba(0,184,169,0.08)",
                  backgroundColor: "rgba(0,184,169,0.03)",
                  color: colors.text.bodyDark,
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
                &#x2715;
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: "24px 22px", overflowY: "auto", flex: 1, position: "relative", zIndex: 1 }}>
              <AnimatePresence mode="wait">
                {/* Questions */}
                {phase === "questions" && currentQ && (
                  <motion.div key={`q-${step}-${currentQ.id}`} {...motionProps}>
                    {!showQuestion ? (
                      <TypingDots />
                    ) : (
                      <>
                        <ProgressSegments current={step} total={totalQuestions} />
                        <p style={{
                          color: colors.text.bodyDark,
                          fontSize: "10px",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          marginBottom: "8px",
                          textAlign: "center",
                          opacity: 0.7,
                        }}>
                          Question {step} of {totalQuestions}
                        </p>
                        <h3 style={{
                          fontSize: "17px",
                          fontWeight: 700,
                          color: "#e6f1ff",
                          marginBottom: "22px",
                          textAlign: "center",
                          lineHeight: 1.4,
                          letterSpacing: "-0.01em",
                        }}>
                          {currentQ.question}
                        </h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          {currentQ.options.map((option, i) => (
                            <motion.button
                              key={option.value}
                              initial={prefersReducedMotion ? false : { opacity: 0, x: 12 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.06, ...spring.snappy }}
                              onClick={() => handleAnswer(currentQ.id, option.value)}
                              className="ng-option-btn"
                              whileHover={prefersReducedMotion ? {} : { x: 4, boxShadow: "0 4px 16px rgba(0,184,169,0.08)" }}
                              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                              style={{
                                backgroundColor: "rgba(17,29,74,0.45)",
                                border: "1px solid rgba(30,45,107,0.45)",
                                borderRadius: "14px",
                                padding: "14px 16px",
                                color: colors.text.bodySubtle,
                                fontSize: "13px",
                                fontWeight: 500,
                                cursor: "pointer",
                                textAlign: "left",
                                lineHeight: 1.4,
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                transition: "border-color 0.2s ease, background-color 0.2s ease, border-left-color 0.2s ease",
                                borderLeft: "3px solid transparent",
                              }}
                            >
                              <span style={{ flexShrink: 0, opacity: 0.7, display: "flex" }}>
                                <OptionIcon icon={option.icon} />
                              </span>
                              {option.label}
                            </motion.button>
                          ))}
                        </div>
                      </>
                    )}
                  </motion.div>
                )}

                {/* Loading */}
                {phase === "loading" && (
                  <motion.div key="loading" {...motionProps} style={{ textAlign: "center", padding: "48px 0" }}>
                    <motion.div
                      animate={prefersReducedMotion ? {} : { rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      style={{ display: "inline-block", marginBottom: "16px" }}
                    >
                      <svg width="32" height="32" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="12" fill="none" stroke="rgba(0,184,169,0.15)" strokeWidth="2" />
                        <path d="M16 4a12 12 0 0 1 12 12" fill="none" stroke={colors.brand.teal} strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </motion.div>
                    <p style={{ color: colors.text.bodyDark, fontSize: "13px", fontWeight: 500 }}>
                      Analyzing your answers...
                    </p>
                  </motion.div>
                )}

                {/* Result */}
                {phase === "result" && result && (
                  <motion.div key="result" {...motionProps}>
                    <p style={{
                      color: colors.brand.teal,
                      fontSize: "10px",
                      letterSpacing: "0.15em",
                      fontWeight: 600,
                      marginBottom: "16px",
                      textTransform: "uppercase",
                      textAlign: "center",
                    }}>
                      Your Perfect Match
                    </p>

                    {/* Primary recommendation */}
                    <motion.div
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, ...spring.gentle }}
                      style={{
                        backgroundColor: "rgba(17,29,74,0.4)",
                        border: "1px solid rgba(0,184,169,0.1)",
                        borderRadius: "16px",
                        overflow: "hidden",
                        marginBottom: "12px",
                      }}
                    >
                      <div style={{ height: "3px", background: `linear-gradient(90deg, transparent, ${result.accent_color}, ${result.accent_color}88, transparent)` }} />
                      <div style={{ padding: "20px" }}>
                        <div className="ng-badge" style={{
                          display: "inline-block",
                          backgroundColor: "rgba(0,184,169,0.08)",
                          color: colors.brand.teal,
                          padding: "3px 10px",
                          borderRadius: "6px",
                          fontSize: "9px",
                          fontWeight: 700,
                          marginBottom: "14px",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          position: "relative",
                          overflow: "hidden",
                        }}>
                          Recommended
                        </div>

                        <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#e6f1ff", marginBottom: "8px", letterSpacing: "-0.02em" }}>
                          {result.name}
                        </h3>

                        <p style={{ color: colors.text.bodyDark, fontSize: "12px", lineHeight: 1.65, marginBottom: "18px", fontStyle: "italic" }}>
                          &ldquo;{aiExplanation}&rdquo;
                        </p>

                        {/* Stats */}
                        <div style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "14px",
                          marginBottom: "20px",
                          padding: "14px",
                          backgroundColor: "rgba(0,0,0,0.15)",
                          borderRadius: "12px",
                          border: "1px solid rgba(30,45,107,0.3)",
                        }}>
                          {[
                            { label: "Duration", value: result.duration },
                            { label: "Price", value: result.price },
                            { label: "Next cohort", value: result.next_cohort },
                            ...(result.seats_left > 0 ? [{ label: "Seats left", value: `${result.seats_left} remaining` }] : []),
                          ].map((item) => (
                            <div key={item.label}>
                              <div style={{ color: colors.text.bodyDark, fontSize: "9px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px", opacity: 0.7 }}>
                                {item.label}
                              </div>
                              <div style={{ color: colors.text.bodySubtle, fontSize: "12px", fontWeight: 600 }}>
                                {item.value}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div style={{ display: "flex", gap: "8px" }}>
                          <motion.a
                            href={`/programs/${result.slug}`}
                            whileHover={prefersReducedMotion ? {} : { scale: 1.02, boxShadow: `0 8px 28px ${result.accent_color}40` }}
                            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                            style={{
                              background: `linear-gradient(135deg, ${result.accent_color}, ${result.accent_color}cc)`,
                              color: "white",
                              padding: "12px 20px",
                              borderRadius: "12px",
                              fontWeight: 600,
                              fontSize: "13px",
                              textDecoration: "none",
                              boxShadow: `0 4px 20px ${result.accent_color}30`,
                              flex: 1,
                              textAlign: "center",
                              letterSpacing: "0.02em",
                            }}
                          >
                            Apply Now &#8594;
                          </motion.a>
                          <motion.button
                            onClick={reset}
                            whileHover={prefersReducedMotion ? {} : { borderColor: "rgba(0,184,169,0.25)" }}
                            style={{
                              backgroundColor: "transparent",
                              color: colors.text.bodyDark,
                              padding: "12px 14px",
                              borderRadius: "12px",
                              fontWeight: 500,
                              fontSize: "13px",
                              border: "1px solid rgba(30,45,107,0.4)",
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

                    {/* Secondary suggestion */}
                    {secondaryResult && (
                      <motion.div
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, ...spring.gentle }}
                        style={{
                          backgroundColor: "rgba(17,29,74,0.25)",
                          border: "1px solid rgba(30,45,107,0.3)",
                          borderRadius: "14px",
                          padding: "16px",
                          marginBottom: "12px",
                        }}
                      >
                        <p style={{ color: colors.text.bodyDark, fontSize: "9px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "10px", opacity: 0.6 }}>
                          You might also like
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div style={{
                            width: "8px",
                            height: "36px",
                            borderRadius: "4px",
                            background: secondaryResult.accent_color,
                            flexShrink: 0,
                          }} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ color: "#e6f1ff", fontSize: "14px", fontWeight: 600, marginBottom: "2px" }}>
                              {secondaryResult.name}
                            </div>
                            <div style={{ color: colors.text.bodyDark, fontSize: "11px", lineHeight: 1.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {secondaryResult.description}
                            </div>
                          </div>
                          <a
                            href={`/programs/${secondaryResult.slug}`}
                            style={{
                              color: colors.brand.teal,
                              fontSize: "12px",
                              fontWeight: 600,
                              textDecoration: "none",
                              whiteSpace: "nowrap",
                              flexShrink: 0,
                            }}
                          >
                            View &#8594;
                          </a>
                        </div>
                      </motion.div>
                    )}

                    {/* Lead capture */}
                    <motion.div
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, ...spring.gentle }}
                      style={{
                        backgroundColor: "rgba(0,184,169,0.04)",
                        border: "1px solid rgba(0,184,169,0.08)",
                        borderRadius: "14px",
                        padding: "16px",
                        marginBottom: "12px",
                      }}
                    >
                      {!leadSubmitted ? (
                        <>
                          <p style={{ color: colors.text.bodySubtle, fontSize: "12px", fontWeight: 500, marginBottom: "12px", lineHeight: 1.5 }}>
                            Want us to send you the program details?
                          </p>
                          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <input
                              type="text"
                              placeholder="Name (optional)"
                              value={leadName}
                              onChange={(e) => setLeadName(e.target.value)}
                              style={{
                                backgroundColor: "rgba(17,29,74,0.5)",
                                border: "1px solid rgba(30,45,107,0.4)",
                                borderRadius: "10px",
                                padding: "10px 14px",
                                color: "#e6f1ff",
                                fontSize: "13px",
                                outline: "none",
                                transition: "border-color 0.2s ease",
                              }}
                            />
                            <input
                              type="email"
                              placeholder="Email address"
                              value={leadEmail}
                              onChange={(e) => setLeadEmail(e.target.value)}
                              required
                              style={{
                                backgroundColor: "rgba(17,29,74,0.5)",
                                border: "1px solid rgba(30,45,107,0.4)",
                                borderRadius: "10px",
                                padding: "10px 14px",
                                color: "#e6f1ff",
                                fontSize: "13px",
                                outline: "none",
                                transition: "border-color 0.2s ease",
                              }}
                            />
                            <button
                              onClick={submitLead}
                              disabled={!leadEmail || leadSubmitting}
                              style={{
                                background: leadEmail ? `linear-gradient(135deg, ${colors.brand.teal}, ${colors.brand.tealDark})` : "rgba(30,45,107,0.4)",
                                color: leadEmail ? "white" : colors.text.bodyDark,
                                padding: "10px 16px",
                                borderRadius: "10px",
                                fontWeight: 600,
                                fontSize: "13px",
                                border: "none",
                                cursor: leadEmail ? "pointer" : "not-allowed",
                                transition: "all 0.2s ease",
                                opacity: leadSubmitting ? 0.7 : 1,
                              }}
                            >
                              {leadSubmitting ? "Sending..." : "Send me details"}
                            </button>
                          </div>
                        </>
                      ) : (
                        <div style={{ textAlign: "center", padding: "4px 0" }}>
                          <p style={{ color: colors.brand.teal, fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>
                            Thanks! The CODED team will reach out.
                          </p>
                          <p style={{ color: colors.text.bodyDark, fontSize: "11px" }}>
                            Check your inbox soon.
                          </p>
                        </div>
                      )}
                    </motion.div>

                    {/* Contact option */}
                    <motion.div
                      initial={prefersReducedMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      style={{ textAlign: "center", paddingTop: "4px" }}
                    >
                      <a
                        href="mailto:hello@joincoded.com"
                        style={{
                          color: colors.text.bodyDark,
                          fontSize: "12px",
                          textDecoration: "none",
                          transition: "color 0.2s ease",
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = colors.brand.teal; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = colors.text.bodyDark; }}
                      >
                        Or talk to the CODED team &#8594;
                      </a>
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
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.04; transform: scale(1.08); }
        }
        @keyframes ngBorderRotate {
          from { --ng-angle: 0deg; }
          to { --ng-angle: 360deg; }
        }
        @keyframes ngShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .ng-ring-outer {
          transform-origin: center;
          animation: ngRingPulse 4s ease-in-out infinite;
        }
        .ng-launcher {
          box-shadow: 0 0 24px rgba(0,184,169,0.15), 0 4px 20px rgba(0,0,0,0.3);
          transition: box-shadow 0.3s ease;
        }
        .ng-launcher:hover {
          box-shadow: 0 0 36px rgba(0,184,169,0.25), 0 6px 24px rgba(0,0,0,0.35) !important;
        }
        .ng-close-btn:hover {
          border-color: rgba(0,184,169,0.25) !important;
          color: ${colors.brand.teal} !important;
          background-color: rgba(0,184,169,0.06) !important;
        }
        .ng-option-btn:hover {
          border-color: rgba(0,184,169,0.2) !important;
          border-left-color: ${colors.brand.teal} !important;
          background-color: rgba(0,184,169,0.04) !important;
        }
        .ng-border-glow {
          background: conic-gradient(
            from var(--ng-angle, 0deg),
            transparent 0%,
            rgba(0,184,169,0.12) 25%,
            transparent 50%,
            rgba(30,45,107,0.25) 75%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: ngBorderRotate 10s linear infinite;
        }
        @property --ng-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        .ng-dots {
          background-image: radial-gradient(rgba(0,184,169,0.08) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .ng-badge::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          animation: ngShimmer 3s ease-in-out infinite;
          animation-delay: 1s;
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
            max-height: 72vh !important;
            border-radius: 20px 20px 0 0 !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ng-ring-outer { animation: none; }
          .ng-border-glow { animation: none; }
          .ng-badge::after { animation: none; }
        }
      `}</style>
    </>
  );
}
