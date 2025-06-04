
import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin } from "lucide-react";

interface EventProps {
  date: string;
  title: string;
  description: string;
  location: string;
}

const EventCard = ({ date, title, description, location }: EventProps) => (
  <Card className="overflow-hidden">
    <div className="bg-primary text-white p-3 text-center">
      <p className="font-medium">{date}</p>
    </div>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="mb-2">{description}</p>
      <div className="flex items-center text-gray-500 text-sm">
        <MapPin className="h-4 w-4 mr-1" />
        <span>{location}</span>
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline" size="sm">
        Learn More
      </Button>
    </CardFooter>
  </Card>
);

const EventsSection = () => {
  const events = [
    {
      date: "May 15, 2025",
      title: "Annual Cultural Festival",
      description: "Join us for a celebration of art, music, and culture with performances by students and guest artists.",
      location: "Main Auditorium"
    },
    {
      date: "May 20, 2025",
      title: "Career Fair 2025",
      description: "Connect with potential employers and explore career opportunities across various industries.",
      location: "University Stadium"
    },
    {
      date: "May 25, 2025",
      title: "Research Symposium",
      description: "Showcasing innovative research projects by students and faculty members.",
      location: "Science Building"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Upcoming Events</h2>
          <Link to="/news" className="text-primary flex items-center hover:underline mt-2 md:mt-0">
            View All Events <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <EventCard 
              key={index}
              date={event.date}
              title={event.title}
              description={event.description}
              location={event.location}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
