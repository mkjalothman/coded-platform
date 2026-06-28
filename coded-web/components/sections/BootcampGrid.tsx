import Link from "next/link";

const bootcamps = [
  {
    title: "Cybersecurity",
    description:
      "A hands-on bootcamp focused on real attack and defense techniques. Learn to protect systems, detect threats, and respond to incidents.",
    color: "bg-coded-navy",
    hoverBorder: "hover:border-coded-navy",
    href: "/bootcamps/cybersecurity",
    icon: (
      <div className="w-16 h-16 rounded-[12px] bg-coded-navy/10 flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a2570" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      </div>
    ),
  },
  {
    title: "AI App Developer",
    description:
      "Build AI-powered applications from scratch. Learn to integrate LLMs, build agents, and ship products that use cutting-edge AI.",
    color: "bg-coded-teal",
    hoverBorder: "hover:border-coded-teal",
    href: "/bootcamps/ai-app-developer",
    icon: (
      <div className="w-16 h-16 rounded-[12px] bg-coded-teal/10 flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00b8a9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>
    ),
  },
  {
    title: "Agentic AI Bootcamp",
    description:
      "Master the art of building autonomous AI agents. Design systems that reason, plan, and execute complex tasks independently.",
    color: "bg-coded-green",
    hoverBorder: "hover:border-coded-green",
    href: "/bootcamps/agentic-ai",
    icon: (
      <div className="w-16 h-16 rounded-[12px] bg-coded-green/10 flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
        </svg>
      </div>
    ),
  },
  {
    title: "AI & Data Science",
    description:
      "A hands-on bootcamp in data analysis and applied AI. Learn to work with real data, build models, and turn insights into decisions.",
    color: "bg-coded-purple",
    hoverBorder: "hover:border-coded-purple",
    href: "/bootcamps/data-science",
    icon: (
      <div className="w-16 h-16 rounded-[12px] bg-coded-purple/10 flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9b59b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      </div>
    ),
  },
];

export default function BootcampGrid() {
  return (
    <section className="bg-coded-bg py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-coded-text tracking-tight">
            Discover Your Perfect Bootcamp Match Today
          </h2>
          <p className="mt-4 text-lg text-coded-muted leading-relaxed">
            Intensive programs for adults who want to change direction, upskill,
            or break into tech with real, job-ready abilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bootcamps.map((camp) => (
            <div
              key={camp.title}
              className={`bg-coded-surface border border-coded-border rounded-[16px] p-6 shadow-sm transition-all duration-200 hover:shadow-md ${camp.hoverBorder} group`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-coded-text">
                    {camp.title}
                  </h3>
                  <p className="mt-3 text-coded-muted leading-relaxed text-sm">
                    {camp.description}
                  </p>
                  <Link
                    href={camp.href}
                    className={`mt-6 inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-[8px] ${camp.color} text-white hover:opacity-90 transition-opacity`}
                  >
                    Apply Now
                  </Link>
                </div>
                <div className="ml-6 flex-shrink-0">{camp.icon}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
