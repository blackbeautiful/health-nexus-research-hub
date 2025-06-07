
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, CalendarCheck, Plus, Clock, Users, AlertTriangle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ShiftManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterShift, setFilterShift] = useState('all');

  const shifts = [
    { 
      id: 'SH-001', 
      name: 'Morning Shift', 
      startTime: '07:00', 
      endTime: '15:00', 
      department: 'General',
      staffRequired: 8,
      staffAssigned: 8,
      status: 'fully-staffed'
    },
    { 
      id: 'SH-002', 
      name: 'Evening Shift', 
      startTime: '15:00', 
      endTime: '23:00', 
      department: 'ICU',
      staffRequired: 6,
      staffAssigned: 5,
      status: 'understaffed'
    },
    { 
      id: 'SH-003', 
      name: 'Night Shift', 
      startTime: '23:00', 
      endTime: '07:00', 
      department: 'Emergency',
      staffRequired: 4,
      staffAssigned: 4,
      status: 'fully-staffed'
    },
    { 
      id: 'SH-004', 
      name: 'Weekend Shift', 
      startTime: '08:00', 
      endTime: '20:00', 
      department: 'Oncology',
      staffRequired: 3,
      staffAssigned: 2,
      status: 'understaffed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'fully-staffed': return 'secondary';
      case 'understaffed': return 'destructive';
      case 'overstaffed': return 'default';
      default: return 'outline';
    }
  };

  const filteredShifts = shifts.filter(shift => {
    const matchesSearch = shift.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shift.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterShift === 'all' || shift.status === filterShift;
    return matchesSearch && matchesFilter;
  });

  return (
    <MainLayout>
      <PageHeader
        title="Shift Management"
        description="Organize and manage staff shifts and coverage"
        action={{
          label: 'Create Shift',
          icon: Plus,
          onClick: () => console.log('Create shift')
        }}
      />

      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Shifts</p>
                <p className="text-2xl font-bold">{shifts.length}</p>
              </div>
              <CalendarCheck className="h-8 w-8 text-primary" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Fully Staffed</p>
                <p className="text-2xl font-bold text-green-600">{shifts.filter(s => s.status === 'fully-staffed').length}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Understaffed</p>
                <p className="text-2xl font-bold text-red-600">{shifts.filter(s => s.status === 'understaffed').length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Coverage Rate</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round((shifts.reduce((acc, s) => acc + s.staffAssigned, 0) / shifts.reduce((acc, s) => acc + s.staffRequired, 0)) * 100)}%
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="shifts" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="shifts">Shifts</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="coverage">Coverage</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="shifts" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Shift Overview</CardTitle>
                    <CardDescription>Current shift assignments and staffing levels</CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search shifts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 w-full sm:w-[300px]"
                      />
                    </div>
                    <Select value={filterShift} onValueChange={setFilterShift}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="fully-staffed">Fully Staffed</SelectItem>
                        <SelectItem value="understaffed">Understaffed</SelectItem>
                        <SelectItem value="overstaffed">Overstaffed</SelectItem>
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
                        <TableHead>Shift Name</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Required Staff</TableHead>
                        <TableHead>Assigned Staff</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredShifts.map((shift) => (
                        <TableRow key={shift.id}>
                          <TableCell className="font-medium">{shift.name}</TableCell>
                          <TableCell>{shift.department}</TableCell>
                          <TableCell>{shift.startTime} - {shift.endTime}</TableCell>
                          <TableCell>{shift.staffRequired}</TableCell>
                          <TableCell>{shift.staffAssigned}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(shift.status)}>
                              {shift.status.replace('-', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              <Button variant="outline" size="sm">
                                Assign
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

          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Shift Templates</CardTitle>
                <CardDescription>Pre-configured shift patterns and schedules</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Shift templates interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coverage" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Coverage Analysis</CardTitle>
                <CardDescription>Analyze shift coverage and identify gaps</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Coverage analysis interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Shift Analytics</CardTitle>
                <CardDescription>Performance metrics and shift analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Shift analytics interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ShiftManagementPage;
