
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, Filter, Plus, Calendar, FileDown, FileUp, FileSpreadsheet, History } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DataExportsPage: React.FC = () => {
  const [studyFilter, setStudyFilter] = useState<string>("BEACON-CRC");
  
  const exportHistory = [
    {
      id: 'EXP-1001',
      name: 'Full Study Dataset - April 2025',
      type: 'CSV',
      study: 'BEACON-CRC',
      created: '2025-04-30',
      createdBy: 'Dr. Jane Roberts',
      records: 825,
      status: 'completed'
    },
    {
      id: 'EXP-1002',
      name: 'Patient Demographics',
      type: 'Excel',
      study: 'BEACON-CRC',
      created: '2025-04-25',
      createdBy: 'Dr. Jane Roberts',
      records: 825,
      status: 'completed'
    },
    {
      id: 'EXP-1003',
      name: 'Adverse Events Summary',
      type: 'CSV',
      study: 'BEACON-CRC',
      created: '2025-04-20',
      createdBy: 'Dr. Michael Chen',
      records: 248,
      status: 'completed'
    },
    {
      id: 'EXP-1004',
      name: 'Laboratory Results - Q1 2025',
      type: 'SAS',
      study: 'BEACON-CRC',
      created: '2025-04-15',
      createdBy: 'Dr. Sarah Johnson',
      records: 1840,
      status: 'completed'
    },
    {
      id: 'EXP-1005',
      name: 'Protocol Deviations',
      type: 'CSV',
      study: 'PALADIN',
      created: '2025-04-10',
      createdBy: 'Dr. Michael Chen',
      records: 42,
      status: 'completed'
    },
  ];
  
  const scheduledExports = [
    {
      id: 'SCH-001',
      name: 'Weekly Data Summary',
      format: 'Excel',
      study: 'BEACON-CRC',
      frequency: 'Weekly',
      nextExport: '2025-05-07',
      recipients: 3,
      status: 'active'
    },
    {
      id: 'SCH-002',
      name: 'Monthly Safety Data',
      format: 'CSV',
      study: 'BEACON-CRC',
      frequency: 'Monthly',
      nextExport: '2025-05-01',
      recipients: 5,
      status: 'active'
    },
    {
      id: 'SCH-003',
      name: 'Quarterly Regulatory Report',
      format: 'PDF',
      study: 'BEACON-CRC',
      frequency: 'Quarterly',
      nextExport: '2025-06-30',
      recipients: 8,
      status: 'active'
    }
  ];
  
  const exportTemplates = [
    {
      id: 'TEMP-001',
      name: 'Complete Study Dataset',
      description: 'All data points for all patients',
      formats: ['CSV', 'Excel', 'SAS'],
      variables: 256,
      lastUsed: '2025-04-30'
    },
    {
      id: 'TEMP-002',
      name: 'Demographics Summary',
      description: 'Patient demographic information',
      formats: ['CSV', 'Excel'],
      variables: 42,
      lastUsed: '2025-04-25'
    },
    {
      id: 'TEMP-003',
      name: 'Adverse Events',
      description: 'Safety and adverse event data',
      formats: ['CSV', 'Excel', 'SAS'],
      variables: 68,
      lastUsed: '2025-04-20'
    },
    {
      id: 'TEMP-004',
      name: 'Laboratory Results',
      description: 'All lab test results',
      formats: ['CSV', 'Excel', 'SAS'],
      variables: 124,
      lastUsed: '2025-04-15'
    },
    {
      id: 'TEMP-005',
      name: 'Protocol Deviations',
      description: 'Protocol deviation records',
      formats: ['CSV', 'Excel'],
      variables: 28,
      lastUsed: '2025-04-10'
    }
  ];
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case 'processing':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Processing</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'active':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case 'paused':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Paused</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'CSV':
        return <FileSpreadsheet className="h-4 w-4" />;
      case 'Excel':
        return <FileSpreadsheet className="h-4 w-4 text-green-600" />;
      case 'SAS':
        return <FileSpreadsheet className="h-4 w-4 text-blue-600" />;
      case 'PDF':
        return <FileDown className="h-4 w-4 text-red-600" />;
      default:
        return <FileDown className="h-4 w-4" />;
    }
  };
  
  return (
    <MainLayout>
      <PageHeader 
        title="Data Exports" 
        description="Create, manage, and download research data exports"
        breadcrumbs={[
          { label: 'Research Data', link: '/research-data' },
          { label: 'Exports' }
        ]}
        action={{
          label: "New Export",
          icon: Plus,
          onClick: () => console.log("Create new data export")
        }}
      />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <Select 
          value={studyFilter} 
          onValueChange={setStudyFilter}
        >
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select study" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="BEACON-CRC">BEACON-CRC Phase II Trial</SelectItem>
            <SelectItem value="BRAVADO">BRAVADO Metastatic Breast Cancer Study</SelectItem>
            <SelectItem value="PALADIN">PALADIN Lung Cancer Immunotherapy Trial</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filters
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Exports</CardTitle>
            <FileDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">158</div>
            <p className="text-xs text-muted-foreground mt-1">
              Since study inception
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Exports</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">3</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active recurring exports
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Export Templates</CardTitle>
            <FileUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">5</div>
            <p className="text-xs text-muted-foreground mt-1">
              Saved templates for quick export
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="history" className="mb-6">
        <TabsList>
          <TabsTrigger value="history">Export History</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Exports</TabsTrigger>
          <TabsTrigger value="templates">Export Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Data Exports</CardTitle>
              <CardDescription>History of data exports from this study</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Export ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Study</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Records</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exportHistory.map((export_) => (
                    <TableRow key={export_.id}>
                      <TableCell className="font-medium">{export_.id}</TableCell>
                      <TableCell>{export_.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getFileIcon(export_.type)}
                          <span>{export_.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>{export_.study}</TableCell>
                      <TableCell>{export_.created}</TableCell>
                      <TableCell>{export_.createdBy}</TableCell>
                      <TableCell>{export_.records}</TableCell>
                      <TableCell>{getStatusBadge(export_.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Full Export History</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="scheduled" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Exports</CardTitle>
              <CardDescription>Automated recurring data exports</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Study</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Next Export</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduledExports.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell className="font-medium">{schedule.id}</TableCell>
                      <TableCell>{schedule.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getFileIcon(schedule.format)}
                          <span>{schedule.format}</span>
                        </div>
                      </TableCell>
                      <TableCell>{schedule.study}</TableCell>
                      <TableCell>{schedule.frequency}</TableCell>
                      <TableCell>{schedule.nextExport}</TableCell>
                      <TableCell>{schedule.recipients}</TableCell>
                      <TableCell>{getStatusBadge(schedule.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">Pause</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Schedule New Export</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Export Templates</CardTitle>
              <CardDescription>Saved configurations for frequently used exports</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Available Formats</TableHead>
                    <TableHead>Variables</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exportTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.id}</TableCell>
                      <TableCell>{template.name}</TableCell>
                      <TableCell>{template.description}</TableCell>
                      <TableCell>{template.formats.join(', ')}</TableCell>
                      <TableCell>{template.variables}</TableCell>
                      <TableCell>{template.lastUsed}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Use</Button>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Create New Template</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default DataExportsPage;
