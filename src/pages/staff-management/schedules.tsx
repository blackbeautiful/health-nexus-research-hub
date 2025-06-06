
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Plus, Users, Clock, AlertTriangle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const DutySchedulesPage = () => {
  const [selectedWeek, setSelectedWeek] = useState('current');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const schedules = [
    { staff: 'Dr. Sarah Johnson', department: 'Oncology', monday: 'Day', tuesday: 'Day', wednesday: 'Off', thursday: 'Day', friday: 'Day', saturday: 'Off', sunday: 'Off' },
    { staff: 'Nurse Mike Wilson', department: 'ICU', monday: 'Night', tuesday: 'Night', wednesday: 'Night', thursday: 'Off', friday: 'Off', saturday: 'Night', sunday: 'Night' },
    { staff: 'Dr. Emily Chen', department: 'Cardiology', monday: 'Day', tuesday: 'Day', wednesday: 'Day', thursday: 'Day', friday: 'Off', saturday: 'On-Call', sunday: 'Off' },
    { staff: 'Tech Lisa Brown', department: 'Laboratory', monday: 'Day', tuesday: 'Day', wednesday: 'Day', thursday: 'Day', friday: 'Day', saturday: 'Off', sunday: 'Off' }
  ];

  const getShiftColor = (shift: string) => {
    switch (shift) {
      case 'Day': return 'secondary';
      case 'Night': return 'default';
      case 'On-Call': return 'outline';
      case 'Off': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <MainLayout>
      <PageHeader
        title="Duty Schedules"
        description="Manage staff duty schedules and work assignments"
        action={{
          label: 'Create Schedule',
          icon: Plus,
          onClick: () => console.log('Create schedule')
        }}
      />

      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Staff</p>
                <p className="text-2xl font-bold">{schedules.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Day Shifts</p>
                <p className="text-2xl font-bold text-blue-600">18</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Night Shifts</p>
                <p className="text-2xl font-bold text-purple-600">12</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Coverage Gaps</p>
                <p className="text-2xl font-bold text-red-600">2</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="weekly">Weekly View</TabsTrigger>
            <TabsTrigger value="monthly">Monthly View</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Weekly Schedule</CardTitle>
                    <CardDescription>Current week schedule overview</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select week" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="previous">Previous Week</SelectItem>
                        <SelectItem value="current">Current Week</SelectItem>
                        <SelectItem value="next">Next Week</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="oncology">Oncology</SelectItem>
                        <SelectItem value="icu">ICU</SelectItem>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="laboratory">Laboratory</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-medium">Staff Member</th>
                        <th className="text-center p-2 font-medium">Mon</th>
                        <th className="text-center p-2 font-medium">Tue</th>
                        <th className="text-center p-2 font-medium">Wed</th>
                        <th className="text-center p-2 font-medium">Thu</th>
                        <th className="text-center p-2 font-medium">Fri</th>
                        <th className="text-center p-2 font-medium">Sat</th>
                        <th className="text-center p-2 font-medium">Sun</th>
                        <th className="text-center p-2 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedules.map((schedule, index) => (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="p-2">
                            <div>
                              <div className="font-medium">{schedule.staff}</div>
                              <div className="text-sm text-muted-foreground">{schedule.department}</div>
                            </div>
                          </td>
                          <td className="p-2 text-center">
                            <Badge variant={getShiftColor(schedule.monday)} className="text-xs">
                              {schedule.monday}
                            </Badge>
                          </td>
                          <td className="p-2 text-center">
                            <Badge variant={getShiftColor(schedule.tuesday)} className="text-xs">
                              {schedule.tuesday}
                            </Badge>
                          </td>
                          <td className="p-2 text-center">
                            <Badge variant={getShiftColor(schedule.wednesday)} className="text-xs">
                              {schedule.wednesday}
                            </Badge>
                          </td>
                          <td className="p-2 text-center">
                            <Badge variant={getShiftColor(schedule.thursday)} className="text-xs">
                              {schedule.thursday}
                            </Badge>
                          </td>
                          <td className="p-2 text-center">
                            <Badge variant={getShiftColor(schedule.friday)} className="text-xs">
                              {schedule.friday}
                            </Badge>
                          </td>
                          <td className="p-2 text-center">
                            <Badge variant={getShiftColor(schedule.saturday)} className="text-xs">
                              {schedule.saturday}
                            </Badge>
                          </td>
                          <td className="p-2 text-center">
                            <Badge variant={getShiftColor(schedule.sunday)} className="text-xs">
                              {schedule.sunday}
                            </Badge>
                          </td>
                          <td className="p-2 text-center">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Schedule</CardTitle>
                <CardDescription>Month-wide schedule overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Monthly calendar interface coming soon...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Schedule Templates</CardTitle>
                <CardDescription>Create and manage reusable schedule templates</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Schedule template management interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Schedule Reports</CardTitle>
                <CardDescription>Generate scheduling analytics and reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Schedule reporting interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default DutySchedulesPage;
