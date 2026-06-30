"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { colors, spring, easing } from "@/design-system";
import ApplyModal from "@/components/ui/ApplyModal";
import { useTheme } from "@/components/providers/ThemeContext";

/* ─── Types ─── */

export interface WorldProgram {
  slug: string;
  name: string;
  description: string;
  color: string;
  category: string;
  price: string;
  duration: string;
}

/* ─── Category config ─── */

const CATEGORIES = [
  { id: "kids" as const, label: "Kids", sub: "Ages 6–13", accent: "#ef4444", accentGlow: "rgba(239,68,68,0.15)" },
  { id: "youth" as const, label: "Youth", sub: "Ages 14–24", accent: "#3b82f6", accentGlow: "rgba(59,130,246,0.15)" },
  { id: "bootcamp" as const, label: "Bootcamps", sub: "Adults 18+", accent: colors.brand.teal, accentGlow: "rgba(0,184,169,0.15)" },
  { id: "enterprise" as const, label: "Companies", sub: "Teams", accent: "#6366f1", accentGlow: "rgba(99,102,241,0.15)" },
];

type CatId = (typeof CATEGORIES)[number]["id"];

const catMeta = (id: CatId) => CATEGORIES.find((c) => c.id === id)!;

/* ─── Fallback data ─── */

const FALLBACK: WorldProgram[] = [
  { slug: "kids", name: "Spark Your Kid", description: "Builds logic, creativity, and confidence through fun coding projects on weekends and school breaks.", color: "#ef4444", category: "kids", price: "KWD 150", duration: "Weekends & breaks" },
  { slug: "youth", name: "Launch Your Tech Career", description: "Year-round programs for university students and fresh graduates ready to build real skills.", color: "#3b82f6", category: "youth", price: "KWD 250", duration: "Semester-based" },
  { slug: "ai-app-developer", name: "AI App Developer", description: "Build full-stack AI products from frontend to backend using modern tools and real workflows.", color: "#00b8a9", category: "bootcamp", price: "KWD 450", duration: "12 weeks" },
  { slug: "cybersecurity", name: "Cybersecurity", description: "Real attack and defense techniques. Hands-on labs, no dry theory.", color: "#1a2570", category: "bootcamp", price: "KWD 350", duration: "10 weeks" },
  { slug: "agentic-ai", name: "Agentic AI Bootcamp", description: "Design and deploy AI agents that reason, plan, and execute tasks autonomously.", color: "#2d6a4f", category: "bootcamp", price: "KWD 400", duration: "10 weeks" },
  { slug: "ai-data-science", name: "AI & Data Science", description: "Work with real data, build models, and turn insights into decisions.", color: "#9b59b6", category: "bootcamp", price: "KWD 380", duration: "10 weeks" },
  { slug: "enterprise", name: "Build Job Skills", description: "Intensive, career-focused training with custom curriculum for your team.", color: "#6366f1", category: "enterprise", price: "Custom pricing", duration: "Flexible" },
];

/* ─── World backgrounds ─── */

function KidsBackground() {
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 30% 40%, rgba(239,68,68,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 40% at 80% 70%, rgba(250,204,21,0.05) 0%, transparent 60%)", pointerEvents: "none" }} />
      {/* Floating shapes */}
      <div className="pw-float pw-f1 pw-hide-mobile" style={{ position: "absolute", top: "12%", left: "6%", width: 28, height: 28, borderRadius: "50%", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.2)" }} />
      <div className="pw-float pw-f2 pw-hide-mobile" style={{ position: "absolute", top: "22%", right: "8%", width: 20, height: 20, borderRadius: "4px", background: "rgba(250,204,21,0.12)", border: "1px solid rgba(250,204,21,0.2)", transform: "rotate(45deg)" }} />
      <div className="pw-float pw-f3 pw-hide-mobile" style={{ position: "absolute", bottom: "25%", left: "12%", width: 24, height: 24, borderRadius: "50%", background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.18)" }} />
      <div className="pw-float pw-f4 pw-hide-mobile" style={{ position: "absolute", bottom: "18%", right: "15%", width: 18, height: 18, background: "rgba(0,184,169,0.1)", border: "1px solid rgba(0,184,169,0.18)", clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />
      <div className="pw-float pw-f5 pw-hide-mobile" style={{ position: "absolute", top: "55%", left: "3%", width: 14, height: 14, borderRadius: "50%", background: "rgba(251,146,60,0.12)", border: "1px solid rgba(251,146,60,0.2)" }} />
    </>
  );
}

function YouthBackground() {
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 60% 30%, rgba(59,130,246,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      {/* Neon streaks */}
      <div className="pw-streak pw-streak-1 pw-hide-mobile" style={{ position: "absolute", top: "10%", left: "-5%", width: "45%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.25), transparent)", transform: "rotate(-25deg)", transformOrigin: "left center" }} />
      <div className="pw-streak pw-streak-2 pw-hide-mobile" style={{ position: "absolute", top: "40%", right: "-10%", width: "50%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.2), transparent)", transform: "rotate(-20deg)", transformOrigin: "right center" }} />
      <div className="pw-streak pw-streak-3 pw-hide-mobile" style={{ position: "absolute", bottom: "20%", left: "10%", width: "35%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.15), transparent)", transform: "rotate(-30deg)", transformOrigin: "left center" }} />
      {/* Rising dots */}
      <div className="pw-rise pw-rise-1 pw-hide-mobile" style={{ position: "absolute", bottom: "0%", left: "20%", width: 4, height: 4, borderRadius: "50%", background: "rgba(59,130,246,0.3)" }} />
      <div className="pw-rise pw-rise-2 pw-hide-mobile" style={{ position: "absolute", bottom: "0%", left: "50%", width: 3, height: 3, borderRadius: "50%", background: "rgba(6,182,212,0.25)" }} />
      <div className="pw-rise pw-rise-3 pw-hide-mobile" style={{ position: "absolute", bottom: "0%", right: "25%", width: 4, height: 4, borderRadius: "50%", background: "rgba(59,130,246,0.2)" }} />
    </>
  );
}

function BootcampBackground() {
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,184,169,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      {/* Grid lines */}
      <div className="pw-hide-mobile" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,184,169,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,169,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
      {/* Terminal snippet */}
      <div className="pw-terminal pw-hide-mobile" style={{
        position: "absolute", top: "15%", right: "5%", width: 220, padding: "14px 16px",
        background: "rgba(0,0,0,0.35)", borderRadius: 10, border: "1px solid rgba(0,184,169,0.1)",
        fontFamily: "monospace", fontSize: 11, lineHeight: 1.7, color: "rgba(0,184,169,0.5)",
        pointerEvents: "none", opacity: 0.6,
      }}>
        <div style={{ display: "flex", gap: 5, marginBottom: 10 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(239,68,68,0.5)" }} />
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(250,204,21,0.5)" }} />
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(74,222,128,0.5)" }} />
        </div>
        <div>$ npm create coded-app</div>
        <div style={{ color: "rgba(74,222,128,0.5)" }}>✓ Project scaffolded</div>
        <div>$ npm run dev</div>
        <div style={{ color: "rgba(74,222,128,0.5)" }}>✓ Ready on :3000<span className="pw-cursor">│</span></div>
      </div>
      {/* Floating code window */}
      <div className="pw-terminal pw-hide-mobile" style={{
        position: "absolute", bottom: "20%", left: "4%", width: 180, padding: "12px 14px",
        background: "rgba(0,0,0,0.25)", borderRadius: 8, border: "1px solid rgba(0,184,169,0.08)",
        fontFamily: "monospace", fontSize: 10, lineHeight: 1.8, color: "rgba(0,184,169,0.35)",
        pointerEvents: "none", opacity: 0.5,
      }}>
        <div><span style={{ color: "rgba(168,85,247,0.5)" }}>const</span> model = <span style={{ color: "rgba(250,204,21,0.5)" }}>&quot;claude&quot;</span></div>
        <div><span style={{ color: "rgba(168,85,247,0.5)" }}>await</span> agent.run()</div>
      </div>
    </>
  );
}

function CompaniesBackground() {
  const nodes = useMemo(() => [
    { x: 10, y: 20 }, { x: 30, y: 60 }, { x: 55, y: 25 },
    { x: 75, y: 55 }, { x: 90, y: 30 }, { x: 20, y: 80 },
    { x: 65, y: 75 }, { x: 45, y: 50 },
  ], []);
  const lines = useMemo(() => [
    [0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [1, 5], [3, 6], [5, 6], [3, 7], [1, 7], [2, 7],
  ], []);

  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(99,102,241,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <svg className="pw-network pw-hide-mobile" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        {lines.map(([a, b], i) => (
          <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="rgba(99,102,241,0.08)" strokeWidth="0.15" />
        ))}
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r="0.6" fill="rgba(99,102,241,0.2)" className={`pw-node pw-node-${i % 3}`} />
        ))}
      </svg>
    </>
  );
}

function WorldBackground({ category }: { category: CatId }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: easing.apple }}
          style={{ position: "absolute", inset: 0 }}
        >
          {category === "kids" && <KidsBackground />}
          {category === "youth" && <YouthBackground />}
          {category === "bootcamp" && <BootcampBackground />}
          {category === "enterprise" && <CompaniesBackground />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─── Category selector ─── */

function CategorySelector({ active, onChange }: { active: CatId; onChange: (id: CatId) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const activeIdx = CATEGORIES.findIndex((c) => c.id === active);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const btn = container.children[activeIdx] as HTMLElement | undefined;
    if (!btn) return;
    setIndicator({ left: btn.offsetLeft, width: btn.offsetWidth });
  }, [activeIdx]);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 56 }}>
      <div
        ref={containerRef}
        className="pw-tabs"
        style={{
          display: "inline-flex",
          position: "relative",
          gap: 4,
          padding: 4,
          borderRadius: 16,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Sliding indicator */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          style={{
            position: "absolute",
            top: 4,
            left: indicator.left,
            width: indicator.width,
            height: "calc(100% - 8px)",
            borderRadius: 12,
            background: `linear-gradient(135deg, ${catMeta(active).accent}22, ${catMeta(active).accent}11)`,
            border: `1px solid ${catMeta(active).accent}33`,
            zIndex: 0,
          }}
        />
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className="pw-tab"
            style={{
              position: "relative",
              zIndex: 1,
              padding: "12px 20px",
              border: "none",
              borderRadius: 12,
              background: "transparent",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              transition: "color 0.25s ease",
            }}
          >
            <span style={{
              fontSize: 14,
              fontWeight: active === cat.id ? 700 : 500,
              color: active === cat.id ? cat.accent : "rgba(255,255,255,0.5)",
              transition: "color 0.25s ease, font-weight 0.25s ease",
              letterSpacing: "-0.01em",
            }}>
              {cat.label}
            </span>
            <span style={{
              fontSize: 10,
              color: active === cat.id ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)",
              fontWeight: 500,
              transition: "color 0.25s ease",
            }}>
              {cat.sub}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Program card ─── */

function ProgramCard({ program, index, onApply }: { program: WorldProgram; index: number; onApply: () => void }) {
  const cardColor = program.color === "#0a0f2e" ? "#6366f1" : program.color;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: easing.apple }}
      className="pw-card"
      style={{
        position: "relative",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 16,
        padding: "28px 28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        cursor: "default",
        overflow: "hidden",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
      }}
    >
      {/* Top accent stripe */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${cardColor}, ${cardColor}88, transparent)` }} />

      {/* Color dot + title */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: cardColor, flexShrink: 0, boxShadow: `0 0 8px ${cardColor}44` }} />
        <Link
          href={`/programs/${program.slug}`}
          style={{ color: "#e6f1ff", fontSize: 19, fontWeight: 700, textDecoration: "none", letterSpacing: "-0.02em", lineHeight: 1.3 }}
        >
          {program.name}
        </Link>
      </div>

      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.65, flex: 1 }}>
        {program.description}
      </p>

      {/* Meta pills */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <span style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>
          {program.duration}
        </span>
        <span style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>
          {program.price}
        </span>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
        <button
          onClick={onApply}
          className="pw-apply-btn"
          style={{
            background: `linear-gradient(135deg, ${cardColor}, ${cardColor}cc)`,
            color: "white",
            border: "none",
            borderRadius: 10,
            padding: "10px 22px",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: `0 4px 16px ${cardColor}30`,
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
        >
          Apply Now
        </button>
        <Link
          href={`/programs/${program.slug}`}
          className="pw-learn-btn"
          style={{
            color: "rgba(255,255,255,0.5)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 10,
            padding: "10px 18px",
            fontSize: 13,
            fontWeight: 600,
            textDecoration: "none",
            transition: "border-color 0.2s ease, color 0.2s ease",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          Learn More
        </Link>
      </div>
    </motion.div>
  );
}

/* ─── World taglines ─── */

const WORLD_TAGLINES: Record<CatId, { headline: string; sub: string }> = {
  kids: { headline: "Play. Learn. Code.", sub: "Fun, guided coding sessions that build logic and creativity for ages 6–13." },
  youth: { headline: "Launch Your Future", sub: "Intensive programs for students and graduates ready to break into tech." },
  bootcamp: { headline: "Build Real Products", sub: "Hands-on bootcamps where you ship production-grade projects in weeks." },
  enterprise: { headline: "Upskill Your Team", sub: "Custom training programs designed around your company's goals." },
};

/* ─── Main component ─── */

export default function ProgramWorlds({ programs }: { programs: WorldProgram[] }) {
  const [active, setActive] = useState<CatId>("bootcamp");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProgram, setModalProgram] = useState<{ slug: string; name: string } | null>(null);
  const reducedMotion = useReducedMotion();
  const { setTheme } = useTheme();

  const handleCategoryChange = useCallback((id: CatId) => {
    setActive(id);
    setTheme(id);
  }, [setTheme]);

  const allPrograms = programs.length > 0 ? programs : FALLBACK;

  const filtered = useMemo(
    () => allPrograms.filter((p) => p.category === active),
    [allPrograms, active]
  );

  const tagline = WORLD_TAGLINES[active];
  const cat = catMeta(active);

  const handleApply = useCallback((p: WorldProgram) => {
    setModalProgram({ slug: p.slug, name: p.name });
    setModalOpen(true);
  }, []);

  return (
    <section
      id="programs"
      className="section-transparent"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "96px 0",
      }}
    >
      {/* World background */}
      {!reducedMotion && <WorldBackground category={active} />}

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1152, margin: "0 auto", padding: "0 40px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <p style={{
            color: "var(--theme-accent)",
            fontSize: 11,
            letterSpacing: "0.15em",
            fontWeight: 600,
            textTransform: "uppercase",
            marginBottom: 16,
          }}>
            EXPLORE PROGRAMS
          </p>
          <h2 style={{
            fontSize: "var(--font-size-h2)",
            fontWeight: 800,
            color: "#e6f1ff",
            lineHeight: 1.1,
            marginBottom: 56,
          }}>
            Find Your World
          </h2>
        </div>

        {/* Category selector */}
        <CategorySelector active={active} onChange={handleCategoryChange} />

        {/* World headline — animated */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active + "-tagline"}
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: easing.apple }}
            style={{ textAlign: "center", marginBottom: 48 }}
          >
            <h3 style={{ fontSize: 28, fontWeight: 800, color: cat.accent, marginBottom: 10, letterSpacing: "-0.02em" }}>
              {tagline.headline}
            </h3>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.6, maxWidth: 520, margin: "0 auto" }}>
              {tagline.sub}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Program grid — animated */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active + "-grid"}
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: easing.apple }}
            className="pw-grid"
            style={{
              display: "grid",
              gridTemplateColumns: filtered.length <= 2 ? "repeat(auto-fit, minmax(320px, 480px))" : "repeat(2, 1fr)",
              gap: 24,
              justifyContent: "center",
            }}
          >
            {filtered.map((p, i) => (
              <ProgramCard key={p.slug} program={p} index={i} onApply={() => handleApply(p)} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <ApplyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        programSlug={modalProgram?.slug}
        programName={modalProgram?.name}
      />

      <style>{`
        /* Float animations for Kids world */
        @keyframes pwFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(8deg); }
        }
        .pw-float { animation: pwFloat 6s ease-in-out infinite; }
        .pw-f1 { animation-duration: 5.5s; }
        .pw-f2 { animation-duration: 7s; animation-delay: 0.8s; }
        .pw-f3 { animation-duration: 6.5s; animation-delay: 1.5s; }
        .pw-f4 { animation-duration: 5s; animation-delay: 0.5s; }
        .pw-f5 { animation-duration: 8s; animation-delay: 2s; }

        /* Streak animations for Youth world */
        @keyframes pwStreak {
          0% { opacity: 0; transform: rotate(var(--pw-angle, -25deg)) translateX(-20%); }
          30% { opacity: 1; }
          70% { opacity: 1; }
          100% { opacity: 0; transform: rotate(var(--pw-angle, -25deg)) translateX(20%); }
        }
        .pw-streak { animation: pwStreak 4s ease-in-out infinite; }
        .pw-streak-1 { --pw-angle: -25deg; animation-duration: 3.5s; }
        .pw-streak-2 { --pw-angle: -20deg; animation-duration: 4.5s; animation-delay: 1.2s; }
        .pw-streak-3 { --pw-angle: -30deg; animation-duration: 5s; animation-delay: 2s; }

        /* Rising dots for Youth */
        @keyframes pwRise {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(-500px); opacity: 0; }
        }
        .pw-rise { animation: pwRise 6s linear infinite; }
        .pw-rise-1 { animation-duration: 5s; }
        .pw-rise-2 { animation-duration: 7s; animation-delay: 1.5s; }
        .pw-rise-3 { animation-duration: 6s; animation-delay: 3s; }

        /* Terminal cursor blink */
        @keyframes pwBlink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .pw-cursor { animation: pwBlink 1s steps(1) infinite; }

        /* Network node pulse */
        @keyframes pwPulse {
          0%, 100% { r: 0.6; opacity: 0.2; }
          50% { r: 1; opacity: 0.5; }
        }
        .pw-node { animation: pwPulse 3s ease-in-out infinite; }
        .pw-node-0 { animation-delay: 0s; }
        .pw-node-1 { animation-delay: 1s; }
        .pw-node-2 { animation-delay: 2s; }

        /* Card hover */
        .pw-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255,255,255,0.12) !important;
          box-shadow: 0 16px 48px rgba(0,0,0,0.25) !important;
        }
        .pw-apply-btn:hover {
          transform: scale(1.04);
        }
        .pw-apply-btn:active {
          transform: scale(0.97);
        }
        .pw-learn-btn:hover {
          border-color: rgba(255,255,255,0.25) !important;
          color: rgba(255,255,255,0.8) !important;
        }
        .pw-tab:hover span:first-child {
          color: rgba(255,255,255,0.8) !important;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .pw-grid { grid-template-columns: 1fr !important; }
          .pw-hide-mobile { display: none !important; }
          .pw-tabs { overflow-x: auto; -webkit-overflow-scrolling: touch; }
          .pw-tab { padding: 10px 14px !important; }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .pw-float, .pw-streak, .pw-rise, .pw-cursor, .pw-node { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
