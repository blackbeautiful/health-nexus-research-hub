
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Settings, Plus, Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const MaintenancePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const maintenanceRequests = [
    { 
      id: 'MR-001', 
      equipment: 'Ventilator A', 
      type: 'Preventive', 
      priority: 'high', 
      status: 'pending', 
      assignedTo: 'John Tech', 
      requestDate: '2025-01-15',
      scheduledDate: '2025-01-18',
      description: 'Quarterly maintenance check'
    },
    { 
      id: 'MR-002', 
      equipment: 'MRI Scanner', 
      type: 'Corrective', 
      priority: 'critical', 
      status: 'in-progress', 
      assignedTo: 'Sarah Engineer', 
      requestDate: '2025-01-14',
      scheduledDate: '2025-01-16',
      description: 'Cooling system malfunction'
    },
    { 
      id: 'MR-003', 
      equipment: 'X-Ray Machine', 
      type: 'Preventive', 
      priority: 'medium', 
      status: 'completed', 
      assignedTo: 'Mike Technician', 
      requestDate: '2025-01-10',
      scheduledDate: '2025-01-12',
      description: 'Calibration and safety check'
    },
    { 
      id: 'MR-004', 
      equipment: 'Cardiac Monitor', 
      type: 'Emergency', 
      priority: 'critical', 
      status: 'pending', 
      assignedTo: 'Emergency Team', 
      requestDate: '2025-01-16',
      scheduledDate: '2025-01-16',
      description: 'Device not responding'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'secondary';
      case 'in-progress': return 'default';
      case 'pending': return 'outline';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Settings;
      case 'pending': return Clock;
      default: return Clock;
    }
  };

  const filteredRequests = maintenanceRequests.filter(request => {
    const matchesSearch = request.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <MainLayout>
      <PageHeader
        title="Facility Maintenance"
        description="Manage facility and equipment maintenance schedules and work orders"
        action={{
          label: 'Create Work Order',
          icon: Plus,
          onClick: () => console.log('Create work order')
        }}
      />

      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Requests</p>
                <p className="text-2xl font-bold">{maintenanceRequests.length}</p>
              </div>
              <Settings className="h-8 w-8 text-primary" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{maintenanceRequests.filter(r => r.status === 'pending').length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{maintenanceRequests.filter(r => r.status === 'in-progress').length}</p>
              </div>
              <Settings className="h-8 w-8 text-blue-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Critical Priority</p>
                <p className="text-2xl font-bold text-red-600">{maintenanceRequests.filter(r => r.priority === 'critical').length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="requests" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="requests">Work Orders</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="preventive">Preventive</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Maintenance Requests</CardTitle>
                    <CardDescription>Track and manage all maintenance work orders</CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search requests..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 w-full sm:w-[300px]"
                      />
                    </div>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Request ID</TableHead>
                        <TableHead>Equipment</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Assigned To</TableHead>
                        <TableHead>Scheduled</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRequests.map((request) => {
                        const StatusIcon = getStatusIcon(request.status);
                        return (
                          <TableRow key={request.id}>
                            <TableCell className="font-medium">{request.id}</TableCell>
                            <TableCell>{request.equipment}</TableCell>
                            <TableCell>{request.type}</TableCell>
                            <TableCell>
                              <Badge variant={getPriorityColor(request.priority)}>
                                {request.priority}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={getStatusColor(request.status)} className="flex items-center gap-1 w-fit">
                                <StatusIcon className="h-3 w-3" />
                                {request.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{request.assignedTo}</TableCell>
                            <TableCell>{request.scheduledDate}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Schedule</CardTitle>
                <CardDescription>View and manage maintenance calendar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Maintenance calendar interface coming soon...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preventive" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Preventive Maintenance</CardTitle>
                <CardDescription>Schedule and track preventive maintenance programs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Preventive maintenance scheduling interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Reports</CardTitle>
                <CardDescription>Generate maintenance analytics and performance reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Maintenance reporting interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default MaintenancePage;
