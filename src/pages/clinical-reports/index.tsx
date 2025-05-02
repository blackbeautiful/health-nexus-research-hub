
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartBar, FileText, Users, Pill, BarChart2, FileSpreadsheet, Calendar, Download, Printer } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';

const ClinicalReportsPage = () => {
  // Sample data for charts
  const patientDemographics = [
    { age: '18-30', count: 125 },
    { age: '31-45', count: 230 },
    { age: '46-60', count: 345 },
    { age: '61-75', count: 287 },
    { age: '76+', count: 143 }
  ];

  const diagnosisDistribution = [
    { name: 'Cardiovascular', value: 252 },
    { name: 'Oncology', value: 187 },
    { name: 'Endocrine', value: 145 },
    { name: 'Respiratory', value: 132 },
    { name: 'Neurological', value: 98 },
    { name: 'Gastrointestinal', value: 86 },
    { name: 'Musculoskeletal', value: 72 }
  ];

  const medicationTrends = [
    { month: 'Jan', antihypertensives: 145, antibiotics: 84, antidepressants: 65, painkillers: 112 },
    { month: 'Feb', antihypertensives: 152, antibiotics: 76, antidepressants: 68, painkillers: 105 },
    { month: 'Mar', antihypertensives: 159, antibiotics: 92, antidepressants: 72, painkillers: 118 },
    { month: 'Apr', antihypertensives: 150, antibiotics: 110, antidepressants: 75, painkillers: 125 },
    { month: 'May', antihypertensives: 155, antibiotics: 87, antidepressants: 78, painkillers: 120 },
    { month: 'Jun', antihypertensives: 162, antibiotics: 70, antidepressants: 82, painkillers: 115 }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <MainLayout>
      <PageHeader
        title="Clinical Reports"
        description="Analytics and insights on patient care and clinical outcomes"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Clinical Reports' }
        ]}
        action={{
          label: 'Generate Report',
          icon: FileText,
          onClick: () => console.log('Generate new report')
        }}
      />
      
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Reports</TabsTrigger>
            <TabsTrigger value="outcomes">Treatment Outcomes</TabsTrigger>
            <TabsTrigger value="analytics">Patient Analytics</TabsTrigger>
            <TabsTrigger value="metrics">Provider Metrics</TabsTrigger>
            <TabsTrigger value="medications">Medication Reports</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,130</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span className="text-green-500 mr-1">↑ 12%</span> from previous month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Treatment Success</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73.5%</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span className="text-green-500 mr-1">↑ 3.2%</span> from previous quarter
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Readmission Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.1%</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span className="text-green-500 mr-1">↓ 1.4%</span> from previous quarter
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Patient Demographics</CardTitle>
            <CardDescription>Age distribution of active patients</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={patientDemographics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} patients`, 'Count']} />
                <Bar dataKey="count" fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Diagnosis Distribution</CardTitle>
            <CardDescription>Breakdown by primary condition</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                layout="vertical"
                data={diagnosisDistribution}
                margin={{
                  top: 5,
                  right: 30,
                  left: 80,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip formatter={(value) => [`${value} patients`, 'Count']} />
                <Bar dataKey="value" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Medication Prescribing Trends</CardTitle>
          <CardDescription>6-month prescription volume by medication class</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={medicationTrends}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="antihypertensives" stroke="#4F46E5" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="antibiotics" stroke="#10B981" />
              <Line type="monotone" dataKey="antidepressants" stroke="#F59E0B" />
              <Line type="monotone" dataKey="painkillers" stroke="#EF4444" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>Common report shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <Button variant="outline" className="justify-start h-auto py-3" onClick={() => window.location.href = '/clinical-reports/outcomes'}>
                <ChartBar className="mr-2 h-4 w-4" />
                <div className="flex flex-col items-start">
                  <span>Treatment Outcomes</span>
                  <span className="text-xs text-muted-foreground">Clinical effectiveness metrics</span>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto py-3" onClick={() => window.location.href = '/clinical-reports/patient-analytics'}>
                <Users className="mr-2 h-4 w-4" />
                <div className="flex flex-col items-start">
                  <span>Patient Analytics</span>
                  <span className="text-xs text-muted-foreground">Patient population insights</span>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto py-3" onClick={() => window.location.href = '/clinical-reports/provider-metrics'}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                <div className="flex flex-col items-start">
                  <span>Provider Metrics</span>
                  <span className="text-xs text-muted-foreground">Provider performance analysis</span>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto py-3" onClick={() => window.location.href = '/clinical-reports/medications'}>
                <Pill className="mr-2 h-4 w-4" />
                <div className="flex flex-col items-start">
                  <span>Medication Reports</span>
                  <span className="text-xs text-muted-foreground">Prescribing patterns and costs</span>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
            <CardDescription>Treatment costs and reimbursement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Average Cost Per Patient</div>
                  <div className="text-2xl font-bold">{formatCurrency(2450)}</div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div className="bg-primary h-2 rounded-full w-[65%]"></div>
                  </div>
                  <div className="text-xs text-muted-foreground flex justify-between">
                    <span>Target: {formatCurrency(2200)}</span>
                    <span>Variance: +11.4%</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">Reimbursement Rate</div>
                  <div className="text-2xl font-bold">92.3%</div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div className="bg-green-500 h-2 rounded-full w-[92%]"></div>
                  </div>
                  <div className="text-xs text-muted-foreground flex justify-between">
                    <span>Target: 90.0%</span>
                    <span>Variance: +2.3%</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Total Revenue YTD</div>
                  <div className="text-2xl font-bold">{formatCurrency(3245000)}</div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div className="bg-blue-500 h-2 rounded-full w-[78%]"></div>
                  </div>
                  <div className="text-xs text-muted-foreground flex justify-between">
                    <span>Annual Target: {formatCurrency(4150000)}</span>
                    <span>Progress: 78.2%</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">Cost Reduction</div>
                  <div className="text-2xl font-bold">{formatCurrency(182500)}</div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div className="bg-amber-500 h-2 rounded-full w-[45%]"></div>
                  </div>
                  <div className="text-xs text-muted-foreground flex justify-between">
                    <span>Annual Target: {formatCurrency(400000)}</span>
                    <span>Progress: 45.6%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ClinicalReportsPage;
