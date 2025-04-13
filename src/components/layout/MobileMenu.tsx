
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, LucideIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '@/components/common/Logo';
import { Avatar } from '@/components/ui/avatar';
import { 
  Home, 
  Users, 
  FileText, 
  Database, 
  BarChart2, 
  Settings, 
  ShieldAlert,
  TestTube,
  Stethoscope,
  FileSearch,
  UserCog,
  FileLock,
  LogOut,
  MessageSquare,
  CalendarClock,
  Layout as LayoutIcon,
  User,
  Pill,
  BookOpen
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface MenuItem {
  title: string;
  icon: LucideIcon;
  url: string;
  items?: MenuItem[];
}

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (url: string) => {
    return location.pathname === url || (url !== '/' && location.pathname.startsWith(url));
  };

  const mainMenuItems: MenuItem[] = [
    { title: "Dashboard", icon: Home, url: "/" },
    { 
      title: "Patients", 
      icon: Users, 
      url: "/patients",
      items: [
        { title: "Patient List", icon: Users, url: "/patients" },
        { title: "Register Patient", icon: User, url: "/patients/register" }
      ]
    },
    { 
      title: "Research Studies", 
      icon: FileSearch, 
      url: "/studies",
      items: [
        { title: "Studies Overview", icon: BookOpen, url: "/studies" },
        { title: "Protocol Setup", icon: FileSearch, url: "/studies/protocol-setup" }
      ]
    },
    { 
      title: "Clinical Workflows", 
      icon: Stethoscope, 
      url: "/clinical-workflows",
      items: [
        { title: "Clinical Notes", icon: FileText, url: "/clinical-workflows/notes" },
        { title: "Orders", icon: Pill, url: "/clinical-workflows/orders" }
      ]
    },
    { title: "Clinical Data", icon: Database, url: "/clinical-data" },
    { title: "Lab Results", icon: TestTube, url: "/lab-results" },
    { title: "Analytics", icon: BarChart2, url: "/analytics" }
  ];

  const adminMenuItems: MenuItem[] = [
    { title: "User Management", icon: UserCog, url: "/users" },
    { title: "Settings", icon: Settings, url: "/settings" },
    { title: "Compliance", icon: ShieldAlert, url: "/compliance" },
    { title: "Audit Logs", icon: FileLock, url: "/audit-logs" }
  ];
  
  const portalMenuItems: MenuItem[] = [
    { title: "Patient Portal", icon: LayoutIcon, url: "/patient-portal/dashboard" },
    { title: "Messages", icon: MessageSquare, url: "/messages" },
    { title: "Appointments", icon: CalendarClock, url: "/appointments" }
  ];

  const handleNavigation = (url: string) => {
    navigate(url);
    setOpen(false);
  };

  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item) => (
      <div key={item.title}>
        <Button
          variant={isActive(item.url) ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => handleNavigation(item.url)}
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.title}
        </Button>
        
        {item.items && (
          <div className="pl-6 space-y-1 mt-1">
            {item.items.map((subItem) => (
              <Button
                key={subItem.title}
                variant={isActive(subItem.url) ? "secondary" : "ghost"}
                size="sm"
                className="w-full justify-start"
                onClick={() => handleNavigation(subItem.url)}
              >
                <subItem.icon className="mr-2 h-3 w-3" />
                {subItem.title}
              </Button>
            ))}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="absolute top-4 left-4 z-20">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[85%] p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <Logo />
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div className="space-y-1">
                {renderMenuItems(mainMenuItems)}
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-xs font-medium text-gray-500 mb-2 px-3">Patient Interaction</h3>
                <div className="space-y-1">
                  {renderMenuItems(portalMenuItems)}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-xs font-medium text-gray-500 mb-2 px-3">Administration</h3>
                <div className="space-y-1">
                  {renderMenuItems(adminMenuItems)}
                </div>
              </div>
            </div>
            
            <div className="border-t p-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <div className="flex h-full w-full items-center justify-center bg-health-primary rounded-full text-white">
                    DR
                  </div>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Dr. Jane Roberts</span>
                  <span className="text-xs text-gray-500">Oncologist</span>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto" onClick={() => handleNavigation('/login')}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
