
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const HandoffReportsPage = () => {
  return (
    <Layout title="Handoff Reports">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Handoff Reports</h1>
          <p className="text-muted-foreground">Generate and manage patient handoff reports between shifts</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Shift Handoff Reports
            </CardTitle>
            <CardDescription>Patient status reports for shift transitions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              Handoff report generation interface will be available here
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default HandoffReportsPage;
