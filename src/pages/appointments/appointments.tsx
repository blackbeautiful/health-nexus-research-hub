
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Plus, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AppointmentsPage = () => {
  const appointments = [
    { id: 'APT-001', patient: 'Sarah Johnson', time: '09:00 AM', date: '2025-01-16', type: 'Follow-up', status: 'Scheduled' },
    { id: 'APT-002', patient: 'Michael Smith', time: '10:30 AM', date: '2025-01-16', type: 'Consultation', status: 'Confirmed' },
    { id: 'APT-003', patient: 'Emma Thompson', time: '02:00 PM', date: '2025-01-16', type: 'Study Visit', status: 'In Progress' },
    { id: 'APT-004', patient: 'John Davis', time: '03:30 PM', date: '2025-01-16', type: 'Lab Work', status: 'Completed' }
  ];

  return (
    <MainLayout>
      <PageHeader
        title="Appointments"
        description="Manage patient appointments and scheduling"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Appointments' }
        ]}
        action={{
          label: 'Schedule Appointment',
          icon: Plus,
          onClick: () => console.log('Schedule appointment')
        }}
      />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Today's Schedule
              </CardTitle>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      {appointment.time}
                    </div>
                    <div>
                      <div className="font-medium">{appointment.patient}</div>
                      <div className="text-sm text-muted-foreground">{appointment.type}</div>
                    </div>
                  </div>
                  <Badge 
                    variant={
                      appointment.status === 'Completed' ? 'secondary' :
                      appointment.status === 'In Progress' ? 'default' :
                      'outline'
                    }
                  >
                    {appointment.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AppointmentsPage;
