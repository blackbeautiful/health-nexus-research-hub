
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Clock, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const CheckInOutPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const appointments = [
    {
      id: 'A001',
      time: '09:00',
      patientName: 'John Smith',
      patientId: 'P001',
      provider: 'Dr. Sarah Johnson',
      type: 'Follow-up',
      status: 'Scheduled',
      phone: '(555) 123-4567'
    },
    {
      id: 'A002',
      time: '09:30',
      patientName: 'Maria Garcia',
      patientId: 'P002',
      provider: 'Dr. Michael Brown',
      type: 'Consultation',
      status: 'Checked In',
      phone: '(555) 987-6543'
    },
    {
      id: 'A003',
      time: '10:00',
      patientName: 'Robert Johnson',
      patientId: 'P003',
      provider: 'Dr. Emily Davis',
      type: 'Annual Physical',
      status: 'In Progress',
      phone: '(555) 456-7890'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      'Scheduled': { variant: 'secondary' as const, icon: Clock },
      'Checked In': { variant: 'default' as const, icon: CheckCircle },
      'In Progress': { variant: 'default' as const, icon: AlertCircle },
      'Completed': { variant: 'secondary' as const, icon: CheckCircle },
      'No Show': { variant: 'destructive' as const, icon: XCircle }
    };
    
    const config = variants[status as keyof typeof variants];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const handleCheckIn = (appointmentId: string) => {
    console.log('Checking in appointment:', appointmentId);
  };

  const handleCheckOut = (appointmentId: string) => {
    console.log('Checking out appointment:', appointmentId);
  };

  return (
    <Layout title="Check-in/Check-out">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Patient Check-in/Check-out</h1>
          <p className="text-muted-foreground">Manage patient arrivals and departures</p>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by patient name, ID, or appointment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Check-in/out Tabs */}
        <Tabs defaultValue="today" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Today's Appointments</TabsTrigger>
            <TabsTrigger value="checkedin">Checked In</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4">
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Clock className="h-5 w-5" />
                          {appointment.time} - {appointment.patientName}
                        </CardTitle>
                        <CardDescription>
                          ID: {appointment.patientId} | {appointment.type}
                        </CardDescription>
                      </div>
                      {getStatusBadge(appointment.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <User className="h-4 w-4 mr-2" />
                          Provider: {appointment.provider}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Phone: {appointment.phone}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {appointment.status === 'Scheduled' && (
                          <Button onClick={() => handleCheckIn(appointment.id)}>
                            Check In
                          </Button>
                        )}
                        {appointment.status === 'In Progress' && (
                          <Button onClick={() => handleCheckOut(appointment.id)}>
                            Check Out
                          </Button>
                        )}
                        <Button variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="checkedin" className="space-y-4">
            <div className="space-y-4">
              {appointments.filter(a => a.status === 'Checked In' || a.status === 'In Progress').map((appointment) => (
                <Card key={appointment.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{appointment.patientName}</CardTitle>
                        <CardDescription>
                          {appointment.time} | {appointment.provider}
                        </CardDescription>
                      </div>
                      {getStatusBadge(appointment.status)}
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Completed Appointments</CardTitle>
                <CardDescription>Patients who have completed their visits today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  No completed appointments yet today
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CheckInOutPage;
