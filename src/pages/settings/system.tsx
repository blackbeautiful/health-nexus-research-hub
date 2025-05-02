
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DatabaseZap, Shield, Server, Globe, Check, Save, Trash2, RefreshCcw } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const SystemSettingsPage: React.FC = () => {
  const integrations = [
    {
      id: 'int-1',
      name: 'Electronic Health Record (EHR)',
      status: 'connected',
      lastSync: '2025-04-30 14:28',
      type: 'Bidirectional'
    },
    {
      id: 'int-2',
      name: 'Laboratory Information System (LIS)',
      status: 'connected',
      lastSync: '2025-04-30 12:15',
      type: 'Inbound'
    },
    {
      id: 'int-3',
      name: 'Clinical Trial Management System',
      status: 'connected',
      lastSync: '2025-04-29 16:42',
      type: 'Bidirectional'
    },
    {
      id: 'int-4',
      name: 'Drug Inventory Management',
      status: 'disconnected',
      lastSync: '2025-04-28 09:30',
      type: 'Outbound'
    },
    {
      id: 'int-5',
      name: 'Data Warehouse',
      status: 'connected',
      lastSync: '2025-04-30 02:00',
      type: 'Outbound'
    }
  ];
  
  const securitySettings = {
    passwordPolicy: {
      minLength: 12,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      expirationDays: 90,
      preventReuse: 10
    },
    loginPolicy: {
      maxAttempts: 5,
      lockoutDuration: 30,
      sessionTimeout: 30,
      requireMFA: true,
      ipRestriction: false,
      allowConcurrentSessions: false
    },
    dataProtection: {
      encryptData: true,
      encryptBackups: true,
      dataRetention: 7,
      anonymizeExports: false
    }
  };
  
  const systemInfo = {
    version: '2.8.3',
    lastUpdated: '2025-04-15',
    environment: 'Production',
    server: 'aws-us-east-1',
    database: 'PostgreSQL 16.1',
    storage: '1.82 TB / 4.00 TB',
    activeUsers: 142,
    lastBackup: '2025-05-01 02:30 AM'
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Connected</Badge>;
      case 'disconnected':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">Disconnected</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  return (
    <MainLayout>
      <PageHeader 
        title="System Configuration" 
        description="Manage system settings, integrations, and security"
        breadcrumbs={[
          { label: 'Settings', link: '/settings' },
          { label: 'System Configuration' }
        ]}
        action={{
          label: "Save Changes",
          icon: Save,
          onClick: () => console.log("Save system settings")
        }}
      />
      
      <Tabs defaultValue="general" className="mb-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="backups">Backups & Maintenance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure basic system settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium">System Name</label>
                  <Input defaultValue="HealthNexus Research Hub" />
                  <p className="text-xs text-muted-foreground">Displayed in the application header and emails</p>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-medium">Institution Name</label>
                  <Input defaultValue="Memorial Medical Research Center" />
                  <p className="text-xs text-muted-foreground">Your organization's name used in reports and documentation</p>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-medium">Default Timezone</label>
                  <Select defaultValue="America/New_York">
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Default timezone for dates and times</p>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-medium">Date Format</label>
                  <Select defaultValue="MM/DD/YYYY">
                    <SelectTrigger>
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Format for displaying dates throughout the system</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Maintenance Mode</h3>
                      <p className="text-sm text-muted-foreground">Temporarily disable access for non-admin users</p>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Analytics & Tracking</h3>
                      <p className="text-sm text-muted-foreground">Collect anonymous usage data for system improvement</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">
                  <Check className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
                <CardDescription>Current system details and status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Version</p>
                  <p className="font-medium">{systemInfo.version}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Last Updated</p>
                  <p className="font-medium">{systemInfo.lastUpdated}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Environment</p>
                  <p className="font-medium">{systemInfo.environment}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Server</p>
                  <p className="font-medium">{systemInfo.server}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Database</p>
                  <p className="font-medium">{systemInfo.database}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Storage</p>
                  <p className="font-medium">{systemInfo.storage}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Active Users</p>
                  <p className="font-medium">{systemInfo.activeUsers}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Last Backup</p>
                  <p className="font-medium">{systemInfo.lastBackup}</p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button variant="outline" className="w-full">
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Check for Updates
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="integrations" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>System Integrations</CardTitle>
                  <CardDescription>Configure connections with external systems</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Integration
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Integration</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Sync</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {integrations.map((integration) => (
                    <TableRow key={integration.id}>
                      <TableCell className="font-medium">{integration.name}</TableCell>
                      <TableCell>{integration.type}</TableCell>
                      <TableCell>{getStatusBadge(integration.status)}</TableCell>
                      <TableCell>{integration.lastSync}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Configure</Button>
                        <Button variant="ghost" size="sm">
                          <RefreshCcw className="h-4 w-4" />
                          <span className="sr-only">Sync</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardHeader className="border-t pt-6">
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>Manage API settings and access tokens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Enable API Access</h3>
                    <p className="text-sm text-muted-foreground">Allow external systems to connect via API</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-medium">API Rate Limit</label>
                <Select defaultValue="1000">
                  <SelectTrigger>
                    <SelectValue placeholder="Select rate limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="500">500 requests/hour</SelectItem>
                    <SelectItem value="1000">1000 requests/hour</SelectItem>
                    <SelectItem value="5000">5000 requests/hour</SelectItem>
                    <SelectItem value="unlimited">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-4">
                <Button variant="outline">
                  <Shield className="mr-2 h-4 w-4" />
                  Manage API Keys
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure system security and access controls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Password Policy</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Minimum Length</label>
                        <Select defaultValue={securitySettings.passwordPolicy.minLength.toString()}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select length" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="8">8 characters</SelectItem>
                            <SelectItem value="10">10 characters</SelectItem>
                            <SelectItem value="12">12 characters</SelectItem>
                            <SelectItem value="16">16 characters</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Password Expiration</label>
                        <Select defaultValue={securitySettings.passwordPolicy.expirationDays.toString()}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select expiration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 days</SelectItem>
                            <SelectItem value="60">60 days</SelectItem>
                            <SelectItem value="90">90 days</SelectItem>
                            <SelectItem value="180">180 days</SelectItem>
                            <SelectItem value="365">365 days</SelectItem>
                            <SelectItem value="0">Never</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2">
                          <Switch defaultChecked={securitySettings.passwordPolicy.requireUppercase} />
                          <label className="text-sm">Require uppercase</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch defaultChecked={securitySettings.passwordPolicy.requireLowercase} />
                          <label className="text-sm">Require lowercase</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch defaultChecked={securitySettings.passwordPolicy.requireNumbers} />
                          <label className="text-sm">Require numbers</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch defaultChecked={securitySettings.passwordPolicy.requireSpecialChars} />
                          <label className="text-sm">Require special characters</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Login Security</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Failed Login Attempts</label>
                        <Select defaultValue={securitySettings.loginPolicy.maxAttempts.toString()}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select attempts" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3 attempts</SelectItem>
                            <SelectItem value="5">5 attempts</SelectItem>
                            <SelectItem value="10">10 attempts</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Session Timeout</label>
                        <Select defaultValue={securitySettings.loginPolicy.sessionTimeout.toString()}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeout" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="120">2 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2">
                          <Switch defaultChecked={securitySettings.loginPolicy.requireMFA} />
                          <label className="text-sm">Require two-factor authentication</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch defaultChecked={securitySettings.loginPolicy.ipRestriction} />
                          <label className="text-sm">IP address restrictions</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Data Protection</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Data Retention Period</label>
                        <Select defaultValue={securitySettings.dataProtection.dataRetention.toString()}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 year</SelectItem>
                            <SelectItem value="3">3 years</SelectItem>
                            <SelectItem value="5">5 years</SelectItem>
                            <SelectItem value="7">7 years</SelectItem>
                            <SelectItem value="10">10 years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2">
                          <Switch defaultChecked={securitySettings.dataProtection.encryptData} />
                          <label className="text-sm">Encrypt data at rest</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch defaultChecked={securitySettings.dataProtection.encryptBackups} />
                          <label className="text-sm">Encrypt backups</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch defaultChecked={securitySettings.dataProtection.anonymizeExports} />
                          <label className="text-sm">Anonymize data exports</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                <Check className="mr-2 h-4 w-4" />
                Save Security Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="backups" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Backups & Maintenance</CardTitle>
                  <CardDescription>Configure data backup and system maintenance</CardDescription>
                </div>
                <Button>
                  Create Backup Now
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Automated Backups</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Backup Frequency</label>
                        <Select defaultValue="daily">
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Every hour</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Retention Period</label>
                        <Select defaultValue="30">
                          <SelectTrigger>
                            <SelectValue placeholder="Select period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7">7 days</SelectItem>
                            <SelectItem value="30">30 days</SelectItem>
                            <SelectItem value="90">90 days</SelectItem>
                            <SelectItem value="365">365 days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Enable Automated Backups</h3>
                          <p className="text-sm text-muted-foreground">Schedule regular backups of system data</p>
                        </div>
                        <Switch defaultChecked={true} />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">System Maintenance</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Maintenance Window</label>
                        <Select defaultValue="sunday-02">
                          <SelectTrigger>
                            <SelectValue placeholder="Select window" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sunday-02">Sunday, 2:00 AM - 4:00 AM</SelectItem>
                            <SelectItem value="wednesday-22">Wednesday, 10:00 PM - 12:00 AM</SelectItem>
                            <SelectItem value="saturday-20">Saturday, 8:00 PM - 10:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Notify Users Before Maintenance</h3>
                          <p className="text-sm text-muted-foreground">Send email notifications before scheduled maintenance</p>
                        </div>
                        <Switch defaultChecked={true} />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Data Management</h3>
                  <div className="flex gap-4">
                    <Button variant="outline">
                      <RefreshCcw className="mr-2 h-4 w-4" />
                      Optimize Database
                    </Button>
                    <Button variant="outline" className="text-red-600 hover:bg-red-50 hover:text-red-700">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear Cache
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Restore from Backup</Button>
              <Button>Save Backup Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default SystemSettingsPage;
