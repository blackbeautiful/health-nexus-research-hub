
import React, { useState } from 'react';
import { Search, Plus, Filter, Clock, Calendar, CheckCircle, User, Building, AlertTriangle, FileText, MoreHorizontal, MapPin, Download } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type VisitType = 'site-initiation' | 'interim-monitoring' | 'close-out' | 'for-cause';
type VisitStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'report-pending';

interface SiteVisit {
  id: string;
  type: VisitType;
  status: VisitStatus;
  siteName: string;
  siteLocation: string;
  studyId: string;
  studyName: string;
  scheduleDate: Date;
  endDate?: Date;
  monitorName: string;
  monitorInitials: string;
  findings?: number;
  reportStatus?: 'draft' | 'pending-review' | 'final';
  completionPercentage?: number;
  actionItems?: number;
}

const SiteVisitsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const visits: SiteVisit[] = [
    {
      id: 'SV-1001',
      type: 'site-initiation',
      status: 'completed',
      siteName: 'Memorial Cancer Center',
      siteLocation: 'Boston, MA',
      studyId: 'NCT039281754',
      studyName: 'BEACON-CRC Phase II Trial',
      scheduleDate: new Date('2025-01-15'),
      endDate: new Date('2025-01-15'),
      monitorName: 'Sarah Johnson',
      monitorInitials: 'SJ',
      findings: 3,
      reportStatus: 'final',
      completionPercentage: 100,
      actionItems: 2
    },
    {
      id: 'SV-1002',
      type: 'interim-monitoring',
      status: 'completed',
      siteName: 'University Medical Center',
      siteLocation: 'New York, NY',
      studyId: 'NCT039281754',
      studyName: 'BEACON-CRC Phase II Trial',
      scheduleDate: new Date('2025-02-20'),
      endDate: new Date('2025-02-20'),
      monitorName: 'Michael Chen',
      monitorInitials: 'MC',
      findings: 5,
      reportStatus: 'final',
      completionPercentage: 100,
      actionItems: 3
    },
    {
      id: 'SV-1003',
      type: 'interim-monitoring',
      status: 'report-pending',
      siteName: 'Northwestern Oncology Institute',
      siteLocation: 'Chicago, IL',
      studyId: 'NCT039281754',
      studyName: 'BEACON-CRC Phase II Trial',
      scheduleDate: new Date('2025-03-15'),
      endDate: new Date('2025-03-15'),
      monitorName: 'Sarah Johnson',
      monitorInitials: 'SJ',
      findings: 2,
      reportStatus: 'draft',
      completionPercentage: 60,
      actionItems: 2
    },
    {
      id: 'SV-1004',
      type: 'for-cause',
      status: 'completed',
      siteName: 'Southwest Research Hospital',
      siteLocation: 'Houston, TX',
      studyId: 'NCT039281754',
      studyName: 'BEACON-CRC Phase II Trial',
      scheduleDate: new Date('2025-03-25'),
      endDate: new Date('2025-03-25'),
      monitorName: 'Michael Chen',
      monitorInitials: 'MC',
      findings: 8,
      reportStatus: 'pending-review',
      completionPercentage: 90,
      actionItems: 6
    },
    {
      id: 'SV-1005',
      type: 'interim-monitoring',
      status: 'scheduled',
      siteName: 'Memorial Cancer Center',
      siteLocation: 'Boston, MA',
      studyId: 'NCT039281754',
      studyName: 'BEACON-CRC Phase II Trial',
      scheduleDate: new Date('2025-04-20'),
      monitorName: 'Sarah Johnson',
      monitorInitials: 'SJ'
    },
    {
      id: 'SV-1006',
      type: 'close-out',
      status: 'scheduled',
      siteName: 'University Medical Center',
      siteLocation: 'New York, NY',
      studyId: 'NCT039281754',
      studyName: 'BEACON-CRC Phase II Trial',
      scheduleDate: new Date('2025-06-15'),
      monitorName: 'Michael Chen',
      monitorInitials: 'MC'
    }
  ];
  
  const getVisitTypeLabel = (type: VisitType) => {
    switch (type) {
      case 'site-initiation':
        return 'Site Initiation Visit';
      case 'interim-monitoring':
        return 'Interim Monitoring Visit';
      case 'close-out':
        return 'Close-out Visit';
      case 'for-cause':
        return 'For-Cause Visit';
    }
  };
  
  const getTypeColor = (type: VisitType) => {
    switch (type) {
      case 'site-initiation':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'interim-monitoring':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'close-out':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'for-cause':
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };
  
  const getStatusColor = (status: VisitStatus) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'report-pending':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };
  
  const getReportStatusLabel = (status?: 'draft' | 'pending-review' | 'final') => {
    if (!status) return 'Not Started';
    
    switch (status) {
      case 'draft':
        return 'Draft';
      case 'pending-review':
        return 'Pending Review';
      case 'final':
        return 'Final';
    }
  };
  
  // Filter visits based on active tab and search term
  const filteredVisits = visits.filter((visit) => {
    const matchesSearch = searchTerm === '' 
      || visit.siteName.toLowerCase().includes(searchTerm.toLowerCase())
      || visit.siteLocation.toLowerCase().includes(searchTerm.toLowerCase())
      || visit.id.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (activeTab === 'all') {
      return matchesSearch;
    } else if (activeTab === 'upcoming') {
      return matchesSearch && (visit.status === 'scheduled');
    } else if (activeTab === 'completed') {
      return matchesSearch && (visit.status === 'completed');
    } else if (activeTab === 'pending-reports') {
      return matchesSearch && (visit.status === 'report-pending' || 
        (visit.reportStatus === 'draft' || visit.reportStatus === 'pending-review'));
    } else {
      return matchesSearch && visit.type === activeTab;
    }
  });
  
  return (
    <Layout title="Site Visits">
      <PageHeader 
        title="Site Visit Reports" 
        description="Manage and track clinical site monitoring visits"
        breadcrumbs={[
          { label: 'Studies', link: '/studies' },
          { label: 'Site Visits' }
        ]}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {visits.filter(v => v.status === 'scheduled').length}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Next: {
              new Date(Math.min(...visits
                .filter(v => v.status === 'scheduled')
                .map(v => v.scheduleDate.getTime())))
                .toLocaleDateString()
            }</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {visits.filter(v => v.status === 'report-pending' || 
                (v.reportStatus === 'draft' || v.reportStatus === 'pending-review')).length}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Require completion</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Findings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {visits.reduce((sum, visit) => sum + (visit.findings || 0), 0)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {visits.reduce((sum, visit) => sum + (visit.actionItems || 0), 0)} action items
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
              placeholder="Search sites..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select defaultValue="NCT039281754">
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select study" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NCT039281754">BEACON-CRC Phase II Trial</SelectItem>
              <SelectItem value="NCT087654321">BRAVADO Breast Cancer Study</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Calendar View
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Visit
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
              <TabsTrigger value="all">All Visits</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="pending-reports">Pending Reports</TabsTrigger>
              <TabsTrigger value="site-initiation">Initiation</TabsTrigger>
              <TabsTrigger value="interim-monitoring">Monitoring</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Visit ID</TableHead>
                <TableHead>Site</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Monitor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Report</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVisits.map((visit) => (
                <TableRow key={visit.id}>
                  <TableCell className="font-medium">{visit.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{visit.siteName}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {visit.siteLocation}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getTypeColor(visit.type)}>
                      {visit.type === 'site-initiation' ? 'Initiation' : 
                       visit.type === 'interim-monitoring' ? 'Monitoring' :
                       visit.type === 'close-out' ? 'Close-out' : 'For-Cause'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span>{visit.scheduleDate.toLocaleDateString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground text-xs">
                          {visit.monitorInitials}
                        </div>
                      </Avatar>
                      <span className="text-sm">{visit.monitorName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(visit.status)}>
                      {visit.status === 'report-pending' ? 'Report Pending' : 
                       visit.status.charAt(0).toUpperCase() + visit.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {visit.reportStatus ? (
                      <div>
                        <div className="text-sm">{getReportStatusLabel(visit.reportStatus)}</div>
                        {visit.completionPercentage !== undefined && visit.completionPercentage < 100 && (
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={visit.completionPercentage} className="h-1.5 flex-grow" />
                            <span className="text-xs text-muted-foreground">{visit.completionPercentage}%</span>
                          </div>
                        )}
                        {visit.findings !== undefined && (
                          <div className="flex items-center gap-2 mt-1">
                            <AlertTriangle className="h-3 w-3 text-amber-500" />
                            <span className="text-xs text-muted-foreground">
                              {visit.findings} {visit.findings === 1 ? 'finding' : 'findings'}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">Not started</span>
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
                        {visit.status === 'scheduled' && (
                          <DropdownMenuItem>
                            <Clock className="mr-2 h-4 w-4" />
                            Start Visit
                          </DropdownMenuItem>
                        )}
                        {visit.status === 'in-progress' && (
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Complete Visit
                          </DropdownMenuItem>
                        )}
                        {(visit.status === 'completed' || visit.status === 'report-pending') && !visit.reportStatus && (
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            Start Report
                          </DropdownMenuItem>
                        )}
                        {visit.reportStatus && (
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            {visit.reportStatus === 'final' ? 'View Report' : 'Edit Report'}
                          </DropdownMenuItem>
                        )}
                        {visit.reportStatus === 'draft' && (
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Submit for Review
                          </DropdownMenuItem>
                        )}
                        {visit.reportStatus === 'pending-review' && (
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Finalize Report
                          </DropdownMenuItem>
                        )}
                        {visit.reportStatus === 'final' && (
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download Report
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        {visit.status === 'scheduled' && (
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            Reschedule
                          </DropdownMenuItem>
                        )}
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

export default SiteVisitsPage;
