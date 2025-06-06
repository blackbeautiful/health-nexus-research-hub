
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import QueueDashboard from '@/components/clinical/QueueDashboard';
import { Activity } from 'lucide-react';

const ClinicalQueuePage = () => {
  const handlePatientSelect = (patientId: string) => {
    console.log('Selected patient:', patientId);
    // Navigate to patient details or open patient panel
  };

  return (
    <MainLayout>
      <PageHeader
        title="Clinical Queue"
        description="Real-time patient flow and queue management"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Clinical Workflows', link: '/clinical-workflows' },
          { label: 'Clinical Queue' }
        ]}
        action={{
          label: 'Refresh Queue',
          icon: Activity,
          onClick: () => window.location.reload()
        }}
      />
      
      <QueueDashboard onPatientSelect={handlePatientSelect} />
    </MainLayout>
  );
};

export default ClinicalQueuePage;
