
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const StudyOutcomesPage: React.FC = () => {
  const [studyFilter, setStudyFilter] = useState<string>("all");
  
  const outcomeData = [
    { month: 'Jan', primary: 68, secondary: 82 },
    { month: 'Feb', primary: 72, secondary: 85 },
    { month: 'Mar', primary: 76, secondary: 87 },
    { month: 'Apr', primary: 74, secondary: 84 },
    { month: 'May', primary: 78, secondary: 89 },
    { month: 'Jun', primary: 80, secondary: 91 },
    { month: 'Jul', primary: 75, secondary: 87 },
    { month: 'Aug', primary: 79, secondary: 90 },
    { month: 'Sep', primary: 77, secondary: 88 },
    { month: 'Oct', primary: 81, secondary: 92 },
    { month: 'Nov', primary: 83, secondary: 94 },
    { month: 'Dec', primary: 85, secondary: 95 }
  ];
  
  const adverseEventData = [
    { category: 'Mild', count: 124 },
    { category: 'Moderate', count: 67 },
    { category: 'Severe', count: 28 },
    { category: 'Life-threatening', count: 12 },
    { category: 'Fatal', count: 3 }
  ];
  
  return (
    <MainLayout>
      <PageHeader 
        title="Study Outcomes" 
        description="Analysis of research study outcomes and efficacy metrics"
        breadcrumbs={[
          { label: 'Analytics', link: '/analytics' },
          { label: 'Outcomes' }
        ]}
      />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <Tabs defaultValue="efficacy" className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="efficacy">Efficacy</TabsTrigger>
            <TabsTrigger value="safety">Safety</TabsTrigger>
            <TabsTrigger value="completion">Completion</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Select 
          value={studyFilter} 
          onValueChange={setStudyFilter}
        >
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Filter by study" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Studies</SelectItem>
            <SelectItem value="beacon-crc">BEACON-CRC Phase II Trial</SelectItem>
            <SelectItem value="bravado">BRAVADO Metastatic Breast Cancer Study</SelectItem>
            <SelectItem value="paladin">PALADIN Lung Cancer Immunotherapy Trial</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Primary & Secondary Endpoints</CardTitle>
            <CardDescription>Achievement percentages over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={outcomeData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="primary" 
                  name="Primary Endpoint" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="secondary" 
                  name="Secondary Endpoint" 
                  stroke="#82ca9d" 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Study Completion</CardTitle>
            <CardDescription>Patient completion rates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Overall Completion</span>
                <span className="text-sm font-medium">78%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Protocol Adherence</span>
                <span className="text-sm font-medium">92%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Follow-up Success</span>
                <span className="text-sm font-medium">85%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Adverse Events</CardTitle>
          <CardDescription>Distribution by severity category</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={adverseEventData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="count" 
                name="Number of Events" 
                fill="#8884d8" 
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default StudyOutcomesPage;
