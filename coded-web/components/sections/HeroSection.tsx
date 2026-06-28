import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-coded-bg-dark overflow-hidden min-h-screen flex items-center">
      {/* Radial blue glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full bg-[#1a3a8f] opacity-20 blur-[150px]" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-20">
        <div className="flex items-center justify-between">
          {/* Left curly brace */}
          <div className="hidden lg:flex items-center justify-center w-28 flex-shrink-0">
            <span className="text-[140px] font-light text-coded-muted-dark/30 select-none leading-none">
              &#123;
            </span>
          </div>

          {/* Center content */}
          <div className="flex-1 text-center max-w-4xl mx-auto flex flex-col items-center gap-8">
            <h1 className="text-5xl md:text-7xl font-bold text-coded-text-light tracking-tight leading-[1.08]">
              Build Real Tech Skills
              <br />
              <span className="text-coded-teal">Not Just Knowledge</span>
            </h1>

            <p className="text-lg md:text-xl text-coded-muted-dark max-w-2xl leading-relaxed">
              CODED programs are hands-on from day one — projects, coaching, and
              real standards. Join as an adult, teen, or kid. Leave with work you
              can show.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/bootcamps"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-[10px] bg-coded-teal text-white hover:bg-coded-teal/90 transition-colors"
              >
                Explore Bootcamps
              </Link>
              <Link
                href="/companies"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-coded-muted-dark hover:text-white transition-colors"
              >
                CODED For Companies
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-coded-muted-dark pt-8">
              <span>1st Academy in the Arab World</span>
              <span className="text-coded-teal">&lt;/&gt;</span>
              <span>Est 2015</span>
            </div>
          </div>

          {/* Right curly brace */}
          <div className="hidden lg:flex items-center justify-center w-28 flex-shrink-0">
            <span className="text-[140px] font-light text-coded-muted-dark/30 select-none leading-none">
              &#125;
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
