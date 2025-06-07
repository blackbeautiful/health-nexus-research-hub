
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Calendar, 
  ClipboardCheck, 
  Activity, 
  Bell,
  Pill,
  Heart,
  AlertTriangle,
  Clock,
  CheckCircle
} from 'lucide-react';

const NurseDashboard = () => {
  const patientAssignments = [
    { id: 1, name: 'Sarah Johnson', room: '201A', condition: 'Post-op observation', priority: 'high', lastVitals: '10:30 AM' },
    { id: 2, name: 'Michael Chen', room: '203B', condition: 'Chemotherapy cycle 3', priority: 'medium', lastVitals: '11:15 AM' },
    { id: 3, name: 'Emma Davis', room: '205A', condition: 'Pre-surgery prep', priority: 'high', lastVitals: '9:45 AM' },
    { id: 4, name: 'Robert Wilson', room: '207C', condition: 'Recovery monitoring', priority: 'low', lastVitals: '10:00 AM' }
  ];

  const pendingTasks = [
    { id: 1, task: 'Administer medication - Room 201A', due: '2:00 PM', type: 'medication' },
    { id: 2, task: 'Vital signs check - Room 203B', due: '2:30 PM', type: 'vitals' },
    { id: 3, task: 'Pre-op preparation - Room 205A', due: '3:00 PM', type: 'procedure' },
    { id: 4, task: 'Discharge paperwork - Room 207C', due: '4:00 PM', type: 'documentation' }
  ];

  const alerts = [
    { id: 1, message: 'Patient in Room 201A - Blood pressure elevated', time: '1:45 PM', severity: 'high' },
    { id: 2, message: 'Medication refill needed for Room 203B', time: '1:30 PM', severity: 'medium' },
    { id: 3, message: 'Lab results available for Room 205A', time: '1:15 PM', severity: 'low' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'medication': return <Pill className="h-4 w-4" />;
      case 'vitals': return <Activity className="h-4 w-4" />;
      case 'procedure': return <ClipboardCheck className="h-4 w-4" />;
      case 'documentation': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nursing Dashboard</h1>
          <p className="text-gray-600">Welcome back, Nurse Sarah Wilson</p>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">4 Patients Assigned</span>
            </div>
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">6 Tasks Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium">3 Active Alerts</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Patients Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">4</div>
              <p className="text-xs text-gray-600">Currently assigned</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">6</div>
              <p className="text-xs text-gray-600">Due today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Medications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">12</div>
              <p className="text-xs text-gray-600">Administered today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Shift Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">6.5</div>
              <p className="text-xs text-gray-600">Remaining</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient Assignments */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Patient Assignments
                </CardTitle>
                <CardDescription>Current patients under your care</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patientAssignments.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                          <h4 className="font-medium">{patient.name}</h4>
                          <p className="text-sm text-gray-600">Room {patient.room}</p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-sm">{patient.condition}</p>
                          <p className="text-xs text-gray-500">Last vitals: {patient.lastVitals}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getPriorityColor(patient.priority)}>
                          {patient.priority}
                        </Badge>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts & Notifications */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Active Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="p-3 border rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className={`h-4 w-4 mt-1 ${
                          alert.severity === 'high' ? 'text-red-500' :
                          alert.severity === 'medium' ? 'text-orange-500' : 'text-yellow-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{alert.message}</p>
                          <p className="text-xs text-gray-500">{alert.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pending Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5" />
              Pending Tasks
            </CardTitle>
            <CardDescription>Tasks scheduled for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {pendingTasks.map((task) => (
                <div key={task.id} className="p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    {getTaskIcon(task.type)}
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{task.task}</h4>
                      <p className="text-xs text-gray-500 mt-1">Due: {task.due}</p>
                      <Button variant="outline" size="sm" className="mt-2 w-full">
                        Complete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default NurseDashboard;
