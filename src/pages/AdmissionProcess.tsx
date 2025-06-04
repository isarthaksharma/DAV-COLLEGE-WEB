
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, CheckCircle, Calendar, FileText, CreditCard, GraduationCap } from 'lucide-react';

const AdmissionProcess = () => {
  const steps = [
    {
      title: "Check Eligibility",
      description: "Review the eligibility criteria for your chosen program to ensure you meet the requirements.",
      icon: <CheckCircle className="h-8 w-8 text-primary" />
    },
    {
      title: "Fill Application Form",
      description: "Complete the online application form with accurate personal and academic information.",
      icon: <FileText className="h-8 w-8 text-primary" />
    },
    {
      title: "Pay Application Fee",
      description: "Submit the application fee online through our secure payment gateway.",
      icon: <CreditCard className="h-8 w-8 text-primary" />
    },
    {
      title: "Entrance Exam/Interview",
      description: "For certain programs, appear for the entrance exam or interview as required.",
      icon: <FileText className="h-8 w-8 text-primary" />
    },
    {
      title: "Merit List Publication",
      description: "Check if your name appears in the merit list published on our website.",
      icon: <Calendar className="h-8 w-8 text-primary" />
    },
    {
      title: "Document Verification",
      description: "Submit original documents for verification at the college admission office.",
      icon: <FileText className="h-8 w-8 text-primary" />
    },
    {
      title: "Pay Tuition Fee",
      description: "Pay the first semester/year tuition fee to confirm your admission.",
      icon: <CreditCard className="h-8 w-8 text-primary" />
    },
    {
      title: "Enrollment",
      description: "Receive your student ID and get enrolled in your chosen program.",
      icon: <GraduationCap className="h-8 w-8 text-primary" />
    }
  ];

  const documents = [
    "Completed application form",
    "10th standard mark sheet and certificate",
    "12th standard mark sheet and certificate",
    "Graduation mark sheets and degree certificate (for postgraduate programs)",
    "Transfer certificate from previous institution",
    "Character certificate",
    "Migration certificate (if applicable)",
    "Caste certificate (if applicable)",
    "Income certificate (if applicable for scholarships)",
    "Four recent passport-sized photographs",
    "Identity proof (Aadhaar card, PAN card, etc.)",
    "Address proof"
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Admission Process</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Follow our simple step-by-step admission process to join DAV College and begin your journey towards academic excellence.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Admission Steps</h2>
        <div className="relative">
          <div className="absolute left-8 inset-y-0 w-1 bg-gray-200"></div>
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="relative flex items-start">
                <div className="absolute left-0 mt-1 -ml-1 bg-white">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                    {step.icon}
                  </div>
                </div>
                <div className="ml-24">
                  <h3 className="text-xl font-bold">{`Step ${index + 1}: ${step.title}`}</h3>
                  <p className="text-gray-600 mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-4">Required Documents</h2>
            <ul className="space-y-2">
              {documents.map((document, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{document}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-4">Important Dates</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold">Undergraduate Programs</h3>
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between">
                    <span>Application Opens:</span>
                    <span className="font-medium">June 15, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Application Deadline:</span>
                    <span className="font-medium">July 15, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Merit List Publication:</span>
                    <span className="font-medium">July 25, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Classes Begin:</span>
                    <span className="font-medium">August 1, 2025</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold">Postgraduate Programs</h3>
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between">
                    <span>Application Opens:</span>
                    <span className="font-medium">May 1, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Application Deadline:</span>
                    <span className="font-medium">June 30, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Entrance Exam:</span>
                    <span className="font-medium">July 10, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Merit List Publication:</span>
                    <span className="font-medium">July 20, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Classes Begin:</span>
                    <span className="font-medium">August 1, 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col items-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Ready to Apply?</h2>
        <p className="text-gray-600 mb-6 text-center max-w-xl">
          Take the first step towards your future by submitting your application today. For any questions,
          please refer to our FAQs or contact the admission office.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link to="/application">Apply Now</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/admissions-faq">
              View FAQs <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdmissionProcess;
