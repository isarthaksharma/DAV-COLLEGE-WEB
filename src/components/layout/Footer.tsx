import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const feedbackSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  feedback: z.string().min(10, "Feedback must be at least 10 characters"),
  // Use string for the form input, then transform to number when submitting
  rating: z.string(),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

const Footer = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      feedback: "",
      // Default rating as string since the RadioGroup expects string values
      rating: "5",
    },
  });

  const onSubmit = async (data: FeedbackFormValues) => {
    try {
      const { error } = await supabase.from('feedback_submissions').insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        feedback: data.feedback,
        rating: parseInt(data.rating, 10), // Convert string to number when submitting to database
      });

      if (error) throw error;

      toast({
        title: "Feedback submitted",
        description: "Thank you for sharing your feedback with us!",
      });
      
      setIsFeedbackOpen(false);
      form.reset();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your feedback. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">DAV College</h3>
            <p className="mb-4">
              Empowering students with quality education and values since 1948.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="https://www.davcmc.net.in/" className="hover:text-accent">DAVCMC, New Delhi</Link>
              </li>
               <li>
                <Link to="https://www.ugc.ac.in/" className="hover:text-accent">UGC</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-accent">About Us</Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-accent">Academic Programs</Link>
              </li>
              <li>
                <Link to="/application" className="hover:text-accent">Admissions</Link>
              </li>
              <li>
                <Link to="/campus" className="hover:text-accent">Campus Life</Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-accent">News & Events</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent">Contact Us</Link>
              </li>
              <li>
                <Link to="/results" className="hover:text-accent">Results</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="mt-0.5 flex-shrink-0" />
                <span>Hathi Gate, Katra Ahluwalia, Amritsar, Punjab 143006</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="flex-shrink-0" />
                <span>+91 123-456-7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="flex-shrink-0" />
                <span>info@davcollege.edu</span>
              </li>
            </ul>
            <Button 
              variant="outline" 
              className="mt-4 border-white text-white hover:bg-white/10"
              onClick={() => setIsFeedbackOpen(true)}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Give Feedback
            </Button>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Our Location</h3>
            <div className="rounded-lg overflow-hidden shadow-lg h-[200px]">
              <iframe
                src="https://maps.app.goo.gl/6VccEDPRSUKf4v6e8"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="DAV College Location"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p>© {new Date().getFullYear()} DAV College. All rights reserved.</p>
        </div>
      </div>

      {/* Feedback Dialog */}
      <Dialog open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Share Your Feedback</DialogTitle>
            <DialogDescription>
              We value your opinion! Please let us know what you think about our college.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
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
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="davasr@yahoo.com" {...field} />
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
              </div>
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Rate your experience (1-10)</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-wrap justify-between"
                      >
                        {/* Use string values consistently for RadioGroupItem values */}
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                          <FormItem key={rating} className="flex items-center space-x-1">
                            <FormControl>
                              <RadioGroupItem value={rating.toString()} />
                            </FormControl>
                            <FormLabel className="mb-0">{rating}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="feedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What do you like about our college?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please share your thoughts about our college..."
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-4 pt-2">
                <Button variant="outline" type="button" onClick={() => setIsFeedbackOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Submit Feedback
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;
