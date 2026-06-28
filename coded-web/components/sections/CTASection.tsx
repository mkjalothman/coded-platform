"use client";

import Reveal from "@/components/motion/Reveal";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <Reveal>
      <section id="apply" style={{
        background: 'linear-gradient(135deg, #00b8a9 0%, #00a896 100%)',
        padding: '96px 0',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 40px' }}>
          <h2 style={{
            fontSize: 'var(--font-size-h2)',
            fontWeight: 800,
            color: 'white',
            marginBottom: '16px',
            lineHeight: 1.1,
          }}>
            Ready to build real skills?
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: '18px',
            marginBottom: '40px',
            lineHeight: 1.7,
          }}>
            Join the next cohort. Seats are limited.
          </p>
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            style={{
              backgroundColor: 'white',
              color: '#00a896',
              padding: '16px 48px',
              borderRadius: '999px',
              fontWeight: 800,
              fontSize: '16px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            Apply Now →
          </motion.button>
        </div>
      </section>
    </Reveal>
  );
}
