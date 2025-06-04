import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Command, 
  CommandDialog, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from "@/components/ui/command";
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchResult {
  id: string;
  title: string;
  category: string;
  url: string;
}

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Search results organized by category
  const searchResults: SearchResult[] = [
    // About
    { id: "about", title: "About Us", category: "About", url: "/about" },
    { id: "leadership", title: "Leadership", category: "About", url: "/leadership" },
    { id: "campus", title: "Campus", category: "About", url: "/campus" },
    { id: "achievements", title: "Achievements", category: "About", url: "/achievements" },
    
    // Academics
    { id: "programs", title: "Academic Programs", category: "Academics", url: "/programs" },
    { id: "faculties", title: "Faculties", category: "Academics", url: "/faculties" },
    { id: "research", title: "Research", category: "Academics", url: "/research" },
    { id: "calendar", title: "Academic Calendar", category: "Academics", url: "/calendar" },
    { id: "results", title: "Results", category: "Academics", url: "/results" },
    
    // Admissions
    { id: "application", title: "Apply Now", category: "Admissions", url: "/application" },
    { id: "process", title: "Admission Process", category: "Admissions", url: "/application-process" },
    { id: "scholarships", title: "Scholarships", category: "Admissions", url: "/scholarships" },
    { id: "requirements", title: "Requirements", category: "Admissions", url: "/requirements" },
    { id: "faq", title: "Admissions FAQ", category: "Admissions", url: "/admissions-faq" },
    
    // Other
    { id: "news", title: "News & Events", category: "Other", url: "/news" },
    { id: "contact", title: "Contact Us", category: "Other", url: "/contact" },
  ];

  // Filter results based on query
  const filteredResults = query === '' 
    ? searchResults 
    : searchResults.filter((item) => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  // Group results by category for display
  const groupedResults = filteredResults.reduce<Record<string, SearchResult[]>>((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  // Handle selecting a search result
  const handleSelect = (url: string) => {
    setOpen(false);
    navigate(url);
  };

  // Toggle search dialog with keyboard shortcut
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <div 
        className="relative w-full max-w-sm items-center flex cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Button
          variant="outline"
          className="relative w-full justify-between text-sm text-muted-foreground"
        >
          <Search className="mr-2 h-4 w-4" />
          <span>Search...</span>
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>
      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Search DAV College..." 
          value={query} 
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {Object.entries(groupedResults).map(([category, items]) => (
            <CommandGroup key={category} heading={category}>
              {items.map((item) => (
                <CommandItem 
                  key={item.id} 
                  onSelect={() => handleSelect(item.url)}
                >
                  <div>{item.title}</div>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchBar;
