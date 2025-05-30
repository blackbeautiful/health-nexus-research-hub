
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Heart, Thermometer, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ClinicalDataPage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <PageHeader
        title="Clinical Data"
        description="Access and manage clinical data collection"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Clinical Data' }
        ]}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/clinical-data/vitals')}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-blue-500" />
              Vital Signs
            </CardTitle>
            <CardDescription>Monitor patient vital signs and measurements</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Track blood pressure, heart rate, temperature, and other vital measurements.
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/lab-results')}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-green-500" />
              Lab Results
            </CardTitle>
            <CardDescription>View laboratory test results</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Access blood work, urinalysis, and other laboratory findings.
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/medical-records/imaging')}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Heart className="mr-2 h-5 w-5 text-red-500" />
              Imaging Data
            </CardTitle>
            <CardDescription>Medical imaging and diagnostic results</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              View X-rays, MRIs, CT scans, and other imaging studies.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ClinicalDataPage;
