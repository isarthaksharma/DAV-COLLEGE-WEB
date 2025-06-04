
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";

interface ProgramCardProps {
  title: string;
  description: string;
}

const ProgramCard = ({ title, description }: ProgramCardProps) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription>{description}</CardDescription>
    </CardContent>
    <CardFooter>
      <Button variant="outline" size="sm" asChild>
        <Link to="/programs">Learn More</Link>
      </Button>
    </CardFooter>
  </Card>
);

const ProgramsSection = () => {
  const undergraduatePrograms = [
    {
      title: "Bachelor of Science",
      description: "Computer Science, Physics, Chemistry, Mathematics, Biology",
    },
    {
      title: "Bachelor of Arts",
      description: "English, History, Economics, Psychology, Sociology",
    },
    {
      title: "Bachelor of Commerce",
      description: "Accounting, Finance, Business Management",
    },
  ];

  const postgraduatePrograms = [
    {
      title: "Master of Science",
      description: "Advanced Computer Science, Mathematics, Physics",
    },
    {
      title: "Master of Arts",
      description: "English Literature, Economics, Political Science",
    },
    {
      title: "Master of Business",
      description: "MBA with various specializations",
    },
  ];

  const professionalPrograms = [
    {
      title: "Law",
      description: "Bachelor of Laws (LLB), Criminal Law, Corporate Law",
    },
    {
      title: "Engineering",
      description: "Computer Engineering, Civil Engineering, Mechanical Engineering",
    },
    {
      title: "Medicine",
      description: "MBBS, Pharmacy, Medical Laboratory Science",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Academic Programs</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Discover a wide range of undergraduate and graduate programs designed to prepare you for success in your chosen field.
          </p>
        </div>

        <Tabs defaultValue="undergraduate" className="mx-auto max-w-3xl">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="undergraduate">Undergraduate</TabsTrigger>
              <TabsTrigger value="postgraduate">Postgraduate</TabsTrigger>
              <TabsTrigger value="professional">Professional</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="undergraduate">
            <div className="grid md:grid-cols-3 gap-6">
              {undergraduatePrograms.map((program, index) => (
                <ProgramCard key={index} title={program.title} description={program.description} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="postgraduate">
            <div className="grid md:grid-cols-3 gap-6">
              {postgraduatePrograms.map((program, index) => (
                <ProgramCard key={index} title={program.title} description={program.description} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="professional">
            <div className="grid md:grid-cols-3 gap-6">
              {professionalPrograms.map((program, index) => (
                <ProgramCard key={index} title={program.title} description={program.description} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link to="/programs">
              View All Programs <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
