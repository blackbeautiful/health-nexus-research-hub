
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import PageTitle from '@/components/common/PageTitle';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  FileText, 
  AlertTriangle, 
  Calendar, 
  FlaskConical, 
  BarChart4, 
  Clock,
  ClipboardCheck,
  Search,
  ArrowRight,
  Plus
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import { useToast } from '@/hooks/use-toast';

const ResearcherDashboard = () => {
  const { toast } = useToast();
  
  const handleAction = () => {
    toast({
      title: "Action initiated",
      description: "This functionality will be implemented in the next update."
    });
  };
  
  return (
    <MainLayout>
      <PageTitle 
        title="Researcher Dashboard" 
        description="Overview of your studies, patients, and tasks"
        actions={
          <>
            <Button variant="outline" onClick={handleAction}>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
            <Button variant="outline" onClick={handleAction}>
              <Calendar className="mr-2 h-4 w-4" />
              Schedule
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Study
            </Button>
          </>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Active Studies" 
          value="3" 
          icon={<FlaskConical className="h-5 w-5" />}
          trend={{ value: 0, isPositive: true }}
        />
        <StatCard 
          title="Enrolled Patients" 
          value="78" 
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 5.2, isPositive: true }}
        />
        <StatCard 
          title="Pending Tasks" 
          value="12" 
          icon={<ClipboardCheck className="h-5 w-5" />}
          trend={{ value: 2.1, isPositive: false }}
        />
        <StatCard 
          title="Upcoming Deadlines" 
          value="5" 
          icon={<Clock className="h-5 w-5" />}
          trend={{ value: 1, isPositive: false }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>My Active Studies</CardTitle>
            <CardDescription>Studies you are currently managing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "BEACON-CRC",
                  title: "BEACON-CRC Phase II Trial",
                  description: "FOLFOX + Bevacizumab in Stage III Colorectal Cancer",
                  enrollment: 42,
                  target: 120,
                  role: "Principal Investigator",
                  status: "active"
                },
                {
                  id: "LUNG-PRECISION",
                  title: "Lung Precision Medicine Study",
                  description: "Targeted therapy based on genomic profiling in NSCLC",
                  enrollment: 28,
                  target: 50,
                  role: "Co-Investigator",
                  status: "active"
                },
                {
                  id: "IMMUNE-BREAST",
                  title: "Immunotherapy in Triple Negative Breast Cancer",
                  description: "Combination checkpoint inhibitor therapy",
                  enrollment: 8,
                  target: 40,
                  role: "Sub-Investigator",
                  status: "enrolling"
                }
              ].map((study, i) => (
                <div key={i} className="p-4 border rounded-lg">
                  <div className="flex flex-wrap justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{study.title}</h3>
                        <Badge variant={study.status === "active" ? "default" : "outline"}>
                          {study.status === "active" ? "Active" : "Enrolling"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{study.description}</p>
                    </div>
                    <Badge variant="outline">{study.role}</Badge>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Enrollment</span>
                      <span>{study.enrollment} of {study.target} patients</span>
                    </div>
                    <Progress value={(study.enrollment / study.target) * 100} className="h-2" />
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/studies/${study.id}`}>
                        View Study
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/studies">View All Studies</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Tasks Requiring Attention</CardTitle>
            <CardDescription>Urgent and upcoming tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="urgent">
              <TabsList className="w-full">
                <TabsTrigger value="urgent" className="flex-1">Urgent</TabsTrigger>
                <TabsTrigger value="upcoming" className="flex-1">Upcoming</TabsTrigger>
              </TabsList>
              <div className="mt-4 space-y-3">
                <div className="p-3 border-l-4 border-red-500 rounded-md bg-red-50">
                  <div className="flex gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500 shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm">SAE Report Required</h4>
                      <p className="text-xs text-muted-foreground">BEACON-CRC Study - Due Today</p>
                    </div>
                  </div>
                  <Button size="sm" className="mt-2 w-full">Complete Report</Button>
                </div>
                
                <div className="p-3 border-l-4 border-amber-500 rounded-md bg-amber-50">
                  <div className="flex gap-2">
                    <FileText className="h-5 w-5 text-amber-500 shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm">Protocol Amendment Review</h4>
                      <p className="text-xs text-muted-foreground">Lung Precision Study - Due in 2 days</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="mt-2 w-full">Review Document</Button>
                </div>
                
                <div className="p-3 border-l-4 border-blue-500 rounded-md bg-blue-50">
                  <div className="flex gap-2">
                    <Calendar className="h-5 w-5 text-blue-500 shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm">DSMB Meeting Preparation</h4>
                      <p className="text-xs text-muted-foreground">BEACON-CRC Study - Due in 3 days</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="mt-2 w-full">Prepare Materials</Button>
                </div>
              </div>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/tasks">View All Tasks</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Patient Activity</CardTitle>
            <CardDescription>Latest updates on your patients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "CRC-042",
                  name: "Sarah Johnson",
                  study: "BEACON-CRC",
                  activity: "Completed Cycle 4",
                  timestamp: "Today, 10:15 AM"
                },
                {
                  id: "LUNG-028",
                  name: "Robert Chang",
                  study: "Lung Precision",
                  activity: "Reported Grade 2 AE",
                  timestamp: "Yesterday, 2:30 PM"
                },
                {
                  id: "CRC-038",
                  name: "Maria Santos",
                  study: "BEACON-CRC",
                  activity: "Lab Results Available",
                  timestamp: "Apr 12, 2025"
                },
                {
                  id: "TNBC-008",
                  name: "Emily Wright",
                  study: "Immune-Breast",
                  activity: "Screening Complete",
                  timestamp: "Apr 11, 2025"
                }
              ].map((patient, i) => (
                <div key={i} className="p-3 border rounded-md">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium text-sm">{patient.name}</h4>
                    <span className="text-xs text-muted-foreground">{patient.id}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{patient.study} Study</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm">{patient.activity}</p>
                    <span className="text-xs text-muted-foreground">{patient.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/patients">View All Patients</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Site Visits</CardTitle>
            <CardDescription>Scheduled monitoring and audit visits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  type: "Sponsor Monitoring",
                  study: "BEACON-CRC",
                  date: "Apr 22-23, 2025",
                  status: "Confirmed"
                },
                {
                  type: "Internal Quality Review",
                  study: "Lung Precision",
                  date: "May 5, 2025",
                  status: "Scheduled"
                },
                {
                  type: "FDA Inspection",
                  study: "All Active Studies",
                  date: "May 18-20, 2025",
                  status: "Tentative"
                }
              ].map((visit, i) => (
                <div key={i} className="p-3 border rounded-md">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium text-sm">{visit.type}</h4>
                    <Badge variant={
                      visit.status === "Confirmed" ? "default" :
                      visit.status === "Scheduled" ? "outline" :
                      "secondary"
                    }>
                      {visit.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{visit.study}</p>
                  <div className="flex items-center mt-2">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <p className="text-sm">{visit.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/studies/site-visits">View All Site Visits</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Analytics</CardTitle>
            <CardDescription>Key metrics across your studies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Overall Enrollment Rate</span>
                  <span className="text-sm">72%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Protocol Adherence</span>
                  <span className="text-sm">94%</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Data Completeness</span>
                  <span className="text-sm">89%</span>
                </div>
                <Progress value={89} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-6">
                <div className="border rounded-md p-2 text-center">
                  <div className="text-2xl font-bold text-green-600">0</div>
                  <div className="text-xs text-muted-foreground">Outstanding SAEs</div>
                </div>
                <div className="border rounded-md p-2 text-center">
                  <div className="text-2xl font-bold text-amber-600">3</div>
                  <div className="text-xs text-muted-foreground">Protocol Deviations</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/analytics">
                <BarChart4 className="mr-2 h-4 w-4" />
                View Detailed Analytics
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ResearcherDashboard;
