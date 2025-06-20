import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutGrid, ShoppingCart, User } from 'lucide-react';

const AppBottomNavigationBar: React.FC = () => {
  console.log('AppBottomNavigationBar loaded');

  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/product-listing', label: 'Categories', icon: LayoutGrid },
    { to: '/cart', label: 'Cart', icon: ShoppingCart },
    { to: '/', label: 'Account', icon: User }, // Placeholder for Account/Orders
  ];

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center flex-1 py-2 px-1 text-xs transition-colors hover:text-primary ${
      isActive ? 'text-primary font-medium' : 'text-muted-foreground'
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 border-t bg-background md:hidden">
      {navItems.map((item) => (
        <NavLink key={item.label} to={item.to} className={navLinkClasses} end={item.to === '/'}>
          <item.icon className="h-6 w-6 mb-0.5" strokeWidth={isActive => isActive ? 2.5 : 2} />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default AppBottomNavigationBar;