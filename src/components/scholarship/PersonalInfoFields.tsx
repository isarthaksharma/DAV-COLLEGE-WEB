
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScholarshipFormData } from '@/hooks/useScholarshipForm';

interface PersonalInfoFieldsProps {
  formData: ScholarshipFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getMinDate: () => string;
  getMaxDate: () => string;
}

const PersonalInfoFields = ({ formData, onChange, getMinDate, getMaxDate }: PersonalInfoFieldsProps) => {
  return (
    <>
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
          placeholder="+91 98765 43210"
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
          onChange={onChange}
          max={getMinDate()}
          min={getMaxDate()}
          required
        />
        <p className="text-sm text-gray-500 mt-1">You must be at least 18 years old to apply</p>
      </div>
    </>
  );
};

export default PersonalInfoFields;
