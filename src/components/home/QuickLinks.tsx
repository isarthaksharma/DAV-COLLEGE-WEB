
import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, Users, Calendar } from "lucide-react";

const QuickLinks = () => {
  return (
    <section className="bg-accent text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <Link to="/application" className="flex flex-col items-center p-4 hover:bg-accent/80 rounded-md transition-colors">
            <GraduationCap size={36} />
            <span className="mt-2 font-medium">Admissions</span>
          </Link>
          <Link to="/programs" className="flex flex-col items-center p-4 hover:bg-accent/80 rounded-md transition-colors">
            <BookOpen size={36} />
            <span className="mt-2 font-medium">Academics</span>
          </Link>
          <Link to="/campus" className="flex flex-col items-center p-4 hover:bg-accent/80 rounded-md transition-colors">
            <Users size={36} />
            <span className="mt-2 font-medium">Campus Life</span>
          </Link>
          <Link to="/calendar" className="flex flex-col items-center p-4 hover:bg-accent/80 rounded-md transition-colors">
            <Calendar size={36} />
            <span className="mt-2 font-medium">Events</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
