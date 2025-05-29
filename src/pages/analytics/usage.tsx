
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2 } from 'lucide-react';

const UsageAnalyticsPage = () => {
  return (
    <Layout title="Usage Analytics">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Usage Analytics</h1>
          <p className="text-muted-foreground">Platform usage metrics and statistics</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart2 className="h-5 w-5 mr-2" />
              Platform Usage Metrics
            </CardTitle>
            <CardDescription>Track user engagement and feature utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              Usage analytics dashboard will be available here
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UsageAnalyticsPage;
