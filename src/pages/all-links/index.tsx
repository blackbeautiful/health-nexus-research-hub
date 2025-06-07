import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  ExternalLink, 
  FileText, 
  Users, 
  Calendar, 
  Settings, 
  Database, 
  BarChart2, 
  TestTube, 
  FlaskRound, 
  Building2, 
  UserCog, 
  ShieldAlert, 
  MessageSquare, 
  Stethoscope, 
  Activity, 
  CheckCircle, 
  HeartPulse, 
  Pill, 
  BookOpen, 
  Microscope, 
  Folder, 
  Mail, 
  User, 
  PlusCircle,
  Home,
  Shield,
  Bed,
  CalendarCheck,
  DollarSign,
  Heart,
  UserX,
  MonitorSpeaker,
  Clock
} from 'lucide-react';

interface PageLink {
  title: string;
  path: string;
  category: string;
  description?: string;
  icon: React.ComponentType<any>;
  roles?: string[];
  status: 'active' | 'placeholder' | 'missing';
}

const AllLinksPage = () => {
  const allPages: PageLink[] = [
    // Dashboard Pages
    {
      title: 'Clinical Dashboard',
      path: '/dashboard/clinical',
      category: 'Dashboards',
      description: 'Main clinical operations dashboard',
      icon: Activity,
      status: 'active'
    },
    {
      title: 'Researcher Dashboard',
      path: '/dashboard/researcher',
      category: 'Dashboards',
      description: 'Research operations dashboard',
      icon: TestTube,
      status: 'active'
    },
    {
      title: 'Admin Dashboard',
      path: '/dashboard/admin',
      category: 'Dashboards',
      description: 'Administrative dashboard',
      icon: Settings,
      status: 'active'
    },
    {
      title: 'Patient Dashboard',
      path: '/dashboard/patient',
      category: 'Dashboards',
      description: 'Patient portal dashboard',
      icon: User,
      status: 'active'
    },

    // Patient Management
    {
      title: 'Patient List',
      path: '/patients',
      category: 'Patient Management',
      description: 'Browse and manage patients',
      icon: Users,
      status: 'active'
    },
    {
      title: 'Patient Registration',
      path: '/patients/register',
      category: 'Patient Management',
      description: 'Register new patients',
      icon: PlusCircle,
      status: 'active'
    },
    {
      title: 'Clinical Information',
      path: '/patients/clinical-information',
      category: 'Patient Management',
      description: 'Patient clinical details',
      icon: Stethoscope,
      status: 'active'
    },
    {
      title: 'Insurance Information',
      path: '/patients/insurance-information',
      category: 'Patient Management',
      description: 'Patient insurance details',
      icon: Shield,
      status: 'active'
    },

    // Clinical Workflows
    {
      title: 'Patient Check-In',
      path: '/clinical-workflows/check-in',
      category: 'Clinical Workflows',
      description: 'Patient check-in process',
      icon: CheckCircle,
      status: 'active'
    },
    {
      title: 'Clinical Queue',
      path: '/clinical-workflows/clinical-queue',
      category: 'Clinical Workflows',
      description: 'Patient queue management',
      icon: Users,
      status: 'active'
    },
    {
      title: 'Triage Assessment',
      path: '/clinical-workflows/triage',
      category: 'Clinical Workflows',
      description: 'Patient triage and prioritization',
      icon: HeartPulse,
      status: 'active'
    },
    {
      title: 'SOAP Notes',
      path: '/clinical-workflows/soap-notes',
      category: 'Clinical Workflows',
      description: 'Structured clinical notes',
      icon: FileText,
      status: 'active'
    },
    {
      title: 'Clinical Notes',
      path: '/clinical-workflows/notes',
      category: 'Clinical Workflows',
      description: 'Clinical documentation',
      icon: FileText,
      status: 'active'
    },
    {
      title: 'Prescriptions',
      path: '/clinical-workflows/prescriptions',
      category: 'Clinical Workflows',
      description: 'Medication prescriptions',
      icon: Pill,
      status: 'active'
    },
    {
      title: 'Treatment Plans',
      path: '/clinical-workflows/treatment-plans',
      category: 'Clinical Workflows',
      description: 'Patient treatment planning',
      icon: Heart,
      status: 'active'
    },
    {
      title: 'Medical Orders',
      path: '/clinical-workflows/medical-orders',
      category: 'Clinical Workflows',
      description: 'Medical order management',
      icon: FileText,
      status: 'active'
    },
    {
      title: 'Patient Education',
      path: '/clinical-workflows/patient-education',
      category: 'Clinical Workflows',
      description: 'Educational materials and quizzes',
      icon: BookOpen,
      status: 'active'
    },
    {
      title: 'Medications',
      path: '/clinical-workflows/medications',
      category: 'Clinical Workflows',
      description: 'Medication management',
      icon: Pill,
      status: 'active'
    },
    {
      title: 'Discharge Planning',
      path: '/clinical-workflows/discharge',
      category: 'Clinical Workflows',
      description: 'Patient discharge process',
      icon: UserX,
      status: 'active'
    },

    // Facility Management
    {
      title: 'Bed Management',
      path: '/facility-management/beds',
      category: 'Facility Management',
      description: 'Hospital bed allocation and tracking',
      icon: Bed,
      status: 'active'
    },
    {
      title: 'Room Allocation',
      path: '/facility-management/rooms',
      category: 'Facility Management',
      description: 'Room assignment and capacity management',
      icon: Building2,
      status: 'active'
    },
    {
      title: 'Equipment Tracking',
      path: '/facility-management/equipment',
      category: 'Facility Management',
      description: 'Medical equipment management',
      icon: MonitorSpeaker,
      status: 'active'
    },
    {
      title: 'Maintenance',
      path: '/facility-management/maintenance',
      category: 'Facility Management',
      description: 'Facility maintenance scheduling',
      icon: Settings,
      status: 'active'
    },

    // Staff Management
    {
      title: 'Staff Directory',
      path: '/staff-management/directory',
      category: 'Staff Management',
      description: 'Employee directory and contacts',
      icon: Users,
      status: 'active'
    },
    {
      title: 'Duty Schedules',
      path: '/staff-management/schedules',
      category: 'Staff Management',
      description: 'Staff scheduling and assignments',
      icon: Calendar,
      status: 'active'
    },
    {
      title: 'Shift Management',
      path: '/staff-management/shifts',
      category: 'Staff Management',
      description: 'Shift planning and coverage',
      icon: Clock,
      status: 'active'
    },
    {
      title: 'Time Tracking',
      path: '/staff-management/time-tracking',
      category: 'Staff Management',
      description: 'Employee time and attendance',
      icon: Clock,
      status: 'active'
    },
    {
      title: 'Leave Management',
      path: '/staff-management/leave',
      category: 'Staff Management',
      description: 'Employee leave requests and approval',
      icon: CalendarCheck,
      status: 'active'
    },

    // HR Management
    {
      title: 'Employee Records',
      path: '/hr-management/employees',
      category: 'HR Management',
      description: 'Comprehensive employee information',
      icon: UserCog,
      status: 'active'
    },
    {
      title: 'Payroll',
      path: '/hr-management/payroll',
      category: 'HR Management',
      description: 'Payroll processing and management',
      icon: DollarSign,
      status: 'active'
    },
    {
      title: 'Benefits',
      path: '/hr-management/benefits',
      category: 'HR Management',
      description: 'Employee benefits administration',
      icon: Shield,
      status: 'active'
    },
    {
      title: 'Training & Certification',
      path: '/hr-management/training',
      category: 'HR Management',
      description: 'Employee training and certifications',
      icon: BookOpen,
      status: 'active'
    },
    {
      title: 'Performance Reviews',
      path: '/hr-management/performance',
      category: 'HR Management',
      description: 'Employee performance evaluations',
      icon: BarChart2,
      status: 'active'
    },

    // Medical Records
    {
      title: 'Medical Records',
      path: '/medical-records',
      category: 'Medical Records',
      description: 'Patient medical records overview',
      icon: Folder,
      status: 'active'
    },
    {
      title: 'Patient History',
      path: '/medical-records/history',
      category: 'Medical Records',
      description: 'Patient medical history',
      icon: FileText,
      status: 'active'
    },
    {
      title: 'Diagnoses',
      path: '/medical-records/diagnoses',
      category: 'Medical Records',
      description: 'Patient diagnoses and conditions',
      icon: Stethoscope,
      status: 'active'
    },
    {
      title: 'Imaging Results',
      path: '/medical-records/imaging',
      category: 'Medical Records',
      description: 'Medical imaging and scans',
      icon: MonitorSpeaker,
      status: 'active'
    },
    {
      title: 'External Records',
      path: '/medical-records/external',
      category: 'Medical Records',
      description: 'External provider records',
      icon: ExternalLink,
      status: 'active'
    },

    // Clinical Data & Lab
    {
      title: 'Clinical Data',
      path: '/clinical-data',
      category: 'Clinical Data & Lab',
      description: 'Clinical data overview',
      icon: Database,
      status: 'active'
    },
    {
      title: 'Vital Signs',
      path: '/clinical-data/vitals',
      category: 'Clinical Data & Lab',
      description: 'Patient vital signs monitoring',
      icon: Activity,
      status: 'active'
    },
    {
      title: 'Lab Results',
      path: '/lab-results',
      category: 'Clinical Data & Lab',
      description: 'Laboratory test results',
      icon: TestTube,
      status: 'active'
    },
    {
      title: 'Quality Control',
      path: '/lab/quality-control',
      category: 'Clinical Data & Lab',
      description: 'Lab quality control measures',
      icon: CheckCircle,
      status: 'active'
    },
    {
      title: 'Sample Management',
      path: '/lab/samples',
      category: 'Clinical Data & Lab',
      description: 'Laboratory sample tracking',
      icon: FlaskRound,
      status: 'active'
    },

    // Appointments & Communication
    {
      title: 'Appointments',
      path: '/appointments',
      category: 'Appointments & Communication',
      description: 'Appointment scheduling and management',
      icon: Calendar,
      status: 'active'
    },
    {
      title: 'Appointment Check-In',
      path: '/appointments/checkin',
      category: 'Appointments & Communication',
      description: 'Patient appointment check-in',
      icon: CheckCircle,
      status: 'active'
    },
    {
      title: 'Messages',
      path: '/messages',
      category: 'Appointments & Communication',
      description: 'Internal messaging system',
      icon: MessageSquare,
      status: 'active'
    },

    // Research Studies
    {
      title: 'Research Studies',
      path: '/studies',
      category: 'Research Studies',
      description: 'Research study management',
      icon: TestTube,
      status: 'active'
    },
    {
      title: 'Protocol Setup',
      path: '/studies/protocol-setup',
      category: 'Research Studies',
      description: 'Study protocol configuration',
      icon: Settings,
      status: 'active'
    },
    {
      title: 'Study Sites',
      path: '/studies/sites',
      category: 'Research Studies',
      description: 'Multi-site study management',
      icon: Building2,
      status: 'active'
    },
    {
      title: 'Protocol Documents',
      path: '/studies/protocol-documents',
      category: 'Research Studies',
      description: 'Study documentation',
      icon: FileText,
      status: 'active'
    },
    {
      title: 'Consent Tracking',
      path: '/studies/consent-tracking',
      category: 'Research Studies',
      description: 'Patient consent management',
      icon: Shield,
      status: 'active'
    },
    {
      title: 'Patient Randomization',
      path: '/studies/patient-randomization',
      category: 'Research Studies',
      description: 'Study randomization process',
      icon: Users,
      status: 'active'
    },
    {
      title: 'Protocol Deviations',
      path: '/studies/protocol-deviations',
      category: 'Research Studies',
      description: 'Track protocol deviations',
      icon: ShieldAlert,
      status: 'active'
    },
    {
      title: 'Site Visits',
      path: '/studies/site-visits',
      category: 'Research Studies',
      description: 'Site monitoring visits',
      icon: Calendar,
      status: 'active'
    },
    {
      title: 'Study Finance',
      path: '/studies/finance',
      category: 'Research Studies',
      description: 'Study financial management',
      icon: DollarSign,
      status: 'active'
    },
    {
      title: 'Quiz Management',
      path: '/studies/quiz-management',
      category: 'Research Studies',
      description: 'Patient education quizzes',
      icon: BookOpen,
      status: 'active'
    },
    {
      title: 'Recruitment',
      path: '/studies/recruitment',
      category: 'Research Studies',
      description: 'Patient recruitment tools',
      icon: Users,
      status: 'active'
    },

    // Research Data
    {
      title: 'Data Collection',
      path: '/research-data/collection',
      category: 'Research Data',
      description: 'Research data collection',
      icon: Database,
      status: 'active'
    },
    {
      title: 'Data Exports',
      path: '/research-data/exports',
      category: 'Research Data',
      description: 'Export research data',
      icon: ExternalLink,
      status: 'active'
    },
    {
      title: 'Research Lab Results',
      path: '/research-data/lab-results',
      category: 'Research Data',
      description: 'Research laboratory results',
      icon: Microscope,
      status: 'active'
    },
    {
      title: 'Biospecimen Tracking',
      path: '/research-data/biospecimen',
      category: 'Research Data',
      description: 'Biospecimen management',
      icon: FlaskRound,
      status: 'active'
    },

    // Forms & Data
    {
      title: 'Form Builder',
      path: '/forms/builder',
      category: 'Forms & Data',
      description: 'Create custom forms',
      icon: PlusCircle,
      status: 'active'
    },
    {
      title: 'Case Report Forms',
      path: '/forms/crfs',
      category: 'Forms & Data',
      description: 'Clinical research forms',
      icon: FileText,
      status: 'active'
    },
    {
      title: 'Data Queries',
      path: '/data/queries',
      category: 'Forms & Data',
      description: 'Data quality queries',
      icon: Search,
      status: 'active'
    },

    // Analytics & Reports
    {
      title: 'Analytics Overview',
      path: '/analytics',
      category: 'Analytics & Reports',
      description: 'Main analytics dashboard',
      icon: BarChart2,
      status: 'active'
    },
    {
      title: 'Enrollment Analytics',
      path: '/analytics/enrollment',
      category: 'Analytics & Reports',
      description: 'Study enrollment metrics',
      icon: Users,
      status: 'active'
    },
    {
      title: 'Study Outcomes',
      path: '/analytics/outcomes',
      category: 'Analytics & Reports',
      description: 'Study outcome analysis',
      icon: BarChart2,
      status: 'active'
    },
    {
      title: 'Site Performance',
      path: '/analytics/site-performance',
      category: 'Analytics & Reports',
      description: 'Site performance metrics',
      icon: Activity,
      status: 'active'
    },
    {
      title: 'Data Quality',
      path: '/analytics/data-quality',
      category: 'Analytics & Reports',
      description: 'Data quality assessment',
      icon: CheckCircle,
      status: 'active'
    },
    {
      title: 'Geographic Distribution',
      path: '/analytics/geographic',
      category: 'Analytics & Reports',
      description: 'Geographic analytics',
      icon: BarChart2,
      status: 'active'
    },
    {
      title: 'Usage Analytics',
      path: '/analytics/usage',
      category: 'Analytics & Reports',
      description: 'System usage statistics',
      icon: Activity,
      status: 'active'
    },
    {
      title: 'Revenue Reports',
      path: '/analytics/revenue',
      category: 'Analytics & Reports',
      description: 'Financial reporting',
      icon: DollarSign,
      status: 'active'
    },

    // Clinical Reports
    {
      title: 'Clinical Reports',
      path: '/clinical-reports',
      category: 'Clinical Reports',
      description: 'Clinical reporting overview',
      icon: FileText,
      status: 'active'
    },
    {
      title: 'Treatment Outcomes',
      path: '/clinical-reports/outcomes',
      category: 'Clinical Reports',
      description: 'Patient treatment outcomes',
      icon: BarChart2,
      status: 'active'
    },
    {
      title: 'Patient Analytics',
      path: '/clinical-reports/patient-analytics',
      category: 'Clinical Reports',
      description: 'Patient population analytics',
      icon: Users,
      status: 'active'
    },
    {
      title: 'Provider Metrics',
      path: '/clinical-reports/provider-metrics',
      category: 'Clinical Reports',
      description: 'Healthcare provider performance',
      icon: UserCog,
      status: 'active'
    },
    {
      title: 'Medication Reports',
      path: '/clinical-reports/medications',
      category: 'Clinical Reports',
      description: 'Medication usage reports',
      icon: Pill,
      status: 'active'
    },
    {
      title: 'Handoff Reports',
      path: '/clinical-reports/handoff',
      category: 'Clinical Reports',
      description: 'Care transition reports',
      icon: Users,
      status: 'active'
    },

    // Administration
    {
      title: 'User Management',
      path: '/users',
      category: 'Administration',
      description: 'Manage system users',
      icon: Users,
      status: 'active'
    },
    {
      title: 'Roles & Permissions',
      path: '/users/roles',
      category: 'Administration',
      description: 'Configure user roles',
      icon: UserCog,
      status: 'active'
    },
    {
      title: 'Access Requests',
      path: '/users/access-requests',
      category: 'Administration',
      description: 'User access requests',
      icon: Shield,
      status: 'active'
    },
    {
      title: 'Facilities',
      path: '/facilities',
      category: 'Administration',
      description: 'Facility management',
      icon: Building2,
      status: 'active'
    },
    {
      title: 'Settings',
      path: '/settings',
      category: 'Administration',
      description: 'System settings',
      icon: Settings,
      status: 'active'
    },
    {
      title: 'Billing',
      path: '/settings/billing',
      category: 'Administration',
      description: 'Billing configuration',
      icon: DollarSign,
      status: 'active'
    },
    {
      title: 'Notifications',
      path: '/settings/notifications',
      category: 'Administration',
      description: 'Notification settings',
      icon: MessageSquare,
      status: 'active'
    },
    {
      title: 'System Configuration',
      path: '/settings/system',
      category: 'Administration',
      description: 'System configuration',
      icon: Settings,
      status: 'active'
    },
    {
      title: 'Compliance',
      path: '/compliance',
      category: 'Administration',
      description: 'Compliance monitoring',
      icon: ShieldAlert,
      status: 'active'
    },
    {
      title: 'Audit Logs',
      path: '/audit-logs',
      category: 'Administration',
      description: 'System audit trails',
      icon: FileText,
      status: 'active'
    },

    // Support
    {
      title: 'Support',
      path: '/support',
      category: 'Support',
      description: 'Help and support center',
      icon: MessageSquare,
      status: 'active'
    },
    {
      title: 'Help Documentation',
      path: '/help',
      category: 'Support',
      description: 'User help documentation',
      icon: BookOpen,
      status: 'active'
    }
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredLinks = allPages.filter(link => {
    const matchesSearch = link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (link.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         link.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || link.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(allPages.map(link => link.category))];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'placeholder': return 'secondary';
      case 'missing': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <MainLayout>
      <PageHeader
        title="All Application Links"
        description="Complete directory of all pages and features in the HealthNexus platform"
      />

      <div className="space-y-6">
        {/* Search and Filter Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
            <CardDescription>Find specific pages or browse by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search pages, features, or descriptions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full md:w-auto">
                <TabsList className="grid grid-cols-5 w-full md:w-auto">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="Clinical Workflows">Clinical</TabsTrigger>
                  <TabsTrigger value="Research">Research</TabsTrigger>
                  <TabsTrigger value="Administration">Admin</TabsTrigger>
                  <TabsTrigger value="Patient Management">Patients</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLinks.map((link, index) => {
            const IconComponent = link.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <IconComponent size={20} className="text-primary" />
                      <CardTitle className="text-base">{link.title}</CardTitle>
                    </div>
                    <Badge variant={getStatusColor(link.status)}>
                      {link.category}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">{link.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <code className="text-xs bg-muted px-2 py-1 rounded">{link.path}</code>
                    <div className="flex items-center gap-2">
                      {link.status === 'placeholder' && (
                        <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => window.open(link.path, '_blank')}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ExternalLink size={16} />
                      </Button>
                    </div>
                  </div>
                  {link.roles && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {link.roles.map((role, roleIndex) => (
                        <Badge key={roleIndex} variant="outline" className="text-xs">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredLinks.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No links found matching your search criteria.</p>
            </CardContent>
          </Card>
        )}

        {/* Summary Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Statistics</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 min-w-fit">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{allPages.length}</div>
                <div className="text-sm text-muted-foreground">Total Pages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {allPages.filter(link => link.status === 'active').length}
                </div>
                <div className="text-sm text-muted-foreground">Active Pages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">
                  {allPages.filter(link => link.status === 'placeholder').length}
                </div>
                <div className="text-sm text-muted-foreground">Coming Soon</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{categories.length}</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AllLinksPage;
