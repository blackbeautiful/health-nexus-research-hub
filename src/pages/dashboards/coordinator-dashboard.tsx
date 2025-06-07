import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Calendar, 
  FileText, 
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  FlaskRound,
  UserCheck,
  ClipboardCheck,
  Phone,
  Mail,
  MessageSquare
} from 'lucide-react';

const CoordinatorDashboard = () => {
  const managedStudies = [
    { 
      id: 'ONCO-2024-001', 
      title: 'Phase II Immunotherapy Trial',
      participants: 24,
      target: 30,
      phase: 'Phase II',
      status: 'recruiting',
      pi: 'Dr. Sarah Martinez'
    },
    { 
      id: 'ONCO-2024-002', 
      title: 'Combination Therapy Study',
      participants: 18,
      target: 25,
      phase: 'Phase I/II',
      status: 'active',
      pi: 'Dr. Michael Chen'
    },
    { 
      id: 'ONCO-2024-003', 
      title: 'Biomarker Discovery Study',
      participants: 45,
      target: 50,
      phase: 'Observational',
      status: 'active',
      pi: 'Dr. Elena Rodriguez'
    }
  ];

  const participantTasks = [
    { id: 1, participant: 'John Smith', task: 'Schedule follow-up visit', study: 'ONCO-2024-001', priority: 'high', due: 'Today' },
    { id: 2, participant: 'Maria Garcia', task: 'Review consent form amendments', study: 'ONCO-2024-002', priority: 'medium', due: 'Tomorrow' },
    { id: 3, participant: 'David Lee', task: 'Collect adverse event report', study: 'ONCO-2024-001', priority: 'high', due: 'Today' },
    { id: 4, participant: 'Sarah Johnson', task: 'Schedule screening visit', study: 'ONCO-2024-003', priority: 'low', due: '2 days' }
  ];

  const upcomingVisits = [
    { id: 1, time: '9:00 AM', participant: 'John Smith', study: 'ONCO-2024-001', type: 'Treatment', status: 'confirmed' },
    { id: 2, time: '10:30 AM', participant: 'Maria Garcia', study: 'ONCO-2024-002', type: 'Screening', status: 'confirmed' },
    { id: 3, time: '2:00 PM', participant: 'David Lee', study: 'ONCO-2024-001', type: 'Follow-up', status: 'pending' },
    { id: 4, time: '3:30 PM', participant: 'Sarah Johnson', study: 'ONCO-2024-003', type: 'Baseline', status: 'confirmed' }
  ];

  const recentAlerts = [
    { id: 1, type: 'adverse_event', message: 'New SAE reported - John Smith', time: '30 min ago', severity: 'high' },
    { id: 2, type: 'protocol_deviation', message: 'Minor protocol deviation - Maria Garcia', time: '2 hours ago', severity: 'medium' },
    { id: 3, type: 'missed_visit', message: 'Missed visit alert - David Lee', time: '4 hours ago', severity: 'medium' },
    { id: 4, type: 'consent_expiry', message: 'Consent renewal due - Sarah Johnson', time: '1 day ago', severity: 'low' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'screening': return 'secondary';
      case 'completed': return 'outline';
      case 'paused': return 'destructive';
      default: return 'outline';
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-orange-500';
      case 'low': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Coordinator Dashboard</h1>
          <p className="text-gray-600">Welcome back, Lisa Anderson - Clinical Research Coordinator</p>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2">
              <FlaskRound className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">3 Active Studies</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">87 Participants</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium">12 Visits Today</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span className="text-sm font-medium">4 Priority Tasks</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">87</div>
              <p className="text-xs text-gray-600">Across all studies</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Today's Visits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">12</div>
              <p className="text-xs text-gray-600">4 completed, 8 scheduled</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">16</div>
              <p className="text-xs text-gray-600">4 high priority</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Recruitment Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">82%</div>
              <p className="text-xs text-gray-600">Of target enrollment</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Managed Studies */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FlaskRound className="h-5 w-5" />
                  Managed Studies
                </CardTitle>
                <CardDescription>Studies under your coordination</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {managedStudies.map((study) => (
                    <div key={study.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">{study.title}</h4>
                          <p className="text-sm text-gray-600">Study ID: {study.id}</p>
                          <p className="text-sm text-blue-600">PI: {study.pi}</p>
                        </div>
                        <Badge className={getStatusColor(study.status)}>
                          {study.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Enrollment Progress</span>
                          <span>{study.participants}/{study.target} ({Math.round((study.participants/study.target)*100)}%)</span>
                        </div>
                        <Progress value={(study.participants/study.target)*100} className="h-2" />
                        <div className="flex justify-between items-center text-sm text-gray-600">
                          <span>{study.phase}</span>
                          <Button variant="outline" size="sm">Manage</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Alerts */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Recent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentAlerts.map((alert) => (
                    <div key={alert.id} className="p-3 border rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className={`h-4 w-4 mt-1 ${getAlertColor(alert.severity)}`} />
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Visits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today's Visits
              </CardTitle>
              <CardDescription>Scheduled participant visits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingVisits.map((visit) => (
                  <div key={visit.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <div className="font-medium text-sm">{visit.time}</div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{visit.participant}</h4>
                        <p className="text-xs text-gray-600">{visit.study}</p>
                        <p className="text-xs text-blue-600">{visit.type} Visit</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(visit.status)}>
                        {visit.status}
                      </Badge>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Priority Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5" />
                Priority Tasks
              </CardTitle>
              <CardDescription>Tasks requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {participantTasks.map((task) => (
                  <div key={task.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm">{task.task}</h4>
                      <Badge variant={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{task.participant}</p>
                    <p className="text-xs text-blue-600">{task.study}</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-gray-500">Due: {task.due}</p>
                      <Button variant="outline" size="sm">Complete</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="flex items-center justify-center p-6">
              <div className="text-center">
                <UserCheck className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-medium">Schedule Visit</h3>
                <p className="text-sm text-gray-600">Book participant appointment</p>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="flex items-center justify-center p-6">
              <div className="text-center">
                <FileText className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-medium">Data Entry</h3>
                <p className="text-sm text-gray-600">Update participant records</p>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="flex items-center justify-center p-6">
              <div className="text-center">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <h3 className="font-medium">Contact Participant</h3>
                <p className="text-sm text-gray-600">Send message or call</p>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="flex items-center justify-center p-6">
              <div className="text-center">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-red-600" />
                <h3 className="font-medium">Report Event</h3>
                <p className="text-sm text-gray-600">Submit adverse event</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default CoordinatorDashboard;
