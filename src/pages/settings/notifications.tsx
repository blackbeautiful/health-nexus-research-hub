import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BellRing, Mail, MessageSquare, AlertCircle, Calendar, Check, Save } from 'lucide-react';
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

const NotificationsSettingsPage: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);
  const [smsNotifications, setSmsNotifications] = useState<boolean>(false);
  const [inAppNotifications, setInAppNotifications] = useState<boolean>(true);
  
  // Sample notification settings
  const notificationSettings = [
    {
      id: 1,
      category: 'Patient Management',
      event: 'New patient registration',
      email: true,
      inApp: true,
      sms: false
    },
    {
      id: 2,
      category: 'Patient Management',
      event: 'Patient data updated',
      email: false,
      inApp: true,
      sms: false
    },
    {
      id: 3,
      category: 'Appointments',
      event: 'New appointment scheduled',
      email: true,
      inApp: true,
      sms: true
    },
    {
      id: 4,
      category: 'Appointments',
      event: 'Appointment reminder (24hr)',
      email: true,
      inApp: true,
      sms: true
    },
    {
      id: 5,
      category: 'Appointments',
      event: 'Appointment canceled',
      email: true,
      inApp: true,
      sms: false
    },
    {
      id: 6,
      category: 'Research Studies',
      event: 'Protocol update',
      email: true,
      inApp: true,
      sms: false
    },
    {
      id: 7,
      category: 'Research Studies',
      event: 'Enrollment milestone reached',
      email: true,
      inApp: true,
      sms: false
    },
    {
      id: 8,
      category: 'Research Studies',
      event: 'Study completion',
      email: true,
      inApp: true,
      sms: false
    },
    {
      id: 9,
      category: 'Data Management',
      event: 'Data query raised',
      email: true,
      inApp: true,
      sms: false
    },
    {
      id: 10,
      category: 'Data Management',
      event: 'Data export completed',
      email: true,
      inApp: true,
      sms: false
    },
    {
      id: 11,
      category: 'System',
      event: 'User access request',
      email: true,
      inApp: true,
      sms: false
    },
    {
      id: 12,
      category: 'System',
      event: 'Password reset',
      email: true,
      inApp: true,
      sms: true
    }
  ];
  
  return (
    <MainLayout>
      <PageHeader 
        title="Notification Settings" 
        description="Configure notification preferences and delivery methods"
        breadcrumbs={[
          { label: 'Settings', link: '/settings' },
          { label: 'Notifications' }
        ]}
        action={{
          label: "Save Changes",
          icon: Save,
          onClick: () => console.log("Save notification settings")
        }}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Methods</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                </div>
                <Switch 
                  checked={emailNotifications} 
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">SMS Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive urgent alerts via SMS</p>
                  </div>
                </div>
                <Switch 
                  checked={smsNotifications} 
                  onCheckedChange={setSmsNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <BellRing className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">In-app Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive notifications within the app</p>
                  </div>
                </div>
                <Switch 
                  checked={inAppNotifications} 
                  onCheckedChange={setInAppNotifications}
                />
              </div>
            </CardContent>
            
            <CardHeader className="border-t pt-6">
              <CardTitle>Contact Details</CardTitle>
              <CardDescription>Update notification delivery details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input value="jane.roberts@example.com" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number (SMS)</label>
                <Input value="+1 (555) 123-4567" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Summary Preferences</CardTitle>
              <CardDescription>Configure digest and summary notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Daily Summary</label>
                <Select defaultValue="enabled">
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="enabled">Enabled (6:00 PM)</SelectItem>
                    <SelectItem value="disabled">Disabled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Weekly Summary</label>
                <Select defaultValue="enabled">
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="enabled">Enabled (Fridays at 4:00 PM)</SelectItem>
                    <SelectItem value="disabled">Disabled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure which events trigger notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="mb-6">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="patient">Patient Management</TabsTrigger>
                  <TabsTrigger value="appointments">Appointments</TabsTrigger>
                  <TabsTrigger value="research">Research Studies</TabsTrigger>
                  <TabsTrigger value="data">Data Management</TabsTrigger>
                  <TabsTrigger value="system">System</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Event</TableHead>
                        <TableHead className="w-[100px] text-center">Email</TableHead>
                        <TableHead className="w-[100px] text-center">In-App</TableHead>
                        <TableHead className="w-[100px] text-center">SMS</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {notificationSettings.map((setting) => (
                        <TableRow key={setting.id}>
                          <TableCell>{setting.category}</TableCell>
                          <TableCell>{setting.event}</TableCell>
                          <TableCell className="text-center">
                            <Switch checked={setting.email} />
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch checked={setting.inApp} />
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch checked={setting.sms} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="patient" className="mt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead className="w-[100px] text-center">Email</TableHead>
                        <TableHead className="w-[100px] text-center">In-App</TableHead>
                        <TableHead className="w-[100px] text-center">SMS</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {notificationSettings
                        .filter(setting => setting.category === 'Patient Management')
                        .map((setting) => (
                          <TableRow key={setting.id}>
                            <TableCell>{setting.event}</TableCell>
                            <TableCell className="text-center">
                              <Switch checked={setting.email} />
                            </TableCell>
                            <TableCell className="text-center">
                              <Switch checked={setting.inApp} />
                            </TableCell>
                            <TableCell className="text-center">
                              <Switch checked={setting.sms} />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="appointments" className="mt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead className="w-[100px] text-center">Email</TableHead>
                        <TableHead className="w-[100px] text-center">In-App</TableHead>
                        <TableHead className="w-[100px] text-center">SMS</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {notificationSettings
                        .filter(setting => setting.category === 'Appointments')
                        .map((setting) => (
                          <TableRow key={setting.id}>
                            <TableCell>{setting.event}</TableCell>
                            <TableCell className="text-center">
                              <Switch checked={setting.email} />
                            </TableCell>
                            <TableCell className="text-center">
                              <Switch checked={setting.inApp} />
                            </TableCell>
                            <TableCell className="text-center">
                              <Switch checked={setting.sms} />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="research" className="mt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead className="w-[100px] text-center">Email</TableHead>
                        <TableHead className="w-[100px] text-center">In-App</TableHead>
                        <TableHead className="w-[100px] text-center">SMS</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {notificationSettings
                        .filter(setting => setting.category === 'Research Studies')
                        .map((setting) => (
                          <TableRow key={setting.id}>
                            <TableCell>{setting.event}</TableCell>
                            <TableCell className="text-center">
                              <Switch checked={setting.email} />
                            </TableCell>
                            <TableCell className="text-center">
                              <Switch checked={setting.inApp} />
                            </TableCell>
                            <TableCell className="text-center">
                              <Switch checked={setting.sms} />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="data" className="mt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead className="w-[100px] text-center">Email</TableHead>
                        <TableHead className="w-[100px] text-center">In-App</TableHead>
                        <TableHead className="w-[100px] text-center">SMS</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {notificationSettings
                        .filter(setting => setting.category === 'Data Management')
                        .map((setting) => (
                          <TableRow key={setting.id}>
                            <TableCell>{setting.event}</TableCell>
                            <TableCell className="text-center">
                              <Switch checked={setting.email} />
                            </TableCell>
                            <TableCell className="text-center">
                              <Switch checked={setting.inApp} />
                            </TableCell>
                            <TableCell className="text-center">
                              <Switch checked={setting.sms} />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="system" className="mt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead className="w-[100px] text-center">Email</TableHead>
                        <TableHead className="w-[100px] text-center">In-App</TableHead>
                        <TableHead className="w-[100px] text-center">SMS</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {notificationSettings
                        .filter(setting => setting.category === 'System')
                        .map((setting) => (
                          <TableRow key={setting.id}>
                            <TableCell>{setting.event}</TableCell>
                            <TableCell className="text-center">
                              <Switch checked={setting.email} />
                            </TableCell>
                            <TableCell className="text-center">
                              <Switch checked={setting.inApp} />
                            </TableCell>
                            <TableCell className="text-center">
                              <Switch checked={setting.sms} />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>
                <Check className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotificationsSettingsPage;
