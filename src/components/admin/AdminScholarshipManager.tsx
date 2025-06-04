
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Plus, Eye, Trash2 } from 'lucide-react';

interface ScholarshipApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  current_education: string;
  family_income: string;
  reason_for_scholarship: string;
  is_sports_player: boolean;
  sports_level?: string;
  course_id?: number;
  created_at: string;
}

const AdminScholarshipManager = () => {
  const [scholarships, setScholarships] = useState<ScholarshipApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedScholarship, setSelectedScholarship] = useState<ScholarshipApplication | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      const { data, error } = await supabase
        .from('scholarship_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setScholarships(data || []);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
      toast({
        title: "Error",
        description: "Failed to fetch scholarship applications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleView = (scholarship: ScholarshipApplication) => {
    setSelectedScholarship(scholarship);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this scholarship application?')) return;

    try {
      const { error } = await supabase
        .from('scholarship_applications')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Scholarship application deleted successfully",
      });
      fetchScholarships();
    } catch (error) {
      console.error('Error deleting scholarship:', error);
      toast({
        title: "Error",
        description: "Failed to delete scholarship application",
        variant: "destructive",
      });
    }
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
        <h2 className="text-2xl font-bold">Scholarship Applications</h2>
      </div>

      <div className="grid gap-4">
        {scholarships.map((scholarship) => (
          <Card key={scholarship.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{scholarship.name}</CardTitle>
                  <CardDescription>
                    {scholarship.email} • {scholarship.phone}
                  </CardDescription>
                  <p className="text-sm text-gray-600">
                    Applied: {new Date(scholarship.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleView(scholarship)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(scholarship.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm"><strong>Education:</strong> {scholarship.current_education}</p>
              <p className="text-sm"><strong>Family Income:</strong> {scholarship.family_income}</p>
              {scholarship.is_sports_player && (
                <p className="text-sm"><strong>Sports Level:</strong> {scholarship.sports_level}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Scholarship Application Details</DialogTitle>
          </DialogHeader>
          {selectedScholarship && (
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <p className="text-sm">{selectedScholarship.name}</p>
              </div>
              <div>
                <Label>Email</Label>
                <p className="text-sm">{selectedScholarship.email}</p>
              </div>
              <div>
                <Label>Phone</Label>
                <p className="text-sm">{selectedScholarship.phone}</p>
              </div>
              <div>
                <Label>Current Education</Label>
                <p className="text-sm">{selectedScholarship.current_education}</p>
              </div>
              <div>
                <Label>Family Income</Label>
                <p className="text-sm">{selectedScholarship.family_income}</p>
              </div>
              <div>
                <Label>Reason for Scholarship</Label>
                <p className="text-sm">{selectedScholarship.reason_for_scholarship}</p>
              </div>
              {selectedScholarship.is_sports_player && (
                <div>
                  <Label>Sports Level</Label>
                  <p className="text-sm">{selectedScholarship.sports_level}</p>
                </div>
              )}
              <div>
                <Label>Application Date</Label>
                <p className="text-sm">{new Date(selectedScholarship.created_at).toLocaleString()}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminScholarshipManager;
