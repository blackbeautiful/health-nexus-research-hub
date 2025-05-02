
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Search, Filter, Plus, Calendar, FileText, Clock, Download, 
  MoreHorizontal, ClipboardList, Zap, CheckCircle, X, AlertCircle
} from 'lucide-react';
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
  type: 'lab' | 'imaging' | 'procedure' | 'consultation' | 'referral';
  patientName: string;
  patientId: string;
  description: string;
  provider: string;
  orderDate: string;
  status: 'pending' | 'approved' | 'completed' | 'cancelled' | 'denied';
  priority: 'routine' | 'urgent' | 'stat';
  dueDate?: string;
  notes?: string;
}

const MedicalOrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  // Sample medical orders data
  const medicalOrders: MedicalOrder[] = [
    {
      id: 'ORD-2025-1001',
      type: 'lab',
      patientName: 'Sarah Johnson',
      patientId: 'PT-12345',
      description: 'Complete Blood Count, Comprehensive Metabolic Panel',
      provider: 'Dr. Rebecca Martinez',
      orderDate: '2025-04-10',
      status: 'pending',
      priority: 'routine',
      dueDate: '2025-04-15'
    },
    {
      id: 'ORD-2025-1002',
      type: 'imaging',
      patientName: 'Michael Smith',
      patientId: 'PT-12346',
      description: 'Chest CT with contrast',
      provider: 'Dr. James Wilson',
      orderDate: '2025-04-09',
      status: 'approved',
      priority: 'urgent',
      dueDate: '2025-04-11',
      notes: 'Patient has history of lung nodules'
    },
    {
      id: 'ORD-2025-1003',
      type: 'procedure',
      patientName: 'Emma Thompson',
      patientId: 'PT-12347',
      description: 'Bone Marrow Biopsy',
      provider: 'Dr. Elena Rodriguez',
      orderDate: '2025-04-08',
      status: 'completed',
      priority: 'routine',
      dueDate: '2025-04-12'
    },
    {
      id: 'ORD-2025-1004',
      type: 'consultation',
      patientName: 'John Davis',
      patientId: 'PT-12348',
      description: 'Radiation Oncology Consultation',
      provider: 'Dr. Robert Kim',
      orderDate: '2025-04-10',
      status: 'pending',
      priority: 'routine',
      dueDate: '2025-04-17'
    },
    {
      id: 'ORD-2025-1005',
      type: 'lab',
      patientName: 'Linda Wilson',
      patientId: 'PT-12349',
      description: 'Tumor Marker Panel, CA-125',
      provider: 'Dr. Rebecca Martinez',
      orderDate: '2025-04-07',
      status: 'completed',
      priority: 'routine',
      dueDate: '2025-04-10'
    },
    {
      id: 'ORD-2025-1006',
      type: 'imaging',
      patientName: 'David Brown',
      patientId: 'PT-12350',
      description: 'PET/CT Scan',
      provider: 'Dr. James Wilson',
      orderDate: '2025-04-06',
      status: 'cancelled',
      priority: 'urgent',
      dueDate: '2025-04-08',
      notes: 'Patient requested cancellation due to scheduling conflict'
    },
    {
      id: 'ORD-2025-1007',
      type: 'referral',
      patientName: 'Sarah Johnson',
      patientId: 'PT-12345',
      description: 'Genetic Counseling Referral',
      provider: 'Dr. Rebecca Martinez',
      orderDate: '2025-04-10',
      status: 'approved',
      priority: 'routine',
      dueDate: '2025-04-24'
    },
    {
      id: 'ORD-2025-1008',
      type: 'lab',
      patientName: 'Michael Smith',
      patientId: 'PT-12346',
      description: 'Molecular Profiling, EGFR Mutation Analysis',
      provider: 'Dr. James Wilson',
      orderDate: '2025-04-09',
      status: 'denied',
      priority: 'urgent',
      dueDate: '2025-04-12',
      notes: 'Insurance denied coverage, requesting additional documentation'
    },
  ];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'approved': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'denied': return 'bg-red-100 text-red-800 border-red-200';
      default: return '';
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'routine': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'urgent': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'stat': return 'bg-red-100 text-red-800 border-red-200';
      default: return '';
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lab': return <ClipboardList className="h-4 w-4 mr-2" />;
      case 'imaging': return <FileText className="h-4 w-4 mr-2" />;
      case 'procedure': return <Zap className="h-4 w-4 mr-2" />;
      case 'consultation': return <Calendar className="h-4 w-4 mr-2" />;
      case 'referral': return <FileText className="h-4 w-4 mr-2" />;
      default: return null;
    }
  };
  
  // Filter orders based on search term, status filter, and type filter
  const filteredOrders = medicalOrders.filter(order => {
    const matchesSearch = 
      order.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesType = typeFilter === 'all' || order.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Count orders by status
  const pendingCount = medicalOrders.filter(order => order.status === 'pending').length;
  const approvedCount = medicalOrders.filter(order => order.status === 'approved').length;
  const completedCount = medicalOrders.filter(order => order.status === 'completed').length;
  const cancelledOrDeniedCount = medicalOrders.filter(
    order => order.status === 'cancelled' || order.status === 'denied'
  ).length;
  
  return (
    <MainLayout>
      <PageHeader
        title="Medical Orders"
        description="Manage laboratory, imaging, and other clinical orders"
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
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Awaiting approval
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedCount}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Ready for scheduling
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCount}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Successfully executed
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cancelled/Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cancelledOrDeniedCount}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Not completed
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
              placeholder="Search orders..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="denied">Denied</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="lab">Laboratory</SelectItem>
              <SelectItem value="imaging">Imaging</SelectItem>
              <SelectItem value="procedure">Procedure</SelectItem>
              <SelectItem value="consultation">Consultation</SelectItem>
              <SelectItem value="referral">Referral</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="labs">Labs</TabsTrigger>
              <TabsTrigger value="imaging">Imaging</TabsTrigger>
              <TabsTrigger value="procedures">Procedures</TabsTrigger>
              <TabsTrigger value="consultations">Consults</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-10 text-muted-foreground">
                    No orders match your criteria
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {getTypeIcon(order.type)}
                        <span className="capitalize">{order.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div>{order.patientName}</div>
                        <div className="text-xs text-muted-foreground">{order.patientId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.description}</div>
                        {order.notes && <div className="text-xs text-muted-foreground mt-1">{order.notes}</div>}
                      </div>
                    </TableCell>
                    <TableCell>{order.provider}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{order.dueDate || 'N/A'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getPriorityColor(order.priority)}>
                        {order.priority.charAt(0).toUpperCase() + order.priority.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
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
                          <DropdownMenuItem onClick={() => console.log(`View ${order.id}`)}>
                            <FileText className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {order.status === 'pending' && (
                            <DropdownMenuItem onClick={() => console.log(`Approve ${order.id}`)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve Order
                            </DropdownMenuItem>
                          )}
                          {(order.status === 'pending' || order.status === 'approved') && (
                            <DropdownMenuItem onClick={() => console.log(`Complete ${order.id}`)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark Completed
                            </DropdownMenuItem>
                          )}
                          {(order.status === 'pending' || order.status === 'approved') && (
                            <DropdownMenuItem onClick={() => console.log(`Cancel ${order.id}`)}>
                              <X className="mr-2 h-4 w-4" />
                              Cancel Order
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => console.log(`Print ${order.id}`)}>
                            <Download className="mr-2 h-4 w-4" />
                            Print Order
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="border-t p-4 flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredOrders.length} of {medicalOrders.length} orders
          </div>
          <Button variant="outline" size="sm">Load More</Button>
        </CardFooter>
      </Card>
    </MainLayout>
  );
};

export default MedicalOrdersPage;
