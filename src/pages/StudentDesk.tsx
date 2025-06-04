import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

// Type definitions for the Supabase tables
type EducationalTour = {
  id: number;
  title: string;
  description?: string;
  location: string;
  date: string;
  image?: string;
}

type AcademicTopper = {
  id: number;
  name: string;
  course: string;
  year: string;
  achievement: string;
  percentage?: number;
  image?: string;
}

type TournamentAchiever = {
  id: number;
  name: string;
  tournament: string;
  position: string;
  year: string;
  sport: string;
  image?: string;
}

type Internship = {
  id: number;
  company: string;
  role: string;
  duration: string;
  year: string;
  department: string;
  student_count?: number;
  image?: string;
}

type PlacementStat = {
  id: number;
  company: string;
  year: string;
  department: string;
  students_placed: number;
  average_package?: string;
  highest_package?: string;
  image?: string;
}

// Default data in case database has no entries
const defaultEducationalTours: EducationalTour[] = [
  {
    id: 1,
    title: "Historical Tour to Jaipur",
    description: "Students visited historical monuments in Jaipur including Amber Fort, Hawa Mahal, and City Palace to learn about Rajasthani architecture and culture.",
    location: "Jaipur, Rajasthan",
    date: "2025-02-15",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e"
  },
  {
    id: 2,
    title: "Science Exhibition at National Science Centre",
    description: "Students participated in interactive science exhibits and workshops at the National Science Centre to enhance their understanding of scientific principles.",
    location: "New Delhi",
    date: "2025-01-20",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05"
  },
  {
    id: 3,
    title: "Industrial Visit to Tech Park",
    description: "Final year students visited leading tech companies to understand industry practices and job opportunities in the software development sector.",
    location: "Bangalore, Karnataka",
    date: "2024-12-10",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21"
  }
];

const defaultToppers: AcademicTopper[] = [
  {
    id: 1,
    name: "Ananya Sharma",
    course: "BSc Computer Science",
    year: "2025",
    achievement: "University Gold Medalist",
    percentage: 98.2,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0l2sv8EwimXHsv02NAxVhT9fhVASvRkxCQw&s"
  },
  {
    id: 2,
    name: "Rohit Mehra",
    course: "BCom Honours",
    year: "2025",
    achievement: "College Topper",
    percentage: 96.5,
    image: "https://www.shutterstock.com/image-photo/portrait-adult-indian-university-student-260nw-295932806.jpg"
  },
  {
    id: 3,
    name: "Priya Gupta",
    course: "BSc Physics",
    year: "2025",
    achievement: "Department Topper",
    percentage: 95.8,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROG-zpRihvsQJ_ah3iTPv9bqPk47kAMf1A7g&s"
  }
];

const defaultAchievers: TournamentAchiever[] = [
  {
    id: 1,
    name: "Vikram Singh",
    tournament: "Inter-University Cricket Championship",
    position: "Winner",
    year: "2025",
    sport: "Cricket",
    image: "https://static.vecteezy.com/system/resources/previews/005/427/608/non_2x/young-indian-student-holding-diary-file-in-hand-free-photo.JPG"
  },
  {
    id: 2,
    name: "Neha Kapoor",
    tournament: "National Chess Tournament",
    position: "Runner-up",
    year: "2025",
    sport: "Chess",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuKIssYAFkTaNV1D3azxSatua6VET-o4IN5Q&s"
  },
  {
    id: 3,
    name: "Rajesh Kumar",
    tournament: "State Swimming Championship",
    position: "Gold Medal",
    year: "2024",
    sport: "Swimming",
    image: "https://img.freepik.com/free-photo/smiling-happy-indian-student-with-backpack-pointing-his-finger-wall_496169-1532.jpg?semt=ais_hybrid&w=740"
  }
];

const defaultInternships: Internship[] = [
  {
    id: 1,
    company: "Microsoft",
    role: "Software Development Intern",
    duration: "3 months",
    year: "2025",
    department: "Computer Science",
    student_count: 5,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC7-RFA1xE4wTSP0DZJSJ1AJ8TitBYtkmEYA&s"
  },
  {
    id: 2,
    company: "HDFC Bank",
    role: "Finance Intern",
    duration: "2 months",
    year: "2025",
    department: "Commerce",
    student_count: 3,
    image: "https://images.unsplash.com/photo-1441057206919-63d19fac2369"
  },
  {
    id: 3,
    company: "Deloitte",
    role: "Accounting Intern",
    duration: "6 months",
    year: "2024",
    department: "Commerce",
    student_count: 7,
    image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f"
  }
];

const defaultPlacements: PlacementStat[] = [
  {
    id: 1,
    company: "TCS",
    year: "2025",
    department: "Computer Science",
    students_placed: 25,
    average_package: "₹8.5 LPA",
    highest_package: "₹12 LPA",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC7-RFA1xE4wTSP0DZJSJ1AJ8TitBYtkmEYA&s"
  },
  {
    id: 2,
    company: "Infosys",
    year: "2025",
    department: "Information Technology",
    students_placed: 18,
    average_package: "₹7.8 LPA",
    highest_package: "₹10.5 LPA",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLuenhuyfEyo4EI0HUoAjPpmT1rAsSUeYtbA&s"
  },
  {
    id: 3,
    company: "KPMG",
    year: "2025",
    department: "Commerce",
    students_placed: 15,
    average_package: "₹7 LPA",
    highest_package: "₹9 LPA",
    image: "https://static.vecteezy.com/system/resources/thumbnails/034/614/843/small/architecture-and-construction-rendering-reflective-business-office-building-generative-ai-photo.jpeg"
  }
];

// Component for displaying educational tours
const EducationalTours = () => {
  const [tours, setTours] = useState<EducationalTour[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const { data, error } = await supabase
          .from('educational_tours')
          .select('*')
          .order('date', { ascending: false })
          .limit(4);

        if (error) throw error;
        
        if (data && data.length > 0) {
          setTours(data);
        } else {
          console.log('No educational tours found, using default data');
          setTours(defaultEducationalTours);
        }
      } catch (error) {
        console.error('Error fetching tours:', error);
        toast({
          title: "Error",
          description: "Failed to load educational tours",
          variant: "destructive",
        });
        // Use default data if fetch fails
        setTours(defaultEducationalTours);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (tours.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No educational tours found.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {tours.map((tour) => (
        <Card key={tour.id} className="overflow-hidden">
          {tour.image && (
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={tour.image} 
                alt={tour.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e';
                }}
              />
            </div>
          )}
          <CardHeader>
            <CardTitle>{tour.title}</CardTitle>
            <div className="flex gap-2 text-sm text-gray-500">
              <span>{new Date(tour.date).toLocaleDateString()}</span>
              <span>•</span>
              <span>{tour.location}</span>
            </div>
          </CardHeader>
          {tour.description ? (
            <CardContent>
              <p>{tour.description}</p>
            </CardContent>
          ) : (
            <CardContent>
              <p>Students participated in this educational tour to enhance their learning experience and gain practical knowledge in the field.</p>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};

// Component for displaying academic toppers
const AcademicToppers = () => {
  const [toppers, setToppers] = useState<AcademicTopper[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchToppers = async () => {
      try {
        const { data, error } = await supabase
          .from('academic_toppers')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(6);

        if (error) throw error;
        
        if (data && data.length > 0) {
          setToppers(data);
        } else {
          console.log('No academic toppers found, using default data');
          setToppers(defaultToppers);
        }
      } catch (error) {
        console.error('Error fetching toppers:', error);
        toast({
          title: "Error",
          description: "Failed to load academic toppers",
          variant: "destructive",
        });
        // Use default data if fetch fails
        setToppers(defaultToppers);
      } finally {
        setLoading(false);
      }
    };

    fetchToppers();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (toppers.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No academic toppers found.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {toppers.map((topper) => (
        <Card key={topper.id}>
          <div className="p-4">
            {topper.image ? (
              <div className="aspect-square w-full overflow-hidden rounded-md mb-4">
                <img 
                  src={topper.image} 
                  alt={topper.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1582562124811-c09040d0a901';
                  }}
                />
              </div>
            ) : (
              <div className="aspect-square w-full bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-300">
                  {topper.name.charAt(0)}
                </span>
              </div>
            )}
            <h3 className="font-bold text-lg">{topper.name}</h3>
            <p className="text-sm text-gray-500">{topper.course} - {topper.year}</p>
            <p className="font-medium mt-2">{topper.achievement}</p>
            {topper.percentage && (
              <p className="text-sm font-semibold mt-1">{topper.percentage}%</p>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

// Component for displaying tournament achievers
const TournamentAchievers = () => {
  const [achievers, setAchievers] = useState<TournamentAchiever[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAchievers = async () => {
      try {
        const { data, error } = await supabase
          .from('tournament_achievers')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(6);

        if (error) throw error;
        
        if (data && data.length > 0) {
          setAchievers(data);
        } else {
          console.log('No tournament achievers found, using default data');
          setAchievers(defaultAchievers);
        }
      } catch (error) {
        console.error('Error fetching tournament achievers:', error);
        toast({
          title: "Error",
          description: "Failed to load tournament achievers",
          variant: "destructive",
        });
        // Use default data if fetch fails
        setAchievers(defaultAchievers);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievers();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (achievers.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No tournament achievers found.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {achievers.map((achiever) => (
        <Card key={achiever.id}>
          <div className="p-4">
            {achiever.image ? (
              <div className="aspect-square w-full overflow-hidden rounded-md mb-4">
                <img 
                  src={achiever.image} 
                  alt={achiever.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1452960962994-acf4fd70b632';
                  }}
                />
              </div>
            ) : (
              <div className="aspect-square w-full bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-300">
                  {achiever.name.charAt(0)}
                </span>
              </div>
            )}
            <h3 className="font-bold text-lg">{achiever.name}</h3>
            <div className="mt-2">
              <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                {achiever.position}
              </span>
            </div>
            <p className="text-sm mt-2">{achiever.tournament} - {achiever.year}</p>
            <p className="text-sm text-gray-500">{achiever.sport}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

// Component for displaying internships
const Internships = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const { data, error } = await supabase
          .from('internships')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(6);

        if (error) throw error;
        
        if (data && data.length > 0) {
          setInternships(data);
        } else {
          console.log('No internships found, using default data');
          setInternships(defaultInternships);
        }
      } catch (error) {
        console.error('Error fetching internships:', error);
        toast({
          title: "Error",
          description: "Failed to load internships",
          variant: "destructive",
        });
        // Use default data if fetch fails
        setInternships(defaultInternships);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (internships.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No internships found.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {internships.map((internship) => (
        <Card key={internship.id}>
          <CardHeader>
            <div className="h-12 flex items-center">
              {internship.image ? (
                <img 
                  src={internship.image} 
                  alt={internship.company} 
                  className="h-8 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac';
                  }}
                />
              ) : (
                <span className="font-bold text-xl">{internship.company}</span>
              )}
            </div>
            <CardTitle className="text-xl">{internship.role}</CardTitle>
            <CardDescription>
              {internship.department} | {internship.duration} | {internship.year}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Students gained valuable industry experience working on real-world projects and enhancing their professional skills.</p>
            {internship.student_count && internship.student_count > 1 ? (
              <p>{internship.student_count} students participated</p>
            ) : (
              <p>1 student participated</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Component for displaying placement stats
const PlacementStats = () => {
  const [placements, setPlacements] = useState<PlacementStat[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPlacements = async () => {
      try {
        const { data, error } = await supabase
          .from('placement_stats')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4);

        if (error) throw error;
        
        if (data && data.length > 0) {
          setPlacements(data);
        } else {
          console.log('No placement stats found, using default data');
          setPlacements(defaultPlacements);
        }
      } catch (error) {
        console.error('Error fetching placement stats:', error);
        toast({
          title: "Error",
          description: "Failed to load placement statistics",
          variant: "destructive",
        });
        // Use default data if fetch fails
        setPlacements(defaultPlacements);
      } finally {
        setLoading(false);
      }
    };

    fetchPlacements();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (placements.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No placement statistics found.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {placements.map((placement) => (
        <Card key={placement.id}>
          <CardHeader>
            <div className="h-12 flex items-center">
              {placement.image ? (
                <img 
                  src={placement.image} 
                  alt={placement.company} 
                  className="h-8 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1438565434616-3ef039228b15';
                  }}
                />
              ) : (
                <span className="font-bold text-xl">{placement.company}</span>
              )}
            </div>
            <CardTitle>{placement.year} - {placement.department}</CardTitle>
            <CardDescription>Our students secured excellent positions through campus placements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Students Placed:</span>
              <span className="font-semibold">{placement.students_placed}</span>
            </div>
            {placement.average_package && (
              <div className="flex justify-between">
                <span>Average Package:</span>
                <span className="font-semibold">{placement.average_package}</span>
              </div>
            )}
            {placement.highest_package && (
              <div className="flex justify-between">
                <span>Highest Package:</span>
                <span className="font-semibold">{placement.highest_package}</span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Main Student Desk Component
const StudentDesk = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Student Desk</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Discover the achievements and experiences of our students through educational tours, 
          academic excellence, sports achievements, internships, and placement opportunities.
        </p>
      </div>

      <Tabs defaultValue="tours" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList>
            <TabsTrigger value="tours">Educational Tours</TabsTrigger>
            <TabsTrigger value="toppers">Academic Toppers</TabsTrigger>
            <TabsTrigger value="achievers">Tournament Achievers</TabsTrigger>
            <TabsTrigger value="internships">Internships</TabsTrigger>
            <TabsTrigger value="placements">Placements</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="tours" className="mt-6">
          <h2 className="text-2xl font-bold mb-6">Educational Tours</h2>
          <EducationalTours />
        </TabsContent>
        
        <TabsContent value="toppers" className="mt-6">
          <h2 className="text-2xl font-bold mb-6">Academic Toppers</h2>
          <AcademicToppers />
        </TabsContent>
        
        <TabsContent value="achievers" className="mt-6">
          <h2 className="text-2xl font-bold mb-6">Tournament Achievers</h2>
          <TournamentAchievers />
        </TabsContent>
        
        <TabsContent value="internships" className="mt-6">
          <h2 className="text-2xl font-bold mb-6">Internships</h2>
          <Internships />
        </TabsContent>
        
        <TabsContent value="placements" className="mt-6">
          <h2 className="text-2xl font-bold mb-6">Placement Statistics</h2>
          <PlacementStats />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDesk;
