
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import {
  Search,
  Filter,
  Download,
  BarChart2,
  Users,
  Clock,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Star
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart, Bar, LineChart, Line, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface ProviderData {
  id: string;
  name: string;
  specialty: string;
  patients: number;
  appointments: number;
  documentation: number;
  satisfaction: number;
  efficiency: number;
}

const ProviderMetricsPage = () => {
  const providers: ProviderData[] = [
    {
      id: "DR-1001",
      name: "Dr. Rebecca Martinez",
      specialty: "Medical Oncology",
      patients: 87,
      appointments: 162,
      documentation: 98,
      satisfaction: 4.9,
      efficiency: 96
    },
    {
      id: "DR-1002",
      name: "Dr. James Wilson",
      specialty: "Radiation Oncology",
      patients: 72,
      appointments: 143,
      documentation: 92,
      satisfaction: 4.7,
      efficiency: 90
    },
    {
      id: "DR-1003",
      name: "Dr. Elena Rodriguez",
      specialty: "Surgical Oncology",
      patients: 65,
      appointments: 98,
      documentation: 95,
      satisfaction: 4.8,
      efficiency: 94
    },
    {
      id: "DR-1004",
      name: "Dr. Robert Kim",
      specialty: "Hematology-Oncology",
      patients: 81,
      appointments: 155,
      documentation: 90,
      satisfaction: 4.6,
      efficiency: 89
    },
    {
      id: "DR-1005",
      name: "Dr. Sarah Williams",
      specialty: "Medical Oncology",
      patients: 78,
      appointments: 147,
      documentation: 97,
      satisfaction: 4.9,
      efficiency: 93
    }
  ];
  
  const patientVolumeData = [
    { month: 'Jan', oncology: 215, radiation: 128, surgical: 96, hematology: 165 },
    { month: 'Feb', oncology: 220, radiation: 132, surgical: 98, hematology: 168 },
    { month: 'Mar', oncology: 225, radiation: 129, surgical: 104, hematology: 172 },
    { month: 'Apr', oncology: 230, radiation: 135, surgical: 105, hematology: 175 },
    { month: 'May', oncology: 235, radiation: 138, surgical: 103, hematology: 178 },
    { month: 'Jun', oncology: 242, radiation: 140, surgical: 106, hematology: 183 },
    { month: 'Jul', oncology: 245, radiation: 145, surgical: 110, hematology: 185 },
    { month: 'Aug', oncology: 249, radiation: 148, surgical: 112, hematology: 188 },
    { month: 'Sep', oncology: 255, radiation: 152, surgical: 114, hematology: 192 },
    { month: 'Oct', oncology: 263, radiation: 156, surgical: 118, hematology: 196 },
    { month: 'Nov', oncology: 270, radiation: 160, surgical: 120, hematology: 200 },
    { month: 'Dec', oncology: 275, radiation: 165, surgical: 124, hematology: 205 }
  ];
  
  const timeMetricsData = [
    { provider: "Dr. Martinez", avgVisitTime: 24, avgWaitTime: 8 },
    { provider: "Dr. Wilson", avgVisitTime: 22, avgWaitTime: 12 },
    { provider: "Dr. Rodriguez", avgVisitTime: 32, avgWaitTime: 6 },
    { provider: "Dr. Kim", avgVisitTime: 25, avgWaitTime: 10 },
    { provider: "Dr. Williams", avgVisitTime: 23, avgWaitTime: 7 }
  ];
  
  const satisfactionData = [
    { category: "Overall Care", score: 4.8 },
    { category: "Communication", score: 4.7 },
    { category: "Responsiveness", score: 4.5 },
    { category: "Treatment Plan", score: 4.9 },
    { category: "Staff Support", score: 4.6 },
    { category: "Facility", score: 4.8 }
  ];

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <MainLayout>
      <PageHeader
        title="Provider Metrics"
        description="Performance analytics for healthcare providers"
        breadcrumbs={[
          { label: 'Clinical Reports', link: '/clinical-reports' },
          { label: 'Provider Metrics' }
        ]}
        action={{
          label: 'Export Report',
          icon: Download,
          onClick: () => console.log('Export provider metrics')
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Providers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div>
                <div className="text-2xl font-bold">18</div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <ArrowUpRight className="h-3.5 w-3.5 mr-1" /> 
                  <span>2 new this quarter</span>
                </div>
              </div>
              <div className="ml-auto p-2 bg-blue-50 text-blue-500 rounded-full">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Patient Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div>
                <div className="text-2xl font-bold">4.8/5</div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <ArrowUpRight className="h-3.5 w-3.5 mr-1" /> 
                  <span>0.2 from last quarter</span>
                </div>
              </div>
              <div className="ml-auto p-2 bg-green-50 text-green-500 rounded-full">
                <Star className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Visit Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div>
                <div className="text-2xl font-bold">24.8</div>
                <div className="flex items-center text-xs text-amber-600 mt-1">
                  <ArrowDownRight className="h-3.5 w-3.5 mr-1" /> 
                  <span>1.2 minutes from last quarter</span>
                </div>
              </div>
              <div className="ml-auto p-2 bg-amber-50 text-amber-500 rounded-full">
                <Clock className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Documentation Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div>
                <div className="text-2xl font-bold">94.3%</div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <ArrowUpRight className="h-3.5 w-3.5 mr-1" /> 
                  <span>2.1% from last quarter</span>
                </div>
              </div>
              <div className="ml-auto p-2 bg-indigo-50 text-indigo-500 rounded-full">
                <BarChart2 className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>Patient Volume by Specialty</CardTitle>
              <CardDescription>12-month trend of patient volume by provider specialty</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Select defaultValue="year">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="year">Last 12 months</SelectItem>
                  <SelectItem value="quarter">Last quarter</SelectItem>
                  <SelectItem value="month">This month</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={patientVolumeData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="oncology" 
                  name="Medical Oncology" 
                  stroke="#0088FE" 
                  strokeWidth={2}
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="radiation" 
                  name="Radiation Oncology" 
                  stroke="#00C49F" 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="surgical" 
                  name="Surgical Oncology" 
                  stroke="#FFBB28" 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="hematology" 
                  name="Hematology-Oncology" 
                  stroke="#FF8042" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Visit Time Metrics</CardTitle>
            <CardDescription>Average visit and wait times by provider</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={timeMetricsData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="provider" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="avgVisitTime" name="Avg. Visit Time (min)" fill="#0088FE" />
                  <Bar dataKey="avgWaitTime" name="Avg. Wait Time (min)" fill="#FF8042" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Patient Satisfaction Metrics</CardTitle>
            <CardDescription>Satisfaction scores by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={satisfactionData}
                  layout="vertical"
                  margin={{
                    top: 20,
                    right: 30,
                    left: 90,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 5]} />
                  <YAxis dataKey="category" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" name="Satisfaction Score (0-5)" fill="#8884d8">
                    {satisfactionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>Provider Performance</CardTitle>
              <CardDescription>Individual provider metrics</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search providers..."
                  className="pl-8 w-[200px] md:w-[250px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Providers</TabsTrigger>
              <TabsTrigger value="medical">Medical Oncology</TabsTrigger>
              <TabsTrigger value="radiation">Radiation Oncology</TabsTrigger>
              <TabsTrigger value="surgical">Surgical Oncology</TabsTrigger>
              <TabsTrigger value="hematology">Hematology-Oncology</TabsTrigger>
            </TabsList>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Provider</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead className="text-right">Patients</TableHead>
                  <TableHead className="text-right">Appointments</TableHead>
                  <TableHead className="text-right">Documentation</TableHead>
                  <TableHead className="text-right">Satisfaction</TableHead>
                  <TableHead className="text-right">Efficiency</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {providers.map((provider) => (
                  <TableRow key={provider.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <div className="flex h-full w-full items-center justify-center bg-primary rounded-full text-white">
                            {provider.name.split(' ')[1][0]}
                          </div>
                        </Avatar>
                        <div>
                          <div>{provider.name}</div>
                          <div className="text-xs text-muted-foreground">{provider.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{provider.specialty}</TableCell>
                    <TableCell className="text-right">{provider.patients}</TableCell>
                    <TableCell className="text-right">{provider.appointments}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={provider.documentation >= 95 ? "default" : provider.documentation >= 90 ? "outline" : "destructive"}>
                        {provider.documentation}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end">
                        <span>{provider.satisfaction}</span>
                        <Star className="h-3.5 w-3.5 ml-1 text-amber-500 fill-amber-500" />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={provider.efficiency >= 95 ? "default" : provider.efficiency >= 90 ? "outline" : "destructive"}>
                        {provider.efficiency}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t p-4 flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing 5 of 18 providers
          </div>
          <Button variant="outline">View All Providers</Button>
        </CardFooter>
      </Card>
    </MainLayout>
  );
};

export default ProviderMetricsPage;
