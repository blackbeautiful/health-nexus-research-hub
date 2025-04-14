
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays, Grid, List, Plus, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const AppointmentsPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  return (
    <MainLayout>
      <PageHeader 
        title="Appointments" 
        description="Schedule and manage patient appointments"
        breadcrumbs={[{ label: 'Appointments' }]}
        action={{
          label: "New Appointment",
          icon: Plus,
          onClick: () => console.log("Create new appointment")
        }}
      />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <Tabs defaultValue="upcoming" className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="canceled">Canceled</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center mr-2">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <CalendarDays className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Select defaultValue="all">
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="consultation">Consultation</SelectItem>
              <SelectItem value="treatment">Treatment</SelectItem>
              <SelectItem value="followup">Follow-up</SelectItem>
              <SelectItem value="imaging">Imaging</SelectItem>
              <SelectItem value="lab">Lab Work</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Card className="col-span-1 md:row-span-2">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Select a date to view appointments</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
          <CardFooter className="flex justify-between pt-6">
            <Button variant="outline" size="sm">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Today
            </Button>
            <Button variant="outline" size="sm">
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>April 14, 2025</CardTitle>
            <CardDescription>Today's appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  time: "09:00 AM",
                  patient: "Sarah Johnson",
                  type: "Chemotherapy",
                  doctor: "Dr. Rebecca Martinez",
                  status: "checked-in"
                },
                {
                  time: "11:30 AM",
                  patient: "Michael Chen",
                  type: "Consultation",
                  doctor: "Dr. James Wilson",
                  status: "scheduled"
                },
                {
                  time: "02:15 PM",
                  patient: "Emily Rodriguez",
                  type: "Follow-up",
                  doctor: "Dr. Rebecca Martinez",
                  status: "scheduled"
                }
              ].map((appointment, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-center w-[60px]">
                      <span className="font-medium">{appointment.time}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{appointment.patient}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{appointment.type}</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{appointment.doctor}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={appointment.status === "checked-in" ? "default" : "outline"}>
                      {appointment.status === "checked-in" ? "Checked In" : "Scheduled"}
                    </Badge>
                    <Button variant="ghost" size="sm">Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  date: "Apr 15, 2025",
                  time: "10:00 AM",
                  patient: "Robert Chang",
                  type: "Lab Work",
                  doctor: "Dr. Jessica Lee",
                  status: "scheduled"
                },
                {
                  date: "Apr 16, 2025",
                  time: "01:45 PM",
                  patient: "Maria Santos",
                  type: "Chemotherapy",
                  doctor: "Dr. Rebecca Martinez",
                  status: "scheduled"
                },
                {
                  date: "Apr 18, 2025",
                  time: "11:15 AM",
                  patient: "Thomas Wright",
                  type: "Imaging",
                  doctor: "Dr. James Wilson",
                  status: "scheduled"
                }
              ].map((appointment, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-center w-[90px]">
                      <span className="text-xs text-muted-foreground block">{appointment.date}</span>
                      <span className="font-medium">{appointment.time}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{appointment.patient}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{appointment.type}</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{appointment.doctor}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Scheduled</Badge>
                    <Button variant="ghost" size="sm">Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View All Appointments</Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AppointmentsPage;
