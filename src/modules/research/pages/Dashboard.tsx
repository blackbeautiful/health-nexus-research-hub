import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import StatCard from '@/components/dashboard/StatCard';
import StudiesOverview from '@/components/dashboard/StudiesOverview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FlaskRound, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Calendar, 
  FileText, 
  AlertTriangle,
  BarChart2,
  Database,
  Clock
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const ResearchDashboard = () => {
  const researchStats = [
    { 
      title: "Active Studies", 
      value: "12", 
      icon: <FlaskRound className="h-4 w-4" />,
      trend: { value: 20, isPositive: true }
    },
    { 
      title: "Total Participants", 
      value: "1,247", 
      icon: <Users className="h-4 w-4" />,
      trend: { value: 15, isPositive: true }
    },
    { 
      title: "Pending Reviews", 
      value: "8", 
      icon: <FileText className="h-4 w-4" />,
      trend: { value: -10, isPositive: false }
    },
    { 
      title: "Data Quality", 
      value: "94.5%", 
      icon: <BarChart2 className="h-4 w-4" />,
      trend: { value: 2.1, isPositive: true }
    }
  ];

  const activeStudies = [
    {
      id: "LUNG-2024-001",
      title: "Phase III Lung Cancer Immunotherapy Trial",
      participants: 89,
      target: 120,
      status: "Recruiting",
      completion: 74,
      priority: "High"
    },
    {
      id: "BREAST-2024-002", 
      title: "Personalized Breast Cancer Treatment Study",
      participants: 156,
      target: 200,
      status: "Active",
      completion: 78,
      priority: "Normal"
    },
    {
      id: "PEDI-2024-003",
      title: "Pediatric Oncology Genomics Research",
      participants: 34,
      target: 80,
      status: "Recruiting",
      completion: 43,
      priority: "Normal"
    },
    {
      id: "RARE-2024-004",
      title: "Rare Tumor Biomarker Discovery",
      participants: 12,
      target: 50,
      status: "Starting",
      completion: 24,
      priority: "Low"
    }
  ];

  const recentActivities = [
    {
      type: "enrollment",
      message: "New participant enrolled in LUNG-2024-001",
      time: "5 min ago",
      priority: "info"
    },
    {
      type: "protocol", 
      message: "Protocol deviation reported in BREAST-2024-002",
      time: "1 hour ago",
      priority: "warning"
    },
    {
      type: "data",
      message: "CRF data entry completed for 15 participants",
      time: "2 hours ago", 
      priority: "success"
    },
    {
      type: "review",
      message: "IRB review scheduled for PEDI-2024-003",
      time: "3 hours ago",
      priority: "info"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Recruiting': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Starting': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Normal': return 'bg-green-100 text-green-800 border-green-200';
      case 'Low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getActivityColor = (priority: string) => {
    switch (priority) {
      case 'warning': return 'border-l-yellow-500 bg-yellow-50';
      case 'success': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  return (
    <MainLayout>
      <PageHeader
        title="Research Dashboard"
        description="Monitor research studies, enrollment, and data quality"
        breadcrumbs={[
          { label: 'Research', link: '/research' },
          { label: 'Dashboard' }
        ]}
      />
      
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {researchStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Studies */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                <FlaskRound className="h-5 w-5 mr-2 text-primary" />
                Active Studies
              </CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeStudies.map((study, index) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {study.id}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getStatusColor(study.status)}`}
                        >
                          {study.status}
                        </Badge>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getPriorityColor(study.priority)}`}
                      >
                        {study.priority}
                      </Badge>
                    </div>
                    <h4 className="font-medium text-sm mb-2">{study.title}</h4>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <span>{study.participants}/{study.target} participants</span>
                      <span>{study.completion}% complete</span>
                    </div>
                    <Progress value={study.completion} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                Recent Activities
              </CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className={`p-3 border-l-4 rounded-r-lg ${getActivityColor(activity.priority)}`}>
                    <p className="text-sm font-medium mb-1">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Studies Overview */}
        <StudiesOverview />

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex flex-col items-center space-y-2">
                <FlaskRound className="h-6 w-6" />
                <span className="text-sm">New Study</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center space-y-2">
                <Users className="h-6 w-6" />
                <span className="text-sm">Enroll Participant</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center space-y-2">
                <Database className="h-6 w-6" />
                <span className="text-sm">Data Entry</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center space-y-2">
                <BarChart2 className="h-6 w-6" />
                <span className="text-sm">Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ResearchDashboard;