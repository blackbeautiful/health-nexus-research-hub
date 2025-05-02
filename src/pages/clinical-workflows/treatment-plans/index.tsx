
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Plus, Calendar, FileText, Clock, Download, MoreHorizontal, ClipboardCheck } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from '@/components/ui/progress';

interface TreatmentPlan {
  id: string;
  patientName: string;
  patientId: string;
  diagnosis: string;
  startDate: string;
  endDate?: string;
  provider: string;
  status: 'active' | 'completed' | 'planned' | 'discontinued';
  adherence?: number;
  lastUpdated: string;
}

const TreatmentPlansPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Sample treatment plan data
  const treatmentPlans: TreatmentPlan[] = [
    {
      id: 'TP-10245',
      patientName: 'Sarah Johnson',
      patientId: 'PT-12345',
      diagnosis: 'Breast Cancer (HER2+)',
      startDate: '2025-02-01',
      endDate: '2025-08-01',
      provider: 'Dr. Rebecca Martinez',
      status: 'active',
      adherence: 92,
      lastUpdated: '2025-04-10'
    },
    {
      id: 'TP-10246',
      patientName: 'Michael Smith',
      patientId: 'PT-12346',
      diagnosis: 'Non-Small Cell Lung Cancer',
      startDate: '2025-03-15',
      provider: 'Dr. James Wilson',
      status: 'active',
      adherence: 88,
      lastUpdated: '2025-04-08'
    },
    {
      id: 'TP-10247',
      patientName: 'Emma Thompson',
      patientId: 'PT-12347',
      diagnosis: 'Colorectal Cancer (Stage III)',
      startDate: '2025-01-20',
      endDate: '2025-07-20',
      provider: 'Dr. Elena Rodriguez',
      status: 'active',
      adherence: 95,
      lastUpdated: '2025-04-12'
    },
    {
      id: 'TP-10248',
      patientName: 'John Davis',
      patientId: 'PT-12348',
      diagnosis: 'Diffuse Large B-cell Lymphoma',
      startDate: '2025-04-01',
      endDate: '2025-10-01',
      provider: 'Dr. Robert Kim',
      status: 'planned',
      lastUpdated: '2025-04-01'
    },
    {
      id: 'TP-10249',
      patientName: 'Linda Wilson',
      patientId: 'PT-12349',
      diagnosis: 'Ovarian Cancer (Stage II)',
      startDate: '2024-09-10',
      endDate: '2025-03-10',
      provider: 'Dr. Rebecca Martinez',
      status: 'completed',
      adherence: 97,
      lastUpdated: '2025-03-10'
    },
    {
      id: 'TP-10250',
      patientName: 'David Brown',
      patientId: 'PT-12350',
      diagnosis: 'Metastatic Melanoma',
      startDate: '2025-02-15',
      endDate: '2025-03-20',
      provider: 'Dr. James Wilson',
      status: 'discontinued',
      adherence: 45,
      lastUpdated: '2025-03-20'
    }
  ];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planned': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'discontinued': return 'bg-red-100 text-red-800 border-red-200';
      default: return '';
    }
  };
  
  const getAdherenceColor = (adherence: number | undefined) => {
    if (adherence === undefined) return '';
    if (adherence >= 90) return 'bg-green-100 text-green-800 border-green-200';
    if (adherence >= 75) return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };
  
  // Filter treatment plans based on search term and status filter
  const filteredPlans = treatmentPlans.filter(plan => {
    const matchesSearch = 
      plan.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || plan.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <MainLayout>
      <PageHeader
        title="Treatment Plans"
        description="Manage and track patient treatment regimens"
        breadcrumbs={[
          { label: 'Clinical Workflows', link: '/clinical-workflows' },
          { label: 'Treatment Plans' }
        ]}
        action={{
          label: 'New Treatment Plan',
          icon: Plus,
          onClick: () => console.log('Create new treatment plan')
        }}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {treatmentPlans.filter(plan => plan.status === 'active').length}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Currently in progress
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {treatmentPlans.filter(plan => plan.status === 'completed').length}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Successfully finished
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Planned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {treatmentPlans.filter(plan => plan.status === 'planned').length}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Scheduled to begin
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Adherence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                treatmentPlans
                  .filter(plan => plan.adherence !== undefined)
                  .reduce((sum, plan) => sum + (plan.adherence || 0), 0) / 
                treatmentPlans.filter(plan => plan.adherence !== undefined).length
              )}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Treatment protocol compliance
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search treatment plans..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="planned">Planned</SelectItem>
              <SelectItem value="discontinued">Discontinued</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Plans</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="planned">Planned</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Timeline</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Adherence</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlans.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                    No treatment plans match your criteria
                  </TableCell>
                </TableRow>
              ) : (
                filteredPlans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell className="font-medium">{plan.id}</TableCell>
                    <TableCell>
                      <div>
                        <div>{plan.patientName}</div>
                        <div className="text-xs text-muted-foreground">{plan.patientId}</div>
                      </div>
                    </TableCell>
                    <TableCell>{plan.diagnosis}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3" />
                          <span>Start: {plan.startDate}</span>
                        </div>
                        {plan.endDate && (
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3 w-3" />
                            <span>End: {plan.endDate}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{plan.provider}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(plan.status)}>
                        {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {plan.adherence !== undefined ? (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Adherence</span>
                            <span className={`font-medium ${
                              plan.adherence >= 90 ? 'text-green-600' : 
                              plan.adherence >= 75 ? 'text-amber-600' : 'text-red-600'
                            }`}>{plan.adherence}%</span>
                          </div>
                          <Progress value={plan.adherence} className="h-1" />
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => console.log(`View ${plan.id}`)}>
                            <FileText className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => console.log(`Edit ${plan.id}`)}>
                            <ClipboardCheck className="mr-2 h-4 w-4" />
                            Update Plan
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => console.log(`Track ${plan.id}`)}>
                            <Clock className="mr-2 h-4 w-4" />
                            Track Progress
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => console.log(`Print ${plan.id}`)}>
                            <Download className="mr-2 h-4 w-4" />
                            Export PDF
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="border-t p-4 flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredPlans.length} of {treatmentPlans.length} treatment plans
          </div>
          <Button variant="outline" size="sm">Load More</Button>
        </CardFooter>
      </Card>
    </MainLayout>
  );
};

export default TreatmentPlansPage;
