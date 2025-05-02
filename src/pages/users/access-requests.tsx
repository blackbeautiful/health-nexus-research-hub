
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Check, X, UserPlus, Clock, AlertCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AccessRequestsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // Sample access requests data
  const accessRequests = [
    {
      id: 'REQ-2501',
      requester: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@example.com',
      requestType: 'New User',
      requestedRole: 'Research Coordinator',
      study: 'BEACON-CRC Phase II Trial',
      dateRequested: '2025-04-30',
      status: 'pending',
      urgency: 'normal'
    },
    {
      id: 'REQ-2500',
      requester: 'Dr. Michael Chen',
      email: 'michael.chen@example.com',
      requestType: 'Role Change',
      requestedRole: 'Principal Investigator',
      study: 'BRAVADO Metastatic Breast Cancer Study',
      dateRequested: '2025-04-29',
      status: 'approved',
      urgency: 'high',
      approvedBy: 'Jane Roberts',
      approvedDate: '2025-04-30'
    },
    {
      id: 'REQ-2499',
      requester: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      requestType: 'Access Extension',
      requestedRole: 'Data Manager',
      study: 'PALADIN Lung Cancer Immunotherapy Trial',
      dateRequested: '2025-04-28',
      status: 'rejected',
      urgency: 'normal',
      rejectedBy: 'Jane Roberts',
      rejectedDate: '2025-04-29',
      rejectionReason: 'Insufficient justification provided'
    },
    {
      id: 'REQ-2498',
      requester: 'Dr. Robert Chang',
      email: 'robert.chang@example.com',
      requestType: 'New User',
      requestedRole: 'Research Nurse',
      study: 'BEACON-CRC Phase II Trial',
      dateRequested: '2025-04-27',
      status: 'pending',
      urgency: 'high'
    },
    {
      id: 'REQ-2497',
      requester: 'Maria Santos',
      email: 'maria.santos@example.com',
      requestType: 'Study Access',
      requestedRole: 'Research Coordinator',
      study: 'BRAVADO Metastatic Breast Cancer Study',
      dateRequested: '2025-04-26',
      status: 'approved',
      urgency: 'normal',
      approvedBy: 'Jane Roberts',
      approvedDate: '2025-04-28'
    }
  ];
  
  // Filter requests based on status filter
  const filteredRequests = statusFilter === 'all' 
    ? accessRequests 
    : accessRequests.filter(request => request.status === statusFilter);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">High</Badge>;
      case 'normal':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">Normal</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Low</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  return (
    <MainLayout>
      <PageHeader 
        title="Access Requests" 
        description="Manage system access requests and approvals"
        breadcrumbs={[
          { label: 'User Management', link: '/users' },
          { label: 'Access Requests' }
        ]}
        action={{
          label: "Create Request",
          icon: UserPlus,
          onClick: () => console.log("Create new access request")
        }}
      />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-3">
          <div className="relative w-full md:w-[350px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search requests..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select 
            value={statusFilter} 
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Requests</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">2</div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting review and approval
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Approved (Last 30 days)</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">14</div>
            <p className="text-xs text-muted-foreground mt-1">
              Access requests approved
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">1</div>
            <p className="text-xs text-muted-foreground mt-1">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="new-users">New Users</TabsTrigger>
          <TabsTrigger value="role-changes">Role Changes</TabsTrigger>
          <TabsTrigger value="study-access">Study Access</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Access Request Management</CardTitle>
              <CardDescription>Review and process user access requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Requester</TableHead>
                    <TableHead>Request Type</TableHead>
                    <TableHead>Requested Role</TableHead>
                    <TableHead>Study</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Urgency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>
                        <div>
                          <div>{request.requester}</div>
                          <div className="text-xs text-muted-foreground">{request.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{request.requestType}</TableCell>
                      <TableCell>{request.requestedRole}</TableCell>
                      <TableCell>{request.study}</TableCell>
                      <TableCell>{request.dateRequested}</TableCell>
                      <TableCell>{getUrgencyBadge(request.urgency)}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell className="text-right">
                        {request.status === 'pending' ? (
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" className="border-green-200 hover:bg-green-100 hover:text-green-800">
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" className="border-red-200 hover:bg-red-100 hover:text-red-800">
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <Button variant="ghost" size="sm">Details</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="new-users" className="mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <UserPlus className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-medium">New User Requests</h3>
                <p className="mt-2 mb-4 text-sm text-muted-foreground max-w-sm">
                  Filter to show only new user registration requests. Review credentials, 
                  verify identities, and assign appropriate initial roles.
                </p>
                <Button>
                  View New User Requests
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="role-changes" className="mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-medium">Role Change Requests</h3>
                <p className="mt-2 mb-4 text-sm text-muted-foreground max-w-sm">
                  Review requests for role changes and permission updates for existing users.
                  Evaluate requested access level changes against security policies.
                </p>
                <Button>
                  View Role Change Requests
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="study-access" className="mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <Clock className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-medium">Study Access Requests</h3>
                <p className="mt-2 mb-4 text-sm text-muted-foreground max-w-sm">
                  Manage requests for access to specific research studies. 
                  Verify qualifications and study team assignments.
                </p>
                <Button>
                  View Study Access Requests
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default AccessRequestsPage;
