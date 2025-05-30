
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TestTube, Plus, Users, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudiesPage = () => {
  const navigate = useNavigate();

  const studies = [
    { id: 'BEACON-CRC', name: 'BEACON Colorectal Cancer Study', status: 'Active', participants: 45, phase: 'Phase III' },
    { id: 'HEART-001', name: 'Cardiac Health Trial', status: 'Recruiting', participants: 23, phase: 'Phase II' },
    { id: 'ENDO-2024', name: 'Endocrine Disorders Study', status: 'Planning', participants: 0, phase: 'Phase I' },
    { id: 'NEURO-PROTECT', name: 'Neuroprotection Study', status: 'Completed', participants: 120, phase: 'Phase III' }
  ];

  return (
    <MainLayout>
      <PageHeader
        title="Clinical Studies"
        description="Manage research studies and protocols"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Studies' }
        ]}
        action={{
          label: 'New Study',
          icon: Plus,
          onClick: () => console.log('New study')
        }}
      />

      <div className="grid gap-6">
        {studies.map((study) => (
          <Card key={study.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(`/studies/${study.id}`)}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center">
                    <TestTube className="mr-2 h-5 w-5" />
                    {study.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Study ID: {study.id}</p>
                </div>
                <Badge variant={study.status === 'Active' ? 'secondary' : 'outline'}>
                  {study.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Users className="mr-1 h-4 w-4" />
                  {study.participants} participants
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  {study.phase}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default StudiesPage;
