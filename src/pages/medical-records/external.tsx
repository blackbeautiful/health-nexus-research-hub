
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Upload, FileText, Download, Eye, Calendar, Building2, ExternalLink, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ExternalRecord {
  id: string;
  type: string;
  documentName: string;
  source: string;
  date: string;
  status: 'imported' | 'pending' | 'requested';
  size?: string;
}

const ExternalRecordsPage = () => {
  const externalRecords: ExternalRecord[] = [
    { id: 'ER-1001', type: 'Discharge Summary', documentName: 'Hospital Discharge Summary - University Medical Center', source: 'University Medical Center', date: '2022-08-15', status: 'imported', size: '1.2 MB' },
    { id: 'ER-1002', type: 'Specialist Consultation', documentName: 'Oncology Consultation - Dr. Michael Brown', source: 'Memorial Cancer Institute', date: '2022-08-30', status: 'imported', size: '850 KB' },
    { id: 'ER-1003', type: 'Lab Results', documentName: 'Complete Blood Count and Metabolic Panel', source: 'Quest Diagnostics', date: '2022-09-05', status: 'imported', size: '450 KB' },
    { id: 'ER-1004', type: 'Imaging', documentName: 'MRI Report - Right Breast', source: 'Imaging Associates', date: '2022-09-08', status: 'imported', size: '2.1 MB' },
    { id: 'ER-1005', type: 'Previous Medications', documentName: 'Medication History', source: 'City Pharmacy', date: '2022-09-10', status: 'requested' },
    { id: 'ER-1006', type: 'Surgical Records', documentName: 'Prior Surgical History', source: 'Regional Surgical Center', date: '2022-09-12', status: 'pending' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'imported': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'requested': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return '';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'imported': return 'Imported';
      case 'pending': return 'Pending';
      case 'requested': return 'Requested';
      default: return status;
    }
  };

  return (
    <MainLayout>
      <PageHeader
        title="External Medical Records"
        description="Import and manage patient records from external sources"
        breadcrumbs={[
          { label: 'Medical Records', link: '/medical-records' },
          { label: 'External Records' }
        ]}
        action={{
          label: 'Import Records',
          icon: Upload,
          onClick: () => console.log('Import external records')
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Imported Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {externalRecords.filter(r => r.status === 'imported').length}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Successfully imported and available
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {externalRecords.filter(r => r.status === 'pending').length}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Awaiting processing
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Requested Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {externalRecords.filter(r => r.status === 'requested').length}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Request sent to external provider
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {externalRecords
                .filter(r => r.size)
                .reduce((acc, record) => {
                  const size = parseFloat(record.size?.split(' ')[0] || '0');
                  const unit = record.size?.split(' ')[1];
                  return acc + (unit === 'MB' ? size * 1024 : size);
                }, 0) / 1024}
              {' MB'}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Storage used by external records
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>External Records</CardTitle>
              <CardDescription>Patient: Sarah Johnson (PT-12345)</CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search records..."
                  className="pl-8 w-[250px]"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Record type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="discharge">Discharge Summary</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="lab">Lab Results</SelectItem>
                  <SelectItem value="imaging">Imaging</SelectItem>
                  <SelectItem value="medication">Medications</SelectItem>
                  <SelectItem value="surgical">Surgical Records</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Date Range
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Records</TabsTrigger>
              <TabsTrigger value="imported">Imported</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="requested">Requested</TabsTrigger>
            </TabsList>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Record ID</TableHead>
                  <TableHead>Document</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {externalRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{record.documentName}</div>
                        <div className="text-xs text-muted-foreground">{record.type}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Building2 className="h-3 w-3 text-muted-foreground" />
                        <span>{record.source}</span>
                      </div>
                    </TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(record.status)}>
                        {getStatusLabel(record.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {record.status === 'imported' && (
                          <>
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Download className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {record.status === 'requested' && (
                          <Button size="sm" variant="ghost">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                        {record.status === 'pending' && (
                          <Button size="sm" variant="ghost">
                            <FileText className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t p-4 flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {externalRecords.length} records
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Upload Documents
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Request Records
            </Button>
          </div>
        </CardFooter>
      </Card>
    </MainLayout>
  );
};

export default ExternalRecordsPage;
