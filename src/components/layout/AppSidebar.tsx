
import React, { useState } from 'react';
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
} from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Logo from '@/components/common/Logo';
import SidebarMenuGroup from './sidebar/SidebarMenuGroup';
import { mainMenuItems, adminMenuItems, portalMenuItems } from './sidebar/SidebarData';

const AppSidebar = () => {
  const navigate = useNavigate();
  const { state } = useSidebar();
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  
  const toggleGroup = (title: string) => {
    setOpenGroups(prev => 
      prev.includes(title) 
        ? prev.filter(group => group !== title) 
        : [...prev, title]
    );
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex justify-center items-center p-4 border-b">
        <Logo />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenuGroup
          title="Main Navigation"
          items={mainMenuItems}
          openGroups={openGroups}
          toggleGroup={toggleGroup}
          sidebarState={state}
        />

        <SidebarMenuGroup
          title="Patient Interaction"
          items={portalMenuItems}
          openGroups={openGroups}
          toggleGroup={toggleGroup}
          sidebarState={state}
          className="mt-6"
        />

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
