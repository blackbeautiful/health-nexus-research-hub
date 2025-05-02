
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
  FlaskRound,
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  MessageSquare,
  Building2,
  UserCog,
  Settings,
  ShieldAlert,
  Database,
  BarChart2,
  Stethoscope,
  TestTube,
  FileSearch,
  FileLock,
  Clipboard,
  LayoutIcon,
  Pill,
  HeartPulse,
  ChartBar,
  BookOpen,
  Microscope,
  Folder,
  BellRing,
  DatabaseZap
} from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Logo from '@/components/common/Logo';
import SidebarMenuGroup from './sidebar/SidebarMenuGroup';
import { MenuItemType } from './sidebar/SidebarMenuItem';

type AppMode = 'clinical' | 'research' | 'admin';
type UserRole = 'admin' | 'clinician' | 'researcher' | 'facility_admin';

const AppSidebar = () => {
  const navigate = useNavigate();
  const { state } = useSidebar();
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const [appMode, setAppMode] = useState<AppMode>('clinical');
  const [userRole, setUserRole] = useState<UserRole>('admin'); // Default for demo purposes
  
  // Get appMode from localStorage or set default to clinical
  useEffect(() => {
    const savedMode = localStorage.getItem('appMode') as AppMode;
    if (savedMode) {
      setAppMode(savedMode);
    }
    
    // In a real app, this would come from the authenticated user's profile
    const userRoleFromServer = localStorage.getItem('userRole') as UserRole;
    if (userRoleFromServer) {
      setUserRole(userRoleFromServer);
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

  // Dashboard navigation based on role and mode
  const handleDashboardClick = () => {
    if (userRole === 'admin') {
      navigate('/admin/dashboard');
    } else if (appMode === 'clinical') {
      navigate('/dashboard/clinical');
    } else if (appMode === 'research') {
      navigate('/dashboard/researcher');
    } else {
      navigate('/');
    }
  };

  // Common items available to all users
  const commonMenuItems: MenuItemType[] = [
    { 
      title: "Dashboard", 
      icon: LayoutDashboard, 
      url: "/", // Will be handled by handleDashboardClick
      onClick: handleDashboardClick
    },
    {
      title: "Messages",
      icon: MessageSquare,
      url: "/messages"
    },
    {
      title: "Calendar",
      icon: Calendar,
      url: "/appointments"
    }
  ];

  // Clinical module items
  const clinicalMenuItems: MenuItemType[] = [
    { 
      title: "Patients", 
      icon: Users, 
      url: "/patients",
      items: [
        { title: "Patient List", icon: Users, url: "/patients" },
        { title: "Register Patient", icon: Users, url: "/patients/register" },
        { title: "Clinical Information", icon: FileText, url: "/patients/clinical-information" },
        { title: "Insurance Information", icon: FileText, url: "/patients/insurance-information" }
      ]
    },
    { 
      title: "Clinical Workflows", 
      icon: Stethoscope, 
      url: "/clinical-workflows/notes",
      items: [
        { title: "Clinical Notes", icon: FileText, url: "/clinical-workflows/notes" },
        { title: "Prescriptions", icon: Pill, url: "/clinical-workflows/prescriptions" },
        { title: "Treatment Plans", icon: Clipboard, url: "/clinical-workflows/treatment-plans" },
        { title: "Medical Orders", icon: FileText, url: "/clinical-workflows/medical-orders" },
        { title: "Patient Education", icon: BookOpen, url: "/clinical-workflows/patient-education" }
      ]
    },
    { title: "Lab Results", icon: TestTube, url: "/lab-results" },
    { title: "Medical Records", icon: FileText, url: "/medical-records" },
    { title: "Patient Portal", icon: LayoutIcon, url: "/patient-portal/dashboard" },
    { title: "Clinical Reports", icon: ChartBar, url: "/clinical-reports" }
  ];

  // Research module items
  const researchMenuItems: MenuItemType[] = [
    { 
      title: "Studies", 
      icon: FlaskRound, 
      url: "/studies",
      items: [
        { title: "All Studies", icon: FlaskRound, url: "/studies" },
        { title: "Create Study", icon: FlaskRound, url: "/studies/create" },
        { title: "Protocol Documents", icon: Folder, url: "/studies/protocol-documents" },
        { title: "Consent Tracking", icon: Clipboard, url: "/studies/consent-tracking" }
      ]
    },
    { 
      title: "Participants", 
      icon: Users, 
      url: "/patients",
      items: [
        { title: "All Participants", icon: Users, url: "/patients" },
        { title: "Recruitment", icon: Users, url: "/patients/register" },
        { title: "Randomization", icon: Users, url: "/studies/patient-randomization" }
      ]
    },
    { 
      title: "Research Sites", 
      icon: Building2, 
      url: "/studies/sites"
    },
    { 
      title: "Data Collection", 
      icon: Database, 
      url: "/research-data/collection"
    },
    { 
      title: "Analytics", 
      icon: BarChart2, 
      url: "/analytics"
    },
    { 
      title: "Biospecimen", 
      icon: Microscope, 
      url: "/research-data/biospecimen"
    }
  ];

  // Admin items
  const adminMenuItems: MenuItemType[] = [
    { 
      title: "User Management", 
      icon: UserCog, 
      url: "/users",
      items: [
        { title: "Users List", icon: Users, url: "/users" },
        { title: "Roles & Permissions", icon: ShieldAlert, url: "/users/roles" },
        { title: "Access Requests", icon: Users, url: "/users/access-requests" }
      ]
    },
    { 
      title: "Facility Management", 
      icon: Building2, 
      url: "/facilities",
      items: [
        { title: "All Facilities", icon: Building2, url: "/facilities" },
        { title: "Onboarding", icon: Building2, url: "/onboarding/facility-setup" }
      ]
    },
    { 
      title: "Billing & Subscriptions", 
      icon: FileText, 
      url: "/settings/billing"
    },
    { 
      title: "Settings", 
      icon: Settings, 
      url: "/settings",
      items: [
        { title: "General Settings", icon: Settings, url: "/settings" },
        { title: "Notifications", icon: BellRing, url: "/settings/notifications" },
        { title: "System Configuration", icon: DatabaseZap, url: "/settings/system" }
      ]
    },
    { title: "Compliance", icon: ShieldAlert, url: "/compliance" },
    { title: "Audit Logs", icon: FileLock, url: "/audit-logs" }
  ];

  // Determine which menu items to show based on user role and app mode
  const getMenuItems = () => {
    if (appMode === 'admin' || userRole === 'admin') {
      return [
        { title: 'Administration', items: adminMenuItems },
        { title: 'Clinical Module', items: clinicalMenuItems },
        { title: 'Research Module', items: researchMenuItems }
      ];
    } else if (appMode === 'clinical') {
      return [
        { title: 'Main Navigation', items: commonMenuItems },
        { title: 'Clinical Practice', items: clinicalMenuItems },
        { title: 'Administration', items: adminMenuItems.filter(item => 
          ['Settings', 'Compliance'].includes(item.title))}
      ];
    } else {
      return [
        { title: 'Main Navigation', items: commonMenuItems },
        { title: 'Research Studies', items: researchMenuItems },
        { title: 'Administration', items: adminMenuItems.filter(item => 
          ['Settings', 'Compliance'].includes(item.title))}
      ];
    }
  };

  const menuGroups = getMenuItems();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-col justify-center items-center p-4 border-b space-y-4">
        <Logo />
        
        {state !== "collapsed" && userRole !== 'admin' && (
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
        
        {state !== "collapsed" && userRole === 'admin' && (
          <Tabs 
            defaultValue="admin" 
            className="w-full" 
            onValueChange={handleModeChange}
          >
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="admin" className="flex items-center gap-1">
                <Settings className="h-4 w-4" />
                <span>Admin Panel</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}
      </SidebarHeader>
      
      <SidebarContent>
        {menuGroups.map((group, index) => (
          <SidebarMenuGroup
            key={group.title}
            title={group.title}
            items={group.items}
            openGroups={openGroups}
            toggleGroup={toggleGroup}
            sidebarState={state}
            className={index > 0 ? "mt-6" : ""}
          />
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <div className="flex h-full w-full items-center justify-center bg-health-primary rounded-full text-white">
              {userRole === 'admin' ? 'SA' : 'DR'}
            </div>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {userRole === 'admin' ? 'System Admin' : 'Dr. Jane Roberts'}
            </span>
            <span className="text-xs text-gray-500">
              {userRole === 'admin' ? 'Super Admin' : 'Oncologist'}
            </span>
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
