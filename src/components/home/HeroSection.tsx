
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative">
      <div className="bg-[url('https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80')] bg-cover bg-center h-[600px]">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Shaping Futures, <span className="text-accent">Creating Leaders</span>
            </h1>
            <p className="text-lg md:text-xl mb-8">
              DAV College offers quality education with modern facilities and experienced faculty. Join us to shape your future and become a leader in your field.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link to="/application">Apply Now</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                <Link to="/programs">Explore Programs</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
