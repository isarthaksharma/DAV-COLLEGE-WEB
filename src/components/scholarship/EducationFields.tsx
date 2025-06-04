
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScholarshipFormData } from '@/hooks/useScholarshipForm';

interface EducationFieldsProps {
  formData: ScholarshipFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFamilyIncomeChange: (value: string) => void;
}

const EducationFields = ({ formData, onChange, onFamilyIncomeChange }: EducationFieldsProps) => {
  return (
    <>
      <div>
        <Label htmlFor="currentEducation">Current Education</Label>
        <Input
          id="currentEducation"
          name="currentEducation"
          value={formData.currentEducation}
          onChange={onChange}
          placeholder="e.g., 12th Pass, Graduation"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="familyIncome">Family Annual Income</Label>
        <Select 
          onValueChange={onFamilyIncomeChange}
          value={formData.familyIncome}
          required
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select family income range" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="Below 1 Lakh">Below ₹1 Lakh</SelectItem>
            <SelectItem value="1-3 Lakhs">₹1-3 Lakhs</SelectItem>
            <SelectItem value="3-5 Lakhs">₹3-5 Lakhs</SelectItem>
            <SelectItem value="5-10 Lakhs">₹5-10 Lakhs</SelectItem>
            <SelectItem value="Above 10 Lakhs">Above ₹10 Lakhs</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default EducationFields;
