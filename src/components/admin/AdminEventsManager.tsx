
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Plus, Edit, Trash2 } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type EventCategory = Database['public']['Enums']['event_category'];

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  end_date?: string;
  time?: string;
  location?: string;
  category: EventCategory;
  featured: boolean;
  registration_open: boolean;
  image?: string;
}

const AdminEventsManager = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    end_date: '',
    time: '',
    location: '',
    category: 'academic' as EventCategory,
    featured: false,
    registration_open: false,
    image: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: "Error",
        description: "Failed to fetch events",
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
      const eventData = {
        ...formData,
        end_date: formData.end_date || null,
        time: formData.time || null,
        location: formData.location || null,
        image: formData.image || null
      };

      if (editingEvent) {
        const { error } = await supabase
          .from('events')
          .update(eventData)
          .eq('id', editingEvent.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Event updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('events')
          .insert([eventData]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Event added successfully",
        });
      }

      resetForm();
      setDialogOpen(false);
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
      toast({
        title: "Error",
        description: "Failed to save event",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description || '',
      date: new Date(event.date).toISOString().split('T')[0],
      end_date: event.end_date ? new Date(event.end_date).toISOString().split('T')[0] : '',
      time: event.time || '',
      location: event.location || '',
      category: event.category,
      featured: event.featured,
      registration_open: event.registration_open,
      image: event.image || ''
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Event deleted successfully",
      });
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      end_date: '',
      time: '',
      location: '',
      category: 'academic',
      featured: false,
      registration_open: false,
      image: ''
    });
    setEditingEvent(null);
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
        <h2 className="text-2xl font-bold">Events Management</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingEvent ? 'Edit Event' : 'Add Event'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Start Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="end_date">End Date (Optional)</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="e.g., 10:00 AM - 2:00 PM"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Event location"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value: EventCategory) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="career">Career</SelectItem>
                    <SelectItem value="alumni">Alumni</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="Event image URL"
                />
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                  <Label htmlFor="featured">Featured Event</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="registration_open"
                    checked={formData.registration_open}
                    onCheckedChange={(checked) => setFormData({ ...formData, registration_open: checked })}
                  />
                  <Label htmlFor="registration_open">Registration Open</Label>
                </div>
              </div>

              <Button type="submit" disabled={saving} className="w-full">
                {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {editingEvent ? 'Update Event' : 'Add Event'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {event.title}
                    {event.featured && <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Featured</span>}
                    {event.registration_open && <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">Registration Open</span>}
                  </CardTitle>
                  <CardDescription>
                    {new Date(event.date).toLocaleDateString()} • {event.category}
                    {event.location && ` • ${event.location}`}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(event)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(event.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3">{event.description}</p>
              {event.image && (
                <img src={event.image} alt={event.title} className="mt-2 w-32 h-20 object-cover rounded" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminEventsManager;
