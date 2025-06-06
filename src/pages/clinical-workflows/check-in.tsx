
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import CheckInKiosk from '@/components/clinical/CheckInKiosk';
import { CheckCircle } from 'lucide-react';

const CheckInPage = () => {
  const handleCheckIn = (appointmentId: string) => {
    console.log('Patient checked in:', appointmentId);
    // Handle check-in logic
  };

  return (
    <MainLayout>
      <PageHeader
        title="Patient Check-In"
        description="Patient self-service and staff-assisted check-in"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Clinical Workflows', link: '/clinical-workflows' },
          { label: 'Check-In' }
        ]}
        action={{
          label: 'Staff Check-In',
          icon: CheckCircle,
          onClick: () => console.log('Staff assisted check-in')
        }}
      />
      
      <CheckInKiosk onCheckIn={handleCheckIn} />
    </MainLayout>
  );
};

export default CheckInPage;
