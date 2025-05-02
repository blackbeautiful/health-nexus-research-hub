
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, Filter, FileText, Plus, TestTube, Calendar, 
  FileSpreadsheet, MoreHorizontal, Clock, CheckCircle, AlertTriangle
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

interface MedicalOrder {
  id: string;
  patient: string;
  patientId: string;
  orderType: string;
  description: string;
  provider: string;
  orderedDate: string;
  dueDate: string;
  status: 'pending' | 'scheduled' | 'completed' | 'canceled';
  priority: 'routine' | 'urgent' | 'stat';
}

const MedicalOrdersPage = () => {
  const medicalOrders: MedicalOrder[] = [
    {
      id: 'ORD-10245',
      patient: 'Sarah Johnson',
      patientId: 'PT-12345',
      orderType: 'Laboratory',
      description: 'CBC, CMP, Tumor Markers (CA 15-3, CEA)',
      provider: 'Dr. Rebecca Martinez',
      orderedDate: '2025-04-30',
      dueDate: '2025-05-03',
      status: 'pending',
      priority: 'routine'
    },
    {
      id: 'ORD-10244',
      patient: 'Michael Smith',
      patientId: 'PT-12346',
      orderType: 'Imaging',
      description: 'CT Scan - Chest/Abdomen/Pelvis with contrast',
      provider: 'Dr. James Wilson',
      orderedDate: '2025-04-29',
      dueDate: '2025-05-06',
      status: 'scheduled',
      priority: 'routine'
    },
    {
      id: 'ORD-10243',
      patient: 'Emma Thompson',
      patientId: 'PT-12347',
      orderType: 'Laboratory',
      description: 'CBC with Differential, CMP, LFTs',
      provider: 'Dr. Elena Rodriguez',
      orderedDate: '2025-04-29',
      dueDate: '2025-05-02',
      status: 'completed',
      priority: 'urgent'
    },
    {
      id: 'ORD-10242',
      patient: 'John Davis',
      patientId: 'PT-12348',
      orderType: 'Consult',
      description: 'Surgical Oncology Consultation',
      provider: 'Dr. Robert Kim',
      orderedDate: '2025-04-28',
      dueDate: '2025-05-12',
      status: 'scheduled',
      priority: 'routine'
    },
    {
      id: 'ORD-10241',
      patient: 'Linda Wilson',
      patientId: 'PT-12349',
      orderType: 'Laboratory',
      description: 'CBC, CMP, Immunoglobulins',
      provider: 'Dr. Sarah Williams',
      orderedDate: '2025-04-28',
      dueDate: '2025-04-30',
      status: 'completed',
      priority: 'routine'
    },
    {
      id: 'ORD-10240',
      patient: 'Robert Johnson',
      patientId: 'PT-12350',
      orderType: 'Procedure',
      description: 'Bone Marrow Biopsy',
      provider: 'Dr. Sarah Williams',
      orderedDate: '2025-04-25',
      dueDate: '2025-05-02',
      status: 'completed',
      priority: 'urgent'
    },
    {
      id: 'ORD-10239',
      patient: 'Sarah Johnson',
      patientId: 'PT-12345',
      orderType: 'Imaging',
      description: 'Mammogram - Diagnostic',
      provider: 'Dr. Rebecca Martinez',
      orderedDate: '2025-04-20',
      dueDate: '2025-04-27',
      status: 'completed',
      priority: 'routine'
    },
    {
      id: 'ORD-10238',
      patient: 'Michael Smith',
      patientId: 'PT-12346',
      orderType: 'Imaging',
      description: 'Bone Scan',
      provider: 'Dr. James Wilson',
      orderedDate: '2025-04-18',
      dueDate: '2025-04-26',
      status: 'canceled',
      priority: 'routine'
    }
  ];

  const orderCounts = {
    laboratory: 142,
    imaging: 87,
    consult: 53,
    procedure: 35,
    other: 18
  };

  // Function to render status badge with appropriate color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Pending</Badge>;
      case 'scheduled':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Scheduled</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case 'canceled':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Canceled</Badge>;
      default:
        return null;
    }
  };

  // Function to render priority badge with appropriate color
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'routine':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">Routine</Badge>;
      case 'urgent':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Urgent</Badge>;
      case 'stat':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">STAT</Badge>;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <PageHeader
        title="Medical Orders"
        description="Create and manage patient orders and requests"
        breadcrumbs={[
          { label: 'Clinical Workflows', link: '/clinical-workflows' },
          { label: 'Medical Orders' }
        ]}
        action={{
          label: 'New Order',
          icon: Plus,
          onClick: () => console.log('Create new medical order')
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Laboratory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">{orderCounts.laboratory}</div>
              <div className="ml-auto p-2 bg-purple-50 text-purple-500 rounded-full">
                <TestTube className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Imaging</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">{orderCounts.imaging}</div>
              <div className="ml-auto p-2 bg-blue-50 text-blue-500 rounded-full">
                <FileSpreadsheet className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Consults</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">{orderCounts.consult}</div>
              <div className="ml-auto p-2 bg-green-50 text-green-500 rounded-full">
                <FileText className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Procedures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">{orderCounts.procedure}</div>
              <div className="ml-auto p-2 bg-amber-50 text-amber-500 rounded-full">
                <Calendar className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Other</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">{orderCounts.other}</div>
              <div className="ml-auto p-2 bg-gray-100 text-gray-500 rounded-full">
                <FileText className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="pl-8 w-[250px] md:w-[300px]"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Lab Order
          </Button>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Imaging Order
          </Button>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Consult
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>Medical Orders</CardTitle>
              <CardDescription>All patient orders and service requests</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="lab">Laboratory</TabsTrigger>
              <TabsTrigger value="imaging">Imaging</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Order Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicalOrders.map((order) => (
                <TableRow key={order.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div>{order.patient}</div>
                      <div className="text-xs text-muted-foreground">{order.patientId}</div>
                    </div>
                  </TableCell>
                  <TableCell>{order.orderType}</TableCell>
                  <TableCell>{order.description}</TableCell>
                  <TableCell>{order.provider}</TableCell>
                  <TableCell>{order.dueDate}</TableCell>
                  <TableCell>{getPriorityBadge(order.priority)}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => console.log(`View ${order.id}`)}>
                          <FileText className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        
                        {(order.status === 'pending' || order.status === 'scheduled') && (
                          <>
                            <DropdownMenuItem onClick={() => console.log(`Edit ${order.id}`)}>
                              <FileText className="mr-2 h-4 w-4" />
                              Edit Order
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => console.log(`Complete ${order.id}`)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark as Completed
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log(`Cancel ${order.id}`)} className="text-red-600">
                              <AlertTriangle className="mr-2 h-4 w-4" />
                              Cancel Order
                            </DropdownMenuItem>
                          </>
                        )}
                        
                        {order.status === 'completed' && (
                          <DropdownMenuItem onClick={() => console.log(`Results ${order.id}`)}>
                            <FileSpreadsheet className="mr-2 h-4 w-4" />
                            View Results
                          </DropdownMenuItem>
                        )}
                        
                        <DropdownMenuItem onClick={() => console.log(`Reorder ${order.id}`)}>
                          <FileText className="mr-2 h-4 w-4" />
                          Reorder
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
            Showing {medicalOrders.length} of 335 orders
          </div>
          <Button variant="outline">Load More</Button>
        </CardFooter>
      </Card>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Orders</CardTitle>
            <CardDescription>Orders due in the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {medicalOrders
                .filter(order => order.status === 'pending' || order.status === 'scheduled')
                .slice(0, 4)
                .map((order) => (
                  <div key={order.id} className="flex justify-between items-start pb-4 border-b">
                    <div>
                      <div className="font-medium">{order.description}</div>
                      <div className="text-sm text-muted-foreground">
                        {order.patient} ({order.patientId})
                      </div>
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Due: {order.dueDate}</span>
                      </div>
                    </div>
                    <div>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View All Upcoming</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates to orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="p-2 bg-green-50 text-green-500 rounded-full">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium">Order Completed</div>
                  <div className="text-sm text-muted-foreground">Laboratory results for Emma Thompson are ready</div>
                  <div className="text-xs text-muted-foreground mt-1">Today at 9:45 AM</div>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="p-2 bg-blue-50 text-blue-500 rounded-full">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium">Order Scheduled</div>
                  <div className="text-sm text-muted-foreground">CT Scan for Michael Smith scheduled for May 6</div>
                  <div className="text-xs text-muted-foreground mt-1">Today at 8:30 AM</div>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="p-2 bg-purple-50 text-purple-500 rounded-full">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium">New Order Created</div>
                  <div className="text-sm text-muted-foreground">Laboratory order created for Sarah Johnson</div>
                  <div className="text-xs text-muted-foreground mt-1">Today at 7:15 AM</div>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="p-2 bg-red-50 text-red-500 rounded-full">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium">Order Canceled</div>
                  <div className="text-sm text-muted-foreground">Bone Scan for Michael Smith was canceled</div>
                  <div className="text-xs text-muted-foreground mt-1">Yesterday at 4:30 PM</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full text-center text-xs text-muted-foreground">
              <div className="flex items-center justify-center">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>Last updated: May 2, 2025 at 10:30 AM</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default MedicalOrdersPage;
