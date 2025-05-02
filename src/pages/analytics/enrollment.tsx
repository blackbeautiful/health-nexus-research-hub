
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, Filter } from 'lucide-react';
import EnrollmentMetrics, { EnrollmentData } from '@/components/analytics/EnrollmentMetrics';

const EnrollmentAnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('year');
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  // Sample enrollment data
  const enrollmentData = {
    overview: {
      totalPatients: 825,
      activePatientsCount: 512,
      completedPatientsCount: 214,
      withdrawnPatientsCount: 57,
      screeningFailureCount: 42
    },
    byStudy: [
      {
        name: "BEACON-CRC Phase II Trial",
        total: 325,
        active: 218,
        completed: 73,
        withdrawn: 22,
        screeningFailure: 12
      },
      {
        name: "BRAVADO Metastatic Breast Cancer Study",
        total: 285,
        active: 174,
        completed: 82,
        withdrawn: 19,
        screeningFailure: 10
      },
      {
        name: "PALADIN Lung Cancer Immunotherapy Trial",
        total: 215,
        active: 120,
        completed: 59,
        withdrawn: 16,
        screeningFailure: 20
      }
    ],
    enrollmentTrend: [
      { month: 'Jan', patients: 32, enrolled: 28, completed: 12 },
      { month: 'Feb', patients: 37, enrolled: 31, completed: 15 },
      { month: 'Mar', patients: 41, enrolled: 33, completed: 17 },
      { month: 'Apr', patients: 35, enrolled: 29, completed: 14 },
      { month: 'May', patients: 45, enrolled: 38, completed: 19 },
      { month: 'Jun', patients: 49, enrolled: 42, completed: 21 },
      { month: 'Jul', patients: 52, enrolled: 46, completed: 23 },
      { month: 'Aug', patients: 38, enrolled: 33, completed: 16 },
      { month: 'Sep', patients: 42, enrolled: 36, completed: 18 },
      { month: 'Oct', patients: 47, enrolled: 40, completed: 20 },
      { month: 'Nov', patients: 43, enrolled: 37, completed: 19 },
      { month: 'Dec', patients: 38, enrolled: 32, completed: 16 }
    ]
  };

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
  };

  return (
    <MainLayout>
      <PageHeader 
        title="Enrollment Analytics" 
        description="Track patient enrollment metrics and trends across studies"
        breadcrumbs={[
          { label: 'Analytics', link: '/analytics' },
          { label: 'Enrollment' }
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enrollmentData.overview.totalPatients}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{enrollmentData.overview.activePatientsCount}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((enrollmentData.overview.activePatientsCount / enrollmentData.overview.totalPatients) * 100)}% of total
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{enrollmentData.overview.completedPatientsCount}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((enrollmentData.overview.completedPatientsCount / enrollmentData.overview.totalPatients) * 100)}% of total
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 flex flex-wrap gap-3 justify-between items-center">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="byStudy">By Study</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <EnrollmentMetrics 
        data={enrollmentData} 
        timeRange={timeRange}
        onTimeRangeChange={handleTimeRangeChange}
      />

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Enrollment by Study</CardTitle>
          <CardDescription>Patient enrollment distribution across active studies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {enrollmentData.byStudy.map((study, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{study.name}</span>
                  <span className="text-sm text-muted-foreground">{study.total} patients</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${(study.total / enrollmentData.overview.totalPatients) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Active: {study.active}</span>
                  <span>Completed: {study.completed}</span>
                  <span>Withdrawn: {study.withdrawn}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">View Detailed Study Reports</Button>
        </CardFooter>
      </Card>
    </MainLayout>
  );
};

export default EnrollmentAnalyticsPage;
