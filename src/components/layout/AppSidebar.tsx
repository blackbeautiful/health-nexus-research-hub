
import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar";
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
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Logo from '@/components/common/Logo';

const AppSidebar = () => {
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

  return (
    <Sidebar>
      <SidebarHeader className="flex justify-center items-center p-4 border-b">
        <Logo />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild onClick={() => navigate(item.url)}>
                    <div className="flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild onClick={() => navigate(item.url)}>
                    <div className="flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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
          <Button variant="ghost" size="icon" className="ml-auto">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
