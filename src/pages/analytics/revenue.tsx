
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

const RevenueReportsPage = () => {
  return (
    <Layout title="Revenue Reports">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Revenue Reports</h1>
          <p className="text-muted-foreground">Financial performance and revenue analytics</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Revenue Analytics
            </CardTitle>
            <CardDescription>Track financial performance and revenue streams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              Revenue analytics dashboard will be available here
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default RevenueReportsPage;
