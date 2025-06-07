
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Heart, Plus, Shield, Briefcase, Stethoscope } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const BenefitsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBenefit, setFilterBenefit] = useState('all');

  const benefitEnrollments = [
    { 
      id: 'BEN-001', 
      employee: 'Dr. Sarah Johnson', 
      employeeId: 'E001',
      healthInsurance: 'Premium Plan',
      dental: 'Standard',
      vision: 'Basic',
      retirement: '401k - 8%',
      status: 'enrolled',
      lastUpdated: '2025-01-01'
    },
    { 
      id: 'BEN-002', 
      employee: 'Nurse Mike Wilson', 
      employeeId: 'E002',
      healthInsurance: 'Standard Plan',
      dental: 'Standard',
      vision: 'Not Enrolled',
      retirement: '401k - 5%',
      status: 'enrolled',
      lastUpdated: '2025-01-01'
    },
    { 
      id: 'BEN-003', 
      employee: 'Dr. Emily Chen', 
      employeeId: 'E003',
      healthInsurance: 'Premium Plan',
      dental: 'Premium',
      vision: 'Premium',
      retirement: '401k - 10%',
      status: 'enrolled',
      lastUpdated: '2025-01-01'
    },
    { 
      id: 'BEN-004', 
      employee: 'Tech Lisa Brown', 
      employeeId: 'E004',
      healthInsurance: 'Basic Plan',
      dental: 'Not Enrolled',
      vision: 'Basic',
      retirement: '401k - 3%',
      status: 'pending',
      lastUpdated: '2025-01-15'
    }
  ];

  const benefitPlans = [
    { name: 'Health Insurance', plans: ['Basic Plan', 'Standard Plan', 'Premium Plan'], icon: Heart },
    { name: 'Dental Insurance', plans: ['Basic', 'Standard', 'Premium'], icon: Stethoscope },
    { name: 'Vision Insurance', plans: ['Basic', 'Standard', 'Premium'], icon: Shield },
    { name: 'Retirement Plans', plans: ['401k', '403b', 'Pension'], icon: Briefcase }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enrolled': return 'secondary';
      case 'pending': return 'default';
      case 'declined': return 'destructive';
      default: return 'outline';
    }
  };

  const filteredEnrollments = benefitEnrollments.filter(enrollment => {
    const matchesSearch = enrollment.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enrollment.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <MainLayout>
      <PageHeader
        title="Benefits Management"
        description="Manage employee benefits and enrollment"
        action={{
          label: 'Add Benefit Plan',
          icon: Plus,
          onClick: () => console.log('Add benefit plan')
        }}
      />

      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Health Enrolled</p>
                <p className="text-2xl font-bold text-green-600">{benefitEnrollments.filter(e => e.healthInsurance !== 'Not Enrolled').length}</p>
              </div>
              <Heart className="h-8 w-8 text-green-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Dental Enrolled</p>
                <p className="text-2xl font-bold text-blue-600">{benefitEnrollments.filter(e => e.dental !== 'Not Enrolled').length}</p>
              </div>
              <Stethoscope className="h-8 w-8 text-blue-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Vision Enrolled</p>
                <p className="text-2xl font-bold text-purple-600">{benefitEnrollments.filter(e => e.vision !== 'Not Enrolled').length}</p>
              </div>
              <Shield className="h-8 w-8 text-purple-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Retirement Enrolled</p>
                <p className="text-2xl font-bold text-orange-600">{benefitEnrollments.filter(e => e.retirement !== 'Not Enrolled').length}</p>
              </div>
              <Briefcase className="h-8 w-8 text-orange-600" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="enrollments" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
            <TabsTrigger value="plans">Benefit Plans</TabsTrigger>
            <TabsTrigger value="open-enrollment">Open Enrollment</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="enrollments" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Benefit Enrollments</CardTitle>
                    <CardDescription>Current employee benefit enrollments</CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search enrollments..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 w-full sm:w-[300px]"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Health Insurance</TableHead>
                        <TableHead>Dental</TableHead>
                        <TableHead>Vision</TableHead>
                        <TableHead>Retirement</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEnrollments.map((enrollment) => (
                        <TableRow key={enrollment.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{enrollment.employee}</div>
                              <div className="text-sm text-muted-foreground">{enrollment.employeeId}</div>
                            </div>
                          </TableCell>
                          <TableCell>{enrollment.healthInsurance}</TableCell>
                          <TableCell>{enrollment.dental}</TableCell>
                          <TableCell>{enrollment.vision}</TableCell>
                          <TableCell>{enrollment.retirement}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(enrollment.status)}>
                              {enrollment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
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

          <TabsContent value="plans" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Benefit Plans</CardTitle>
                <CardDescription>Manage and configure benefit plan options</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {benefitPlans.map((benefit, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <benefit.icon className="h-6 w-6 text-primary" />
                          <h3 className="font-semibold">{benefit.name}</h3>
                        </div>
                        <div className="space-y-2">
                          {benefit.plans.map((plan, planIndex) => (
                            <div key={planIndex} className="flex justify-between items-center p-2 bg-muted rounded-md">
                              <span className="text-sm">{plan}</span>
                              <Button variant="outline" size="sm">Configure</Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="open-enrollment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Open Enrollment</CardTitle>
                <CardDescription>Manage open enrollment periods and communications</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Open enrollment interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Benefits Reports</CardTitle>
                <CardDescription>Generate benefits utilization and cost reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Benefits reports interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default BenefitsPage;
