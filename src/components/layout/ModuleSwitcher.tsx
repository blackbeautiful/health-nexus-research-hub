import React from 'react';
import { Briefcase, FlaskRound, Settings } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

export type AppModule = 'clinical' | 'research' | 'admin';
export type UserRole = 'admin' | 'clinician' | 'researcher' | 'facility_admin' | 'nurse' | 'lab_tech' | 'receptionist' | 'pi' | 'coordinator' | 'patient' | 'participant';

interface ModuleSwitcherProps {
  currentModule: AppModule;
  userRole: UserRole;
  onModuleChange: (module: AppModule) => void;
  collapsed?: boolean;
}

const ModuleSwitcher = ({ currentModule, userRole, onModuleChange, collapsed = false }: ModuleSwitcherProps) => {
  const navigate = useNavigate();

  const canSwitchModes = () => {
    return !['patient', 'participant', 'receptionist', 'lab_tech'].includes(userRole);
  };

  const handleModuleChange = (value: string) => {
    const newModule = value as AppModule;
    onModuleChange(newModule);
    
    // Navigate to appropriate dashboard based on module
    switch (newModule) {
      case 'clinical':
        navigate('/clinical/dashboard');
        break;
      case 'research':
        navigate('/research/dashboard');
        break;
      case 'admin':
        navigate('/admin/dashboard');
        break;
    }
  };

  if (collapsed) {
    return null;
  }

  if (userRole === 'admin') {
    return (
      <div className="w-full">
        <Badge variant="outline" className="w-full justify-center py-2 bg-primary/10 text-primary border-primary/20">
          <Settings className="h-3 w-3 mr-1" />
          Admin Panel
        </Badge>
      </div>
    );
  }

  if (userRole === 'patient') {
    return (
      <div className="w-full">
        <Badge variant="outline" className="w-full justify-center py-2 bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800">
          <Briefcase className="h-3 w-3 mr-1" />
          Patient Portal
        </Badge>
      </div>
    );
  }

  if (userRole === 'participant') {
    return (
      <div className="w-full">
        <Badge variant="outline" className="w-full justify-center py-2 bg-green-50 text-green-600 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800">
          <FlaskRound className="h-3 w-3 mr-1" />
          Study Portal
        </Badge>
      </div>
    );
  }

  if (!canSwitchModes()) {
    return null;
  }

  return (
    <Tabs 
      value={currentModule}
      className="w-full" 
      onValueChange={handleModuleChange}
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
  );
};

export default ModuleSwitcher;