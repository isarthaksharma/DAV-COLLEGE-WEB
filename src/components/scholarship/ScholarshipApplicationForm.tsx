
import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useScholarshipForm } from '@/hooks/useScholarshipForm';
import PersonalInfoFields from './PersonalInfoFields';
import CourseSelectionField from './CourseSelectionField';
import EducationFields from './EducationFields';
import SportsFields from './SportsFields';

const ScholarshipApplicationForm = () => {
  const {
    formData,
    setFormData,
    courses,
    isSubmitting,
    handleSubmit,
    getMinDate,
    getMaxDate
  } = useScholarshipForm();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, courseId: value }));
  };

  const handleSportsPlayerChange = (value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      isSportsPlayer: value,
      sportsLevel: value === 'false' ? '' : prev.sportsLevel
    }));
  };

  const handleSportsLevelChange = (value: string) => {
    setFormData(prev => ({ ...prev, sportsLevel: value }));
  };

  const handleFamilyIncomeChange = (value: string) => {
    setFormData(prev => ({ ...prev, familyIncome: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit();
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Scholarship Application</h2>
      <form onSubmit={onSubmit} className="space-y-6">
        <PersonalInfoFields 
          formData={formData}
          onChange={handleChange}
          getMinDate={getMinDate}
          getMaxDate={getMaxDate}
        />
        
        <CourseSelectionField 
          formData={formData}
          courses={courses}
          onSelectChange={handleSelectChange}
        />
        
        <EducationFields 
          formData={formData}
          onChange={handleChange}
          onFamilyIncomeChange={handleFamilyIncomeChange}
        />

        <SportsFields 
          formData={formData}
          onSportsPlayerChange={handleSportsPlayerChange}
          onSportsLevelChange={handleSportsLevelChange}
        />
        
        <div>
          <Label htmlFor="reasonForScholarship">Reason for Scholarship</Label>
          <Textarea
            id="reasonForScholarship"
            name="reasonForScholarship"
            value={formData.reasonForScholarship}
            onChange={handleChange}
            placeholder="Please explain why you need this scholarship..."
            required
            rows={4}
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Scholarship Application"}
        </Button>
      </form>
    </div>
  );
};

export default ScholarshipApplicationForm;
