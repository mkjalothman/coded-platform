export interface Bootcamp {
  title: string;
  color: string;
  desc: string;
  slug: string;
}

export const bootcamps: Bootcamp[] = [
  {
    title: "Cybersecurity",
    color: "#1a2570",
    desc: "A hands-on cybersecurity bootcamp focused on real attack and defense techniques, not theory or certifications.",
    slug: "cybersecurity",
  },
  {
    title: "AI App Developer",
    color: "#00b8a9",
    desc: "A hands-on bootcamp where you learn to build full products—frontend to backend—using modern tools and real workflows.",
    slug: "ai-app-developer",
  },
  {
    title: "Agentic AI Bootcamp",
    color: "#2d6a4f",
    desc: "Build autonomous AI agents that reason, plan, and execute real tasks independently using cutting-edge frameworks.",
    slug: "agentic-ai",
  },
  {
    title: "AI & Data Science",
    color: "#9b59b6",
    desc: "A hands-on bootcamp in data analysis and applied AI. Learn to work with real data, build models, and turn insights into decisions.",
    slug: "ai-data-science",
  },
];

export interface Audience {
  title: string;
  bg: string;
  badge: string;
  cta: string;
  desc: string;
}

export const audiences: Audience[] = [
  {
    title: "Spark Your Kid",
    bg: "#ef4444",
    badge: "Weekends & School Breaks",
    cta: "Strong Start",
    desc: "A guided start that builds logic, creativity, and confidence through coding.",
  },
  {
    title: "Launch Your Tech Career",
    bg: "#3b82f6",
    badge: "Programs Around The Year",
    cta: "Real Builds",
    desc: "For university students and fresh graduates ready to build real skills.",
  },
  {
    title: "Build Job Skills",
    bg: "#0a0f2e",
    badge: "Evening Sessions",
    cta: "Zero to Hero",
    desc: "Intensive, career-focused training for adults who work during the day.",
  },
];

export interface Stat {
  num: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { num: 500, suffix: "+", label: "Graduates" },
  { num: 50, suffix: "+", label: "Company Partners" },
  { num: 10, suffix: "", label: "Years Est. 2015" },
  { num: 4, suffix: "", label: "Active Tracks" },
];

export interface Step {
  num: string;
  title: string;
  desc: string;
}

export const steps: Step[] = [
  {
    num: "01",
    title: "Learn by building",
    desc: "Every session ends with something you made. Projects are portfolio pieces you would show an employer.",
  },
  {
    num: "02",
    title: "Get real feedback",
    desc: "Instructors review your work and tell you exactly what to fix. Less guessing, more progress every session.",
  },
  {
    num: "03",
    title: "Learn with a cohort",
    desc: "You collaborate, present, and give feedback like a real team. Your peers become your professional network.",
  },
  {
    num: "04",
    title: "Ship a real product",
    desc: "Your final project is a full deployable product built to industry standards. Something you can demo and share.",
  },
];

export const companies = [
  "Zain",
  "NBK",
  "Boubyan Bank",
  "Agility",
  "KFAS",
  "Floward",
  "Markaz",
  "Gulf Bank",
  "KISR",
  "Ooredoo",
];

export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: "Do I need coding experience to join?",
    answer: "Not at all. Our bootcamps are designed for beginners. We start from scratch and build up to production-level projects through hands-on coaching.",
  },
  {
    question: "How long are the bootcamps?",
    answer: "Adult bootcamps run 10–14 weeks, depending on the track. Kids and youth programs run on weekends and school breaks. Enterprise training is customized to your team’s schedule.",
  },
  {
    question: "What do I get when I finish?",
    answer: "A portfolio of real projects you built yourself, a certificate of completion, and access to our alumni network and career support. Many graduates land jobs within 2–3 months.",
  },
  {
    question: "Is it online or in-person?",
    answer: "Bootcamps are hybrid — in-person at our Kuwait Free Trade Zone campus with online support. Enterprise programs can be fully on-site at your company.",
  },
  {
    question: "How much does it cost?",
    answer: "Pricing varies by program. Contact us at hello@joincoded.com or call +965 6079 1018 for the latest schedule and pricing.",
  },
  {
    question: "Can my company sponsor employees?",
    answer: "Yes. We work with 50+ companies in Kuwait. We offer custom enterprise packages, evening schedules, and tailored curriculum. Reach out to discuss your team’s needs.",
  },
];
