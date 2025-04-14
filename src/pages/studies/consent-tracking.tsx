
import React, { useState } from 'react';
import { Search, FileCheck, Download, Filter, Plus, Clock, FileText, RefreshCcw, Eye } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from '@/components/ui/progress';

type ConsentStatus = 'obtained' | 'pending' | 'declined' | 'expired' | 'revoked' | 'not-required';

interface ConsentRecord {
  id: string;
  patientId: string;
  patientName: string;
  studyId: string;
  studyName: string;
  documentVersion: string;
  status: ConsentStatus;
  obtainedDate?: Date;
  expiryDate?: Date;
  witnessList: string[];
}

const InformedConsentPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const consentRecords: ConsentRecord[] = [
    {
      id: 'IC-1001',
      patientId: 'PT-1024',
      patientName: 'Sarah Parker',
      studyId: 'NCT039281754',
      studyName: 'BEACON-CRC Phase II Trial',
      documentVersion: 'v1.2',
      status: 'obtained',
      obtainedDate: new Date('2025-01-20'),
      expiryDate: new Date('2026-01-20'),
      witnessList: ['Dr. Rebecca Martinez', 'Nurse Jessica Lee']
    },
    {
      id: 'IC-1002',
      patientId: 'PT-1056',
      patientName: 'John Davis',
      studyId: 'NCT039281754',
      studyName: 'BEACON-CRC Phase II Trial',
      documentVersion: 'v1.2',
      status: 'obtained',
      obtainedDate: new Date('2025-02-05'),
      expiryDate: new Date('2026-02-05'),
      witnessList: ['Dr. James Wilson']
    },
    {
      id: 'IC-1003',
      patientId: 'PT-1078',
      patientName: 'Emma Thompson',
      studyId: 'NCT039281754',
      studyName: 'BEACON-CRC Phase II Trial',
      documentVersion: 'v1.2',
      status: 'pending',
      witnessList: []
    },
    {
      id: 'IC-1004',
      patientId: 'PT-1085',
      patientName: 'Linda Wilson',
      studyId: 'NCT039281754',
      studyName: 'BEACON-CRC Phase II Trial',
      documentVersion: 'v1.1',
      status: 'expired',
      obtainedDate: new Date('2024-03-15'),
      expiryDate: new Date('2025-03-15'),
      witnessList: ['Dr. Anna Lopez']
    },
    {
      id: 'IC-1005',
      patientId: 'PT-1099',
      patientName: 'Robert Garcia',
      studyId: 'NCT039281754',
      studyName: 'BEACON-CRC Phase II Trial',
      documentVersion: 'v1.2',
      status: 'declined',
      obtainedDate: new Date('2025-02-25'),
      witnessList: ['Dr. Elena Rodriguez']
    },
    {
      id: 'IC-1006',
      patientId: 'PT-1132',
      patientName: 'Michael Brown',
      studyId: 'NCT039281754',
      studyName: 'BEACON-CRC Phase II Trial',
      documentVersion: 'v1.2',
      status: 'obtained',
      obtainedDate: new Date('2025-03-10'),
      expiryDate: new Date('2026-03-10'),
      witnessList: ['Dr. James Wilson', 'Nurse Michael Chen']
    },
  ];
  
  const getStatusColor = (status: ConsentStatus) => {
    switch (status) {
      case 'obtained':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'declined':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'expired':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'revoked':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'not-required':
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  // Filter records based on active tab and search term
  const filteredRecords = consentRecords.filter((record) => {
    const matchesSearch = searchTerm === '' 
      || record.patientName.toLowerCase().includes(searchTerm.toLowerCase())
      || record.patientId.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (activeTab === 'all') {
      return matchesSearch;
    } else {
      return matchesSearch && record.status === activeTab;
    }
  });
  
  return (
    <Layout title="Informed Consent Tracking">
      <PageHeader 
        title="Informed Consent Tracking" 
        description="Manage and track patient informed consent documents"
        breadcrumbs={[
          { label: 'Studies', link: '/studies' },
          { label: 'Informed Consent' }
        ]}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Consents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{consentRecords.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Obtained</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{consentRecords.filter(r => r.status === 'obtained').length}</div>
            <Progress 
              value={consentRecords.filter(r => r.status === 'obtained').length / consentRecords.length * 100} 
              className="mt-2 h-2"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{consentRecords.filter(r => r.status === 'pending').length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">For Renewal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{consentRecords.filter(r => r.status === 'expired').length}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search patients..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="patient-az">Patient (A-Z)</SelectItem>
              <SelectItem value="patient-za">Patient (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Consent
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <Tabs 
            defaultValue="all" 
            value={activeTab} 
            onValueChange={setActiveTab}
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="obtained">Obtained</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="expired">Expired</TabsTrigger>
              <TabsTrigger value="declined">Declined</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Study</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Obtained Date</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{record.patientName}</div>
                      <div className="text-xs text-muted-foreground">{record.patientId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[250px]">
                      <div className="truncate text-sm">{record.studyName}</div>
                      <div className="text-xs text-muted-foreground">{record.studyId}</div>
                    </div>
                  </TableCell>
                  <TableCell>{record.documentVersion}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(record.status)}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {record.obtainedDate ? record.obtainedDate.toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell>
                    {record.expiryDate ? record.expiryDate.toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {record.status === 'expired' && (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <RefreshCcw className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default InformedConsentPage;
