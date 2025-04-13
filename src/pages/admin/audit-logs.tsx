
import React from 'react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, Calendar, ChevronDown, 
  Download, Eye, Filter, Search, ShieldAlert
} from 'lucide-react';
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';

const AuditLogPage = () => {
  const [date, setDate] = React.useState<Date>();
  
  return (
    <Layout title="Audit Logs">
      <PageHeader 
        title="Audit Logs" 
        description="Review system activity and security events"
        breadcrumbs={[
          { label: 'Admin', link: '/admin' },
          { label: 'Audit Logs' }
        ]}
        action={{
          label: 'Export Logs',
          icon: Download,
          onClick: () => console.log('Export logs clicked')
        }}
      />
      
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search audit logs by user, action, or resource..."
                className="pl-8"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select defaultValue="all-actions">
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Action Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-actions">All Actions</SelectItem>
                  <SelectItem value="create">Create</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                  <SelectItem value="login">Login</SelectItem>
                  <SelectItem value="export">Export</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="all-severity">
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-severity">All Severity</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full sm:w-[150px] justify-start text-left font-normal ${
                      date ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <Button variant="outline" className="flex gap-2">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAuditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs whitespace-nowrap">
                    {log.timestamp}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{log.user}</div>
                      <div className="text-xs text-muted-foreground">{log.role}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getActionBadgeVariant(log.action)}>
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{log.resource}</div>
                      <div className="text-xs truncate max-w-[200px]">{log.details}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {log.ipAddress}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {log.severity === 'Critical' ? (
                        <AlertTriangle className="h-4 w-4 text-destructive mr-1" />
                      ) : log.severity === 'Warning' ? (
                        <AlertTriangle className="h-4 w-4 text-amber-500 mr-1" />
                      ) : (
                        <ShieldAlert className="h-4 w-4 text-green-500 mr-1" />
                      )}
                      <span>{log.severity}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View details</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-between px-4 py-4">
          <div className="text-sm text-muted-foreground">
            Showing <strong>1</strong> to <strong>10</strong> of <strong>258</strong> logs
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Logs per page</p>
              <Select defaultValue="10">
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent side="top">
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <span className="sr-only">Go to previous page</span>
                <ChevronDown className="h-4 w-4 rotate-90" />
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <span className="sr-only">Go to next page</span>
                <ChevronDown className="h-4 w-4 -rotate-90" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </Layout>
  );
};

// Helper functions
const getActionBadgeVariant = (action: string) => {
  switch(action) {
    case 'Create': return 'default';
    case 'Update': return 'secondary';
    case 'Delete': return 'destructive';
    case 'Read': return 'outline';
    case 'Login': return 'outline';
    case 'Export': return 'outline';
    case 'Failed Login': return 'destructive';
    default: return 'outline';
  }
};

// Mock data
const mockAuditLogs = [
  {
    id: '1',
    timestamp: '2025-04-13 10:45:22',
    user: 'Dr. Jane Roberts',
    role: 'Physician',
    action: 'Read',
    resource: 'Patient Record',
    details: 'Accessed medical history for Sarah Johnson (PT-10092)',
    ipAddress: '192.168.1.45',
    severity: 'Info'
  },
  {
    id: '2',
    timestamp: '2025-04-13 10:32:15',
    user: 'Robert Johnson',
    role: 'Admin',
    action: 'Create',
    resource: 'User Account',
    details: 'Created new user account for Dr. Mark Williams',
    ipAddress: '192.168.1.50',
    severity: 'Info'
  },
  {
    id: '3',
    timestamp: '2025-04-13 09:58:47',
    user: 'Dr. Michael Brown',
    role: 'Physician',
    action: 'Update',
    resource: 'Treatment Plan',
    details: 'Updated chemotherapy dosage for Michael Smith (PT-10093)',
    ipAddress: '192.168.1.62',
    severity: 'Info'
  },
  {
    id: '4',
    timestamp: '2025-04-13 09:45:03',
    user: 'Carlos Rodriguez',
    role: 'Super Admin',
    action: 'Export',
    resource: 'Patient Data',
    details: 'Exported de-identified dataset for breast cancer study ONCO-2025-002',
    ipAddress: '192.168.1.22',
    severity: 'Warning'
  },
  {
    id: '5',
    timestamp: '2025-04-13 09:15:36',
    user: 'Unknown',
    role: 'N/A',
    action: 'Failed Login',
    resource: 'Authentication System',
    details: 'Failed login attempt for username "jsmith" (5th attempt)',
    ipAddress: '203.0.113.45',
    severity: 'Critical'
  },
  {
    id: '6',
    timestamp: '2025-04-13 08:42:19',
    user: 'Sarah Wong',
    role: 'Nurse',
    action: 'Create',
    resource: 'Clinical Note',
    details: 'Created progress note for Angela Thompson (PT-10099)',
    ipAddress: '192.168.1.75',
    severity: 'Info'
  },
  {
    id: '7',
    timestamp: '2025-04-12 17:55:02',
    user: 'System',
    role: 'Automated Process',
    action: 'Update',
    resource: 'Database Backup',
    details: 'Successfully completed daily database backup',
    ipAddress: '192.168.1.5',
    severity: 'Info'
  },
  {
    id: '8',
    timestamp: '2025-04-12 16:33:48',
    user: 'Emily Davis',
    role: 'Data Manager',
    action: 'Delete',
    resource: 'Lab Results',
    details: 'Deleted duplicate lab result records for patient ID PT-10101',
    ipAddress: '192.168.1.30',
    severity: 'Warning'
  },
  {
    id: '9',
    timestamp: '2025-04-12 15:27:11',
    user: 'Lisa Chen',
    role: 'Study Coordinator',
    action: 'Update',
    resource: 'Study Protocol',
    details: 'Modified eligibility criteria for study ONCO-2025-001',
    ipAddress: '192.168.1.88',
    severity: 'Warning'
  },
  {
    id: '10',
    timestamp: '2025-04-12 14:15:09',
    user: 'James Miller',
    role: 'Researcher',
    action: 'Read',
    resource: 'Genomic Data',
    details: 'Accessed biomarker dataset for breast cancer cohort',
    ipAddress: '192.168.1.120',
    severity: 'Info'
  }
];

export default AuditLogPage;
