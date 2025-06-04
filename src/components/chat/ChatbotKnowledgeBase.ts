
interface ChatQuery {
  keywords: string[];
  response: string;
  links?: { text: string; url: string }[];
}

export const chatbotKnowledgeBase: ChatQuery[] = [
  // Home & General
  {
    keywords: ['home', 'main', 'welcome', 'start'],
    response: 'Welcome to our educational institution! Our home page contains information about our programs, latest news, events, and quick access to important sections.',
    links: [{ text: 'Visit Home Page', url: '/' }]
  },

  // About
  {
    keywords: ['about', 'about us', 'college information', 'institution', 'overview'],
    response: 'Learn more about our institution, our mission, vision, and values. We are committed to providing quality education and fostering student growth.',
    links: [
      { text: 'About Us', url: '/about' },
      { text: 'Our History', url: '/our-history' },
      { text: 'Leadership Team', url: '/leadership' }
    ]
  },

  // Admissions
  {
    keywords: ['admission', 'apply', 'application', 'enrollment', 'how to apply', 'admission process'],
    response: 'Ready to join us? Learn about our admission process, requirements, and submit your application online.',
    links: [
      { text: 'Admission Process', url: '/admission-process' },
      { text: 'Apply Now', url: '/application' },
      { text: 'Requirements', url: '/requirements' },
      { text: 'Admissions FAQ', url: '/admissions-faq' }
    ]
  },

  // Courses & Programs
  {
    keywords: ['courses', 'programs', 'study', 'subjects', 'curriculum', 'bca', 'bcom', 'bba', 'bsc'],
    response: 'Explore our diverse range of academic programs including BCA, BCOM, BBA, BSC IT, and more. Each program is designed to provide comprehensive education.',
    links: [{ text: 'View All Programs', url: '/programs' }]
  },

  // Faculty
  {
    keywords: ['faculty', 'teachers', 'professors', 'staff', 'instructors', 'departments'],
    response: 'Meet our experienced faculty members organized by departments: Computer Science, Commerce, Arts & Humanities, and Science.',
    links: [{ text: 'Faculty Directory', url: '/faculties' }]
  },

  // Scholarships
  {
    keywords: ['scholarship', 'financial aid', 'merit scholarship', 'sports scholarship', 'need based', 'funding'],
    response: 'We offer various scholarships including Merit Scholarships, Sports Excellence Scholarships, Need-Based Scholarships, and Special Category Scholarships. Apply online!',
    links: [{ text: 'Scholarship Information', url: '/scholarships' }]
  },

  // Campus
  {
    keywords: ['campus', 'facilities', 'infrastructure', 'visit', 'tour', 'location'],
    response: 'Explore our modern campus with state-of-the-art facilities. You can also schedule a campus visit to see everything in person.',
    links: [{ text: 'Campus Information', url: '/campus' }]
  },

  // Student Services
  {
    keywords: ['student desk', 'student services', 'student portal', 'student life'],
    response: 'Access various student services including academic records, fee payments, hostel information, and more through our Student Desk.',
    links: [{ text: 'Student Desk', url: '/student-desk' }]
  },

  // Results & Academic
  {
    keywords: ['results', 'grades', 'marks', 'academic results', 'exam results'],
    response: 'Check your academic results and examination scores. Results are updated regularly.',
    links: [{ text: 'View Results', url: '/results' }]
  },

  // Achievements
  {
    keywords: ['achievements', 'awards', 'accomplishments', 'success stories', 'toppers'],
    response: 'Discover our students\' achievements in academics, sports, and various competitions. We\'re proud of our academic toppers and sports champions.',
    links: [{ text: 'Our Achievements', url: '/achievements' }]
  },

  // News & Events
  {
    keywords: ['news', 'events', 'announcements', 'calendar', 'activities', 'upcoming'],
    response: 'Stay updated with the latest news, events, and announcements from our institution.',
    links: [
      { text: 'Latest News', url: '/news' },
      { text: 'Academic Calendar', url: '/calendar' }
    ]
  },

  // Contact
  {
    keywords: ['contact', 'phone', 'email', 'address', 'location', 'reach us', 'get in touch'],
    response: 'Get in touch with us! Find our contact information, location, and submit inquiries through our contact form.',
    links: [{ text: 'Contact Us', url: '/contact' }]
  },

  // Research
  {
    keywords: ['research', 'projects', 'publications', 'innovation'],
    response: 'Learn about our research initiatives, ongoing projects, and publications by our faculty and students.',
    links: [{ text: 'Research Information', url: '/research' }]
  },

  // Login & Admin
  {
    keywords: ['login', 'admin', 'sign in', 'account'],
    response: 'Access your account or administrative panel. Students and faculty can log in to access personalized services.',
    links: [
      { text: 'Login', url: '/login' },
      { text: 'Admin Panel', url: '/admin-panel' }
    ]
  },

  // Sports & Activities
  {
    keywords: ['sports', 'athletics', 'games', 'tournaments', 'extracurricular'],
    response: 'We encourage sports and extracurricular activities. Our students participate in various tournaments at state and national levels.',
    links: [{ text: 'Sports Achievements', url: '/achievements' }]
  },

  // Fees & Financial
  {
    keywords: ['fees', 'fee structure', 'payment', 'cost', 'tuition', 'financial'],
    response: 'Information about fee structure and payment options is available through our admissions section and student desk.',
    links: [
      { text: 'Admission Requirements', url: '/requirements' },
      { text: 'Student Desk', url: '/student-desk' }
    ]
  }
];

export const findRelevantResponse = (query: string): ChatQuery | null => {
  const lowerQuery = query.toLowerCase();
  
  // Find the most relevant response based on keyword matching
  for (const item of chatbotKnowledgeBase) {
    if (item.keywords.some(keyword => lowerQuery.includes(keyword))) {
      return item;
    }
  }
  
  return null;
};

export const getDefaultResponse = (): ChatQuery => ({
  keywords: [],
  response: 'I\'m here to help you navigate our website and answer questions about our institution. You can ask me about admissions, courses, faculty, scholarships, campus facilities, student services, and more!',
  links: [
    { text: 'Home', url: '/' },
    { text: 'About Us', url: '/about' },
    { text: 'Programs', url: '/programs' },
    { text: 'Admissions', url: '/admission-process' },
    { text: 'Contact', url: '/contact' }
  ]
});
