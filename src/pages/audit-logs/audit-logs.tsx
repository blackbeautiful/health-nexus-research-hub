
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const AuditLogsPage = () => {
  return (
    <MainLayout>
      <PageHeader
        title="Audit Logs"
        description="System activity and audit trail"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Audit Logs' }
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            System Audit Trail
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Audit Logs</h3>
            <p className="text-sm">System activity logs will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default AuditLogsPage;
