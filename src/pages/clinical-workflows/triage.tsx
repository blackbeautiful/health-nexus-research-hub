
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import TriagePanel from '@/components/clinical/TriagePanel';
import { Activity } from 'lucide-react';

const TriagePage = () => {
  return (
    <MainLayout>
      <PageHeader
        title="Triage Assessment"
        description="Patient triage and priority assessment"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Clinical Workflows', link: '/clinical-workflows' },
          { label: 'Triage' }
        ]}
        action={{
          label: 'New Assessment',
          icon: Activity,
          onClick: () => console.log('New triage assessment')
        }}
      />
      
      <TriagePanel />
    </MainLayout>
  );
};

export default TriagePage;
