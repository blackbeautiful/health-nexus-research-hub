
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TestTube, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Microscope,
  Calendar,
  Activity,
  FileText
} from 'lucide-react';

const LabTechDashboard = () => {
  const pendingSamples = [
    { id: 'LAB001', patient: 'Sarah Johnson', type: 'Blood Chemistry Panel', priority: 'high', received: '8:30 AM', estimatedCompletion: '11:30 AM' },
    { id: 'LAB002', patient: 'Michael Chen', type: 'Complete Blood Count', priority: 'medium', received: '9:15 AM', estimatedCompletion: '12:15 PM' },
    { id: 'LAB003', patient: 'Emma Davis', type: 'Tumor Markers', priority: 'high', received: '9:45 AM', estimatedCompletion: '2:45 PM' },
    { id: 'LAB004', patient: 'Robert Wilson', type: 'Liver Function Tests', priority: 'low', received: '10:00 AM', estimatedCompletion: '1:00 PM' }
  ];

  const completedTests = [
    { id: 'LAB098', patient: 'Jennifer Brown', type: 'Glucose Test', completedAt: '10:30 AM', status: 'normal' },
    { id: 'LAB097', patient: 'David Lee', type: 'Lipid Panel', completedAt: '10:15 AM', status: 'abnormal' },
    { id: 'LAB096', patient: 'Maria Garcia', type: 'Thyroid Function', completedAt: '9:45 AM', status: 'normal' },
    { id: 'LAB095', patient: 'James Smith', type: 'Kidney Function', completedAt: '9:30 AM', status: 'critical' }
  ];

  const equipmentStatus = [
    { name: 'Automated Chemistry Analyzer', status: 'operational', lastMaintenance: '2025-01-05', nextMaintenance: '2025-01-19' },
    { name: 'Hematology Analyzer', status: 'maintenance', lastMaintenance: '2025-01-08', nextMaintenance: '2025-01-22' },
    { name: 'Immunoassay Analyzer', status: 'operational', lastMaintenance: '2025-01-03', nextMaintenance: '2025-01-17' },
    { name: 'Microscope Station 1', status: 'operational', lastMaintenance: '2025-01-07', nextMaintenance: '2025-01-21' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'secondary';
      case 'abnormal': return 'default';
      case 'critical': return 'destructive';
      case 'operational': return 'secondary';
      case 'maintenance': return 'default';
      default: return 'outline';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Laboratory Dashboard</h1>
          <p className="text-gray-600">Welcome back, Lab Tech Mike Chen</p>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2">
              <TestTube className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">12 Samples Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">28 Tests Completed Today</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium">1 Equipment in Maintenance</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Samples</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">12</div>
              <p className="text-xs text-gray-600">Awaiting processing</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">28</div>
              <p className="text-xs text-gray-600">Today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Critical Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">3</div>
              <p className="text-xs text-gray-600">Require immediate attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Turnaround Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">2.5h</div>
              <p className="text-xs text-gray-600">Average today</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Samples */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5" />
                Pending Samples
              </CardTitle>
              <CardDescription>Samples awaiting processing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingSamples.map((sample) => (
                  <div key={sample.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{sample.id}</h4>
                        <Badge variant={getPriorityColor(sample.priority)}>
                          {sample.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{sample.patient}</p>
                      <p className="text-sm">{sample.type}</p>
                      <p className="text-xs text-gray-500">Received: {sample.received}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">ETA: {sample.estimatedCompletion}</p>
                      <Button variant="outline" size="sm" className="mt-2">Process</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Completed Tests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Recent Completed Tests
              </CardTitle>
              <CardDescription>Tests completed in the last hour</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedTests.map((test) => (
                  <div key={test.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex flex-col">
                      <h4 className="font-medium">{test.id}</h4>
                      <p className="text-sm text-gray-600">{test.patient}</p>
                      <p className="text-sm">{test.type}</p>
                      <p className="text-xs text-gray-500">Completed: {test.completedAt}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={getStatusColor(test.status)}>
                        {test.status}
                      </Badge>
                      <Button variant="outline" size="sm" className="mt-2 block">View Results</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Equipment Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Microscope className="h-5 w-5" />
              Equipment Status
            </CardTitle>
            <CardDescription>Current status of laboratory equipment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {equipmentStatus.map((equipment, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{equipment.name}</h4>
                    <Badge variant={getStatusColor(equipment.status)}>
                      {equipment.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-xs text-gray-500">
                    <p>Last maintenance: {equipment.lastMaintenance}</p>
                    <p>Next maintenance: {equipment.nextMaintenance}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default LabTechDashboard;
