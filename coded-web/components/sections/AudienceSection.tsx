"use client";

import Reveal from "@/components/motion/Reveal";
import StaggerGrid from "@/components/motion/StaggerGrid";
import HoverCard from "@/components/motion/HoverCard";
import { motion } from "framer-motion";

const audiences = [
  { title: 'Spark Your Kid', bg: '#ef4444', badge: 'Weekends & School Breaks', cta: 'Strong Start', desc: 'A guided start that builds logic, creativity, and confidence through coding.' },
  { title: 'Launch Your Tech Career', bg: '#3b82f6', badge: 'Programs Around The Year', cta: 'Real Builds', desc: 'For university students and fresh graduates ready to build real skills.' },
  { title: 'Build Job Skills', bg: '#0a0f2e', badge: 'Evening Sessions', cta: 'Zero to Hero', desc: 'Intensive, career-focused training for adults who work during the day.' },
];

export default function AudienceSection() {
  return (
    <section id="audience" style={{ backgroundColor: 'white', padding: '96px 0' }}>
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
            WHO WE SERVE
          </p>
          <h2 style={{
            fontSize: 'var(--font-size-h2)',
            fontWeight: 800,
            color: '#0a0f2e',
            textAlign: 'center',
            marginBottom: '56px',
            lineHeight: 1.1,
          }}>
            Who is CODED for?
          </h2>
        </Reveal>
        <StaggerGrid style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }} staggerDelay={0.15} className="audience-grid">
          {audiences.map((aud) => (
            <HoverCard key={aud.title} style={{
              backgroundColor: aud.bg,
              borderRadius: '16px',
              padding: '36px',
              minHeight: '360px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              gap: '12px',
            }}>
              <span style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                padding: '6px 16px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 600,
                alignSelf: 'flex-start',
                backdropFilter: 'blur(4px)',
              }}>
                {aud.badge}
              </span>
              <h3 style={{
                fontSize: '22px',
                fontWeight: 700,
                color: 'white',
              }}>
                {aud.title}
              </h3>
              <p style={{
                color: 'rgba(255,255,255,0.75)',
                fontSize: '16px',
                lineHeight: 1.7,
              }}>
                {aud.desc}
              </p>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: 'white',
                  padding: '12px 28px',
                  borderRadius: '999px',
                  fontWeight: 700,
                  fontSize: '14px',
                  border: '1.5px solid rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  alignSelf: 'flex-start',
                  marginTop: '8px',
                  backdropFilter: 'blur(4px)',
                  transition: 'all 0.2s ease',
                }}
              >
                {aud.cta}
              </motion.button>
            </HoverCard>
          ))}
        </StaggerGrid>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .audience-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
