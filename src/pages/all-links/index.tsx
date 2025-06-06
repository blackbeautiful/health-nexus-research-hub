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
  PlusCircle 
} from 'lucide-react';

interface PageLink {
  title: string;
  path: string;
  category: string;
  description?: string;
  icon: React.ComponentType;
  roles?: string[];
  status: 'active' | 'placeholder' | 'missing';
}

const AllLinksPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Comprehensive list of all pages and their information
  const allLinks: PageLink[] = [
    // Authentication
    { title: "Login", path: "/login", category: "Authentication", icon: User, status: 'active' },
    { title: "Register", path: "/register", category: "Authentication", icon: User, status: 'active' },
    { title: "Forgot Password", path: "/forgot-password", category: "Authentication", icon: User, status: 'active' },

    // Dashboards
    { title: "Main Dashboard", path: "/", category: "Dashboards", icon: Home, status: 'active' },
    { title: "Clinical Dashboard", path: "/dashboard/clinical", category: "Dashboards", icon: Stethoscope, status: 'active' },
    { title: "Researcher Dashboard", path: "/dashboard/researcher", category: "Dashboards", icon: FlaskRound, status: 'active' },
    { title: "Admin Dashboard", path: "/dashboard/admin", category: "Dashboards", icon: Settings, status: 'active' },
    { title: "Patient Dashboard", path: "/dashboard/patient", category: "Dashboards", icon: User, status: 'active' },

    // Patient Management
    { title: "Patient List", path: "/patients", category: "Patients", icon: Users, status: 'active' },
    { title: "Patient Details", path: "/patients/patient-123", category: "Patients", icon: User, status: 'active' },
    { title: "Patient Registration", path: "/patients/register", category: "Patients", icon: User, status: 'active' },
    { title: "Clinical Information", path: "/patients/clinical-information", category: "Patients", icon: FileText, status: 'active' },
    { title: "Insurance Information", path: "/patients/insurance-information", category: "Patients", icon: FileText, status: 'active' },

    // Clinical Workflows
    { title: "Clinical Notes", path: "/clinical-workflows/notes", category: "Clinical Workflows", icon: FileText, status: 'active' },
    { title: "New Clinical Note", path: "/clinical-workflows/notes/new", category: "Clinical Workflows", icon: FileText, status: 'active' },
    { title: "Nursing Notes", path: "/clinical-workflows/nursing-notes", category: "Clinical Workflows", icon: FileText, status: 'active' },
    { title: "New Nursing Note", path: "/clinical-workflows/nursing-notes/new", category: "Clinical Workflows", icon: FileText, status: 'active' },
    { title: "Prescriptions", path: "/clinical-workflows/prescriptions", category: "Clinical Workflows", icon: FileText, status: 'active' },
    { title: "New Prescription", path: "/clinical-workflows/prescriptions/new", category: "Clinical Workflows", icon: FileText, status: 'active' },
    { title: "Treatment Plans", path: "/clinical-workflows/treatment-plans", category: "Clinical Workflows", icon: FileText, status: 'active' },
    { title: "Medical Orders", path: "/clinical-workflows/medical-orders", category: "Clinical Workflows", icon: FileText, status: 'active' },
    { title: "Patient Education", path: "/clinical-workflows/patient-education", category: "Clinical Workflows", icon: FileText, status: 'active' },
    { title: "Medications", path: "/clinical-workflows/medications", category: "Clinical Workflows", icon: FileText, status: 'active' },
    { title: "Discharge", path: "/clinical-workflows/discharge", category: "Clinical Workflows", icon: FileText, status: 'active' },

    // Clinical Data
    { title: "Clinical Data", path: "/clinical-data", category: "Clinical Data", icon: Database, status: 'active' },
    { title: "Vital Signs", path: "/clinical-data/vitals", category: "Clinical Data", icon: BarChart2, status: 'active' },

    // Laboratory
    { title: "Lab Results", path: "/lab-results", category: "Laboratory", icon: TestTube, status: 'active' },
    { title: "Quality Control", path: "/lab/quality-control", category: "Laboratory", icon: TestTube, status: 'active' },
    { title: "Samples", path: "/lab/samples", category: "Laboratory", icon: TestTube, status: 'active' },

    // Medical Records
    { title: "Medical Records", path: "/medical-records", category: "Medical Records", icon: FileText, status: 'active' },
    { title: "Patient History", path: "/medical-records/history", category: "Medical Records", icon: FileText, status: 'active' },
    { title: "Diagnoses", path: "/medical-records/diagnoses", category: "Medical Records", icon: FileText, status: 'active' },
    { title: "Imaging Results", path: "/medical-records/imaging", category: "Medical Records", icon: FileText, status: 'active' },
    { title: "External Records", path: "/medical-records/external", category: "Medical Records", icon: FileText, status: 'active' },

    // Appointments
    { title: "Appointments", path: "/appointments", category: "Scheduling", icon: Calendar, status: 'active' },
    { title: "Check-in", path: "/appointments/checkin", category: "Scheduling", icon: Calendar, status: 'active' },

    // Messages
    { title: "Messages", path: "/messages", category: "Communication", icon: MessageSquare, status: 'active' },

    // Studies
    { title: "Studies", path: "/studies", category: "Research", icon: FlaskRound, status: 'active' },
    { title: "Study Details", path: "/studies/study-123", category: "Research", icon: FlaskRound, status: 'active' },
    { title: "Protocol Setup", path: "/studies/protocol-setup", category: "Research", icon: FlaskRound, status: 'active' },
    { title: "Study Sites", path: "/studies/sites", category: "Research", icon: Building2, status: 'active' },
    { title: "Protocol Documents", path: "/studies/protocol-documents", category: "Research", icon: FileText, status: 'active' },
    { title: "Consent Tracking", path: "/studies/consent-tracking", category: "Research", icon: FileText, status: 'active' },
    { title: "Patient Randomization", path: "/studies/patient-randomization", category: "Research", icon: Users, status: 'active' },
    { title: "Protocol Deviations", path: "/studies/protocol-deviations", category: "Research", icon: FileText, status: 'active' },
    { title: "Site Visits", path: "/studies/site-visits", category: "Research", icon: Building2, status: 'active' },
    { title: "Study Finance", path: "/studies/finance", category: "Research", icon: FileText, status: 'active' },
    { title: "Quiz Management", path: "/studies/quiz-management", category: "Research", icon: FileText, status: 'active' },
    { title: "Recruitment", path: "/studies/recruitment", category: "Research", icon: Users, status: 'active' },

    // Research Data
    { title: "Data Collection", path: "/research-data/collection", category: "Research Data", icon: Database, status: 'active' },
    { title: "Data Exports", path: "/research-data/exports", category: "Research Data", icon: Database, status: 'active' },
    { title: "Research Lab Results", path: "/research-data/lab-results", category: "Research Data", icon: TestTube, status: 'active' },
    { title: "Biospecimen Tracking", path: "/research-data/biospecimen", category: "Research Data", icon: TestTube, status: 'active' },

    // Forms
    { title: "Form Builder", path: "/forms/builder", category: "Forms", icon: FileText, status: 'active' },
    { title: "CRFs", path: "/forms/crfs", category: "Forms", icon: FileText, status: 'active' },

    // Data Management
    { title: "Data Queries", path: "/data/queries", category: "Data Management", icon: Database, status: 'active' },

    // Analytics
    { title: "Analytics", path: "/analytics", category: "Analytics", icon: BarChart2, status: 'active' },
    { title: "Enrollment Analytics", path: "/analytics/enrollment", category: "Analytics", icon: BarChart2, status: 'active' },
    { title: "Study Outcomes", path: "/analytics/outcomes", category: "Analytics", icon: BarChart2, status: 'active' },
    { title: "Site Performance", path: "/analytics/site-performance", category: "Analytics", icon: BarChart2, status: 'active' },
    { title: "Data Quality", path: "/analytics/data-quality", category: "Analytics", icon: BarChart2, status: 'active' },
    { title: "Geographic Distribution", path: "/analytics/geographic", category: "Analytics", icon: BarChart2, status: 'active' },
    { title: "Usage Analytics", path: "/analytics/usage", category: "Analytics", icon: BarChart2, status: 'active' },
    { title: "Revenue Reports", path: "/analytics/revenue", category: "Analytics", icon: BarChart2, status: 'active' },

    // Clinical Reports
    { title: "Clinical Reports", path: "/clinical-reports", category: "Reports", icon: FileText, status: 'active' },
    { title: "Treatment Outcomes", path: "/clinical-reports/outcomes", category: "Reports", icon: FileText, status: 'active' },
    { title: "Patient Analytics", path: "/clinical-reports/patient-analytics", category: "Reports", icon: FileText, status: 'active' },
    { title: "Provider Metrics", path: "/clinical-reports/provider-metrics", category: "Reports", icon: FileText, status: 'active' },
    { title: "Medication Reports", path: "/clinical-reports/medications", category: "Reports", icon: FileText, status: 'active' },
    { title: "Handoff Reports", path: "/clinical-reports/handoff", category: "Reports", icon: FileText, status: 'active' },

    // User Management
    { title: "Users", path: "/users", category: "Administration", icon: Users, status: 'active' },
    { title: "Roles & Permissions", path: "/users/roles", category: "Administration", icon: Shield, status: 'active' },
    { title: "Access Requests", path: "/users/access-requests", category: "Administration", icon: Users, status: 'active' },

    // Facilities
    { title: "Facilities", path: "/facilities", category: "Administration", icon: Building2, status: 'active' },

    // Settings
    { title: "Settings", path: "/settings", category: "Settings", icon: Settings, status: 'active' },
    { title: "Billing", path: "/settings/billing", category: "Settings", icon: Settings, status: 'active' },
    { title: "Notifications", path: "/settings/notifications", category: "Settings", icon: Settings, status: 'active' },
    { title: "System Configuration", path: "/settings/system", category: "Settings", icon: Settings, status: 'active' },

    // Compliance & Audit
    { title: "Compliance", path: "/compliance", category: "Compliance", icon: Shield, status: 'active' },
    { title: "Audit Logs", path: "/audit-logs", category: "Compliance", icon: Shield, status: 'active' },

    // Support
    { title: "Support", path: "/support", category: "Support", icon: MessageSquare, status: 'active' },
    { title: "Help", path: "/help", category: "Support", icon: MessageSquare, status: 'active' },

    // Special Pages
    { title: "All Links", path: "/all-links", category: "Navigation", icon: FileText, status: 'active' },
    { title: "404 Not Found", path: "/404", category: "Error Pages", icon: FileText, status: 'active' }
  ];

  const filteredLinks = allLinks.filter(link => {
    const matchesSearch = link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         link.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         link.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || link.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(allLinks.map(link => link.category))];

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case 'clinical': return 'default';
      case 'research': return 'secondary';
      case 'admin': return 'destructive';
      case 'patient': return 'outline';
      default: return 'default';
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
                  <TabsTrigger value="clinical">Clinical</TabsTrigger>
                  <TabsTrigger value="research">Research</TabsTrigger>
                  <TabsTrigger value="admin">Admin</TabsTrigger>
                  <TabsTrigger value="patient">Patient</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLinks.map((link, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <link.icon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base">{link.title}</CardTitle>
                  </div>
                  <Badge variant={getCategoryBadgeVariant(link.category)}>
                    {link.category}
                  </Badge>
                </div>
                <CardDescription className="text-sm">{link.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <code className="text-xs bg-muted px-2 py-1 rounded">{link.path}</code>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => window.open(link.path, '_blank')}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
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
          ))}
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
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{allLinks.length}</div>
                <div className="text-sm text-muted-foreground">Total Pages</div>
              </div>
              {categories.map(category => (
                <div key={category} className="text-center">
                  <div className="text-2xl font-bold">
                    {allLinks.filter(link => link.category === category).length}
                  </div>
                  <div className="text-sm text-muted-foreground capitalize">{category} Pages</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AllLinksPage;
