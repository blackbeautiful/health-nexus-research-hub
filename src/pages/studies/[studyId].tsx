
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Users,
  CalendarClock,
  FileText,
  BarChart2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  FileUp,
  Clipboard,
  RefreshCcw,
  Settings,
  Share2,
  MessageCircle
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import OutcomesChart from '@/components/analytics/OutcomesChart';

const StudyDetailsPage = () => {
  const { studyId } = useParams<{ studyId: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock study data - in a real application, we would fetch this based on studyId
  const studyData = {
    id: studyId || 'NCT039281754',
    title: 'BEACON-CRC Phase II Trial',
    description: 'A Randomized Phase II Trial of FOLFOX Plus Bevacizumab in Patients With Stage III Colorectal Cancer',
    phase: 'Phase II',
    status: 'Active',
    sponsor: 'Memorial Cancer Center',
    startDate: new Date('2025-01-15'),
    primaryCompletionDate: new Date('2027-01-15'),
    studyCompletionDate: new Date('2027-07-15'),
    enrollmentTarget: 120,
    enrollmentCurrent: 78,
    sites: 8,
    principalInvestigator: 'Dr. Elena Rodriguez',
    lastUpdated: new Date('2025-04-10'),
    createdAt: new Date('2024-12-05')
  };
  
  const enrollmentData = [
    { name: 'Enrolled', value: 78, color: '#4CAF50' },
    { name: 'Screening', value: 15, color: '#2196F3' },
    { name: 'Completed', value: 22, color: '#9C27B0' },
    { name: 'Withdrawn', value: 5, color: '#F44336' }
  ];
  
  const outcomeData = [
    { name: 'Complete Response', value: 12, color: '#4CAF50' },
    { name: 'Partial Response', value: 24, color: '#2196F3' },
    { name: 'Stable Disease', value: 30, color: '#FFC107' },
    { name: 'Progressive Disease', value: 12, color: '#F44336' }
  ];
  
  const recentActivities = [
    { id: 1, action: 'Patient enrolled', user: 'Dr. Jessica Lee', time: '2 hours ago' },
    { id: 2, action: 'Protocol amendment submitted', user: 'Dr. Elena Rodriguez', time: '1 day ago' },
    { id: 3, action: 'Follow-up visit completed', user: 'Nurse Michael Chen', time: '2 days ago' },
    { id: 4, action: 'Lab results uploaded', user: 'Dr. Robert Kim', time: '3 days ago' },
    { id: 5, action: 'Adverse event reported', user: 'Dr. Sarah Johnson', time: '4 days ago' }
  ];
  
  return (
    <Layout title={studyData.title}>
      <PageHeader 
        title={studyData.title} 
        description={studyData.description}
        breadcrumbs={[
          { label: 'Studies', link: '/studies' },
          { label: studyData.title }
        ]}
      />
      
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <div className="flex flex-wrap gap-2 justify-between items-start">
            <div>
              <CardTitle className="flex items-center">
                {studyData.id}
                <Badge className="ml-3" variant={studyData.status === 'Active' ? 'default' : 'outline'}>
                  {studyData.status}
                </Badge>
              </CardTitle>
              <CardDescription className="mt-1">
                {studyData.phase} • {studyData.sponsor} • Last updated: {studyData.lastUpdated.toLocaleDateString()}
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline">
                <Settings className="mr-1 h-4 w-4" />
                Settings
              </Button>
              <Button size="sm" variant="outline">
                <Share2 className="mr-1 h-4 w-4" />
                Share
              </Button>
              <Button size="sm">
                <MessageCircle className="mr-1 h-4 w-4" />
                Discuss
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-muted/40 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Enrollment</div>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-medium">{studyData.enrollmentCurrent}</div>
                <div className="text-sm text-muted-foreground">of {studyData.enrollmentTarget}</div>
              </div>
              <Progress value={(studyData.enrollmentCurrent / studyData.enrollmentTarget) * 100} className="mt-2" />
            </div>
            <div className="bg-muted/40 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Sites</div>
              <div className="text-2xl font-medium">{studyData.sites}</div>
              <div className="text-xs text-muted-foreground mt-2">Across 3 countries</div>
            </div>
            <div className="bg-muted/40 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Timeline</div>
              <div className="text-2xl font-medium">65%</div>
              <div className="text-xs text-muted-foreground mt-2">On target</div>
            </div>
            <div className="bg-muted/40 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Protocol Version</div>
              <div className="text-2xl font-medium">2.1</div>
              <div className="text-xs text-muted-foreground mt-2">3 amendments</div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm">
              <FileText className="mr-1 h-4 w-4" />
              Protocol
            </Button>
            <Button variant="outline" size="sm">
              <Users className="mr-1 h-4 w-4" />
              Patients
            </Button>
            <Button variant="outline" size="sm">
              <CalendarClock className="mr-1 h-4 w-4" />
              Schedule
            </Button>
            <Button variant="outline" size="sm">
              <BarChart2 className="mr-1 h-4 w-4" />
              Analytics
            </Button>
            <Button variant="outline" size="sm">
              <AlertTriangle className="mr-1 h-4 w-4" />
              Deviations
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="participants">Participants</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="finances">Finances</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Study Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Study Description</h4>
                  <p className="text-sm text-muted-foreground">
                    This randomized phase II trial studies how well FOLFOX plus bevacizumab works in treating patients with stage III 
                    colorectal cancer. Drugs used in chemotherapy, such as fluorouracil, leucovorin, and oxaliplatin (FOLFOX), work 
                    in different ways to stop the growth of tumor cells, either by killing the cells, by stopping them 
                    from dividing, or by stopping them from spreading. Monoclonal antibodies, such as bevacizumab, may 
                    block tumor growth by targeting specific proteins or by stopping blood vessels from growing. 
                    Giving FOLFOX plus bevacizumab may work better in treating colorectal cancer.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Primary Outcome Measures</h4>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Disease-free survival (DFS) at 3 years</li>
                    <li>Overall response rate (ORR) according to RECIST v1.1</li>
                    <li>Adverse events as assessed by CTCAE v5.0</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Secondary Outcome Measures</h4>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Overall survival (OS) at 5 years</li>
                    <li>Quality of life as measured by the EORTC QLQ-C30</li>
                  </ul>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Study Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Study Type:</span>
                        <span className="text-sm">Interventional</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Allocation:</span>
                        <span className="text-sm">Randomized</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Masking:</span>
                        <span className="text-sm">Open Label</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Primary Purpose:</span>
                        <span className="text-sm">Treatment</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Important Dates</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Start Date:</span>
                        <span className="text-sm">{studyData.startDate.toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Primary Completion:</span>
                        <span className="text-sm">{studyData.primaryCompletionDate.toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Study Completion:</span>
                        <span className="text-sm">{studyData.studyCompletionDate.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[350px]">
                  <div className="px-6">
                    {recentActivities.map((activity, index) => (
                      <div key={activity.id} className="py-3 border-b last:border-0">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            <Avatar className="h-8 w-8">
                              <div className="flex h-full w-full items-center justify-center bg-muted">
                                {activity.user.split(' ').map(name => name[0]).join('')}
                              </div>
                            </Avatar>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{activity.action}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">{activity.user}</span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="flex items-center text-xs text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                {activity.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="border-t p-3 flex justify-center">
                <Button variant="ghost" size="sm" className="text-xs">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Enrollment Status</CardTitle>
              </CardHeader>
              <CardContent>
                <OutcomesChart 
                  data={enrollmentData} 
                  title="Participant Status" 
                  description="Current enrollment statistics"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Treatment Outcomes</CardTitle>
              </CardHeader>
              <CardContent>
                <OutcomesChart 
                  data={outcomeData} 
                  title="Response Evaluation" 
                  description="Based on RECIST criteria"
                />
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Study Sites</CardTitle>
              <CardDescription>Active recruitment locations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Site Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Principal Investigator</TableHead>
                    <TableHead className="text-center">Target</TableHead>
                    <TableHead className="text-center">Enrolled</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Memorial Cancer Center</TableCell>
                    <TableCell>Boston, MA</TableCell>
                    <TableCell>Dr. Elena Rodriguez</TableCell>
                    <TableCell className="text-center">30</TableCell>
                    <TableCell className="text-center">24</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Active</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>University Medical Center</TableCell>
                    <TableCell>New York, NY</TableCell>
                    <TableCell>Dr. James Wilson</TableCell>
                    <TableCell className="text-center">25</TableCell>
                    <TableCell className="text-center">17</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Active</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Northwestern Oncology Institute</TableCell>
                    <TableCell>Chicago, IL</TableCell>
                    <TableCell>Dr. Sarah Johnson</TableCell>
                    <TableCell className="text-center">20</TableCell>
                    <TableCell className="text-center">12</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Active</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Southwest Research Hospital</TableCell>
                    <TableCell>Houston, TX</TableCell>
                    <TableCell>Dr. Robert Kim</TableCell>
                    <TableCell className="text-center">15</TableCell>
                    <TableCell className="text-center">8</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Active</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="participants">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Study Participants</CardTitle>
                <CardDescription>Manage and track patient enrollment</CardDescription>
              </div>
              <Button>
                <Users className="mr-2 h-4 w-4" />
                Add Participant
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    All
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <CheckCircle className="h-3.5 w-3.5 mr-1 text-green-500" />
                    Active
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1 text-amber-500" />
                    Screening
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <XCircle className="h-3.5 w-3.5 mr-1 text-red-500" />
                    Withdrawn
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search participants..."
                    className="pl-8 w-[250px]"
                  />
                </div>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient ID</TableHead>
                      <TableHead>Site</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>Enrollment Date</TableHead>
                      <TableHead>Current Cycle</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell>PT-{(1000 + i).toString()}</TableCell>
                        <TableCell>{i % 2 === 0 ? 'Boston' : i % 3 === 0 ? 'New York' : 'Chicago'}</TableCell>
                        <TableCell>{55 + Math.floor(Math.random() * 20)}</TableCell>
                        <TableCell>{i % 2 === 0 ? 'Male' : 'Female'}</TableCell>
                        <TableCell>{new Date(2025, 0, 15 + i * 5).toLocaleDateString()}</TableCell>
                        <TableCell>Cycle {Math.floor(Math.random() * 6) + 1}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className={i % 4 === 0 ? "bg-amber-100 text-amber-800 border-amber-200" : "bg-green-100 text-green-800 border-green-200"}>
                            {i % 4 === 0 ? 'Screening' : 'Active'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Study Documents</CardTitle>
                <CardDescription>Access and manage all study-related documentation</CardDescription>
              </div>
              <Button>
                <FileUp className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Date Modified</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Study Protocol</TableCell>
                    <TableCell>Protocol</TableCell>
                    <TableCell>v2.1</TableCell>
                    <TableCell>Apr 8, 2025</TableCell>
                    <TableCell>Dr. Elena Rodriguez</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Approved</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Informed Consent Form</TableCell>
                    <TableCell>Consent</TableCell>
                    <TableCell>v1.2</TableCell>
                    <TableCell>Mar 15, 2025</TableCell>
                    <TableCell>Dr. James Wilson</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Approved</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Case Report Form Template</TableCell>
                    <TableCell>Forms</TableCell>
                    <TableCell>v1.0</TableCell>
                    <TableCell>Feb 22, 2025</TableCell>
                    <TableCell>Dr. Sarah Johnson</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Approved</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Protocol Amendment 3</TableCell>
                    <TableCell>Amendment</TableCell>
                    <TableCell>v1.0</TableCell>
                    <TableCell>Apr 10, 2025</TableCell>
                    <TableCell>Dr. Elena Rodriguez</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Pending</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Site Initiation Visit Report</TableCell>
                    <TableCell>Report</TableCell>
                    <TableCell>v1.0</TableCell>
                    <TableCell>Jan 30, 2025</TableCell>
                    <TableCell>Sarah Johnson</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Approved</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default StudyDetailsPage;
