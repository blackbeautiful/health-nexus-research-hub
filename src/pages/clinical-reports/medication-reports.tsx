
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pill } from 'lucide-react';

const MedicationReportsPage = () => {
  return (
    <MainLayout>
      <PageHeader
        title="Medication Reports"
        description="Analyze medication usage and adherence"
        breadcrumbs={[
          { label: 'Clinical Reports', link: '/clinical-reports' },
          { label: 'Medication Reports' }
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Pill className="mr-2 h-5 w-5" />
            Medication Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Pill className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Medication Reports</h3>
            <p className="text-sm">Medication analysis tools will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default MedicationReportsPage;
