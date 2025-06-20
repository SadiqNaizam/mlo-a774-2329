import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutGrid, ShoppingCart, User } from 'lucide-react';

const AppBottomNavigationBar: React.FC = () => {
  console.log('AppBottomNavigationBar loaded');

  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/product-listing', label: 'Categories', icon: LayoutGrid },
    { to: '/cart', label: 'Cart', icon: ShoppingCart },
    { to: '/profile', label: 'Profile', icon: User }, // Updated to Profile and link to /profile
  ];

  // Helper to determine if the icon should be filled (strokeWidth adjustment for demo)
  const getIconStrokeWidth = (isActive: boolean) => (isActive ? 2.5 : 2);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 border-t bg-background md:hidden">
      {navItems.map((item) => (
        <NavLink 
          key={item.label} 
          to={item.to} 
          className={({ isActive }) =>
            `flex flex-col items-center justify-center flex-1 py-2 px-1 text-xs transition-colors hover:text-primary ${
              isActive ? 'text-primary font-medium' : 'text-muted-foreground'
            }`
          }
          end={item.to === '/'} // `end` prop for exact matching on root path
        >
          {({ isActive }) => ( // Pass isActive to render prop
            <>
              <item.icon className="h-6 w-6 mb-0.5" strokeWidth={getIconStrokeWidth(isActive)} />
              <span>{item.label}</span>
            </>
          )}
        </NavLink>
      ))}\
    </nav>
  );
};

export default AppBottomNavigationBar;