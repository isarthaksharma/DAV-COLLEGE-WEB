
import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScholarshipFormData } from '@/hooks/useScholarshipForm';

interface SportsFieldsProps {
  formData: ScholarshipFormData;
  onSportsPlayerChange: (value: string) => void;
  onSportsLevelChange: (value: string) => void;
}

const SportsFields = ({ formData, onSportsPlayerChange, onSportsLevelChange }: SportsFieldsProps) => {
  return (
    <>
      <div>
        <Label>Are you a sports player?</Label>
        <RadioGroup
          value={formData.isSportsPlayer}
          onValueChange={onSportsPlayerChange}
          className="flex flex-row space-x-6 mt-2"
          required
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="sports-yes" />
            <Label htmlFor="sports-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="sports-no" />
            <Label htmlFor="sports-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.isSportsPlayer === 'true' && (
        <div>
          <Label htmlFor="sportsLevel">Sports Level</Label>
          <Select 
            onValueChange={onSportsLevelChange}
            value={formData.sportsLevel}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your sports level" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="state">State Level</SelectItem>
              <SelectItem value="national">National Level</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
};

export default SportsFields;
