import HeroSection from "@/components/sections/HeroSection";
import BootcampGrid from "@/components/sections/BootcampGrid";
import StatsBar from "@/components/sections/StatsBar";
import CompanyLogos from "@/components/sections/CompanyLogos";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BootcampGrid />
      <StatsBar />
      <CompanyLogos />
    </>
  );
}
