
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ArrowRight, Check, Clock, Database, FileSpreadsheet, Mail, Shield, User, X, File, Settings, Calendar, Bell, FileText } from 'lucide-react';

const SystemSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [autoBackup, setAutoBackup] = useState(true);
  const [dataRetention, setDataRetention] = useState(90);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [ldapEnabled, setLdapEnabled] = useState(false);
  const [apiKeys, setApiKeys] = useState([
    { name: 'Production API Key', key: 'sk_prod_2023_xxxxxxxxxxxxxxxxxxxx', active: true, created: '2023-09-15' },
    { name: 'Development API Key', key: 'sk_dev_2023_xxxxxxxxxxxxxxxxxxxx', active: true, created: '2023-10-02' },
    { name: 'Legacy API Key', key: 'sk_legacy_2022_xxxxxxxxxxxxxxxxxxxx', active: false, created: '2022-11-30' }
  ]);

  const handleDeleteKey = (index: number) => {
    setApiKeys(apiKeys.filter((_, i) => i !== index));
  };

  const handleToggleKeyStatus = (index: number) => {
    const newKeys = [...apiKeys];
    newKeys[index].active = !newKeys[index].active;
    setApiKeys(newKeys);
  };

  const addNewApiKey = () => {
    const newKey = {
      name: 'New API Key',
      key: `sk_dev_${new Date().getFullYear()}_${'x'.repeat(20)}`,
      active: true,
      created: new Date().toISOString().split('T')[0]
    };
    setApiKeys([...apiKeys, newKey]);
  };

  return (
    <Layout>
      <PageHeader 
        title="System Settings" 
        description="Configure system-wide settings and technical configurations"
        breadcrumbs={[
          { label: 'Settings', link: '/settings' },
          { label: 'System' }
        ]}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security & Compliance</TabsTrigger>
          <TabsTrigger value="database">Database & Backup</TabsTrigger>
          <TabsTrigger value="api">API & Integrations</TabsTrigger>
        </TabsList>
        
        {/* General Settings Tab */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Application Settings</CardTitle>
              <CardDescription>Configure general application behavior and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="app-name">Application Name</Label>
                  <Input id="app-name" defaultValue="HealthNexus Research Hub" />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="default-language">Default Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English (US)</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese (Simplified)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="timezone">Default Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                      <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                      <SelectItem value="cst">CST (Central Standard Time)</SelectItem>
                      <SelectItem value="mst">MST (Mountain Standard Time)</SelectItem>
                      <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select defaultValue="mm-dd-yyyy">
                    <SelectTrigger>
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY/MM/DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />
              
              <div className="space-y-3">
                <Label>System Notifications</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base" htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive important system alerts via email
                      </p>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end space-x-2">
                <Button variant="outline">Reset to Default</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security & Compliance Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security protocols and compliance features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Authentication Methods</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="shadow-none border">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h4 className="font-medium text-base flex items-center">
                            <User className="mr-2 h-4 w-4" /> Standard Authentication
                            <Badge className="ml-2" variant="outline">Default</Badge>
                          </h4>
                          <p className="text-sm text-muted-foreground">Username/password-based authentication</p>
                        </div>
                        <Switch defaultChecked={true} disabled />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-none border">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h4 className="font-medium text-base flex items-center">
                            <Shield className="mr-2 h-4 w-4" /> Two-Factor Authentication
                          </h4>
                          <p className="text-sm text-muted-foreground">Require 2FA for all users</p>
                        </div>
                        <Switch defaultChecked={true} />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base" htmlFor="ldap">LDAP/Active Directory Integration</Label>
                    <p className="text-sm text-muted-foreground">
                      Connect to your organization's directory service
                    </p>
                  </div>
                  <Switch 
                    id="ldap" 
                    checked={ldapEnabled}
                    onCheckedChange={setLdapEnabled}
                  />
                </div>
                
                {ldapEnabled && (
                  <div className="pt-4 space-y-3 rounded-md bg-muted/50 p-4">
                    <div className="space-y-2">
                      <Label htmlFor="ldap-server">LDAP Server URL</Label>
                      <Input id="ldap-server" placeholder="ldap://example.com:389" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bind-dn">Bind DN</Label>
                        <Input id="bind-dn" placeholder="cn=admin,dc=example,dc=com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bind-password">Bind Password</Label>
                        <Input id="bind-password" type="password" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="search-base">Search Base</Label>
                      <Input id="search-base" placeholder="ou=users,dc=example,dc=com" />
                    </div>
                    <div className="pt-2">
                      <Button variant="secondary" size="sm">Test Connection</Button>
                    </div>
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <Label>Compliance Settings</Label>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">HIPAA Compliance Mode</h4>
                      <p className="text-sm text-muted-foreground">
                        Enable additional security measures for HIPAA compliance
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">GDPR Compliance Mode</h4>
                      <p className="text-sm text-muted-foreground">
                        Enable features for GDPR compliance
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">21 CFR Part 11 Compliance</h4>
                      <p className="text-sm text-muted-foreground">
                        FDA electronic records compliance for research
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end space-x-2">
                <Button variant="outline">Reset to Default</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Database & Backup Tab */}
        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Database Configuration</CardTitle>
              <CardDescription>Manage database connections and backup settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Connection Settings</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="db-host">Database Host</Label>
                    <Input id="db-host" defaultValue="db-production.internal" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="db-name">Database Name</Label>
                    <Input id="db-name" defaultValue="healthnexus_prod" readOnly />
                  </div>
                </div>
                <div className="pt-2">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    <Check className="mr-1 h-3 w-3" /> Connection Active
                  </Badge>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <Label>Backup Configuration</Label>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">Automatic Backups</h4>
                      <p className="text-sm text-muted-foreground">
                        System will create regular backups based on schedule
                      </p>
                    </div>
                    <Switch 
                      checked={autoBackup}
                      onCheckedChange={setAutoBackup}
                    />
                  </div>
                  
                  {autoBackup && (
                    <div className="space-y-4 rounded-md bg-muted/50 p-4">
                      <div className="space-y-2">
                        <Label htmlFor="backup-frequency">Backup Frequency</Label>
                        <Select defaultValue="daily">
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="backup-time">Backup Time (for daily backups)</Label>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <Select defaultValue="02:00">
                            <SelectTrigger>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="00:00">12:00 AM</SelectItem>
                              <SelectItem value="01:00">1:00 AM</SelectItem>
                              <SelectItem value="02:00">2:00 AM</SelectItem>
                              <SelectItem value="03:00">3:00 AM</SelectItem>
                              <SelectItem value="04:00">4:00 AM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="backup-retention">Retention Period (days)</Label>
                        <div className="space-y-3">
                          <Slider
                            defaultValue={[dataRetention]}
                            max={365}
                            min={7}
                            step={1}
                            onValueChange={(val) => setDataRetention(val[0])}
                          />
                          <div className="flex justify-between">
                            <span className="text-sm">{dataRetention} days</span>
                            <span className="text-sm text-muted-foreground">{Math.floor(dataRetention/30)} months</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Manual Backup</Label>
                  <Button size="sm">
                    <Database className="mr-2 h-4 w-4" /> Create Backup Now
                  </Button>
                </div>
                
                <div className="border rounded-md">
                  <div className="text-sm">
                    <div className="bg-muted py-2 px-4 font-medium">Recent Backups</div>
                    <div className="divide-y">
                      <div className="flex justify-between items-center py-2 px-4">
                        <div className="flex items-center">
                          <FileSpreadsheet className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>Full Backup - May 1, 2025 02:00 AM</span>
                        </div>
                        <Button variant="ghost" size="sm">Download</Button>
                      </div>
                      <div className="flex justify-between items-center py-2 px-4">
                        <div className="flex items-center">
                          <FileSpreadsheet className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>Full Backup - Apr 30, 2025 02:00 AM</span>
                        </div>
                        <Button variant="ghost" size="sm">Download</Button>
                      </div>
                      <div className="flex justify-between items-center py-2 px-4">
                        <div className="flex items-center">
                          <FileSpreadsheet className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>Full Backup - Apr 29, 2025 02:00 AM</span>
                        </div>
                        <Button variant="ghost" size="sm">Download</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end space-x-2">
                <Button variant="outline">Reset to Default</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* API & Integrations Tab */}
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>Manage API keys and third-party integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>API Keys</Label>
                  <Button size="sm" onClick={addNewApiKey}>
                    <File className="mr-2 h-4 w-4" /> Generate New API Key
                  </Button>
                </div>
                
                <div className="border rounded-md">
                  <div className="text-sm">
                    <div className="bg-muted py-2 px-4 grid grid-cols-12 font-medium">
                      <div className="col-span-3">Name</div>
                      <div className="col-span-5">API Key</div>
                      <div className="col-span-2">Created</div>
                      <div className="col-span-2 text-right">Actions</div>
                    </div>
                    <div className="divide-y">
                      {apiKeys.map((apiKey, index) => (
                        <div key={index} className="grid grid-cols-12 py-2 px-4 items-center">
                          <div className="col-span-3 font-medium">{apiKey.name}</div>
                          <div className="col-span-5 font-mono text-xs bg-muted rounded px-2 py-1">{apiKey.key}</div>
                          <div className="col-span-2 text-muted-foreground text-sm">{apiKey.created}</div>
                          <div className="col-span-2 flex justify-end space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleKeyStatus(index)}
                            >
                              {apiKey.active ? (
                                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Active</Badge>
                              ) : (
                                <Badge variant="outline" className="bg-gray-50 text-gray-500 hover:bg-gray-50 border-gray-200">Inactive</Badge>
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteKey(index)}
                            >
                              <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <Label>Third-Party Integrations</Label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="shadow-none border">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h4 className="font-medium text-base flex items-center">
                            <Mail className="mr-2 h-4 w-4" /> Email Service (SMTP)
                          </h4>
                          <p className="text-sm text-muted-foreground">Configure email delivery service</p>
                        </div>
                        <Button size="sm" variant="outline">Configure</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-none border">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h4 className="font-medium text-base flex items-center">
                            <Calendar className="mr-2 h-4 w-4" /> Calendar Sync
                          </h4>
                          <p className="text-sm text-muted-foreground">Sync with external calendars</p>
                        </div>
                        <Button size="sm" variant="outline">Configure</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-none border">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h4 className="font-medium text-base flex items-center">
                            <FileText className="mr-2 h-4 w-4" /> Document Storage
                          </h4>
                          <p className="text-sm text-muted-foreground">External document storage</p>
                        </div>
                        <Button size="sm" variant="outline">Configure</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-none border">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h4 className="font-medium text-base flex items-center">
                            <Bell className="mr-2 h-4 w-4" /> Push Notifications
                          </h4>
                          <p className="text-sm text-muted-foreground">Mobile and browser notifications</p>
                        </div>
                        <Button size="sm" variant="outline">Configure</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end space-x-2">
                <Button variant="outline">Reset to Default</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default SystemSettingsPage;
