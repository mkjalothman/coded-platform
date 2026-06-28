"use client";

import Reveal from "@/components/motion/Reveal";
import StaggerGrid from "@/components/motion/StaggerGrid";
import HoverCard from "@/components/motion/HoverCard";

const testimonials = [
  { name: 'Fatima Al-Rashidi', track: 'AI App Developer · Cohort 9', quote: 'I joined as a marketing manager with zero coding. After 12 weeks I shipped a working app and got promoted to lead our digital transformation team.', initials: 'FA' },
  { name: 'Khalid Al-Mutairi', track: 'Cybersecurity · Cohort 6', quote: 'CODED is nothing like a typical course. The coaches push you hard. I left with a capstone project that got me my first dev job within 2 months.', initials: 'KM' },
  { name: 'Nour Al-Sabah', track: 'Agentic AI · Cohort 1', quote: 'The Agentic AI track was exactly what I needed. I am now building AI workflows at my company that save us 20+ hours every single week.', initials: 'NS' },
];

export default function TestimonialSection() {
  return (
    <section style={{ backgroundColor: '#0d1436', padding: '96px 0' }}>
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
            TESTIMONIALS
          </p>
          <h2 style={{
            fontSize: 'var(--font-size-h2)',
            fontWeight: 800,
            color: 'white',
            textAlign: 'center',
            marginBottom: '56px',
            lineHeight: 1.1,
          }}>
            What our graduates say
          </h2>
        </Reveal>
        <StaggerGrid style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }} staggerDelay={0.15} className="testimonial-grid">
          {testimonials.map(t => (
            <HoverCard key={t.name} style={{
              backgroundColor: '#111d4a',
              borderRadius: '16px',
              padding: '32px',
              border: '1px solid #1e2d6b',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <p style={{
                color: '#cbd5e1',
                fontSize: '16px',
                lineHeight: 1.7,
                marginBottom: '24px',
                fontStyle: 'italic',
              }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00b8a9 0%, #00a896 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  color: 'white',
                  fontSize: '14px',
                  flexShrink: 0,
                }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: '14px' }}>{t.name}</div>
                  <div style={{ color: '#8892b0', fontSize: '12px' }}>{t.track}</div>
                </div>
              </div>
            </HoverCard>
          ))}
        </StaggerGrid>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .testimonial-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
