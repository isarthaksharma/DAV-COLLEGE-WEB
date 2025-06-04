import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, BookOpen, FlaskConical, Users, Medal } from 'lucide-react';

interface ResearchProjectProps {
  title: string;
  department: string;
  investigators: string;
  duration: string;
  funding: string;
  description: string;
}

const ResearchProjectCard = ({ title, department, investigators, duration, funding, description }: ResearchProjectProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{department}</CardDescription>
          </div>
          <Badge>{funding}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <div className="flex gap-2">
            <span className="font-medium">Principal Investigators:</span>
            <span className="text-gray-600">{investigators}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium">Duration:</span>
            <span className="text-gray-600">{duration}</span>
          </div>
        </div>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

interface PublicationProps {
  title: string;
  authors: string;
  journal: string;
  year: string;
  citation: string;
}

const PublicationCard = ({ title, authors, journal, year, citation }: PublicationProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex gap-2">
            <span className="font-medium">Authors:</span>
            <span className="text-gray-600">{authors}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium">Journal:</span>
            <span className="text-gray-600">{journal} ({year})</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium">Citations:</span>
            <span className="text-gray-600">{citation}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Research = () => {
  const ongoingProjects = [
    {
      title: "Climate Change Impact on Local Ecosystems",
      department: "Environmental Science",
      investigators: "Dr. Meena Patel, Dr. Ajay Singh",
      duration: "2023-2026",
      funding: "CSIR",
      description: "Studying the effects of climate change on local ecosystems and biodiversity, with a focus on adaptive measures for conservation."
    },
    {
      title: "AI Applications in Healthcare Diagnostics",
      department: "Computer Science",
      investigators: "Dr. Rajat Kumar, Dr. Priya Sharma",
      duration: "2022-2025",
      funding: "DST",
      description: "Developing artificial intelligence models for early disease detection and diagnosis, focusing on accessible healthcare solutions."
    },
    {
      title: "Sustainable Urban Development Models",
      department: "Geography",
      investigators: "Dr. Vikram Mehta, Dr. Sonia Verma",
      duration: "2023-2025",
      funding: "UGC",
      description: "Researching sustainable urban planning frameworks for developing cities, with a focus on environmental and social sustainability."
    }
  ];

  const completedProjects = [
    {
      title: "Molecular Markers for Disease Resistance in Crops",
      department: "Biotechnology",
      investigators: "Dr. Anand Sharma, Dr. Ritu Agarwal",
      duration: "2019-2022",
      funding: "ICAR",
      description: "Identified genetic markers associated with disease resistance in major crop plants, contributing to the development of resilient crop varieties."
    },
    {
      title: "Indigenous Knowledge Systems and Cultural Heritage",
      department: "Sociology",
      investigators: "Dr. Priya Singh, Dr. Nikhil Joshi",
      duration: "2020-2023",
      funding: "ICSSR",
      description: "Documented and analyzed indigenous knowledge systems and their role in preserving cultural heritage and sustainable practices."
    },
    {
      title: "Quantum Computing Algorithms for Cryptography",
      department: "Computer Science",
      investigators: "Dr. Rajat Kumar, Dr. Ajay Gupta",
      duration: "2018-2021",
      funding: "DST",
      description: "Developed quantum computing algorithms for enhanced cryptographic security, with potential applications in banking and data protection."
    }
  ];

  const publications = [
    {
      title: "Novel Approaches to Sustainable Energy Production in Rural Areas",
      authors: "Sharma, A., Patel, M., & Kumar, R.",
      journal: "Journal of Renewable Energy",
      year: "2023",
      citation: "45"
    },
    {
      title: "The Impact of Digital Learning on Student Performance: A Longitudinal Study",
      authors: "Singh, P., Verma, S., & Mehta, V.",
      journal: "Educational Technology Research",
      year: "2022",
      citation: "32"
    },
    {
      title: "Genetic Diversity and Conservation Strategies for Endemic Plant Species",
      authors: "Patel, M., Sharma, A., & Agarwal, R.",
      journal: "Biodiversity Conservation",
      year: "2023",
      citation: "28"
    },
    {
      title: "Market Dynamics and Consumer Behavior: Post-Pandemic Trends",
      authors: "Gupta, A., Agarwal, R., & Joshi, N.",
      journal: "Journal of Business Research",
      year: "2022",
      citation: "56"
    }
  ];

  const centers = [
    {
      title: "Center for Environmental Studies",
      description: "Focuses on environmental research, sustainability, and ecological conservation through interdisciplinary approaches.",
      icon: <FlaskConical size={24} />
    },
    {
      title: "Center for Advanced Computing",
      description: "Dedicated to research in computing technologies, artificial intelligence, data science, and cybersecurity.",
      icon: <FileText size={24} />
    },
    {
      title: "Humanities Research Center",
      description: "Explores literature, cultural studies, philosophy, and social aspects through collaborative research initiatives.",
      icon: <BookOpen size={24} />
    },
    {
      title: "Center for Business Innovation",
      description: "Focuses on entrepreneurship, business models, economic policies, and market research for sustainable development.",
      icon: <Users size={24} />
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Research at DAV College</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Explore our cutting-edge research initiatives, publications, and specialized research centers
          that contribute to academic knowledge and address real-world challenges.
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-primary/10 p-3 rounded-full text-primary">
            <Medal size={24} />
          </div>
          <h2 className="text-2xl font-bold">Research Highlights</h2>
        </div>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Over 200 research papers published in international journals in the last 5 years</li>
          <li>₹15 crore in research grants from various funding agencies</li>
          <li>10 patents filed and 5 granted in the last 3 years</li>
          <li>Collaborative research projects with institutions across 12 countries</li>
          <li>4 specialized research centers focusing on emerging areas</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold mb-6">Research Projects</h2>
      <Tabs defaultValue="ongoing" className="mb-12">
        <TabsList className="mb-6">
          <TabsTrigger value="ongoing">Ongoing Projects</TabsTrigger>
          <TabsTrigger value="completed">Completed Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="ongoing">
          <div className="grid md:grid-cols-2 gap-6">
            {ongoingProjects.map((project, index) => (
              <ResearchProjectCard 
                key={index}
                title={project.title}
                department={project.department}
                investigators={project.investigators}
                duration={project.duration}
                funding={project.funding}
                description={project.description}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="completed">
          <div className="grid md:grid-cols-2 gap-6">
            {completedProjects.map((project, index) => (
              <ResearchProjectCard 
                key={index}
                title={project.title}
                department={project.department}
                investigators={project.investigators}
                duration={project.duration}
                funding={project.funding}
                description={project.description}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <h2 className="text-2xl font-bold mb-6">Recent Publications</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {publications.map((publication, index) => (
          <PublicationCard 
            key={index}
            title={publication.title}
            authors={publication.authors}
            journal={publication.journal}
            year={publication.year}
            citation={publication.citation}
          />
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-6">Research Centers</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {centers.map((center, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  {center.icon}
                </div>
                <CardTitle>{center.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{center.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Research;
