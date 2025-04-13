
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  LogOut
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const mainMenuItems = [
    { title: "Dashboard", icon: Home, url: "/" },
    { title: "Patients", icon: Users, url: "/patients" },
    { title: "Research Studies", icon: FileSearch, url: "/studies" },
    { title: "Clinical Data", icon: Stethoscope, url: "/clinical-data" },
    { title: "Lab Results", icon: TestTube, url: "/lab-results" },
    { title: "Analytics", icon: BarChart2, url: "/analytics" },
    { title: "Data Management", icon: Database, url: "/data" }
  ];

  const adminMenuItems = [
    { title: "User Management", icon: UserCog, url: "/users" },
    { title: "Settings", icon: Settings, url: "/settings" },
    { title: "Compliance", icon: ShieldAlert, url: "/compliance" },
    { title: "Audit Logs", icon: FileLock, url: "/audit-logs" }
  ];

  const handleNavigation = (url: string) => {
    navigate(url);
    setOpen(false);
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
                {mainMenuItems.map((item) => (
                  <Button
                    key={item.title}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleNavigation(item.url)}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Button>
                ))}
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-xs font-medium text-gray-500 mb-2 px-3">Administration</h3>
                <div className="space-y-1">
                  {adminMenuItems.map((item) => (
                    <Button
                      key={item.title}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => handleNavigation(item.url)}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Button>
                  ))}
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
                <Button variant="ghost" size="icon" className="ml-auto">
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
