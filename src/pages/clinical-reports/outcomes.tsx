
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChartBar, Download, Calendar, FileText, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';

const TreatmentOutcomesPage = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  const [selectedCondition, setSelectedCondition] = useState('all');

  // Sample data for charts
  const treatmentOutcomeData = [
    { name: 'Complete Response', value: 35 },
    { name: 'Partial Response', value: 45 },
    { name: 'Stable Disease', value: 15 },
    { name: 'Progressive Disease', value: 5 }
  ];

  const treatmentModalitiesData = [
    { name: 'Surgery', success: 82, partial: 12, failure: 6 },
    { name: 'Radiation', success: 68, partial: 24, failure: 8 },
    { name: 'Chemotherapy', success: 58, partial: 32, failure: 10 },
    { name: 'Immunotherapy', success: 72, partial: 18, failure: 10 },
    { name: 'Hormone Therapy', success: 65, partial: 25, failure: 10 },
    { name: 'Targeted Therapy', success: 78, partial: 14, failure: 8 }
  ];

  const survivalTrendsData = [
    { month: '1', survival: 98 },
    { month: '3', survival: 95 },
    { month: '6', survival: 90 },
    { month: '12', survival: 85 },
    { month: '18', survival: 80 },
    { month: '24', survival: 76 },
    { month: '36', survival: 72 },
    { month: '48', survival: 70 },
    { month: '60', survival: 68 }
  ];

  const conditionSpecificData = [
    { condition: 'Breast Cancer', successRate: 78, survivalRate: 85, qolImprovement: 65 },
    { condition: 'Lung Cancer', successRate: 62, survivalRate: 45, qolImprovement: 55 },
    { condition: 'Colorectal Cancer', successRate: 68, survivalRate: 60, qolImprovement: 60 },
    { condition: 'Lymphoma', successRate: 82, survivalRate: 80, qolImprovement: 75 }
  ];

  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <MainLayout>
      <PageHeader
        title="Treatment Outcomes"
        description="Clinical effectiveness and patient outcome analytics"
        breadcrumbs={[
          { label: 'Clinical Reports', link: '/clinical-reports' },
          { label: 'Treatment Outcomes' }
        ]}
        action={{
          label: 'Download Report',
          icon: Download,
          onClick: () => console.log('Download report')
        }}
      />

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-3">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-[160px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="12months">Last 12 months</SelectItem>
              <SelectItem value="2years">Last 2 years</SelectItem>
              <SelectItem value="5years">5 year analysis</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedCondition} onValueChange={setSelectedCondition}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Conditions</SelectItem>
              <SelectItem value="breast">Breast Cancer</SelectItem>
              <SelectItem value="lung">Lung Cancer</SelectItem>
              <SelectItem value="colorectal">Colorectal Cancer</SelectItem>
              <SelectItem value="lymphoma">Lymphoma</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Full Report
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73.5%</div>
            <Progress 
              value={73.5} 
              className="h-2 mt-2"
            />
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span className="text-green-500 mr-1">↑ 3.2%</span> from previous period
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">5-Year Survival Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <Progress 
              value={68} 
              className="h-2 mt-2"
            />
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span className="text-green-500 mr-1">↑ 2.5%</span> from previous year
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">QoL Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">62.8%</div>
            <Progress 
              value={62.8} 
              className="h-2 mt-2"
            />
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span className="text-green-500 mr-1">↑ 4.3%</span> from baseline
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recurrence Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">11.2%</div>
            <Progress 
              value={11.2} 
              className="h-2 mt-2 bg-muted"
            />
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span className="text-green-500 mr-1">↓ 2.1%</span> from previous year
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Treatment Outcomes</CardTitle>
            <CardDescription>Distribution of clinical responses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={treatmentOutcomeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {treatmentOutcomeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend layout="vertical" align="center" verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Treatment Modalities Performance</CardTitle>
            <CardDescription>Success rates by treatment approach</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={treatmentModalitiesData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'Rate']} />
                <Legend />
                <Bar dataKey="success" stackId="a" fill="#4F46E5" name="Success" />
                <Bar dataKey="partial" stackId="a" fill="#F59E0B" name="Partial Response" />
                <Bar dataKey="failure" stackId="a" fill="#EF4444" name="Failure" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Survival Rate Trend</CardTitle>
            <CardDescription>5-year survival rate analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={survivalTrendsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" label={{ value: 'Months', position: 'insideBottomRight', offset: -10 }} />
                <YAxis label={{ value: 'Survival Rate (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => [`${value}%`, 'Survival Rate']} />
                <Legend />
                <Line type="monotone" dataKey="survival" stroke="#4F46E5" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Condition-Specific Outcomes</CardTitle>
          <CardDescription>Treatment success rates by disease category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {conditionSpecificData.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                  <h4 className="font-medium text-lg mb-2 md:mb-0">{item.condition}</h4>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 md:ml-2">
                    {item.successRate}% Success Rate
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Survival Rate</span>
                      <span className="font-medium">{item.survivalRate}%</span>
                    </div>
                    <Progress value={item.survivalRate} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Quality of Life Improvement</span>
                      <span className="font-medium">{item.qolImprovement}%</span>
                    </div>
                    <Progress value={item.qolImprovement} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-4">
          <Button variant="outline" className="w-full md:w-auto">View All Conditions</Button>
        </CardFooter>
      </Card>
    </MainLayout>
  );
};

export default TreatmentOutcomesPage;
