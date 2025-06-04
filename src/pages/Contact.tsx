import React from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  reason: z.string().min(10, "Your message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Contact = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      reason: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const { error } = await supabase.from('contact_submissions').insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        reason: data.reason,
      });

      if (error) throw error;

      toast({
        title: "Message sent successfully",
        description: "Thank you for reaching out to us. We'll get back to you soon.",
      });
      
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission failed",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Have a question or feedback? We'd love to hear from you. Fill out the form below or use our contact information to get in touch.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Type your message here..."
                          className="min-h-[150px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-gray-600">Hathi Gate, Katra Ahluwalia, Amritsar, Punjab 143001</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">+91 123-456-7890</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">info@davcollege.edu</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Office Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2"><span className="font-medium">Monday - Friday:</span> 9:00 AM to 5:00 PM</p>
              <p className="mb-2"><span className="font-medium">Saturday:</span> 9:00 AM to 1:00 PM</p>
              <p><span className="font-medium">Sunday:</span> Closed</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <iframe
                src="https://maps.app.goo.gl/6VccEDPRSUKf4v6e8"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="DAV College Location Map"
              ></iframe>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
