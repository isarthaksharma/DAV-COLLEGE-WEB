import React, { useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Book, FlaskConical, Users, Trophy, Dumbbell, Coffee, Laptop, Building, ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

const campusImages = [
  {
    url: "https://github.com/isarthaksharma/photo/blob/main/IMG_4633.JPG?raw=true",
    caption: "DAV Sports Complex"
  },
  {
    url: "https://github.com/isarthaksharma/photo/blob/main/IMG_0342.JPG?raw=true",
    caption: "Mind Venture Lab"
  },
  {
    url: "https://github.com/isarthaksharma/photo/blob/main/IMG_0931.JPG?raw=true",
 caption: "Library"
  },
  {
    url: "https://github.com/isarthaksharma/photo/blob/main/IMG_7434.JPG?raw=true",
    caption: "Arsh Auditorium"
  }
];

interface FacilityProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FacilityCard = ({ title, description, icon }: FacilityProps) => {
  return (
    <div className="flex p-6 bg-white rounded-lg shadow-md">
      <div className="mr-4 text-primary">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

// Campus visit form schema
const campusVisitSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  visitDate: z.string().min(1, "Please select a visit date"),
  visitTime: z.string().min(1, "Please select a visit time"),
  purpose: z.string().min(10, "Purpose must be at least 10 characters"),
});

type CampusVisitFormValues = z.infer<typeof campusVisitSchema>;

const Campus = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const form = useForm<CampusVisitFormValues>({
    resolver: zodResolver(campusVisitSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      visitDate: "",
      visitTime: "",
      purpose: "",
    },
  });

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % campusImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + campusImages.length) % campusImages.length);
  };

  const onSubmit = async (data: CampusVisitFormValues) => {
    try {
      const { error } = await supabase.from('campus_visit_requests').insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        visit_date: data.visitDate,
        visit_time: data.visitTime,
        purpose: data.purpose,
      });

      if (error) throw error;

      toast({
        title: "Visit request submitted",
        description: "We'll get back to you soon to confirm your campus visit.",
      });
      
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const facilities = [
    {
      title: "Modern Classrooms",
      description: "Smart classrooms equipped with the latest audiovisual technology for interactive learning.",
      icon: <Book size={24} />
    },
    {
      title: "State-of-the-art Laboratories",
      description: "Well-equipped science and computer labs for practical learning and research.",
      icon: <FlaskConical size={24} />
    },
    {
      title: "Library & Resource Center",
      description: "Extensive collection of books, journals, and digital resources for academic research.",
      icon: <Book size={24} />
    },
    {
      title: "Sports Facilities",
      description: "Indoor and outdoor sports facilities including a stadium, courts, and fitness center.",
      icon: <Trophy size={24} />
    },
    
    {
      title: "Computer Center",
      description: "Computer labs with high-speed internet and the latest software for digital learning.",
      icon: <Laptop size={24} />
    },
    {
      title: "Hostel Facilities",
      description: "Separate hostels for boys and girls with modern amenities and security.",
      icon: <Building size={24} />
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Our Campus</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Explore DAV College's sprawling campus with state-of-the-art facilities designed to provide an optimal learning environment.
        </p>
      </div>

      {/* Image Slideshow */}
      <div className="mb-12 relative">
        <AspectRatio ratio={16/9} className="overflow-hidden rounded-lg shadow-lg mb-4">
          <img 
            src={campusImages[currentImageIndex].url}
            alt={`DAV College Campus - ${currentImageIndex + 1}`}
            className="object-cover w-full h-full transition-opacity duration-500"
          />
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-full bg-white/70" onClick={prevImage}>
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-full bg-white/70" onClick={nextImage}>
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </AspectRatio>
        <p className="text-gray-600 text-center">{campusImages[currentImageIndex].caption}</p>
        <div className="flex justify-center mt-2 gap-2">
          {campusImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-2 w-8 rounded-full ${index === currentImageIndex ? 'bg-primary' : 'bg-gray-300'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Campus Facilities</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {facilities.map((facility, index) => (
          <FacilityCard 
            key={index}
            title={facility.title}
            description={facility.description}
            icon={facility.icon}
          />
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <AspectRatio ratio={4/3} className="overflow-hidden rounded-lg shadow-lg mb-4">
            <img 
              src="https://images.unsplash.com/photo-1599658880436-c61792e70672?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bGlicmFyeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
              alt="Library"
              className="object-cover w-full h-full"
            />
          </AspectRatio>
          <p className="text-gray-600 text-center">Modern library with extensive resources</p>
        </div>
        <div>
          <AspectRatio ratio={4/3} className="overflow-hidden rounded-lg shadow-lg mb-4">
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29tcHV0ZXIlMjBsYWJ8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
              alt="Computer Lab"
              className="object-cover w-full h-full"
            />
          </AspectRatio>
          <p className="text-gray-600 text-center">State-of-the-art computer laboratory</p>
        </div>
      </div>

      {/* Campus Visit Request Form */}
      <Card className="mb-12 border-primary/20">
        <CardHeader className="bg-primary/5">
          <CardTitle className="text-xl flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Schedule a Campus Visit
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="johndoe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 98765 43210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St, City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="visitDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Visit Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} min={new Date().toISOString().split('T')[0]} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="visitTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Visit Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purpose of Visit</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please describe why you'd like to visit our campus..."
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full sm:w-auto">Schedule Visit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Campus;
