import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-coded-bg-dark overflow-hidden">
      {/* Radial blue glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-[#1a3a8f] opacity-20 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="flex items-center justify-between">
          {/* Left curly brace placeholder */}
          <div className="hidden lg:flex items-center justify-center w-24 flex-shrink-0">
            <span className="text-[120px] font-light text-coded-muted-dark/30 select-none leading-none">
              &#123;
            </span>
          </div>

          {/* Center content */}
          <div className="flex-1 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-coded-text-light tracking-tight leading-[1.1]">
              Build Real Tech Skills
              <br />
              <span className="text-coded-teal">Not Just Knowledge</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-coded-muted-dark max-w-2xl mx-auto leading-relaxed">
              CODED programs are hands-on from day one — projects, coaching, and
              real standards. Join as an adult, teen, or kid. Leave with work you
              can show.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/bootcamps"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-[8px] bg-coded-teal text-white hover:bg-coded-teal/90 transition-colors"
              >
                Explore Bootcamps
              </Link>
              <Link
                href="/companies"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-coded-muted-dark hover:text-white transition-colors"
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

            <div className="mt-16 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-coded-muted-dark">
              <span>1st Academy in the Arab World</span>
              <span className="text-coded-teal">&lt;/&gt;</span>
              <span>Est 2015</span>
            </div>
          </div>

          {/* Right curly brace placeholder */}
          <div className="hidden lg:flex items-center justify-center w-24 flex-shrink-0">
            <span className="text-[120px] font-light text-coded-muted-dark/30 select-none leading-none">
              &#125;
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
