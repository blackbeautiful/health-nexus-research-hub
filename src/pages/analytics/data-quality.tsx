
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, Filter, AlertCircle } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DataQualityPage: React.FC = () => {
  const [studyFilter, setStudyFilter] = useState<string>("all");
  
  // Sample data quality metrics
  const qualityTrend = [
    { month: 'Jan', completeness: 94, accuracy: 91, consistency: 88 },
    { month: 'Feb', completeness: 93, accuracy: 92, consistency: 89 },
    { month: 'Mar', completeness: 95, accuracy: 93, consistency: 90 },
    { month: 'Apr', completeness: 96, accuracy: 94, consistency: 92 },
    { month: 'May', completeness: 95, accuracy: 93, consistency: 91 },
    { month: 'Jun', completeness: 97, accuracy: 95, consistency: 93 },
    { month: 'Jul', completeness: 96, accuracy: 94, consistency: 93 },
    { month: 'Aug', completeness: 98, accuracy: 96, consistency: 94 },
    { month: 'Sep', completeness: 97, accuracy: 95, consistency: 93 },
    { month: 'Oct', completeness: 98, accuracy: 96, consistency: 94 },
    { month: 'Nov', completeness: 97, accuracy: 95, consistency: 94 },
    { month: 'Dec', completeness: 99, accuracy: 97, consistency: 95 }
  ];
  
  const issueBreakdown = [
    { name: 'Missing Data', value: 42 },
    { name: 'Inconsistent Values', value: 28 },
    { name: 'Out of Range', value: 19 },
    { name: 'Protocol Deviations', value: 11 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const queryIssues = [
    {
      id: 'Q-1001',
      description: 'Missing lab values for patient ID-5863',
      study: 'BEACON-CRC',
      site: 'Memorial Cancer Center',
      severity: 'high',
      status: 'open',
      createdAt: '2025-04-28'
    },
    {
      id: 'Q-1002',
      description: 'Inconsistent medication dosage records',
      study: 'BRAVADO',
      site: 'University Medical Research',
      severity: 'medium',
      status: 'open',
      createdAt: '2025-04-27'
    },
    {
      id: 'Q-1003',
      description: 'Out of range vital signs for patient ID-4217',
      study: 'PALADIN',
      site: 'Pacific Research Institute',
      severity: 'medium',
      status: 'open',
      createdAt: '2025-04-25'
    },
    {
      id: 'Q-1004',
      description: 'Visit date outside of protocol window',
      study: 'BRAVADO',
      site: 'Midwest Clinical Research',
      severity: 'low',
      status: 'closed',
      createdAt: '2025-04-20'
    },
    {
      id: 'Q-1005',
      description: 'Missing informed consent documentation',
      study: 'BEACON-CRC',
      site: 'Southern Medical Center',
      severity: 'high',
      status: 'closed',
      createdAt: '2025-04-15'
    },
  ];
  
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Low</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Open</Badge>;
      case 'closed':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Closed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  return (
    <MainLayout>
      <PageHeader 
        title="Data Quality" 
        description="Monitoring and analysis of research data quality metrics"
        breadcrumbs={[
          { label: 'Analytics', link: '/analytics' },
          { label: 'Data Quality' }
        ]}
      />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
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
        
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Quality Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">95.4%</div>
            <Progress value={95.4} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              2.1% increase from previous month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Open Queries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600">18</div>
            <div className="flex items-center gap-2 mt-1">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <p className="text-xs text-muted-foreground">
                3 high priority queries
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Query Resolution Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">2.4 days</div>
            <p className="text-xs text-muted-foreground mt-1">
              Average resolution time
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quality Metrics Trend</CardTitle>
            <CardDescription>Historical data quality metrics over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={qualityTrend}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[80, 100]} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="completeness" 
                  name="Completeness" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="accuracy" 
                  name="Accuracy" 
                  stroke="#82ca9d" 
                />
                <Line 
                  type="monotone" 
                  dataKey="consistency" 
                  name="Consistency" 
                  stroke="#ffc658" 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Issue Breakdown</CardTitle>
            <CardDescription>Types of data quality issues</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={issueBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {issueBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} issues`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Data Queries</CardTitle>
          <CardDescription>List of recent data quality issues requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Study</TableHead>
                <TableHead>Site</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {queryIssues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell className="font-medium">{issue.id}</TableCell>
                  <TableCell>{issue.description}</TableCell>
                  <TableCell>{issue.study}</TableCell>
                  <TableCell>{issue.site}</TableCell>
                  <TableCell>{getSeverityBadge(issue.severity)}</TableCell>
                  <TableCell>{getStatusBadge(issue.status)}</TableCell>
                  <TableCell>{issue.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default DataQualityPage;
