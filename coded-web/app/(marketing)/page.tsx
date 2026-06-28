"use client";

import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import BootcampGrid from "@/components/sections/BootcampGrid";
import AudienceSection from "@/components/sections/AudienceSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import CompanyLogos from "@/components/sections/CompanyLogos";
import StatsBar from "@/components/sections/StatsBar";
import HowItWorks from "@/components/sections/HowItWorks";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <HeroSection />
      <BootcampGrid />
      <AudienceSection />
      <TestimonialSection />
      <CompanyLogos />
      <StatsBar />
      <HowItWorks />
      <CTASection />
      <Footer />
    </div>
  );
}
