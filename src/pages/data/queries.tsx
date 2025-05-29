
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

const DataQueryPage = () => {
  return (
    <Layout title="Data Queries">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Data Query Resolution</h1>
          <p className="text-muted-foreground">Manage and resolve data queries for clinical studies</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Query Management
            </CardTitle>
            <CardDescription>Track and resolve data quality queries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              Data query management interface will be available here
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DataQueryPage;
