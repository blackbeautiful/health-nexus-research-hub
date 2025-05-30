
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const HandoffReportsPage = () => {
  return (
    <MainLayout>
      <PageHeader
        title="Handoff Reports"
        description="Patient care transition and handoff documentation"
        breadcrumbs={[
          { label: 'Clinical Reports', link: '/clinical-reports' },
          { label: 'Handoff Reports' }
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Care Transition Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Handoff Documentation</h3>
            <p className="text-sm">Patient handoff reports will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default HandoffReportsPage;
