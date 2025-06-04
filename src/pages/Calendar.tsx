
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, GraduationCap, BookOpen, Trophy, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface EventProps {
  date: string;
  title: string;
  type: string;
  description: string;
  icon: React.ReactNode;
}

const EventCard = ({ date, title, type, description, icon }: EventProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{date}</CardDescription>
        </div>
        <Badge 
          variant={
            type === 'Academic' ? 'default' : 
            type === 'Exam' ? 'destructive' : 
            type === 'Event' ? 'secondary' : 
            'outline'
          }
          className="flex items-center gap-1"
        >
          {icon}
          {type}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

const CalendarPage = () => {
  const currentYear = new Date().getFullYear();
  
  const eventsJanJun = [
    {
      date: "January 2-5, 2025",
      title: "New Year Holiday",
      type: "Holiday",
      description: "College will remain closed for New Year celebrations.",
      icon: <CalendarIcon className="h-3 w-3" />
    },
    {
      date: "January 10, 2025",
      title: "Winter Session Classes Begin",
      type: "Academic",
      description: "All regular classes resume for the winter session.",
      icon: <BookOpen className="h-3 w-3" />
    },
    {
      date: "February 15-20, 2025",
      title: "Mid-Semester Examinations",
      type: "Exam",
      description: "Mid-semester examinations for all undergraduate and postgraduate courses.",
      icon: <GraduationCap className="h-3 w-3" />
    },
    {
      date: "March 5-10, 2025",
      title: "Annual Cultural Festival",
      type: "Event",
      description: "College-wide cultural festival featuring performances, competitions, and exhibitions.",
      icon: <Users className="h-3 w-3" />
    },
    {
      date: "April 1-5, 2025",
      title: "Sports Week",
      type: "Event",
      description: "Annual sports competitions across various disciplines.",
      icon: <Trophy className="h-3 w-3" />
    },
    {
      date: "May 10-30, 2025",
      title: "End-Semester Examinations",
      type: "Exam",
      description: "Final examinations for the winter semester for all courses.",
      icon: <GraduationCap className="h-3 w-3" />
    },
    {
      date: "June 1-30, 2025",
      title: "Summer Vacation",
      type: "Holiday",
      description: "College will remain closed for summer vacation.",
      icon: <CalendarIcon className="h-3 w-3" />
    }
  ];

  const eventsJulDec = [
    {
      date: "July 1, 2025",
      title: "Admission Process Begins",
      type: "Academic",
      description: "Applications open for new admissions for the upcoming academic year.",
      icon: <BookOpen className="h-3 w-3" />
    },
    {
      date: "July 15, 2025",
      title: "Summer Session Classes Begin",
      type: "Academic",
      description: "All regular classes resume for the summer session.",
      icon: <BookOpen className="h-3 w-3" />
    },
    {
      date: "August 15, 2025",
      title: "Independence Day Celebration",
      type: "Event",
      description: "Special programs to commemorate Independence Day.",
      icon: <Users className="h-3 w-3" />
    },
    {
      date: "September 5, 2025",
      title: "Teachers' Day Celebration",
      type: "Event",
      description: "Special event to honor and appreciate teachers.",
      icon: <Users className="h-3 w-3" />
    },
    {
      date: "September 15-20, 2025",
      title: "Mid-Semester Examinations",
      type: "Exam",
      description: "Mid-semester examinations for all undergraduate and postgraduate courses.",
      icon: <GraduationCap className="h-3 w-3" />
    },
    {
      date: "October 15-20, 2025",
      title: "Research Symposium",
      type: "Academic",
      description: "Annual research symposium showcasing faculty and student research.",
      icon: <BookOpen className="h-3 w-3" />
    },
    {
      date: "November 10-30, 2025",
      title: "End-Semester Examinations",
      type: "Exam",
      description: "Final examinations for the summer semester for all courses.",
      icon: <GraduationCap className="h-3 w-3" />
    },
    {
      date: "December 15, 2025",
      title: "Winter Convocation",
      type: "Event",
      description: "Annual convocation ceremony for graduating students.",
      icon: <GraduationCap className="h-3 w-3" />
    },
    {
      date: "December 20-31, 2025",
      title: "Winter Vacation",
      type: "Holiday",
      description: "College will remain closed for winter vacation.",
      icon: <CalendarIcon className="h-3 w-3" />
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Academic Calendar {currentYear}</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Plan your academic year with our comprehensive calendar featuring important dates,
          events, examinations, and holidays.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <Card className="bg-primary/10">
          <CardContent className="pt-6 text-center">
            <CalendarIcon className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-bold">Holidays</h3>
            <p className="text-gray-600">College closures and official holidays</p>
          </CardContent>
        </Card>
        <Card className="bg-primary/10">
          <CardContent className="pt-6 text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-bold">Academic</h3>
            <p className="text-gray-600">Class schedules and academic deadlines</p>
          </CardContent>
        </Card>
        <Card className="bg-primary/10">
          <CardContent className="pt-6 text-center">
            <GraduationCap className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-bold">Exams</h3>
            <p className="text-gray-600">Examination dates and result announcements</p>
          </CardContent>
        </Card>
        <Card className="bg-primary/10">
          <CardContent className="pt-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-bold">Events</h3>
            <p className="text-gray-600">Cultural and sports events, conferences</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="jan-jun">
        <TabsList className="mb-6">
          <TabsTrigger value="jan-jun">January - June</TabsTrigger>
          <TabsTrigger value="jul-dec">July - December</TabsTrigger>
        </TabsList>
        <TabsContent value="jan-jun">
          <div className="space-y-6">
            {eventsJanJun.map((event, index) => (
              <EventCard 
                key={index}
                date={event.date}
                title={event.title}
                type={event.type}
                description={event.description}
                icon={event.icon}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="jul-dec">
          <div className="space-y-6">
            {eventsJulDec.map((event, index) => (
              <EventCard 
                key={index}
                date={event.date}
                title={event.title}
                type={event.type}
                description={event.description}
                icon={event.icon}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Important Notes:</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>The academic calendar is subject to change. Please check regularly for updates.</li>
          <li>Examination dates are tentative and may be adjusted based on unforeseen circumstances.</li>
          <li>Additional events and activities may be announced throughout the academic year.</li>
          <li>For specific department events, please refer to the respective department's notice board.</li>
        </ul>
      </div>
    </div>
  );
};

export default CalendarPage;
