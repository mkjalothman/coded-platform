"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section style={{
      backgroundColor: '#0d1436',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, #1a3a8a33 0%, transparent 70%)',
      paddingTop: '64px',
      paddingBottom: '64px',
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '1152px',
        margin: '0 auto',
        padding: '0 40px',
        width: '100%',
      }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            color: '#00b8a9',
            fontSize: '11px',
            letterSpacing: '0.15em',
            fontWeight: 600,
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}
        >
          1st Coding Academy in the Arab World — Est 2015
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            fontSize: 'var(--font-size-hero)',
            lineHeight: 1.05,
            fontWeight: 800,
            color: 'white',
            marginBottom: '24px',
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Build Real Tech Skills<br />
          <span style={{ color: '#00b8a9' }}>Not Just Knowledge</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            fontSize: '18px',
            color: '#8892b0',
            lineHeight: 1.7,
            margin: '0 auto',
            maxWidth: '600px',
            marginBottom: '40px',
          }}
        >
          CODED programs are hands-on from day one — projects, coaching, and real standards.
          Join as an adult, teen, or kid. Leave with work you can show.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <motion.a
            href="#bootcamps"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: 'linear-gradient(135deg, #00b8a9 0%, #00a896 100%)',
              color: 'white',
              padding: '14px 32px',
              borderRadius: '999px',
              fontWeight: 700,
              fontSize: '15px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,184,169,0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
            }}
          >
            Explore Bootcamps <span>→</span>
          </motion.a>
          <motion.a
            href="#companies"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: 'transparent',
              color: 'white',
              padding: '14px 32px',
              borderRadius: '999px',
              fontWeight: 600,
              fontSize: '15px',
              border: '1.5px solid rgba(255,255,255,0.3)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            CODED For Companies →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
