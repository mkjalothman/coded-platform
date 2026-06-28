import Link from "next/link";

const audiences = [
  {
    title: "Spark Your Kid",
    description:
      "Fun, project-based coding for kids and teens. They build games, apps, and websites while learning to think like engineers.",
    cta: "Strong Start",
    href: "/youth",
    accent: "bg-red-500",
    accentBorder: "border-red-500",
    image: "/images/kids-placeholder.jpg",
  },
  {
    title: "Launch Your Tech Career",
    description:
      "Full-time and part-time bootcamps for career changers. Go from zero experience to building production-ready applications.",
    cta: "Real Builds",
    href: "/bootcamps",
    accent: "bg-blue-500",
    accentBorder: "border-blue-500",
    image: "/images/career-placeholder.jpg",
  },
  {
    title: "Build Job Skills",
    description:
      "Upskill your team or yourself with focused programs designed around real industry needs and hands-on project work.",
    cta: "Zero to Hero",
    href: "/companies",
    accent: "bg-coded-navy",
    accentBorder: "border-coded-navy",
    image: "/images/skills-placeholder.jpg",
  },
];

export default function StatsBar() {
  return (
    <section className="bg-coded-bg py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {audiences.map((item) => (
            <div
              key={item.title}
              className={`bg-coded-surface rounded-[16px] border border-coded-border shadow-sm overflow-hidden group hover:shadow-md transition-all duration-200`}
            >
              {/* Image placeholder */}
              <div className="h-48 bg-gradient-to-br from-coded-bg to-coded-border flex items-center justify-center">
                <span className="text-coded-muted text-sm">Image</span>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-coded-text">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-coded-muted leading-relaxed">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className={`mt-4 inline-flex items-center justify-center px-5 py-2 text-sm font-medium rounded-[8px] ${item.accent} text-white hover:opacity-90 transition-opacity`}
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
