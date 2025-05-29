
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
  DatabaseZap,
  Activity,
  UserCheck,
  MonitorSpeaker,
  ClipboardCheck,
  Thermometer,
  Syringe,
  Brain,
  Eye,
  Heart,
  Zap,
  Scan,
  PlusCircle,
  Shield,
  Archive,
  Clock,
  DollarSign,
  Mail
} from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/common/Logo';
import SidebarMenuGroup from './sidebar/SidebarMenuGroup';
import { MenuItemType } from './sidebar/SidebarMenuItem';

type AppMode = 'clinical' | 'research' | 'admin';
type UserRole = 'admin' | 'clinician' | 'researcher' | 'facility_admin' | 'nurse' | 'lab_tech' | 'receptionist' | 'pi' | 'coordinator';

const AppSidebar = () => {
  const navigate = useNavigate();
  const { state } = useSidebar();
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const [appMode, setAppMode] = useState<AppMode>('clinical');
  const [userRole, setUserRole] = useState<UserRole>('admin');
  
  useEffect(() => {
    const savedMode = localStorage.getItem('appMode') as AppMode;
    if (savedMode) {
      setAppMode(savedMode);
    }
    
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

  // Role-specific menu configurations
  const getMenuForRole = () => {
    switch (userRole) {
      case 'admin':
        return getAdminMenu();
      case 'clinician':
        return getClinicianMenu();
      case 'nurse':
        return getNurseMenu();
      case 'lab_tech':
        return getLabTechMenu();
      case 'receptionist':
        return getReceptionistMenu();
      case 'researcher':
      case 'pi':
        return getResearcherMenu();
      case 'coordinator':
        return getCoordinatorMenu();
      default:
        return getDefaultMenu();
    }
  };

  const getAdminMenu = () => [
    {
      title: 'Platform Administration',
      items: [
        { title: "Master Dashboard", icon: LayoutDashboard, url: "/admin/dashboard" },
        { 
          title: "Facility Management", 
          icon: Building2, 
          url: "/facilities",
          items: [
            { title: "All Facilities", icon: Building2, url: "/facilities" },
            { title: "Pending Approvals", icon: Clock, url: "/facilities?tab=pending" },
            { title: "Facility Setup", icon: PlusCircle, url: "/onboarding/facility-setup" }
          ]
        },
        { 
          title: "User Management", 
          icon: UserCog, 
          url: "/users",
          items: [
            { title: "All Users", icon: Users, url: "/users" },
            { title: "Roles & Permissions", icon: ShieldAlert, url: "/users/roles" },
            { title: "Access Requests", icon: UserCheck, url: "/users/access-requests" }
          ]
        },
        { 
          title: "Billing & Revenue", 
          icon: DollarSign, 
          url: "/settings/billing",
          items: [
            { title: "Subscriptions", icon: Archive, url: "/settings/billing" },
            { title: "Usage Analytics", icon: BarChart2, url: "/analytics/usage" },
            { title: "Revenue Reports", icon: ChartBar, url: "/analytics/revenue" }
          ]
        }
      ]
    },
    {
      title: 'Clinical Operations',
      items: [
        { title: "All Patients", icon: Users, url: "/patients" },
        { title: "Clinical Data", icon: Database, url: "/clinical-data" },
        { title: "Compliance", icon: Shield, url: "/compliance" },
        { title: "Audit Logs", icon: FileLock, url: "/audit-logs" }
      ]
    },
    {
      title: 'Research Operations',
      items: [
        { title: "All Studies", icon: FlaskRound, url: "/studies" },
        { title: "Research Analytics", icon: BarChart2, url: "/analytics" },
        { title: "Data Quality", icon: DatabaseZap, url: "/analytics/data-quality" }
      ]
    },
    {
      title: 'System Settings',
      items: [
        { title: "Platform Settings", icon: Settings, url: "/settings/system" },
        { title: "Notifications", icon: BellRing, url: "/settings/notifications" },
        { title: "Support Tickets", icon: Mail, url: "/support" }
      ]
    }
  ];

  const getClinicianMenu = () => [
    {
      title: 'Patient Care',
      items: [
        { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard/clinical", onClick: handleDashboardClick },
        { 
          title: "My Patients", 
          icon: Users, 
          url: "/patients",
          items: [
            { title: "Active Patients", icon: Users, url: "/patients?status=active" },
            { title: "Patient Registration", icon: PlusCircle, url: "/patients/register" },
            { title: "Patient History", icon: Archive, url: "/medical-records/history" }
          ]
        },
        { 
          title: "Clinical Workflows", 
          icon: Stethoscope, 
          url: "/clinical-workflows/notes",
          items: [
            { title: "Clinical Notes", icon: FileText, url: "/clinical-workflows/notes" },
            { title: "Prescriptions", icon: Pill, url: "/clinical-workflows/prescriptions" },
            { title: "Treatment Plans", icon: HeartPulse, url: "/clinical-workflows/treatment-plans" },
            { title: "Medical Orders", icon: ClipboardCheck, url: "/clinical-workflows/medical-orders" }
          ]
        }
      ]
    },
    {
      title: 'Diagnostics & Results',
      items: [
        { title: "Lab Results", icon: TestTube, url: "/lab-results" },
        { title: "Imaging Results", icon: Scan, url: "/medical-records/imaging" },
        { title: "Vital Signs", icon: Activity, url: "/clinical-data/vitals" }
      ]
    },
    {
      title: 'Schedule & Communication',
      items: [
        { title: "Appointments", icon: Calendar, url: "/appointments" },
        { title: "Messages", icon: MessageSquare, url: "/messages" },
        { title: "Clinical Reports", icon: ChartBar, url: "/clinical-reports" }
      ]
    }
  ];

  const getNurseMenu = () => [
    {
      title: 'Patient Care',
      items: [
        { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard/clinical", onClick: handleDashboardClick },
        { title: "My Patients", icon: Users, url: "/patients" },
        { title: "Vital Signs", icon: Activity, url: "/clinical-data/vitals" },
        { title: "Medication Admin", icon: Pill, url: "/clinical-workflows/medications" }
      ]
    },
    {
      title: 'Daily Tasks',
      items: [
        { title: "Nursing Notes", icon: FileText, url: "/clinical-workflows/nursing-notes" },
        { title: "Patient Education", icon: BookOpen, url: "/clinical-workflows/patient-education" },
        { title: "Discharge Planning", icon: Archive, url: "/clinical-workflows/discharge" }
      ]
    },
    {
      title: 'Communication',
      items: [
        { title: "Messages", icon: MessageSquare, url: "/messages" },
        { title: "Handoff Reports", icon: FileText, url: "/reports/handoff" }
      ]
    }
  ];

  const getLabTechMenu = () => [
    {
      title: 'Laboratory',
      items: [
        { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard/clinical", onClick: handleDashboardClick },
        { title: "Pending Tests", icon: TestTube, url: "/lab-results?status=pending" },
        { title: "Lab Results", icon: TestTube, url: "/lab-results" },
        { title: "Quality Control", icon: Shield, url: "/lab/quality-control" }
      ]
    },
    {
      title: 'Sample Management',
      items: [
        { title: "Sample Tracking", icon: Microscope, url: "/lab/samples" },
        { title: "Biospecimen Bank", icon: DatabaseZap, url: "/research-data/biospecimen" }
      ]
    }
  ];

  const getReceptionistMenu = () => [
    {
      title: 'Front Office',
      items: [
        { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard/clinical", onClick: handleDashboardClick },
        { title: "Patient Registration", icon: PlusCircle, url: "/patients/register" },
        { title: "Appointment Scheduling", icon: Calendar, url: "/appointments" },
        { title: "Check-in/Check-out", icon: ClipboardCheck, url: "/appointments/checkin" }
      ]
    },
    {
      title: 'Patient Services',
      items: [
        { title: "Insurance Verification", icon: Shield, url: "/patients/insurance-information" },
        { title: "Patient Portal Support", icon: LayoutIcon, url: "/patient-portal/support" },
        { title: "Messages", icon: MessageSquare, url: "/messages" }
      ]
    }
  ];

  const getResearcherMenu = () => [
    {
      title: 'Research Management',
      items: [
        { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard/researcher", onClick: handleDashboardClick },
        { 
          title: "My Studies", 
          icon: FlaskRound, 
          url: "/studies",
          items: [
            { title: "Active Studies", icon: FlaskRound, url: "/studies?status=active" },
            { title: "Create Study", icon: PlusCircle, url: "/studies/create" },
            { title: "Study Sites", icon: Building2, url: "/studies/sites" }
          ]
        },
        { 
          title: "Participants", 
          icon: Users, 
          url: "/patients",
          items: [
            { title: "All Participants", icon: Users, url: "/patients" },
            { title: "Recruitment", icon: UserCheck, url: "/studies/recruitment" },
            { title: "Consent Tracking", icon: Clipboard, url: "/studies/consent-tracking" }
          ]
        }
      ]
    },
    {
      title: 'Data & Analytics',
      items: [
        { title: "Data Collection", icon: Database, url: "/research-data/collection" },
        { title: "Form Builder", icon: FileText, url: "/forms/builder" },
        { title: "Analytics", icon: BarChart2, url: "/analytics" },
        { title: "Data Exports", icon: Archive, url: "/research-data/exports" }
      ]
    }
  ];

  const getCoordinatorMenu = () => [
    {
      title: 'Study Coordination',
      items: [
        { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard/researcher", onClick: handleDashboardClick },
        { title: "Study Management", icon: FlaskRound, url: "/studies" },
        { title: "Participant Scheduling", icon: Calendar, url: "/appointments" },
        { title: "Protocol Compliance", icon: Shield, url: "/compliance" }
      ]
    },
    {
      title: 'Data Management',
      items: [
        { title: "Data Entry", icon: Database, url: "/research-data/collection" },
        { title: "CRF Management", icon: FileText, url: "/forms/crfs" },
        { title: "Query Resolution", icon: MessageSquare, url: "/data/queries" }
      ]
    }
  ];

  const getDefaultMenu = () => [
    {
      title: 'Main Navigation',
      items: [
        { title: "Dashboard", icon: LayoutDashboard, url: "/", onClick: handleDashboardClick },
        { title: "Messages", icon: MessageSquare, url: "/messages" },
        { title: "Calendar", icon: Calendar, url: "/appointments" }
      ]
    }
  ];

  const menuGroups = getMenuForRole();

  const getUserDisplayInfo = () => {
    const roleDisplayNames = {
      'admin': 'System Administrator',
      'clinician': 'Dr. Jane Roberts',
      'nurse': 'Nurse Sarah Wilson',
      'lab_tech': 'Lab Tech Mike Chen',
      'receptionist': 'Reception Staff',
      'researcher': 'Dr. Research Lead',
      'pi': 'Principal Investigator',
      'coordinator': 'Study Coordinator'
    };

    const roleSubtitles = {
      'admin': 'Super Admin',
      'clinician': 'Oncologist',
      'nurse': 'Registered Nurse',
      'lab_tech': 'Laboratory Technician',
      'receptionist': 'Front Office',
      'researcher': 'Research Scientist',
      'pi': 'Principal Investigator',
      'coordinator': 'Clinical Research'
    };

    return {
      name: roleDisplayNames[userRole] || 'User',
      subtitle: roleSubtitles[userRole] || 'Staff Member',
      initials: userRole === 'admin' ? 'SA' : 'DR'
    };
  };

  const userInfo = getUserDisplayInfo();

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="flex flex-col justify-center items-center p-4 border-b space-y-4">
        <Logo />
        
        {state !== "collapsed" && userRole !== 'admin' && (
          <Tabs 
            defaultValue={appMode} 
            className="w-full" 
            onValueChange={handleModeChange}
          >
            <TabsList className="grid w-full grid-cols-2 h-10 p-1 bg-muted/50 rounded-lg border">
              <TabsTrigger 
                value="clinical" 
                className="h-8 px-3 text-xs font-medium transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border"
              >
                <Briefcase className="h-3 w-3 mr-1" />
                <span>Clinical</span>
              </TabsTrigger>
              <TabsTrigger 
                value="research" 
                className="h-8 px-3 text-xs font-medium transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border"
              >
                <FlaskRound className="h-3 w-3 mr-1" />
                <span>Research</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}
        
        {state !== "collapsed" && userRole === 'admin' && (
          <div className="w-full">
            <Badge variant="outline" className="w-full justify-center py-2 bg-primary/10 text-primary border-primary/20">
              <Settings className="h-3 w-3 mr-1" />
              Admin Panel
            </Badge>
          </div>
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
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <div className="flex h-full w-full items-center justify-center bg-health-primary rounded-full text-white text-xs font-medium">
              {userInfo.initials}
            </div>
          </Avatar>
          {state !== "collapsed" && (
            <>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-medium truncate">{userInfo.name}</span>
                <span className="text-xs text-muted-foreground truncate">{userInfo.subtitle}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={() => navigate('/login')}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
