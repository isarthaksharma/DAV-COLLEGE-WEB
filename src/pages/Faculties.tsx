
import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

type Faculty = {
  id?: number;
  user_id?: number;
  designation: string;
  qualification: string;
  experience: string;
  specialization?: string;
  phone?: string;
  bio?: string;
  name: string;
  image?: string;
  department: string;
  isHead?: boolean;
};

type Department = {
  name: string;
  head: Faculty | null;
  faculty: Faculty[];
};

const Faculties = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDepartments, setOpenDepartments] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchFacultyData();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('faculty_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'faculty' }, () => {
        fetchFacultyData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchFacultyData = async () => {
    setLoading(true);
    try {
      const { data: facultyData, error } = await supabase
        .from('faculty')
        .select('*')
        .order('department');

      if (error) {
        console.error('Error fetching faculty data:', error);
        // Fallback to mock data if fetch fails
        const departmentData = createMockDepartmentData();
        setDepartments(departmentData);
      } else if (facultyData && facultyData.length > 0) {
        // Group faculty by department
        const departmentData = groupFacultyByDepartment(facultyData);
        setDepartments(departmentData);
      } else {
        // No data in database, show mock data
        const departmentData = createMockDepartmentData();
        setDepartments(departmentData);
      }
    } catch (error) {
      console.error('Error fetching faculty data:', error);
      // Fallback to mock data
      const departmentData = createMockDepartmentData();
      setDepartments(departmentData);
    } finally {
      setLoading(false);
    }
  };

  const groupFacultyByDepartment = (faculty: Faculty[]): Department[] => {
    const departments = ['Computer Science', 'Commerce', 'Arts & Humanities', 'Science'];
    
    return departments.map(deptName => {
      const deptFaculty = faculty.filter(f => f.department === deptName);
      const head = deptFaculty.find(f => f.designation.toLowerCase().includes('head')) || deptFaculty[0] || null;
      const otherFaculty = deptFaculty.filter(f => f.id !== head?.id);
      
      return {
        name: `${deptName} Department`,
        head,
        faculty: otherFaculty
      };
    }).filter(dept => dept.head || dept.faculty.length > 0);
  };

  const createMockDepartmentData = (): Department[] => {
    return [
      {
        name: "Computer Science Department",
        head: {
          name: "Dr. Rajesh Kumar",
          designation: "Head of Department",
          qualification: "Ph.D. in Computer Science, M.Tech CSE",
          experience: "15 years",
          specialization: "Artificial Intelligence, Machine Learning",
          bio: "Expert in AI and ML with extensive research experience in neural networks and deep learning.",
          department: "Computer Science",
          image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
          isHead: true
        },
        faculty: [
          {
            name: "Dr. Priya Sharma",
            designation: "Associate Professor",
            qualification: "Ph.D. in Software Engineering, M.Tech IT",
            experience: "12 years",
            specialization: "Software Engineering, Database Systems",
            bio: "Specializes in software design patterns and database optimization techniques.",
            department: "Computer Science",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
          },
          {
            name: "Prof. Amit Singh",
            designation: "Assistant Professor",
            qualification: "M.Tech CSE, B.Tech Computer Science",
            experience: "8 years",
            specialization: "Web Development, Cybersecurity",
            bio: "Expert in modern web technologies and cybersecurity protocols.",
            department: "Computer Science",
            image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=300&q=80"
          }
        ]
      },
      {
        name: "Commerce Department",
        head: {
          name: "Dr. Meera Patel",
          designation: "Head of Department",
          qualification: "Ph.D. in Commerce, M.Com",
          experience: "18 years",
          specialization: "Financial Management, Accounting",
          bio: "Leading expert in financial planning and corporate accounting practices.",
          department: "Commerce",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
          isHead: true
        },
        faculty: [
          {
            name: "Prof. Suresh Gupta",
            designation: "Associate Professor",
            qualification: "M.Com, CA",
            experience: "14 years",
            specialization: "Taxation, Auditing",
            bio: "Chartered Accountant with expertise in taxation and financial auditing.",
            department: "Commerce",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80"
          }
        ]
      },
      {
        name: "Arts & Humanities Department",
        head: {
          name: "Dr. Kavita Sharma",
          designation: "Head of Department",
          qualification: "Ph.D. in English Literature, M.A. English",
          experience: "20 years",
          specialization: "Modern Literature, Creative Writing",
          bio: "Renowned scholar in contemporary literature and published author.",
          department: "Arts & Humanities",
          image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
          isHead: true
        },
        faculty: [
          {
            name: "Prof. Ravi Kumar",
            designation: "Assistant Professor",
            qualification: "M.A. History, B.Ed",
            experience: "10 years",
            specialization: "Ancient History, Archaeology",
            bio: "Specialist in Indian ancient history and archaeological research.",
            department: "Arts & Humanities",
            image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=300&q=80"
          }
        ]
      },
      {
        name: "Science Department",
        head: {
          name: "Dr. Anita Singh",
          designation: "Head of Department",
          qualification: "Ph.D. in Physics, M.Sc Physics",
          experience: "16 years",
          specialization: "Quantum Physics, Research Methods",
          bio: "Research scientist with publications in quantum mechanics and applied physics.",
          department: "Science",
          image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80",
          isHead: true
        },
        faculty: [
          {
            name: "Prof. Deepak Verma",
            designation: "Associate Professor",
            qualification: "M.Sc Chemistry, Ph.D",
            experience: "12 years",
            specialization: "Organic Chemistry, Lab Research",
            bio: "Expert in organic synthesis and chemical research methodologies.",
            department: "Science",
            image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=300&q=80"
          }
        ]
      }
    ];
  };

  const toggleDepartment = (departmentName: string) => {
    setOpenDepartments(prev => ({
      ...prev,
      [departmentName]: !prev[departmentName]
    }));
  };

  const renderFacultyCard = (faculty: Faculty) => (
    <Card key={`${faculty.department}-${faculty.name}`} className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-16 w-16 border-2 border-primary/20">
            <AvatarImage src={faculty.image} alt={faculty.name} />
            <AvatarFallback>{faculty.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-bold text-lg">{faculty.name}</h3>
            <p className="text-sm text-muted-foreground">{faculty.designation}</p>
            {faculty.isHead && (
              <Badge variant="secondary" className="mt-1">Head of Department</Badge>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2 mb-3">
            {faculty.specialization && (
              <Badge variant="secondary">{faculty.specialization}</Badge>
            )}
          </div>
          <p className="text-sm"><span className="font-medium">Qualification:</span> {faculty.qualification}</p>
          <p className="text-sm"><span className="font-medium">Experience:</span> {faculty.experience}</p>
          {faculty.bio && <p className="text-sm mt-2 line-clamp-3">{faculty.bio}</p>}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <PageHeader 
        title="Our Faculty" 
        description="Meet our experienced and dedicated faculty members organized by departments."
      />
      <div className="container py-8 px-4 md:px-6">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-8">
            {departments.map((department) => (
              <div key={department.name} className="space-y-4">
                <div className="space-y-4">
                  {/* Head of Department */}
                  {department.head && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4">{department.name}</h2>
                      {renderFacultyCard(department.head)}
                    </div>
                  )}

                  {/* Department Faculty Collapsible */}
                  {department.faculty.length > 0 && (
                    <Collapsible 
                      open={openDepartments[department.name]} 
                      onOpenChange={() => toggleDepartment(department.name)}
                    >
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <h3 className="text-lg font-semibold">Department Faculty ({department.faculty.length})</h3>
                        {openDepartments[department.name] ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {department.faculty.map((faculty) => renderFacultyCard(faculty))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && departments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No faculty members found.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Faculties;
