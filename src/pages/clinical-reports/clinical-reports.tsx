
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, TrendingUp, Users, Pill } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ClinicalReportsPage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <PageHeader
        title="Clinical Reports"
        description="Generate and view clinical reports and analytics"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Clinical Reports' }
        ]}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/clinical-reports/outcomes')}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-blue-500" />
              Treatment Outcomes
            </CardTitle>
            <CardDescription>Analyze treatment effectiveness and outcomes</CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/clinical-reports/patient-analytics')}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-green-500" />
              Patient Analytics
            </CardTitle>
            <CardDescription>Patient demographics and clinical data insights</CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/clinical-reports/medications')}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Pill className="mr-2 h-5 w-5 text-purple-500" />
              Medication Reports
            </CardTitle>
            <CardDescription>Medication usage and adherence reports</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ClinicalReportsPage;
