
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { BarChart, CheckCircle, Users, Pill, FileText, Calendar, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ClinicalReportsPage = () => {
  const reportCategories = [
    {
      title: 'Treatment Outcomes',
      description: 'Analyze treatment efficacy and outcomes across patients',
      icon: CheckCircle,
      link: '/clinical-reports/outcomes',
      metrics: '85% completion rate',
      updated: '15 minutes ago'
    },
    {
      title: 'Patient Analytics',
      description: 'Patient demographics, trends, and statistics',
      icon: Users,
      link: '/clinical-reports/patient-analytics',
      metrics: '492 active patients',
      updated: '1 hour ago'
    },
    {
      title: 'Provider Metrics',
      description: 'Provider performance and workload distribution',
      icon: BarChart,
      link: '/clinical-reports/provider-metrics',
      metrics: '18 active providers',
      updated: '2 hours ago'
    },
    {
      title: 'Medication Reports',
      description: 'Medication usage, adherence, and trends',
      icon: Pill,
      link: '/clinical-reports/medications',
      metrics: '127 prescriptions this month',
      updated: '30 minutes ago'
    },
    {
      title: 'Clinical Documentation',
      description: 'Documentation completeness and quality metrics',
      icon: FileText,
      link: '/clinical-reports/documentation',
      metrics: '98% completion rate',
      updated: '45 minutes ago'
    },
    {
      title: 'Appointment Metrics',
      description: 'Appointment utilization, no-shows, and scheduling efficiency',
      icon: Calendar,
      link: '/clinical-reports/appointments',
      metrics: '24 appointments today',
      updated: '5 minutes ago'
    }
  ];

  return (
    <MainLayout>
      <PageHeader
        title="Clinical Reports"
        description="Data insights and analytics for clinical practice"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Clinical Reports' }
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Treatment Success Rate</CardTitle>
            <CardDescription>Oncology treatments</CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="text-3xl font-bold text-blue-700">78.5%</div>
            <div className="flex items-center text-sm text-blue-600 mt-1">
              <ArrowUpRight className="h-4 w-4 mr-1" /> 
              <span>3.2% increase from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Patient Satisfaction</CardTitle>
            <CardDescription>Overall care quality rating</CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="text-3xl font-bold text-green-700">4.7/5</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <ArrowUpRight className="h-4 w-4 mr-1" /> 
              <span>0.2 points increase from last quarter</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Protocol Adherence</CardTitle>
            <CardDescription>Clinical guideline compliance</CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="text-3xl font-bold text-amber-700">92.4%</div>
            <div className="flex items-center text-sm text-amber-600 mt-1">
              <ArrowUpRight className="h-4 w-4 mr-1" /> 
              <span>1.5% increase from previous period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportCategories.map((category, index) => (
          <Card key={index} className="relative group overflow-hidden">
            <CardHeader className="pb-3">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-muted opacity-20 group-hover:bg-primary/20 transition-colors" />
              <div className="mb-2">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                  <category.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </span>
              </div>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription className="line-clamp-2">{category.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="text-sm font-medium">{category.metrics}</div>
              <div className="text-xs text-muted-foreground mt-1">Updated {category.updated}</div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-start p-0 hover:bg-transparent" asChild>
                <a href={category.link}>
                  View Reports
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default ClinicalReportsPage;
