
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays,  Users, GraduationCap } from 'lucide-react';
import ScholarshipApplicationForm from '@/components/scholarship/ScholarshipApplicationForm';

const Scholarships = () => {
  const scholarships = [
    {
      id: 1,
      title: "Merit Scholarship",
      description: "Scholarship for students with excellent academic records",
      eligibility: "Students with 90% or above in previous exams",
      amount: "₹50,000",
      deadline: "2025-06-30",
      category: "Academic"
    },
    {
      id: 2,
      title: "Sports Excellence Scholarship",
      description: "For students with outstanding achievements in sports",
      eligibility: "National or state level sports certificates",
      amount: "₹30,000",
      deadline: "2025-05-15",
      category: "Sports"
    },
    {
      id: 3,
      title: "Financial Need-Based Scholarship",
      description: "For students from economically disadvantaged backgrounds",
      eligibility: "Family income below ₹3 lakhs per annum",
      amount: "₹40,000",
      deadline: "2025-07-01",
      category: "Need-Based"
    },
    {
      id: 4,
      title: "Single Parent Scholarship",
      description: "Special scholarship for students from single-parent families",
      eligibility: "Students with single parent and family income below ₹5 lakhs",
      amount: "₹35,000",
      deadline: "2025-06-15",
      category: "Special"
    }
  ];

  return (
    <>
      <PageHeader 
        title="Scholarships" 
        description="Explore various scholarship opportunities available for students to support their education journey."
      />
      
      <div className="container py-8 px-4 md:px-6">
        {/* Scholarships Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Available Scholarships</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {scholarships.map((scholarship) => (
              <Card key={scholarship.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{scholarship.title}</CardTitle>
                      <Badge variant="secondary" className="mt-2">{scholarship.category}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-primary font-bold text-lg">
                       
                        {scholarship.amount}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {scholarship.description}
                  </CardDescription>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Users className="h-4 w-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Eligibility:</p>
                        <p className="text-sm text-gray-600">{scholarship.eligibility}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">Application Deadline:</p>
                        <p className="text-sm text-gray-600">{scholarship.deadline}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Scholarship Application Form */}
        <div className="mb-12">
          <ScholarshipApplicationForm />
        </div>

        {/* Additional Information */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <GraduationCap className="h-5 w-5 mr-2" />
            How to Apply
          </h3>
          <div className="space-y-2 text-sm">
            <p>• Fill out the scholarship application form above with accurate information</p>
            <p>• You must be at least 18 years old to be eligible for scholarships</p>
            <p>• Ensure you meet the specific eligibility criteria for the scholarship you're applying for</p>
            <p>• Submit all required documents along with your application</p>
            <p>• Applications are reviewed on a rolling basis, so apply early</p>
            <p>• Scholarship recipients will be notified via email and phone</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Scholarships;
