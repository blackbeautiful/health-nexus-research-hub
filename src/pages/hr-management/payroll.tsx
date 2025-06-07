
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, DollarSign, Plus, Calculator, FileText, TrendingUp } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PayrollPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('current');

  const payrollData = [
    { 
      id: 'PAY-001', 
      employee: 'Dr. Sarah Johnson', 
      employeeId: 'E001',
      grossPay: 15000,
      deductions: 3500,
      netPay: 11500,
      payPeriod: 'Jan 2025',
      status: 'processed',
      payDate: '2025-01-31'
    },
    { 
      id: 'PAY-002', 
      employee: 'Nurse Mike Wilson', 
      employeeId: 'E002',
      grossPay: 6250,
      deductions: 1450,
      netPay: 4800,
      payPeriod: 'Jan 2025',
      status: 'pending',
      payDate: '2025-01-31'
    },
    { 
      id: 'PAY-003', 
      employee: 'Dr. Emily Chen', 
      employeeId: 'E003',
      grossPay: 16250,
      deductions: 3800,
      netPay: 12450,
      payPeriod: 'Jan 2025',
      status: 'processed',
      payDate: '2025-01-31'
    },
    { 
      id: 'PAY-004', 
      employee: 'Tech Lisa Brown', 
      employeeId: 'E004',
      grossPay: 4583,
      deductions: 1050,
      netPay: 3533,
      payPeriod: 'Jan 2025',
      status: 'pending',
      payDate: '2025-01-31'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed': return 'secondary';
      case 'pending': return 'default';
      case 'failed': return 'destructive';
      default: return 'outline';
    }
  };

  const filteredPayroll = payrollData.filter(payroll => {
    const matchesSearch = payroll.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payroll.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const totalGrossPay = payrollData.reduce((acc, p) => acc + p.grossPay, 0);
  const totalNetPay = payrollData.reduce((acc, p) => acc + p.netPay, 0);
  const totalDeductions = payrollData.reduce((acc, p) => acc + p.deductions, 0);

  return (
    <MainLayout>
      <PageHeader
        title="Payroll Management"
        description="Manage employee compensation and payroll processing"
        action={{
          label: 'Process Payroll',
          icon: Plus,
          onClick: () => console.log('Process payroll')
        }}
      />

      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Gross Pay</p>
                <p className="text-2xl font-bold">${totalGrossPay.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Net Pay</p>
                <p className="text-2xl font-bold text-green-600">${totalNetPay.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Deductions</p>
                <p className="text-2xl font-bold text-red-600">${totalDeductions.toLocaleString()}</p>
              </div>
              <Calculator className="h-8 w-8 text-red-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Processed</p>
                <p className="text-2xl font-bold text-blue-600">{payrollData.filter(p => p.status === 'processed').length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="current">Current Payroll</TabsTrigger>
            <TabsTrigger value="history">Payroll History</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Current Payroll Period</CardTitle>
                    <CardDescription>January 2025 payroll processing</CardDescription>
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
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Employee ID</TableHead>
                        <TableHead>Gross Pay</TableHead>
                        <TableHead>Deductions</TableHead>
                        <TableHead>Net Pay</TableHead>
                        <TableHead>Pay Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayroll.map((payroll) => (
                        <TableRow key={payroll.id}>
                          <TableCell className="font-medium">{payroll.employee}</TableCell>
                          <TableCell>{payroll.employeeId}</TableCell>
                          <TableCell>${payroll.grossPay.toLocaleString()}</TableCell>
                          <TableCell>${payroll.deductions.toLocaleString()}</TableCell>
                          <TableCell className="font-medium">${payroll.netPay.toLocaleString()}</TableCell>
                          <TableCell>{payroll.payDate}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(payroll.status)}>
                              {payroll.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                              {payroll.status === 'pending' && (
                                <Button variant="outline" size="sm">
                                  Process
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

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payroll History</CardTitle>
                <CardDescription>Historical payroll records and data</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Payroll history interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payroll Reports</CardTitle>
                <CardDescription>Generate payroll reports and analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Payroll reports interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payroll Settings</CardTitle>
                <CardDescription>Configure payroll processing settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Payroll settings interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default PayrollPage;
