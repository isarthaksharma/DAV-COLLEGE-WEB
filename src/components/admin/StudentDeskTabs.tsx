
import React, { useState, useEffect } from 'react';
import { Loader2, Trash2, Eye, BookOpen, Award, Medal, Briefcase, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Type definitions
type EducationalTour = {
  id?: number;
  title: string;
  description?: string;
  location: string;
  date: string;
  image?: string;
}

type AcademicTopper = {
  id?: number;
  name: string;
  course: string;
  year: string;
  achievement: string;
  percentage?: number;
  image?: string;
}

type TournamentAchiever = {
  id?: number;
  name: string;
  tournament: string;
  position: string;
  year: string;
  sport: string;
  image?: string;
}

type Internship = {
  id?: number;
  company: string;
  role: string;
  duration: string;
  year: string;
  department: string;
  student_count?: number;
  image?: string;
}

type PlacementStat = {
  id?: number;
  company: string;
  year: string;
  department: string;
  students_placed: number;
  average_package?: string;
  highest_package?: string;
  image?: string;
}

// Educational Tours Tab
export const EducationalToursTab = () => {
  const [tours, setTours] = useState<EducationalTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTour, setNewTour] = useState<EducationalTour>({
    title: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('educational_tours')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setTours(data || []);
    } catch (error) {
      console.error('Error fetching tours:', error);
      toast({
        title: "Error",
        description: "Failed to load educational tours",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddTour = async () => {
    try {
      const { data, error } = await supabase
        .from('educational_tours')
        .insert([newTour])
        .select();

      if (error) throw error;

      setTours(prev => [...prev, data![0]]);
      setNewTour({
        title: '',
        location: '',
        date: new Date().toISOString().split('T')[0],
      });
      toast({
        title: "Success",
        description: "Educational tour added successfully",
      });
    } catch (error) {
      console.error('Error adding tour:', error);
      toast({
        title: "Error",
        description: "Failed to add educational tour",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTour = async (id: number) => {
    try {
      const { error } = await supabase
        .from('educational_tours')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTours(prev => prev.filter(tour => tour.id !== id));
      toast({
        title: "Success",
        description: "Educational tour deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting tour:', error);
      toast({
        title: "Error",
        description: "Failed to delete educational tour",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Educational Tours</CardTitle>
        <CardDescription>Add, view or delete educational tours</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-6">
              <BookOpen className="mr-2 h-4 w-4" /> Add New Tour
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Educational Tour</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new educational tour.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tour-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="tour-title"
                  className="col-span-3"
                  value={newTour.title}
                  onChange={(e) => setNewTour(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Study trip to Science Museum"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tour-location" className="text-right">
                  Location
                </Label>
                <Input
                  id="tour-location"
                  className="col-span-3"
                  value={newTour.location}
                  onChange={(e) => setNewTour(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Delhi"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tour-date" className="text-right">
                  Date
                </Label>
                <Input
                  id="tour-date"
                  type="date"
                  className="col-span-3"
                  value={newTour.date}
                  onChange={(e) => setNewTour(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tour-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="tour-description"
                  className="col-span-3"
                  value={newTour.description || ''}
                  onChange={(e) => setNewTour(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the tour"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tour-image" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="tour-image"
                  className="col-span-3"
                  value={newTour.image || ''}
                  onChange={(e) => setNewTour(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddTour}>Add Tour</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {loading ? (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : tours.length === 0 ? (
          <div className="text-center p-8 text-gray-500">
            No educational tours found.
          </div>
        ) : (
          <div className="space-y-4">
            {tours.map((tour) => (
              <div key={tour.id} className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm">
                <div>
                  <h3 className="font-medium">{tour.title}</h3>
                  <p className="text-sm text-gray-500">{tour.location} - {new Date(tour.date).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => tour.id && handleDeleteTour(tour.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Academic Toppers Tab
export const AcademicToppersTab = () => {
  const [toppers, setToppers] = useState<AcademicTopper[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTopper, setNewTopper] = useState<AcademicTopper>({
    name: '',
    course: '',
    year: new Date().getFullYear().toString(),
    achievement: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchToppers();
  }, []);

  const fetchToppers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('academic_toppers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setToppers(data || []);
    } catch (error) {
      console.error('Error fetching toppers:', error);
      toast({
        title: "Error",
        description: "Failed to load academic toppers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddTopper = async () => {
    try {
      const { data, error } = await supabase
        .from('academic_toppers')
        .insert([newTopper])
        .select();

      if (error) throw error;

      setToppers(prev => [...prev, data![0]]);
      setNewTopper({
        name: '',
        course: '',
        year: new Date().getFullYear().toString(),
        achievement: '',
      });
      toast({
        title: "Success",
        description: "Academic topper added successfully",
      });
    } catch (error) {
      console.error('Error adding topper:', error);
      toast({
        title: "Error",
        description: "Failed to add academic topper",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTopper = async (id: number) => {
    try {
      const { error } = await supabase
        .from('academic_toppers')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setToppers(prev => prev.filter(topper => topper.id !== id));
      toast({
        title: "Success",
        description: "Academic topper deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting topper:', error);
      toast({
        title: "Error",
        description: "Failed to delete academic topper",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Academic Toppers</CardTitle>
        <CardDescription>Add, view or delete academic toppers</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-6">
              <Award className="mr-2 h-4 w-4" /> Add New Topper
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Academic Topper</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new academic topper.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="topper-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="topper-name"
                  className="col-span-3"
                  value={newTopper.name}
                  onChange={(e) => setNewTopper(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Student Name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="topper-course" className="text-right">
                  Course
                </Label>
                <Input
                  id="topper-course"
                  className="col-span-3"
                  value={newTopper.course}
                  onChange={(e) => setNewTopper(prev => ({ ...prev, course: e.target.value }))}
                  placeholder="B.Tech Computer Science"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="topper-year" className="text-right">
                  Year
                </Label>
                <Input
                  id="topper-year"
                  className="col-span-3"
                  value={newTopper.year}
                  onChange={(e) => setNewTopper(prev => ({ ...prev, year: e.target.value }))}
                  placeholder="2023"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="topper-achievement" className="text-right">
                  Achievement
                </Label>
                <Input
                  id="topper-achievement"
                  className="col-span-3"
                  value={newTopper.achievement}
                  onChange={(e) => setNewTopper(prev => ({ ...prev, achievement: e.target.value }))}
                  placeholder="University Rank 1"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="topper-percentage" className="text-right">
                  Percentage
                </Label>
                <Input
                  id="topper-percentage"
                  type="number"
                  className="col-span-3"
                  value={newTopper.percentage || ''}
                  onChange={(e) => setNewTopper(prev => ({ ...prev, percentage: parseFloat(e.target.value) }))}
                  placeholder="95.5"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="topper-image" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="topper-image"
                  className="col-span-3"
                  value={newTopper.image || ''}
                  onChange={(e) => setNewTopper(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddTopper}>Add Topper</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {loading ? (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : toppers.length === 0 ? (
          <div className="text-center p-8 text-gray-500">
            No academic toppers found.
          </div>
        ) : (
          <div className="space-y-4">
            {toppers.map((topper) => (
              <div key={topper.id} className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm">
                <div>
                  <h3 className="font-medium">{topper.name}</h3>
                  <p className="text-sm text-gray-500">{topper.course} - {topper.year}</p>
                  <p className="text-sm">{topper.achievement} {topper.percentage && `(${topper.percentage}%)`}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => topper.id && handleDeleteTopper(topper.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Tournament Achievers Tab
export const TournamentAchieversTab = () => {
  const [achievers, setAchievers] = useState<TournamentAchiever[]>([]);
  const [loading, setLoading] = useState(true);
  const [newAchiever, setNewAchiever] = useState<TournamentAchiever>({
    name: '',
    tournament: '',
    position: '',
    year: new Date().getFullYear().toString(),
    sport: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchAchievers();
  }, []);

  const fetchAchievers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tournament_achievers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAchievers(data || []);
    } catch (error) {
      console.error('Error fetching achievers:', error);
      toast({
        title: "Error",
        description: "Failed to load tournament achievers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddAchiever = async () => {
    try {
      const { data, error } = await supabase
        .from('tournament_achievers')
        .insert([newAchiever])
        .select();

      if (error) throw error;

      setAchievers(prev => [...prev, data![0]]);
      setNewAchiever({
        name: '',
        tournament: '',
        position: '',
        year: new Date().getFullYear().toString(),
        sport: '',
      });
      toast({
        title: "Success",
        description: "Tournament achiever added successfully",
      });
    } catch (error) {
      console.error('Error adding achiever:', error);
      toast({
        title: "Error",
        description: "Failed to add tournament achiever",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAchiever = async (id: number) => {
    try {
      const { error } = await supabase
        .from('tournament_achievers')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAchievers(prev => prev.filter(achiever => achiever.id !== id));
      toast({
        title: "Success",
        description: "Tournament achiever deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting achiever:', error);
      toast({
        title: "Error",
        description: "Failed to delete tournament achiever",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Tournament Achievers</CardTitle>
        <CardDescription>Add, view or delete tournament achievers</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-6">
              <Medal className="mr-2 h-4 w-4" /> Add New Achiever
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Tournament Achiever</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new tournament achiever.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="achiever-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="achiever-name"
                  className="col-span-3"
                  value={newAchiever.name}
                  onChange={(e) => setNewAchiever(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Student Name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="achiever-tournament" className="text-right">
                  Tournament
                </Label>
                <Input
                  id="achiever-tournament"
                  className="col-span-3"
                  value={newAchiever.tournament}
                  onChange={(e) => setNewAchiever(prev => ({ ...prev, tournament: e.target.value }))}
                  placeholder="Inter-University Championship"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="achiever-position" className="text-right">
                  Position
                </Label>
                <Input
                  id="achiever-position"
                  className="col-span-3"
                  value={newAchiever.position}
                  onChange={(e) => setNewAchiever(prev => ({ ...prev, position: e.target.value }))}
                  placeholder="Gold Medal / 1st Place"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="achiever-year" className="text-right">
                  Year
                </Label>
                <Input
                  id="achiever-year"
                  className="col-span-3"
                  value={newAchiever.year}
                  onChange={(e) => setNewAchiever(prev => ({ ...prev, year: e.target.value }))}
                  placeholder="2023"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="achiever-sport" className="text-right">
                  Sport
                </Label>
                <Input
                  id="achiever-sport"
                  className="col-span-3"
                  value={newAchiever.sport}
                  onChange={(e) => setNewAchiever(prev => ({ ...prev, sport: e.target.value }))}
                  placeholder="Cricket / Chess / Athletics"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="achiever-image" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="achiever-image"
                  className="col-span-3"
                  value={newAchiever.image || ''}
                  onChange={(e) => setNewAchiever(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddAchiever}>Add Achiever</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {loading ? (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : achievers.length === 0 ? (
          <div className="text-center p-8 text-gray-500">
            No tournament achievers found.
          </div>
        ) : (
          <div className="space-y-4">
            {achievers.map((achiever) => (
              <div key={achiever.id} className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm">
                <div>
                  <h3 className="font-medium">{achiever.name}</h3>
                  <p className="text-sm text-gray-500">{achiever.tournament} - {achiever.year}</p>
                  <p className="text-sm">{achiever.sport} - {achiever.position}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => achiever.id && handleDeleteAchiever(achiever.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Internships Tab
export const InternshipsTab = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [newInternship, setNewInternship] = useState<Internship>({
    company: '',
    role: '',
    duration: '',
    year: new Date().getFullYear().toString(),
    department: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('internships')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInternships(data || []);
    } catch (error) {
      console.error('Error fetching internships:', error);
      toast({
        title: "Error",
        description: "Failed to load internships",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddInternship = async () => {
    try {
      const { data, error } = await supabase
        .from('internships')
        .insert([newInternship])
        .select();

      if (error) throw error;

      setInternships(prev => [...prev, data![0]]);
      setNewInternship({
        company: '',
        role: '',
        duration: '',
        year: new Date().getFullYear().toString(),
        department: '',
      });
      toast({
        title: "Success",
        description: "Internship added successfully",
      });
    } catch (error) {
      console.error('Error adding internship:', error);
      toast({
        title: "Error",
        description: "Failed to add internship",
        variant: "destructive",
      });
    }
  };

  const handleDeleteInternship = async (id: number) => {
    try {
      const { error } = await supabase
        .from('internships')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setInternships(prev => prev.filter(internship => internship.id !== id));
      toast({
        title: "Success",
        description: "Internship deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting internship:', error);
      toast({
        title: "Error",
        description: "Failed to delete internship",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Internships</CardTitle>
        <CardDescription>Add, view or delete internships</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-6">
              <Briefcase className="mr-2 h-4 w-4" /> Add New Internship
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Internship</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new internship.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="internship-company" className="text-right">
                  Company
                </Label>
                <Input
                  id="internship-company"
                  className="col-span-3"
                  value={newInternship.company}
                  onChange={(e) => setNewInternship(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Microsoft / Google"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="internship-role" className="text-right">
                  Role
                </Label>
                <Input
                  id="internship-role"
                  className="col-span-3"
                  value={newInternship.role}
                  onChange={(e) => setNewInternship(prev => ({ ...prev, role: e.target.value }))}
                  placeholder="Software Engineer Intern"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="internship-duration" className="text-right">
                  Duration
                </Label>
                <Input
                  id="internship-duration"
                  className="col-span-3"
                  value={newInternship.duration}
                  onChange={(e) => setNewInternship(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="3 Months"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="internship-year" className="text-right">
                  Year
                </Label>
                <Input
                  id="internship-year"
                  className="col-span-3"
                  value={newInternship.year}
                  onChange={(e) => setNewInternship(prev => ({ ...prev, year: e.target.value }))}
                  placeholder="2023"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="internship-department" className="text-right">
                  Department
                </Label>
                <Input
                  id="internship-department"
                  className="col-span-3"
                  value={newInternship.department}
                  onChange={(e) => setNewInternship(prev => ({ ...prev, department: e.target.value }))}
                  placeholder="Computer Science"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="internship-count" className="text-right">
                  Student Count
                </Label>
                <Input
                  id="internship-count"
                  type="number"
                  className="col-span-3"
                  value={newInternship.student_count || ''}
                  onChange={(e) => setNewInternship(prev => ({ ...prev, student_count: parseInt(e.target.value) }))}
                  placeholder="5"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="internship-image" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="internship-image"
                  className="col-span-3"
                  value={newInternship.image || ''}
                  onChange={(e) => setNewInternship(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="https://example.com/logo.jpg"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddInternship}>Add Internship</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {loading ? (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : internships.length === 0 ? (
          <div className="text-center p-8 text-gray-500">
            No internships found.
          </div>
        ) : (
          <div className="space-y-4">
            {internships.map((internship) => (
              <div key={internship.id} className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm">
                <div>
                  <h3 className="font-medium">{internship.company}</h3>
                  <p className="text-sm text-gray-500">{internship.role} - {internship.year}</p>
                  <p className="text-sm">{internship.department} | {internship.duration}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => internship.id && handleDeleteInternship(internship.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Placement Stats Tab
export const PlacementStatsTab = () => {
  const [placements, setPlacements] = useState<PlacementStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPlacement, setNewPlacement] = useState<PlacementStat>({
    company: '',
    year: new Date().getFullYear().toString(),
    department: '',
    students_placed: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('placement_stats')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPlacements(data || []);
    } catch (error) {
      console.error('Error fetching placement stats:', error);
      toast({
        title: "Error",
        description: "Failed to load placement statistics",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddPlacement = async () => {
    try {
      const { data, error } = await supabase
        .from('placement_stats')
        .insert([newPlacement])
        .select();

      if (error) throw error;

      setPlacements(prev => [...prev, data![0]]);
      setNewPlacement({
        company: '',
        year: new Date().getFullYear().toString(),
        department: '',
        students_placed: 0,
      });
      toast({
        title: "Success",
        description: "Placement statistics added successfully",
      });
    } catch (error) {
      console.error('Error adding placement stats:', error);
      toast({
        title: "Error",
        description: "Failed to add placement statistics",
        variant: "destructive",
      });
    }
  };

  const handleDeletePlacement = async (id: number) => {
    try {
      const { error } = await supabase
        .from('placement_stats')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPlacements(prev => prev.filter(placement => placement.id !== id));
      toast({
        title: "Success",
        description: "Placement statistics deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting placement stats:', error);
      toast({
        title: "Error",
        description: "Failed to delete placement statistics",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Placement Statistics</CardTitle>
        <CardDescription>Add, view or delete placement statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-6">
              <Users className="mr-2 h-4 w-4" /> Add New Placement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Placement Statistics</DialogTitle>
              <DialogDescription>
                Fill in the details to add new placement statistics.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="placement-company" className="text-right">
                  Company
                </Label>
                <Input
                  id="placement-company"
                  className="col-span-3"
                  value={newPlacement.company}
                  onChange={(e) => setNewPlacement(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Microsoft / Google"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="placement-year" className="text-right">
                  Year
                </Label>
                <Input
                  id="placement-year"
                  className="col-span-3"
                  value={newPlacement.year}
                  onChange={(e) => setNewPlacement(prev => ({ ...prev, year: e.target.value }))}
                  placeholder="2023"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="placement-department" className="text-right">
                  Department
                </Label>
                <Input
                  id="placement-department"
                  className="col-span-3"
                  value={newPlacement.department}
                  onChange={(e) => setNewPlacement(prev => ({ ...prev, department: e.target.value }))}
                  placeholder="Computer Science"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="placement-count" className="text-right">
                  Students Placed
                </Label>
                <Input
                  id="placement-count"
                  type="number"
                  className="col-span-3"
                  value={newPlacement.students_placed || ''}
                  onChange={(e) => setNewPlacement(prev => ({ ...prev, students_placed: parseInt(e.target.value) }))}
                  placeholder="15"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="placement-avg-package" className="text-right">
                  Average Package
                </Label>
                <Input
                  id="placement-avg-package"
                  className="col-span-3"
                  value={newPlacement.average_package || ''}
                  onChange={(e) => setNewPlacement(prev => ({ ...prev, average_package: e.target.value }))}
                  placeholder="₹8 LPA"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="placement-highest-package" className="text-right">
                  Highest Package
                </Label>
                <Input
                  id="placement-highest-package"
                  className="col-span-3"
                  value={newPlacement.highest_package || ''}
                  onChange={(e) => setNewPlacement(prev => ({ ...prev, highest_package: e.target.value }))}
                  placeholder="₹15 LPA"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="placement-image" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="placement-image"
                  className="col-span-3"
                  value={newPlacement.image || ''}
                  onChange={(e) => setNewPlacement(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="https://example.com/logo.jpg"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddPlacement}>Add Placement</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {loading ? (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : placements.length === 0 ? (
          <div className="text-center p-8 text-gray-500">
            No placement statistics found.
          </div>
        ) : (
          <div className="space-y-4">
            {placements.map((placement) => (
              <div key={placement.id} className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm">
                <div>
                  <h3 className="font-medium">{placement.company}</h3>
                  <p className="text-sm text-gray-500">{placement.department} - {placement.year}</p>
                  <p className="text-sm">
                    {placement.students_placed} students placed
                    {placement.average_package && ` | Avg: ${placement.average_package}`}
                    {placement.highest_package && ` | Max: ${placement.highest_package}`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => placement.id && handleDeletePlacement(placement.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
