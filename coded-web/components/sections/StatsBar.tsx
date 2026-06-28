import Link from "next/link";

const audiences = [
  {
    title: "Spark Your Kid",
    description:
      "Fun, project-based coding for kids and teens. They build games, apps, and websites while learning to think like engineers.",
    cta: "Strong Start",
    href: "/youth",
    accent: "bg-red-500 hover:bg-red-500/90",
    gradient: "from-red-50 to-orange-50",
  },
  {
    title: "Launch Your Tech Career",
    description:
      "Full-time and part-time bootcamps for career changers. Go from zero experience to building production-ready applications.",
    cta: "Real Builds",
    href: "/bootcamps",
    accent: "bg-blue-500 hover:bg-blue-500/90",
    gradient: "from-blue-50 to-indigo-50",
  },
  {
    title: "Build Job Skills",
    description:
      "Upskill your team or yourself with focused programs designed around real industry needs and hands-on project work.",
    cta: "Zero to Hero",
    href: "/companies",
    accent: "bg-coded-navy hover:bg-coded-navy/90",
    gradient: "from-slate-100 to-blue-50",
  },
];

export default function StatsBar() {
  return (
    <section className="bg-coded-bg py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {audiences.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-gray-200/80 shadow-md overflow-hidden group hover:shadow-xl transition-all duration-200 flex flex-col"
            >
              <div
                className={`h-48 bg-gradient-to-br ${item.gradient} flex items-center justify-center`}
              >
                <span className="text-coded-muted/40 text-sm font-medium">
                  Image
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-coded-text">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-coded-muted leading-relaxed flex-1">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className={`mt-5 inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-lg ${item.accent} text-white transition-colors self-start`}
                >
                  {item.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
