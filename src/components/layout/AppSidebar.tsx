
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
  User
} from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Logo from '@/components/common/Logo';
import SidebarMenuGroup from './sidebar/SidebarMenuGroup';
import ModuleSwitcher, { AppModule, UserRole } from './ModuleSwitcher';
import { sharedMenuItems, adminMenuItems } from '@/modules/shared/data/menuItems';
import { clinicalMenuItems } from '@/modules/clinical/data/menuItems';
import { researchMenuItems } from '@/modules/research/data/menuItems';

const AppSidebar = () => {
  const navigate = useNavigate();
  const { state } = useSidebar();
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const [appModule, setAppModule] = useState<AppModule>('clinical');
  const [userRole, setUserRole] = useState<UserRole>('clinician');
  
  useEffect(() => {
    const savedModule = localStorage.getItem('appModule') as AppModule;
    if (savedModule) {
      setAppModule(savedModule);
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

  const handleModuleChange = (newModule: AppModule) => {
    setAppModule(newModule);
    localStorage.setItem('appModule', newModule);
    console.log('App module changed to:', newModule);
  };

  const handleRoleChange = (newRole: UserRole) => {
    setUserRole(newRole);
    localStorage.setItem('userRole', newRole);
    
    // Auto-switch module and navigate to appropriate dashboard based on role
    switch (newRole) {
      case 'admin':
        setAppModule('admin');
        localStorage.setItem('appModule', 'admin');
        navigate('/admin/dashboard');
        break;
      case 'nurse':
        setAppModule('clinical');
        localStorage.setItem('appModule', 'clinical');
        navigate('/clinical/dashboard');
        break;
      case 'lab_tech':
        setAppModule('clinical');
        localStorage.setItem('appModule', 'clinical');
        navigate('/clinical/dashboard');
        break;
      case 'receptionist':
        setAppModule('clinical');
        localStorage.setItem('appModule', 'clinical');
        navigate('/clinical/dashboard');
        break;
      case 'researcher':
        setAppModule('research');
        localStorage.setItem('appModule', 'research');
        navigate('/research/dashboard');
        break;
      case 'pi':
        setAppModule('research');
        localStorage.setItem('appModule', 'research');
        navigate('/research/dashboard');
        break;
      case 'coordinator':
        setAppModule('research');
        localStorage.setItem('appModule', 'research');
        navigate('/research/dashboard');
        break;
      case 'patient':
        navigate('/patient/dashboard');
        break;
      case 'participant':
        navigate('/participant/dashboard');
        break;
      case 'facility_admin':
        setAppModule('clinical');
        localStorage.setItem('appModule', 'clinical');
        navigate('/clinical/dashboard');
        break;
      default:
        setAppModule('clinical');
        localStorage.setItem('appModule', 'clinical');
        navigate('/clinical/dashboard');
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
        { title: 'Clinical Operations', items: getFilteredMenuItems(clinicalMenuItems, userRole) },
        { title: 'Research Operations', items: getFilteredMenuItems(researchMenuItems, userRole) },
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
    
    if (appModule === 'clinical') {
      const clinicalItems = getFilteredMenuItems(clinicalMenuItems, userRole);
      const adminItems = ['admin', 'facility_admin'].includes(userRole) ? 
        adminMenuItems.filter(item => !item.title.includes('Research')) : [];
      
      return [
        { title: 'Core Functions', items: baseItems },
        ...(clinicalItems.length > 0 ? [{ title: 'Clinical Operations', items: clinicalItems }] : []),
        ...(adminItems.length > 0 ? [{ title: 'Administration', items: adminItems }] : [])
      ];
    }
    
    if (appModule === 'research') {
      const researchItems = getFilteredMenuItems(researchMenuItems, userRole);
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
        
        <ModuleSwitcher 
          currentModule={appModule}
          userRole={userRole}
          onModuleChange={handleModuleChange}
          collapsed={state === "collapsed"}
        />
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
