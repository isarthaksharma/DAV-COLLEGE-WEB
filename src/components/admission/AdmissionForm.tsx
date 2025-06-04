
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AdmissionForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courses, setCourses] = useState<{ id: string; title: string }[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    courseId: '',
    guardianName: '',
    guardianPhone: '',
  });

  // Calculate minimum date (18 years ago)
  const getMinDate = () => {
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return minDate.toISOString().split('T')[0];
  };

  // Calculate maximum date (100 years ago for reasonable upper limit)
  const getMaxDate = () => {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
    return maxDate.toISOString().split('T')[0];
  };

  // Validate age
  const validateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return false;
    
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= 18;
    }
    
    return age >= 18;
  };

  // Fetch courses from Supabase
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('id, title')
          .order('title');
        
        if (error) {
          throw error;
        }
        
        if (data && data.length > 0) {
          setCourses(data.map(course => ({
            id: course.id.toString(),
            title: course.title
          })));
          console.log('Courses fetched:', data);
        } else {
          console.log('No courses found, using fallback data');
          // Fallback to default courses if none are found in the database
          setCourses([
            { id: '1', title: 'BCA - Bachelor of Computer Applications' },
            { id: '2', title: 'BCOM - Bachelor of Commerce' },
            { id: '3', title: 'BBA - Bachelor of Business Administration' },
            { id: '4', title: 'BSC IT - Bachelor of Science in Information Technology' },
            { id: '5', title: 'BSC CS - Bachelor of Science in Computer Science' },
            { id: '6', title: 'BSC NM - Bachelor of Science in Non-Medical' },
            { id: '7', title: 'BJMC - Bachelor of Journalism and Mass Communication' },
            { id: '8', title: 'BSC Physics - Bachelor of Science in Physics' },
            { id: '9', title: 'BA English - Bachelor of Arts in English' },
            { id: '10', title: 'BA Maths - Bachelor of Arts in Mathematics' },
            { id: '11', title: 'BA Computer Science - Bachelor of Arts in Computer Science' },
            { id: '12', title: 'BA History - Bachelor of Arts in History' },
            { id: '13', title: 'BA Punjabi - Bachelor of Arts in Punjabi' },
            { id: '14', title: 'BA Hindi - Bachelor of Arts in Hindi' },
            { id: '15', title: 'MCOM - Master of Commerce' },
            { id: '16', title: 'MSC CS - Master of Science in Computer Science' },
            { id: '17', title: 'MA English - Master of Arts in English' },
            { id: '18', title: 'MA History - Master of Arts in History' },
            { id: '19', title: 'MA Punjabi - Master of Arts in Punjabi' },
            { id: '20', title: 'MA Hindi - Master of Arts in Hindi' },
          ]);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        // Use default courses if fetching fails
        setCourses([
          { id: '1', title: 'BCA - Bachelor of Computer Applications' },
          { id: '2', title: 'BCOM - Bachelor of Commerce' },
          { id: '3', title: 'BBA - Bachelor of Business Administration' },
          { id: '4', title: 'BSC IT - Bachelor of Science in Information Technology' },
          { id: '5', title: 'BSC CS - Bachelor of Science in Computer Science' },
          { id: '6', title: 'BSC NM - Bachelor of Science in Non-Medical' },
          { id: '7', title: 'BJMC - Bachelor of Journalism and Mass Communication' },
          { id: '8', title: 'BSC Physics - Bachelor of Science in Physics' },
          { id: '9', title: 'BA English - Bachelor of Arts in English' },
          { id: '10', title: 'BA Maths - Bachelor of Arts in Mathematics' },
          { id: '11', title: 'BA Computer Science - Bachelor of Arts in Computer Science' },
          { id: '12', title: 'BA History - Bachelor of Arts in History' },
          { id: '13', title: 'BA Punjabi - Bachelor of Arts in Punjabi' },
          { id: '14', title: 'BA Hindi - Bachelor of Arts in Hindi' },
          { id: '15', title: 'MCOM - Master of Commerce' },
          { id: '16', title: 'MSC CS - Master of Science in Computer Science' },
          { id: '17', title: 'MA English - Master of Arts in English' },
          { id: '18', title: 'MA History - Master of Arts in History' },
          { id: '19', title: 'MA Punjabi - Master of Arts in Punjabi' },
          { id: '20', title: 'MA Hindi - Master of Arts in Hindi' },
        ]);
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, courseId: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate age before submission
    if (!validateAge(formData.dateOfBirth)) {
      toast({
        title: "Age Requirement Not Met",
        description: "You must be at least 18 years old to apply for admission.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('admission_applications').insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        date_of_birth: formData.dateOfBirth,
        course_id: parseInt(formData.courseId), // Convert string to number
        guardian_name: formData.guardianName,
        guardian_phone: formData.guardianPhone,
      });

      if (error) throw error;

      toast({
        title: "Application Submitted",
        description: "Your admission application has been submitted successfully.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        courseId: '',
        guardianName: '',
        guardianPhone: '',
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your full address"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            max={getMinDate()}
            min={getMaxDate()}
            required
          />
          <p className="text-sm text-gray-500 mt-1">You must be at least 18 years old to apply</p>
        </div>
        
        <div>
          <Label htmlFor="course">Select Course</Label>
          <Select 
            onValueChange={handleSelectChange}
            value={formData.courseId}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a course" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px] overflow-y-auto bg-white">
              {courses.map((course) => (
                <SelectItem key={course.id} value={course.id}>
                  {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="guardianName">Guardian's Name</Label>
          <Input
            id="guardianName"
            name="guardianName"
            value={formData.guardianName}
            onChange={handleChange}
            placeholder="Parent/Guardian name"
          />
        </div>
        
        <div>
          <Label htmlFor="guardianPhone">Guardian's Phone Number</Label>
          <Input
            id="guardianPhone"
            name="guardianPhone"
            value={formData.guardianPhone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </div>
  );
};

export default AdmissionForm;
