const companies = [
  "Boubyan Bank",
  "Markaz",
  "Floward",
  "KISR",
  "Zain",
  "NBK",
  "Agility",
  "KFAS",
  "Ooredoo",
  "Gulf Bank",
];

export default function CompanyLogos() {
  return (
    <section className="bg-white py-16 border-y border-gray-200/80">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-coded-muted mb-10">
          Trusted by leading companies
        </p>
      </div>
      <div className="overflow-hidden">
        <div className="flex animate-[scroll_30s_linear_infinite] gap-6 items-center px-6">
          {[...companies, ...companies].map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex-shrink-0 px-8 py-4 rounded-xl bg-gray-50 border border-gray-200"
            >
              <span className="text-sm font-semibold text-coded-muted whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
