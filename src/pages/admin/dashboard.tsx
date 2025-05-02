
import React from 'react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar } from '@/components/ui/avatar';
import { 
  BarChart2, 
  Building2, 
  Calendar, 
  ChevronRight, 
  Download, 
  FileText, 
  Filter, 
  MessageSquare, 
  MoreHorizontal, 
  RefreshCcw, 
  Search, 
  Settings, 
  Users, 
  CheckCircle,
  AlertCircle,
  Clock,
  XCircle,
  Activity,
  ArrowUpRight,
  Wallet
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';

// Chart component for the admin dashboard
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // Mock data for the dashboard
  const subscriptionStats = {
    total: 52,
    active: 48,
    pending: 3,
    suspended: 1,
    growth: 18.5,
    recurring: '$287,450'
  };

  const recentActivityData = [
    { id: 1, type: 'new_facility', facility: 'Memorial Hospital Group', date: '10 minutes ago', status: 'pending' },
    { id: 2, type: 'subscription_upgrade', facility: 'Pacific Research Institute', date: '2 hours ago', status: 'completed' },
    { id: 3, type: 'invoice_paid', facility: 'Northwest Medical Center', date: '5 hours ago', status: 'completed' },
    { id: 4, type: 'support_ticket', facility: 'Cambridge Clinical Research', date: '1 day ago', status: 'resolved' },
    { id: 5, type: 'module_activated', facility: 'Highland Healthcare System', date: '1 day ago', status: 'completed' }
  ];

  const pendingApprovals = [
    { 
      id: 1, 
      name: 'Memorial Hospital Group', 
      type: 'Hospital',
      modules: ['Clinical', 'Research'],
      plan: 'Enterprise',
      requestDate: 'May 1, 2025',
      contact: 'dr.smith@memorialhospital.org'
    },
    { 
      id: 2, 
      name: 'Westside Health Research', 
      type: 'Research Institute',
      modules: ['Research'],
      plan: 'Professional',
      requestDate: 'Apr 28, 2025',
      contact: 'j.wilson@westsidehealth.org'
    },
    { 
      id: 3, 
      name: 'Lakeside Clinic Network', 
      type: 'Clinic',
      modules: ['Clinical'],
      plan: 'Starter',
      requestDate: 'Apr 25, 2025',
      contact: 'admin@lakesideclinics.com'
    }
  ];

  const subscriptionTrendData = [
    { month: 'Jan', total: 34, clinical: 20, research: 10, both: 4 },
    { month: 'Feb', total: 37, clinical: 21, research: 12, both: 4 },
    { month: 'Mar', total: 39, clinical: 22, research: 12, both: 5 },
    { month: 'Apr', total: 43, clinical: 24, research: 13, both: 6 },
    { month: 'May', total: 48, clinical: 26, research: 14, both: 8 },
    { month: 'Jun', total: 52, clinical: 28, research: 15, both: 9 }
  ];

  const revenueData = [
    { month: 'Jan', recurring: 240000, oneTime: 18000 },
    { month: 'Feb', recurring: 245000, oneTime: 12000 },
    { month: 'Mar', recurring: 258000, oneTime: 16000 },
    { month: 'Apr', recurring: 265000, oneTime: 9000 },
    { month: 'May', recurring: 278000, oneTime: 22000 },
    { month: 'Jun', recurring: 287450, oneTime: 15000 }
  ];

  const moduleDistributionData = [
    { name: 'Clinical Only', value: 28 },
    { name: 'Research Only', value: 15 },
    { name: 'Both Modules', value: 9 }
  ];
  
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

  const renderActivityIcon = (type: string) => {
    switch(type) {
      case 'new_facility':
        return <Building2 className="h-5 w-5 text-blue-500" />;
      case 'subscription_upgrade':
        return <ArrowUpRight className="h-5 w-5 text-green-500" />;
      case 'invoice_paid':
        return <Wallet className="h-5 w-5 text-green-500" />;
      case 'support_ticket':
        return <MessageSquare className="h-5 w-5 text-orange-500" />;
      case 'module_activated':
        return <Settings className="h-5 w-5 text-purple-500" />;
      default:
        return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  const renderActivityStatus = (status: string) => {
    switch(status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>;
      case 'resolved':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleApprove = (id: number) => {
    console.log(`Approving facility with ID: ${id}`);
    // Would make an API call here
  };

  const handleReject = (id: number) => {
    console.log(`Rejecting facility with ID: ${id}`);
    // Would make an API call here
  };

  return (
    <Layout title="Admin Dashboard">
      <PageHeader 
        title="Super Admin Dashboard" 
        description="Complete oversight of platform operations and subscribers"
        breadcrumbs={[
          { label: 'Admin', link: '/admin' },
          { label: 'Dashboard' }
        ]}
        action={{
          label: 'System Report',
          icon: Download,
          onClick: () => console.log('Generate system report clicked')
        }}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Facilities</p>
                <p className="text-3xl font-bold">{subscriptionStats.total}</p>
                <p className="text-xs text-green-600 font-medium mt-1">
                  +{subscriptionStats.growth}% from last month
                </p>
              </div>
              <div className="bg-primary/10 p-2 rounded-md">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Subscriptions</p>
                <p className="text-3xl font-bold">{subscriptionStats.active}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {subscriptionStats.pending} pending, {subscriptionStats.suspended} suspended
                </p>
              </div>
              <div className="bg-green-100 p-2 rounded-md">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Recurring Revenue</p>
                <p className="text-3xl font-bold">{subscriptionStats.recurring}</p>
                <p className="text-xs text-green-600 font-medium mt-1">
                  +3.4% from last month
                </p>
              </div>
              <div className="bg-blue-100 p-2 rounded-md">
                <Wallet className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
                <p className="text-3xl font-bold">{pendingApprovals.length}</p>
                <p className="text-xs text-amber-600 font-medium mt-1">
                  Requires your attention
                </p>
              </div>
              <div className="bg-amber-100 p-2 rounded-md">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-0.5">
              <CardTitle>Subscription Growth</CardTitle>
              <CardDescription>Monthly subscription trends</CardDescription>
            </div>
            <Select defaultValue="6month">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="6month">Last 6 months</SelectItem>
                <SelectItem value="1year">Last year</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={subscriptionTrendData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    name="Total Subscriptions"
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="clinical" 
                    name="Clinical Module"
                    stroke="#82ca9d" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="research" 
                    name="Research Module"
                    stroke="#ffc658" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="both" 
                    name="Both Modules"
                    stroke="#ff8042" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-0.5">
              <CardTitle>Module Distribution</CardTitle>
              <CardDescription>By subscription type</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={moduleDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {moduleDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [value, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mt-4">
              {moduleDistributionData.map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div 
                    className="w-3 h-3 rounded-full mb-1"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <div className="text-xs font-medium whitespace-nowrap">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.value} facilities</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-0.5">
              <CardTitle>Monthly Revenue</CardTitle>
              <CardDescription>Recurring and one-time revenue</CardDescription>
            </div>
            <Select defaultValue="6months">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">Last 3 months</SelectItem>
                <SelectItem value="6months">Last 6 months</SelectItem>
                <SelectItem value="1year">Last year</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, undefined]} />
                  <Legend />
                  <Bar 
                    dataKey="recurring" 
                    name="Recurring Revenue" 
                    fill="#8884d8" 
                  />
                  <Bar 
                    dataKey="oneTime" 
                    name="One-time Revenue" 
                    fill="#82ca9d" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-0.5">
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Platform-wide activities</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivityData.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="bg-muted p-2 rounded-md">
                    {renderActivityIcon(activity.type)}
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">
                        {activity.facility}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {activity.date}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-muted-foreground">
                        {activity.type === 'new_facility' ? 'New facility registration' :
                         activity.type === 'subscription_upgrade' ? 'Upgraded subscription' :
                         activity.type === 'invoice_paid' ? 'Invoice payment received' :
                         activity.type === 'support_ticket' ? 'Opened support ticket' :
                         activity.type === 'module_activated' ? 'Activated new module' : 
                         'Activity recorded'}
                      </p>
                      {renderActivityStatus(activity.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="ghost" className="w-full mt-4">
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Facility Approvals</CardTitle>
            <CardDescription>
              New facility registrations pending your approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Facility Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Requested Modules</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Requested</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingApprovals.map((approval) => (
                  <TableRow key={approval.id}>
                    <TableCell className="font-medium">
                      {approval.name}
                    </TableCell>
                    <TableCell>
                      {approval.type}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {approval.modules.map((module, i) => (
                          <Badge key={i} variant="secondary">
                            {module}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {approval.plan}
                    </TableCell>
                    <TableCell>
                      {approval.requestDate}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{approval.contact}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleApprove(approval.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleReject(approval.id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="flex justify-between items-center mt-4">
              <Button 
                variant="link" 
                className="text-sm"
                onClick={() => navigate('/admin/onboarding')}
              >
                View All Requests
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/admin/onboarding/invite')}
              >
                Invite New Facility
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>
              Current platform operational metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2" />
                    <span className="font-medium">API Services</span>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Operational</Badge>
                </div>
                <Progress value={97} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>97% uptime</span>
                  <span>8ms response time</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2" />
                    <span className="font-medium">Database</span>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Operational</Badge>
                </div>
                <Progress value={99.9} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>99.9% uptime</span>
                  <span>12ms query time</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-amber-500 mr-2" />
                    <span className="font-medium">Storage Services</span>
                  </div>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200">Degraded</Badge>
                </div>
                <Progress value={82} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>82% performance</span>
                  <span>Under maintenance</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2" />
                    <span className="font-medium">Authentication</span>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Operational</Badge>
                </div>
                <Progress value={100} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>100% uptime</span>
                  <span>154ms auth time</span>
                </div>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Overall System Health</p>
                <p className="text-xs text-muted-foreground">Last checked 2 minutes ago</p>
              </div>
              <Button variant="outline" size="sm">
                <RefreshCcw className="h-4 w-4 mr-1" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => navigate('/admin/users')}
              >
                <Users className="h-5 w-5 mb-1" />
                <span>Manage Users</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => navigate('/admin/onboarding/invite')}
              >
                <Building2 className="h-5 w-5 mb-1" />
                <span>Add Facility</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => navigate('/settings/billing')}
              >
                <FileText className="h-5 w-5 mb-1" />
                <span>Billing Plans</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => navigate('/analytics')}
              >
                <BarChart2 className="h-5 w-5 mb-1" />
                <span>Analytics</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => navigate('/calendar')}
              >
                <Calendar className="h-5 w-5 mb-1" />
                <span>Calendar</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => navigate('/settings/system')}
              >
                <Settings className="h-5 w-5 mb-1" />
                <span>System Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
