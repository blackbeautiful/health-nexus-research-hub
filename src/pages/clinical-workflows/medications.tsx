
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Pill, Clock, CheckCircle, AlertTriangle, User } from 'lucide-react';

const MedicationAdministrationPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const medications = [
    {
      id: 'M001',
      patientId: 'P001',
      patientName: 'John Smith',
      medication: 'Metformin 500mg',
      dosage: '2 tablets',
      route: 'Oral',
      frequency: 'Twice daily',
      scheduledTime: '08:00',
      status: 'Pending',
      prescriber: 'Dr. Sarah Johnson',
      notes: 'Take with food'
    },
    {
      id: 'M002',
      patientId: 'P001',
      patientName: 'John Smith',
      medication: 'Lisinopril 10mg',
      dosage: '1 tablet',
      route: 'Oral',
      frequency: 'Once daily',
      scheduledTime: '09:00',
      status: 'Administered',
      prescriber: 'Dr. Sarah Johnson',
      administeredBy: 'Nurse Sarah Wilson',
      administeredTime: '09:15',
      notes: ''
    },
    {
      id: 'M003',
      patientId: 'P002',
      patientName: 'Maria Garcia',
      medication: 'Insulin Lispro',
      dosage: '5 units',
      route: 'Subcutaneous',
      frequency: 'Before meals',
      scheduledTime: '12:00',
      status: 'Overdue',
      prescriber: 'Dr. Michael Brown',
      notes: 'Check blood glucose before administration'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      'Pending': { variant: 'secondary' as const, icon: Clock },
      'Administered': { variant: 'secondary' as const, icon: CheckCircle },
      'Overdue': { variant: 'destructive' as const, icon: AlertTriangle },
      'Held': { variant: 'destructive' as const, icon: AlertTriangle }
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

  const handleAdminister = (medicationId: string) => {
    console.log('Administering medication:', medicationId);
  };

  const handleHold = (medicationId: string) => {
    console.log('Holding medication:', medicationId);
  };

  return (
    <Layout title="Medication Administration">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Medication Administration</h1>
            <p className="text-muted-foreground">Manage and track medication administration</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Administration
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Due Now</p>
                  <p className="text-2xl font-bold">{medications.filter(m => m.status === 'Pending').length}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Administered</p>
                  <p className="text-2xl font-bold">{medications.filter(m => m.status === 'Administered').length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overdue</p>
                  <p className="text-2xl font-bold">{medications.filter(m => m.status === 'Overdue').length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Meds</p>
                  <p className="text-2xl font-bold">{medications.length}</p>
                </div>
                <Pill className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by patient, medication, or prescriber..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Medication Tabs */}
        <Tabs defaultValue="due" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="due">Due Now</TabsTrigger>
            <TabsTrigger value="administered">Administered</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
            <TabsTrigger value="all">All Medications</TabsTrigger>
          </TabsList>

          <TabsContent value="due" className="space-y-4">
            <div className="space-y-4">
              {medications.filter(m => m.status === 'Pending').map((med) => (
                <Card key={med.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg flex items-center">
                          <Pill className="h-5 w-5 mr-2 text-blue-500" />
                          {med.medication}
                        </CardTitle>
                        <CardDescription>
                          {med.patientName} (ID: {med.patientId}) | Scheduled: {med.scheduledTime}
                        </CardDescription>
                      </div>
                      {getStatusBadge(med.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Dosage:</span> {med.dosage}
                        </div>
                        <div>
                          <span className="font-medium">Route:</span> {med.route}
                        </div>
                        <div>
                          <span className="font-medium">Frequency:</span> {med.frequency}
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <User className="h-4 w-4 mr-2" />
                        Prescribed by: {med.prescriber}
                      </div>
                      
                      {med.notes && (
                        <div className="text-sm bg-blue-50 p-3 rounded">
                          <span className="font-medium">Notes:</span> {med.notes}
                        </div>
                      )}
                      
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => handleHold(med.id)}>
                          Hold
                        </Button>
                        <Button onClick={() => handleAdminister(med.id)}>
                          Administer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="administered" className="space-y-4">
            <div className="space-y-4">
              {medications.filter(m => m.status === 'Administered').map((med) => (
                <Card key={med.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{med.medication}</CardTitle>
                        <CardDescription>
                          {med.patientName} | Administered: {med.administeredTime} by {med.administeredBy}
                        </CardDescription>
                      </div>
                      {getStatusBadge(med.status)}
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="overdue" className="space-y-4">
            <div className="space-y-4">
              {medications.filter(m => m.status === 'Overdue').map((med) => (
                <Card key={med.id} className="border-red-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg text-red-700">{med.medication}</CardTitle>
                        <CardDescription>
                          {med.patientName} | Was due: {med.scheduledTime}
                        </CardDescription>
                      </div>
                      {getStatusBadge(med.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => handleHold(med.id)}>
                        Hold
                      </Button>
                      <Button onClick={() => handleAdminister(med.id)}>
                        Administer Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            <div className="space-y-4">
              {medications.map((med) => (
                <Card key={med.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{med.medication}</CardTitle>
                        <CardDescription>{med.patientName}</CardDescription>
                      </div>
                      {getStatusBadge(med.status)}
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MedicationAdministrationPage;
