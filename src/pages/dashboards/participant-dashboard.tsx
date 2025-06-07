
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  FlaskRound, 
  Calendar, 
  FileText, 
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Pill,
  Heart,
  User,
  ClipboardCheck
} from 'lucide-react';

const ParticipantDashboard = () => {
  const enrolledStudies = [
    { 
      id: 'ONCO-2024-001', 
      title: 'Phase II Immunotherapy Trial',
      phase: 'Phase II',
      status: 'active',
      progress: 45,
      nextVisit: '2025-01-15',
      coordinator: 'Dr. Sarah Chen'
    },
    { 
      id: 'ONCO-2024-003', 
      title: 'Biomarker Discovery Study',
      phase: 'Observational',
      status: 'screening',
      progress: 15,
      nextVisit: '2025-01-20',
      coordinator: 'Dr. Mike Wilson'
    }
  ];

  const upcomingVisits = [
    { id: 1, date: '2025-01-15', time: '9:00 AM', type: 'Treatment Visit', study: 'ONCO-2024-001', location: 'Cancer Center - Floor 3' },
    { id: 2, date: '2025-01-20', time: '2:00 PM', type: 'Screening Visit', study: 'ONCO-2024-003', location: 'Research Wing - Room 205' },
    { id: 3, date: '2025-01-28', time: '10:30 AM', type: 'Follow-up', study: 'ONCO-2024-001', location: 'Cancer Center - Floor 3' }
  ];

  const recentActivities = [
    { id: 1, activity: 'Completed symptom questionnaire', time: '2 hours ago', type: 'questionnaire' },
    { id: 2, activity: 'Blood samples collected', time: '3 days ago', type: 'lab' },
    { id: 3, activity: 'Study medication dispensed', time: '1 week ago', type: 'medication' },
    { id: 4, activity: 'Consent form signed', time: '2 weeks ago', type: 'consent' }
  ];

  const healthMetrics = [
    { label: 'Quality of Life Score', value: '7.2/10', trend: 'stable', color: 'text-blue-600' },
    { label: 'Symptom Severity', value: 'Mild', trend: 'improving', color: 'text-green-600' },
    { label: 'Adherence Rate', value: '95%', trend: 'excellent', color: 'text-green-600' },
    { label: 'Safety Alerts', value: '0', trend: 'good', color: 'text-green-600' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'screening': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'questionnaire': return <ClipboardCheck className="h-4 w-4" />;
      case 'lab': return <FlaskRound className="h-4 w-4" />;
      case 'medication': return <Pill className="h-4 w-4" />;
      case 'consent': return <FileText className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Participant Portal</h1>
          <p className="text-gray-600">Welcome back, John Smith - Study Participant ID: SP-2024-0127</p>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2">
              <FlaskRound className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">2 Active Studies</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">3 Upcoming Visits</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium">95% Compliance Rate</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {healthMetrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
                <p className="text-xs text-gray-600 capitalize">{metric.trend}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enrolled Studies */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FlaskRound className="h-5 w-5" />
                  My Studies
                </CardTitle>
                <CardDescription>Your current research study participation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enrolledStudies.map((study) => (
                    <div key={study.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">{study.title}</h4>
                          <p className="text-sm text-gray-600">Study ID: {study.id}</p>
                          <p className="text-sm text-blue-600">{study.phase}</p>
                        </div>
                        <Badge className={getStatusColor(study.status)}>
                          {study.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Study Progress</span>
                          <span>{study.progress}%</span>
                        </div>
                        <Progress value={study.progress} className="h-2" />
                        <div className="flex justify-between items-center text-sm text-gray-600">
                          <span>Coordinator: {study.coordinator}</span>
                          <span>Next visit: {study.nextVisit}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3">View Details</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-2">
                      <div className="h-8 w-8 bg-blue-50 rounded-full flex items-center justify-center">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.activity}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Upcoming Visits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Study Visits
            </CardTitle>
            <CardDescription>Your scheduled study appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingVisits.map((visit) => (
                <div key={visit.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{visit.type}</h4>
                    <Clock className="h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{visit.study}</p>
                  <p className="text-sm font-medium">{visit.date} at {visit.time}</p>
                  <p className="text-xs text-gray-500">{visit.location}</p>
                  <Button variant="outline" size="sm" className="mt-2 w-full">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="flex items-center justify-center p-6">
              <div className="text-center">
                <ClipboardCheck className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-medium">Complete Survey</h3>
                <p className="text-sm text-gray-600">Weekly symptom check</p>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="flex items-center justify-center p-6">
              <div className="text-center">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-medium">Contact Team</h3>
                <p className="text-sm text-gray-600">Message your coordinator</p>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="flex items-center justify-center p-6">
              <div className="text-center">
                <FileText className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <h3 className="font-medium">Study Documents</h3>
                <p className="text-sm text-gray-600">View consent forms</p>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="flex items-center justify-center p-6">
              <div className="text-center">
                <Heart className="h-8 w-8 mx-auto mb-2 text-red-600" />
                <h3 className="font-medium">Health Reports</h3>
                <p className="text-sm text-gray-600">View your progress</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ParticipantDashboard;
