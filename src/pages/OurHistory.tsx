
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';

const OurHistory = () => {
  return (
    <>
      <PageHeader 
        title="Our History" 
        description="Learn about our foundation and journey through the decades of educational excellence."
      />
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-6">Foundation and Early Years</h2>
            <p className="text-gray-700 mb-4">
              DAV College was established in 1948 with a vision to provide quality education and foster holistic development. 
              Founded by visionary educators who believed in the transformative power of education, the institution started 
              with humble beginnings in a small building with just 50 students.
            </p>
            <p className="text-gray-700 mb-6">
              The early years were marked by dedication, perseverance, and an unwavering commitment to academic excellence. 
              Our founders laid the foundation for what would become one of the most respected educational institutions in the region.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">1950s - 1960s: Growth and Expansion</h3>
              <p className="text-gray-700">
                During this period, DAV College expanded its academic programs and infrastructure. 
                New departments were established, and the student enrollment grew significantly.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">1970s - 1980s: Modernization</h3>
              <p className="text-gray-700">
                The college embraced modern teaching methodologies and invested in state-of-the-art 
                facilities including laboratories, library, and sports infrastructure.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">1990s - 2000s: Digital Age</h3>
              <p className="text-gray-700">
                With the advent of technology, DAV College integrated computer education and 
                digital learning platforms, staying ahead of the educational curve.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">2010s - Present: Excellence</h3>
              <p className="text-gray-700">
                Today, DAV College stands as a beacon of educational excellence with over 5000 students 
                and recognition for innovative teaching and research.
              </p>
            </div>
          </div>

          <div className="bg-primary/10 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Our Legacy</h2>
            <p className="text-gray-700 mb-4">
              Over 75 years of educational excellence, DAV College has produced thousands of graduates 
              who have made significant contributions to society in various fields including medicine, 
              engineering, business, arts, and public service.
            </p>
            <p className="text-gray-700">
              Our commitment to quality education, values-based learning, and holistic development 
              continues to guide us as we prepare for the next chapter of our journey.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurHistory;
