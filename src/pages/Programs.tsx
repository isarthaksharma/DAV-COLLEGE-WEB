
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, GraduationCap, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProgramProps {
  title: string;
  code: string;
  duration: string;
  description: string;
  eligibility: string;
}

const ProgramCard = ({ title, code, duration, description, eligibility }: ProgramProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Program Code: {code} | Duration: {duration}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="font-medium">Eligibility:</p>
          <p className="text-gray-600">{eligibility}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" asChild>
          <Link to="/application">Apply Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const Programs = () => {
  const undergraduatePrograms = [
    {
      title: "Bachelor of Computer Applications",
      code: "BCA",
      duration: "3 Years",
      description: "A comprehensive program focusing on computer applications, programming, database management, and software development.",
      eligibility: "10+2 with minimum 50% marks"
    },
    {
      title: "Bachelor of Commerce",
      code: "BCOM",
      duration: "3 Years",
      description: "Focuses on business studies, accounting, finance, and commercial practices.",
      eligibility: "10+2 in any stream with minimum 50% marks"
    },
    {
      title: "Bachelor of Business Administration",
      code: "BBA",
      duration: "3 Years",
      description: "Covers business administration, management principles, marketing, and organizational behavior.",
      eligibility: "10+2 in any stream with minimum 50% marks"
    },
    {
      title: "Bachelor of Science in Information Technology",
      code: "BSC IT",
      duration: "3 Years",
      description: "Study of information systems, networking, web technologies, and IT infrastructure.",
      eligibility: "10+2 with Mathematics/Computer Science with minimum 50% marks"
    },
    {
      title: "Bachelor of Science in Computer Science",
      code: "BSC CS",
      duration: "3 Years",
      description: "In-depth study of algorithms, programming languages, software engineering, and computer systems.",
      eligibility: "10+2 with Mathematics/Computer Science with minimum 50% marks"
    },
    {
      title: "Bachelor of Science in Non-Medical",
      code: "BSC NM",
      duration: "3 Years",
      description: "Study of Physics, Chemistry, and Mathematics with practical applications.",
      eligibility: "10+2 with Physics, Chemistry, and Mathematics with minimum 50% marks"
    },
    {
      title: "Bachelor of Journalism and Mass Communication",
      code: "BJMC",
      duration: "3 Years",
      description: "Study of media, journalism, communication theories, and content production.",
      eligibility: "10+2 in any stream with minimum 50% marks"
    },
    {
      title: "Bachelor of Science in Physics",
      code: "BSC Physics",
      duration: "3 Years",
      description: "Study of matter, energy, and their interactions through theoretical and practical approaches.",
      eligibility: "10+2 with Physics and Mathematics with minimum 60% marks"
    },
    {
      title: "Bachelor of Arts in English",
      code: "BA English",
      duration: "3 Years",
      description: "Study of English literature, language, critical theories, and writing skills.",
      eligibility: "10+2 in any stream with minimum 45% marks"
    },
    {
      title: "Bachelor of Arts in Mathematics",
      code: "BA Maths",
      duration: "3 Years",
      description: "Study of mathematical theories, calculus, algebra, and statistical methods.",
      eligibility: "10+2 with Mathematics with minimum 45% marks"
    },
    {
      title: "Bachelor of Arts in Computer Science",
      code: "BA CS",
      duration: "3 Years",
      description: "Blend of humanities education with fundamental computer science knowledge.",
      eligibility: "10+2 in any stream with minimum 45% marks"
    },
    {
      title: "Bachelor of Arts in History",
      code: "BA History",
      duration: "3 Years",
      description: "Study of historical events, civilizations, and socio-political developments.",
      eligibility: "10+2 in any stream with minimum 45% marks"
    },
    {
      title: "Bachelor of Arts in Punjabi",
      code: "BA Punjabi",
      duration: "3 Years",
      description: "Study of Punjabi language, literature, culture, and literary criticism.",
      eligibility: "10+2 in any stream with minimum 45% marks"
    },
    {
      title: "Bachelor of Arts in Hindi",
      code: "BA Hindi",
      duration: "3 Years",
      description: "Study of Hindi language, literature, grammar, and cultural aspects.",
      eligibility: "10+2 in any stream with minimum 45% marks"
    }
  ];

  const postgraduatePrograms = [
    {
      title: "Master of Commerce",
      code: "MCOM",
      duration: "2 Years",
      description: "Advanced studies in commerce, focusing on financial management, accounting, and business strategies.",
      eligibility: "Bachelor's degree in Commerce or related field with minimum 55% marks"
    },
    {
      title: "Master of Science in Computer Science",
      code: "MSC CS",
      duration: "2 Years",
      description: "Advanced studies in algorithms, AI, software development, and computer systems.",
      eligibility: "Bachelor's degree in Computer Science or related field with minimum 60% marks"
    },
    {
      title: "Master of Arts in English",
      code: "MA English",
      duration: "2 Years",
      description: "In-depth study of English literature across various periods, genres, and critical frameworks.",
      eligibility: "Bachelor's degree with English as a subject with minimum 55% marks"
    },
    {
      title: "Master of Arts in History",
      code: "MA History",
      duration: "2 Years",
      description: "Advanced study of historical research methodologies, historiography, and specialized historical periods.",
      eligibility: "Bachelor's degree with History as a subject with minimum 55% marks"
    },
    {
      title: "Master of Arts in Punjabi",
      code: "MA Punjabi",
      duration: "2 Years",
      description: "Advanced study of Punjabi literature, linguistics, and cultural traditions.",
      eligibility: "Bachelor's degree with Punjabi as a subject with minimum 55% marks"
    },
    {
      title: "Master of Arts in Hindi",
      code: "MA Hindi",
      duration: "2 Years",
      description: "Advanced study of Hindi literature, linguistics, and literary criticism.",
      eligibility: "Bachelor's degree with Hindi as a subject with minimum 55% marks"
    }
  ];

  const professionalPrograms = [
    {
      title: "Bachelor of Education",
      code: "B.ED",
      duration: "2 Years",
      description: "Professional teacher training program preparing candidates for teaching in schools.",
      eligibility: "Bachelor's degree in any discipline with minimum 50% marks"
    },
    {
      title: "Bachelor of Laws",
      code: "LLB",
      duration: "3 Years",
      description: "Professional law degree covering various aspects of legal studies and practices.",
      eligibility: "Bachelor's degree in any discipline with minimum 50% marks"
    },
    {
      title: "Master of Business Administration",
      code: "MBA",
      duration: "2 Years",
      description: "Advanced management education focusing on business administration, leadership, and strategic management.",
      eligibility: "Bachelor's degree in any discipline with minimum 50% marks"
    },
    {
      title: "Bachelor of Pharmacy",
      code: "B.PHARM",
      duration: "4 Years",
      description: "Professional program in pharmaceutical sciences covering drug development, dispensing, and healthcare.",
      eligibility: "10+2 with Physics, Chemistry, and Biology/Mathematics with minimum 60% marks"
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Academic Programs</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Discover our diverse range of undergraduate, postgraduate, and professional programs designed
          to prepare students for success in their chosen fields.
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link to="/application">Apply for Admission</Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="undergraduate" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-3 w-full max-w-xl">
            <TabsTrigger value="undergraduate" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Undergraduate</span>
            </TabsTrigger>
            <TabsTrigger value="postgraduate" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span>Postgraduate</span>
            </TabsTrigger>
            <TabsTrigger value="professional" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span>Professional</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="undergraduate">
          <div className="grid md:grid-cols-2 gap-6">
            {undergraduatePrograms.map((program, index) => (
              <ProgramCard 
                key={index}
                title={program.title}
                code={program.code}
                duration={program.duration}
                description={program.description}
                eligibility={program.eligibility}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="postgraduate">
          <div className="grid md:grid-cols-2 gap-6">
            {postgraduatePrograms.map((program, index) => (
              <ProgramCard 
                key={index}
                title={program.title}
                code={program.code}
                duration={program.duration}
                description={program.description}
                eligibility={program.eligibility}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="professional">
          <div className="grid md:grid-cols-2 gap-6">
            {professionalPrograms.map((program, index) => (
              <ProgramCard 
                key={index}
                title={program.title}
                code={program.code}
                duration={program.duration}
                description={program.description}
                eligibility={program.eligibility}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Programs;
