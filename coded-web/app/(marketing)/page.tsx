import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import BootcampGrid from "@/components/sections/BootcampGrid";
import AudienceSection from "@/components/sections/AudienceSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import CompanyLogos from "@/components/sections/CompanyLogos";
import StatsBar from "@/components/sections/StatsBar";
import HowItWorks from "@/components/sections/HowItWorks";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/layout/Footer";
import type { Tables } from "@/lib/supabase/types";
import {
  bootcamps as fallbackBootcamps,
  audiences as fallbackAudiences,
  stats as fallbackStats,
  companies as fallbackCompanies,
  steps as fallbackSteps,
  faqs as fallbackFaqs,
} from "@/data/programs";
import { testimonials as fallbackTestimonials } from "@/data/testimonials";

async function fetchContent() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn("[page] Supabase env vars missing — using hardcoded fallback data");
    return null;
  }

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();

    const [programsRes, audiencesRes, testimonialsRes, companiesRes, statsRes, faqsRes, stepsRes] =
      await Promise.all([
        supabase.from("programs").select("*").order("sort"),
        supabase.from("audiences").select("*").order("sort"),
        supabase.from("testimonials").select("*").order("sort"),
        supabase.from("companies").select("*").order("sort"),
        supabase.from("stats").select("*").order("sort"),
        supabase.from("faqs").select("*").order("sort"),
        supabase.from("steps").select("*").order("sort"),
      ]);

    if (programsRes.error) console.error("[page] programs:", programsRes.error.message);
    if (audiencesRes.error) console.error("[page] audiences:", audiencesRes.error.message);
    if (testimonialsRes.error) console.error("[page] testimonials:", testimonialsRes.error.message);
    if (companiesRes.error) console.error("[page] companies:", companiesRes.error.message);
    if (statsRes.error) console.error("[page] stats:", statsRes.error.message);
    if (faqsRes.error) console.error("[page] faqs:", faqsRes.error.message);
    if (stepsRes.error) console.error("[page] steps:", stepsRes.error.message);

    return { programsRes, audiencesRes, testimonialsRes, companiesRes, statsRes, faqsRes, stepsRes };
  } catch (err) {
    console.error("[page] Supabase fetch failed — falling back to hardcoded data:", err);
    return null;
  }
}

export default async function Home() {
  const data = await fetchContent();

  const programs =
    (data?.programsRes.data as Tables<"programs">[] | null)?.map((p) => ({
      title: p.name,
      color: p.accent_color,
      desc: p.description,
      slug: p.slug,
    })) ?? fallbackBootcamps;

  const audiences =
    (data?.audiencesRes.data as Tables<"audiences">[] | null)?.map((a) => ({
      title: a.title,
      bg: a.bg_color,
      badge: a.badge,
      cta: a.cta_label,
      desc: a.description,
    })) ?? fallbackAudiences;

  const testimonials =
    (data?.testimonialsRes.data as Tables<"testimonials">[] | null)?.map((t) => ({
      name: t.name,
      track: t.program,
      quote: t.quote,
      initials: t.initials,
    })) ?? fallbackTestimonials;

  const companies =
    (data?.companiesRes.data as Tables<"companies">[] | null)?.map((c) => c.name) ??
    fallbackCompanies;

  const stats =
    (data?.statsRes.data as Tables<"stats">[] | null)?.map((s) => ({
      num: s.value,
      suffix: s.suffix,
      label: s.label,
    })) ?? fallbackStats;

  const faqList =
    (data?.faqsRes.data as Tables<"faqs">[] | null)?.map((f) => ({
      question: f.question,
      answer: f.answer,
    })) ?? fallbackFaqs;

  const stepList =
    (data?.stepsRes.data as Tables<"steps">[] | null)?.map((s) => ({
      num: s.num,
      title: s.title,
      desc: s.description,
    })) ?? fallbackSteps;

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <HeroSection />
      <BootcampGrid programs={programs} />
      <AudienceSection audiences={audiences} />
      <TestimonialSection testimonials={testimonials} />
      <CompanyLogos companies={companies} />
      <StatsBar stats={stats} />
      <HowItWorks steps={stepList} />
      <FAQSection faqs={faqList} />
      <CTASection />
      <Footer />
    </div>
  );
}
