
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Users, BookOpen, Calendar, Newspaper } from 'lucide-react';

type Department = 'Science' | 'Arts & Humanities' | 'Commerce' | 'Computer Science';

interface Faculty {
  id?: number;
  name: string;
  designation: string;
  qualification: string;
  experience: string;
  specialization: string;
  phone: string;
  bio: string;
  department: Department;
  image?: string;
}

const AdminPanel = () => {
  const { toast } = useToast();
  
  // Faculty Management State
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [newFaculty, setNewFaculty] = useState<Faculty>({
    name: '',
    designation: '',
    qualification: '',
    experience: '',
    specialization: '',
    phone: '',
    bio: '',
    department: 'Science',
    image: ''
  });

  // Load initial data
  useEffect(() => {
    loadFaculties();
  }, []);

  const loadFaculties = async () => {
    try {
      const { data, error } = await supabase
        .from('faculty')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setFaculties(data || []);
    } catch (error) {
      console.error('Error loading faculties:', error);
      toast({
        title: "Error",
        description: "Failed to load faculty data",
        variant: "destructive",
      });
    }
  };

  const addFaculty = async () => {
    try {
      // Ensure all required fields are present, including name
      const facultyData = {
        name: newFaculty.name,
        designation: newFaculty.designation,
        qualification: newFaculty.qualification,
        experience: newFaculty.experience,
        specialization: newFaculty.specialization,
        phone: newFaculty.phone,
        bio: newFaculty.bio,
        department: newFaculty.department,
        image: newFaculty.image || null
      };

      const { error } = await supabase
        .from('faculty')
        .insert([facultyData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Faculty member added successfully",
      });

      // Reset form
      setNewFaculty({
        name: '',
        designation: '',
        qualification: '',
        experience: '',
        specialization: '',
        phone: '',
        bio: '',
        department: 'Science',
        image: ''
      });

      // Reload faculties
      loadFaculties();
    } catch (error) {
      console.error('Error adding faculty:', error);
      toast({
        title: "Error",
        description: "Failed to add faculty member",
        variant: "destructive",
      });
    }
  };

  const deleteFaculty = async (id: number) => {
    try {
      const { error } = await supabase
        .from('faculty')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Faculty member deleted successfully",
      });

      loadFaculties();
    } catch (error) {
      console.error('Error deleting faculty:', error);
      toast({
        title: "Error",
        description: "Failed to delete faculty member",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <p className="text-gray-600">Manage college content and data</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{faculties.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Faculty Management Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Faculty Management</CardTitle>
          <CardDescription>Add and manage faculty members</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add Faculty Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Add New Faculty</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newFaculty.name}
                  onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                  placeholder="Faculty name"
                />
              </div>
              <div>
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  value={newFaculty.designation}
                  onChange={(e) => setNewFaculty({ ...newFaculty, designation: e.target.value })}
                  placeholder="Professor, Assistant Professor, etc."
                />
              </div>
              <div>
                <Label htmlFor="qualification">Qualification</Label>
                <Input
                  id="qualification"
                  value={newFaculty.qualification}
                  onChange={(e) => setNewFaculty({ ...newFaculty, qualification: e.target.value })}
                  placeholder="Ph.D., M.Sc., etc."
                />
              </div>
              <div>
                <Label htmlFor="experience">Experience</Label>
                <Input
                  id="experience"
                  value={newFaculty.experience}
                  onChange={(e) => setNewFaculty({ ...newFaculty, experience: e.target.value })}
                  placeholder="10 years, 5+ years, etc."
                />
              </div>
              <div>
                <Label htmlFor="specialization">Specialization</Label>
                <Input
                  id="specialization"
                  value={newFaculty.specialization}
                  onChange={(e) => setNewFaculty({ ...newFaculty, specialization: e.target.value })}
                  placeholder="Mathematics, Physics, etc."
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newFaculty.phone}
                  onChange={(e) => setNewFaculty({ ...newFaculty, phone: e.target.value })}
                  placeholder="Phone number"
                />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Select value={newFaculty.department} onValueChange={(value: Department) => setNewFaculty({ ...newFaculty, department: value })}>
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
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={newFaculty.image}
                  onChange={(e) => setNewFaculty({ ...newFaculty, image: e.target.value })}
                  placeholder="Image URL (optional)"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={newFaculty.bio}
                onChange={(e) => setNewFaculty({ ...newFaculty, bio: e.target.value })}
                placeholder="Faculty bio"
                rows={3}
              />
            </div>
            <Button onClick={addFaculty} className="w-full">
              Add Faculty Member
            </Button>
          </div>

          {/* Faculty List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Current Faculty ({faculties.length})</h3>
            <div className="space-y-2">
              {faculties.map((faculty) => (
                <div key={faculty.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{faculty.name}</p>
                    <p className="text-sm text-gray-600">{faculty.designation} - {faculty.department}</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => faculty.id && deleteFaculty(faculty.id)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
              {faculties.length === 0 && (
                <p className="text-gray-500 text-center py-4">No faculty members added yet.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
