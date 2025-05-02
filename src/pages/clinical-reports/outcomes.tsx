
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
  Search, Filter, Download, ArrowUpRight, ArrowDownRight, CheckCircle,
  Clock, Users, Calendar, BarChart2, FileText
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
  LineChart, 
  Line, 
  BarChart, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';

const TreatmentOutcomesPage = () => {
  const outcomeMetrics = [
    { name: 'Jan', success: 76, partial: 14, failure: 10 },
    { name: 'Feb', success: 74, partial: 16, failure: 10 },
    { name: 'Mar', success: 78, partial: 15, failure: 7 },
    { name: 'Apr', success: 79, partial: 14, failure: 7 },
    { name: 'May', success: 77, partial: 16, failure: 7 },
    { name: 'Jun', success: 80, partial: 13, failure: 7 },
    { name: 'Jul', success: 82, partial: 12, failure: 6 },
    { name: 'Aug', success: 83, partial: 12, failure: 5 },
    { name: 'Sep', success: 84, partial: 11, failure: 5 },
    { name: 'Oct', success: 86, partial: 10, failure: 4 },
    { name: 'Nov', success: 85, partial: 11, failure: 4 },
    { name: 'Dec', success: 87, partial: 10, failure: 3 },
  ];
  
  const treatmentTypes = [
    { name: 'Chemotherapy', success: 78, partial: 15, failure: 7 },
    { name: 'Radiation', success: 82, partial: 12, failure: 6 },
    { name: 'Surgery', success: 86, partial: 9, failure: 5 },
    { name: 'Immunotherapy', success: 75, partial: 15, failure: 10 },
    { name: 'Hormone Therapy', success: 83, partial: 12, failure: 5 },
    { name: 'Targeted Therapy', success: 79, partial: 14, failure: 7 }
  ];

  const patientOutcomes = [
    {
      patientId: "PT-10245",
      name: "Sarah Johnson",
      age: 49,
      condition: "Breast Cancer",
      treatmentType: "Surgery + Radiation",
      outcome: "Success",
      date: "2025-03-15",
      provider: "Dr. Rebecca Martinez"
    },
    {
      patientId: "PT-10246",
      name: "Michael Smith",
      age: 65,
      condition: "Prostate Cancer",
      treatmentType: "Hormone Therapy",
      outcome: "Partial",
      date: "2025-03-22",
      provider: "Dr. James Wilson"
    },
    {
      patientId: "PT-10247",
      name: "Emma Thompson",
      age: 56,
      condition: "Lung Cancer",
      treatmentType: "Chemotherapy",
      outcome: "Success",
      date: "2025-04-05",
      provider: "Dr. Elena Rodriguez"
    },
    {
      patientId: "PT-10248",
      name: "John Davis",
      age: 71,
      condition: "Colon Cancer",
      treatmentType: "Surgery",
      outcome: "Success",
      date: "2025-04-10",
      provider: "Dr. Robert Kim"
    },
    {
      patientId: "PT-10249",
      name: "Linda Wilson",
      age: 62,
      condition: "Lymphoma",
      treatmentType: "Immunotherapy",
      outcome: "Partial",
      date: "2025-04-12",
      provider: "Dr. Sarah Williams"
    }
  ];

  const qualityMetrics = [
    { metric: "5-Year Survival Rate", value: "83.4%", change: "+2.1%", trend: "up" },
    { metric: "Treatment Completion Rate", value: "92.1%", change: "+1.5%", trend: "up" },
    { metric: "30-Day Readmission", value: "4.3%", change: "-0.8%", trend: "down" },
    { metric: "Patient Satisfaction", value: "4.7/5", change: "+0.2", trend: "up" },
    { metric: "Adverse Event Rate", value: "3.8%", change: "-1.2%", trend: "down" },
  ];

  const getOutcomeBadge = (outcome: string) => {
    switch (outcome) {
      case 'Success':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Success</Badge>;
      case 'Partial':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Partial</Badge>;
      case 'Failure':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Unsuccessful</Badge>;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <PageHeader
        title="Treatment Outcomes"
        description="Analysis of clinical outcomes and treatment efficacy"
        breadcrumbs={[
          { label: 'Clinical Reports', link: '/clinical-reports' },
          { label: 'Treatment Outcomes' }
        ]}
        action={{
          label: 'Export Report',
          icon: Download,
          onClick: () => console.log('Export report')
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78.5%</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpRight className="h-3.5 w-3.5 mr-1" /> 
              <span>3.2% from last quarter</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Partial Response</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15.7%</div>
            <div className="flex items-center text-xs text-amber-600 mt-1">
              <ArrowDownRight className="h-3.5 w-3.5 mr-1" /> 
              <span>1.4% from last quarter</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Non-Response</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.8%</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowDownRight className="h-3.5 w-3.5 mr-1" /> 
              <span>1.8% from last quarter</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Treatments Analyzed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Clock className="h-3.5 w-3.5 mr-1" /> 
              <span>Updated 30 mins ago</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <CardTitle>Treatment Outcomes Trends</CardTitle>
                <CardDescription>12-month analysis of treatment success rates</CardDescription>
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
                  data={outcomeMetrics}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="success" 
                    name="Success" 
                    stroke="#22c55e" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="partial" 
                    name="Partial Response" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="failure" 
                    name="Non-Response" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Treatment Types Efficacy</CardTitle>
            <CardDescription>Comparing success rates by treatment modality</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={treatmentTypes}
                  layout="vertical"
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis type="category" dataKey="name" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="success" name="Success" stackId="a" fill="#22c55e" />
                  <Bar dataKey="partial" name="Partial" stackId="a" fill="#f59e0b" />
                  <Bar dataKey="failure" name="Non-Response" stackId="a" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Key Quality Metrics</CardTitle>
            <CardDescription>Clinical quality indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {qualityMetrics.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{item.metric}</TableCell>
                    <TableCell className="text-right">{item.value}</TableCell>
                    <TableCell className="text-right">
                      <div className={`flex items-center justify-end ${
                        item.trend === "up" 
                          ? "text-green-600" 
                          : item.trend === "down" && item.metric.includes("Readmission") || item.metric.includes("Adverse")
                            ? "text-green-600"
                            : item.trend === "down"
                              ? "text-red-600" 
                              : ""
                      }`}>
                        {item.trend === "up" ? (
                          <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3.5 w-3.5 mr-1" />
                        )}
                        <span>{item.change}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" size="sm">
              View Complete Metrics
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>Recent Treatment Outcomes</CardTitle>
              <CardDescription>Individual patient outcome reports</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search outcomes..."
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
              <TabsTrigger value="all">All Outcomes</TabsTrigger>
              <TabsTrigger value="success">Successful</TabsTrigger>
              <TabsTrigger value="partial">Partial</TabsTrigger>
              <TabsTrigger value="failure">Unsuccessful</TabsTrigger>
            </TabsList>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Treatment</TableHead>
                  <TableHead>Outcome</TableHead>
                  <TableHead>Completion Date</TableHead>
                  <TableHead>Provider</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patientOutcomes.map((patient) => (
                  <TableRow key={patient.patientId} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{patient.patientId}</TableCell>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.condition}</TableCell>
                    <TableCell>{patient.treatmentType}</TableCell>
                    <TableCell>{getOutcomeBadge(patient.outcome)}</TableCell>
                    <TableCell>{patient.date}</TableCell>
                    <TableCell>{patient.provider}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t p-4 flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing 5 of 254 outcomes
          </div>
          <Button variant="outline">View All Outcomes</Button>
        </CardFooter>
      </Card>
    </MainLayout>
  );
};

export default TreatmentOutcomesPage;
