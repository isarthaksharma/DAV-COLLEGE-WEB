
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScholarshipFormData } from '@/hooks/useScholarshipForm';

interface CourseSelectionFieldProps {
  formData: ScholarshipFormData;
  courses: { id: string; title: string }[];
  onSelectChange: (value: string) => void;
}

const CourseSelectionField = ({ formData, courses, onSelectChange }: CourseSelectionFieldProps) => {
  return (
    <div>
      <Label htmlFor="course">Select Course</Label>
      <Select 
        onValueChange={onSelectChange}
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
  );
};

export default CourseSelectionField;
