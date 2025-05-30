
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  ExternalLink, 
  FileText, 
  Users, 
  Settings, 
  BarChart2,
  Database,
  Calendar,
  Shield,
  Building2,
  TestTube,
  MessageSquare,
  Home,
  User,
  FlaskRound,
  Stethoscope
} from 'lucide-react';

interface PageLink {
  title: string;
  path: string;
  category: string;
  description?: string;
  icon: React.ComponentType;
  status: 'active' | 'placeholder' | 'missing';
}

const AllLinksPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Comprehensive list of all pages and their information
  const allPages: PageLink[] = [
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

  const categories = useMemo(() => {
    const cats = [...new Set(allPages.map(page => page.category))].sort();
    return ['all', ...cats];
  }, []);

  const filteredPages = useMemo(() => {
    return allPages.filter(page => {
      const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           page.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           page.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || page.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const pagesByCategory = useMemo(() => {
    const grouped = filteredPages.reduce((acc, page) => {
      if (!acc[page.category]) {
        acc[page.category] = [];
      }
      acc[page.category].push(page);
      return acc;
    }, {} as Record<string, PageLink[]>);
    
    return grouped;
  }, [filteredPages]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'placeholder': return 'bg-yellow-100 text-yellow-800';
      case 'missing': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePageVisit = (path: string) => {
    navigate(path);
  };

  return (
    <MainLayout>
      <PageHeader
        title="All Links"
        description="Complete directory of all pages and components in the application"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'All Links' }
        ]}
      />

      <div className="space-y-6">
        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search pages by title, path, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-full md:w-64">
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{filteredPages.length} pages found</Badge>
              <Badge className="bg-green-100 text-green-800">
                {allPages.filter(p => p.status === 'active').length} Active
              </Badge>
              <Badge className="bg-yellow-100 text-yellow-800">
                {allPages.filter(p => p.status === 'placeholder').length} Placeholder
              </Badge>
              <Badge className="bg-red-100 text-red-800">
                {allPages.filter(p => p.status === 'missing').length} Missing
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Tabs defaultValue="grouped" className="w-full">
          <TabsList>
            <TabsTrigger value="grouped">Grouped by Category</TabsTrigger>
            <TabsTrigger value="list">All Pages List</TabsTrigger>
          </TabsList>

          <TabsContent value="grouped" className="space-y-6">
            {Object.entries(pagesByCategory).map(([category, pages]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {category} ({pages.length} pages)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pages.map((page) => {
                      const IconComponent = page.icon;
                      return (
                        <div
                          key={page.path}
                          className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => handlePageVisit(page.path)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center">
                              <IconComponent className="w-4 h-4 mr-2 text-gray-600" />
                              <h3 className="font-medium text-sm">{page.title}</h3>
                            </div>
                            <Badge className={`text-xs ${getStatusColor(page.status)}`}>
                              {page.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{page.path}</p>
                          {page.description && (
                            <p className="text-xs text-gray-500">{page.description}</p>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 w-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePageVisit(page.path);
                            }}
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Visit
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="list">
            <Card>
              <CardHeader>
                <CardTitle>All Pages ({filteredPages.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredPages.map((page) => {
                    const IconComponent = page.icon;
                    return (
                      <div
                        key={page.path}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => handlePageVisit(page.path)}
                      >
                        <div className="flex items-center flex-1">
                          <IconComponent className="w-4 h-4 mr-3 text-gray-600" />
                          <div className="flex-1">
                            <h3 className="font-medium">{page.title}</h3>
                            <p className="text-sm text-gray-600">{page.path}</p>
                          </div>
                          <Badge variant="outline" className="mr-3">
                            {page.category}
                          </Badge>
                          <Badge className={getStatusColor(page.status)}>
                            {page.status}
                          </Badge>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePageVisit(page.path);
                          }}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AllLinksPage;
