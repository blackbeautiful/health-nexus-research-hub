
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
import { Search, Users, Plus, Phone, Mail, User } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const StaffDirectoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const staff = [
    { 
      id: 'S-001', 
      name: 'Dr. Sarah Johnson', 
      role: 'Oncologist', 
      department: 'Oncology', 
      email: 'sarah.johnson@hospital.com', 
      phone: '+1-555-0101',
      status: 'active',
      shift: 'Day',
      experience: '10 years'
    },
    { 
      id: 'S-002', 
      name: 'Nurse Mike Wilson', 
      role: 'Registered Nurse', 
      department: 'ICU', 
      email: 'mike.wilson@hospital.com', 
      phone: '+1-555-0102',
      status: 'active',
      shift: 'Night',
      experience: '5 years'
    },
    { 
      id: 'S-003', 
      name: 'Dr. Emily Chen', 
      role: 'Cardiologist', 
      department: 'Cardiology', 
      email: 'emily.chen@hospital.com', 
      phone: '+1-555-0103',
      status: 'active',
      shift: 'Day',
      experience: '8 years'
    },
    { 
      id: 'S-004', 
      name: 'Tech Lisa Brown', 
      role: 'Lab Technician', 
      department: 'Laboratory', 
      email: 'lisa.brown@hospital.com', 
      phone: '+1-555-0104',
      status: 'on-leave',
      shift: 'Day',
      experience: '3 years'
    },
    { 
      id: 'S-005', 
      name: 'Admin John Davis', 
      role: 'Administrator', 
      department: 'Administration', 
      email: 'john.davis@hospital.com', 
      phone: '+1-555-0105',
      status: 'active',
      shift: 'Day',
      experience: '12 years'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'secondary';
      case 'on-leave': return 'default';
      case 'inactive': return 'outline';
      default: return 'outline';
    }
  };

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filterDepartment === 'all' || member.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departments = [...new Set(staff.map(s => s.department))];

  return (
    <MainLayout>
      <PageHeader
        title="Staff Directory"
        description="Comprehensive directory of all hospital staff members"
        action={{
          label: 'Add Staff Member',
          icon: Plus,
          onClick: () => console.log('Add staff member')
        }}
      />

      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Staff</p>
                <p className="text-2xl font-bold">{staff.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-600">{staff.filter(s => s.status === 'active').length}</p>
              </div>
              <User className="h-8 w-8 text-green-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">On Leave</p>
                <p className="text-2xl font-bold text-yellow-600">{staff.filter(s => s.status === 'on-leave').length}</p>
              </div>
              <User className="h-8 w-8 text-yellow-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Departments</p>
                <p className="text-2xl font-bold text-blue-600">{departments.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="directory" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="directory">Directory</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="contacts">Emergency Contacts</TabsTrigger>
            <TabsTrigger value="org-chart">Org Chart</TabsTrigger>
          </TabsList>

          <TabsContent value="directory" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Staff Directory</CardTitle>
                    <CardDescription>Complete list of all hospital staff members</CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search staff..."
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
                        <TableHead>Staff Member</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Shift</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStaff.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <div className="flex h-full w-full items-center justify-center bg-primary rounded-full text-white text-sm">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                              </Avatar>
                              <div>
                                <div className="font-medium">{member.name}</div>
                                <div className="text-sm text-muted-foreground">{member.id}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{member.role}</TableCell>
                          <TableCell>{member.department}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1 text-sm">
                                <Mail className="h-3 w-3" />
                                <span className="truncate max-w-[150px]">{member.email}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <Phone className="h-3 w-3" />
                                <span>{member.phone}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{member.shift}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(member.status)}>
                              {member.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{member.experience}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              View Profile
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

          <TabsContent value="departments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Department Overview</CardTitle>
                <CardDescription>Staff distribution across departments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {departments.map(dept => {
                    const deptStaff = staff.filter(s => s.department === dept);
                    return (
                      <Card key={dept}>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2">{dept}</h3>
                          <p className="text-2xl font-bold text-primary">{deptStaff.length}</p>
                          <p className="text-sm text-muted-foreground">staff members</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contacts</CardTitle>
                <CardDescription>Key contact information for emergency situations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Emergency contact management interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="org-chart" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Organizational Chart</CardTitle>
                <CardDescription>Visual representation of hospital hierarchy</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Organizational chart interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default StaffDirectoryPage;
