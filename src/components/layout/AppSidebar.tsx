
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
  Settings,
  User
} from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/common/Logo';
import SidebarMenuGroup from './sidebar/SidebarMenuGroup';
import { 
  sharedMenuItems, 
  clinicalPracticeItems, 
  researchStudyItems, 
  adminMenuItems 
} from './sidebar/SidebarData';

type AppMode = 'clinical' | 'research' | 'admin';
type UserRole = 'admin' | 'clinician' | 'researcher' | 'facility_admin' | 'nurse' | 'lab_tech' | 'receptionist' | 'pi' | 'coordinator' | 'patient' | 'participant';

const AppSidebar = () => {
  const navigate = useNavigate();
  const { state } = useSidebar();
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const [appMode, setAppMode] = useState<AppMode>('clinical');
  const [userRole, setUserRole] = useState<UserRole>('clinician');
  
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
    
    // Navigate to appropriate dashboard based on mode
    switch (newMode) {
      case 'clinical':
        navigate('/dashboard/clinical');
        break;
      case 'research':
        navigate('/dashboard/researcher');
        break;
      case 'admin':
        navigate('/dashboard/admin');
        break;
    }
    
    console.log('App mode changed to:', newMode);
  };

  const handleRoleChange = (newRole: UserRole) => {
    setUserRole(newRole);
    localStorage.setItem('userRole', newRole);
    
    // Auto-switch mode and navigate to appropriate dashboard based on role
    switch (newRole) {
      case 'admin':
        setAppMode('admin');
        localStorage.setItem('appMode', 'admin');
        navigate('/dashboard/admin');
        break;
      case 'nurse':
        setAppMode('clinical');
        localStorage.setItem('appMode', 'clinical');
        navigate('/dashboard/nurse');
        break;
      case 'lab_tech':
        setAppMode('clinical');
        localStorage.setItem('appMode', 'clinical');
        navigate('/dashboard/lab-tech');
        break;
      case 'receptionist':
        setAppMode('clinical');
        localStorage.setItem('appMode', 'clinical');
        navigate('/dashboard/receptionist');
        break;
      case 'researcher':
        setAppMode('research');
        localStorage.setItem('appMode', 'research');
        navigate('/dashboard/researcher');
        break;
      case 'pi':
        setAppMode('research');
        localStorage.setItem('appMode', 'research');
        navigate('/dashboard/pi');
        break;
      case 'coordinator':
        setAppMode('research');
        localStorage.setItem('appMode', 'research');
        navigate('/dashboard/coordinator');
        break;
      case 'patient':
        navigate('/dashboard/patient');
        break;
      case 'participant':
        navigate('/dashboard/participant');
        break;
      case 'facility_admin':
        setAppMode('clinical');
        localStorage.setItem('appMode', 'clinical');
        navigate('/dashboard/clinical');
        break;
      default:
        setAppMode('clinical');
        localStorage.setItem('appMode', 'clinical');
        navigate('/dashboard/clinical');
        break;
    }
    
    console.log('User role changed to:', newRole);
  };

  const getFilteredMenuItems = (items: any[], role: UserRole) => {
    return items.filter(item => {
      // Admin sees everything
      if (role === 'admin') return true;
      
      // Role-specific filtering
      switch (role) {
        case 'patient':
          return ['Patients', 'Appointments', 'Messages', 'Medical Records'].includes(item.title);
        case 'participant':
          return ['Patients', 'Appointments', 'Messages', 'Research Studies'].includes(item.title);
        case 'receptionist':
          return ['Patients', 'Appointments', 'Messages', 'Clinical Workflows'].includes(item.title);
        case 'nurse':
          return !['Research Studies', 'Research Data', 'Analytics', 'User Management', 'HR Management'].includes(item.title);
        case 'lab_tech':
          return ['Patients', 'Diagnostics & Results', 'Laboratory', 'Messages', 'Clinical Data & Lab'].includes(item.title);
        case 'researcher':
        case 'pi':
        case 'coordinator':
          return !['Clinical Workflows', 'Facility Management', 'Staff Management'].includes(item.title);
        case 'facility_admin':
          return !['Research Studies', 'Research Data'].includes(item.title);
        default:
          return true;
      }
    });
  };

  const getMenuItems = () => {
    const baseItems = getFilteredMenuItems(sharedMenuItems, userRole);
    
    if (userRole === 'admin') {
      return [
        { title: 'Core Functions', items: baseItems },
        { title: 'Clinical Operations', items: getFilteredMenuItems(clinicalPracticeItems, userRole) },
        { title: 'Research Operations', items: getFilteredMenuItems(researchStudyItems, userRole) },
        { title: 'System Administration', items: adminMenuItems }
      ];
    }
    
    if (userRole === 'patient') {
      return [
        { title: 'Patient Portal', items: baseItems }
      ];
    }
    
    if (userRole === 'participant') {
      return [
        { title: 'Study Portal', items: baseItems }
      ];
    }
    
    if (appMode === 'clinical') {
      const clinicalItems = getFilteredMenuItems(clinicalPracticeItems, userRole);
      const adminItems = ['admin', 'facility_admin'].includes(userRole) ? 
        adminMenuItems.filter(item => !item.title.includes('Research')) : [];
      
      return [
        { title: 'Core Functions', items: baseItems },
        ...(clinicalItems.length > 0 ? [{ title: 'Clinical Operations', items: clinicalItems }] : []),
        ...(adminItems.length > 0 ? [{ title: 'Administration', items: adminItems }] : [])
      ];
    }
    
    if (appMode === 'research') {
      const researchItems = getFilteredMenuItems(researchStudyItems, userRole);
      const adminItems = ['admin', 'facility_admin'].includes(userRole) ? adminMenuItems : [];
      
      return [
        { title: 'Core Functions', items: baseItems },
        ...(researchItems.length > 0 ? [{ title: 'Research Operations', items: researchItems }] : []),
        ...(adminItems.length > 0 ? [{ title: 'Administration', items: adminItems }] : [])
      ];
    }
    
    return [
      { title: 'Core Functions', items: baseItems }
    ];
  };

  const getUserDisplayInfo = () => {
    const roleDisplayNames = {
      'admin': 'System Administrator',
      'clinician': 'Dr. Jane Roberts',
      'nurse': 'Nurse Sarah Wilson',
      'lab_tech': 'Lab Tech Mike Chen',
      'receptionist': 'Reception Staff',
      'researcher': 'Dr. Research Lead',
      'pi': 'Principal Investigator',
      'coordinator': 'Study Coordinator',
      'patient': 'Sarah Johnson',
      'participant': 'John Smith',
      'facility_admin': 'Facility Admin'
    };

    const roleSubtitles = {
      'admin': 'Super Admin',
      'clinician': 'Oncologist',
      'nurse': 'Registered Nurse',
      'lab_tech': 'Laboratory Technician',
      'receptionist': 'Front Office',
      'researcher': 'Research Scientist',
      'pi': 'Principal Investigator',
      'coordinator': 'Clinical Research',
      'patient': 'Patient',
      'participant': 'Study Participant',
      'facility_admin': 'Facility Administrator'
    };

    return {
      name: roleDisplayNames[userRole] || 'User',
      subtitle: roleSubtitles[userRole] || 'Staff Member',
      initials: userRole === 'patient' ? 'SJ' : userRole === 'participant' ? 'JS' : userRole === 'admin' ? 'SA' : userRole === 'nurse' ? 'SW' : userRole === 'lab_tech' ? 'MC' : 'DR'
    };
  };

  const canSwitchModes = () => {
    return !['patient', 'participant', 'receptionist', 'lab_tech'].includes(userRole);
  };

  const menuGroups = getMenuItems();
  const userInfo = getUserDisplayInfo();

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="flex flex-col justify-center items-center p-4 border-b space-y-4">
        <div className="flex items-center justify-between w-full">
          <Logo />
        </div>
        
        {/* Role Switcher for Testing */}
        {state !== "collapsed" && (
          <div className="w-full">
            <label className="text-xs text-muted-foreground mb-2 block">Switch Role (Testing)</label>
            <select 
              value={userRole} 
              onChange={(e) => handleRoleChange(e.target.value as UserRole)}
              className="w-full text-xs border rounded p-1 bg-background"
            >
              <option value="admin">Admin</option>
              <option value="clinician">Clinician</option>
              <option value="nurse">Nurse</option>
              <option value="lab_tech">Lab Tech</option>
              <option value="receptionist">Receptionist</option>
              <option value="researcher">Researcher</option>
              <option value="pi">Principal Investigator</option>
              <option value="coordinator">Coordinator</option>
              <option value="facility_admin">Facility Admin</option>
              <option value="patient">Patient</option>
              <option value="participant">Participant</option>
            </select>
          </div>
        )}
        
        {state !== "collapsed" && canSwitchModes() && userRole !== 'admin' && (
          <Tabs 
            value={appMode}
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

        {state !== "collapsed" && userRole === 'patient' && (
          <div className="w-full">
            <Badge variant="outline" className="w-full justify-center py-2 bg-blue-50 text-blue-600 border-blue-200">
              <User className="h-3 w-3 mr-1" />
              Patient Portal
            </Badge>
          </div>
        )}

        {state !== "collapsed" && userRole === 'participant' && (
          <div className="w-full">
            <Badge variant="outline" className="w-full justify-center py-2 bg-green-50 text-green-600 border-green-200">
              <FlaskRound className="h-3 w-3 mr-1" />
              Study Portal
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
            <div className="flex h-full w-full items-center justify-center bg-primary rounded-full text-primary-foreground text-xs font-medium">
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
