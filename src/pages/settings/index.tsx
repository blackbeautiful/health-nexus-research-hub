
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Bell, Lock, Palette, Shield, User } from 'lucide-react';

const SettingsPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = (section: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Settings saved',
        description: `Your ${section} settings have been successfully updated.`,
      });
    }, 1000);
  };

  return (
    <Layout title="Settings">
      <PageHeader
        title="Settings"
        description="Manage your account settings and preferences"
        breadcrumbs={[{ label: 'Settings' }]}
      />
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64 flex-shrink-0">
          <Tabs defaultValue="profile" orientation="vertical" className="w-full">
            <TabsList className="flex md:flex-col h-auto justify-start bg-transparent gap-2">
              <TabsTrigger value="profile" className="w-full justify-start data-[state=active]:bg-muted">
                <User className="h-4 w-4 mr-2" />
                <span className="text-left">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="w-full justify-start data-[state=active]:bg-muted">
                <Lock className="h-4 w-4 mr-2" />
                <span className="text-left">Security</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="w-full justify-start data-[state=active]:bg-muted">
                <Bell className="h-4 w-4 mr-2" />
                <span className="text-left">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="w-full justify-start data-[state=active]:bg-muted">
                <Palette className="h-4 w-4 mr-2" />
                <span className="text-left">Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="w-full justify-start data-[state=active]:bg-muted">
                <Shield className="h-4 w-4 mr-2" />
                <span className="text-left">Privacy</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex-1">
          <Card className="border shadow-sm">
            <Tabs defaultValue="profile">
              <TabsContent value="profile" className="space-y-6">
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>
                    Manage your personal information and profile settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <Avatar className="h-20 w-20 border border-slate-300">
                      <div className="flex h-full w-full items-center justify-center bg-health-primary text-white text-xl">
                        DR
                      </div>
                    </Avatar>
                    <div className="flex flex-col gap-2">
                      <h4 className="font-medium">Profile Photo</h4>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Upload</Button>
                        <Button size="sm" variant="outline" className="text-red-500">Remove</Button>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="Jane" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Roberts" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" defaultValue="jane.roberts@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue="(555) 123-4567" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="title">Professional Title</Label>
                      <Input id="title" defaultValue="Oncologist, MD, PhD" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="bio">Biography</Label>
                      <Textarea 
                        id="bio" 
                        rows={4} 
                        defaultValue="Board-certified oncologist specializing in breast cancer treatment and clinical research. Completed medical training at Johns Hopkins University with residency at Mayo Clinic. 15+ years of experience in oncology treatment and research."
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={() => handleSave('profile')} disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="security">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your password and security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Authenticator App</p>
                        <p className="text-sm text-muted-foreground">Use an authenticator app to generate verification codes.</p>
                      </div>
                      <Switch id="two-factor" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Verification</p>
                        <p className="text-sm text-muted-foreground">Receive verification codes via SMS.</p>
                      </div>
                      <Switch id="sms-verification" defaultChecked />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Session Management</h4>
                    <Button variant="outline">Sign Out All Devices</Button>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={() => handleSave('security')} disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="notifications">
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Manage how you receive notifications and alerts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Email Notifications</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Patient Registrations</p>
                          <p className="text-sm text-muted-foreground">Receive emails when new patients are registered.</p>
                        </div>
                        <Switch id="email-patients" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Lab Results</p>
                          <p className="text-sm text-muted-foreground">Receive emails when new lab results are available.</p>
                        </div>
                        <Switch id="email-labs" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Study Updates</p>
                          <p className="text-sm text-muted-foreground">Receive emails with updates to research studies.</p>
                        </div>
                        <Switch id="email-studies" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">In-App Notifications</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Messages</p>
                          <p className="text-sm text-muted-foreground">Show notifications for new messages.</p>
                        </div>
                        <Switch id="app-messages" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Appointments</p>
                          <p className="text-sm text-muted-foreground">Show notifications for upcoming appointments.</p>
                        </div>
                        <Switch id="app-appointments" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">System Updates</p>
                          <p className="text-sm text-muted-foreground">Show notifications for system updates.</p>
                        </div>
                        <Switch id="app-system" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={() => handleSave('notifications')} disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="appearance">
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>
                    Customize the look and feel of your application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Theme</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border rounded-md p-4 cursor-pointer flex flex-col items-center gap-2 bg-white">
                        <div className="h-24 w-full rounded bg-white border"></div>
                        <span className="text-sm">Light</span>
                      </div>
                      <div className="border rounded-md p-4 cursor-pointer flex flex-col items-center gap-2">
                        <div className="h-24 w-full rounded bg-gray-900 border border-gray-700"></div>
                        <span className="text-sm">Dark</span>
                      </div>
                      <div className="border rounded-md p-4 cursor-pointer flex flex-col items-center gap-2">
                        <div className="h-24 w-full rounded bg-gradient-to-b from-white to-gray-900 border"></div>
                        <span className="text-sm">System</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Dashboard Layout</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-md p-4 cursor-pointer flex flex-col items-center">
                        <div className="h-24 w-full rounded bg-gray-100 flex">
                          <div className="w-1/4 bg-gray-200 h-full"></div>
                          <div className="w-3/4 p-2">
                            <div className="h-4 w-1/2 bg-gray-300 mb-2 rounded"></div>
                            <div className="h-16 bg-gray-300 rounded"></div>
                          </div>
                        </div>
                        <span className="text-sm mt-2">Sidebar Layout</span>
                      </div>
                      <div className="border rounded-md p-4 cursor-pointer flex flex-col items-center">
                        <div className="h-24 w-full rounded bg-gray-100 flex flex-col">
                          <div className="h-6 bg-gray-200 w-full mb-2"></div>
                          <div className="flex-1 p-2">
                            <div className="h-4 w-1/2 bg-gray-300 mb-2 rounded"></div>
                            <div className="h-10 bg-gray-300 rounded"></div>
                          </div>
                        </div>
                        <span className="text-sm mt-2">Top Navigation</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="density">Interface Density</Label>
                    <Select defaultValue="comfortable">
                      <SelectTrigger id="density">
                        <SelectValue placeholder="Select density" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="comfortable">Comfortable</SelectItem>
                        <SelectItem value="spacious">Spacious</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Adjust the spacing and density of UI elements.
                    </p>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={() => handleSave('appearance')} disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="privacy">
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>
                    Manage your data privacy and protection preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Data Collection</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Analytics</p>
                          <p className="text-sm text-muted-foreground">Allow anonymous usage data collection to improve the service.</p>
                        </div>
                        <Switch id="analytics" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Personalization</p>
                          <p className="text-sm text-muted-foreground">Allow personalized recommendations based on your usage.</p>
                        </div>
                        <Switch id="personalization" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Activity Log</h4>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        View and manage your activity history within the system.
                      </p>
                      <Button variant="outline" className="mt-2">View Activity Log</Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Data Export & Deletion</h4>
                    <div className="flex flex-col gap-4">
                      <Button variant="outline">Export All Data</Button>
                      <Button variant="destructive">Request Account Deletion</Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={() => handleSave('privacy')} disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
