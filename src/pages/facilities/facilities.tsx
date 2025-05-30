
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Plus } from 'lucide-react';

const FacilitiesPage = () => {
  return (
    <MainLayout>
      <PageHeader
        title="Facilities"
        description="Manage research facilities and locations"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Facilities' }
        ]}
        action={{
          label: 'Add Facility',
          icon: Plus,
          onClick: () => console.log('Add facility')
        }}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="mr-2 h-5 w-5" />
            Research Facilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Building className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No Facilities</h3>
            <p className="text-sm">Add research facilities to get started</p>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default FacilitiesPage;
