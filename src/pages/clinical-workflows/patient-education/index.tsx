
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search, Filter, Plus, FileText, BookOpen, Eye, 
  Download, Mail, Share2, Users, Calendar, Star, MoreHorizontal 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EducationResource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'guide' | 'infographic' | 'questionnaire';
  topic: string;
  category: string;
  language: string;
  dateAdded: string;
  lastUpdated: string;
  viewCount: number;
  rating: number;
  assignCount: number;
  fileSize?: string;
  duration?: string;
}

interface PatientAssignment {
  id: string;
  patientName: string;
  patientId: string;
  resource: string;
  resourceId: string;
  assignedBy: string;
  assignDate: string;
  dueDate?: string;
  completionDate?: string;
  status: 'assigned' | 'viewed' | 'completed' | 'expired';
}

const PatientEducationPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('resources');
  
  // Sample education resources
  const educationResources: EducationResource[] = [
    {
      id: 'EDU-1001',
      title: 'Understanding Your Chemotherapy Treatment',
      type: 'guide',
      topic: 'Chemotherapy',
      category: 'Treatment',
      language: 'English',
      dateAdded: '2025-01-15',
      lastUpdated: '2025-03-10',
      viewCount: 487,
      rating: 4.8,
      assignCount: 142,
      fileSize: '3.2 MB'
    },
    {
      id: 'EDU-1002',
      title: 'Managing Treatment Side Effects',
      type: 'article',
      topic: 'Side Effects',
      category: 'Treatment',
      language: 'English',
      dateAdded: '2025-02-05',
      lastUpdated: '2025-02-05',
      viewCount: 356,
      rating: 4.5,
      assignCount: 98,
      fileSize: '1.5 MB'
    },
    {
      id: 'EDU-1003',
      title: 'Nutrition During Cancer Treatment',
      type: 'infographic',
      topic: 'Nutrition',
      category: 'Lifestyle',
      language: 'English',
      dateAdded: '2025-01-20',
      lastUpdated: '2025-03-15',
      viewCount: 512,
      rating: 4.9,
      assignCount: 176,
      fileSize: '2.8 MB'
    },
    {
      id: 'EDU-1004',
      title: 'What to Expect During Radiation Therapy',
      type: 'video',
      topic: 'Radiation Therapy',
      category: 'Treatment',
      language: 'English',
      dateAdded: '2025-02-12',
      lastUpdated: '2025-02-12',
      viewCount: 298,
      rating: 4.7,
      assignCount: 85,
      duration: '12:45'
    },
    {
      id: 'EDU-1005',
      title: 'Immunotherapy: The Basics',
      type: 'article',
      topic: 'Immunotherapy',
      category: 'Treatment',
      language: 'English',
      dateAdded: '2025-03-01',
      lastUpdated: '2025-03-01',
      viewCount: 275,
      rating: 4.4,
      assignCount: 67,
      fileSize: '1.2 MB'
    },
    {
      id: 'EDU-1006',
      title: 'Coping with Cancer Diagnosis',
      type: 'guide',
      topic: 'Mental Health',
      category: 'Support',
      language: 'English',
      dateAdded: '2025-01-05',
      lastUpdated: '2025-03-05',
      viewCount: 423,
      rating: 4.9,
      assignCount: 154,
      fileSize: '4.1 MB'
    },
    {
      id: 'EDU-1007',
      title: 'Exercise Recommendations During Treatment',
      type: 'video',
      topic: 'Exercise',
      category: 'Lifestyle',
      language: 'English',
      dateAdded: '2025-02-20',
      lastUpdated: '2025-02-20',
      viewCount: 318,
      rating: 4.6,
      assignCount: 89,
      duration: '18:20'
    },
    {
      id: 'EDU-1008',
      title: 'Clinical Trial Participation: What to Know',
      type: 'article',
      topic: 'Clinical Trials',
      category: 'Treatment',
      language: 'English',
      dateAdded: '2025-03-10',
      lastUpdated: '2025-03-10',
      viewCount: 187,
      rating: 4.3,
      assignCount: 42,
      fileSize: '1.8 MB'
    }
  ];
  
  // Sample patient assignments
  const patientAssignments: PatientAssignment[] = [
    {
      id: 'ASSIGN-1001',
      patientName: 'Sarah Johnson',
      patientId: 'PT-12345',
      resource: 'Understanding Your Chemotherapy Treatment',
      resourceId: 'EDU-1001',
      assignedBy: 'Dr. Rebecca Martinez',
      assignDate: '2025-04-05',
      dueDate: '2025-04-12',
      status: 'completed',
      completionDate: '2025-04-08'
    },
    {
      id: 'ASSIGN-1002',
      patientName: 'Michael Smith',
      patientId: 'PT-12346',
      resource: 'Nutrition During Cancer Treatment',
      resourceId: 'EDU-1003',
      assignedBy: 'Dr. James Wilson',
      assignDate: '2025-04-08',
      dueDate: '2025-04-15',
      status: 'viewed'
    },
    {
      id: 'ASSIGN-1003',
      patientName: 'Emma Thompson',
      patientId: 'PT-12347',
      resource: 'What to Expect During Radiation Therapy',
      resourceId: 'EDU-1004',
      assignedBy: 'Dr. Elena Rodriguez',
      assignDate: '2025-04-09',
      dueDate: '2025-04-16',
      status: 'assigned'
    },
    {
      id: 'ASSIGN-1004',
      patientName: 'John Davis',
      patientId: 'PT-12348',
      resource: 'Coping with Cancer Diagnosis',
      resourceId: 'EDU-1006',
      assignedBy: 'Dr. Robert Kim',
      assignDate: '2025-03-20',
      dueDate: '2025-03-27',
      status: 'expired'
    },
    {
      id: 'ASSIGN-1005',
      patientName: 'Linda Wilson',
      patientId: 'PT-12349',
      resource: 'Managing Treatment Side Effects',
      resourceId: 'EDU-1002',
      assignedBy: 'Dr. Rebecca Martinez',
      assignDate: '2025-04-07',
      dueDate: '2025-04-14',
      status: 'completed',
      completionDate: '2025-04-10'
    }
  ];
  
  const getResourceTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return <FileText className="h-4 w-4 mr-2" />;
      case 'video': return <Eye className="h-4 w-4 mr-2" />;
      case 'guide': return <BookOpen className="h-4 w-4 mr-2" />;
      case 'infographic': return <FileText className="h-4 w-4 mr-2" />;
      case 'questionnaire': return <FileText className="h-4 w-4 mr-2" />;
      default: return null;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'viewed': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'expired': return 'bg-red-100 text-red-800 border-red-200';
      default: return '';
    }
  };
  
  // Filter resources based on search term and category filter
  const filteredResources = educationResources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || resource.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  // Filter assignments based on search term
  const filteredAssignments = patientAssignments.filter(assignment => {
    return assignment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           assignment.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
           assignment.patientId.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  return (
    <MainLayout>
      <PageHeader
        title="Patient Education"
        description="Educational resources and materials for patients"
        breadcrumbs={[
          { label: 'Clinical Workflows', link: '/clinical-workflows' },
          { label: 'Patient Education' }
        ]}
        action={{
          label: 'Add Resource',
          icon: Plus,
          onClick: () => console.log('Add new resource')
        }}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="resources">
            <BookOpen className="mr-2 h-4 w-4" />
            Resources
          </TabsTrigger>
          <TabsTrigger value="assignments">
            <Users className="mr-2 h-4 w-4" />
            Patient Assignments
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="resources" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{educationResources.length}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Available education materials
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {educationResources.reduce((total, resource) => total + resource.viewCount, 0)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Across all resources
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {educationResources.reduce((total, resource) => total + resource.assignCount, 0)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Resources assigned to patients
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-center">
                  {(educationResources.reduce((total, resource) => total + resource.rating, 0) / educationResources.length).toFixed(1)}
                  <Star className="h-4 w-4 text-amber-500 ml-1" />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Patient satisfaction rating
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search resources..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Treatment">Treatment</SelectItem>
                  <SelectItem value="Support">Support</SelectItem>
                  <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox />
                      </TableHead>
                      <TableHead className="min-w-[200px]">Title</TableHead>
                      <TableHead className="min-w-[100px]">Type</TableHead>
                      <TableHead className="min-w-[120px]">Category</TableHead>
                      <TableHead className="min-w-[120px]">Topic</TableHead>
                      <TableHead className="min-w-[80px]">Views</TableHead>
                      <TableHead className="min-w-[80px]">Rating</TableHead>
                      <TableHead className="min-w-[120px]">Last Updated</TableHead>
                      <TableHead className="min-w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResources.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-10 text-muted-foreground">
                          No resources match your criteria
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredResources.map((resource) => (
                        <TableRow key={resource.id}>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{resource.title}</div>
                            <div className="text-xs text-muted-foreground">{resource.id}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {getResourceTypeIcon(resource.type)}
                              <span className="capitalize">{resource.type}</span>
                            </div>
                          </TableCell>
                          <TableCell>{resource.category}</TableCell>
                          <TableCell>{resource.topic}</TableCell>
                          <TableCell>{resource.viewCount.toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {resource.rating} <Star className="h-3 w-3 text-amber-500 ml-1" fill="currentColor" />
                            </div>
                          </TableCell>
                          <TableCell>{resource.lastUpdated}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => console.log(`View ${resource.id}`)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Resource
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => console.log(`Edit ${resource.id}`)}>
                                  <FileText className="mr-2 h-4 w-4" />
                                  Edit Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => console.log(`Assign ${resource.id}`)}>
                                  <Users className="mr-2 h-4 w-4" />
                                  Assign to Patient
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => console.log(`Download ${resource.id}`)}>
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4 flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredResources.length} of {educationResources.length} resources
              </div>
              <Button variant="outline" size="sm">Load More</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="assignments" className="mt-0">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Patient Assignments</CardTitle>
              <CardDescription>Track educational resources assigned to patients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search assignments..."
                    className="pl-8 w-full sm:w-[300px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Button size="sm" onClick={() => console.log('Assign new resource')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Assign Resource
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[120px]">Assignment ID</TableHead>
                      <TableHead className="min-w-[150px]">Patient</TableHead>
                      <TableHead className="min-w-[200px]">Resource</TableHead>
                      <TableHead className="min-w-[150px]">Assigned By</TableHead>
                      <TableHead className="min-w-[120px]">Assigned Date</TableHead>
                      <TableHead className="min-w-[120px]">Due Date</TableHead>
                      <TableHead className="min-w-[100px]">Status</TableHead>
                      <TableHead className="min-w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAssignments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                          No assignments match your criteria
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredAssignments.map((assignment) => (
                        <TableRow key={assignment.id}>
                          <TableCell className="font-medium">{assignment.id}</TableCell>
                          <TableCell>
                            <div>
                              <div>{assignment.patientName}</div>
                              <div className="text-xs text-muted-foreground">{assignment.patientId}</div>
                            </div>
                          </TableCell>
                          <TableCell>{assignment.resource}</TableCell>
                          <TableCell>{assignment.assignedBy}</TableCell>
                          <TableCell>{assignment.assignDate}</TableCell>
                          <TableCell>{assignment.dueDate || 'N/A'}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(assignment.status)}>
                              {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                            </Badge>
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
                                <DropdownMenuItem onClick={() => console.log(`View ${assignment.id}`)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => console.log(`Remind ${assignment.id}`)}>
                                  <Mail className="mr-2 h-4 w-4" />
                                  Send Reminder
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => console.log(`Mark ${assignment.id}`)}>
                                  <Calendar className="mr-2 h-4 w-4" />
                                  {assignment.status === 'completed' ? 'Mark Incomplete' : 'Mark Completed'}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4 flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredAssignments.length} of {patientAssignments.length} assignments
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </CardFooter>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Assignment Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Assigned</span>
                      <span className="font-medium">{patientAssignments.filter(a => a.status === 'assigned').length}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full">
                      <div className="h-2 bg-blue-500 rounded-full" style={{ 
                        width: `${(patientAssignments.filter(a => a.status === 'assigned').length / patientAssignments.length) * 100}%` 
                      }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Viewed</span>
                      <span className="font-medium">{patientAssignments.filter(a => a.status === 'viewed').length}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full">
                      <div className="h-2 bg-amber-500 rounded-full" style={{ 
                        width: `${(patientAssignments.filter(a => a.status === 'viewed').length / patientAssignments.length) * 100}%` 
                      }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Completed</span>
                      <span className="font-medium">{patientAssignments.filter(a => a.status === 'completed').length}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full">
                      <div className="h-2 bg-green-500 rounded-full" style={{ 
                        width: `${(patientAssignments.filter(a => a.status === 'completed').length / patientAssignments.length) * 100}%` 
                      }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Expired</span>
                      <span className="font-medium">{patientAssignments.filter(a => a.status === 'expired').length}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full">
                      <div className="h-2 bg-red-500 rounded-full" style={{ 
                        width: `${(patientAssignments.filter(a => a.status === 'expired').length / patientAssignments.length) * 100}%` 
                      }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto py-4 justify-start" onClick={() => console.log('Send reminders')}>
                    <Mail className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Send Reminders</div>
                      <div className="text-xs text-muted-foreground">
                        Notify patients with pending assignments
                      </div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 justify-start" onClick={() => console.log('Group assignment')}>
                    <Users className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Group Assignment</div>
                      <div className="text-xs text-muted-foreground">
                        Assign resources to multiple patients
                      </div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 justify-start" onClick={() => console.log('Analytics')}>
                    <FileText className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Education Analytics</div>
                      <div className="text-xs text-muted-foreground">
                        View detailed effectiveness reports
                      </div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 justify-start" onClick={() => console.log('Upload new')}>
                    <Plus className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Create New Resource</div>
                      <div className="text-xs text-muted-foreground">
                        Upload or create educational material
                      </div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default PatientEducationPage;
