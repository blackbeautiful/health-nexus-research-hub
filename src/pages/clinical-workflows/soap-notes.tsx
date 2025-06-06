
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import SOAPNote from '@/components/clinical/SOAPNote';
import { FileText } from 'lucide-react';

const SOAPNotesPage = () => {
  return (
    <MainLayout>
      <PageHeader
        title="SOAP Notes"
        description="Create and manage clinical documentation"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Clinical Workflows', link: '/clinical-workflows' },
          { label: 'SOAP Notes' }
        ]}
        action={{
          label: 'New Note',
          icon: FileText,
          onClick: () => console.log('New SOAP note')
        }}
      />
      
      <SOAPNote />
    </MainLayout>
  );
};

export default SOAPNotesPage;
