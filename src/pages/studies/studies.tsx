
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  Plus, 
  Filter,
  FlaskRound,
  Users,
  Calendar,
  MapPin,
  MoreHorizontal,
  Eye
} from 'lucide-react';

const StudiesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const studies = [
    {
      id: 'ONCO-2024-001',
      title: 'Phase II Immunotherapy Trial for Advanced Melanoma',
      description: 'A randomized, double-blind study evaluating the efficacy of novel immunotherapy in patients with advanced melanoma.',
      phase: 'Phase II',
      status: 'recruiting',
      pi: 'Dr. Sarah Martinez',
      site: 'Memorial Cancer Center',
      enrolled: 24,
      target: 30,
      startDate: '2024-01-15',
      endDate: '2024-12-15',
      lastUpdated: '2024-01-20'
    },
    {
      id: 'ONCO-2024-002',
      title: 'Combination Therapy Study for Lung Cancer',
      description: 'Investigating the combination of targeted therapy and immunotherapy in non-small cell lung cancer patients.',
      phase: 'Phase I/II',
      status: 'active',
      pi: 'Dr. Michael Chen',
      site: 'City Medical Research',
      enrolled: 18,
      target: 25,
      startDate: '2023-11-01',
      endDate: '2024-10-31',
      lastUpdated: '2024-01-18'
    },
    {
      id: 'ONCO-2024-003',
      title: 'Biomarker Discovery Study',
      description: 'Comprehensive genomic profiling to identify predictive biomarkers for treatment response.',
      phase: 'Observational',
      status: 'active',
      pi: 'Dr. Elena Rodriguez',
      site: 'Research Institute',
      enrolled: 45,
      target: 50,
      startDate: '2023-09-01',
      endDate: '2024-08-31',
      lastUpdated: '2024-01-19'
    },
    {
      id: 'ONCO-2024-004',
      title: 'Early Detection Screening Protocol',
      description: 'Multi-center study evaluating novel screening methods for early cancer detection.',
      phase: 'Phase III',
      status: 'screening',
      pi: 'Dr. James Wilson',
      site: 'National Cancer Institute',
      enrolled: 156,
      target: 200,
      startDate: '2023-06-01',
      endDate: '2025-05-31',
      lastUpdated: '2024-01-17'
    }
  ];

  const filteredStudies = studies.filter(study => {
    const matchesSearch = study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         study.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         study.pi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || study.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'recruiting': return 'secondary';
      case 'screening': return 'outline';
      case 'completed': return 'outline';
      case 'paused': return 'destructive';
      default: return 'outline';
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'Phase I': return 'text-blue-600';
      case 'Phase II': return 'text-green-600';
      case 'Phase III': return 'text-purple-600';
      case 'Phase I/II': return 'text-orange-600';
      case 'Observational': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Clinical Studies</h1>
            <p className="text-muted-foreground">Manage and monitor clinical research studies</p>
          </div>
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Create New Study
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Studies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{studies.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Studies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {studies.filter(s => s.status === 'active').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {studies.reduce((sum, study) => sum + study.enrolled, 0)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Recruitment Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">78%</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Study Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search studies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="recruiting">Recruiting</SelectItem>
                  <SelectItem value="screening">Screening</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Studies List */}
            <div className="space-y-4">
              {filteredStudies.map((study) => (
                <Card key={study.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                          <h3 className="font-semibold text-lg">{study.title}</h3>
                          <div className="flex gap-2">
                            <Badge variant={getStatusColor(study.status)}>
                              {study.status}
                            </Badge>
                            <Badge variant="outline" className={getPhaseColor(study.phase)}>
                              {study.phase}
                            </Badge>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground">{study.description}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <FlaskRound className="h-4 w-4 text-muted-foreground" />
                            <span>Study ID: {study.id}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>PI: {study.pi}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{study.site}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{study.startDate} - {study.endDate}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Enrollment Progress</span>
                            <span>{study.enrolled}/{study.target} ({Math.round((study.enrolled/study.target)*100)}%)</span>
                          </div>
                          <Progress value={(study.enrolled/study.target)*100} className="h-2" />
                        </div>
                      </div>

                      <div className="flex flex-row lg:flex-col gap-2 lg:w-32">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Manage
                        </Button>
                        <Button variant="ghost" size="sm" className="flex-1">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default StudiesPage;
