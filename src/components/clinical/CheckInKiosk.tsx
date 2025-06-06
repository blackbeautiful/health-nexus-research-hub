
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, User, CheckCircle, AlertTriangle, UserPlus, Phone } from 'lucide-react';

interface CheckInKioskProps {
  onCheckIn?: (appointmentId: string) => void;
  onNewPatientRegistration?: () => void;
  onWalkInRegistration?: () => void;
}

const CheckInKiosk: React.FC<CheckInKioskProps> = ({ 
  onCheckIn, 
  onNewPatientRegistration,
  onWalkInRegistration 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('scheduled');

  const appointments = [
    {
      id: 'APT001',
      patientName: 'Sarah Johnson',
      patientId: 'P001',
      time: '09:30 AM',
      provider: 'Dr. Martinez',
      type: 'Follow-up',
      status: 'scheduled',
      phone: '(555) 123-4567'
    },
    {
      id: 'APT002',
      patientName: 'Michael Smith',
      patientId: 'P002',
      time: '10:00 AM',
      provider: 'Dr. Wilson',
      type: 'New Patient',
      status: 'checked-in',
      phone: '(555) 987-6543'
    },
    {
      id: 'APT003',
      patientName: 'Emma Thompson',
      patientId: 'P003',
      time: '10:30 AM',
      provider: 'Dr. Rodriguez',
      type: 'Lab Review',
      status: 'scheduled',
      phone: '(555) 456-7890'
    }
  ];

  const handleCheckIn = (appointmentId: string) => {
    setSelectedAppointment(appointmentId);
    onCheckIn?.(appointmentId);
  };

  const handleNewPatient = () => {
    onNewPatientRegistration?.();
    // In a real app, this would navigate to registration
    console.log('New patient registration started');
  };

  const handleWalkIn = () => {
    onWalkInRegistration?.();
    // In a real app, this would open a walk-in form
    console.log('Walk-in registration started');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'checked-in':
        return <Badge className="bg-green-100 text-green-800">Checked In</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredAppointments = appointments.filter(apt => 
    apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apt.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apt.patientId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Patient Check-In</CardTitle>
          <CardDescription>Find your appointment, register as new patient, or check-in as walk-in</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="scheduled">Scheduled Appointment</TabsTrigger>
              <TabsTrigger value="new-patient">New Patient</TabsTrigger>
              <TabsTrigger value="walk-in">Walk-In</TabsTrigger>
            </TabsList>

            <TabsContent value="scheduled" className="space-y-4 mt-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search by name, patient ID, or appointment ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-lg p-4"
                />
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredAppointments.map((appointment) => (
                  <Card key={appointment.id} className="border-2 hover:border-blue-300 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <User className="h-5 w-5 text-blue-500 flex-shrink-0" />
                            <h3 className="text-lg font-semibold truncate">{appointment.patientName}</h3>
                            {getStatusBadge(appointment.status)}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate">{appointment.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate">{appointment.provider}</span>
                            </div>
                            <div className="truncate">{appointment.type}</div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate">{appointment.phone}</span>
                            </div>
                          </div>
                        </div>
                        <div className="w-full md:w-auto">
                          {appointment.status === 'scheduled' ? (
                            <Button 
                              size="lg"
                              onClick={() => handleCheckIn(appointment.id)}
                              className="w-full md:w-auto px-8"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Check In
                            </Button>
                          ) : (
                            <Button variant="outline" size="lg" disabled className="w-full md:w-auto">
                              Already Checked In
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {searchQuery && filteredAppointments.length === 0 && (
                  <Card className="border-yellow-200 bg-yellow-50">
                    <CardContent className="p-4 text-center">
                      <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                      <h3 className="text-lg font-semibold text-yellow-800">No appointments found</h3>
                      <p className="text-yellow-700 mb-4">We couldn't find any appointments matching your search.</p>
                      <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <Button onClick={() => setActiveTab('new-patient')} variant="outline">
                          Register as New Patient
                        </Button>
                        <Button onClick={() => setActiveTab('walk-in')} variant="outline">
                          Check-in as Walk-in
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="new-patient" className="space-y-4 mt-4">
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-6 text-center">
                  <UserPlus className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">New Patient Registration</h3>
                  <p className="text-blue-700 mb-6">
                    Welcome to our clinic! Please complete the registration process to create your patient profile and schedule your first appointment.
                  </p>
                  <Button size="lg" onClick={handleNewPatient} className="px-8">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Start Registration
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="walk-in" className="space-y-4 mt-4">
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-6 text-center">
                  <Clock className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-orange-800 mb-2">Walk-In Patient</h3>
                  <p className="text-orange-700 mb-6">
                    No appointment? No problem! We accept walk-in patients based on availability. Please note that wait times may vary.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-orange-200">
                      <h4 className="font-semibold text-orange-800 mb-2">Current Wait Time</h4>
                      <p className="text-2xl font-bold text-orange-600">~45 minutes</p>
                    </div>
                    <Button size="lg" onClick={handleWalkIn} className="px-8">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Join Walk-In Queue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {selectedAppointment && (
            <Card className="border-green-200 bg-green-50 mt-4">
              <CardContent className="p-4 text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-green-800">Check-In Successful!</h3>
                <p className="text-green-700">Please take a seat. A nurse will call you shortly.</p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckInKiosk;
