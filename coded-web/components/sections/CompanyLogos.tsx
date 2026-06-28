"use client";

import Reveal from "@/components/motion/Reveal";
import Marquee from "@/components/motion/Marquee";

const companies = ['Zain', 'NBK', 'Boubyan Bank', 'Agility', 'KFAS', 'Floward', 'Markaz', 'Gulf Bank', 'KISR', 'Ooredoo'];

export default function CompanyLogos() {
  return (
    <section id="companies" style={{ backgroundColor: '#f4f5f7', padding: '56px 0' }}>
      <Reveal>
        <p style={{
          color: '#00b8a9',
          fontSize: '11px',
          letterSpacing: '0.15em',
          fontWeight: 600,
          textTransform: 'uppercase',
          marginBottom: '32px',
          textAlign: 'center',
        }}>
          Trusted by Leading Companies in Kuwait
        </p>
      </Reveal>
      <Marquee duration={20}>
        {companies.map(c => (
          <span key={c} style={{
            color: '#9ca3af',
            fontSize: '18px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}>
            {c}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
