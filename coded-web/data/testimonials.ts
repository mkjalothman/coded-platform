export interface Testimonial {
  name: string;
  track: string;
  quote: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Fatima Al-Rashidi",
    track: "AI App Developer · Cohort 9",
    quote: "I joined as a marketing manager with zero coding. After 12 weeks I shipped a working app and got promoted to lead our digital transformation team.",
    initials: "FA",
  },
  {
    name: "Khalid Al-Mutairi",
    track: "Cybersecurity · Cohort 6",
    quote: "CODED is nothing like a typical course. The coaches push you hard. I left with a capstone project that got me my first dev job within 2 months.",
    initials: "KM",
  },
  {
    name: "Nour Al-Sabah",
    track: "Agentic AI · Cohort 1",
    quote: "The Agentic AI track was exactly what I needed. I am now building AI workflows at my company that save us 20+ hours every single week.",
    initials: "NS",
  },
];
