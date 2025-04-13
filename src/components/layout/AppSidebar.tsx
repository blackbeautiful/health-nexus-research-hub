
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
  LogOut,
  MessageSquare,
  CalendarClock,
  Layout as LayoutIcon,
  User,
  Pill,
  BookOpen,
  LucideIcon
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Logo from '@/components/common/Logo';

interface MenuItem {
  title: string;
  icon: LucideIcon;
  url: string;
  items?: MenuItem[];
}

const AppSidebar = () => {
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

  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item) => (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton 
          asChild 
          onClick={() => navigate(item.url)}
          isActive={isActive(item.url)}
          tooltip={item.title}
        >
          <div className="flex items-center">
            <item.icon className="mr-2 h-4 w-4" />
            <span>{item.title}</span>
          </div>
        </SidebarMenuButton>
        
        {item.items && (
          <SidebarMenu>
            {item.items.map((subItem) => (
              <SidebarMenuItem key={subItem.title}>
                <SidebarMenuButton 
                  asChild 
                  onClick={() => navigate(subItem.url)} 
                  isActive={isActive(subItem.url)}
                  tooltip={subItem.title}
                >
                  <div className="flex items-center">
                    <subItem.icon className="mr-2 h-4 w-4" />
                    <span>{subItem.title}</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        )}
      </SidebarMenuItem>
    ));
  };

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
              {renderMenuItems(mainMenuItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel>Patient Interaction</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {renderMenuItems(portalMenuItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {renderMenuItems(adminMenuItems)}
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
          <Button variant="ghost" size="icon" className="ml-auto" onClick={() => navigate('/login')}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
