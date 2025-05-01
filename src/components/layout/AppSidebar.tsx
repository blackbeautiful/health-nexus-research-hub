
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarFooter,
  useSidebar
} from "@/components/ui/sidebar";
import { 
  LogOut,
  Briefcase,
  FlaskRound
} from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Logo from '@/components/common/Logo';
import SidebarMenuGroup from './sidebar/SidebarMenuGroup';
import { 
  sharedMenuItems, 
  clinicalPracticeItems, 
  researchStudyItems, 
  adminMenuItems 
} from './sidebar/SidebarData';

type AppMode = 'clinical' | 'research';

const AppSidebar = () => {
  const navigate = useNavigate();
  const { state } = useSidebar();
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const [appMode, setAppMode] = useState<AppMode>('clinical');
  
  // Get appMode from localStorage or set default to clinical
  useEffect(() => {
    const savedMode = localStorage.getItem('appMode') as AppMode;
    if (savedMode) {
      setAppMode(savedMode);
    }
  }, []);
  
  const toggleGroup = (title: string) => {
    setOpenGroups(prev => 
      prev.includes(title) 
        ? prev.filter(group => group !== title) 
        : [...prev, title]
    );
  };

  const handleModeChange = (value: string) => {
    const newMode = value as AppMode;
    setAppMode(newMode);
    localStorage.setItem('appMode', newMode);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-col justify-center items-center p-4 border-b space-y-4">
        <Logo />
        
        {state !== "collapsed" && (
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
        )}
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenuGroup
          title="Main Navigation"
          items={sharedMenuItems}
          openGroups={openGroups}
          toggleGroup={toggleGroup}
          sidebarState={state}
        />

        {appMode === 'clinical' ? (
          <SidebarMenuGroup
            title="Clinical Practice"
            items={clinicalPracticeItems}
            openGroups={openGroups}
            toggleGroup={toggleGroup}
            sidebarState={state}
            className="mt-6"
          />
        ) : (
          <SidebarMenuGroup
            title="Research Studies"
            items={researchStudyItems}
            openGroups={openGroups}
            toggleGroup={toggleGroup}
            sidebarState={state}
            className="mt-6"
          />
        )}

        <SidebarMenuGroup
          title="Administration"
          items={adminMenuItems}
          openGroups={openGroups}
          toggleGroup={toggleGroup}
          sidebarState={state}
          className="mt-6"
        />
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
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
          <Button variant="ghost" size="icon" className="ml-auto" onClick={() => navigate('/login')}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
