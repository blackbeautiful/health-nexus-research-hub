
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, UserX, Plus, Calendar, Check, X, Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LeaveManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const leaveRequests = [
    { 
      id: 'L-001', 
      employee: 'Dr. Sarah Johnson', 
      type: 'Annual Leave', 
      startDate: '2025-02-01', 
      endDate: '2025-02-07',
      days: 7,
      status: 'pending',
      requestDate: '2025-01-10',
      department: 'Oncology'
    },
    { 
      id: 'L-002', 
      employee: 'Nurse Mike Wilson', 
      type: 'Sick Leave', 
      startDate: '2025-01-20', 
      endDate: '2025-01-22',
      days: 3,
      status: 'approved',
      requestDate: '2025-01-18',
      department: 'ICU'
    },
    { 
      id: 'L-003', 
      employee: 'Tech Lisa Brown', 
      type: 'Personal Leave', 
      startDate: '2025-01-25', 
      endDate: '2025-01-25',
      days: 1,
      status: 'rejected',
      requestDate: '2025-01-15',
      department: 'Laboratory'
    },
    { 
      id: 'L-004', 
      employee: 'Dr. Emily Chen', 
      type: 'Maternity Leave', 
      startDate: '2025-03-01', 
      endDate: '2025-05-30',
      days: 90,
      status: 'approved',
      requestDate: '2025-01-05',
      department: 'Cardiology'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'secondary';
      case 'pending': return 'default';
      case 'rejected': return 'destructive';
      default: return 'outline';
    }
  };

  const filteredRequests = leaveRequests.filter(request => {
    const matchesSearch = request.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <MainLayout>
      <PageHeader
        title="Leave Management"
        description="Manage staff leave requests and vacation schedules"
        action={{
          label: 'Request Leave',
          icon: Plus,
          onClick: () => console.log('Request leave')
        }}
      />

      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Pending Requests</p>
                <p className="text-2xl font-bold text-yellow-600">{leaveRequests.filter(r => r.status === 'pending').length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-green-600">{leaveRequests.filter(r => r.status === 'approved').length}</p>
              </div>
              <Check className="h-8 w-8 text-green-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{leaveRequests.filter(r => r.status === 'rejected').length}</p>
              </div>
              <X className="h-8 w-8 text-red-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Days</p>
                <p className="text-2xl font-bold text-blue-600">{leaveRequests.reduce((acc, r) => acc + r.days, 0)}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="requests" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="requests">Leave Requests</TabsTrigger>
            <TabsTrigger value="calendar">Leave Calendar</TabsTrigger>
            <TabsTrigger value="policies">Leave Policies</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Leave Requests</CardTitle>
                    <CardDescription>Manage and review staff leave requests</CardDescription>
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
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
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
                        <TableHead>Employee</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Leave Type</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Days</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.employee}</TableCell>
                          <TableCell>{request.department}</TableCell>
                          <TableCell>{request.type}</TableCell>
                          <TableCell>{request.startDate}</TableCell>
                          <TableCell>{request.endDate}</TableCell>
                          <TableCell>{request.days}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(request.status)}>
                              {request.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {request.status === 'pending' && (
                                <>
                                  <Button variant="outline" size="sm" className="text-green-600">
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button variant="outline" size="sm" className="text-red-600">
                                    <X className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Leave Calendar</CardTitle>
                <CardDescription>Visual overview of staff leave schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Leave calendar interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="policies" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Leave Policies</CardTitle>
                <CardDescription>Configure leave types and policies</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Leave policies interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Leave Reports</CardTitle>
                <CardDescription>Generate leave analytics and reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Leave reports interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default LeaveManagementPage;
