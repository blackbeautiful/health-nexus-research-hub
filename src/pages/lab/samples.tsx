
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Plus, Scan, Clock, MapPin, AlertCircle } from 'lucide-react';

const SampleTrackingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const samples = [
    {
      id: 'S001234',
      patientId: 'P001',
      patientName: 'John Smith',
      type: 'Blood',
      test: 'Complete Blood Count',
      status: 'Processing',
      location: 'Lab Station 2',
      collected: '2025-01-15 08:30',
      priority: 'Normal'
    },
    {
      id: 'S001235',
      patientId: 'P002',
      patientName: 'Maria Garcia',
      type: 'Urine',
      test: 'Urinalysis',
      status: 'Completed',
      location: 'Archive',
      collected: '2025-01-15 09:15',
      priority: 'Normal'
    },
    {
      id: 'S001236',
      patientId: 'P003',
      patientName: 'Robert Johnson',
      type: 'Blood',
      test: 'Cardiac Enzymes',
      status: 'Pending',
      location: 'Collection Area',
      collected: '2025-01-15 10:00',
      priority: 'Urgent'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      'Pending': 'secondary',
      'Processing': 'default',
      'Completed': 'secondary',
      'Rejected': 'destructive'
    };
    return <Badge variant={variants[status as keyof typeof variants] as any}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    return priority === 'Urgent' ? 
      <Badge variant="destructive" className="ml-2">Urgent</Badge> : 
      <Badge variant="outline" className="ml-2">Normal</Badge>;
  };

  return (
    <Layout title="Sample Tracking">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Sample Tracking</h1>
            <p className="text-muted-foreground">Track laboratory samples throughout the testing process</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Scan className="h-4 w-4 mr-2" />
              Scan Sample
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Register Sample
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by sample ID, patient name, or test type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Sample Tracking Tabs */}
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active Samples</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            <div className="space-y-4">
              {samples.filter(s => s.status !== 'Completed').map((sample) => (
                <Card key={sample.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg flex items-center">
                          {sample.id}
                          {getPriorityBadge(sample.priority)}
                        </CardTitle>
                        <CardDescription>
                          {sample.patientName} (ID: {sample.patientId})
                        </CardDescription>
                      </div>
                      {getStatusBadge(sample.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="font-medium">Sample Type</div>
                        <div className="text-muted-foreground">{sample.type}</div>
                      </div>
                      <div>
                        <div className="font-medium">Test Requested</div>
                        <div className="text-muted-foreground">{sample.test}</div>
                      </div>
                      <div>
                        <div className="font-medium flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          Current Location
                        </div>
                        <div className="text-muted-foreground">{sample.location}</div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      Collected: {sample.collected}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <div className="space-y-4">
              {samples.filter(s => s.status === 'Completed').map((sample) => (
                <Card key={sample.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{sample.id}</CardTitle>
                        <CardDescription>
                          {sample.patientName} (ID: {sample.patientId})
                        </CardDescription>
                      </div>
                      {getStatusBadge(sample.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      {sample.type} - {sample.test}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-yellow-500" />
                  Sample Alerts
                </CardTitle>
                <CardDescription>Samples requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  No alerts at this time
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SampleTrackingPage;
