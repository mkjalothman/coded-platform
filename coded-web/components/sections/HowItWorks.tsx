"use client";

import Reveal from "@/components/motion/Reveal";
import StaggerGrid from "@/components/motion/StaggerGrid";
import HoverCard from "@/components/motion/HoverCard";

const steps = [
  { num: '01', title: 'Learn by building', desc: 'Every session ends with something you made. Projects are portfolio pieces you would show an employer.' },
  { num: '02', title: 'Get real feedback', desc: 'Instructors review your work and tell you exactly what to fix. Less guessing, more progress every session.' },
  { num: '03', title: 'Learn with a cohort', desc: 'You collaborate, present, and give feedback like a real team. Your peers become your professional network.' },
  { num: '04', title: 'Ship a real product', desc: 'Your final project is a full deployable product built to industry standards. Something you can demo and share.' },
];

export default function HowItWorks() {
  return (
    <section style={{ backgroundColor: '#f4f5f7', padding: '96px 0' }}>
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 40px' }}>
        <Reveal>
          <p style={{
            color: '#00b8a9',
            fontSize: '11px',
            letterSpacing: '0.15em',
            fontWeight: 600,
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: '16px',
          }}>
            HOW IT WORKS
          </p>
          <h2 style={{
            fontSize: 'var(--font-size-h2)',
            fontWeight: 800,
            color: '#0a0f2e',
            textAlign: 'center',
            marginBottom: '56px',
            lineHeight: 1.1,
          }}>
            How CODED actually teaches
          </h2>
        </Reveal>
        <StaggerGrid style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px',
        }} staggerDelay={0.12} className="steps-grid">
          {steps.map(h => (
            <HoverCard key={h.num} style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.04)',
            }}>
              <div style={{
                color: '#00b8a9',
                fontSize: '11px',
                fontWeight: 700,
                marginBottom: '16px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                STEP {h.num}
              </div>
              <h3 style={{
                fontSize: '22px',
                fontWeight: 700,
                color: '#0a0f2e',
                marginBottom: '12px',
              }}>
                {h.title}
              </h3>
              <p style={{
                color: '#6b7280',
                fontSize: '16px',
                lineHeight: 1.7,
              }}>
                {h.desc}
              </p>
            </HoverCard>
          ))}
        </StaggerGrid>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .steps-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .steps-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
