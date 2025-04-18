
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import AnalyticsFilters from '@/components/analytics/AnalyticsFilters';
import EnrollmentMetrics, { EnrollmentData } from '@/components/analytics/EnrollmentMetrics';
import OutcomesChart from '@/components/analytics/OutcomesChart';

// Define the types based on the existing components
interface DateRange {
  from: Date | null;
  to: Date | null;
}

// Mock enrollment data
const mockEnrollmentData = {
  overview: {
    totalPatients: 342,
    activePatientsCount: 284,
    completedPatientsCount: 58,
    withdrawnPatientsCount: 12,
    screeningFailureCount: 24
  },
  byStudy: [
    { name: "BEACON-CRC", total: 120, active: 98, completed: 22, withdrawn: 4, screeningFailure: 8 },
    { name: "STELLAR-001", total: 86, active: 76, completed: 10, withdrawn: 3, screeningFailure: 7 },
    { name: "PRISM-AD", total: 94, active: 78, completed: 16, withdrawn: 4, screeningFailure: 6 },
    { name: "HORIZON-MS", total: 42, active: 32, completed: 10, withdrawn: 1, screeningFailure: 3 }
  ],
  enrollmentTrend: [
    { month: 'Jan', count: 18, patients: 22, enrolled: 18, completed: 4 },
    { month: 'Feb', count: 22, patients: 26, enrolled: 22, completed: 6 },
    { month: 'Mar', count: 17, patients: 20, enrolled: 17, completed: 5 },
    { month: 'Apr', count: 25, patients: 30, enrolled: 25, completed: 8 },
    { month: 'May', count: 30, patients: 35, enrolled: 30, completed: 10 },
    { month: 'Jun', count: 28, patients: 32, enrolled: 28, completed: 9 },
    { month: 'Jul', count: 24, patients: 28, enrolled: 24, completed: 8 },
    { month: 'Aug', count: 32, patients: 38, enrolled: 32, completed: 12 },
    { month: 'Sep', count: 36, patients: 42, enrolled: 36, completed: 14 },
    { month: 'Oct', count: 29, patients: 34, enrolled: 29, completed: 10 },
    { month: 'Nov', count: 40, patients: 46, enrolled: 40, completed: 16 },
    { month: 'Dec', count: 41, patients: 48, enrolled: 41, completed: 18 }
  ]
};

// Mock outcomes data
const mockOutcomesData = {
  byGroup: [
    { name: "Treatment A", success: 68, partial: 22, failure: 10 },
    { name: "Treatment B", success: 52, partial: 32, failure: 16 },
    { name: "Control", success: 42, partial: 38, failure: 20 }
  ],
  adverseEvents: [
    { severity: "Mild", count: 98 },
    { severity: "Moderate", count: 45 },
    { severity: "Severe", count: 12 },
    { severity: "Life-threatening", count: 3 }
  ]
};

const AnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState('enrollment');
  const [dateRange, setDateRange] = useState<DateRange>({ from: null, to: null });
  const [studyFilter, setStudyFilter] = useState('all');
  
  return (
    <MainLayout>
      <PageHeader 
        title="Research Analytics" 
        description="Analysis and visualization of research data" 
        breadcrumbs={[{ label: 'Analytics' }]}
      />
      
      <div className="mb-6">
        <AnalyticsFilters />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="enrollment">Enrollment Metrics</TabsTrigger>
          <TabsTrigger value="outcomes">Outcome Metrics</TabsTrigger>
          <TabsTrigger value="adherence">Protocol Adherence</TabsTrigger>
          <TabsTrigger value="financial">Financial Metrics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="enrollment" className="mt-6">
          <EnrollmentMetrics 
            data={mockEnrollmentData}
          />
        </TabsContent>
        
        <TabsContent value="outcomes" className="mt-6">
          <OutcomesChart 
            data={mockOutcomesData}
          />
        </TabsContent>
        
        <TabsContent value="adherence" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Protocol Adherence Analysis</CardTitle>
              <CardDescription>Tracking and analysis of protocol compliance metrics</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">Protocol adherence data visualization will be implemented in a future update.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="financial" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Analytics</CardTitle>
              <CardDescription>Budget utilization and cost analysis</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">Financial metrics visualization will be implemented in a future update.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default AnalyticsPage;
