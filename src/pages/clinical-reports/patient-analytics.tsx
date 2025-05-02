
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar, Download, Filter, Users, UserCircle, FileSpreadsheet, Map, ArrowUpDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, LineChart, Line
} from 'recharts';

const PatientAnalyticsPage = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('12months');

  // Sample data for charts
  const ageDistribution = [
    { age: '0-17', count: 84 },
    { age: '18-30', count: 125 },
    { age: '31-45', count: 230 },
    { age: '46-60', count: 345 },
    { age: '61-75', count: 287 },
    { age: '76+', count: 143 }
  ];

  const genderDistribution = [
    { name: 'Female', value: 615 },
    { name: 'Male', value: 585 },
    { name: 'Other', value: 14 }
  ];

  const patientAcquisitionData = [
    { month: 'Jan', new: 38, returning: 62 },
    { month: 'Feb', new: 42, returning: 58 },
    { month: 'Mar', new: 45, returning: 64 },
    { month: 'Apr', new: 40, returning: 68 },
    { month: 'May', new: 37, returning: 72 },
    { month: 'Jun', new: 42, returning: 75 },
    { month: 'Jul', new: 48, returning: 70 },
    { month: 'Aug', new: 52, returning: 68 },
    { month: 'Sep', new: 46, returning: 65 },
    { month: 'Oct', new: 41, returning: 70 },
    { month: 'Nov', new: 38, returning: 72 },
    { month: 'Dec', new: 35, returning: 78 }
  ];

  const insuranceDistribution = [
    { name: 'Private Insurance', value: 42 },
    { name: 'Medicare', value: 28 },
    { name: 'Medicaid', value: 18 },
    { name: 'Self-Pay', value: 8 },
    { name: 'Other', value: 4 }
  ];

  const zipCodeDistribution = [
    { zipcode: '90210', patients: 125 },
    { zipcode: '90001', patients: 87 },
    { zipcode: '90045', patients: 103 },
    { zipcode: '90036', patients: 142 },
    { zipcode: '90066', patients: 118 },
    { zipcode: 'Other', patients: 639 }
  ];

  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  return (
    <MainLayout>
      <PageHeader
        title="Patient Analytics"
        description="Demographic analysis and patient population insights"
        breadcrumbs={[
          { label: 'Clinical Reports', link: '/clinical-reports' },
          { label: 'Patient Analytics' }
        ]}
        action={{
          label: 'Export Data',
          icon: Download,
          onClick: () => console.log('Export patient analytics')
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
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Patient Registry
          </Button>
          <Button variant="outline" size="sm">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Compare Periods
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,214</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span className="text-green-500 mr-1">↑ 8.4%</span> from previous period
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">143</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span className="text-green-500 mr-1">↑ 12.6%</span> from previous period
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Patient Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.2%</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span className="text-green-500 mr-1">↑ 2.1%</span> from previous period
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Visits Per Patient</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.3</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span className="text-amber-500 mr-1">↓ 0.2</span> from previous period
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Age Distribution</CardTitle>
            <CardDescription>Patient count by age group</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} patients`, 'Count']} />
                <Bar dataKey="count" fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Gender Distribution</CardTitle>
            <CardDescription>Patient gender breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {genderDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} patients`, 'Count']} />
                  <Legend layout="vertical" align="center" verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Patient Acquisition Trends</CardTitle>
          <CardDescription>Monthly new vs. returning patients</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={patientAcquisitionData}
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
              <Tooltip formatter={(value) => [`${value} patients`, 'Count']} />
              <Legend />
              <Line type="monotone" dataKey="new" stroke="#4F46E5" activeDot={{ r: 8 }} name="New Patients" />
              <Line type="monotone" dataKey="returning" stroke="#10B981" name="Returning Patients" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Insurance Distribution</CardTitle>
            <CardDescription>Patient insurance coverage types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={insuranceDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {insuranceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  <Legend layout="vertical" align="center" verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Patient distribution by zip code</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Map className="mr-2 h-4 w-4" />
                View Map
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {zipCodeDistribution.map((item) => (
                <div key={item.zipcode} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">ZIP Code {item.zipcode}</span>
                    <span className="text-sm font-medium">{item.patients} patients</span>
                  </div>
                  <Progress value={(item.patients / 1214) * 100} className="h-2" />
                  <div className="text-xs text-muted-foreground text-right">
                    {((item.patients / 1214) * 100).toFixed(1)}% of total
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default PatientAnalyticsPage;
