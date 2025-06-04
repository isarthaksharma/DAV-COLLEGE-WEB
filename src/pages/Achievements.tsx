
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Award, Medal, FileText, Users, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface AchievementProps {
  title: string;
  year: string;
  description: string;
  category: string;
  icon: React.ReactNode;
}

const AchievementCard = ({ title, year, description, category, icon }: AchievementProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="bg-primary/10 p-3 rounded-full text-primary">
          {icon}
        </div>
        <div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{year}</Badge>
            <Badge>{category}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

const Achievements = () => {
  const achievements = [
    {
      title: "NAAC 'A++' Grade",
      year: "2023",
      description: "Highest accreditation grade by National Assessment and Accreditation Council for academic excellence.",
      category: "Accreditation",
      icon: <Trophy size={24} />
    },
    {
      title: "Best College Award",
      year: "2022",
      description: "Recognized as the Best College by the State Higher Education Department for overall performance.",
      category: "Recognition",
      icon: <Award size={24} />
    },
    {
      title: "Research Excellence Award",
      year: "2021",
      description: "Received for significant contributions to research in various disciplines and publications in prestigious journals.",
      category: "Research",
      icon: <FileText size={24} />
    },
    {
      title: "Sports Championship",
      year: "2023",
      description: "Won the Inter-University Sports Championship for the third consecutive year.",
      category: "Sports",
      icon: <Medal size={24} />
    },
    {
      title: "Cultural Festival Award",
      year: "2022",
      description: "Won the Best Cultural Festival Award at the State Level Youth Festival.",
      category: "Cultural",
      icon: <Users size={24} />
    },
    {
      title: "Green Campus Certification",
      year: "2021",
      description: "Awarded for sustainable initiatives and maintaining an eco-friendly campus environment.",
      category: "Environment",
      icon: <Award size={24} />
    },
    {
      title: "Innovation Hub Recognition",
      year: "2023",
      description: "Recognized as a Center of Innovation by the Ministry of Education for promoting entrepreneurship.",
      category: "Innovation",
      icon: <Trophy size={24} />
    },
    {
      title: "Alumni Achievement",
      year: "2022",
      description: "Notable alumni have received national and international recognition in various fields.",
      category: "Alumni",
      icon: <Users size={24} />
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Our Achievements</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          DAV College has established a remarkable record of achievements spanning academics,
          sports, cultural activities, and research initiatives over its 75 years of existence.
        </p>
      </div>

      <div className="text-center mb-12">
        <Link to="/student-desk">
          <Button size="lg" className="gap-2">
            <GraduationCap className="h-5 w-5" />
            <span>Explore Student Desk</span>
          </Button>
        </Link>
        <p className="text-sm text-gray-500 mt-2">
          Discover our students' achievements in academics, sports, internships, and more
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {achievements.map((achievement, index) => (
          <AchievementCard 
            key={index}
            title={achievement.title}
            year={achievement.year}
            description={achievement.description}
            category={achievement.category}
            icon={achievement.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Achievements;
