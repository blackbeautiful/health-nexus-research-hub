
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  User,
  Stethoscope,
  TestTube,
  Settings,
  Shield,
  UserCog,
  PlusCircle
} from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  status: 'active' | 'on-leave' | 'inactive';
  shift: string;
  startDate: string;
  certifications: string[];
  avatar: string;
}

const StaffDirectoryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const staffMembers: StaffMember[] = [
    {
      id: '1',
      name: 'Dr. Rebecca Martinez',
      role: 'Chief Oncologist',
      department: 'Oncology',
      email: 'r.martinez@healthnexus.com',
      phone: '(555) 123-4567',
      location: 'Building A, Floor 3',
      status: 'active',
      shift: 'Day Shift',
      startDate: '2020-03-15',
      certifications: ['Board Certified Oncologist', 'ACLS', 'BLS'],
      avatar: 'RM'
    },
    {
      id: '2',
      name: 'Nurse Jessica Lee',
      role: 'Senior Oncology Nurse',
      department: 'Oncology',
      email: 'j.lee@healthnexus.com',
      phone: '(555) 234-5678',
      location: 'Building A, Floor 3',
      status: 'active',
      shift: 'Day Shift',
      startDate: '2019-06-20',
      certifications: ['RN', 'ONS Certified', 'BLS'],
      avatar: 'JL'
    },
    {
      id: '3',
      name: 'Dr. James Wilson',
      role: 'Surgical Oncologist',
      department: 'Surgery',
      email: 'j.wilson@healthnexus.com',
      phone: '(555) 345-6789',
      location: 'Building B, Floor 2',
      status: 'active',
      shift: 'Flexible',
      startDate: '2018-01-10',
      certifications: ['Board Certified Surgeon', 'ATLS', 'ACLS'],
      avatar: 'JW'
    },
    {
      id: '4',
      name: 'Dr. Anna Lopez',
      role: 'Radiation Oncologist',
      department: 'Radiation Oncology',
      email: 'a.lopez@healthnexus.com',
      phone: '(555) 456-7890',
      location: 'Building C, Floor 1',
      status: 'active',
      shift: 'Day Shift',
      startDate: '2021-08-05',
      certifications: ['Board Certified Radiation Oncologist', 'ACLS'],
      avatar: 'AL'
    },
    {
      id: '5',
      name: 'Mike Chen',
      role: 'Lead Lab Technician',
      department: 'Laboratory',
      email: 'm.chen@healthnexus.com',
      phone: '(555) 567-8901',
      location: 'Building A, Floor 1',
      status: 'active',
      shift: 'Day Shift',
      startDate: '2019-11-12',
      certifications: ['MLT', 'ASCP Certified', 'BLS'],
      avatar: 'MC'
    },
    {
      id: '6',
      name: 'Sarah Kim',
      role: 'Research Coordinator',
      department: 'Clinical Research',
      email: 's.kim@healthnexus.com',
      phone: '(555) 678-9012',
      location: 'Building B, Floor 4',
      status: 'active',
      shift: 'Day Shift',
      startDate: '2022-02-14',
      certifications: ['CCRC', 'ACRP Certified'],
      avatar: 'SK'
    },
    {
      id: '7',
      name: 'Robert Taylor',
      role: 'Facilities Manager',
      department: 'Operations',
      email: 'r.taylor@healthnexus.com',
      phone: '(555) 789-0123',
      location: 'Building A, Floor 1',
      status: 'active',
      shift: 'Day Shift',
      startDate: '2017-05-22',
      certifications: ['FMP', 'HVAC Certified'],
      avatar: 'RT'
    },
    {
      id: '8',
      name: 'Lisa Brown',
      role: 'HR Manager',
      department: 'Human Resources',
      email: 'l.brown@healthnexus.com',
      phone: '(555) 890-1234',
      location: 'Building A, Floor 2',
      status: 'on-leave',
      shift: 'Day Shift',
      startDate: '2019-09-30',
      certifications: ['PHR', 'SHRM-CP'],
      avatar: 'LB'
    }
  ];

  const departments = ['all', ...new Set(staffMembers.map(member => member.department))];

  const filteredStaff = staffMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'all' || member.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'on-leave': return 'secondary';
      case 'inactive': return 'destructive';
      default: return 'outline';
    }
  };

  const getRoleIcon = (role: string) => {
    if (role.toLowerCase().includes('doctor') || role.toLowerCase().includes('oncologist') || role.toLowerCase().includes('surgeon')) {
      return <Stethoscope className="h-4 w-4" />;
    }
    if (role.toLowerCase().includes('nurse')) {
      return <User className="h-4 w-4" />;
    }
    if (role.toLowerCase().includes('lab') || role.toLowerCase().includes('technician')) {
      return <TestTube className="h-4 w-4" />;
    }
    if (role.toLowerCase().includes('manager') || role.toLowerCase().includes('admin')) {
      return <Settings className="h-4 w-4" />;
    }
    if (role.toLowerCase().includes('research')) {
      return <TestTube className="h-4 w-4" />;
    }
    return <User className="h-4 w-4" />;
  };

  return (
    <MainLayout>
      <PageHeader
        title="Staff Directory"
        description="Employee directory and contact information"
        action={{
          label: 'Add Staff Member',
          icon: PlusCircle,
          onClick: () => console.log('Add staff member')
        }}
      />

      <div className="space-y-6">
        {/* Search and Filter Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
            <CardDescription>Find staff members by name, role, or department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search staff members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Tabs value={selectedDepartment} onValueChange={setSelectedDepartment} className="w-full md:w-auto">
                <TabsList>
                  <TabsTrigger value="all">All Departments</TabsTrigger>
                  <TabsTrigger value="Oncology">Oncology</TabsTrigger>
                  <TabsTrigger value="Surgery">Surgery</TabsTrigger>
                  <TabsTrigger value="Laboratory">Laboratory</TabsTrigger>
                  <TabsTrigger value="Clinical Research">Research</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.map((member) => (
            <Card key={member.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground">
                      {member.avatar}
                    </div>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{member.name}</CardTitle>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      {getRoleIcon(member.role)}
                      <span className="truncate">{member.role}</span>
                    </div>
                    <Badge variant={getStatusColor(member.status)} className="mt-1 text-xs">
                      {member.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{member.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Started {new Date(member.startDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Department</h4>
                  <Badge variant="outline">{member.department}</Badge>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Shift</h4>
                  <span className="text-sm text-muted-foreground">{member.shift}</span>
                </div>
                
                {member.certifications.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Certifications</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.certifications.map((cert, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Mail className="h-4 w-4 mr-1" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStaff.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <User className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No staff members found matching your criteria.</p>
            </CardContent>
          </Card>
        )}

        {/* Department Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Department Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {departments.filter(d => d !== 'all').map(department => {
                const count = staffMembers.filter(m => m.department === department).length;
                const activeCount = staffMembers.filter(m => m.department === department && m.status === 'active').length;
                
                return (
                  <div key={department} className="text-center">
                    <div className="text-2xl font-bold text-primary">{count}</div>
                    <div className="text-sm text-muted-foreground">{department}</div>
                    <div className="text-xs text-green-600">{activeCount} active</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default StaffDirectoryPage;
