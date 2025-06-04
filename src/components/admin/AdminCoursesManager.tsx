
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Plus, Edit, Trash2 } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type CourseType = Database['public']['Enums']['course_type'];
type Department = Database['public']['Enums']['department'];

interface Course {
  id: number;
  title: string;
  code: string;
  description: string;
  duration: string;
  department: Department;
  type: CourseType;
  eligibility: string;
}

const AdminCoursesManager = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    code: '',
    description: '',
    duration: '',
    department: 'Science' as Department,
    type: 'undergraduate' as CourseType,
    eligibility: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('title');

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast({
        title: "Error",
        description: "Failed to fetch courses",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingCourse) {
        const { error } = await supabase
          .from('courses')
          .update(formData)
          .eq('id', editingCourse.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Course updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('courses')
          .insert([formData]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Course added successfully",
        });
      }

      resetForm();
      setDialogOpen(false);
      fetchCourses();
    } catch (error) {
      console.error('Error saving course:', error);
      toast({
        title: "Error",
        description: "Failed to save course",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      code: course.code,
      description: course.description || '',
      duration: course.duration,
      department: course.department,
      type: course.type,
      eligibility: course.eligibility || ''
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Course deleted successfully",
      });
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
      toast({
        title: "Error",
        description: "Failed to delete course",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      code: '',
      description: '',
      duration: '',
      department: 'Science',
      type: 'undergraduate',
      eligibility: ''
    });
    setEditingCourse(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Courses Management</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingCourse ? 'Edit Course' : 'Add Course'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="code">Course Code</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 3 years"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select value={formData.department} onValueChange={(value: Department) => setFormData({ ...formData, department: value })}>
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
                  <Label htmlFor="type">Course Type</Label>
                  <Select value={formData.type} onValueChange={(value: CourseType) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="postgraduate">Postgraduate</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="certificate">Certificate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="eligibility">Eligibility</Label>
                <Textarea
                  id="eligibility"
                  value={formData.eligibility}
                  onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                  rows={3}
                />
              </div>

              <Button type="submit" disabled={saving} className="w-full">
                {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {editingCourse ? 'Update Course' : 'Add Course'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>
                    {course.code} • {course.department} • {course.duration}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(course)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(course.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">Type: {course.type}</p>
              {course.description && <p className="line-clamp-3">{course.description}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminCoursesManager;
