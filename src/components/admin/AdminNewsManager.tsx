
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Plus, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';

interface News {
  id: number;
  title: string;
  content: string;
  image?: string;
  featured: boolean;
  publish_date: string;
  created_at: string;
}

const AdminNewsManager = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    featured: false,
    publish_date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchNews();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('news_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'news' }, () => {
        fetchNews();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error('Error fetching news:', error);
      toast({
        title: "Error",
        description: "Failed to fetch news",
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
      if (editingNews) {
        const { error } = await supabase
          .from('news')
          .update(formData)
          .eq('id', editingNews.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "News updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('news')
          .insert([formData]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "News added successfully",
        });
      }

      resetForm();
      setDialogOpen(false);
    } catch (error) {
      console.error('Error saving news:', error);
      toast({
        title: "Error",
        description: "Failed to save news",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (newsItem: News) => {
    setEditingNews(newsItem);
    setFormData({
      title: newsItem.title,
      content: newsItem.content,
      image: newsItem.image || '',
      featured: newsItem.featured,
      publish_date: newsItem.publish_date ? new Date(newsItem.publish_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this news item?')) return;

    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "News deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting news:', error);
      toast({
        title: "Error",
        description: "Failed to delete news",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      image: '',
      featured: false,
      publish_date: new Date().toISOString().split('T')[0]
    });
    setEditingNews(null);
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
        <h2 className="text-2xl font-bold">News Management</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add News
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingNews ? 'Edit News' : 'Add News'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                  required
                />
              </div>

              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="publish_date">Publish Date</Label>
                <Input
                  id="publish_date"
                  type="date"
                  value={formData.publish_date}
                  onChange={(e) => setFormData({ ...formData, publish_date: e.target.value })}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
                <Label htmlFor="featured">Featured News</Label>
              </div>

              <Button type="submit" disabled={saving} className="w-full">
                {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {editingNews ? 'Update News' : 'Add News'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {news.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {item.title}
                    {item.featured && <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Featured</span>}
                  </CardTitle>
                  <CardDescription>
                    Published: {new Date(item.publish_date).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3">{item.content}</p>
              {item.image && (
                <img src={item.image} alt={item.title} className="mt-2 w-32 h-20 object-cover rounded" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminNewsManager;
