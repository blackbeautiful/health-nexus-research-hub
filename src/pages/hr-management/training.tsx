
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, BookOpen, Plus, Award, Calendar, AlertTriangle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TrainingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const trainings = [
    { 
      id: 'TRN-001', 
      employee: 'Dr. Sarah Johnson', 
      course: 'HIPAA Compliance Training', 
      provider: 'Internal',
      startDate: '2025-01-10',
      completionDate: '2025-01-15',
      expiryDate: '2026-01-15',
      status: 'completed',
      progress: 100
    },
    { 
      id: 'TRN-002', 
      employee: 'Nurse Mike Wilson', 
      course: 'CPR Certification', 
      provider: 'American Red Cross',
      startDate: '2025-01-20',
      completionDate: null,
      expiryDate: null,
      status: 'in-progress',
      progress: 75
    },
    { 
      id: 'TRN-003', 
      employee: 'Dr. Emily Chen', 
      course: 'Advanced Cardiac Life Support', 
      provider: 'AHA',
      startDate: '2024-12-01',
      completionDate: '2024-12-05',
      expiryDate: '2026-12-05',
      status: 'completed',
      progress: 100
    },
    { 
      id: 'TRN-004', 
      employee: 'Tech Lisa Brown', 
      course: 'Laboratory Safety', 
      provider: 'Internal',
      startDate: null,
      completionDate: null,
      expiryDate: null,
      status: 'assigned',
      progress: 0
    }
  ];

  const certifications = [
    {
      id: 'CERT-001',
      employee: 'Dr. Sarah Johnson',
      certification: 'Board Certification - Oncology',
      issuer: 'American Board of Internal Medicine',
      issueDate: '2020-06-15',
      expiryDate: '2030-06-15',
      status: 'valid'
    },
    {
      id: 'CERT-002',
      employee: 'Nurse Mike Wilson',
      certification: 'Registered Nurse License',
      issuer: 'State Nursing Board',
      issueDate: '2021-03-01',
      expiryDate: '2025-03-01',
      status: 'expiring-soon'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'secondary';
      case 'in-progress': return 'default';
      case 'assigned': return 'outline';
      case 'overdue': return 'destructive';
      case 'valid': return 'secondary';
      case 'expiring-soon': return 'default';
      case 'expired': return 'destructive';
      default: return 'outline';
    }
  };

  const filteredTrainings = trainings.filter(training => {
    const matchesSearch = training.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         training.course.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || training.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <MainLayout>
      <PageHeader
        title="Training & Certification"
        description="Manage employee training programs and certifications"
        action={{
          label: 'Add Training',
          icon: Plus,
          onClick: () => console.log('Add training')
        }}
      />

      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Active Trainings</p>
                <p className="text-2xl font-bold">{trainings.filter(t => t.status === 'in-progress').length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">{trainings.filter(t => t.status === 'completed').length}</p>
              </div>
              <Award className="h-8 w-8 text-green-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Expiring Soon</p>
                <p className="text-2xl font-bold text-yellow-600">{certifications.filter(c => c.status === 'expiring-soon').length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Avg Completion</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(trainings.reduce((acc, t) => acc + t.progress, 0) / trainings.length)}%
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="trainings" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trainings">Trainings</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="courses">Course Catalog</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="trainings" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Training Programs</CardTitle>
                    <CardDescription>Track employee training progress and completion</CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search trainings..."
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
                        <SelectItem value="assigned">Assigned</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
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
                        <TableHead>Course</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTrainings.map((training) => (
                        <TableRow key={training.id}>
                          <TableCell className="font-medium">{training.employee}</TableCell>
                          <TableCell>{training.course}</TableCell>
                          <TableCell>{training.provider}</TableCell>
                          <TableCell>{training.startDate || '-'}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full" 
                                  style={{ width: `${training.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-sm">{training.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(training.status)}>
                              {training.status.replace('-', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                              {training.status === 'assigned' && (
                                <Button variant="outline" size="sm">
                                  Start
                                </Button>
                              )}
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

          <TabsContent value="certifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Professional Certifications</CardTitle>
                <CardDescription>Track employee certifications and renewal dates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Certification</TableHead>
                        <TableHead>Issuer</TableHead>
                        <TableHead>Issue Date</TableHead>
                        <TableHead>Expiry Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {certifications.map((cert) => (
                        <TableRow key={cert.id}>
                          <TableCell className="font-medium">{cert.employee}</TableCell>
                          <TableCell>{cert.certification}</TableCell>
                          <TableCell>{cert.issuer}</TableCell>
                          <TableCell>{cert.issueDate}</TableCell>
                          <TableCell>{cert.expiryDate}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(cert.status)}>
                              {cert.status.replace('-', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                              {cert.status === 'expiring-soon' && (
                                <Button variant="outline" size="sm">
                                  Renew
                                </Button>
                              )}
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

          <TabsContent value="courses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Course Catalog</CardTitle>
                <CardDescription>Manage available training courses and programs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Course catalog interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Training Reports</CardTitle>
                <CardDescription>Generate training compliance and progress reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Training reports interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default TrainingPage;
