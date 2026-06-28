"use client";

import Reveal from "@/components/motion/Reveal";
import StaggerGrid from "@/components/motion/StaggerGrid";
import HoverCard from "@/components/motion/HoverCard";
import { motion } from "framer-motion";

const bootcamps = [
  { title: 'Cybersecurity', color: '#1a2570', desc: 'A hands-on cybersecurity bootcamp focused on real attack and defense techniques, not theory or certifications.' },
  { title: 'AI App Developer', color: '#00b8a9', desc: 'A hands-on bootcamp where you learn to build full products—frontend to backend—using modern tools and real workflows.' },
  { title: 'Agentic AI Bootcamp', color: '#2d6a4f', desc: 'Build autonomous AI agents that reason, plan, and execute real tasks independently using cutting-edge frameworks.' },
  { title: 'AI & Data Science', color: '#9b59b6', desc: 'A hands-on bootcamp in data analysis and applied AI. Learn to work with real data, build models, and turn insights into decisions.' },
];

export default function BootcampGrid() {
  return (
    <section id="bootcamps" style={{ backgroundColor: '#f4f5f7', padding: '96px 0' }}>
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
            BOOTCAMPS
          </p>
          <h2 style={{
            fontSize: 'var(--font-size-h2)',
            fontWeight: 800,
            color: '#0a0f2e',
            textAlign: 'center',
            marginBottom: '16px',
            lineHeight: 1.1,
          }}>
            Discover Your Perfect Bootcamp Match Today
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{
            color: '#6b7280',
            textAlign: 'center',
            fontSize: '16px',
            lineHeight: 1.7,
            marginBottom: '56px',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Intensive programs for adults who want to change direction, or upgrade their skills.
          </p>
        </Reveal>
        <StaggerGrid style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px',
        }} staggerDelay={0.12} className="bootcamp-grid">
          {bootcamps.map((boot) => (
            <HoverCard key={boot.title} style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '36px',
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}>
              <h3 style={{
                fontSize: '22px',
                fontWeight: 700,
                color: boot.color,
              }}>
                {boot.title}
              </h3>
              <p style={{
                color: '#6b7280',
                fontSize: '16px',
                lineHeight: 1.7,
                flex: 1,
              }}>
                {boot.desc}
              </p>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: `linear-gradient(135deg, ${boot.color} 0%, ${boot.color}dd 100%)`,
                  color: 'white',
                  padding: '14px 32px',
                  borderRadius: '999px',
                  fontWeight: 700,
                  fontSize: '15px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: `0 4px 16px ${boot.color}4d`,
                  alignSelf: 'flex-start',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                Apply Now
              </motion.button>
            </HoverCard>
          ))}
        </StaggerGrid>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .bootcamp-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
