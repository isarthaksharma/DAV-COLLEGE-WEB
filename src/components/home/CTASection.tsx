
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="bg-primary text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Begin Your Journey with DAV College</h2>
        <p className="max-w-2xl mx-auto mb-8">
          Take the first step toward a bright future. Apply now to join our community of learners and leaders.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="secondary" 
            size="lg" 
            className="bg-white text-primary hover:bg-gray-100"
            asChild
          >
            <Link to="/application">Apply Now</Link>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-white text-white hover:bg-white/10"
            asChild
          >
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
