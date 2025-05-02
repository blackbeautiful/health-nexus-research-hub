
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Download, FileText, Clock, HeartPulse, FileSpreadsheet } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const MedicalRecordsPage = () => {
  const recentRecords = [
    { id: 'MR-10245', patient: 'Sarah Johnson', type: 'Progress Note', date: '2025-04-15', provider: 'Dr. Rebecca Martinez' },
    { id: 'MR-10244', patient: 'Michael Smith', type: 'Lab Results', date: '2025-04-14', provider: 'Dr. James Wilson' },
    { id: 'MR-10243', patient: 'Emma Thompson', type: 'Diagnostic Imaging', date: '2025-04-12', provider: 'Dr. Elena Rodriguez' },
    { id: 'MR-10242', patient: 'John Davis', type: 'Consultation', date: '2025-04-10', provider: 'Dr. Robert Kim' },
    { id: 'MR-10241', patient: 'Linda Wilson', type: 'Medication Record', date: '2025-04-08', provider: 'Dr. Anna Lopez' },
  ];

  return (
    <MainLayout>
      <PageHeader
        title="Medical Records"
        description="Access and manage patient medical records"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Medical Records' }
        ]}
        action={{
          label: 'Create Record',
          icon: FileText,
          onClick: () => console.log('Create new medical record')
        }}
      />

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <Card className="flex-1">
          <CardHeader className="pb-3">
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>Navigate to specific medical record sections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-24 flex flex-col" onClick={() => window.location.href = '/medical-records/history'}>
                <Clock className="h-6 w-6 mb-2" />
                <span>Patient History</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col" onClick={() => window.location.href = '/medical-records/diagnoses'}>
                <HeartPulse className="h-6 w-6 mb-2" />
                <span>Diagnoses</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col" onClick={() => window.location.href = '/medical-records/imaging'}>
                <FileSpreadsheet className="h-6 w-6 mb-2" />
                <span>Imaging Results</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col" onClick={() => window.location.href = '/medical-records/external'}>
                <FileText className="h-6 w-6 mb-2" />
                <span>External Records</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Recent Medical Records</CardTitle>
              <CardDescription>Recently updated patient records</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search records..."
                  className="pl-8 w-[200px] md:w-[300px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Records</TabsTrigger>
              <TabsTrigger value="notes">Progress Notes</TabsTrigger>
              <TabsTrigger value="lab">Lab Results</TabsTrigger>
              <TabsTrigger value="imaging">Imaging</TabsTrigger>
              <TabsTrigger value="medications">Medications</TabsTrigger>
            </TabsList>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Record ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Record Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentRecords.map((record) => (
                  <TableRow key={record.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{record.id}</TableCell>
                    <TableCell>{record.patient}</TableCell>
                    <TableCell>{record.type}</TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.provider}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Complete
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Tabs>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default MedicalRecordsPage;
