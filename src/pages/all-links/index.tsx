
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Comprehensive list of all pages and their information
  const allLinks: PageLink[] = [
    // Authentication
    { title: "Login", path: "/login", category: "Authentication", description: "User authentication", icon: User, status: 'active' },
    { title: "Register", path: "/register", category: "Authentication", description: "User registration", icon: User, status: 'active' },
    { title: "Forgot Password", path: "/forgot-password", category: "Authentication", description: "Password recovery", icon: User, status: 'active' },

    // Dashboards
    { title: "Clinical Dashboard", path: "/dashboard/clinical", category: "Dashboards", description: "Clinical practice overview", icon: Stethoscope, status: 'active' },
    { title: "Researcher Dashboard", path: "/dashboard/researcher", category: "Dashboards", description: "Research activities overview", icon: FlaskRound, status: 'active' },
    { title: "Admin Dashboard", path: "/dashboard/admin", category: "Dashboards", description: "Administrative controls", icon: Settings, status: 'active' },
    { title: "Patient Dashboard", path: "/dashboard/patient", category: "Dashboards", description: "Patient portal", icon: User, status: 'active' },

    // Patient Management
    { title: "Patient List", path: "/patients", category: "Patient Management", description: "View all patients", icon: Users, status: 'active' },
    { title: "Patient Details", path: "/patients/patient-123", category: "Patient Management", description: "Individual patient information", icon: User, status: 'active' },
    { title: "Patient Registration", path: "/patients/register", category: "Patient Management", description: "Register new patient", icon: User, status: 'active' },
    { title: "Clinical Information", path: "/patients/clinical-information", category: "Patient Management", description: "Patient clinical data", icon: FileText, status: 'active' },
    { title: "Insurance Information", path: "/patients/insurance-information", category: "Patient Management", description: "Patient insurance details", icon: FileText, status: 'active' },

    // Clinical Workflows
    { title: "Patient Check-In", path: "/clinical-workflows/check-in", category: "Clinical Workflows", description: "Patient check-in process", icon: CheckCircle, status: 'active' },
    { title: "Clinical Queue", path: "/clinical-workflows/clinical-queue", category: "Clinical Workflows", description: "View clinical queue", icon: Users, status: 'active' },
    { title: "Triage Assessment", path: "/clinical-workflows/triage", category: "Clinical Workflows", description: "Patient triage", icon: Activity, status: 'active' },
    { title: "SOAP Notes", path: "/clinical-workflows/soap-notes", category: "Clinical Workflows", description: "Clinical documentation", icon: FileText, status: 'active' },
    { title: "Clinical Notes", path: "/clinical-workflows/notes", category: "Clinical Workflows", description: "General clinical notes", icon: FileText, status: 'active' },
    { title: "New Clinical Note", path: "/clinical-workflows/notes/new", category: "Clinical Workflows", description: "Create new clinical note", icon: FileText, status: 'active' },
    { title: "Nursing Notes", path: "/clinical-workflows/nursing-notes", category: "Clinical Workflows", description: "Nursing documentation", icon: FileText, status: 'active' },
    { title: "New Nursing Note", path: "/clinical-workflows/nursing-notes/new", category: "Clinical Workflows", description: "Create new nursing note", icon: FileText, status: 'active' },
    { title: "Prescriptions", path: "/clinical-workflows/prescriptions", category: "Clinical Workflows", description: "Manage prescriptions", icon: FileText, status: 'active' },
    { title: "New Prescription", path: "/clinical-workflows/prescriptions/new", category: "Clinical Workflows", description: "Create new prescription", icon: FileText, status: 'active' },
    { title: "Treatment Plans", path: "/clinical-workflows/treatment-plans", category: "Clinical Workflows", description: "Patient treatment plans", icon: FileText, status: 'active' },
    { title: "Medical Orders", path: "/clinical-workflows/medical-orders", category: "Clinical Workflows", description: "Medical orders management", icon: FileText, status: 'active' },
    { title: "Patient Education", path: "/clinical-workflows/patient-education", category: "Clinical Workflows", description: "Patient education materials", icon: FileText, status: 'active' },
    { title: "Medications", path: "/clinical-workflows/medications", category: "Clinical Workflows", description: "Medication management", icon: FileText, status: 'active' },
    { title: "Discharge", path: "/clinical-workflows/discharge", category: "Clinical Workflows", description: "Patient discharge process", icon: FileText, status: 'active' },

    // Facility Management
    { title: "Bed Management", path: "/facility-management/beds", category: "Facility Management", description: "Hospital bed allocation and tracking", icon: Bed, status: 'placeholder' },
    { title: "Room Allocation", path: "/facility-management/rooms", category: "Facility Management", description: "Room assignment and management", icon: Building2, status: 'placeholder' },
    { title: "Equipment Tracking", path: "/facility-management/equipment", category: "Facility Management", description: "Medical equipment management", icon: MonitorSpeaker, status: 'placeholder' },
    { title: "Maintenance", path: "/facility-management/maintenance", category: "Facility Management", description: "Facility maintenance scheduling", icon: Settings, status: 'placeholder' },

    // Staff Management
    { title: "Staff Directory", path: "/staff-management/directory", category: "Staff Management", description: "Hospital staff directory", icon: Users, status: 'placeholder' },
    { title: "Duty Schedules", path: "/staff-management/schedules", category: "Staff Management", description: "Staff duty scheduling", icon: Calendar, status: 'placeholder' },
    { title: "Shift Management", path: "/staff-management/shifts", category: "Staff Management", description: "Shift planning and management", icon: CalendarCheck, status: 'placeholder' },
    { title: "Time Tracking", path: "/staff-management/time-tracking", category: "Staff Management", description: "Staff time and attendance", icon: Clock, status: 'placeholder' },
    { title: "Leave Management", path: "/staff-management/leave", category: "Staff Management", description: "Staff leave requests and approval", icon: UserX, status: 'placeholder' },

    // HR Management
    { title: "Employee Records", path: "/hr-management/employees", category: "HR Management", description: "Employee personal and professional records", icon: FileText, status: 'placeholder' },
    { title: "Payroll", path: "/hr-management/payroll", category: "HR Management", description: "Payroll processing and management", icon: DollarSign, status: 'placeholder' },
    { title: "Benefits", path: "/hr-management/benefits", category: "HR Management", description: "Employee benefits administration", icon: Heart, status: 'placeholder' },
    { title: "Training & Certification", path: "/hr-management/training", category: "HR Management", description: "Staff training and certification tracking", icon: BookOpen, status: 'placeholder' },
    { title: "Performance Reviews", path: "/hr-management/performance", category: "HR Management", description: "Employee performance evaluations", icon: BarChart2, status: 'placeholder' },

    // Clinical Data
    { title: "Clinical Data", path: "/clinical-data", category: "Clinical Data", description: "Clinical data overview", icon: Database, status: 'active' },
    { title: "Vital Signs", path: "/clinical-data/vitals", category: "Clinical Data", description: "Patient vital signs", icon: BarChart2, status: 'active' },

    // Laboratory
    { title: "Lab Results", path: "/lab-results", category: "Laboratory", description: "Laboratory test results", icon: TestTube, status: 'active' },
    { title: "Quality Control", path: "/lab/quality-control", category: "Laboratory", description: "Lab quality control", icon: TestTube, status: 'active' },
    { title: "Samples", path: "/lab/samples", category: "Laboratory", description: "Sample management", icon: TestTube, status: 'active' },

    // Medical Records
    { title: "Medical Records", path: "/medical-records", category: "Medical Records", description: "Patient medical records", icon: FileText, status: 'active' },
    { title: "Patient History", path: "/medical-records/history", category: "Medical Records", description: "Patient medical history", icon: FileText, status: 'active' },
    { title: "Diagnoses", path: "/medical-records/diagnoses", category: "Medical Records", description: "Patient diagnoses", icon: FileText, status: 'active' },
    { title: "Imaging Results", path: "/medical-records/imaging", category: "Medical Records", description: "Medical imaging results", icon: FileText, status: 'active' },
    { title: "External Records", path: "/medical-records/external", category: "Medical Records", description: "External medical records", icon: FileText, status: 'active' },

    // Appointments
    { title: "Appointments", path: "/appointments", category: "Scheduling", description: "Appointment management", icon: Calendar, status: 'active' },
    { title: "Check-in", path: "/appointments/checkin", category: "Scheduling", description: "Appointment check-in", icon: Calendar, status: 'active' },

    // Messages
    { title: "Messages", path: "/messages", category: "Communication", description: "Messaging system", icon: MessageSquare, status: 'active' },

    // Studies
    { title: "Studies", path: "/studies", category: "Research", description: "Research studies", icon: FlaskRound, status: 'active' },
    { title: "Study Details", path: "/studies/study-123", category: "Research", description: "Individual study details", icon: FlaskRound, status: 'active' },
    { title: "Protocol Setup", path: "/studies/protocol-setup", category: "Research", description: "Study protocol setup", icon: FlaskRound, status: 'active' },
    { title: "Study Sites", path: "/studies/sites", category: "Research", description: "Research study sites", icon: Building2, status: 'active' },
    { title: "Protocol Documents", path: "/studies/protocol-documents", category: "Research", description: "Study protocol documents", icon: FileText, status: 'active' },
    { title: "Consent Tracking", path: "/studies/consent-tracking", category: "Research", description: "Patient consent tracking", icon: FileText, status: 'active' },
    { title: "Patient Randomization", path: "/studies/patient-randomization", category: "Research", description: "Study randomization", icon: Users, status: 'active' },
    { title: "Protocol Deviations", path: "/studies/protocol-deviations", category: "Research", description: "Protocol deviation tracking", icon: FileText, status: 'active' },
    { title: "Site Visits", path: "/studies/site-visits", category: "Research", description: "Study site visits", icon: Building2, status: 'active' },
    { title: "Study Finance", path: "/studies/finance", category: "Research", description: "Study financial management", icon: FileText, status: 'active' },
    { title: "Quiz Management", path: "/studies/quiz-management", category: "Research", description: "Study quiz management", icon: FileText, status: 'active' },
    { title: "Recruitment", path: "/studies/recruitment", category: "Research", description: "Patient recruitment", icon: Users, status: 'active' },

    // Research Data
    { title: "Data Collection", path: "/research-data/collection", category: "Research Data", description: "Research data collection", icon: Database, status: 'active' },
    { title: "Data Exports", path: "/research-data/exports", category: "Research Data", description: "Data export tools", icon: Database, status: 'active' },
    { title: "Research Lab Results", path: "/research-data/lab-results", category: "Research Data", description: "Research laboratory results", icon: TestTube, status: 'active' },
    { title: "Biospecimen Tracking", path: "/research-data/biospecimen", category: "Research Data", description: "Biospecimen management", icon: TestTube, status: 'active' },

    // Forms
    { title: "Form Builder", path: "/forms/builder", category: "Forms", description: "Form building tool", icon: FileText, status: 'active' },
    { title: "CRFs", path: "/forms/crfs", category: "Forms", description: "Case Report Forms", icon: FileText, status: 'active' },

    // Data Management
    { title: "Data Queries", path: "/data/queries", category: "Data Management", description: "Data query management", icon: Database, status: 'active' },

    // Analytics
    { title: "Analytics", path: "/analytics", category: "Analytics", description: "Analytics overview", icon: BarChart2, status: 'active' },
    { title: "Enrollment Analytics", path: "/analytics/enrollment", category: "Analytics", description: "Enrollment analytics", icon: BarChart2, status: 'active' },
    { title: "Study Outcomes", path: "/analytics/outcomes", category: "Analytics", description: "Study outcome analytics", icon: BarChart2, status: 'active' },
    { title: "Site Performance", path: "/analytics/site-performance", category: "Analytics", description: "Site performance metrics", icon: BarChart2, status: 'active' },
    { title: "Data Quality", path: "/analytics/data-quality", category: "Analytics", description: "Data quality metrics", icon: BarChart2, status: 'active' },
    { title: "Geographic Distribution", path: "/analytics/geographic", category: "Analytics", description: "Geographic analytics", icon: BarChart2, status: 'active' },
    { title: "Usage Analytics", path: "/analytics/usage", category: "Analytics", description: "Usage analytics", icon: BarChart2, status: 'active' },
    { title: "Revenue Reports", path: "/analytics/revenue", category: "Analytics", description: "Revenue reports", icon: BarChart2, status: 'active' },

    // Clinical Reports
    { title: "Clinical Reports", path: "/clinical-reports", category: "Reports", description: "Clinical reporting", icon: FileText, status: 'active' },
    { title: "Treatment Outcomes", path: "/clinical-reports/outcomes", category: "Reports", description: "Treatment outcome reports", icon: FileText, status: 'active' },
    { title: "Patient Analytics", path: "/clinical-reports/patient-analytics", category: "Reports", description: "Patient analytics reports", icon: FileText, status: 'active' },
    { title: "Provider Metrics", path: "/clinical-reports/provider-metrics", category: "Reports", description: "Provider performance metrics", icon: FileText, status: 'active' },
    { title: "Medication Reports", path: "/clinical-reports/medications", category: "Reports", description: "Medication reports", icon: FileText, status: 'active' },
    { title: "Handoff Reports", path: "/clinical-reports/handoff", category: "Reports", description: "Patient handoff reports", icon: FileText, status: 'active' },

    // User Management
    { title: "Users", path: "/users", category: "Administration", description: "User management", icon: Users, status: 'active' },
    { title: "Roles & Permissions", path: "/users/roles", category: "Administration", description: "Role and permission management", icon: Shield, status: 'active' },
    { title: "Access Requests", path: "/users/access-requests", category: "Administration", description: "Access request management", icon: Users, status: 'active' },

    // Facilities
    { title: "Facilities", path: "/facilities", category: "Administration", description: "Facility management", icon: Building2, status: 'active' },

    // Settings
    { title: "Settings", path: "/settings", category: "Settings", description: "Application settings", icon: Settings, status: 'active' },
    { title: "Billing", path: "/settings/billing", category: "Settings", description: "Billing settings", icon: Settings, status: 'active' },
    { title: "Notifications", path: "/settings/notifications", category: "Settings", description: "Notification settings", icon: Settings, status: 'active' },
    { title: "System Configuration", path: "/settings/system", category: "Settings", description: "System configuration", icon: Settings, status: 'active' },

    // Compliance & Audit
    { title: "Compliance", path: "/compliance", category: "Compliance", description: "Compliance management", icon: Shield, status: 'active' },
    { title: "Audit Logs", path: "/audit-logs", category: "Compliance", description: "System audit logs", icon: Shield, status: 'active' },

    // Support
    { title: "Support", path: "/support", category: "Support", description: "Support resources", icon: MessageSquare, status: 'active' },
    { title: "Help", path: "/help", category: "Support", description: "Help documentation", icon: MessageSquare, status: 'active' },

    // Special Pages
    { title: "All Links", path: "/all-links", category: "Navigation", description: "Complete page directory", icon: FileText, status: 'active' },
    { title: "404 Not Found", path: "/404", category: "Error Pages", description: "Page not found", icon: FileText, status: 'active' }
  ];

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
