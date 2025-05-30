
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Download, TestTube } from 'lucide-react';

const LabResultsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const labResults = [
    { id: 'LAB-001', patient: 'Sarah Johnson', test: 'Complete Blood Count', date: '2025-01-15', status: 'Normal', critical: false },
    { id: 'LAB-002', patient: 'Michael Smith', test: 'Lipid Panel', date: '2025-01-14', status: 'Abnormal', critical: true },
    { id: 'LAB-003', patient: 'Emma Thompson', test: 'Thyroid Function', date: '2025-01-12', status: 'Normal', critical: false },
    { id: 'LAB-004', patient: 'John Davis', test: 'Cardiac Enzymes', date: '2025-01-10', status: 'Critical', critical: true }
  ];

  return (
    <MainLayout>
      <PageHeader
        title="Laboratory Results"
        description="View and manage patient laboratory test results"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Laboratory Results' }
        ]}
        action={{
          label: 'New Lab Order',
          icon: TestTube,
          onClick: () => console.log('New lab order')
        }}
      />

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Lab Results</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search results..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-[300px]"
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lab ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Test</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {labResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="font-medium">{result.id}</TableCell>
                  <TableCell>{result.patient}</TableCell>
                  <TableCell>{result.test}</TableCell>
                  <TableCell>{result.date}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        result.status === 'Critical' ? 'destructive' : 
                        result.status === 'Abnormal' ? 'outline' : 
                        'secondary'
                      }
                    >
                      {result.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Report
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default LabResultsPage;
