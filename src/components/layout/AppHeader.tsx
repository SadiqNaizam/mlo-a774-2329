import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Package, Search, User } from 'lucide-react'; // MapPin removed as it's handled by LocationSelector
import LocationSelector from '@/components/LocationSelector';
import { ThemeToggle } from '@/components/ThemeToggle'; // Import ThemeToggle

const AppHeader: React.FC = () => {
  console.log('AppHeader loaded');

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/product-listing', label: 'Products' },
    { href: '/cart', label: 'Cart' },
    { href: '/profile', label: 'Profile' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Group 1: Logo and Mobile Menu */}
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 p-6">
                  <Link to="/" className="flex items-center gap-2 mb-4">
                    <Package className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">QuickDash</span>
                  </Link>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <Link to="/" className="hidden md:flex items-center gap-2 mr-4">
            <Package className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">QuickDash</span>
          </Link>
        </div>

        {/* Middle section: Location Selector (desktop) and Search Bar (desktop) */}
        {/* This div ensures that these elements are somewhat centered and Search bar can take flex-1 */}
        <div className="flex-grow flex items-center justify-center md:gap-4 lg:gap-6 px-2">
          {/* Location Selector - visible on md and up */}
          <div className="hidden md:flex items-center">
            <LocationSelector />
          </div>

          {/* Search Bar - more prominent on larger screens, takes available space */}
          <div className="hidden md:flex flex-1 max-w-lg"> {/* max-w-lg or similar for search bar width */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="pl-10 w-full"
              />
            </div>
          </div>
        </div>

        {/* Right-aligned Icons: Search (mobile), ThemeToggle, User */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" className="md:hidden" asChild>
            <Link to="/product-listing">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>

          <ThemeToggle /> {/* Added ThemeToggle here */}

          <Button variant="ghost" size="icon" asChild>
            <Link to="/profile">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;