
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Users, UserPlus, Target, TrendingUp, Search, Filter, Calendar } from 'lucide-react';

const RecruitmentPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const recruitmentMetrics = [
    { label: 'Total Enrolled', value: 127, target: 200, percentage: 63.5 },
    { label: 'Screening Rate', value: 89, target: 100, percentage: 89 },
    { label: 'Consent Rate', value: 76, target: 80, percentage: 95 },
    { label: 'Retention Rate', value: 92, target: 95, percentage: 96.8 }
  ];

  const studies = [
    {
      id: 'ONCO-2025-001',
      title: 'Phase II Oncology Trial',
      enrolled: 45,
      target: 75,
      status: 'Active',
      endDate: '2025-06-30',
      sites: 3
    },
    {
      id: 'CARD-2025-002',
      title: 'Cardiovascular Prevention Study',
      enrolled: 82,
      target: 125,
      status: 'Active',
      endDate: '2025-08-15',
      sites: 5
    }
  ];

  const candidates = [
    {
      id: 'C001',
      patientId: 'P001',
      name: 'John Smith',
      age: 65,
      status: 'Screening',
      study: 'ONCO-2025-001',
      lastContact: '2025-01-14',
      eligibility: 'Likely Eligible'
    },
    {
      id: 'C002',
      patientId: 'P002',
      name: 'Maria Garcia',
      age: 58,
      status: 'Consented',
      study: 'CARD-2025-002',
      lastContact: '2025-01-13',
      eligibility: 'Eligible'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      'Screening': 'secondary',
      'Consented': 'default',
      'Enrolled': 'secondary',
      'Declined': 'destructive',
      'Ineligible': 'destructive'
    };
    return <Badge variant={variants[status as keyof typeof variants] as any}>{status}</Badge>;
  };

  const getEligibilityBadge = (eligibility: string) => {
    const variants = {
      'Eligible': 'secondary',
      'Likely Eligible': 'default',
      'Ineligible': 'destructive',
      'Pending Review': 'secondary'
    };
    return <Badge variant={variants[eligibility as keyof typeof variants] as any}>{eligibility}</Badge>;
  };

  return (
    <Layout title="Study Recruitment">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Study Recruitment</h1>
            <p className="text-muted-foreground">Manage patient recruitment and enrollment</p>
          </div>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Candidate
          </Button>
        </div>

        {/* Recruitment Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recruitmentMetrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <Progress value={metric.percentage} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Target: {metric.target} ({metric.percentage.toFixed(1)}%)
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recruitment Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
            <TabsTrigger value="studies">Studies</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Enrollment Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {studies.map((study) => (
                    <div key={study.id} className="space-y-2 mb-4 last:mb-0">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{study.title}</span>
                        <span>{study.enrolled}/{study.target}</span>
                      </div>
                      <Progress value={(study.enrolled / study.target) * 100} />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Upcoming Milestones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">ONCO-2025-001 Target Enrollment</span>
                      <Badge variant="outline">2025-06-30</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">CARD-2025-002 Target Enrollment</span>
                      <Badge variant="outline">2025-08-15</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="candidates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recruitment Candidates</CardTitle>
                <CardDescription>Potential study participants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search candidates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  {candidates.map((candidate) => (
                    <div key={candidate.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="font-medium">{candidate.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Age: {candidate.age} | Study: {candidate.study} | Last Contact: {candidate.lastContact}
                        </div>
                        <div className="flex gap-2">
                          {getStatusBadge(candidate.status)}
                          {getEligibilityBadge(candidate.eligibility)}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="studies" className="space-y-4">
            <div className="space-y-4">
              {studies.map((study) => (
                <Card key={study.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{study.title}</CardTitle>
                        <CardDescription>Study ID: {study.id}</CardDescription>
                      </div>
                      <Badge>{study.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm font-medium">Enrollment</div>
                        <div className="text-2xl font-bold">{study.enrolled}/{study.target}</div>
                        <Progress value={(study.enrolled / study.target) * 100} className="mt-1" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Study Sites</div>
                        <div className="text-lg">{study.sites} active sites</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Target End Date</div>
                        <div className="text-lg">{study.endDate}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default RecruitmentPage;
