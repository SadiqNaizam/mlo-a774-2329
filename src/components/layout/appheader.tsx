import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Package, Search, User, MapPin } from 'lucide-react';
import LocationSelector from '@/components/LocationSelector'; // Assuming this component exists

const AppHeader: React.FC = () => {
  console.log('AppHeader loaded');

  // Placeholder for navigation links if needed in a mobile drawer
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/product-listing', label: 'Products' },
    { href: '/cart', label: 'Cart' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          {/* Mobile Menu Trigger - if bottom nav is not enough */}
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

          {/* Logo/Name - visible on md and up or if no mobile menu trigger */}
          <Link to="/" className="hidden md:flex items-center gap-2 mr-4">
            <Package className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">QuickDash</span>
          </Link>
        </div>

        {/* Location Selector */}
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-muted-foreground hidden sm:block" />
          <LocationSelector />
        </div>

        {/* Search Bar - more prominent on larger screens */}
        <div className="flex-1 max-w-md hidden md:flex justify-center">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for products..."
              className="pl-10 w-full"
              // Add search logic/handler here
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Search Icon - for smaller screens, links to product listing */}
          <Button variant="ghost" size="icon" className="md:hidden" asChild>
            <Link to="/product-listing">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>

          {/* User/Account Icon */}
          <Button variant="ghost" size="icon" asChild>
            <Link to="/"> {/* Placeholder link, e.g. to /account or /profile */}
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