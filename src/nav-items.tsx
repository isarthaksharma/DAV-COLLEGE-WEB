
import { HomeIcon, Users, GraduationCap, Calendar as CalendarIcon, Newspaper, BookOpen, Trophy, Building, Mail, UserCircle, MapPin, HelpCircle, FileText, ClipboardCheck, Shield } from "lucide-react";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Programs from "./pages/Programs.tsx";
import Faculties from "./pages/Faculties.tsx";
import News from "./pages/News.tsx";
import Achievements from "./pages/Achievements.tsx";
import Campus from "./pages/Campus.tsx";
import Contact from "./pages/Contact.tsx";
import Leadership from "./pages/Leadership.tsx";
import AdmissionProcess from "./pages/AdmissionProcess.tsx";
import Requirements from "./pages/Requirements.tsx";
import Application from "./pages/Application.tsx";
import AdmissionsFAQ from "./pages/AdmissionsFAQ.tsx";
import Scholarships from "./pages/Scholarships.tsx";
import StudentDesk from "./pages/StudentDesk.tsx";
import Results from "./pages/Results.tsx";
import Research from "./pages/Research.tsx";
import Calendar from "./pages/Calendar.tsx";
import OurHistory from "./pages/OurHistory.tsx";
import AdminPanelNew from "./pages/AdminPanelNew.tsx";
import NotFound from "./pages/NotFound.tsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "About",
    to: "/about",
    icon: <Building className="h-4 w-4" />,
    page: <About />,
  },
  {
    title: "Programs",
    to: "/programs",
    icon: <GraduationCap className="h-4 w-4" />,
    page: <Programs />,
  },
  {
    title: "Faculties",
    to: "/faculties",
    icon: <Users className="h-4 w-4" />,
    page: <Faculties />,
  },
  {
    title: "News",
    to: "/news",
    icon: <Newspaper className="h-4 w-4" />,
    page: <News />,
  },
  {
    title: "Achievements",
    to: "/achievements",
    icon: <Trophy className="h-4 w-4" />,
    page: <Achievements />,
  },
  {
    title: "Campus",
    to: "/campus",
    icon: <MapPin className="h-4 w-4" />,
    page: <Campus />,
  },
  {
    title: "Contact",
    to: "/contact",
    icon: <Mail className="h-4 w-4" />,
    page: <Contact />,
  },
  {
    title: "Leadership",
    to: "/leadership",
    icon: <UserCircle className="h-4 w-4" />,
    page: <Leadership />,
  },
  {
    title: "Admission Process",
    to: "/admission-process",
    icon: <FileText className="h-4 w-4" />,
    page: <AdmissionProcess />,
  },
  {
    title: "Requirements",
    to: "/requirements",
    icon: <ClipboardCheck className="h-4 w-4" />,
    page: <Requirements />,
  },
  {
    title: "Application",
    to: "/application",
    icon: <FileText className="h-4 w-4" />,
    page: <Application />,
  },
  {
    title: "Admissions FAQ",
    to: "/admissions-faq",
    icon: <HelpCircle className="h-4 w-4" />,
    page: <AdmissionsFAQ />,
  },
  {
    title: "Scholarships",
    to: "/scholarships",
    icon: <BookOpen className="h-4 w-4" />,
    page: <Scholarships />,
  },
  {
    title: "Student Desk",
    to: "/student-desk",
    icon: <Shield className="h-4 w-4" />,
    page: <StudentDesk />,
  },
  {
    title: "Results",
    to: "/results",
    icon: <Trophy className="h-4 w-4" />,
    page: <Results />,
  },
  {
    title: "Research",
    to: "/research",
    icon: <BookOpen className="h-4 w-4" />,
    page: <Research />,
  },
  {
    title: "Calendar",
    to: "/calendar",
    icon: <CalendarIcon className="h-4 w-4" />,
    page: <Calendar />,
  },
  {
    title: "Our History",
    to: "/our-history",
    icon: <Building className="h-4 w-4" />,
    page: <OurHistory />,
  },
  {
    title: "Admin Panel",
    to: "/admin",
    icon: <Shield className="h-4 w-4" />,
    page: <AdminPanelNew />,
  },
  {
    title: "Not Found",
    to: "*",
    icon: <HelpCircle className="h-4 w-4" />,
    page: <NotFound />,
  },
];
