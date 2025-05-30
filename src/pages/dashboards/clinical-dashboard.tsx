import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import StatCard from '@/components/dashboard/StatCard';
import {
  Calendar,
  Users,
  ClipboardList,
  Bell,
  FileText,
  Activity,
  MessageSquare,
  AlertCircle,
  CalendarClock,
  User,
  CheckCircle,
  Clock,
  Plus,
  TrendingUp,
  TestTube,
  Stethoscope
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ClinicalDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  const userStats = [
    { title: 'Assigned Patients', value: 42, icon: Users, color: 'bg-blue-100 text-blue-800' },
    { title: 'Today\'s Appointments', value: 8, icon: Calendar, color: 'bg-amber-100 text-amber-800' },
    { title: 'Tasks Due Today', value: 15, icon: ClipboardList, color: 'bg-green-100 text-green-800' },
    { title: 'Unread Messages', value: 5, icon: MessageSquare, color: 'bg-purple-100 text-purple-800' }
  ];

  const facilityStats = [
    { title: 'Total Patients', value: 2134, icon: Users, color: 'bg-blue-100 text-blue-800' },
    { title: 'Appointments Today', value: 86, icon: Calendar, color: 'bg-amber-100 text-amber-800' },
    { title: 'Active Staff', value: 32, icon: User, color: 'bg-green-100 text-green-800' },
    { title: 'Lab Results Pending', value: 17, icon: Activity, color: 'bg-red-100 text-red-800' }
  ];
  
  const upcomingAppointments = [
    { 
      id: 1, 
      patientName: 'James Wilson', 
      patientId: 'P-1001',
      time: '09:00 AM', 
      type: 'Check-up', 
      status: 'confirmed',
      lastVisit: '2 weeks ago',
      alerts: ['Lab results available']
    },
    { 
      id: 2, 
      patientName: 'Maria Garcia', 
      patientId: 'P-1002',
      time: '10:30 AM', 
      type: 'Follow-up', 
      status: 'confirmed',
      lastVisit: '1 month ago',
      alerts: ['Vital signs due']
    },
    { 
      id: 3, 
      patientName: 'Robert Johnson', 
      patientId: 'P-1003',
      time: '11:45 AM', 
      type: 'Consultation', 
      status: 'pending',
      lastVisit: '3 days ago',
      alerts: ['Treatment plan review']
    },
    { 
      id: 4, 
      patientName: 'Emily Chen', 
      patientId: 'P-1004',
      time: '01:15 PM', 
      type: 'Treatment', 
      status: 'confirmed',
      lastVisit: '1 week ago',
      alerts: ['Imaging results ready']
    },
    { 
      id: 5, 
      patientName: 'Michael Brown', 
      patientId: 'P-1005',
      time: '03:00 PM', 
      type: 'New Patient', 
      status: 'confirmed',
      lastVisit: 'First visit',
      alerts: []
    }
  ];
  
  const recentNotifications = [
    { 
      id: 1, 
      title: 'Lab Results Ready', 
      message: 'Lab results for patient Emily Chen are ready for review', 
      time: '10 min ago', 
      type: 'alert',
      patientId: 'P-1004',
      actionable: true
    },
    { 
      id: 2, 
      title: 'Appointment Confirmed', 
      message: 'James Wilson confirmed his appointment for today at 9:00 AM', 
      time: '1 hour ago', 
      type: 'info',
      patientId: 'P-1001',
      actionable: false
    },
    { 
      id: 3, 
      title: 'Critical Lab Value', 
      message: 'Robert Johnson has critically low neutrophil count - requires immediate attention', 
      time: '2 hours ago', 
      type: 'critical',
      patientId: 'P-1003',
      actionable: true
    },
    { 
      id: 4, 
      title: 'Medication Refill Request', 
      message: 'Robert Johnson requested a refill for their prescription', 
      time: '2 hours ago', 
      type: 'action',
      patientId: 'P-1003',
      actionable: true
    }
  ];
  
  const recentTasks = [
    { 
      id: 1, 
      title: 'Review Lab Results', 
      patient: 'Emily Chen', 
      patientId: 'P-1004',
      dueDate: 'Today, 2:00 PM', 
      priority: 'high', 
      completed: false,
      type: 'clinical'
    },
    { 
      id: 2, 
      title: 'Update Treatment Plan', 
      patient: 'James Wilson', 
      patientId: 'P-1001',
      dueDate: 'Today, 5:00 PM', 
      priority: 'medium', 
      completed: false,
      type: 'clinical'
    },
    { 
      id: 3, 
      title: 'Call Patient for Follow-up', 
      patient: 'Maria Garcia', 
      patientId: 'P-1002',
      dueDate: 'Tomorrow, 10:00 AM', 
      priority: 'medium', 
      completed: false,
      type: 'administrative'
    },
    { 
      id: 4, 
      title: 'Complete Medical Records', 
      patient: 'Robert Johnson', 
      patientId: 'P-1003',
      dueDate: 'Yesterday', 
      priority: 'high', 
      completed: true,
      type: 'documentation'
    },
    { 
      id: 5, 
      title: 'Insurance Verification', 
      patient: 'Michael Brown', 
      patientId: 'P-1005',
      dueDate: 'Yesterday', 
      priority: 'low', 
      completed: true,
      type: 'administrative'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="text-red-500">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'alert':
        return <TestTube className="h-5 w-5 text-blue-500" />;
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'info':
        return <Bell className="h-5 w-5 text-blue-500" />;
      case 'action':
        return <FileText className="h-5 w-5 text-amber-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>;
      case 'medium':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const handlePatientClick = (patientId: string) => {
    navigate(`/patients/${patientId}`);
  };

  return (
    <Layout>
      <PageHeader
        title="Clinical Dashboard"
        description="Manage your patients, appointments, and clinical workflows"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Clinical Dashboard' }
        ]}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-12 p-1 bg-muted/50 rounded-lg border">
          <TabsTrigger 
            value="overview" 
            className="h-10 px-6 font-medium transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="patients" 
            className="h-10 px-6 font-medium transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border"
          >
            My Patients
          </TabsTrigger>
          <TabsTrigger 
            value="tasks" 
            className="h-10 px-6 font-medium transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border"
          >
            My Tasks
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {userStats.map((stat, i) => (
              <div key={i} className="flex flex-col space-y-1.5 p-4 rounded-lg border">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-full ${stat.color}`}>
                    <stat.icon className="h-4 w-4" />
                  </div>
                  <h3 className="tracking-tight text-sm font-medium">{stat.title}</h3>
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
              </div>
            ))}
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Today's Appointments</CardTitle>
                <CardDescription>Your scheduled appointments for today</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {upcomingAppointments.slice(0, 4).map(appointment => (
                    <div key={appointment.id} className="flex justify-between items-center p-4 hover:bg-muted/50 cursor-pointer"
                         onClick={() => handlePatientClick(appointment.patientId)}>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="font-medium">{appointment.patientName}</div>
                          <Badge variant="outline" className="text-xs">{appointment.patientId}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {appointment.time} - {appointment.type}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Last visit: {appointment.lastVisit}
                        </div>
                        {appointment.alerts.length > 0 && (
                          <div className="flex gap-1 mt-1">
                            {appointment.alerts.map((alert, index) => (
                              <Badge key={index} variant="outline" className="text-xs bg-yellow-50 text-yellow-700">
                                {alert}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(appointment.status)}
                        <Button variant="ghost" size="sm" onClick={(e) => {
                          e.stopPropagation();
                          navigate('/appointments');
                        }}>
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 text-center">
                  <Button variant="ghost" onClick={() => navigate('/appointments')}>
                    View All Appointments
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Notifications</CardTitle>
                <CardDescription>Your latest alerts and updates</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {recentNotifications.map(notification => (
                    <div key={notification.id} className="flex gap-3 p-4 hover:bg-muted/50">
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{notification.title}</div>
                        <div className="text-sm text-muted-foreground mt-1">{notification.message}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                          {notification.patientId && (
                            <Badge variant="outline" className="text-xs cursor-pointer"
                                   onClick={() => handlePatientClick(notification.patientId!)}>
                              {notification.patientId}
                            </Badge>
                          )}
                        </div>
                        {notification.actionable && (
                          <Button variant="outline" size="sm" className="mt-2">
                            Take Action
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 text-center">
                  <Button variant="ghost">
                    View All Notifications
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Tasks Due Soon</CardTitle>
                <CardDescription>Your upcoming tasks and responsibilities</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {recentTasks.filter(task => !task.completed).slice(0, 3).map(task => (
                    <div key={task.id} className="flex justify-between items-center p-4 hover:bg-muted/50">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{task.title}</div>
                          <div className="text-sm mt-1">Patient: {task.patient}</div>
                          <div className="text-xs text-muted-foreground mt-1 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {task.dueDate}
                          </div>
                        </div>
                      </div>
                      <div>
                        {getPriorityBadge(task.priority)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 text-center">
                  <Button variant="ghost" onClick={() => setActiveTab('tasks')}>
                    View All Tasks
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Frequently used functions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <Button variant="outline" className="h-auto flex flex-col py-4" onClick={() => navigate('/patients/register')}>
                    <User className="h-5 w-5 mb-1" />
                    <span>New Patient</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex flex-col py-4" onClick={() => navigate('/clinical-workflows/notes/new')}>
                    <FileText className="h-5 w-5 mb-1" />
                    <span>New Note</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex flex-col py-4" onClick={() => navigate('/appointments')}>
                    <CalendarClock className="h-5 w-5 mb-1" />
                    <span>Schedule</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex flex-col py-4" onClick={() => navigate('/clinical-workflows/prescriptions/new')}>
                    <ClipboardList className="h-5 w-5 mb-1" />
                    <span>Prescribe</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex flex-col py-4" onClick={() => navigate('/lab-results')}>
                    <Activity className="h-5 w-5 mb-1" />
                    <span>Lab Results</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex flex-col py-4" onClick={() => navigate('/messages')}>
                    <MessageSquare className="h-5 w-5 mb-1" />
                    <span>Message</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Facility Overview</CardTitle>
              <CardDescription>General statistics about your healthcare facility</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {facilityStats.map((stat, i) => (
                  <div key={i} className="flex flex-col space-y-1.5 p-4 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-full ${stat.color}`}>
                        <stat.icon className="h-4 w-4" />
                      </div>
                      <h3 className="tracking-tight text-sm font-medium">{stat.title}</h3>
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-2">Patient Distribution</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Active Patients</span>
                      <span className="text-muted-foreground">85% (1,814)</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Appointment Statistics</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-2 rounded-lg bg-muted/50">
                      <div className="text-lg font-semibold">86</div>
                      <div className="text-xs text-muted-foreground">Today</div>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/50">
                      <div className="text-lg font-semibold">412</div>
                      <div className="text-xs text-muted-foreground">This Week</div>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/50">
                      <div className="text-lg font-semibold">1,245</div>
                      <div className="text-xs text-muted-foreground">This Month</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button onClick={() => navigate('/clinical-reports')}>View Detailed Reports</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">My Assigned Patients</CardTitle>
              <CardDescription>Patients under your care with quick access to their records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Array(5).fill(0).map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                       onClick={() => handlePatientClick(`P-100${i + 1}`)}>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <div className="flex h-full w-full items-center justify-center bg-muted rounded-full">
                          <User className="h-5 w-5" />
                        </div>
                      </Avatar>
                      <div>
                        <div className="font-medium">{["James Wilson", "Maria Garcia", "Emily Chen", "Robert Johnson", "Sarah Lee"][i]}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <span>ID: P-100{i + 1}</span>
                          <span>•</span>
                          <span>{["Cardiology", "Oncology", "Neurology", "Orthopedics", "General"][i]}</span>
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                          <span>Last visit: {["2 days ago", "1 week ago", "3 days ago", "1 day ago", "1 month ago"][i]}</span>
                          {i < 2 && (
                            <>
                              <span>•</span>
                              <span className="text-amber-600">Pending results</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={i % 2 === 0 ? "default" : "outline"} className={i % 2 === 0 ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}>
                        {i % 2 === 0 ? "Active" : "Follow-up"}
                      </Badge>
                      <Button variant="outline" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        handlePatientClick(`P-100${i + 1}`);
                      }}>
                        View
                      </Button>
                    </div>
                  </div>
                ))}
                
                <div className="text-center">
                  <Button variant="outline" onClick={() => navigate('/patients')}>
                    View All Patients
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Patient Activity</CardTitle>
                <CardDescription>Latest updates on your patients</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {[
                    { patient: "James Wilson", patientId: 'P-1001', action: "Lab results updated", time: "10 min ago" },
                    { patient: "Maria Garcia", patientId: 'P-1002', action: "Medication prescribed", time: "1 hour ago" },
                    { patient: "Emily Chen", patientId: 'P-1004', action: "Appointment scheduled", time: "2 hours ago" },
                    { patient: "Robert Johnson", patientId: 'P-1003', action: "Treatment plan updated", time: "Yesterday" }
                  ].map((activity, i) => (
                    <div key={i} className="flex justify-between items-center p-4 hover:bg-muted/50 cursor-pointer"
                         onClick={() => handlePatientClick(activity.patientId)}>
                      <div className="flex-1">
                        <div className="font-medium">{activity.patient}</div>
                        <div className="text-sm text-muted-foreground">{activity.action}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Upcoming Patient Visits</CardTitle>
                <CardDescription>Scheduled appointments for your patients</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {upcomingAppointments.map((appointment, i) => (
                    <div key={i} className="flex justify-between items-center p-4 hover:bg-muted/50 cursor-pointer"
                         onClick={() => handlePatientClick(appointment.patientId)}>
                      <div>
                        <div className="font-medium">{appointment.patientName}</div>
                        <div className="text-sm text-muted-foreground">
                          {appointment.time} - {appointment.type}
                        </div>
                      </div>
                      <div>
                        {getStatusBadge(appointment.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">My Tasks</CardTitle>
                  <CardDescription>Track and manage your clinical tasks</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Filter</Button>
                  <Button size="sm" onClick={() => {}}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Task
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="font-medium text-sm mb-2">Due Today</div>
                {recentTasks.filter(task => task.dueDate.includes('Today') && !task.completed).map(task => (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                      <div>
                        <div className="font-medium">{task.title}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <span>Patient: {task.patient}</span>
                          <Badge variant="outline" className="text-xs cursor-pointer"
                                 onClick={() => handlePatientClick(task.patientId)}>
                            {task.patientId}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getPriorityBadge(task.priority)}
                      <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-1 mt-6">
                <div className="font-medium text-sm mb-2">Upcoming</div>
                {recentTasks.filter(task => task.dueDate.includes('Tomorrow') && !task.completed).map(task => (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                      <div>
                        <div className="font-medium">{task.title}</div>
                        <div className="text-sm text-muted-foreground">Patient: {task.patient}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getPriorityBadge(task.priority)}
                      <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-1">
                <div className="font-medium text-sm mb-2">Completed</div>
                {recentTasks.filter(task => task.completed).map(task => (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                      <div>
                        <div className="font-medium line-through text-muted-foreground">{task.title}</div>
                        <div className="text-sm text-muted-foreground">Patient: {task.patient}</div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Completed Yesterday
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default ClinicalDashboard;
