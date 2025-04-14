import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronLeft, 
  Users, 
  FileText, 
  Calendar, 
  Activity, 
  Pill, 
  AlertTriangle, 
  ChevronRight,
  Download,
  Search as SearchIcon,
  Edit,
  Share
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const mockStudy = {
  id: "BEACON-CRC",
  title: "BEACON-CRC Phase II Trial",
  description: "FOLFOX + Bevacizumab in Stage III Colorectal Cancer",
  status: "active",
  phase: "Phase II",
  startDate: "Jan 15, 2025",
  endDate: "Dec 31, 2027",
  sponsor: "National Cancer Institute",
  totalPatients: 120,
  enrolledPatients: 42,
  pi: "Dr. Rebecca Martinez",
  sites: 8
};

const StudyDetailsPage = () => {
  const { studyId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  
  // In a real application, you would fetch the study data based on studyId
  const study = mockStudy; // Using mock data for now
  
  if (!study) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <h2 className="text-2xl font-bold mb-4">Study Not Found</h2>
          <p className="text-muted-foreground mb-6">The requested study was not found.</p>
          <Button asChild>
            <Link to="/studies">Return to Studies List</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  // Calculate completion percentage
  const enrollmentPercentage = Math.round((study.enrolledPatients / study.totalPatients) * 100);

  return (
    <MainLayout>
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link to="/studies">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{study.title}</h1>
          <p className="text-muted-foreground">{study.description}</p>
        </div>
        <div className="flex gap-2 mt-2 sm:mt-0">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      {/* Study summary cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Study Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Study ID</p>
                <p className="font-medium">{study.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phase</p>
                <p className="font-medium">{study.phase}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant={study.status === "active" ? "default" : "outline"}>
                  {study.status === "active" ? "Active" : study.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p className="font-medium">{study.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">End Date</p>
                <p className="font-medium">{study.endDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Principal Investigator</p>
                <p className="font-medium">{study.pi}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sponsor</p>
                <p className="font-medium">{study.sponsor}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sites</p>
                <p className="font-medium">{study.sites} sites</p>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Protocol Documents</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Protocol v2.1
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  ICF Template
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  CRF Package
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Lab Manual
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Enrollment Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Patient Enrollment</span>
                  <span className="text-sm">{study.enrolledPatients} of {study.totalPatients}</span>
                </div>
                <Progress value={enrollmentPercentage} />
                <p className="text-xs text-muted-foreground mt-1">{enrollmentPercentage}% Complete</p>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-6">
                <div className="border rounded-md p-2 text-center">
                  <div className="text-2xl font-bold">42</div>
                  <div className="text-xs text-muted-foreground">Enrolled</div>
                </div>
                <div className="border rounded-md p-2 text-center">
                  <div className="text-2xl font-bold">38</div>
                  <div className="text-xs text-muted-foreground">Active</div>
                </div>
                <div className="border rounded-md p-2 text-center">
                  <div className="text-2xl font-bold">4</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-sm text-muted-foreground mb-1">Next Milestone</p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <p className="font-medium">Interim Analysis: Aug 15, 2025</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Users className="h-4 w-4 mr-2" />
              View Participants
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Study data tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="visits">Site Visits</TabsTrigger>
            <TabsTrigger value="deviations">Protocol Deviations</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-2 border-primary pl-4 pb-4">
                    <p className="text-xs text-muted-foreground">Today, 9:32 AM</p>
                    <p className="font-medium">New patient enrolled</p>
                    <p className="text-sm">Patient ID: CRC-042 added by Dr. Wilson</p>
                  </div>
                  <div className="border-l-2 border-primary pl-4 pb-4">
                    <p className="text-xs text-muted-foreground">Yesterday, 2:15 PM</p>
                    <p className="font-medium">Protocol amendment approved</p>
                    <p className="text-sm">Version 2.1 now active</p>
                  </div>
                  <div className="border-l-2 border-primary pl-4 pb-4">
                    <p className="text-xs text-muted-foreground">Apr 12, 2025</p>
                    <p className="font-medium">Site activation completed</p>
                    <p className="text-sm">Memorial Research Center is now active</p>
                  </div>
                  <div className="border-l-2 border-primary pl-4">
                    <p className="text-xs text-muted-foreground">Apr 10, 2025</p>
                    <p className="font-medium">DSMB review completed</p>
                    <p className="text-sm">Study continues with no safety concerns</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
                <CardDescription>Study performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Screening Success Rate</span>
                      <span className="text-sm">78%</span>
                    </div>
                    <Progress value={78} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Protocol Adherence</span>
                      <span className="text-sm">92%</span>
                    </div>
                    <Progress value={92} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Data Completeness</span>
                      <span className="text-sm">95%</span>
                    </div>
                    <Progress value={95} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Query Resolution</span>
                      <span className="text-sm">87%</span>
                    </div>
                    <Progress value={87} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Adverse Events Summary</CardTitle>
                <CardDescription>Safety monitoring overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-muted p-4 rounded-lg flex-1 min-w-[200px]">
                    <div className="text-3xl font-bold">12</div>
                    <p className="text-sm text-muted-foreground">Total AEs Reported</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg flex-1 min-w-[200px]">
                    <div className="text-3xl font-bold">2</div>
                    <p className="text-sm text-muted-foreground">Serious AEs</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg flex-1 min-w-[200px]">
                    <div className="text-3xl font-bold">0</div>
                    <p className="text-sm text-muted-foreground">SUSARs</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg flex-1 min-w-[200px]">
                    <div className="text-3xl font-bold">10</div>
                    <p className="text-sm text-muted-foreground">Resolved AEs</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Recent Adverse Events</h4>
                    <Button variant="outline" size="sm">View All</Button>
                  </div>
                  
                  <div className="space-y-2">
                    {[
                      { id: "AE-042", description: "Grade 2 Neutropenia", date: "Apr 8, 2025", grade: "Grade 2", status: "Ongoing" },
                      { id: "AE-041", description: "Grade 1 Fatigue", date: "Apr 6, 2025", grade: "Grade 1", status: "Resolved" },
                      { id: "AE-040", description: "Grade 3 Neuropathy", date: "Apr 2, 2025", grade: "Grade 3", status: "Ongoing" }
                    ].map((ae, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{ae.id}</span>
                            <span className="text-sm">{ae.description}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{ae.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{ae.grade}</Badge>
                          <Badge variant={ae.status === "Resolved" ? "outline" : "secondary"}>
                            {ae.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="patients" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <CardTitle>Study Participants</CardTitle>
                  <CardDescription>All patients enrolled in this trial</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative w-[250px]">
                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search patients..." className="pl-8" />
                  </div>
                  <Button>
                    <Users className="h-4 w-4 mr-2" />
                    Add Patient
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">This feature will be implemented in the next update.</p>
                <Button>View Implementation Plan</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Other tab contents would go here */}
        <TabsContent value="timeline" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Study Timeline</CardTitle>
              <CardDescription>Key milestones and events</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground mb-4">Timeline view will be implemented in the next update.</p>
              <Button>View Implementation Plan</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default StudyDetailsPage;
