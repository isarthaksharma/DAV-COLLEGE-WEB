
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface ScholarshipFormData {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  courseId: string;
  currentEducation: string;
  familyIncome: string;
  reasonForScholarship: string;
  isSportsPlayer: string;
  sportsLevel: string;
}

export const useScholarshipForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courses, setCourses] = useState<{ id: string; title: string }[]>([]);
  const [formData, setFormData] = useState<ScholarshipFormData>({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    courseId: '',
    currentEducation: '',
    familyIncome: '',
    reasonForScholarship: '',
    isSportsPlayer: '',
    sportsLevel: '',
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
        } else {
          // Fallback courses if none found in database
          setCourses([
            { id: '1', title: 'BCA - Bachelor of Computer Applications' },
            { id: '2', title: 'BCOM - Bachelor of Commerce' },
            { id: '3', title: 'BBA - Bachelor of Business Administration' },
            { id: '4', title: 'BSC IT - Bachelor of Science in Information Technology' },
            { id: '5', title: 'BSC CS - Bachelor of Science in Computer Science' },
          ]);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        // Use default courses if fetching fails
        setCourses([
          { id: '1', title: 'BCA - Bachelor of Computer Applications' },
          { id: '2', title: 'BCOM - Bachelor of Commerce' },
          { id: '3', title: 'BBA - Bachelor of Business Administration' },
        ]);
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async () => {
    // Validate age before submission
    if (!validateAge(formData.dateOfBirth)) {
      toast({
        title: "Age Requirement Not Met",
        description: "You must be at least 18 years old to apply for a scholarship.",
        variant: "destructive",
      });
      return false;
    }

    // Validate sports level if sports player
    if (formData.isSportsPlayer === 'true' && !formData.sportsLevel) {
      toast({
        title: "Sports Level Required",
        description: "Please select your sports level (State or National).",
        variant: "destructive",
      });
      return false;
    }
    
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('scholarship_applications').insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        course_id: parseInt(formData.courseId),
        current_education: formData.currentEducation,
        family_income: formData.familyIncome,
        reason_for_scholarship: formData.reasonForScholarship,
        is_sports_player: formData.isSportsPlayer === 'true',
        sports_level: formData.isSportsPlayer === 'true' ? formData.sportsLevel : null,
      });

      if (error) throw error;

      toast({
        title: "Application Submitted",
        description: "Your scholarship application has been submitted successfully.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        courseId: '',
        currentEducation: '',
        familyIncome: '',
        reasonForScholarship: '',
        isSportsPlayer: '',
        sportsLevel: '',
      });

      return true;
    } catch (error) {
      console.error('Error submitting scholarship application:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your scholarship application. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    courses,
    isSubmitting,
    handleSubmit,
    getMinDate,
    getMaxDate,
    validateAge
  };
};
