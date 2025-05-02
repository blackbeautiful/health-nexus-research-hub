
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, Filter, FileEdit, FileUp, ClipboardList, Calendar, 
  Users, Clock, CheckCircle, AlertTriangle, MoreHorizontal, FileText
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TreatmentPlan {
  id: string;
  patient: string;
  patientId: string;
  diagnosis: string;
  planType: string;
  stage: string;
  provider: string;
  createdDate: string;
  updatedDate: string;
  status: 'draft' | 'active' | 'completed' | 'discontinued';
  progress: number;
}

const TreatmentPlansPage = () => {
  const treatmentPlans: TreatmentPlan[] = [
    {
      id: 'TP-10245',
      patient: 'Sarah Johnson',
      patientId: 'PT-12345',
      diagnosis: 'Breast Cancer',
      planType: 'Surgery + Radiation + Hormone Therapy',
      stage: 'Stage IIA',
      provider: 'Dr. Rebecca Martinez',
      createdDate: '2025-04-15',
      updatedDate: '2025-04-28',
      status: 'active',
      progress: 35
    },
    {
      id: 'TP-10244',
      patient: 'Michael Smith',
      patientId: 'PT-12346',
      diagnosis: 'Prostate Cancer',
      planType: 'Hormone Therapy + Radiation',
      stage: 'Stage III',
      provider: 'Dr. James Wilson',
      createdDate: '2025-04-10',
      updatedDate: '2025-04-25',
      status: 'active',
      progress: 20
    },
    {
      id: 'TP-10243',
      patient: 'Emma Thompson',
      patientId: 'PT-12347',
      diagnosis: 'Lung Cancer',
      planType: 'Chemotherapy + Immunotherapy',
      stage: 'Stage II',
      provider: 'Dr. Elena Rodriguez',
      createdDate: '2025-04-05',
      updatedDate: '2025-04-22',
      status: 'active',
      progress: 15
    },
    {
      id: 'TP-10242',
      patient: 'John Davis',
      patientId: 'PT-12348',
      diagnosis: 'Colon Cancer',
      planType: 'Surgery + Adjuvant Chemotherapy',
      stage: 'Stage IIB',
      provider: 'Dr. Robert Kim',
      createdDate: '2025-03-28',
      updatedDate: '2025-04-20',
      status: 'active',
      progress: 45
    },
    {
      id: 'TP-10241',
      patient: 'Linda Wilson',
      patientId: 'PT-12349',
      diagnosis: 'Lymphoma',
      planType: 'CHOP Chemotherapy Regimen',
      stage: 'Stage II',
      provider: 'Dr. Sarah Williams',
      createdDate: '2025-03-20',
      updatedDate: '2025-04-18',
      status: 'active',
      progress: 60
    },
    {
      id: 'TP-10240',
      patient: 'Robert Johnson',
      patientId: 'PT-12350',
      diagnosis: 'Melanoma',
      planType: 'Surgery + Immunotherapy',
      stage: 'Stage III',
      provider: 'Dr. James Wilson',
      createdDate: '2025-03-15',
      updatedDate: '2025-04-10',
      status: 'completed',
      progress: 100
    },
    {
      id: 'TP-10239',
      patient: 'Patricia Brown',
      patientId: 'PT-12351',
      diagnosis: 'Ovarian Cancer',
      planType: 'Surgery + Chemotherapy',
      stage: 'Stage IIIC',
      provider: 'Dr. Elena Rodriguez',
      createdDate: '2025-02-28',
      updatedDate: '2025-04-12',
      status: 'discontinued',
      progress: 75
    }
  ];

  const treatmentPlanTemplates = [
    { id: 'TPT-001', name: 'Breast Cancer - Stage I', type: 'Surgery + Radiation', author: 'Dr. Rebecca Martinez', modality: 'Multimodal', lastUpdated: '2025-03-10' },
    { id: 'TPT-002', name: 'Breast Cancer - Stage II', type: 'Surgery + Radiation + Hormonal', author: 'Dr. Rebecca Martinez', modality: 'Multimodal', lastUpdated: '2025-03-10' },
    { id: 'TPT-003', name: 'Colorectal Cancer - Stage III', type: 'Surgery + Adjuvant Chemotherapy', author: 'Dr. Robert Kim', modality: 'Multimodal', lastUpdated: '2025-02-15' },
    { id: 'TPT-004', name: 'DLBCL Lymphoma', type: 'R-CHOP Chemotherapy', author: 'Dr. Sarah Williams', modality: 'Chemotherapy', lastUpdated: '2025-01-20' },
    { id: 'TPT-005', name: 'Lung Cancer - NSCLC', type: 'Immunotherapy + Chemotherapy', author: 'Dr. Elena Rodriguez', modality: 'Combined', lastUpdated: '2025-03-05' },
    { id: 'TPT-006', name: 'Prostate Cancer - Low Risk', type: 'Active Surveillance', author: 'Dr. James Wilson', modality: 'Monitoring', lastUpdated: '2025-02-28' }
  ];

  // Function to render status badge with appropriate color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Completed</Badge>;
      case 'draft':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Draft</Badge>;
      case 'discontinued':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Discontinued</Badge>;
      default:
        return null;
    }
  };

  // Function to render progress bar with appropriate color
  const getProgressBar = (progress: number) => {
    let bgColor = 'bg-green-500';
    if (progress < 25) bgColor = 'bg-amber-500';
    else if (progress < 75) bgColor = 'bg-blue-500';
    
    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`${bgColor} h-2 rounded-full`} 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

  return (
    <MainLayout>
      <PageHeader
        title="Treatment Plans"
        description="Create and manage patient treatment plans"
        breadcrumbs={[
          { label: 'Clinical Workflows', link: '/clinical-workflows' },
          { label: 'Treatment Plans' }
        ]}
        action={{
          label: 'New Plan',
          icon: FileEdit,
          onClick: () => console.log('Create new treatment plan')
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">
                {treatmentPlans.filter(plan => plan.status === 'active').length}
              </div>
              <div className="ml-auto p-2 bg-green-50 text-green-500 rounded-full">
                <ClipboardList className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">78%</div>
              <div className="ml-auto p-2 bg-blue-50 text-blue-500 rounded-full">
                <CheckCircle className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">142</div>
              <div className="ml-auto p-2 bg-amber-50 text-amber-500 rounded-full">
                <Clock className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">24</div>
              <div className="ml-auto p-2 bg-purple-50 text-purple-500 rounded-full">
                <FileText className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="mb-6">
        <TabsList>
          <TabsTrigger value="active">Active Plans</TabsTrigger>
          <TabsTrigger value="all">All Plans</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="active">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <CardTitle>Active Treatment Plans</CardTitle>
                    <CardDescription>Currently active treatment plans for patients</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search plans..."
                        className="pl-8 w-full md:w-[250px]"
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plan ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Diagnosis</TableHead>
                      <TableHead>Plan Type</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {treatmentPlans
                      .filter(plan => plan.status === 'active')
                      .map((plan) => (
                        <TableRow key={plan.id} className="cursor-pointer hover:bg-muted/50">
                          <TableCell className="font-medium">{plan.id}</TableCell>
                          <TableCell>
                            <div>
                              <div>{plan.patient}</div>
                              <div className="text-xs text-muted-foreground">{plan.patientId}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div>{plan.diagnosis}</div>
                              <div className="text-xs text-muted-foreground">{plan.stage}</div>
                            </div>
                          </TableCell>
                          <TableCell>{plan.planType}</TableCell>
                          <TableCell>{plan.provider}</TableCell>
                          <TableCell>{getStatusBadge(plan.status)}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-xs text-muted-foreground">{plan.progress}% Complete</div>
                              {getProgressBar(plan.progress)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => console.log(`View ${plan.id}`)}>
                                  <FileText className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => console.log(`Edit ${plan.id}`)}>
                                  <FileEdit className="mr-2 h-4 w-4" />
                                  Edit Plan
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => console.log(`Mark ${plan.id} as Complete`)}>
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Mark as Complete
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => console.log(`Discontinue ${plan.id}`)} className="text-red-600">
                                  <AlertTriangle className="mr-2 h-4 w-4" />
                                  Discontinue Plan
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="border-t p-4 flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {treatmentPlans.filter(plan => plan.status === 'active').length} active plans
                </div>
                <Button variant="outline">View All Plans</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <CardTitle>All Treatment Plans</CardTitle>
                    <CardDescription>Complete list of patient treatment plans</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search plans..."
                        className="pl-8 w-full md:w-[250px]"
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plan ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Diagnosis</TableHead>
                      <TableHead>Plan Type</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Created Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {treatmentPlans.map((plan) => (
                      <TableRow key={plan.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-medium">{plan.id}</TableCell>
                        <TableCell>
                          <div>
                            <div>{plan.patient}</div>
                            <div className="text-xs text-muted-foreground">{plan.patientId}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div>{plan.diagnosis}</div>
                            <div className="text-xs text-muted-foreground">{plan.stage}</div>
                          </div>
                        </TableCell>
                        <TableCell>{plan.planType}</TableCell>
                        <TableCell>{plan.provider}</TableCell>
                        <TableCell>{plan.createdDate}</TableCell>
                        <TableCell>{getStatusBadge(plan.status)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => console.log(`View ${plan.id}`)}>
                                <FileText className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              {plan.status !== 'completed' && plan.status !== 'discontinued' && (
                                <DropdownMenuItem onClick={() => console.log(`Edit ${plan.id}`)}>
                                  <FileEdit className="mr-2 h-4 w-4" />
                                  Edit Plan
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              {plan.status === 'active' && (
                                <>
                                  <DropdownMenuItem onClick={() => console.log(`Mark ${plan.id} as Complete`)}>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Mark as Complete
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => console.log(`Discontinue ${plan.id}`)} className="text-red-600">
                                    <AlertTriangle className="mr-2 h-4 w-4" />
                                    Discontinue Plan
                                  </DropdownMenuItem>
                                </>
                              )}
                              <DropdownMenuItem onClick={() => console.log(`Clone ${plan.id}`)}>
                                <FileText className="mr-2 h-4 w-4" />
                                Clone Plan
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="border-t p-4 flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {treatmentPlans.length} of 142 plans
                </div>
                <Button variant="outline">Load More</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="templates">
            <div className="flex justify-end mb-4">
              <Button>
                <FileUp className="mr-2 h-4 w-4" />
                New Template
              </Button>
            </div>
          
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <CardTitle>Treatment Plan Templates</CardTitle>
                    <CardDescription>Standardized treatment plan templates by diagnosis</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search templates..."
                        className="pl-8 w-full md:w-[250px]"
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Template ID</TableHead>
                      <TableHead>Template Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Modality</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {treatmentPlanTemplates.map((template) => (
                      <TableRow key={template.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-medium">{template.id}</TableCell>
                        <TableCell>{template.name}</TableCell>
                        <TableCell>{template.type}</TableCell>
                        <TableCell>{template.modality}</TableCell>
                        <TableCell>{template.author}</TableCell>
                        <TableCell>{template.lastUpdated}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => console.log(`View ${template.id}`)}>
                                <FileText className="mr-2 h-4 w-4" />
                                View Template
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => console.log(`Edit ${template.id}`)}>
                                <FileEdit className="mr-2 h-4 w-4" />
                                Edit Template
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => console.log(`Use ${template.id}`)}>
                                <Users className="mr-2 h-4 w-4" />
                                Use for Patient
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => console.log(`Clone ${template.id}`)}>
                                <FileText className="mr-2 h-4 w-4" />
                                Clone Template
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="border-t p-4 flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {treatmentPlanTemplates.length} of 24 templates
                </div>
                <Button variant="outline">View All Templates</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Recent updates to treatment plans</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="p-2 bg-blue-50 text-blue-500 rounded-full">
                <FileEdit className="h-4 w-4" />
              </div>
              <div>
                <div className="font-medium">Treatment Plan Updated</div>
                <div className="text-sm text-muted-foreground">Dr. Rebecca Martinez updated treatment plan for Sarah Johnson (PT-12345)</div>
                <div className="text-xs text-muted-foreground mt-1">Today at 10:25 AM</div>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="p-2 bg-green-50 text-green-500 rounded-full">
                <FileEdit className="h-4 w-4" />
              </div>
              <div>
                <div className="font-medium">New Treatment Plan Created</div>
                <div className="text-sm text-muted-foreground">Dr. James Wilson created a new treatment plan for Michael Smith (PT-12346)</div>
                <div className="text-xs text-muted-foreground mt-1">Yesterday at 3:45 PM</div>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="p-2 bg-amber-50 text-amber-500 rounded-full">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <div className="font-medium">Treatment Milestone Reached</div>
                <div className="text-sm text-muted-foreground">Linda Wilson (PT-12349) completed cycle 4 of chemotherapy</div>
                <div className="text-xs text-muted-foreground mt-1">Yesterday at 11:30 AM</div>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="p-2 bg-blue-50 text-blue-500 rounded-full">
                <CheckCircle className="h-4 w-4" />
              </div>
              <div>
                <div className="font-medium">Treatment Plan Completed</div>
                <div className="text-sm text-muted-foreground">Robert Johnson (PT-12350) completed treatment plan successfully</div>
                <div className="text-xs text-muted-foreground mt-1">April 29, 2025 at 2:15 PM</div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t p-4">
          <Button variant="outline" className="w-full">View All Activity</Button>
        </CardFooter>
      </Card>
    </MainLayout>
  );
};

export default TreatmentPlansPage;
