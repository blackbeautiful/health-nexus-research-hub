
import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, LucideIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '@/components/common/Logo';
import { Avatar } from '@/components/ui/avatar';
import { 
  LogOut,
  Briefcase,
  FlaskRound
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  sharedMenuItems,
  clinicalPracticeItems,
  researchStudyItems,
  adminMenuItems 
} from './sidebar/SidebarData';

interface MenuItem {
  title: string;
  icon: LucideIcon;
  url: string;
  items?: MenuItem[];
}

type AppMode = 'clinical' | 'research';

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const [appMode, setAppMode] = useState<AppMode>('clinical');
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get appMode from localStorage or set default to clinical
  useEffect(() => {
    const savedMode = localStorage.getItem('appMode') as AppMode;
    if (savedMode) {
      setAppMode(savedMode);
    }
  }, []);
  
  const isActive = (url: string) => {
    return location.pathname === url || (url !== '/' && location.pathname.startsWith(url));
  };

  const handleNavigation = (url: string) => {
    navigate(url);
    setOpen(false);
  };

  const handleModeChange = (value: string) => {
    const newMode = value as AppMode;
    setAppMode(newMode);
    localStorage.setItem('appMode', newMode);
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
            <div className="p-4 border-b flex flex-col space-y-4">
              <Logo />
              
              <Tabs 
                defaultValue={appMode} 
                className="w-full" 
                onValueChange={handleModeChange}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="clinical" className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    <span>Clinical</span>
                  </TabsTrigger>
                  <TabsTrigger value="research" className="flex items-center gap-1">
                    <FlaskRound className="h-4 w-4" />
                    <span>Research</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div>
                <h3 className="text-xs font-medium text-gray-500 mb-2 px-3">Main Navigation</h3>
                <div className="space-y-1">
                  {renderMenuItems(sharedMenuItems)}
                </div>
              </div>
              
              <Separator />
              
              {appMode === 'clinical' ? (
                <div>
                  <h3 className="text-xs font-medium text-gray-500 mb-2 px-3">Clinical Practice</h3>
                  <div className="space-y-1">
                    {renderMenuItems(clinicalPracticeItems)}
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-xs font-medium text-gray-500 mb-2 px-3">Research Studies</h3>
                  <div className="space-y-1">
                    {renderMenuItems(researchStudyItems)}
                  </div>
                </div>
              )}
              
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
