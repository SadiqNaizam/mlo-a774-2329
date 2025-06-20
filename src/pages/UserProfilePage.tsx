import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Layout Components
import AppHeader from '@/components/layout/AppHeader';
import AppBottomNavigationBar from '@/components/layout/AppBottomNavigationBar';
import StandardFooter from '@/components/layout/StandardFooter';

// Shadcn/ui Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from '@/components/ui/scroll-area';

// Lucide Icons
import { User as UserIcon, ShoppingBag, Settings, MapPin as AddressPinIcon, CreditCard, LogOut, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

// Mock User Data
const mockUser = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatarUrl: "https://source.unsplash.com/150x150/?portrait,person,smiling", // Placeholder image
  joinDate: "Joined March 2023",
};

interface ProfileLinkItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}

const ProfileLinkItem: React.FC<ProfileLinkItemProps> = ({ to, icon: Icon, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-lg"
  >
    <div className="flex items-center gap-3">
      <Icon className="h-5 w-5 text-primary" />
      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</span>
    </div>
    <ChevronRight className="h-5 w-5 text-muted-foreground" />
  </Link>
);

const UserProfilePage: React.FC = () => {
  const navigate = useNavigate();
  console.log('UserProfilePage loaded');

  const handleLogout = () => {
    console.log("User initiated logout.");
    toast.success("You have been logged out.", {
      description: "Redirecting to homepage...",
    });
    // Simulate logout process and redirect
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const profileLinks: ProfileLinkItemProps[] = [
    { to: "/orders", icon: ShoppingBag, label: "Order History" }, // Placeholder route
    { to: "/account-details", icon: Settings, label: "Account Details" }, // Placeholder route
    { to: "/addresses", icon: AddressPinIcon, label: "Address Book" }, // Placeholder route
    { to: "/payment-methods", icon: CreditCard, label: "Payment Methods" }, // Placeholder route
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900">
      <AppHeader />
      <ScrollArea className="flex-grow pb-20 md:pb-8">
        <main className="container mx-auto px-4 py-6 sm:py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-xl overflow-hidden dark:bg-slate-800">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 p-6 text-center">
                <div className="flex flex-col items-center space-y-3">
                  <Avatar className="h-24 w-24 border-4 border-white dark:border-slate-700 shadow-lg">
                    <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} />
                    <AvatarFallback className="text-3xl bg-primary/20 text-primary">
                      {mockUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">{mockUser.name}</CardTitle>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">{mockUser.email}</p>
                    <p className="text-xs text-muted-foreground dark:text-gray-500 mt-1">{mockUser.joinDate}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="divide-y dark:divide-slate-700">
                  {profileLinks.map((link) => (
                    <ProfileLinkItem key={link.label} {...link} />
                  ))}
                </nav>
                <Separator className="my-0 dark:bg-slate-700" />
                <div className="p-4">
                  <Button
                    variant="outline"
                    className="w-full text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive flex items-center gap-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </ScrollArea>
      <AppBottomNavigationBar />
      <div className="hidden md:block">
        <StandardFooter />
      </div>
    </div>
  );
};

export default UserProfilePage;