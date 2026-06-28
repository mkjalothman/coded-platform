import Link from "next/link";

const bootcamps = [
  {
    title: "Cybersecurity",
    titleColor: "text-coded-navy",
    description:
      "A hands-on bootcamp focused on real attack and defense techniques. Learn to protect systems, detect threats, and respond to incidents.",
    btnColor: "bg-coded-navy hover:bg-coded-navy/90",
    href: "/bootcamps/cybersecurity",
    iconBg: "bg-coded-navy/10",
    iconStroke: "#1a2570",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "AI App Developer",
    titleColor: "text-coded-teal",
    description:
      "Build AI-powered applications from scratch. Learn to integrate LLMs, build agents, and ship products that use cutting-edge AI.",
    btnColor: "bg-coded-teal hover:bg-coded-teal/90",
    href: "/bootcamps/ai-app-developer",
    iconBg: "bg-coded-teal/10",
    iconStroke: "#00b8a9",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Agentic AI Bootcamp",
    titleColor: "text-coded-green",
    description:
      "Master the art of building autonomous AI agents. Design systems that reason, plan, and execute complex tasks independently.",
    btnColor: "bg-coded-green hover:bg-coded-green/90",
    href: "/bootcamps/agentic-ai",
    iconBg: "bg-coded-green/10",
    iconStroke: "#2d6a4f",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    title: "AI & Data Science",
    titleColor: "text-coded-purple",
    description:
      "A hands-on bootcamp in data analysis and applied AI. Learn to work with real data, build models, and turn insights into decisions.",
    btnColor: "bg-coded-purple hover:bg-coded-purple/90",
    href: "/bootcamps/data-science",
    iconBg: "bg-coded-purple/10",
    iconStroke: "#9b59b6",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
];

export default function BootcampGrid() {
  return (
    <section className="bg-coded-bg py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-coded-text tracking-tight leading-tight">
            Discover Your Perfect Bootcamp Match Today
          </h2>
          <p className="mt-5 text-lg text-coded-muted leading-relaxed">
            Intensive programs for adults who want to change direction, upskill,
            or break into tech with real, job-ready abilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bootcamps.map((camp) => (
            <div
              key={camp.title}
              className="bg-white rounded-2xl p-8 shadow-md border border-gray-200/80 hover:shadow-xl transition-all duration-200 group"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <h3 className={`text-xl font-bold ${camp.titleColor}`}>
                    {camp.title}
                  </h3>
                  <p className="mt-3 text-coded-muted leading-relaxed text-sm">
                    {camp.description}
                  </p>
                  <Link
                    href={camp.href}
                    className={`mt-6 inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-lg ${camp.btnColor} text-white transition-colors`}
                  >
                    Apply Now
                  </Link>
                </div>
                <div
                  className={`w-14 h-14 rounded-xl ${camp.iconBg} flex items-center justify-center flex-shrink-0`}
                  style={{ color: camp.iconStroke }}
                >
                  {camp.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
