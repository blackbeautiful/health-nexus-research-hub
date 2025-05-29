
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Activity, Heart, Thermometer, Droplets, TrendingUp } from 'lucide-react';

const VitalSignsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const vitalRecords = [
    {
      id: 'V001',
      patientId: 'P001',
      patientName: 'John Smith',
      date: '2025-01-15',
      time: '14:30',
      bloodPressure: '120/80',
      heartRate: 72,
      temperature: 98.6,
      respiratoryRate: 16,
      oxygenSaturation: 98,
      weight: 180,
      height: 72,
      recordedBy: 'Nurse Sarah Wilson'
    },
    {
      id: 'V002',
      patientId: 'P002',
      patientName: 'Maria Garcia',
      date: '2025-01-15',
      time: '13:15',
      bloodPressure: '140/90',
      heartRate: 85,
      temperature: 99.2,
      respiratoryRate: 18,
      oxygenSaturation: 96,
      weight: 145,
      height: 65,
      recordedBy: 'Nurse Sarah Wilson'
    }
  ];

  const getVitalStatus = (vital: string, value: number) => {
    // Simple vital signs status logic
    if (vital === 'heartRate') {
      if (value < 60 || value > 100) return 'abnormal';
      return 'normal';
    }
    if (vital === 'temperature') {
      if (value > 100.4 || value < 96.8) return 'abnormal';
      return 'normal';
    }
    if (vital === 'oxygenSaturation') {
      if (value < 95) return 'abnormal';
      return 'normal';
    }
    return 'normal';
  };

  const getStatusBadge = (status: string) => {
    return status === 'normal' ? 
      <Badge className="bg-green-100 text-green-800">Normal</Badge> : 
      <Badge variant="destructive">Abnormal</Badge>;
  };

  return (
    <Layout title="Vital Signs">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Vital Signs</h1>
            <p className="text-muted-foreground">Monitor and track patient vital signs</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Record Vitals
          </Button>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by patient name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Vital Signs Tabs */}
        <Tabs defaultValue="recent" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recent">Recent Vitals</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="space-y-4">
            <div className="space-y-4">
              {vitalRecords.map((record) => (
                <Card key={record.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{record.patientName}</CardTitle>
                        <CardDescription>
                          ID: {record.patientId} | {record.date} at {record.time}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">{record.recordedBy}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm font-medium">
                          <Activity className="h-4 w-4 mr-1 text-blue-500" />
                          Blood Pressure
                        </div>
                        <div className="text-lg font-semibold">{record.bloodPressure} mmHg</div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center text-sm font-medium">
                          <Heart className="h-4 w-4 mr-1 text-red-500" />
                          Heart Rate
                        </div>
                        <div className="text-lg font-semibold">{record.heartRate} bpm</div>
                        {getStatusBadge(getVitalStatus('heartRate', record.heartRate))}
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center text-sm font-medium">
                          <Thermometer className="h-4 w-4 mr-1 text-orange-500" />
                          Temperature
                        </div>
                        <div className="text-lg font-semibold">{record.temperature}°F</div>
                        {getStatusBadge(getVitalStatus('temperature', record.temperature))}
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center text-sm font-medium">
                          <Activity className="h-4 w-4 mr-1 text-green-500" />
                          Respiratory Rate
                        </div>
                        <div className="text-lg font-semibold">{record.respiratoryRate}/min</div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center text-sm font-medium">
                          <Droplets className="h-4 w-4 mr-1 text-blue-600" />
                          Oxygen Sat.
                        </div>
                        <div className="text-lg font-semibold">{record.oxygenSaturation}%</div>
                        {getStatusBadge(getVitalStatus('oxygenSaturation', record.oxygenSaturation))}
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-sm font-medium">Weight/Height</div>
                        <div className="text-lg font-semibold">{record.weight}lb / {record.height}in</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Vital Signs Trends
                </CardTitle>
                <CardDescription>Track changes in vital signs over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Vital signs trend charts would be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vital Signs Alerts</CardTitle>
                <CardDescription>Abnormal vital signs requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border-l-4 border-red-500 bg-red-50">
                    <div className="font-medium">Maria Garcia - Elevated Temperature</div>
                    <div className="text-sm text-muted-foreground">Temperature: 99.2°F (Normal: <100.4°F)</div>
                  </div>
                  <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
                    <div className="font-medium">Maria Garcia - Low Oxygen Saturation</div>
                    <div className="text-sm text-muted-foreground">O2 Sat: 96% (Normal: >95%)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default VitalSignsPage;
