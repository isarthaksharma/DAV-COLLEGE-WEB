
import HeroSection from "@/components/home/HeroSection";
import QuickLinks from "@/components/home/QuickLinks";
import AboutSection from "@/components/home/AboutSection";
import ProgramsSection from "@/components/home/ProgramsSection";
import EventsSection from "@/components/home/EventsSection";
import CTASection from "@/components/home/CTASection";

const Home = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <QuickLinks />
      <AboutSection />
      <ProgramsSection />
      <EventsSection />
      <CTASection />
    </div>
  );
};

export default Home;
