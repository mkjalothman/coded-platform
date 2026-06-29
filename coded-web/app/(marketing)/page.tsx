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
import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/supabase/types";
import { bootcamps as fallbackBootcamps, audiences as fallbackAudiences, stats as fallbackStats, companies as fallbackCompanies } from "@/data/programs";
import { testimonials as fallbackTestimonials } from "@/data/testimonials";

export default async function Home() {
  const supabase = await createClient();

  const programsRes = await supabase.from("programs").select("*").order("sort");
  const audiencesRes = await supabase.from("audiences").select("*").order("sort");
  const testimonialsRes = await supabase.from("testimonials").select("*").order("sort");
  const companiesRes = await supabase.from("companies").select("*").order("sort");
  const statsRes = await supabase.from("stats").select("*").order("sort");

  const programs = (programsRes.data as Tables<"programs">[] | null)?.map(p => ({
    title: p.name,
    color: p.accent_color,
    desc: p.description,
    slug: p.slug,
  })) ?? fallbackBootcamps;

  const audiences = (audiencesRes.data as Tables<"audiences">[] | null)?.map(a => ({
    title: a.title,
    bg: a.bg_color,
    badge: a.badge,
    cta: a.cta_label,
    desc: a.description,
  })) ?? fallbackAudiences;

  const testimonials = (testimonialsRes.data as Tables<"testimonials">[] | null)?.map(t => ({
    name: t.name,
    track: t.program,
    quote: t.quote,
    initials: t.initials,
  })) ?? fallbackTestimonials;

  const companies = (companiesRes.data as Tables<"companies">[] | null)?.map(c => c.name) ?? fallbackCompanies;

  const stats = (statsRes.data as Tables<"stats">[] | null)?.map(s => ({
    num: s.value,
    suffix: s.suffix,
    label: s.label,
  })) ?? fallbackStats;

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <HeroSection />
      <BootcampGrid programs={programs} />
      <AudienceSection audiences={audiences} />
      <TestimonialSection testimonials={testimonials} />
      <CompanyLogos companies={companies} />
      <StatsBar stats={stats} />
      <HowItWorks />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
