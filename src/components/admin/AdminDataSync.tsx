
import { useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdminDataSync = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Set up real-time subscriptions for admin changes
    const subscriptions = [
      // Faculty changes
      supabase
        .channel('faculty_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'faculty' }, (payload) => {
          console.log('Faculty data changed:', payload);
          toast({
            title: "Faculty Updated",
            description: "Faculty information has been updated by admin.",
          });
        })
        .subscribe(),

      // Course changes
      supabase
        .channel('course_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'courses' }, (payload) => {
          console.log('Course data changed:', payload);
          toast({
            title: "Courses Updated",
            description: "Course information has been updated by admin.",
          });
        })
        .subscribe(),

      // News changes
      supabase
        .channel('news_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'news' }, (payload) => {
          console.log('News data changed:', payload);
          toast({
            title: "News Updated",
            description: "Latest news has been updated by admin.",
          });
        })
        .subscribe(),

      // Events changes
      supabase
        .channel('events_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'events' }, (payload) => {
          console.log('Events data changed:', payload);
          toast({
            title: "Events Updated",
            description: "Event information has been updated by admin.",
          });
        })
        .subscribe(),

      // Notice changes
      supabase
        .channel('notice_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'notices' }, (payload) => {
          console.log('Notice data changed:', payload);
          toast({
            title: "Notices Updated",
            description: "New notices have been posted by admin.",
          });
        })
        .subscribe(),
    ];

    // Cleanup subscriptions on unmount
    return () => {
      subscriptions.forEach(subscription => {
        supabase.removeChannel(subscription);
      });
    };
  }, [toast]);

  return null; // This component doesn't render anything visible
};

export default AdminDataSync;
