
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { navigationLinks } from './navigationLinks';
import SearchBar from './SearchBar';
import AuthButton from './AuthButton';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              DAV College
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navigationLinks.map((section) => (
                <NavigationMenuItem key={section.label}>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    {section.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      {section.items.map((item) => (
                        <NavigationMenuLink key={item.href} asChild>
                          <Link
                            to={item.href}
                            className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                              isActive(item.href) ? 'bg-accent' : ''
                            }`}
                          >
                            <div className="text-sm font-medium leading-none">
                              {item.label}
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search and Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <SearchBar />
            <AuthButton />
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="py-4 space-y-2">
              {navigationLinks.map((section) => (
                <div key={section.label} className="space-y-2">
                  <div className="px-4 py-2 font-semibold text-gray-900 border-b">
                    {section.label}
                  </div>
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`block px-6 py-2 text-sm transition-colors hover:text-primary hover:bg-gray-50 ${
                        isActive(item.href) ? 'text-primary bg-gray-50' : 'text-gray-600'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
              <div className="px-4 py-2 space-y-2 border-t">
                <SearchBar />
                <AuthButton />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
