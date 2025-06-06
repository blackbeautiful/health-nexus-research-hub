
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, CheckCircle, AlertTriangle } from 'lucide-react';

interface CheckInKioskProps {
  onCheckIn?: (appointmentId: string) => void;
}

const CheckInKiosk: React.FC<CheckInKioskProps> = ({ onCheckIn }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);

  const appointments = [
    {
      id: 'APT001',
      patientName: 'Sarah Johnson',
      time: '09:30 AM',
      provider: 'Dr. Martinez',
      type: 'Follow-up',
      status: 'scheduled'
    },
    {
      id: 'APT002',
      patientName: 'Michael Smith',
      time: '10:00 AM',
      provider: 'Dr. Wilson',
      type: 'New Patient',
      status: 'checked-in'
    },
    {
      id: 'APT003',
      patientName: 'Emma Thompson',
      time: '10:30 AM',
      provider: 'Dr. Rodriguez',
      type: 'Lab Review',
      status: 'scheduled'
    }
  ];

  const handleCheckIn = (appointmentId: string) => {
    setSelectedAppointment(appointmentId);
    onCheckIn?.(appointmentId);
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

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Patient Check-In Kiosk</CardTitle>
          <CardDescription>Find your appointment and check in</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search by name or appointment ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-lg p-4"
              />
            </div>

            <div className="space-y-3">
              {appointments
                .filter(apt => 
                  apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  apt.id.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((appointment) => (
                  <Card key={appointment.id} className="border-2 hover:border-blue-300 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <User className="h-5 w-5 text-blue-500" />
                            <h3 className="text-lg font-semibold">{appointment.patientName}</h3>
                            {getStatusBadge(appointment.status)}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {appointment.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {appointment.provider}
                            </div>
                            <div>{appointment.type}</div>
                          </div>
                        </div>
                        <div className="ml-4">
                          {appointment.status === 'scheduled' ? (
                            <Button 
                              size="lg"
                              onClick={() => handleCheckIn(appointment.id)}
                              className="px-8"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Check In
                            </Button>
                          ) : (
                            <Button variant="outline" size="lg" disabled>
                              Already Checked In
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            {selectedAppointment && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4 text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-green-800">Check-In Successful!</h3>
                  <p className="text-green-700">Please take a seat. A nurse will call you shortly.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckInKiosk;
