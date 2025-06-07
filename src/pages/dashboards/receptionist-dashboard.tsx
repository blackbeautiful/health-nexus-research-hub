
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Users, 
  Phone, 
  Clock,
  CheckCircle,
  AlertCircle,
  UserPlus,
  FileText,
  MessageSquare
} from 'lucide-react';

const ReceptionistDashboard = () => {
  const todayAppointments = [
    { id: 1, time: '9:00 AM', patient: 'Sarah Johnson', doctor: 'Dr. Martinez', type: 'Follow-up', status: 'checked-in' },
    { id: 2, time: '9:30 AM', patient: 'Michael Chen', doctor: 'Dr. Wilson', type: 'Consultation', status: 'scheduled' },
    { id: 3, time: '10:00 AM', patient: 'Emma Davis', doctor: 'Dr. Lopez', type: 'Pre-surgery', status: 'checked-in' },
    { id: 4, time: '10:30 AM', patient: 'Robert Wilson', doctor: 'Dr. Martinez', type: 'Treatment', status: 'in-progress' },
    { id: 5, time: '11:00 AM', patient: 'Jennifer Brown', doctor: 'Dr. Chen', type: 'Follow-up', status: 'scheduled' },
    { id: 6, time: '11:30 AM', patient: 'David Lee', doctor: 'Dr. Wilson', type: 'Consultation', status: 'scheduled' }
  ];

  const checkInQueue = [
    { id: 1, patient: 'Maria Garcia', appointmentTime: '2:00 PM', doctor: 'Dr. Martinez', arrived: '1:45 PM' },
    { id: 2, patient: 'James Smith', appointmentTime: '2:30 PM', doctor: 'Dr. Lopez', arrived: '2:15 PM' },
    { id: 3, patient: 'Lisa Anderson', appointmentTime: '3:00 PM', doctor: 'Dr. Wilson', arrived: '2:55 PM' }
  ];

  const recentCalls = [
    { id: 1, caller: 'John Doe', purpose: 'Appointment booking', time: '1:30 PM', duration: '3 min', status: 'completed' },
    { id: 2, caller: 'Susan Miller', purpose: 'Insurance inquiry', time: '1:15 PM', duration: '5 min', status: 'completed' },
    { id: 3, caller: 'Tom Brown', purpose: 'Test results', time: '12:45 PM', duration: '2 min', status: 'transferred' },
    { id: 4, caller: 'Emily Davis', purpose: 'Rescheduling', time: '12:30 PM', duration: '4 min', status: 'completed' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'checked-in': return 'secondary';
      case 'in-progress': return 'default';
      case 'scheduled': return 'outline';
      case 'completed': return 'secondary';
      case 'transferred': return 'default';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'checked-in': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'scheduled': return <Calendar className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Front Desk Dashboard</h1>
          <p className="text-gray-600">Welcome back, Reception Staff</p>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium">32 Appointments Today</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">3 Patients Waiting</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">18 Calls Handled</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">32</div>
              <p className="text-xs text-gray-600">6 checked in, 4 in progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Waiting Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">3</div>
              <p className="text-xs text-gray-600">In check-in queue</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Phone Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">18</div>
              <p className="text-xs text-gray-600">Handled today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">New Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">5</div>
              <p className="text-xs text-gray-600">Today</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Appointments */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Today's Appointments
                </CardTitle>
                <CardDescription>Current appointment schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todayAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="font-medium text-sm">{appointment.time}</div>
                        </div>
                        <div className="flex flex-col">
                          <h4 className="font-medium">{appointment.patient}</h4>
                          <p className="text-sm text-gray-600">{appointment.doctor}</p>
                          <p className="text-xs text-gray-500">{appointment.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(appointment.status)}
                        <Badge variant={getStatusColor(appointment.status)}>
                          {appointment.status.replace('-', ' ')}
                        </Badge>
                        <Button variant="outline" size="sm">
                          {appointment.status === 'scheduled' ? 'Check In' : 'View'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Check-in Queue */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Check-in Queue
                </CardTitle>
                <CardDescription>Patients waiting to be checked in</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {checkInQueue.map((patient) => (
                    <div key={patient.id} className="p-3 border rounded-lg">
                      <h4 className="font-medium text-sm">{patient.patient}</h4>
                      <p className="text-xs text-gray-600">{patient.doctor}</p>
                      <p className="text-xs text-gray-500">Appt: {patient.appointmentTime}</p>
                      <p className="text-xs text-gray-500">Arrived: {patient.arrived}</p>
                      <Button size="sm" className="w-full mt-2">Check In</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Calls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Recent Phone Calls
            </CardTitle>
            <CardDescription>Call log for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentCalls.map((call) => (
                <div key={call.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{call.caller}</h4>
                    <Badge variant={getStatusColor(call.status)} className="text-xs">
                      {call.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{call.purpose}</p>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>{call.time}</span>
                    <span>{call.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="flex items-center justify-center p-6">
              <div className="text-center">
                <UserPlus className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-medium">Register New Patient</h3>
                <p className="text-sm text-gray-600">Add new patient to system</p>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="flex items-center justify-center p-6">
              <div className="text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-medium">Schedule Appointment</h3>
                <p className="text-sm text-gray-600">Book new appointment</p>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="flex items-center justify-center p-6">
              <div className="text-center">
                <FileText className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <h3 className="font-medium">Patient Records</h3>
                <p className="text-sm text-gray-600">Access patient information</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReceptionistDashboard;
