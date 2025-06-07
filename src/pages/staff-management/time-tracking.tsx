
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Clock, Plus, PlayCircle, PauseCircle, Calendar, Timer } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TimeTrackingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const timeEntries = [
    { 
      id: 'T-001', 
      employee: 'Dr. Sarah Johnson', 
      date: '2025-01-15', 
      clockIn: '08:00', 
      clockOut: '17:00', 
      totalHours: '9.00',
      status: 'completed',
      department: 'Oncology'
    },
    { 
      id: 'T-002', 
      employee: 'Nurse Mike Wilson', 
      date: '2025-01-15', 
      clockIn: '22:00', 
      clockOut: '06:00', 
      totalHours: '8.00',
      status: 'completed',
      department: 'ICU'
    },
    { 
      id: 'T-003', 
      employee: 'Tech Lisa Brown', 
      date: '2025-01-15', 
      clockIn: '09:00', 
      clockOut: null, 
      totalHours: null,
      status: 'active',
      department: 'Laboratory'
    },
    { 
      id: 'T-004', 
      employee: 'Dr. Emily Chen', 
      date: '2025-01-15', 
      clockIn: '07:30', 
      clockOut: '16:30', 
      totalHours: '9.00',
      status: 'completed',
      department: 'Cardiology'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'completed': return 'secondary';
      case 'overtime': return 'destructive';
      default: return 'outline';
    }
  };

  const filteredEntries = timeEntries.filter(entry => {
    const matchesSearch = entry.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filterDepartment === 'all' || entry.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departments = [...new Set(timeEntries.map(e => e.department))];

  return (
    <MainLayout>
      <PageHeader
        title="Time Tracking"
        description="Monitor staff attendance and working hours"
        action={{
          label: 'Clock In/Out',
          icon: Clock,
          onClick: () => console.log('Clock action')
        }}
      />

      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Currently Active</p>
                <p className="text-2xl font-bold text-green-600">{timeEntries.filter(e => e.status === 'active').length}</p>
              </div>
              <PlayCircle className="h-8 w-8 text-green-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Hours Today</p>
                <p className="text-2xl font-bold">{timeEntries.filter(e => e.totalHours).reduce((acc, e) => acc + parseFloat(e.totalHours || '0'), 0).toFixed(1)}</p>
              </div>
              <Timer className="h-8 w-8 text-primary" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Completed Shifts</p>
                <p className="text-2xl font-bold text-blue-600">{timeEntries.filter(e => e.status === 'completed').length}</p>
              </div>
              <PauseCircle className="h-8 w-8 text-blue-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Avg Hours/Day</p>
                <p className="text-2xl font-bold text-purple-600">8.3</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Today's Time Entries</CardTitle>
                    <CardDescription>Current day attendance and working hours</CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search entries..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 w-full sm:w-[300px]"
                      />
                    </div>
                    <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        {departments.map(dept => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
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
                        <TableHead>Date</TableHead>
                        <TableHead>Clock In</TableHead>
                        <TableHead>Clock Out</TableHead>
                        <TableHead>Total Hours</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEntries.map((entry) => (
                        <TableRow key={entry.id}>
                          <TableCell className="font-medium">{entry.employee}</TableCell>
                          <TableCell>{entry.department}</TableCell>
                          <TableCell>{entry.date}</TableCell>
                          <TableCell>{entry.clockIn}</TableCell>
                          <TableCell>{entry.clockOut || '-'}</TableCell>
                          <TableCell>{entry.totalHours || '-'}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(entry.status)}>
                              {entry.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Edit
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

          <TabsContent value="week" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Overview</CardTitle>
                <CardDescription>Time tracking summary for the current week</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Weekly time tracking overview coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Time Reports</CardTitle>
                <CardDescription>Generate detailed time tracking reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Time tracking reports interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Time Tracking Settings</CardTitle>
                <CardDescription>Configure time tracking preferences and policies</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Time tracking settings interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default TimeTrackingPage;
