
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, FileText, Plus, User, Users, Building2, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const EmployeeRecordsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const employees = [
    { 
      id: 'EMP-001', 
      name: 'Dr. Sarah Johnson', 
      employeeId: 'E001',
      position: 'Oncologist', 
      department: 'Oncology', 
      email: 'sarah.johnson@hospital.com',
      phone: '+1-555-0101',
      hireDate: '2020-03-15',
      status: 'active',
      salary: '$180,000',
      manager: 'Dr. Smith'
    },
    { 
      id: 'EMP-002', 
      name: 'Nurse Mike Wilson', 
      employeeId: 'E002',
      position: 'Registered Nurse', 
      department: 'ICU', 
      email: 'mike.wilson@hospital.com',
      phone: '+1-555-0102',
      hireDate: '2021-06-01',
      status: 'active',
      salary: '$75,000',
      manager: 'Nurse Supervisor'
    },
    { 
      id: 'EMP-003', 
      name: 'Dr. Emily Chen', 
      employeeId: 'E003',
      position: 'Cardiologist', 
      department: 'Cardiology', 
      email: 'emily.chen@hospital.com',
      phone: '+1-555-0103',
      hireDate: '2019-08-20',
      status: 'active',
      salary: '$195,000',
      manager: 'Dr. Roberts'
    },
    { 
      id: 'EMP-004', 
      name: 'Tech Lisa Brown', 
      employeeId: 'E004',
      position: 'Lab Technician', 
      department: 'Laboratory', 
      email: 'lisa.brown@hospital.com',
      phone: '+1-555-0104',
      hireDate: '2022-01-10',
      status: 'on-leave',
      salary: '$55,000',
      manager: 'Lab Manager'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'secondary';
      case 'on-leave': return 'default';
      case 'terminated': return 'destructive';
      default: return 'outline';
    }
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departments = [...new Set(employees.map(e => e.department))];

  return (
    <MainLayout>
      <PageHeader
        title="Employee Records"
        description="Comprehensive employee information and HR records"
        action={{
          label: 'Add Employee',
          icon: Plus,
          onClick: () => console.log('Add employee')
        }}
      />

      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Employees</p>
                <p className="text-2xl font-bold">{employees.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-600">{employees.filter(e => e.status === 'active').length}</p>
              </div>
              <User className="h-8 w-8 text-green-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">On Leave</p>
                <p className="text-2xl font-bold text-yellow-600">{employees.filter(e => e.status === 'on-leave').length}</p>
              </div>
              <Calendar className="h-8 w-8 text-yellow-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Departments</p>
                <p className="text-2xl font-bold text-blue-600">{departments.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-600" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="records" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="records">Employee Records</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="hierarchy">Hierarchy</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Employee Records</CardTitle>
                    <CardDescription>Complete employee information and records</CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search employees..."
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
                        <TableHead>ID</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Hire Date</TableHead>
                        <TableHead>Manager</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEmployees.map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <div className="flex h-full w-full items-center justify-center bg-primary rounded-full text-white text-sm">
                                  {employee.name.split(' ').map(n => n[0]).join('')}
                                </div>
                              </Avatar>
                              <div>
                                <div className="font-medium">{employee.name}</div>
                                <div className="text-sm text-muted-foreground">{employee.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{employee.employeeId}</TableCell>
                          <TableCell>{employee.position}</TableCell>
                          <TableCell>{employee.department}</TableCell>
                          <TableCell>{employee.hireDate}</TableCell>
                          <TableCell>{employee.manager}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(employee.status)}>
                              {employee.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                Edit
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

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Employee Documents</CardTitle>
                <CardDescription>Manage employee contracts, certifications, and documents</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Employee documents interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hierarchy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Organization Hierarchy</CardTitle>
                <CardDescription>Visual representation of reporting structure</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Organization hierarchy interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>HR Analytics</CardTitle>
                <CardDescription>Employee statistics and workforce analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">HR analytics interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default EmployeeRecordsPage;
