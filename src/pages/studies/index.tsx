
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Users, Calendar, FileText, TrendingUp } from 'lucide-react';

const StudiesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const studies = [
    {
      id: 'STUDY-2024-001',
      title: 'Phase III Trial of Adjuvant Osimertinib in EGFR+ NSCLC',
      sponsor: 'National Cancer Institute',
      phase: 'Phase III',
      status: 'recruiting',
      participants: { enrolled: 245, target: 400 },
      startDate: '2024-01-15',
      primaryEndpoint: 'Disease-free survival',
      pi: 'Dr. Sarah Martinez'
    },
    {
      id: 'STUDY-2024-002',
      title: 'Neoadjuvant Immunotherapy in Triple-Negative Breast Cancer',
      sponsor: 'Genentech',
      phase: 'Phase II',
      status: 'active',
      participants: { enrolled: 89, target: 120 },
      startDate: '2023-09-20',
      primaryEndpoint: 'Pathologic complete response rate',
      pi: 'Dr. Michael Chen'
    },
    {
      id: 'STUDY-2024-003',
      title: 'CAR-T Cell Therapy for Relapsed/Refractory B-cell Lymphoma',
      sponsor: 'Novartis',
      phase: 'Phase I/II',
      status: 'screening',
      participants: { enrolled: 12, target: 50 },
      startDate: '2024-03-01',
      primaryEndpoint: 'Safety and tolerability',
      pi: 'Dr. Elena Rodriguez'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recruiting': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'screening': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredStudies = studies.filter(study =>
    study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    study.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <PageHeader
        title="Clinical Studies"
        description="Manage and monitor clinical research studies"
        action={{
          label: 'New Study',
          icon: Plus,
          onClick: () => console.log('Create new study')
        }}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Active Studies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">8</div>
            <p className="text-xs text-muted-foreground">Currently recruiting</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Total Participants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">346</div>
            <p className="text-xs text-muted-foreground">Across all studies</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">23</div>
            <p className="text-xs text-muted-foreground">New enrollments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Enrollment Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">87%</div>
            <p className="text-xs text-muted-foreground">Target achievement</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Studies</TabsTrigger>
          <TabsTrigger value="recruiting">Recruiting</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle>Clinical Studies Overview</CardTitle>
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search studies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredStudies.map((study) => (
                  <Card key={study.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row justify-between gap-4">
                        <div className="space-y-3 flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <h3 className="font-semibold text-lg">{study.title}</h3>
                            <div className="flex gap-2">
                              <Badge className={getStatusColor(study.status)}>
                                {study.status}
                              </Badge>
                              <Badge variant="outline">{study.phase}</Badge>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                            <div><strong>Study ID:</strong> {study.id}</div>
                            <div><strong>Sponsor:</strong> {study.sponsor}</div>
                            <div><strong>PI:</strong> {study.pi}</div>
                            <div><strong>Start Date:</strong> {study.startDate}</div>
                          </div>

                          <div className="text-sm">
                            <strong>Primary Endpoint:</strong> {study.primaryEndpoint}
                          </div>

                          <div className="flex items-center gap-4 text-sm">
                            <div>
                              <strong>Enrollment:</strong> {study.participants.enrolled}/{study.participants.target}
                            </div>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${(study.participants.enrolled / study.participants.target) * 100}%` }}
                              ></div>
                            </div>
                            <div className="text-blue-600 font-medium">
                              {Math.round((study.participants.enrolled / study.participants.target) * 100)}%
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-row lg:flex-col gap-2 lg:w-32">
                          <Button variant="outline" size="sm" className="flex-1">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            Manage
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recruiting">
          <Card>
            <CardHeader>
              <CardTitle>Recruiting Studies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Studies currently recruiting participants.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Studies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Studies with active enrollment and follow-up.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Studies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Studies that have completed enrollment and follow-up.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default StudiesPage;
