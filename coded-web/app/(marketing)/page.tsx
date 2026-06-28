import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">

      {/* NAVBAR */}
      <nav style={{backgroundColor: '#0d1436', borderBottom: '1px solid #1e2d6b'}} className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-16">
          <div style={{border: '2px solid white', padding: '4px 10px'}}>
            <span className="text-white font-bold text-lg">CODED</span>
          </div>
          <div className="flex items-center gap-10">
            <a href="#" className="text-white text-sm hover:text-teal-400">Bootcamps</a>
            <a href="#" className="text-white text-sm hover:text-teal-400">Companies</a>
            <a href="#" className="text-white text-sm hover:text-teal-400">Kids &amp; Youth</a>
            <a href="#" className="text-white text-sm hover:text-teal-400">Community</a>
            <a href="#" className="text-white text-sm hover:text-teal-400">About</a>
          </div>
          <button style={{backgroundColor: '#00b8a9'}} className="text-white font-semibold px-6 py-2 rounded-full text-sm">
            Apply Now
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        backgroundColor: '#0d1436',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, #1a3a8a33 0%, transparent 70%)',
        paddingTop: '64px'
      }}>
        <div className="text-center px-8 max-w-4xl mx-auto">
          <p style={{color: '#00b8a9', fontSize: '12px', letterSpacing: '0.15em'}} className="uppercase font-semibold mb-6">
            1st Coding Academy in the Arab World — Est 2015
          </p>
          <h1 style={{fontSize: 'clamp(48px, 7vw, 80px)', lineHeight: '1.05', fontWeight: '800'}} className="text-white mb-6">
            Build Real Tech Skills<br/>
            <span style={{color: '#00b8a9'}}>Not Just Knowledge</span>
          </h1>
          <p style={{fontSize: '18px', color: '#8892b0', lineHeight: '1.7'}} className="mb-10 max-w-2xl mx-auto">
            CODED programs are hands-on from day one — projects, coaching, and real standards.
            Join as an adult, teen, or kid. Leave with work you can show.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button style={{backgroundColor: '#00b8a9', fontSize: '16px'}} className="text-white font-bold px-8 py-4 rounded-full flex items-center gap-2">
              Explore Bootcamps <span>→</span>
            </button>
            <button className="text-white font-semibold px-8 py-4 rounded-full" style={{border: '1px solid rgba(255,255,255,0.3)'}}>
              CODED For Companies →
            </button>
          </div>
        </div>
      </section>

      {/* BOOTCAMPS */}
      <section style={{backgroundColor: '#f4f5f7', padding: '96px 0'}}>
        <div className="max-w-6xl mx-auto px-8">
          <h2 style={{fontSize: '42px', fontWeight: '800', color: '#0a0f2e', textAlign: 'center', marginBottom: '16px'}}>
            Discover Your Perfect Bootcamp Match Today
          </h2>
          <p style={{color: '#6b7280', textAlign: 'center', fontSize: '18px', marginBottom: '64px'}}>
            Intensive programs for adults who want to change direction, or upgrade their skills.
          </p>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px'}}>

            {[
              {title: 'Cybersecurity', color: '#1a2570', desc: 'A hands-on cybersecurity bootcamp focused on real attack and defense techniques, not theory or certifications.'},
              {title: 'AI App Developer', color: '#00b8a9', desc: 'A hands-on bootcamp where you learn to build full products—frontend to backend—using modern tools and real workflows.'},
              {title: 'Agentic AI Bootcamp', color: '#2d6a4f', desc: 'Build autonomous AI agents that reason, plan, and execute real tasks independently using cutting-edge frameworks.'},
              {title: 'AI & Data Science', color: '#9b59b6', desc: 'A hands-on bootcamp in data analysis and applied AI. Learn to work with real data, build models, and turn insights into decisions.'},
            ].map((boot) => (
              <div key={boot.title} style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                <h3 style={{fontSize: '24px', fontWeight: '800', color: boot.color}}>
                  {boot.title}
                </h3>
                <p style={{color: '#6b7280', fontSize: '15px', lineHeight: '1.6', flex: 1}}>
                  {boot.desc}
                </p>
                <button style={{
                  backgroundColor: boot.color,
                  color: 'white',
                  padding: '12px 28px',
                  borderRadius: '999px',
                  fontWeight: '700',
                  fontSize: '15px',
                  border: 'none',
                  cursor: 'pointer',
                  alignSelf: 'flex-start'
                }}>
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section style={{backgroundColor: 'white', padding: '96px 0'}}>
        <div className="max-w-6xl mx-auto px-8">
          <h2 style={{fontSize: '42px', fontWeight: '800', color: '#0a0f2e', textAlign: 'center', marginBottom: '64px'}}>
            Who is CODED for?
          </h2>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px'}}>
            {[
              {title: 'Spark Your Kid', bg: '#ef4444', badge: 'Weekends & School Breaks', cta: '⭐ Strong Start', desc: 'A guided start that builds logic, creativity, and confidence through coding.'},
              {title: 'Launch Your Tech Career', bg: '#3b82f6', badge: 'Programs Around The Year', cta: 'Real Builds', desc: 'For university students and fresh graduates ready to build real skills.'},
              {title: 'Build Job Skills', bg: '#0a0f2e', badge: 'Evening Sessions', cta: '🚀 Zero to Hero', desc: 'Intensive, career-focused training for adults who work during the day.'},
            ].map((aud) => (
              <div key={aud.title} style={{
                backgroundColor: aud.bg,
                borderRadius: '20px',
                padding: '40px',
                minHeight: '360px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                gap: '12px'
              }}>
                <span style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  padding: '4px 16px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  alignSelf: 'flex-start'
                }}>
                  {aud.badge}
                </span>
                <h3 style={{fontSize: '24px', fontWeight: '800', color: 'white'}}>
                  {aud.title}
                </h3>
                <p style={{color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: '1.5'}}>
                  {aud.desc}
                </p>
                <button style={{
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  color: 'white',
                  padding: '10px 24px',
                  borderRadius: '999px',
                  fontWeight: '700',
                  fontSize: '14px',
                  border: 'none',
                  cursor: 'pointer',
                  alignSelf: 'flex-start',
                  marginTop: '8px'
                }}>
                  {aud.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPANY LOGOS */}
      <section style={{backgroundColor: '#f4f5f7', padding: '64px 0'}}>
        <div className="max-w-6xl mx-auto px-8 text-center">
          <p style={{color: '#00b8a9', fontSize: '12px', letterSpacing: '0.15em', fontWeight: '600', marginBottom: '40px'}} className="uppercase">
            Trusted by Leading Companies in Kuwait
          </p>
          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '48px', alignItems: 'center'}}>
            {['Zain', 'NBK', 'Boubyan Bank', 'Agility', 'KFAS', 'Floward', 'Markaz', 'Gulf Bank', 'KISR'].map(c => (
              <span key={c} style={{color: '#9ca3af', fontSize: '18px', fontWeight: '600'}}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{backgroundColor: '#0d1436', padding: '96px 0'}}>
        <div className="max-w-6xl mx-auto px-8">
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', textAlign: 'center'}}>
            {[
              {num: '500+', label: 'Graduates'},
              {num: '50+', label: 'Company Partners'},
              {num: '10', label: 'Years Est. 2015'},
              {num: '4', label: 'Active Tracks'},
            ].map(s => (
              <div key={s.label}>
                <div style={{fontSize: '64px', fontWeight: '800', color: '#00b8a9', lineHeight: '1'}}>{s.num}</div>
                <div style={{color: 'white', fontSize: '16px', marginTop: '12px'}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{backgroundColor: '#00b8a9', padding: '96px 0', textAlign: 'center'}}>
        <div className="max-w-3xl mx-auto px-8">
          <h2 style={{fontSize: '48px', fontWeight: '800', color: 'white', marginBottom: '16px'}}>
            Ready to build real skills?
          </h2>
          <p style={{color: 'rgba(255,255,255,0.85)', fontSize: '18px', marginBottom: '40px'}}>
            Join the next cohort. Seats are limited.
          </p>
          <button style={{
            backgroundColor: 'white',
            color: '#00b8a9',
            padding: '16px 48px',
            borderRadius: '999px',
            fontWeight: '800',
            fontSize: '18px',
            border: 'none',
            cursor: 'pointer'
          }}>
            Apply Now →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{backgroundColor: '#0d1436', padding: '64px 0 32px'}}>
        <div className="max-w-6xl mx-auto px-8">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '48px', flexWrap: 'wrap', gap: '32px'}}>
            <div>
              <div style={{border: '2px solid white', padding: '4px 10px', display: 'inline-block', marginBottom: '12px'}}>
                <span className="text-white font-bold text-lg">CODED</span>
              </div>
              <p style={{color: '#8892b0', fontSize: '12px', letterSpacing: '0.1em'}} className="uppercase">
                The Go-To Place for AI &amp; Tech Education in Kuwait
              </p>
            </div>
            <div style={{display: 'flex', gap: '48px', flexWrap: 'wrap'}}>
              {['Bootcamps', 'Companies', 'Kids & Youth', 'Community', 'About'].map(l => (
                <a key={l} href="#" style={{color: '#8892b0', fontSize: '14px', textDecoration: 'none'}}>{l}</a>
              ))}
            </div>
          </div>
          <div style={{borderTop: '1px solid #1e2d6b', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px'}}>
            <span style={{color: '#8892b0', fontSize: '13px'}}>2026 © CODED. Kuwait Free Trade Zone.</span>
            <span style={{color: '#8892b0', fontSize: '13px'}}>hello@joincoded.com · +965 6079 1018</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
