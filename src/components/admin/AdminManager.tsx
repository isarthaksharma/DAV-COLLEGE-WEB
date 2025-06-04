
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Plus, Trash2 } from 'lucide-react';

interface AdminCredential {
  id: number;
  email: string;
  created_at: string;
}

const AdminManager = () => {
  const [admins, setAdmins] = useState<AdminCredential[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_credentials')
        .select('id, email, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAdmins(data || []);
    } catch (error) {
      console.error('Error fetching admins:', error);
      toast({
        title: "Error",
        description: "Failed to fetch admin list",
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
      const { error } = await supabase
        .from('admin_credentials')
        .insert([{
          email: formData.email,
          password: formData.password
        }]);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Admin created successfully",
      });
      
      resetForm();
      setDialogOpen(false);
      fetchAdmins();
    } catch (error) {
      console.error('Error creating admin:', error);
      toast({
        title: "Error",
        description: "Failed to create admin",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this admin?')) return;

    try {
      const { error } = await supabase
        .from('admin_credentials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Admin deleted successfully",
      });
      fetchAdmins();
    } catch (error) {
      console.error('Error deleting admin:', error);
      toast({
        title: "Error",
        description: "Failed to delete admin",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: ''
    });
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
        <h2 className="text-2xl font-bold">Admin Management</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Admin
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Admin</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" disabled={saving} className="w-full">
                {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Create Admin
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {admins.map((admin) => (
          <Card key={admin.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{admin.email}</CardTitle>
                  <CardDescription>
                    Created: {new Date(admin.created_at).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(admin.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminManager;
