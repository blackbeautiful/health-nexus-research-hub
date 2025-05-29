
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, XCircle, TrendingUp, Calendar, FileText } from 'lucide-react';

const QualityControlPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const qualityMetrics = [
    { name: 'Sample Processing Time', value: 95, target: 90, status: 'good' },
    { name: 'Result Accuracy', value: 99.2, target: 98, status: 'excellent' },
    { name: 'Equipment Calibration', value: 88, target: 95, status: 'warning' },
    { name: 'Documentation Compliance', value: 97, target: 95, status: 'good' }
  ];

  const recentTests = [
    { id: 'QC001', test: 'Hemoglobin Control', result: 'Pass', date: '2025-01-15', technician: 'Mike Chen' },
    { id: 'QC002', test: 'Glucose Control', result: 'Pass', date: '2025-01-15', technician: 'Mike Chen' },
    { id: 'QC003', test: 'Electrolyte Panel', result: 'Fail', date: '2025-01-14', technician: 'Sarah Kim' },
    { id: 'QC004', test: 'Lipid Profile Control', result: 'Pass', date: '2025-01-14', technician: 'Mike Chen' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'good': return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <CheckCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getResultBadge = (result: string) => {
    return result === 'Pass' ? 
      <Badge className="bg-green-100 text-green-800">Pass</Badge> : 
      <Badge variant="destructive">Fail</Badge>;
  };

  return (
    <Layout title="Quality Control">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Laboratory Quality Control</h1>
            <p className="text-muted-foreground">Monitor and manage lab quality metrics</p>
          </div>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Generate QC Report
          </Button>
        </div>

        {/* Quality Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {qualityMetrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                {getStatusIcon(metric.status)}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}%</div>
                <Progress value={metric.value} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Target: {metric.target}%
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quality Control Tabs */}
        <Tabs defaultValue="tests" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tests">Recent Tests</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="calibration">Calibration</TabsTrigger>
          </TabsList>

          <TabsContent value="tests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Quality Control Tests</CardTitle>
                <CardDescription>Latest QC test results and status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTests.map((test) => (
                    <div key={test.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="font-medium">{test.test}</div>
                        <div className="text-sm text-muted-foreground">
                          ID: {test.id} | {test.date} | {test.technician}
                        </div>
                      </div>
                      {getResultBadge(test.result)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Quality Trends
                </CardTitle>
                <CardDescription>Quality metrics over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Quality trend charts would be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calibration" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Equipment Calibration
                </CardTitle>
                <CardDescription>Equipment calibration schedule and status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Equipment calibration tracking would be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default QualityControlPage;
