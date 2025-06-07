
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, MapPin, Phone, Plus, Filter } from 'lucide-react';

const AppointmentsPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const appointments = [
    {
      id: 'APT001',
      patientName: 'John Smith',
      patientId: 'P001',
      time: '09:00 AM',
      duration: '30 min',
      type: 'Consultation',
      status: 'confirmed',
      provider: 'Dr. Sarah Martinez',
      room: 'Room 101',
      phone: '+1 (555) 123-4567',
      notes: 'Follow-up visit for treatment plan review'
    },
    {
      id: 'APT002',
      patientName: 'Sarah Johnson',
      patientId: 'P002',
      time: '10:30 AM',
      duration: '45 min',
      type: 'Treatment',
      status: 'confirmed',
      provider: 'Dr. Michael Chen',
      room: 'Room 203',
      phone: '+1 (555) 234-5678',
      notes: 'Chemotherapy session - cycle 3'
    },
    {
      id: 'APT003',
      patientName: 'Michael Brown',
      patientId: 'P003',
      time: '02:00 PM',
      duration: '60 min',
      type: 'Screening',
      status: 'pending',
      provider: 'Dr. Elena Rodriguez',
      room: 'Room 105',
      phone: '+1 (555) 345-6789',
      notes: 'Initial screening for clinical trial eligibility'
    },
    {
      id: 'APT004',
      patientName: 'Emily Davis',
      patientId: 'P004',
      time: '03:30 PM',
      duration: '30 min',
      type: 'Follow-up',
      status: 'confirmed',
      provider: 'Dr. Sarah Martinez',
      room: 'Room 101',
      phone: '+1 (555) 456-7890',
      notes: 'Post-treatment assessment'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'pending': return 'secondary';
      case 'cancelled': return 'destructive';
      case 'completed': return 'outline';
      default: return 'outline';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Consultation': return 'text-blue-600';
      case 'Treatment': return 'text-green-600';
      case 'Screening': return 'text-purple-600';
      case 'Follow-up': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Appointments</h1>
            <p className="text-muted-foreground">Manage patient appointments and schedules</p>
          </div>
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Appointment
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{appointments.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {appointments.filter(a => a.status === 'confirmed').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {appointments.filter(a => a.status === 'pending').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Available Slots</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">6</div>
            </CardContent>
          </Card>
        </div>

        {/* Appointments List */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>Today's Schedule</CardTitle>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-2 border rounded-md text-sm"
                />
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                      <div className="space-y-3 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <h3 className="font-semibold text-lg">{appointment.patientName}</h3>
                          <div className="flex gap-2">
                            <Badge variant={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                            <Badge variant="outline" className={getTypeColor(appointment.type)}>
                              {appointment.type}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.time} ({appointment.duration})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.provider}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.room}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.phone}</span>
                          </div>
                        </div>

                        {appointment.notes && (
                          <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                            <strong>Notes:</strong> {appointment.notes}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-row lg:flex-col gap-2 lg:w-32">
                        <Button variant="outline" size="sm" className="flex-1">
                          Check In
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Reschedule
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AppointmentsPage;
