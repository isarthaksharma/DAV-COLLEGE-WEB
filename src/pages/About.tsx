
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const About = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">About DAV College</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Founded in 1948, DAV College has a rich legacy of academic excellence and holistic development,
          serving the community for over 75 years with quality education and value-based learning.
        </p>
      </div>

      {/* College Principal Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Message from Our Principal</h2>
            <p className="text-gray-700 mb-4">
              "Welcome to DAV College, where we believe in nurturing not just academic excellence but also 
              character development. Our institution has been a beacon of quality education for over seven decades."
            </p>
            <p className="text-gray-700 mb-4">
              "We are committed to providing our students with the best possible learning environment, 
              combining traditional values with modern educational practices to prepare them for the challenges of tomorrow."
            </p>
            <p className="font-semibold text-primary">
              - Dr. Amardeep Gupta, Principal
            </p>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <img 
                src="https://www.davcollegeasr.org/images/about_p.jpg" 
                alt="Dr.Anardeep Gupta - Principal" 
                className="rounded-lg shadow-lg w-80 h-96 object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-lg">
                <p className="font-bold text-sm">Dr. Amardeep Gupta</p>
                <p className="text-xs text-gray-600">Principal, DAV College</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 my-16">
        <Link to="/our-history" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
          <h2 className="text-xl font-bold mb-3">Our History</h2>
          <p className="text-gray-600 mb-4">Learn about our foundation and journey through the decades of educational excellence.</p>
          <Button variant="outline" className="w-full">
            Read More <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        
        <Link to="/leadership" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
          <h2 className="text-xl font-bold mb-3">Leadership</h2>
          <p className="text-gray-600 mb-4">Meet our visionary leaders and administrative team guiding the institution.</p>
          <Button variant="outline" className="w-full">
            Read More <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        
        <Link to="/campus" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
          <h2 className="text-xl font-bold mb-3">Campus</h2>
          <p className="text-gray-600 mb-4">Explore our state-of-the-art campus facilities designed for holistic learning.</p>
          <Button variant="outline" className="w-full">
            Read More <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        
        <Link to="/achievements" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
          <h2 className="text-xl font-bold mb-3">Achievements</h2>
          <p className="text-gray-600 mb-4">Discover our milestones, awards, and recognitions over the years.</p>
          <Button variant="outline" className="w-full">
            Read More <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      <div className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Our Mission & Vision</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-3">Mission</h3>
            <p className="text-gray-700">
              To empower students with knowledge, skills, and values to excel in their chosen fields and contribute meaningfully to society,
              fostering a culture of innovation, research, and academic excellence.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">Vision</h3>
            <p className="text-gray-700">
              To be a premier educational institution, recognized globally for academic excellence,
              innovative teaching methodologies, and producing leaders who make significant contributions to society.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
