"use client";

import Reveal from "@/components/motion/Reveal";
import AnimatedCounter from "@/components/motion/AnimatedCounter";

const stats = [
  { num: 500, suffix: '+', label: 'Graduates' },
  { num: 50, suffix: '+', label: 'Company Partners' },
  { num: 10, suffix: '', label: 'Years Est. 2015' },
  { num: 4, suffix: '', label: 'Active Tracks' },
];

export default function StatsBar() {
  return (
    <section style={{ backgroundColor: '#0d1436', padding: '96px 0' }}>
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 40px' }}>
        <Reveal>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '40px',
            textAlign: 'center',
          }} className="stats-grid">
            {stats.map(s => (
              <div key={s.label}>
                <AnimatedCounter
                  target={s.num}
                  suffix={s.suffix}
                  duration={2}
                  style={{
                    fontSize: '64px',
                    fontWeight: 800,
                    color: '#00b8a9',
                    lineHeight: 1,
                    display: 'block',
                  }}
                />
                <div style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '16px',
                  marginTop: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
