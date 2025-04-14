
import React, { useState } from 'react';
import { Search, Filter, Plus, AlertTriangle, FileText, Check, XCircle, Clock, MoreHorizontal } from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from '@/components/ui/avatar';

type DeviationSeverity = 'minor' | 'major' | 'critical';
type DeviationStatus = 'reported' | 'under-review' | 'resolved' | 'closed';

interface DeviationRecord {
  id: string;
  title: string;
  description: string;
  patientId?: string;
  patientName?: string;
  studyId: string;
  studyName: string;
  severity: DeviationSeverity;
  status: DeviationStatus;
  reportedBy: string;
  reportedDate: Date;
  resolvedDate?: Date;
  resolutionSummary?: string;
  corrective?: string;
  preventative?: string;
}

const ProtocolDeviationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const deviationRecords: DeviationRecord[] = [
    {
      id: 'DEV-1001',
      title: 'Missing eligibility documentation',
      description: 'Patient enrolled without complete documentation of eligibility criteria',
      patientId: 'PT-1024',
      patientName: 'Sarah Parker',
      studyId: 'NCT039281754',
      studyName: 'BEACON-CRC Phase II Trial',
      severity: 'minor',
      status: 'resolved',
      reportedBy: 'Dr. Rebecca Martinez',
      reportedDate: new Date('2025-04-01'),
      resolvedDate: new Date('2025-04-05'),
      resolutionSummary: 'Missing documentation was located and added to the patient file',
      corrective: 'Documentation was properly filed',
      preventative: 'Additional pre-enrollment checklist added to enrollment process'
    },
    {
      id: 'DEV-1002',
      title: 'Protocol-defined visit window missed',
      description: 'Patient visit conducted 5 days outside of protocol-defined window',
      patientId: 'PT-1056',
      patientName: 'John Davis',
      studyId: 'NCT039281754',
      studyName: 'BEACON-CRC Phase II Trial',
      severity: 'minor',
      status: 'resolved',
      reportedBy: 'Dr. James Wilson',
      reportedDate: new Date('2025-03-25'),
      resolvedDate: new Date('2025-03-28'),
      resolutionSummary: 'PI reviewed data and determined no impact on study outcomes',
      corrective: 'Visit data marked as protocol deviation in EDC system',
      preventative: 'Implemented improved patient reminder system'
    },
    {
      id: 'DEV-1003',
      title: 'Medication dispensing error',
      description: 'Patient received incorrect dose of study medication at Cycle 2 Day 1',
      patientId: 'PT-1078',
      patientName: 'Emma Thompson',
      studyId: 'NCT039281754',
      studyName: 'BEACON-CRC Phase II Trial',
      severity: 'major',
      status: 'under-review',
      reportedBy: 'Nurse Jessica Lee',
      reportedDate: new Date('2025-04-08'),
      corrective: 'Patient monitored for adverse events; none reported to date',
    },
    {
      id: 'DEV-1004',
      title: 'Missing informed consent documentation',
      description: 'Patient underwent study procedures without properly documented informed consent',
      patientId: 'PT-1085',
      patientName: 'Linda Wilson',
      studyId: 'NCT039281754',
      studyName: 'BEACON-CRC Phase II Trial',
      severity: 'major',
      status: 'reported',
      reportedBy: 'Dr. Anna Lopez',
      reportedDate: new Date('2025-04-10'),
    },
    {
      id: 'DEV-1005',
      title: 'Lab sample processing delay',
      description: 'Lab samples not processed within protocol-specified timeframe',
      studyId: 'NCT039281754',
      studyName: 'BEACON-CRC Phase II Trial',
      severity: 'minor',
      status: 'closed',
      reportedBy: 'Dr. Robert Kim',
      reportedDate: new Date('2025-03-15'),
      resolvedDate: new Date('2025-03-20'),
      resolutionSummary: 'Samples analyzed, results showed no significant impact',
      corrective: 'Procedure conducted according to contingency protocol',
      preventative: 'Lab staff re-trained on sample handling procedures'
    },
    {
      id: 'DEV-1006',
      title: 'Inclusion criteria violation',
      description: 'Patient enrolled with lab value outside protocol-specified range',
      patientId: 'PT-1132',
      patientName: 'Michael Brown',
      studyId: 'NCT039281754',
      studyName: 'BEACON-CRC Phase II Trial',
      severity: 'critical',
      status: 'under-review',
      reportedBy: 'Dr. Elena Rodriguez',
      reportedDate: new Date('2025-04-07'),
    },
  ];
  
  const getSeverityColor = (severity: DeviationSeverity) => {
    switch (severity) {
      case 'minor':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'major':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };
  
  const getStatusColor = (status: DeviationStatus) => {
    switch (status) {
      case 'reported':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'under-review':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'resolved':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'closed':
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };
  
  // Filter records based on active tab and search term
  const filteredRecords = deviationRecords.filter((record) => {
    const matchesSearch = searchTerm === '' 
      || record.title.toLowerCase().includes(searchTerm.toLowerCase())
      || (record.patientName && record.patientName.toLowerCase().includes(searchTerm.toLowerCase()))
      || (record.patientId && record.patientId.toLowerCase().includes(searchTerm.toLowerCase()));
      
    if (activeTab === 'all') {
      return matchesSearch;
    } else if (activeTab === 'open') {
      return matchesSearch && (record.status === 'reported' || record.status === 'under-review');
    } else {
      return matchesSearch && record.severity === activeTab;
    }
  });
  
  return (
    <Layout title="Protocol Deviations">
      <PageHeader 
        title="Protocol Deviations" 
        description="Track and manage protocol deviations and violations"
        breadcrumbs={[
          { label: 'Studies', link: '/studies' },
          { label: 'Protocol Deviations' }
        ]}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Deviations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deviationRecords.length}</div>
            <div className="text-xs text-muted-foreground mt-1">BEACON-CRC Study</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Open</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {deviationRecords.filter(d => d.status === 'reported' || d.status === 'under-review').length}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Require attention</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Major/Critical</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {deviationRecords.filter(d => d.severity === 'major' || d.severity === 'critical').length}
            </div>
            <div className="text-xs text-muted-foreground mt-1">High priority</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Closed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {deviationRecords.filter(d => d.status === 'closed').length}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Fully resolved</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search deviations..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="reported">Reported</SelectItem>
              <SelectItem value="under-review">Under Review</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Report Deviation
        </Button>
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
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="minor">Minor</TabsTrigger>
              <TabsTrigger value="major">Major</TabsTrigger>
              <TabsTrigger value="critical">Critical</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reported</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`h-4 w-4 ${
                        record.severity === 'critical' ? 'text-red-500' : 
                        record.severity === 'major' ? 'text-amber-500' : 
                        'text-blue-500'
                      }`} />
                      {record.id}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[300px]">
                      <div className="font-medium truncate">{record.title}</div>
                      <div className="text-xs text-muted-foreground truncate">{record.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {record.patientName ? (
                      <div>
                        <div>{record.patientName}</div>
                        <div className="text-xs text-muted-foreground">{record.patientId}</div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getSeverityColor(record.severity)}>
                      {record.severity.charAt(0).toUpperCase() + record.severity.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(record.status)}>
                      {record.status === 'under-review' ? 'Under Review' : 
                        record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground text-xs">
                          {record.reportedBy.split(' ').map(name => name[0]).join('')}
                        </div>
                      </Avatar>
                      <div>
                        <div className="text-xs">{record.reportedDate.toLocaleDateString()}</div>
                        <div className="text-xs text-muted-foreground">{record.reportedBy.split(' ')[0]}</div>
                      </div>
                    </div>
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
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {record.status === 'reported' && (
                          <DropdownMenuItem>
                            <Clock className="mr-2 h-4 w-4" />
                            Start Review
                          </DropdownMenuItem>
                        )}
                        {(record.status === 'reported' || record.status === 'under-review') && (
                          <DropdownMenuItem>
                            <Check className="mr-2 h-4 w-4" />
                            Mark as Resolved
                          </DropdownMenuItem>
                        )}
                        {record.status === 'resolved' && (
                          <DropdownMenuItem>
                            <Check className="mr-2 h-4 w-4" />
                            Close Deviation
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <XCircle className="mr-2 h-4 w-4" />
                          Delete Report
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

export default ProtocolDeviationsPage;
