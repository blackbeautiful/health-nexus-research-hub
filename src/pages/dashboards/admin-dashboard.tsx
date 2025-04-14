
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import PageTitle from '@/components/common/PageTitle';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  Shield,
  FileText,
  Server,
  AlertTriangle,
  BarChart3,
  Settings,
  HardDrive,
  Clock,
  Database,
  Activity,
  Wrench,
  Search,
  Download,
  Plus
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { toast } = useToast();
  
  const handleAction = () => {
    toast({
      title: "Action initiated",
      description: "This functionality will be implemented in the next update."
    });
  };
  
  return (
    <MainLayout>
      <PageTitle 
        title="Admin Dashboard" 
        description="System management and compliance overview"
        actions={
          <>
            <Button variant="outline" onClick={handleAction}>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
            <Button variant="outline" onClick={handleAction}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button onClick={handleAction}>
              <Plus className="mr-2 h-4 w-4" />
              New User
            </Button>
          </>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Active Users" 
          value="62" 
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 4.2, isPositive: true }}
        />
        <StatCard 
          title="Compliance Score" 
          value="98%" 
          icon={<Shield className="h-5 w-5" />}
          trend={{ value: 2.1, isPositive: true }}
        />
        <StatCard 
          title="System Uptime" 
          value="99.9%" 
          icon={<Server className="h-5 w-5" />}
          trend={{ value: 0.1, isPositive: true }}
        />
        <StatCard 
          title="Open Tickets" 
          value="7" 
          icon={<Wrench className="h-5 w-5" />}
          trend={{ value: 2, isPositive: false }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Key performance and health metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <div>
                    <h3 className="font-medium">Server Status</h3>
                    <p className="text-sm text-muted-foreground">All systems operational</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Healthy</Badge>
                </div>
                <div className="space-y-2">
                  {[
                    { name: "API Services", status: "Operational", uptime: 100 },
                    { name: "Database Cluster", status: "Operational", uptime: 99.98 },
                    { name: "File Storage", status: "Operational", uptime: 100 },
                    { name: "Authentication Services", status: "Operational", uptime: 99.99 }
                  ].map((service, i) => (
                    <div key={i} className="flex justify-between items-center p-2 bg-muted/40 rounded-md">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        <span>{service.name}</span>
                      </div>
                      <div className="text-sm">{service.uptime}% uptime</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">System Resources</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">CPU Usage</span>
                      <span className="text-sm">42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Memory Usage</span>
                      <span className="text-sm">67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Storage Usage</span>
                      <span className="text-sm">38%</span>
                    </div>
                    <Progress value={38} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/settings">
                <Settings className="mr-2 h-4 w-4" />
                System Settings
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Security Alerts</CardTitle>
            <CardDescription>Recent security events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border-l-4 border-red-500 rounded-md bg-red-50">
                <div className="flex gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500 shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm">Multiple Failed Login Attempts</h4>
                    <p className="text-xs text-muted-foreground">User: john.smith - 3 hours ago</p>
                  </div>
                </div>
                <Button size="sm" className="mt-2 w-full">Investigate</Button>
              </div>
              
              <div className="p-3 border-l-4 border-amber-500 rounded-md bg-amber-50">
                <div className="flex gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm">Unusual Data Access Pattern</h4>
                    <p className="text-xs text-muted-foreground">User: rebecca.martinez - Yesterday</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="mt-2 w-full">Review</Button>
              </div>
              
              <div className="p-3 border-l-4 border-blue-500 rounded-md bg-blue-50">
                <div className="flex gap-2">
                  <Shield className="h-5 w-5 text-blue-500 shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm">Security Patch Available</h4>
                    <p className="text-xs text-muted-foreground">Authentication module - 2 days ago</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="mt-2 w-full">Apply Update</Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Shield className="mr-2 h-4 w-4" />
              Security Center
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Tabs defaultValue="users" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="audits">Audit Logs</TabsTrigger>
          <TabsTrigger value="backups">Data Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Recent User Activity</CardTitle>
                <CardDescription>Last 5 user management actions</CardDescription>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to="/users">View All Users</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { action: "User Created", details: "Sarah Johnson (Patient)", timestamp: "Today, 10:30 AM", admin: "Rebecca Martinez" },
                  { action: "Role Modified", details: "James Wilson: Added 'Research Admin'", timestamp: "Today, 9:15 AM", admin: "System Admin" },
                  { action: "Password Reset", details: "Michael Chen (Researcher)", timestamp: "Yesterday", admin: "System Admin" },
                  { action: "User Deactivated", details: "Emily Rodriguez (Staff)", timestamp: "Apr 12, 2025", admin: "James Wilson" },
                  { action: "Failed Login Limit", details: "Thomas Wright (Researcher)", timestamp: "Apr 11, 2025", admin: "System" }
                ].map((activity, i) => (
                  <div key={i} className="flex justify-between p-3 border rounded-md">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          activity.action.includes("Created") ? "default" :
                          activity.action.includes("Modified") ? "outline" :
                          activity.action.includes("Reset") ? "secondary" :
                          "destructive"
                        }>
                          {activity.action}
                        </Badge>
                        <span className="text-sm">{activity.details}</span>
                      </div>
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{activity.timestamp}</span>
                        <span className="mx-1">•</span>
                        <span>by {activity.admin}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="compliance">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Compliance Status</CardTitle>
                <CardDescription>Regulatory and security compliance</CardDescription>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to="/compliance">View Compliance Dashboard</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">Compliance by Framework</h3>
                  <div className="space-y-3">
                    {[
                      { name: "HIPAA", compliance: 100, status: "Compliant" },
                      { name: "GDPR", compliance: 98, status: "Compliant" },
                      { name: "21 CFR Part 11", compliance: 94, status: "Action Needed" },
                      { name: "SOC 2", compliance: 100, status: "Compliant" }
                    ].map((framework, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm">{framework.name}</span>
                          <Badge variant={framework.compliance === 100 ? "outline" : "secondary"}>
                            {framework.status}
                          </Badge>
                        </div>
                        <Progress value={framework.compliance} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Action Items</h3>
                  <div className="space-y-2">
                    {[
                      { title: "Update e-signature validation", framework: "21 CFR Part 11", due: "Apr 20, 2025" },
                      { title: "Documentation refresh for audit log retention", framework: "21 CFR Part 11", due: "Apr 25, 2025" }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between p-2 border rounded-md">
                        <div>
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.framework}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span className="text-xs">{item.due}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="audits">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Recent Audit Log Events</CardTitle>
                <CardDescription>System and data access events</CardDescription>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to="/audit-logs">View All Logs</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { event: "Patient Data Accessed", user: "Rebecca Martinez", resource: "Patient ID: CRC-042", timestamp: "Today, 11:23 AM" },
                  { event: "Study Protocol Updated", user: "James Wilson", resource: "BEACON-CRC Protocol v2.1", timestamp: "Today, 9:45 AM" },
                  { event: "User Authentication", user: "Jessica Lee", resource: "System Login", timestamp: "Today, 8:30 AM" },
                  { event: "Database Backup", user: "System", resource: "Full Database Snapshot", timestamp: "Today, 2:00 AM" },
                  { event: "Document Downloaded", user: "Michael Chen", resource: "ICF Template - LUNG-PRECISION", timestamp: "Yesterday, 4:15 PM" }
                ].map((log, i) => (
                  <div key={i} className="flex justify-between p-2 text-sm bg-muted/40 rounded-md">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                        <span>{log.event}</span>
                      </div>
                      <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2 mt-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{log.user}</span>
                        </div>
                        <span className="hidden xs:inline">•</span>
                        <div className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          <span>{log.resource}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground text-right whitespace-nowrap ml-2">
                      {log.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Search Audit Logs</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="backups">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>Backups and data integrity</CardDescription>
              </div>
              <Button variant="outline" size="sm">Configure Backups</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">Backup Status</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="border rounded-md p-3 text-center">
                      <HardDrive className="h-8 w-8 mx-auto text-muted-foreground mb-1" />
                      <p className="font-medium">Daily Backup</p>
                      <p className="text-xs text-muted-foreground">Last: Today, 2:00 AM</p>
                      <Badge variant="outline" className="mt-2 bg-green-50 text-green-700">Success</Badge>
                    </div>
                    <div className="border rounded-md p-3 text-center">
                      <Database className="h-8 w-8 mx-auto text-muted-foreground mb-1" />
                      <p className="font-medium">Weekly Backup</p>
                      <p className="text-xs text-muted-foreground">Last: Apr 12, 2025</p>
                      <Badge variant="outline" className="mt-2 bg-green-50 text-green-700">Success</Badge>
                    </div>
                    <div className="border rounded-md p-3 text-center">
                      <Server className="h-8 w-8 mx-auto text-muted-foreground mb-1" />
                      <p className="font-medium">Monthly Backup</p>
                      <p className="text-xs text-muted-foreground">Last: Apr 1, 2025</p>
                      <Badge variant="outline" className="mt-2 bg-green-50 text-green-700">Success</Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Storage Utilization</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Patient Data</span>
                        <span className="text-sm">246.5 GB</span>
                      </div>
                      <Progress value={48} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Document Storage</span>
                        <span className="text-sm">138.3 GB</span>
                      </div>
                      <Progress value={27} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Backup Archives</span>
                        <span className="text-sm">512.8 GB</span>
                      </div>
                      <Progress value={42} className="h-2" />
                    </div>
                  </div>
                  <div className="mt-3 text-right text-sm">
                    <span className="text-muted-foreground">Total: 897.6 GB / 2.0 TB</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex flex-col xs:flex-row gap-2 w-full">
                <Button variant="outline" className="flex-1">Restore Data</Button>
                <Button variant="outline" className="flex-1">Download Backup</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default AdminDashboard;
