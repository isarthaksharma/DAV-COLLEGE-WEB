
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Faculty {
  id?: number;
  name: string;
  designation: string;
  qualification: string;
  experience: string;
  specialization: string;
  bio: string;
  department: 'Science' | 'Arts & Humanities' | 'Commerce' | 'Computer Science';
  image?: string;
  phone?: string;
}

const AdminFacultyManager = () => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState<Faculty>({
    name: '',
    designation: '',
    qualification: '',
    experience: '',
    specialization: '',
    bio: '',
    department: 'Science',
    image: '',
    phone: ''
  });

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const { data, error } = await supabase
        .from('faculty')
        .select('*')
        .order('name');

      if (error) throw error;
      setFaculties(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch faculty data",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingFaculty) {
        const { error } = await supabase
          .from('faculty')
          .update(formData)
          .eq('id', editingFaculty.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Faculty updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('faculty')
          .insert([formData]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Faculty added successfully",
        });
      }

      resetForm();
      fetchFaculties();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save faculty",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (faculty: Faculty) => {
    setEditingFaculty(faculty);
    setFormData(faculty);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this faculty member?')) return;

    try {
      const { error } = await supabase
        .from('faculty')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Faculty deleted successfully",
      });
      fetchFaculties();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete faculty",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      designation: '',
      qualification: '',
      experience: '',
      specialization: '',
      bio: '',
      department: 'Science',
      image: '',
      phone: ''
    });
    setEditingFaculty(null);
  };

  const handleInputChange = (field: keyof Faculty, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingFaculty ? 'Edit Faculty' : 'Add New Faculty'}</CardTitle>
          <CardDescription>
            {editingFaculty ? 'Update faculty information' : 'Add a new faculty member to the system'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  value={formData.designation}
                  onChange={(e) => handleInputChange('designation', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="qualification">Qualification</Label>
                <Input
                  id="qualification"
                  value={formData.qualification}
                  onChange={(e) => handleInputChange('qualification', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="experience">Experience</Label>
                <Input
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="specialization">Specialization</Label>
                <Input
                  id="specialization"
                  value={formData.specialization}
                  onChange={(e) => handleInputChange('specialization', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Arts & Humanities">Arts & Humanities</SelectItem>
                    <SelectItem value="Commerce">Commerce</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={3}
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={isLoading}>
                <Plus className="h-4 w-4 mr-2" />
                {isLoading ? 'Saving...' : editingFaculty ? 'Update Faculty' : 'Add Faculty'}
              </Button>
              {editingFaculty && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Faculty Members</CardTitle>
          <CardDescription>Manage existing faculty members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faculties.map((faculty) => (
              <div key={faculty.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{faculty.name}</h3>
                    <p className="text-sm text-gray-600">{faculty.designation}</p>
                    <p className="text-sm text-gray-600">{faculty.department}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(faculty)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(faculty.id!)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminFacultyManager;
