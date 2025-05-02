
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, Filter, Plus, Check, AlertCircle, Clock } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DataCollectionPage: React.FC = () => {
  const formTypes = [
    {
      id: 'eCRF-001',
      name: 'Screening Form',
      module: 'Enrollment',
      items: 32,
      completion: 98,
      status: 'active'
    },
    {
      id: 'eCRF-002',
      name: 'Demographic Information',
      module: 'Baseline',
      items: 24,
      completion: 96,
      status: 'active'
    },
    {
      id: 'eCRF-003',
      name: 'Medical History',
      module: 'Baseline',
      items: 45,
      completion: 92,
      status: 'active'
    },
    {
      id: 'eCRF-004',
      name: 'Physical Examination',
      module: 'Clinical Assessment',
      items: 36,
      completion: 88,
      status: 'active'
    },
    {
      id: 'eCRF-005',
      name: 'Laboratory Results',
      module: 'Clinical Assessment',
      items: 58,
      completion: 85,
      status: 'active'
    },
    {
      id: 'eCRF-006',
      name: 'Adverse Events',
      module: 'Safety',
      items: 42,
      completion: 90,
      status: 'active'
    },
    {
      id: 'eCRF-007',
      name: 'Concomitant Medications',
      module: 'Treatment',
      items: 38,
      completion: 87,
      status: 'active'
    },
    {
      id: 'eCRF-008',
      name: 'Quality of Life Assessment',
      module: 'Patient Reported',
      items: 64,
      completion: 78,
      status: 'active'
    }
  ];
  
  const pendingTasks = [
    {
      id: 'TASK-1001',
      form: 'Physical Examination',
      patient: 'ID-5241',
      site: 'Memorial Cancer Center',
      status: 'overdue',
      dueDate: '2025-04-28'
    },
    {
      id: 'TASK-1002',
      form: 'Quality of Life Assessment',
      patient: 'ID-4872',
      site: 'University Medical Research',
      status: 'pending',
      dueDate: '2025-05-03'
    },
    {
      id: 'TASK-1003',
      form: 'Laboratory Results',
      patient: 'ID-5014',
      site: 'Pacific Research Institute',
      status: 'pending',
      dueDate: '2025-05-02'
    },
    {
      id: 'TASK-1004',
      form: 'Adverse Events',
      patient: 'ID-4926',
      site: 'Atlanta Research Institute',
      status: 'overdue',
      dueDate: '2025-04-25'
    },
    {
      id: 'TASK-1005',
      form: 'Concomitant Medications',
      patient: 'ID-5137',
      site: 'Midwest Clinical Center',
      status: 'pending',
      dueDate: '2025-05-05'
    }
  ];
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case 'draft':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">Draft</Badge>;
      case 'archived':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Archived</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Pending</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  return (
    <MainLayout>
      <PageHeader 
        title="Data Collection" 
        description="Electronic data capture and form management"
        breadcrumbs={[
          { label: 'Research Data', link: '/research-data' },
          { label: 'Data Collection' }
        ]}
        action={{
          label: "Create Form",
          icon: Plus,
          onClick: () => console.log("Create new data collection form")
        }}
      />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <Select defaultValue="BEACON-CRC">
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select study" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="BEACON-CRC">BEACON-CRC Phase II Trial</SelectItem>
            <SelectItem value="BRAVADO">BRAVADO Metastatic Breast Cancer Study</SelectItem>
            <SelectItem value="PALADIN">PALADIN Lung Cancer Immunotherapy Trial</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter Forms
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Forms Created</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">
              8 active forms in use
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Data Completion Rate</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">87.5%</div>
            <Progress value={87.5} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              2.3% increase from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">5</div>
            <p className="text-xs text-muted-foreground mt-1">
              2 overdue tasks requiring attention
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="forms" className="mb-6">
        <TabsList>
          <TabsTrigger value="forms">Data Collection Forms</TabsTrigger>
          <TabsTrigger value="tasks">Pending Tasks</TabsTrigger>
          <TabsTrigger value="schedule">Collection Schedule</TabsTrigger>
        </TabsList>
        
        <TabsContent value="forms" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Electronic Case Report Forms</CardTitle>
              <CardDescription>List of all data collection forms for this study</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Form ID</TableHead>
                    <TableHead>Form Name</TableHead>
                    <TableHead>Module</TableHead>
                    <TableHead>No. Items</TableHead>
                    <TableHead>Completion Rate</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formTypes.map((form) => (
                    <TableRow key={form.id}>
                      <TableCell className="font-medium">{form.id}</TableCell>
                      <TableCell>{form.name}</TableCell>
                      <TableCell>{form.module}</TableCell>
                      <TableCell>{form.items}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={form.completion} className="h-2 w-20" />
                          <span className="text-sm">{form.completion}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(form.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Manage All Forms</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Data Collection Tasks</CardTitle>
              <CardDescription>Tasks requiring action or data entry</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task ID</TableHead>
                    <TableHead>Form</TableHead>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Research Site</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.id}</TableCell>
                      <TableCell>{task.form}</TableCell>
                      <TableCell>{task.patient}</TableCell>
                      <TableCell>{task.site}</TableCell>
                      <TableCell>{task.dueDate}</TableCell>
                      <TableCell>{getStatusBadge(task.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Complete</Button>
                        <Button variant="ghost" size="sm">Reassign</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Tasks</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule" className="mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <Clock className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-medium">Data Collection Schedule</h3>
                <p className="mt-2 mb-4 text-sm text-muted-foreground max-w-md">
                  Configure timing and frequency of data collection activities across study visits.
                  Schedule automatic reminders and track upcoming data collection points.
                </p>
                <div className="flex justify-center gap-4">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Schedule
                  </Button>
                  <Button variant="outline">
                    View Calendar
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default DataCollectionPage;
