
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, BookOpen, Award, ChevronRight } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">About DAV College</h2>
            <p className="text-gray-700 mb-4">
              DAV College is a premier educational institution dedicated to providing quality education. Founded in 1948, we have a rich legacy of academic excellence and holistic development.
            </p>
            <p className="text-gray-700 mb-6">
              Our mission is to empower students with knowledge, skills, and values to excel in their chosen fields and contribute meaningfully to society.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center text-primary">
                  <Users />
                </div>
                <div>
                  <p className="font-bold text-2xl">5000+</p>
                  <p className="text-sm text-gray-600">Students</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center text-primary">
                  <GraduationCap />
                </div>
                <div>
                  <p className="font-bold text-2xl">200+</p>
                  <p className="text-sm text-gray-600">Faculty Members</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center text-primary">
                  <BookOpen />
                </div>
                <div>
                  <p className="font-bold text-2xl">50+</p>
                  <p className="text-sm text-gray-600">Programs</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center text-primary">
                  <Award />
                </div>
                <div>
                  <p className="font-bold text-2xl">75+</p>
                  <p className="text-sm text-gray-600">Years of Excellence</p>
                </div>
              </div>
            </div>
            <Button asChild>
              <Link to="/about">
                Learn More <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="relative">
            <img 
              src="https://github.com/isarthaksharma/photo/blob/main/IMG_0299.JPG?raw=true" 
              alt="DAV College Campus" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
            <div className="absolute -bottom-6 -left-6 bg-accent text-white p-6 rounded-lg shadow-lg">
              <p className="text-xl font-bold">Established in 1948</p>
              <p>Excellence in Education</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
