
import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, User, MapPin, AlertCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';

type AppointmentType = 'chemotherapy' | 'consultation' | 'imaging' | 'lab' | 'other';

type Appointment = {
  id: string;
  title: string;
  type: AppointmentType;
  date: Date;
  startTime: string;
  endTime: string;
  provider: string;
  location: string;
  notes: string;
  status: 'upcoming' | 'completed' | 'cancelled';
};

const AppointmentsPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  
  const appointments: Appointment[] = [
    {
      id: '1',
      title: 'Chemotherapy Session - Cycle 5',
      type: 'chemotherapy',
      date: new Date('2025-03-12'),
      startTime: '09:00',
      endTime: '12:00',
      provider: 'Dr. Rebecca Martinez',
      location: 'Oncology Unit, Room 305',
      notes: 'Bring your medication list and insurance card.',
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Follow-up Consultation',
      type: 'consultation',
      date: new Date('2025-03-19'),
      startTime: '14:30',
      endTime: '15:00',
      provider: 'Dr. James Wilson',
      location: 'Main Clinic, Room 210',
      notes: 'Will discuss next treatment steps.',
      status: 'upcoming'
    },
    {
      id: '3',
      title: 'MRI Scan',
      type: 'imaging',
      date: new Date('2025-03-25'),
      startTime: '10:15',
      endTime: '11:30',
      provider: 'Radiology Department',
      location: 'Imaging Center, Floor 2',
      notes: 'No food or drink 4 hours before the appointment.',
      status: 'upcoming'
    },
    {
      id: '4',
      title: 'Blood Work',
      type: 'lab',
      date: new Date('2025-03-12'),
      startTime: '08:30',
      endTime: '09:00',
      provider: 'Lab Services',
      location: 'Main Clinic, Floor 1',
      notes: 'Fasting required for 8 hours.',
      status: 'upcoming'
    },
    {
      id: '5',
      title: 'Nutrition Consultation',
      type: 'other',
      date: new Date('2025-03-15'),
      startTime: '13:00',
      endTime: '14:00',
      provider: 'Sarah Johnson, RD',
      location: 'Main Clinic, Room 115',
      notes: 'Bring a food journal of the past 3 days.',
      status: 'upcoming'
    }
  ];
  
  const filteredAppointments = selectedDate 
    ? appointments.filter(
        appointment => appointment.date.toDateString() === selectedDate.toDateString()
      ) 
    : [];
    
  const allUpcomingAppointments = appointments.filter(
    appointment => appointment.status === 'upcoming' && appointment.date >= new Date()
  ).sort((a, b) => a.date.getTime() - b.date.getTime());

  const getAppointmentTypeBadge = (type: AppointmentType) => {
    switch(type) {
      case 'chemotherapy':
        return <Badge className="bg-blue-500">Chemotherapy</Badge>;
      case 'consultation':
        return <Badge className="bg-green-500">Consultation</Badge>;
      case 'imaging':
        return <Badge className="bg-purple-500">Imaging</Badge>;
      case 'lab':
        return <Badge className="bg-amber-500">Lab Work</Badge>;
      case 'other':
        return <Badge variant="outline">Other</Badge>;
    }
  };

  const handleNextDate = () => {
    if (!selectedDate) return;
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);
    setSelectedDate(nextDate);
  };

  const handlePrevDate = () => {
    if (!selectedDate) return;
    const prevDate = new Date(selectedDate);
    prevDate.setDate(prevDate.getDate() - 1);
    setSelectedDate(prevDate);
  };

  return (
    <Layout title="Appointments">
      <PageHeader 
        title="Appointments" 
        description="View and manage your medical appointments"
        breadcrumbs={[{ label: 'Appointments' }]}
        actions={
          <Button>
            <CalendarIcon className="mr-2 h-4 w-4" />
            Request Appointment
          </Button>
        }
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Schedule</CardTitle>
              <CardDescription>View your upcoming appointments</CardDescription>
            </div>
            <Tabs 
              defaultValue="day" 
              className="w-[260px]"
              value={viewMode}
              onValueChange={(value) => setViewMode(value as any)}
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <Button variant="outline" size="sm" onClick={handlePrevDate}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="font-medium text-lg">
                {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : ''}
              </h3>
              <Button variant="outline" size="sm" onClick={handleNextDate}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <TabsContent value="day" className="m-0">
              <div className="grid grid-cols-1 gap-4">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments
                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                    .map((appointment) => (
                      <Card key={appointment.id}>
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>
                                  {appointment.startTime} - {appointment.endTime}
                                </span>
                              </div>
                              <h4 className="font-medium text-lg mt-1">{appointment.title}</h4>
                              <div className="mt-2">{getAppointmentTypeBadge(appointment.type)}</div>
                            </div>
                            
                            <div className="space-y-2 md:text-right">
                              <div className="flex items-center md:justify-end gap-1">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span>{appointment.provider}</span>
                              </div>
                              <div className="flex items-center md:justify-end gap-1">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{appointment.location}</span>
                              </div>
                              {appointment.notes && (
                                <div className="flex items-start md:justify-end gap-1">
                                  <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                                  <span className="text-sm">{appointment.notes}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-0">
                          <Button variant="outline" size="sm">View Details</Button>
                          <div className="space-x-2">
                            <Button variant="outline" size="sm">Reschedule</Button>
                            <Button variant="destructive" size="sm">Cancel</Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))
                ) : (
                  <div className="text-center py-12">
                    <h3 className="font-medium text-lg">No appointments scheduled</h3>
                    <p className="text-muted-foreground mt-1">There are no appointments scheduled for this day.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="week" className="m-0">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {Array.from({ length: 7 }).map((_, index) => {
                  const date = new Date(selectedDate || new Date());
                  const firstDayOfWeek = date.getDate() - date.getDay();
                  date.setDate(firstDayOfWeek + index);
                  
                  const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
                  const hasAppointments = appointments.some(
                    a => a.date.toDateString() === date.toDateString()
                  );
                  
                  return (
                    <Button
                      key={index}
                      variant={isSelected ? "default" : "outline"}
                      className={`flex flex-col h-auto py-2 ${hasAppointments && !isSelected ? 'border-blue-400' : ''}`}
                      onClick={() => setSelectedDate(new Date(date))}
                    >
                      <span className="text-xs">{format(date, 'EEE')}</span>
                      <span className="font-bold">{format(date, 'd')}</span>
                      {hasAppointments && (
                        <span className="text-xs mt-1">
                          {appointments.filter(a => a.date.toDateString() === date.toDateString()).length} appt
                        </span>
                      )}
                    </Button>
                  );
                })}
              </div>
              
              <Separator className="my-4" />
              
              {filteredAppointments.length > 0 ? (
                <div className="space-y-4">
                  {filteredAppointments
                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                    .map((appointment) => (
                      <div key={appointment.id} className="flex gap-4 p-3 border rounded-md">
                        <div className="w-20 text-center">
                          <span className="block font-medium">{appointment.startTime}</span>
                          <span className="text-xs text-muted-foreground">to {appointment.endTime}</span>
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-medium">{appointment.title}</h4>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <span className="text-sm text-muted-foreground">{appointment.provider}</span>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{appointment.location}</span>
                          </div>
                        </div>
                        
                        <div>
                          {getAppointmentTypeBadge(appointment.type)}
                        </div>
                      </div>
                    ))
                  }
                </div>
              ) : (
                <div className="text-center py-8">
                  <h3 className="font-medium">No appointments scheduled</h3>
                  <p className="text-muted-foreground mt-1">There are no appointments scheduled for this day.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="month" className="m-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                modifiers={{
                  hasAppointment: (date) =>
                    appointments.some(a => a.date.toDateString() === date.toDateString()),
                }}
                modifiersClassNames={{
                  hasAppointment: "bg-blue-100 font-bold text-blue-700",
                }}
                disabled={{ before: new Date() }}
              />
              
              {selectedDate && (
                <>
                  <Separator className="my-4" />
                  <h3 className="font-medium mb-2">
                    Appointments for {format(selectedDate, 'MMMM d, yyyy')}
                  </h3>
                  
                  {filteredAppointments.length > 0 ? (
                    <div className="space-y-2">
                      {filteredAppointments
                        .sort((a, b) => a.startTime.localeCompare(b.startTime))
                        .map((appointment) => (
                          <div key={appointment.id} className="flex gap-3 p-2 border rounded-md">
                            <div className="text-center px-2 py-1 bg-muted rounded">
                              <span className="block text-xs">{appointment.startTime}</span>
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-sm">{appointment.title}</h5>
                              <span className="text-xs text-muted-foreground">{appointment.provider}</span>
                            </div>
                            <div>
                              {getAppointmentTypeBadge(appointment.type)}
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No appointments scheduled for this day.</p>
                  )}
                </>
              )}
            </TabsContent>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Next 30 days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {allUpcomingAppointments.length > 0 ? (
              allUpcomingAppointments.map((appointment) => (
                <div 
                  key={appointment.id} 
                  className="border rounded-md p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setSelectedDate(new Date(appointment.date))}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h4 className="font-medium">{appointment.title}</h4>
                    </div>
                    {getAppointmentTypeBadge(appointment.type)}
                  </div>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                      <span>{format(appointment.date, 'MMMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span>{appointment.startTime} - {appointment.endTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span>{appointment.provider}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span>{appointment.location}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <h3 className="font-medium">No upcoming appointments</h3>
                <p className="text-muted-foreground mt-1">
                  You have no scheduled appointments in the next 30 days.
                </p>
                <Button className="mt-4">Schedule Appointment</Button>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View All Appointments</Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default AppointmentsPage;
