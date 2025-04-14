
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter, Download, RefreshCw, Plus } from 'lucide-react';
import AnalyticsFilters from '@/components/analytics/AnalyticsFilters';
import EnrollmentMetrics from '@/components/analytics/EnrollmentMetrics';
import OutcomesChart from '@/components/analytics/OutcomesChart';

const AnalyticsPage = () => {
  return (
    <MainLayout>
      <PageHeader 
        title="Analytics Dashboard" 
        description="Research outcome metrics and enrollment analytics"
        breadcrumbs={[{ label: 'Analytics' }]}
        action={{
          label: "Export Data",
          icon: Download,
          onClick: () => console.log("Export analytics data")
        }}
      />
      
      <Tabs defaultValue="enrollment">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <TabsList className="mb-4 sm:mb-0">
            <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
            <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
            <TabsTrigger value="site">Site Performance</TabsTrigger>
            <TabsTrigger value="safety">Safety</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create Report
            </Button>
          </div>
        </div>
        
        <AnalyticsFilters />
        
        <TabsContent value="enrollment" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Total Participants</CardTitle>
                <CardDescription>Across all active studies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,248</div>
                <p className="text-xs text-muted-foreground mt-1">+82 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Enrollment Rate</CardTitle>
                <CardDescription>Average across studies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">68%</div>
                <p className="text-xs text-muted-foreground mt-1">+12% from last quarter</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Retention Rate</CardTitle>
                <CardDescription>Study completion rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground mt-1">-2% from target</p>
              </CardContent>
            </Card>
          </div>
          
          <EnrollmentMetrics />
        </TabsContent>
        
        <TabsContent value="outcomes" className="mt-6">
          <OutcomesChart />
        </TabsContent>
        
        <TabsContent value="site" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Site Performance Dashboard</CardTitle>
              <CardDescription>Metrics across all participating research sites</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground">Site performance analytics will be available in the next update.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="safety" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Safety Monitoring</CardTitle>
              <CardDescription>Adverse events and safety signals</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground">Safety monitoring dashboard will be available in the next update.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default AnalyticsPage;
