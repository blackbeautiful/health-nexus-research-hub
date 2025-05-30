
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, BarChart3, PieChart, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AnalyticsPage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <PageHeader
        title="Analytics"
        description="Research data analytics and insights"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Analytics' }
        ]}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/analytics/enrollment')}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-blue-500" />
              Enrollment Analytics
            </CardTitle>
            <CardDescription>Track study enrollment and recruitment metrics</CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/analytics/outcomes')}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-green-500" />
              Study Outcomes
            </CardTitle>
            <CardDescription>Analyze study results and outcomes</CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/analytics/site-performance')}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <PieChart className="mr-2 h-5 w-5 text-purple-500" />
              Site Performance
            </CardTitle>
            <CardDescription>Monitor research site performance metrics</CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/analytics/data-quality')}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-orange-500" />
              Data Quality
            </CardTitle>
            <CardDescription>Assess data completeness and quality</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AnalyticsPage;
