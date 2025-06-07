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
  const allPages = [
    // Dashboard Pages
    {
      title: 'Clinical Dashboard',
      path: '/dashboard/clinical',
      category: 'Dashboards',
      description: 'Main clinical operations dashboard',
      status: 'active'
    },
    {
      title: 'Researcher Dashboard',
      path: '/dashboard/researcher',
      category: 'Dashboards',
      description: 'Research operations dashboard',
      status: 'active'
    },
    {
      title: 'Admin Dashboard',
      path: '/dashboard/admin',
      category: 'Dashboards',
      description: 'Administrative dashboard',
      status: 'active'
    },
    {
      title: 'Patient Dashboard',
      path: '/dashboard/patient',
      category: 'Dashboards',
      description: 'Patient portal dashboard',
      status: 'active'
    },

    // Patient Management
    {
      title: 'Patient List',
      path: '/patients',
      category: 'Patient Management',
      description: 'Browse and manage patients',
      status: 'active'
    },
    {
      title: 'Patient Registration',
      path: '/patients/register',
      category: 'Patient Management',
      description: 'Register new patients',
      status: 'active'
    },
    {
      title: 'Clinical Information',
      path: '/patients/clinical-information',
      category: 'Patient Management',
      description: 'Patient clinical details',
      status: 'active'
    },
    {
      title: 'Insurance Information',
      path: '/patients/insurance-information',
      category: 'Patient Management',
      description: 'Patient insurance details',
      status: 'active'
    },

    // Clinical Workflows
    {
      title: 'Patient Check-In',
      path: '/clinical-workflows/check-in',
      category: 'Clinical Workflows',
      description: 'Patient check-in process',
      status: 'active'
    },
    {
      title: 'Clinical Queue',
      path: '/clinical-workflows/clinical-queue',
      category: 'Clinical Workflows',
      description: 'Patient queue management',
      status: 'active'
    },
    {
      title: 'Triage Assessment',
      path: '/clinical-workflows/triage',
      category: 'Clinical Workflows',
      description: 'Patient triage and prioritization',
      status: 'active'
    },
    {
      title: 'SOAP Notes',
      path: '/clinical-workflows/soap-notes',
      category: 'Clinical Workflows',
      description: 'Structured clinical notes',
      status: 'active'
    },
    {
      title: 'Clinical Notes',
      path: '/clinical-workflows/notes',
      category: 'Clinical Workflows',
      description: 'Clinical documentation',
      status: 'active'
    },
    {
      title: 'Prescriptions',
      path: '/clinical-workflows/prescriptions',
      category: 'Clinical Workflows',
      description: 'Medication prescriptions',
      status: 'active'
    },
    {
      title: 'Treatment Plans',
      path: '/clinical-workflows/treatment-plans',
      category: 'Clinical Workflows',
      description: 'Patient treatment planning',
      status: 'active'
    },
    {
      title: 'Medical Orders',
      path: '/clinical-workflows/medical-orders',
      category: 'Clinical Workflows',
      description: 'Medical order management',
      status: 'active'
    },
    {
      title: 'Patient Education',
      path: '/clinical-workflows/patient-education',
      category: 'Clinical Workflows',
      description: 'Educational materials and quizzes',
      status: 'active'
    },
    {
      title: 'Medications',
      path: '/clinical-workflows/medications',
      category: 'Clinical Workflows',
      description: 'Medication management',
      status: 'active'
    },
    {
      title: 'Discharge Planning',
      path: '/clinical-workflows/discharge',
      category: 'Clinical Workflows',
      description: 'Patient discharge process',
      status: 'active'
    },

    // Facility Management
    {
      title: 'Bed Management',
      path: '/facility-management/beds',
      category: 'Facility Management',
      description: 'Hospital bed allocation and tracking',
      status: 'active'
    },
    {
      title: 'Room Allocation',
      path: '/facility-management/rooms',
      category: 'Facility Management',
      description: 'Room assignment and capacity management',
      status: 'active'
    },
    {
      title: 'Equipment Tracking',
      path: '/facility-management/equipment',
      category: 'Facility Management',
      description: 'Medical equipment management',
      status: 'active'
    },
    {
      title: 'Maintenance',
      path: '/facility-management/maintenance',
      category: 'Facility Management',
      description: 'Facility maintenance scheduling',
      status: 'active'
    },

    // Staff Management
    {
      title: 'Staff Directory',
      path: '/staff-management/directory',
      category: 'Staff Management',
      description: 'Employee directory and contacts',
      status: 'active'
    },
    {
      title: 'Duty Schedules',
      path: '/staff-management/schedules',
      category: 'Staff Management',
      description: 'Staff scheduling and assignments',
      status: 'active'
    },
    {
      title: 'Shift Management',
      path: '/staff-management/shifts',
      category: 'Staff Management',
      description: 'Shift planning and coverage',
      status: 'active'
    },
    {
      title: 'Time Tracking',
      path: '/staff-management/time-tracking',
      category: 'Staff Management',
      description: 'Employee time and attendance',
      status: 'active'
    },
    {
      title: 'Leave Management',
      path: '/staff-management/leave',
      category: 'Staff Management',
      description: 'Employee leave requests and approval',
      status: 'active'
    },

    // HR Management
    {
      title: 'Employee Records',
      path: '/hr-management/employees',
      category: 'HR Management',
      description: 'Comprehensive employee information',
      status: 'active'
    },
    {
      title: 'Payroll',
      path: '/hr-management/payroll',
      category: 'HR Management',
      description: 'Payroll processing and management',
      status: 'active'
    },
    {
      title: 'Benefits',
      path: '/hr-management/benefits',
      category: 'HR Management',
      description: 'Employee benefits administration',
      status: 'active'
    },
    {
      title: 'Training & Certification',
      path: '/hr-management/training',
      category: 'HR Management',
      description: 'Employee training and certifications',
      status: 'active'
    },
    {
      title: 'Performance Reviews',
      path: '/hr-management/performance',
      category: 'HR Management',
      description: 'Employee performance evaluations',
      status: 'active'
    },

    // Medical Records
    {
      title: 'Medical Records',
      path: '/medical-records',
      category: 'Medical Records',
      description: 'Patient medical records overview',
      status: 'active'
    },
    {
      title: 'Patient History',
      path: '/medical-records/history',
      category: 'Medical Records',
      description: 'Patient medical history',
      status: 'active'
    },
    {
      title: 'Diagnoses',
      path: '/medical-records/diagnoses',
      category: 'Medical Records',
      description: 'Patient diagnoses and conditions',
      status: 'active'
    },
    {
      title: 'Imaging Results',
      path: '/medical-records/imaging',
      category: 'Medical Records',
      description: 'Medical imaging and scans',
      status: 'active'
    },
    {
      title: 'External Records',
      path: '/medical-records/external',
      category: 'Medical Records',
      description: 'External provider records',
      status: 'active'
    },

    // Clinical Data & Lab
    {
      title: 'Clinical Data',
      path: '/clinical-data',
      category: 'Clinical Data & Lab',
      description: 'Clinical data overview',
      status: 'active'
    },
    {
      title: 'Vital Signs',
      path: '/clinical-data/vitals',
      category: 'Clinical Data & Lab',
      description: 'Patient vital signs monitoring',
      status: 'active'
    },
    {
      title: 'Lab Results',
      path: '/lab-results',
      category: 'Clinical Data & Lab',
      description: 'Laboratory test results',
      status: 'active'
    },
    {
      title: 'Quality Control',
      path: '/lab/quality-control',
      category: 'Clinical Data & Lab',
      description: 'Lab quality control measures',
      status: 'active'
    },
    {
      title: 'Sample Management',
      path: '/lab/samples',
      category: 'Clinical Data & Lab',
      description: 'Laboratory sample tracking',
      status: 'active'
    },

    // Appointments & Communication
    {
      title: 'Appointments',
      path: '/appointments',
      category: 'Appointments & Communication',
      description: 'Appointment scheduling and management',
      status: 'active'
    },
    {
      title: 'Appointment Check-In',
      path: '/appointments/checkin',
      category: 'Appointments & Communication',
      description: 'Patient appointment check-in',
      status: 'active'
    },
    {
      title: 'Messages',
      path: '/messages',
      category: 'Appointments & Communication',
      description: 'Internal messaging system',
      status: 'active'
    },

    // Research Studies
    {
      title: 'Research Studies',
      path: '/studies',
      category: 'Research Studies',
      description: 'Research study management',
      status: 'active'
    },
    {
      title: 'Protocol Setup',
      path: '/studies/protocol-setup',
      category: 'Research Studies',
      description: 'Study protocol configuration',
      status: 'active'
    },
    {
      title: 'Study Sites',
      path: '/studies/sites',
      category: 'Research Studies',
      description: 'Multi-site study management',
      status: 'active'
    },
    {
      title: 'Protocol Documents',
      path: '/studies/protocol-documents',
      category: 'Research Studies',
      description: 'Study documentation',
      status: 'active'
    },
    {
      title: 'Consent Tracking',
      path: '/studies/consent-tracking',
      category: 'Research Studies',
      description: 'Patient consent management',
      status: 'active'
    },
    {
      title: 'Patient Randomization',
      path: '/studies/patient-randomization',
      category: 'Research Studies',
      description: 'Study randomization process',
      status: 'active'
    },
    {
      title: 'Protocol Deviations',
      path: '/studies/protocol-deviations',
      category: 'Research Studies',
      description: 'Track protocol deviations',
      status: 'active'
    },
    {
      title: 'Site Visits',
      path: '/studies/site-visits',
      category: 'Research Studies',
      description: 'Site monitoring visits',
      status: 'active'
    },
    {
      title: 'Study Finance',
      path: '/studies/finance',
      category: 'Research Studies',
      description: 'Study financial management',
      status: 'active'
    },
    {
      title: 'Quiz Management',
      path: '/studies/quiz-management',
      category: 'Research Studies',
      description: 'Patient education quizzes',
      status: 'active'
    },
    {
      title: 'Recruitment',
      path: '/studies/recruitment',
      category: 'Research Studies',
      description: 'Patient recruitment tools',
      status: 'active'
    },

    // Research Data
    {
      title: 'Data Collection',
      path: '/research-data/collection',
      category: 'Research Data',
      description: 'Research data collection',
      status: 'active'
    },
    {
      title: 'Data Exports',
      path: '/research-data/exports',
      category: 'Research Data',
      description: 'Export research data',
      status: 'active'
    },
    {
      title: 'Research Lab Results',
      path: '/research-data/lab-results',
      category: 'Research Data',
      description: 'Research laboratory results',
      status: 'active'
    },
    {
      title: 'Biospecimen Tracking',
      path: '/research-data/biospecimen',
      category: 'Research Data',
      description: 'Biospecimen management',
      status: 'active'
    },

    // Forms & Data
    {
      title: 'Form Builder',
      path: '/forms/builder',
      category: 'Forms & Data',
      description: 'Create custom forms',
      status: 'active'
    },
    {
      title: 'Case Report Forms',
      path: '/forms/crfs',
      category: 'Forms & Data',
      description: 'Clinical research forms',
      status: 'active'
    },
    {
      title: 'Data Queries',
      path: '/data/queries',
      category: 'Forms & Data',
      description: 'Data quality queries',
      status: 'active'
    },

    // Analytics & Reports
    {
      title: 'Analytics Overview',
      path: '/analytics',
      category: 'Analytics & Reports',
      description: 'Main analytics dashboard',
      status: 'active'
    },
    {
      title: 'Enrollment Analytics',
      path: '/analytics/enrollment',
      category: 'Analytics & Reports',
      description: 'Study enrollment metrics',
      status: 'active'
    },
    {
      title: 'Study Outcomes',
      path: '/analytics/outcomes',
      category: 'Analytics & Reports',
      description: 'Study outcome analysis',
      status: 'active'
    },
    {
      title: 'Site Performance',
      path: '/analytics/site-performance',
      category: 'Analytics & Reports',
      description: 'Site performance metrics',
      status: 'active'
    },
    {
      title: 'Data Quality',
      path: '/analytics/data-quality',
      category: 'Analytics & Reports',
      description: 'Data quality assessment',
      status: 'active'
    },
    {
      title: 'Geographic Distribution',
      path: '/analytics/geographic',
      category: 'Analytics & Reports',
      description: 'Geographic analytics',
      status: 'active'
    },
    {
      title: 'Usage Analytics',
      path: '/analytics/usage',
      category: 'Analytics & Reports',
      description: 'System usage statistics',
      status: 'active'
    },
    {
      title: 'Revenue Reports',
      path: '/analytics/revenue',
      category: 'Analytics & Reports',
      description: 'Financial reporting',
      status: 'active'
    },

    // Clinical Reports
    {
      title: 'Clinical Reports',
      path: '/clinical-reports',
      category: 'Clinical Reports',
      description: 'Clinical reporting overview',
      status: 'active'
    },
    {
      title: 'Treatment Outcomes',
      path: '/clinical-reports/outcomes',
      category: 'Clinical Reports',
      description: 'Patient treatment outcomes',
      status: 'active'
    },
    {
      title: 'Patient Analytics',
      path: '/clinical-reports/patient-analytics',
      category: 'Clinical Reports',
      description: 'Patient population analytics',
      status: 'active'
    },
    {
      title: 'Provider Metrics',
      path: '/clinical-reports/provider-metrics',
      category: 'Clinical Reports',
      description: 'Healthcare provider performance',
      status: 'active'
    },
    {
      title: 'Medication Reports',
      path: '/clinical-reports/medications',
      category: 'Clinical Reports',
      description: 'Medication usage reports',
      status: 'active'
    },
    {
      title: 'Handoff Reports',
      path: '/clinical-reports/handoff',
      category: 'Clinical Reports',
      description: 'Care transition reports',
      status: 'active'
    },

    // Administration
    {
      title: 'User Management',
      path: '/users',
      category: 'Administration',
      description: 'Manage system users',
      status: 'active'
    },
    {
      title: 'Roles & Permissions',
      path: '/users/roles',
      category: 'Administration',
      description: 'Configure user roles',
      status: 'active'
    },
    {
      title: 'Access Requests',
      path: '/users/access-requests',
      category: 'Administration',
      description: 'User access requests',
      status: 'active'
    },
    {
      title: 'Facilities',
      path: '/facilities',
      category: 'Administration',
      description: 'Facility management',
      status: 'active'
    },
    {
      title: 'Settings',
      path: '/settings',
      category: 'Administration',
      description: 'System settings',
      status: 'active'
    },
    {
      title: 'Billing',
      path: '/settings/billing',
      category: 'Administration',
      description: 'Billing configuration',
      status: 'active'
    },
    {
      title: 'Notifications',
      path: '/settings/notifications',
      category: 'Administration',
      description: 'Notification settings',
      status: 'active'
    },
    {
      title: 'System Configuration',
      path: '/settings/system',
      category: 'Administration',
      description: 'System configuration',
      status: 'active'
    },
    {
      title: 'Compliance',
      path: '/compliance',
      category: 'Administration',
      description: 'Compliance monitoring',
      status: 'active'
    },
    {
      title: 'Audit Logs',
      path: '/audit-logs',
      category: 'Administration',
      description: 'System audit trails',
      status: 'active'
    },

    // Support
    {
      title: 'Support',
      path: '/support',
      category: 'Support',
      description: 'Help and support center',
      status: 'active'
    },
    {
      title: 'Help Documentation',
      path: '/help',
      category: 'Support',
      description: 'User help documentation',
      status: 'active'
    }
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Comprehensive list of all pages and their information
  const allLinks: PageLink[] = allPages;

  const filteredLinks = allLinks.filter(link => {
    const matchesSearch = link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (link.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         link.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || link.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(allLinks.map(link => link.category))];

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
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'All Links' }
        ]}
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
                <div className="text-2xl font-bold text-primary">{allLinks.length}</div>
                <div className="text-sm text-muted-foreground">Total Pages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {allLinks.filter(link => link.status === 'active').length}
                </div>
                <div className="text-sm text-muted-foreground">Active Pages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">
                  {allLinks.filter(link => link.status === 'placeholder').length}
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
