
import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Download, FileText, Filter, MoreHorizontal } from 'lucide-react';

// Analytics Dashboard Components
import AnalyticsFilters from '@/components/analytics/AnalyticsFilters';
import EnrollmentMetrics from '@/components/analytics/EnrollmentMetrics';
import OutcomesChart from '@/components/analytics/OutcomesChart';

const researchData = [
  { month: 'Jan', patients: 65, enrolled: 40, completed: 30 },
  { month: 'Feb', patients: 59, enrolled: 45, completed: 35 },
  { month: 'Mar', patients: 80, enrolled: 55, completed: 40 },
  { month: 'Apr', patients: 81, enrolled: 60, completed: 45 },
  { month: 'May', patients: 56, enrolled: 40, completed: 30 },
  { month: 'Jun', patients: 55, enrolled: 35, completed: 25 },
  { month: 'Jul', patients: 40, enrolled: 30, completed: 20 },
  { month: 'Aug', patients: 50, enrolled: 40, completed: 35 },
  { month: 'Sep', patients: 70, enrolled: 55, completed: 45 },
  { month: 'Oct', patients: 90, enrolled: 70, completed: 60 },
  { month: 'Nov', patients: 100, enrolled: 80, completed: 65 },
  { month: 'Dec', patients: 95, enrolled: 75, completed: 60 },
];

const outcomeData = [
  { name: 'Complete Remission', value: 40, color: '#8b5cf6' },
  { name: 'Partial Response', value: 25, color: '#c084fc' },
  { name: 'Stable Disease', value: 20, color: '#d8b4fe' },
  { name: 'Progressive Disease', value: 15, color: '#f1f5f9' },
];

const sitePerformance = [
  { site: 'Memorial Hospital', screening: 120, enrolled: 95, retention: 92, efficiency: 87 },
  { site: 'University Medical', screening: 150, enrolled: 110, retention: 95, efficiency: 91 },
  { site: 'General Hospital', screening: 90, enrolled: 70, retention: 85, efficiency: 82 },
  { site: 'Community Care', screening: 75, enrolled: 55, retention: 80, efficiency: 75 },
  { site: 'Cancer Institute', screening: 140, enrolled: 115, retention: 98, efficiency: 94 },
];

const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState('year');
  const [studyFilter, setStudyFilter] = useState('all');
  
  return (
    <Layout title="Analytics">
      <PageHeader
        title="Research Analytics"
        description="Comprehensive research study analytics and metrics"
        breadcrumbs={[{ label: 'Analytics' }]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" /> Date Range
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" /> Filters
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
          </div>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Total Patients</CardTitle>
            <CardDescription>Across all studies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">1,245</div>
              <Badge className="bg-green-500">+12% ↑</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Active Studies</CardTitle>
            <CardDescription>Currently enrolling</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">24</div>
              <Badge className="bg-blue-500">+3 ↑</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Patient Retention</CardTitle>
            <CardDescription>Study completion rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">87%</div>
              <Badge className="bg-amber-500">+2% ↑</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-medium">Enrollment Metrics</CardTitle>
              <CardDescription>Monthly patient recruitment</CardDescription>
            </div>
            <Select defaultValue="year">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={researchData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="patients" name="Patients Screened" fill="#8b5cf6" />
                <Bar dataKey="enrolled" name="Patients Enrolled" fill="#c084fc" />
                <Bar dataKey="completed" name="Study Completed" fill="#d8b4fe" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Treatment Outcomes</CardTitle>
            <CardDescription>Distribution by response</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={outcomeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                >
                  {outcomeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="center" verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Research Site Performance</CardTitle>
          <CardDescription>Efficiency metrics across research locations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Site Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patients Screened</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollment Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Retention</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Site Efficiency</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sitePerformance.map((site, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{site.site}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{site.screening}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{Math.round((site.enrolled / site.screening) * 100)}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{site.retention}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-health-primary h-2.5 rounded-full" style={{ width: `${site.efficiency}%` }}></div>
                      </div>
                      <span className="text-xs mt-1">{site.efficiency}%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4 mr-1" /> Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Protocol Compliance</CardTitle>
            <CardDescription>Deviation metrics by study type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={[
                  { name: 'Jan', minor: 10, major: 3 },
                  { name: 'Feb', minor: 8, major: 2 },
                  { name: 'Mar', minor: 12, major: 4 },
                  { name: 'Apr', minor: 6, major: 1 },
                  { name: 'May', minor: 9, major: 2 },
                  { name: 'Jun', minor: 7, major: 1 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="minor" name="Minor Deviations" stroke="#8b5cf6" />
                <Line type="monotone" dataKey="major" name="Major Deviations" stroke="#ef4444" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Data Quality</CardTitle>
            <CardDescription>Query resolution & data completion</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart
                data={[
                  { name: 'Jan', completion: 85, queries: 20 },
                  { name: 'Feb', completion: 87, queries: 18 },
                  { name: 'Mar', completion: 90, queries: 15 },
                  { name: 'Apr', completion: 92, queries: 12 },
                  { name: 'May', completion: 94, queries: 10 },
                  { name: 'Jun', completion: 96, queries: 8 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="completion" name="Data Completion (%)" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                <Area type="monotone" dataKey="queries" name="Open Queries" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AnalyticsPage;
