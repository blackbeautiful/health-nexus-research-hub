
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, Filter, AlertCircle, Search, FileText } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const LabResultsPage: React.FC = () => {
  const [studyFilter, setStudyFilter] = useState<string>("BEACON-CRC");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const patientLabResults = [
    {
      id: 'LAB-10142',
      patientId: 'ID-5863',
      testName: 'Complete Blood Count',
      collectedDate: '2025-04-28',
      receivedDate: '2025-04-29',
      status: 'normal',
      reviewedBy: 'Dr. Jane Roberts',
      site: 'Memorial Cancer Center'
    },
    {
      id: 'LAB-10141',
      patientId: 'ID-5241',
      testName: 'Comprehensive Metabolic Panel',
      collectedDate: '2025-04-27',
      receivedDate: '2025-04-28',
      status: 'abnormal',
      reviewedBy: 'Dr. Michael Chen',
      site: 'University Medical Research'
    },
    {
      id: 'LAB-10140',
      patientId: 'ID-4926',
      testName: 'Lipid Panel',
      collectedDate: '2025-04-26',
      receivedDate: '2025-04-27',
      status: 'normal',
      reviewedBy: 'Dr. Sarah Johnson',
      site: 'Pacific Research Institute'
    },
    {
      id: 'LAB-10139',
      patientId: 'ID-4872',
      testName: 'Tumor Marker Panel',
      collectedDate: '2025-04-25',
      receivedDate: '2025-04-26',
      status: 'abnormal',
      reviewedBy: 'Dr. Jane Roberts',
      site: 'Memorial Cancer Center'
    },
    {
      id: 'LAB-10138',
      patientId: 'ID-5014',
      testName: 'Thyroid Function Panel',
      collectedDate: '2025-04-24',
      receivedDate: '2025-04-25',
      status: 'pending',
      reviewedBy: '-',
      site: 'Atlanta Research Institute'
    }
  ];
  
  const abnormalValues = [
    {
      id: 'ABN-321',
      patientId: 'ID-5241',
      test: 'Comprehensive Metabolic Panel',
      parameter: 'ALT',
      value: '82',
      unit: 'U/L',
      reference: '7-55',
      deviation: 'High',
      clinicalSignificance: 'Yes'
    },
    {
      id: 'ABN-320',
      patientId: 'ID-5241',
      test: 'Comprehensive Metabolic Panel',
      parameter: 'AST',
      value: '76',
      unit: 'U/L',
      reference: '8-48',
      deviation: 'High',
      clinicalSignificance: 'Yes'
    },
    {
      id: 'ABN-319',
      patientId: 'ID-4872',
      test: 'Tumor Marker Panel',
      parameter: 'CA-125',
      value: '42',
      unit: 'U/mL',
      reference: '<35',
      deviation: 'High',
      clinicalSignificance: 'Yes'
    },
    {
      id: 'ABN-318',
      patientId: 'ID-4926',
      test: 'Complete Blood Count',
      parameter: 'Hemoglobin',
      value: '10.8',
      unit: 'g/dL',
      reference: '12-16',
      deviation: 'Low',
      clinicalSignificance: 'Yes'
    },
    {
      id: 'ABN-317',
      patientId: 'ID-5863',
      test: 'Comprehensive Metabolic Panel',
      parameter: 'Glucose',
      value: '136',
      unit: 'mg/dL',
      reference: '70-100',
      deviation: 'High',
      clinicalSignificance: 'No'
    },
  ];
  
  const labParameterTrend = [
    { date: '2025-01-10', value: 12.8, reference: 13.0 },
    { date: '2025-02-07', value: 12.2, reference: 13.0 },
    { date: '2025-03-05', value: 11.5, reference: 13.0 },
    { date: '2025-04-02', value: 10.8, reference: 13.0 },
    { date: '2025-04-28', value: 10.2, reference: 13.0 },
  ];
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'normal':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Normal</Badge>;
      case 'abnormal':
        return <Badge variant="destructive">Abnormal</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Pending Review</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  const getDeviationBadge = (deviation: string) => {
    switch (deviation) {
      case 'High':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">High</Badge>;
      case 'Low':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Low</Badge>;
      default:
        return <Badge>Normal</Badge>;
    }
  };
  
  return (
    <MainLayout>
      <PageHeader 
        title="Laboratory Results" 
        description="Research laboratory data and abnormal value tracking"
        breadcrumbs={[
          { label: 'Research Data', link: '/research-data' },
          { label: 'Laboratory Results' }
        ]}
      />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-3">
          <Select 
            value={studyFilter} 
            onValueChange={setStudyFilter}
          >
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select study" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BEACON-CRC">BEACON-CRC Phase II Trial</SelectItem>
              <SelectItem value="BRAVADO">BRAVADO Metastatic Breast Cancer Study</SelectItem>
              <SelectItem value="PALADIN">PALADIN Lung Cancer Immunotherapy Trial</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="relative w-[250px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patient or test..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filters
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Results
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Lab Tests</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,842</div>
            <p className="text-xs text-muted-foreground mt-1">
              For all patients in study
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Abnormal Results</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">248</div>
            <p className="text-xs text-muted-foreground mt-1">
              13.5% of total lab results
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">14</div>
            <p className="text-xs text-muted-foreground mt-1">
              New results requiring review
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Results</TabsTrigger>
          <TabsTrigger value="abnormal">Abnormal Values</TabsTrigger>
          <TabsTrigger value="trends">Parameter Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Lab Results</CardTitle>
              <CardDescription>Recent laboratory test results for study patients</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lab ID</TableHead>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Test Name</TableHead>
                    <TableHead>Collected</TableHead>
                    <TableHead>Received</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reviewed By</TableHead>
                    <TableHead>Site</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patientLabResults.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell className="font-medium">{result.id}</TableCell>
                      <TableCell>{result.patientId}</TableCell>
                      <TableCell>{result.testName}</TableCell>
                      <TableCell>{result.collectedDate}</TableCell>
                      <TableCell>{result.receivedDate}</TableCell>
                      <TableCell>{getStatusBadge(result.status)}</TableCell>
                      <TableCell>{result.reviewedBy}</TableCell>
                      <TableCell>{result.site}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                        <Button variant="ghost" size="sm">Review</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Lab Results</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="abnormal" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Abnormal Lab Values</CardTitle>
              <CardDescription>Laboratory results outside reference ranges</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Test</TableHead>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Reference Range</TableHead>
                    <TableHead>Deviation</TableHead>
                    <TableHead>Clinically Significant</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {abnormalValues.map((value) => (
                    <TableRow key={value.id}>
                      <TableCell className="font-medium">{value.id}</TableCell>
                      <TableCell>{value.patientId}</TableCell>
                      <TableCell>{value.test}</TableCell>
                      <TableCell>{value.parameter}</TableCell>
                      <TableCell className="font-bold">{value.value}</TableCell>
                      <TableCell>{value.unit}</TableCell>
                      <TableCell>{value.reference}</TableCell>
                      <TableCell>{getDeviationBadge(value.deviation)}</TableCell>
                      <TableCell>{value.clinicalSignificance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Abnormal Values</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Parameter Trend Analysis</CardTitle>
              <CardDescription>Tracking parameter changes over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 mb-4">
                <Select defaultValue="hemoglobin">
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Select parameter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hemoglobin">Hemoglobin</SelectItem>
                    <SelectItem value="platelets">Platelets</SelectItem>
                    <SelectItem value="wbc">White Blood Cells</SelectItem>
                    <SelectItem value="alt">ALT</SelectItem>
                    <SelectItem value="creatinine">Creatinine</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="ID-4926">
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ID-4926">ID-4926</SelectItem>
                    <SelectItem value="ID-5241">ID-5241</SelectItem>
                    <SelectItem value="ID-4872">ID-4872</SelectItem>
                    <SelectItem value="ID-5863">ID-5863</SelectItem>
                    <SelectItem value="ID-5014">ID-5014</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={labParameterTrend}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[9, 14]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    name="Hemoglobin (g/dL)" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="reference" 
                    name="Lower Reference Limit" 
                    stroke="#82ca9d" 
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
              
              <div className="mt-4 p-4 border rounded-md bg-amber-50 border-amber-200">
                <h4 className="font-medium text-amber-800">Observation</h4>
                <p className="text-sm text-amber-700 mt-1">
                  Patient ID-4926 shows a consistent downward trend in hemoglobin levels over the past 4 months, 
                  with the most recent value (10.2 g/dL) below the reference range. Consider clinical evaluation.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full gap-4">
                <Button variant="outline" className="w-full">Generate Report</Button>
                <Button className="w-full">Flag for Follow-up</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default LabResultsPage;
