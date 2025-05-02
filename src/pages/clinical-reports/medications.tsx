
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Search, Filter, Download, Pill, ArrowUpRight, Calendar, AlertTriangle, CheckCircle,
  Clock
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
  BarChart, Bar, LineChart, Line, Cell, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const MedicationReportsPage = () => {
  const medicationMetrics = [
    { month: 'Jan', prescriptions: 312, refills: 187, adherence: 82 },
    { month: 'Feb', prescriptions: 325, refills: 192, adherence: 83 },
    { month: 'Mar', prescriptions: 335, refills: 201, adherence: 81 },
    { month: 'Apr', prescriptions: 340, refills: 208, adherence: 84 },
    { month: 'May', prescriptions: 348, refills: 212, adherence: 85 },
    { month: 'Jun', prescriptions: 355, refills: 220, adherence: 86 },
    { month: 'Jul', prescriptions: 368, refills: 225, adherence: 87 },
    { month: 'Aug', prescriptions: 375, refills: 232, adherence: 88 },
    { month: 'Sep', prescriptions: 382, refills: 240, adherence: 86 },
    { month: 'Oct', prescriptions: 392, refills: 248, adherence: 87 },
    { month: 'Nov', prescriptions: 403, refills: 256, adherence: 89 },
    { month: 'Dec', prescriptions: 412, refills: 264, adherence: 90 }
  ];
  
  const medicationTypeData = [
    { name: 'Chemotherapy', count: 127, adherence: 92 },
    { name: 'Hormonal Therapy', count: 98, adherence: 89 },
    { name: 'Targeted Therapy', count: 76, adherence: 88 },
    { name: 'Immunotherapy', count: 63, adherence: 91 },
    { name: 'Supportive Medications', count: 187, adherence: 86 }
  ];
  
  const adverseEventData = [
    { name: 'No Events', value: 78.5 },
    { name: 'Mild', value: 12.3 },
    { name: 'Moderate', value: 7.4 },
    { name: 'Severe', value: 1.8 }
  ];
  
  const topMedications = [
    { 
      name: "Anastrozole", 
      category: "Hormonal Therapy", 
      prescriptions: 47, 
      adherence: 91,
      cost: "$142.50",
      adverseEvents: 5.2
    },
    { 
      name: "Tamoxifen", 
      category: "Hormonal Therapy", 
      prescriptions: 43, 
      adherence: 89,
      cost: "$78.25",
      adverseEvents: 6.8
    },
    { 
      name: "Paclitaxel", 
      category: "Chemotherapy", 
      prescriptions: 38, 
      adherence: 94,
      cost: "$1,247.80",
      adverseEvents: 12.5
    },
    { 
      name: "Pembrolizumab", 
      category: "Immunotherapy", 
      prescriptions: 32, 
      adherence: 95,
      cost: "$8,965.40",
      adverseEvents: 7.3
    },
    { 
      name: "Letrozole", 
      category: "Hormonal Therapy", 
      prescriptions: 31, 
      adherence: 88,
      cost: "$168.75",
      adverseEvents: 4.7
    },
    { 
      name: "Trastuzumab", 
      category: "Targeted Therapy", 
      prescriptions: 29, 
      adherence: 93,
      cost: "$4,872.30",
      adverseEvents: 3.9
    },
    { 
      name: "Ondansetron", 
      category: "Supportive Care", 
      prescriptions: 102, 
      adherence: 84,
      cost: "$45.60",
      adverseEvents: 2.1
    },
    { 
      name: "Dexamethasone", 
      category: "Supportive Care", 
      prescriptions: 98, 
      adherence: 82,
      cost: "$21.35",
      adverseEvents: 8.4
    }
  ];

  // Colors for charts
  const COLORS = ['#22c55e', '#f59e0b', '#7c3aed', '#ef4444', '#0ea5e9', '#ec4899'];

  return (
    <MainLayout>
      <PageHeader
        title="Medication Reports"
        description="Prescription analytics and medication usage metrics"
        breadcrumbs={[
          { label: 'Clinical Reports', link: '/clinical-reports' },
          { label: 'Medication Reports' }
        ]}
        action={{
          label: 'Export Report',
          icon: Download,
          onClick: () => console.log('Export medication report')
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Prescriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div>
                <div className="text-2xl font-bold">4,347</div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <ArrowUpRight className="h-3.5 w-3.5 mr-1" /> 
                  <span>9.2% from last year</span>
                </div>
              </div>
              <div className="ml-auto p-2 bg-blue-50 text-blue-500 rounded-full">
                <Pill className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Rx (Avg)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div>
                <div className="text-2xl font-bold">362</div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <ArrowUpRight className="h-3.5 w-3.5 mr-1" /> 
                  <span>3.5% from last quarter</span>
                </div>
              </div>
              <div className="ml-auto p-2 bg-green-50 text-green-500 rounded-full">
                <Calendar className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Medication Adherence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div>
                <div className="text-2xl font-bold">87.3%</div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <ArrowUpRight className="h-3.5 w-3.5 mr-1" /> 
                  <span>2.1% from last quarter</span>
                </div>
              </div>
              <div className="ml-auto p-2 bg-amber-50 text-amber-500 rounded-full">
                <CheckCircle className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Adverse Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div>
                <div className="text-2xl font-bold">5.8%</div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <ArrowUpRight className="h-3.5 w-3.5 mr-1" /> 
                  <span>1.4% decrease from last year</span>
                </div>
              </div>
              <div className="ml-auto p-2 bg-red-50 text-red-500 rounded-full">
                <AlertTriangle className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>Medication Usage Trends</CardTitle>
              <CardDescription>12-month analysis of prescriptions and adherence</CardDescription>
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
                data={medicationMetrics}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="prescriptions" 
                  name="New Prescriptions" 
                  stroke="#0ea5e9" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="refills" 
                  name="Refills" 
                  stroke="#7c3aed" 
                  strokeWidth={2}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="adherence" 
                  name="Adherence (%)" 
                  stroke="#22c55e" 
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
            <CardTitle>Medication Categories</CardTitle>
            <CardDescription>Prescription count by medication type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={medicationTypeData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Prescriptions" fill="#0ea5e9">
                    {medicationTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Adverse Events Distribution</CardTitle>
            <CardDescription>Breakdown of medication side effect severity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={adverseEventData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, value}) => `${name}: ${value}%`}
                  >
                    {adverseEventData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={
                        index === 0 ? '#22c55e' : 
                        index === 1 ? '#f59e0b' : 
                        index === 2 ? '#fb7185' : 
                        '#ef4444'} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>Medication Analysis</CardTitle>
              <CardDescription>Top prescribed medications with key metrics</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search medications..."
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
              <TabsTrigger value="all">All Medications</TabsTrigger>
              <TabsTrigger value="chemo">Chemotherapy</TabsTrigger>
              <TabsTrigger value="hormonal">Hormonal Therapy</TabsTrigger>
              <TabsTrigger value="targeted">Targeted Therapy</TabsTrigger>
              <TabsTrigger value="supportive">Supportive Care</TabsTrigger>
            </TabsList>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medication Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Prescriptions</TableHead>
                  <TableHead className="text-right">Adherence</TableHead>
                  <TableHead className="text-right">Adverse Events</TableHead>
                  <TableHead className="text-right">Avg. Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topMedications.map((med, index) => (
                  <TableRow key={index} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                        <span>{med.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{med.category}</TableCell>
                    <TableCell className="text-right">{med.prescriptions}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={med.adherence >= 90 ? "default" : med.adherence >= 85 ? "outline" : "secondary"}>
                        {med.adherence}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={med.adverseEvents <= 5 ? "outline" : med.adverseEvents <= 10 ? "secondary" : "destructive"}>
                        {med.adverseEvents}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{med.cost}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t p-4 flex justify-between">
          <div className="text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
              <span>Last updated: May 2, 2025 at 10:25 AM</span>
            </div>
          </div>
          <Button variant="outline">View All Medications</Button>
        </CardFooter>
      </Card>
    </MainLayout>
  );
};

export default MedicationReportsPage;
