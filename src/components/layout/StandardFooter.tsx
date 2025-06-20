import React from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

const StandardFooter: React.FC = () => {
  console.log('StandardFooter loaded');
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { to: '/#terms', label: 'Terms of Service' }, // Using hash for placeholder
    { to: '/#privacy', label: 'Privacy Policy' },
    { to: '/#contact', label: 'Contact Us' },
  ];

  return (
    <footer className="bg-muted/40 border-t">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between text-sm">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <Package className="h-5 w-5 text-primary" />
          <span className="font-semibold">QuickDash</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 md:mb-0 text-muted-foreground">
          {footerLinks.map((link) => (
            <Link key={link.label} to={link.to} className="hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="text-center md:text-right">
          <p className="text-muted-foreground">
            &copy; {currentYear} QuickDash. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default StandardFooter;