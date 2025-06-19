
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, FileText, Activity, Users, Calendar } from 'lucide-react';

const ClinicalDataPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const recentEntries = [
    {
      id: 'CD-001',
      patient: 'Sarah Johnson',
      studyId: 'STUDY-2024-001',
      formType: 'Baseline Assessment',
      completedBy: 'Dr. Martinez',
      completedDate: '2024-01-15',
      status: 'complete'
    },
    {
      id: 'CD-002',
      patient: 'Michael Brown',
      studyId: 'STUDY-2024-002',
      formType: 'Adverse Event Report',
      completedBy: 'Nurse Johnson',
      completedDate: '2024-01-14',
      status: 'pending_review'
    },
    {
      id: 'CD-003',
      patient: 'Emily Davis',
      studyId: 'STUDY-2024-001',
      formType: 'Follow-up Visit',
      completedBy: 'Dr. Chen',
      completedDate: '2024-01-13',
      status: 'complete'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-green-100 text-green-800';
      case 'pending_review': return 'bg-yellow-100 text-yellow-800';
      case 'incomplete': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'complete': return 'Complete';
      case 'pending_review': return 'Pending Review';
      case 'incomplete': return 'Incomplete';
      default: return status;
    }
  };

  return (
    <MainLayout>
      <PageHeader
        title="Clinical Data"
        description="Manage clinical research data collection and entry"
        action={{
          label: 'New Entry',
          icon: Plus,
          onClick: () => console.log('Create new data entry')
        }}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Total Entries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">1,247</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Pending Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">23</div>
            <p className="text-xs text-muted-foreground">Requires QC</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Active Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">89</div>
            <p className="text-xs text-muted-foreground">In studies</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">47</div>
            <p className="text-xs text-muted-foreground">New entries</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent" className="space-y-6">
        <TabsList>
          <TabsTrigger value="recent">Recent Entries</TabsTrigger>
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="forms">Form Templates</TabsTrigger>
          <TabsTrigger value="queries">Data Queries</TabsTrigger>
        </TabsList>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle>Recent Data Entries</CardTitle>
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search entries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entry ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Study</TableHead>
                    <TableHead>Form Type</TableHead>
                    <TableHead>Completed By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.id}</TableCell>
                      <TableCell>{entry.patient}</TableCell>
                      <TableCell>{entry.studyId}</TableCell>
                      <TableCell>{entry.formType}</TableCell>
                      <TableCell>{entry.completedBy}</TableCell>
                      <TableCell>{entry.completedDate}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(entry.status)}>
                          {getStatusLabel(entry.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Data entries that require quality control review.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forms">
          <Card>
            <CardHeader>
              <CardTitle>Form Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Manage electronic case report form templates.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="queries">
          <Card>
            <CardHeader>
              <CardTitle>Data Queries</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">View and respond to data queries from sponsors.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default ClinicalDataPage;
