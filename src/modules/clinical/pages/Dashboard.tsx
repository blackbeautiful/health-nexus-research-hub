import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import StatCard from '@/components/dashboard/StatCard';
import RecentPatients from '@/components/dashboard/RecentPatients';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Calendar, 
  Activity, 
  TrendingUp, 
  Clock, 
  Heart, 
  Thermometer,
  Stethoscope,
  Bed,
  AlertCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ClinicalDashboard = () => {
  const todayStats = [
    { 
      title: "Today's Patients", 
      value: "42", 
      icon: <Users className="h-4 w-4" />,
      trend: { value: 12, isPositive: true }
    },
    { 
      title: "Appointments", 
      value: "28", 
      icon: <Calendar className="h-4 w-4" />,
      trend: { value: 5, isPositive: true }
    },
    { 
      title: "Emergency Cases", 
      value: "3", 
      icon: <AlertCircle className="h-4 w-4" />,
      trend: { value: -25, isPositive: false }
    },
    { 
      title: "Avg Wait Time", 
      value: "23 min", 
      icon: <Clock className="h-4 w-4" />,
      trend: { value: -18, isPositive: true }
    }
  ];

  const currentQueue = [
    { 
      name: "Sarah Johnson", 
      time: "10:30 AM", 
      type: "Check-up", 
      priority: "Normal",
      room: "Room 201" 
    },
    { 
      name: "Michael Chen", 
      time: "11:00 AM", 
      type: "Follow-up", 
      priority: "High",
      room: "Room 203" 
    },
    { 
      name: "Emma Davis", 
      time: "11:30 AM", 
      type: "Oncology Consult", 
      priority: "Urgent",
      room: "Room 205" 
    },
    { 
      name: "Robert Wilson", 
      time: "12:00 PM", 
      type: "Lab Review", 
      priority: "Normal",
      room: "Room 207" 
    }
  ];

  const alerts = [
    {
      type: "critical",
      message: "Patient in Room 302 requires immediate attention - Abnormal vital signs",
      time: "2 min ago"
    },
    {
      type: "warning", 
      message: "Lab results pending review for 5 patients",
      time: "15 min ago"
    },
    {
      type: "info",
      message: "Daily medication inventory check completed",
      time: "1 hour ago"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-l-red-500 bg-red-50';
      case 'warning': return 'border-l-yellow-500 bg-yellow-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  return (
    <MainLayout>
      <PageHeader
        title="Clinical Dashboard"
        description="Monitor daily clinical operations and patient care"
        breadcrumbs={[
          { label: 'Clinical', link: '/clinical' },
          { label: 'Dashboard' }
        ]}
      />
      
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {todayStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Patient Queue */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                <Stethoscope className="h-5 w-5 mr-2 text-primary" />
                Current Patient Queue
              </CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentQueue.map((patient, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-sm">{patient.name}</p>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getPriorityColor(patient.priority)}`}
                        >
                          {patient.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground space-x-4">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {patient.time}
                        </span>
                        <span className="flex items-center">
                          <Bed className="h-3 w-3 mr-1" />
                          {patient.room}
                        </span>
                        <span>{patient.type}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Critical Alerts */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-primary" />
                Critical Alerts
              </CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <div key={index} className={`p-3 border-l-4 rounded-r-lg ${getAlertColor(alert.type)}`}>
                    <p className="text-sm font-medium mb-1">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Patients */}
        <RecentPatients />

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex flex-col items-center space-y-2">
                <Users className="h-6 w-6" />
                <span className="text-sm">New Patient</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center space-y-2">
                <Calendar className="h-6 w-6" />
                <span className="text-sm">Schedule</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center space-y-2">
                <Activity className="h-6 w-6" />
                <span className="text-sm">Vitals Entry</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center space-y-2">
                <Heart className="h-6 w-6" />
                <span className="text-sm">Emergency</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ClinicalDashboard;