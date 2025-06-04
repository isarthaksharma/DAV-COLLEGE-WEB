
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, FileText } from 'lucide-react';

const Results = () => {
  const officialResultsURL = "http://collegeadmissions.gndu.ac.in/studentArea/GNDUEXAMRESULT.aspx";
  
  const resultSections = [
    {
      title: "Undergraduate Results",
      description: "BA, BCom, BSc, BCA, and other undergraduate programs",
    },
    {
      title: "Postgraduate Results",
      description: "MA, MCom, MSc, MCA, and other postgraduate programs",
    },
    {
      title: "Diploma Results",
      description: "Various diploma courses offered by the college",
    },
    {
      title: "Semester Results",
      description: "Current semester examination results",
    },
  ];

  const recentResults = [
    {
      title: "BCom 6th Semester Results",
      date: "May 15, 2025",
      link: officialResultsURL,
    },
    {
      title: "BSc (Computer Science) 4th Semester Results",
      date: "May 10, 2025",
      link: officialResultsURL,
    },
    {
      title: "BA 2nd Semester Results",
      date: "May 5, 2025",
      link: officialResultsURL,
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Examination Results</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Access your examination results through our official portal. Results are published after thorough verification by the examination department.
        </p>
      </div>

      <div className="mb-12">
        <div className="bg-primary text-white p-6 rounded-lg shadow-lg text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Official Results Portal</h2>
          <p className="mb-6">
            All official examination results are available on the GNDU Examination Portal. Click the button below to access your results using your registration number and date of birth.
          </p>
          <Button variant="secondary" className="gap-2" asChild>
            <a href={officialResultsURL} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-5 w-5" />
              Visit Official Results Portal
            </a>
          </Button>
        </div>

       
        
        
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">How to Access Your Results</h2>
        <ol className="list-decimal ml-6 space-y-2">
          <li>Visit the official GNDU Examination Portal using the link provided above.</li>
          <li>Select your program and semester from the dropdown menu.</li>
          <li>Enter your registration number/roll number as mentioned in your admit card.</li>
          <li>Enter your date of birth for verification.</li>
          <li>Click on the "Submit" button to view your results.</li>
          <li>You can download and print your result for future reference.</li>
        </ol>
      </div>
    </div>
  );
};

export default Results;
