
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  FlaskRound, 
  Users, 
  FileText, 
  BarChart2,
  Calendar,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Award,
  TrendingUp,
  Clock,
  Target,
  Zap
} from 'lucide-react';

const PIDashboard = () => {
  const leadStudies = [
    { 
      id: 'ONCO-2024-001', 
      title: 'Phase II Immunotherapy Combination Trial',
      participants: 24,
      target: 30,
      phase: 'Phase II',
      status: 'active',
      budget: '$2.4M',
      coordinator: 'Lisa Anderson',
      startDate: '2024-01-15',
      completion: 65
    },
    { 
      id: 'ONCO-2024-002', 
      title: 'Novel Biomarker Discovery Study',
      participants: 45,
      target: 50,
      phase: 'Observational',
      status: 'recruiting',
      budget: '$1.8M',
      coordinator: 'Sarah Chen',
      startDate: '2024-03-01',
      completion: 85
    },
    { 
      id: 'ONCO-2024-003', 
      title: 'Precision Medicine Initiative',
      participants: 12,
      target: 25,
      phase: 'Phase I',
      status: 'active',
      budget: '$3.2M',
      coordinator: 'Mike Wilson',
      startDate: '2024-06-01',
      completion: 35
    }
  ];

  const recentMilestones = [
    { id: 1, study: 'ONCO-2024-001', milestone: 'Interim analysis completed', date: '2 days ago', type: 'analysis' },
    { id: 2, study: 'ONCO-2024-002', milestone: 'Primary endpoint reached', date: '1 week ago', type: 'endpoint' },
    { id: 3, study: 'ONCO-2024-003', milestone: 'Safety review board approval', date: '2 weeks ago', type: 'safety' },
    { id: 4, study: 'ONCO-2024-001', milestone: 'Publication submitted', date: '3 weeks ago', type: 'publication' }
  ];

  const keyMetrics = [
    { label: 'Total Enrollment', value: '81/105', percentage: 77, color: 'text-blue-600' },
    { label: 'Budget Utilization', value: '$5.2M/$7.4M', percentage: 70, color: 'text-green-600' },
    { label: 'Study Completion', value: '62%', percentage: 62, color: 'text-purple-600' },
    { label: 'Protocol Compliance', value: '96%', percentage: 96, color: 'text-orange-600' }
  ];

  const upcomingDeadlines = [
    { id: 1, task: 'Submit interim report to FDA', study: 'ONCO-2024-001', due: '3 days', priority: 'high' },
    { id: 2, task: 'IRB annual review submission', study: 'ONCO-2024-002', due: '1 week', priority: 'medium' },
    { id: 3, task: 'Site monitoring visit preparation', study: 'ONCO-2024-003', due: '2 weeks', priority: 'medium' },
    { id: 4, task: 'Grant progress report', study: 'Multiple', due: '1 month', priority: 'low' }
  ];

  const publicationsPipeline = [
    { title: 'Immunotherapy Combination Efficacy Analysis', journal: 'Nature Medicine', status: 'under_review', submitted: '2024-12-15' },
    { title: 'Biomarker Validation in Precision Oncology', journal: 'Journal of Clinical Oncology', status: 'revision', submitted: '2024-11-20' },
    { title: 'Safety Profile of Novel Combination Therapy', journal: 'Lancet Oncology', status: 'draft', submitted: null },
    { title: 'Patient-Reported Outcomes in Clinical Trials', journal: 'NEJM', status: 'planning', submitted: null }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'recruiting': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'revision': return 'bg-orange-100 text-orange-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'planning': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case 'analysis': return <BarChart2 className="h-4 w-4" />;
      case 'endpoint': return <Target className="h-4 w-4" />;
      case 'safety': return <CheckCircle className="h-4 w-4" />;
      case 'publication': return <FileText className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg border">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Principal Investigator Dashboard</h1>
          <p className="text-gray-600">Welcome back, Dr. Sarah Martinez - Principal Investigator</p>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2">
              <FlaskRound className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium">3 Active Studies</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">81 Total Participants</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">$7.4M Total Funding</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium">4 Publications in Pipeline</span>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {keyMetrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
                <div className="flex items-center gap-2 mt-2">
                  <Progress value={metric.percentage} className="h-2 flex-1" />
                  <span className="text-xs text-gray-600">{metric.percentage}%</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lead Studies */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FlaskRound className="h-5 w-5" />
                  Lead Studies
                </CardTitle>
                <CardDescription>Studies under your principal investigation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leadStudies.map((study) => (
                    <div key={study.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">{study.title}</h4>
                          <p className="text-sm text-gray-600">Study ID: {study.id}</p>
                          <p className="text-sm text-blue-600">{study.phase} • Coordinator: {study.coordinator}</p>
                        </div>
                        <Badge className={getStatusColor(study.status)}>
                          {study.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-gray-500">Enrollment</p>
                          <p className="font-medium">{study.participants}/{study.target} participants</p>
                          <Progress value={(study.participants/study.target)*100} className="h-1 mt-1" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Study Progress</p>
                          <p className="font-medium">{study.completion}% complete</p>
                          <Progress value={study.completion} className="h-1 mt-1" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Budget: {study.budget}</span>
                        <Button variant="outline" size="sm">Review Study</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Milestones */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Recent Milestones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentMilestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-start gap-3 p-2">
                      <div className="h-8 w-8 bg-green-50 rounded-full flex items-center justify-center">
                        {getMilestoneIcon(milestone.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{milestone.milestone}</p>
                        <p className="text-xs text-blue-600">{milestone.study}</p>
                        <p className="text-xs text-gray-500">{milestone.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Upcoming Deadlines
              </CardTitle>
              <CardDescription>Important tasks and submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm">{deadline.task}</h4>
                      <Badge variant={getPriorityColor(deadline.priority)}>
                        {deadline.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-blue-600">{deadline.study}</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-gray-500">Due in: {deadline.due}</p>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Publications Pipeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Publications Pipeline
              </CardTitle>
              <CardDescription>Manuscripts and publications in progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {publicationsPipeline.map((pub, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm">{pub.title}</h4>
                      <Badge className={getStatusColor(pub.status)}>
                        {pub.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-blue-600">{pub.journal}</p>
                    {pub.submitted && (
                      <p className="text-xs text-gray-500">Submitted: {pub.submitted}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="flex items-center justify-center p-6">
              <div className="text-center">
                <FlaskRound className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-medium">Create New Study</h3>
                <p className="text-sm text-gray-600">Design protocol</p>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="flex items-center justify-center p-6">
              <div className="text-center">
                <BarChart2 className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-medium">Review Analytics</h3>
                <p className="text-sm text-gray-600">Study performance</p>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="flex items-center justify-center p-6">
              <div className="text-center">
                <FileText className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <h3 className="font-medium">Prepare Manuscript</h3>
                <p className="text-sm text-gray-600">Draft publication</p>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="flex items-center justify-center p-6">
              <div className="text-center">
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-red-600" />
                <h3 className="font-medium">Grant Application</h3>
                <p className="text-sm text-gray-600">Secure funding</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default PIDashboard;
