import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* ========== SECTION 1 — HERO ========== */}
      <section
        className="relative min-h-screen flex flex-col"
        style={{ backgroundColor: "#0d1436" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, #1a3a8a44 0%, transparent 70%)",
          }}
        />

        {/* Navbar */}
        <nav className="relative z-10 w-full">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-20">
            <Link
              href="/"
              className="inline-flex items-center border-2 border-white rounded-md px-4 py-1.5"
            >
              <span className="text-lg font-bold tracking-tight text-white">
                CODED
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/bootcamps" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Bootcamps</Link>
              <Link href="/companies" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Companies</Link>
              <Link href="/youth" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Kids &amp; Youth</Link>
              <Link href="/community" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Community</Link>
              <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">About</Link>
            </div>

            <Link
              href="/apply"
              className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-full text-white transition-colors"
              style={{ backgroundColor: "#00b8a9" }}
            >
              Apply Now
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pb-20">
          <p
            className="text-xs font-semibold uppercase tracking-[0.25em] mb-8"
            style={{ color: "#00b8a9" }}
          >
            1ST CODING ACADEMY IN THE ARAB WORLD — EST 2015
          </p>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight max-w-4xl">
            Build Real Tech Skills
            <br />
            <span style={{ color: "#00b8a9" }}>Not Just Knowledge</span>
          </h1>

          <p className="mt-6 text-lg text-gray-400 leading-relaxed max-w-xl">
            CODED programs are hands-on from day one — projects, coaching, and
            real standards. Join as an adult, teen, or kid. Leave with work you
            can show.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/bootcamps"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-full text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: "#00b8a9" }}
            >
              Explore Bootcamps →
            </Link>
            <Link
              href="/companies"
              className="inline-flex items-center justify-center px-6 py-4 text-base font-medium text-white hover:underline transition-all"
            >
              CODED For Companies &gt;
            </Link>
          </div>
        </div>
      </section>

      {/* ========== SECTION 2 — BOOTCAMPS ========== */}
      <section className="py-24" style={{ backgroundColor: "#f4f5f7" }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className="text-4xl font-bold text-center tracking-tight"
            style={{ color: "#0d1436" }}
          >
            Discover Your Perfect Bootcamp Match Today
          </h2>
          <p className="mt-4 text-center text-gray-500 text-lg max-w-2xl mx-auto mb-16">
            Intensive programs for adults who want to change direction, or
            upgrade their skills.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cybersecurity */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h3 className="text-2xl font-bold" style={{ color: "#1a2570" }}>
                Cybersecurity
              </h3>
              <p className="mt-3 text-gray-500 leading-relaxed">
                A hands-on bootcamp focused on real attack and defense
                techniques. Learn to protect systems, detect threats, and
                respond to incidents.
              </p>
              <Link
                href="/bootcamps/cybersecurity"
                className="mt-6 inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-full text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: "#1a2570" }}
              >
                Apply Now
              </Link>
            </div>

            {/* AI App Developer */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h3 className="text-2xl font-bold" style={{ color: "#00b8a9" }}>
                AI App Developer
              </h3>
              <p className="mt-3 text-gray-500 leading-relaxed">
                Build AI-powered applications from scratch. Learn to integrate
                LLMs, build agents, and ship products that use cutting-edge AI.
              </p>
              <Link
                href="/bootcamps/ai-app-developer"
                className="mt-6 inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-full text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: "#00b8a9" }}
              >
                Apply Now
              </Link>
            </div>

            {/* Agentic AI Bootcamp */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h3 className="text-2xl font-bold" style={{ color: "#2d6a4f" }}>
                Agentic AI Bootcamp
              </h3>
              <p className="mt-3 text-gray-500 leading-relaxed">
                Master the art of building autonomous AI agents. Design systems
                that reason, plan, and execute complex tasks independently.
              </p>
              <Link
                href="/bootcamps/agentic-ai"
                className="mt-6 inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-full text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: "#2d6a4f" }}
              >
                Apply Now
              </Link>
            </div>

            {/* AI & Data Science */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h3 className="text-2xl font-bold" style={{ color: "#9b59b6" }}>
                AI &amp; Data Science
              </h3>
              <p className="mt-3 text-gray-500 leading-relaxed">
                A hands-on bootcamp in data analysis and applied AI. Learn to
                work with real data, build models, and turn insights into
                decisions.
              </p>
              <Link
                href="/bootcamps/data-science"
                className="mt-6 inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-full text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: "#9b59b6" }}
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 3 — AUDIENCE ========== */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className="text-4xl font-bold text-center tracking-tight mb-16"
            style={{ color: "#0d1436" }}
          >
            Who is CODED for?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Kids */}
            <div className="bg-red-500 rounded-2xl p-8 h-80 flex flex-col justify-end">
              <h3 className="text-2xl font-bold text-white">Spark Your Kid</h3>
              <span className="mt-2 inline-block bg-white/20 text-white text-sm rounded-full px-4 py-1 w-fit">
                Weekends &amp; School Breaks
              </span>
              <Link
                href="/youth"
                className="mt-4 inline-flex items-center justify-center px-6 py-2 text-sm font-semibold rounded-full bg-red-600 text-white transition-colors hover:bg-red-700 w-fit"
              >
                ⭐ Strong Start
              </Link>
            </div>

            {/* Career */}
            <div className="bg-blue-600 rounded-2xl p-8 h-80 flex flex-col justify-end">
              <h3 className="text-2xl font-bold text-white">
                Launch Your Tech Career
              </h3>
              <span className="mt-2 inline-block bg-white/20 text-white text-sm rounded-full px-4 py-1 w-fit">
                Programs Around The Year
              </span>
              <Link
                href="/bootcamps"
                className="mt-4 inline-flex items-center justify-center px-6 py-2 text-sm font-semibold rounded-full bg-blue-700 text-white transition-colors hover:bg-blue-800 w-fit"
              >
                Real Builds
              </Link>
            </div>

            {/* Companies */}
            <div className="bg-gray-900 rounded-2xl p-8 h-80 flex flex-col justify-end">
              <h3 className="text-2xl font-bold text-white">
                Build Job Skills
              </h3>
              <span className="mt-2 inline-block bg-white/20 text-white text-sm rounded-full px-4 py-1 w-fit">
                Evening Sessions
              </span>
              <Link
                href="/companies"
                className="mt-4 inline-flex items-center justify-center px-6 py-2 text-sm font-semibold rounded-full bg-gray-800 text-white transition-colors hover:bg-gray-700 w-fit"
              >
                🚀 Zero to Hero
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 4 — COMPANY LOGOS ========== */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <p
            className="text-center text-xs font-semibold uppercase tracking-[0.2em] mb-8"
            style={{ color: "#00b8a9" }}
          >
            Trusted by leading companies in Kuwait
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {[
              "Zain",
              "NBK",
              "Boubyan Bank",
              "Agility",
              "KFAS",
              "Floward",
              "Markaz",
              "Gulf Bank",
              "KISR",
            ].map((company) => (
              <span
                key={company}
                className="text-gray-400 font-semibold text-lg"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 5 — STATS ========== */}
      <section className="py-24" style={{ backgroundColor: "#0d1436" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-6xl font-bold" style={{ color: "#00b8a9" }}>
                500+
              </p>
              <p className="mt-2 text-lg text-white">Graduates</p>
            </div>
            <div>
              <p className="text-6xl font-bold" style={{ color: "#00b8a9" }}>
                50+
              </p>
              <p className="mt-2 text-lg text-white">Company Partners</p>
            </div>
            <div>
              <p className="text-6xl font-bold" style={{ color: "#00b8a9" }}>
                10
              </p>
              <p className="mt-2 text-lg text-white">Years Est. 2015</p>
            </div>
            <div>
              <p className="text-6xl font-bold" style={{ color: "#00b8a9" }}>
                4
              </p>
              <p className="mt-2 text-lg text-white">Active Tracks</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 6 — CTA ========== */}
      <section
        className="py-24 text-center"
        style={{ backgroundColor: "#00b8a9" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white">
            Ready to build real skills?
          </h2>
          <p className="mt-4 text-lg text-white mb-8">
            Join the next cohort. Seats are limited.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center justify-center px-10 py-4 text-base font-bold rounded-full bg-white transition-colors hover:bg-gray-100"
            style={{ color: "#00b8a9" }}
          >
            Apply Now →
          </Link>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="py-16" style={{ backgroundColor: "#0d1436" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center border-2 border-white rounded-md px-4 py-1.5 mb-4">
              <span className="text-lg font-bold tracking-tight text-white">
                CODED
              </span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-8">
              THE GO-TO PLACE FOR AI &amp; TECH EDUCATION IN KUWAIT
            </p>

            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <Link href="/bootcamps" className="text-sm text-gray-400 hover:text-white transition-colors">Bootcamps</Link>
              <Link href="/companies" className="text-sm text-gray-400 hover:text-white transition-colors">Companies</Link>
              <Link href="/youth" className="text-sm text-gray-400 hover:text-white transition-colors">Kids &amp; Youth</Link>
              <Link href="/community" className="text-sm text-gray-400 hover:text-white transition-colors">Community</Link>
              <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About</Link>
            </div>

            <div className="border-t border-gray-700 pt-8 w-full">
              <p className="text-sm text-gray-500">
                2026 © CODED. Kuwait Free Trade Zone. hello@joincoded.com +965
                6079 1018
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
