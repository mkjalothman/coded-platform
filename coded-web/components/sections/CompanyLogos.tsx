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
    <section className="bg-white py-12 border-y border-coded-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-coded-muted mb-8">
          Trusted by leading companies
        </p>
        <div className="relative overflow-hidden">
          <div className="flex animate-[scroll_30s_linear_infinite] gap-12 items-center">
            {[...companies, ...companies].map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex-shrink-0 px-6 py-3 rounded-[8px] bg-coded-bg border border-coded-border"
              >
                <span className="text-sm font-semibold text-coded-muted whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </div>
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
