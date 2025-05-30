
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const CompliancePage = () => {
  return (
    <MainLayout>
      <PageHeader
        title="Compliance"
        description="Regulatory compliance and audit management"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Compliance' }
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Compliance Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Shield className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Compliance Monitoring</h3>
            <p className="text-sm">Compliance reports and audit information will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default CompliancePage;
