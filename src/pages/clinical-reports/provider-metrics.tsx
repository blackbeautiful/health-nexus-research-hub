
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar, Download, FileSpreadsheet, Search, User, ArrowUpDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend
} from 'recharts';

interface ProviderMetrics {
  name: string;
  role: string;
  patientLoad: number;
  patientSatisfaction: number;
  outcomeScore: number;
  efficiency: number;
  documentation: number;
  adherence: number;
}

const ProviderMetricsPage = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('quarter');
  const [searchTerm, setSearchTerm] = useState('');
  
  const providers: ProviderMetrics[] = [
    { 
      name: "Dr. Rebecca Martinez", 
      role: "Oncologist", 
      patientLoad: 75, 
      patientSatisfaction: 92, 
      outcomeScore: 88, 
      efficiency: 84, 
      documentation: 96,
      adherence: 90
    },
    { 
      name: "Dr. James Wilson", 
      role: "Surgeon", 
      patientLoad: 62, 
      patientSatisfaction: 88, 
      outcomeScore: 92, 
      efficiency: 78, 
      documentation: 82,
      adherence: 94
    },
    { 
      name: "Dr. Elena Rodriguez", 
      role: "Radiologist", 
      patientLoad: 85, 
      patientSatisfaction: 86, 
      outcomeScore: 90, 
      efficiency: 94, 
      documentation: 88,
      adherence: 96
    },
    { 
      name: "Dr. Michael Brown", 
      role: "Medical Oncologist", 
      patientLoad: 78, 
      patientSatisfaction: 90, 
      outcomeScore: 86, 
      efficiency: 82, 
      documentation: 90,
      adherence: 88
    },
    { 
      name: "Dr. Sarah Lee", 
      role: "Radiation Oncologist", 
      patientLoad: 68, 
      patientSatisfaction: 94, 
      outcomeScore: 84, 
      efficiency: 88, 
      documentation: 92,
      adherence: 86
    },
    { 
      name: "Dr. Robert Kim", 
      role: "Pathologist", 
      patientLoad: 72, 
      patientSatisfaction: 84, 
      outcomeScore: 94, 
      efficiency: 90, 
      documentation: 86,
      adherence: 92
    }
  ];
  
  const providerMetricsForRadar = [
    {
      subject: 'Patient Satisfaction',
      "Dr. Rebecca Martinez": 92,
      "Dr. James Wilson": 88,
      "Dr. Elena Rodriguez": 86,
      fullMark: 100,
    },
    {
      subject: 'Clinical Outcomes',
      "Dr. Rebecca Martinez": 88,
      "Dr. James Wilson": 92,
      "Dr. Elena Rodriguez": 90,
      fullMark: 100,
    },
    {
      subject: 'Efficiency',
      "Dr. Rebecca Martinez": 84,
      "Dr. James Wilson": 78,
      "Dr. Elena Rodriguez": 94,
      fullMark: 100,
    },
    {
      subject: 'Documentation',
      "Dr. Rebecca Martinez": 96,
      "Dr. James Wilson": 82,
      "Dr. Elena Rodriguez": 88,
      fullMark: 100,
    },
    {
      subject: 'Protocol Adherence',
      "Dr. Rebecca Martinez": 90,
      "Dr. James Wilson": 94,
      "Dr. Elena Rodriguez": 96,
      fullMark: 100,
    }
  ];
  
  const patientLoadData = [
    { name: "Dr. Rebecca Martinez", value: 75 },
    { name: "Dr. James Wilson", value: 62 },
    { name: "Dr. Elena Rodriguez", value: 85 },
    { name: "Dr. Michael Brown", value: 78 },
    { name: "Dr. Sarah Lee", value: 68 },
    { name: "Dr. Robert Kim", value: 72 }
  ];
  
  const filtered = providers.filter(provider => 
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <MainLayout>
      <PageHeader
        title="Provider Metrics"
        description="Performance analysis and quality metrics for healthcare providers"
        breadcrumbs={[
          { label: 'Clinical Reports', link: '/clinical-reports' },
          { label: 'Provider Metrics' }
        ]}
        action={{
          label: 'Download Report',
          icon: Download,
          onClick: () => console.log('Download provider metrics report')
        }}
      />
      
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-3">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-[160px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Detailed Reports
          </Button>
          <Button variant="outline" size="sm">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Provider Comparison
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <CardTitle>Provider Performance Overview</CardTitle>
                <CardDescription>Comparative analysis of key performance indicators</CardDescription>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search providers..."
                  className="pl-8 w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Provider</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Patient Load</TableHead>
                  <TableHead>Patient Satisfaction</TableHead>
                  <TableHead>Outcome Score</TableHead>
                  <TableHead>Overall Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((provider) => {
                  // Calculate overall rating (average of metrics)
                  const overall = Math.round((provider.patientSatisfaction + provider.outcomeScore + provider.efficiency + provider.documentation + provider.adherence) / 5);
                  
                  // Determine rating color
                  const getRatingColor = (score: number) => {
                    if (score >= 90) return 'bg-green-100 text-green-800 border-green-200';
                    if (score >= 80) return 'bg-blue-100 text-blue-800 border-blue-200';
                    if (score >= 70) return 'bg-amber-100 text-amber-800 border-amber-200';
                    return 'bg-red-100 text-red-800 border-red-200';
                  };
                  
                  return (
                    <TableRow key={provider.name}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {provider.name}
                        </div>
                      </TableCell>
                      <TableCell>{provider.role}</TableCell>
                      <TableCell>
                        {provider.patientLoad} patients
                        <Progress value={provider.patientLoad} max={100} className="h-1 mt-1" />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{provider.patientSatisfaction}%</span>
                          <Badge variant="outline" className={getRatingColor(provider.patientSatisfaction)}>
                            {provider.patientSatisfaction >= 90 ? 'Excellent' : 
                             provider.patientSatisfaction >= 80 ? 'Good' : 
                             provider.patientSatisfaction >= 70 ? 'Average' : 'Needs Improvement'}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{provider.outcomeScore}%</span>
                          <Badge variant="outline" className={getRatingColor(provider.outcomeScore)}>
                            {provider.outcomeScore >= 90 ? 'Excellent' : 
                             provider.outcomeScore >= 80 ? 'Good' : 
                             provider.outcomeScore >= 70 ? 'Average' : 'Needs Improvement'}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{overall}%</span>
                          <Badge variant="outline" className={getRatingColor(overall)}>
                            {overall >= 90 ? 'Excellent' : 
                             overall >= 80 ? 'Good' : 
                             overall >= 70 ? 'Average' : 'Needs Improvement'}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No providers found matching your search criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t p-4 flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filtered.length} of {providers.length} providers
            </div>
            <Button variant="outline" size="sm">View All Metrics</Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Provider Comparison</CardTitle>
            <CardDescription>Multi-dimensional performance analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={providerMetricsForRadar}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Dr. Rebecca Martinez"
                  dataKey="Dr. Rebecca Martinez"
                  stroke="#4F46E5"
                  fill="#4F46E5"
                  fillOpacity={0.2}
                />
                <Radar
                  name="Dr. James Wilson"
                  dataKey="Dr. James Wilson"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.2}
                />
                <Radar
                  name="Dr. Elena Rodriguez"
                  dataKey="Dr. Elena Rodriguez"
                  stroke="#F59E0B"
                  fill="#F59E0B"
                  fillOpacity={0.2}
                />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Patient Load Distribution</CardTitle>
            <CardDescription>Patient volume by provider</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={patientLoadData}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={150} />
                <Tooltip formatter={(value) => [`${value} patients`, 'Load']} />
                <Bar dataKey="value" fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Provider Detail Metrics</CardTitle>
          <CardDescription>Complete metrics breakdown for individual providers</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="rebecca">
            <TabsList className="mb-6">
              {providers.slice(0, 3).map((provider, index) => (
                <TabsTrigger key={index} value={provider.name.toLowerCase().split(' ')[1]}>
                  {provider.name}
                </TabsTrigger>
              ))}
              <TabsTrigger value="more">More Providers</TabsTrigger>
            </TabsList>
            
            {providers.slice(0, 3).map((provider, index) => (
              <TabsContent key={index} value={provider.name.toLowerCase().split(' ')[1]}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Patient Satisfaction</span>
                        <span>{provider.patientSatisfaction}%</span>
                      </div>
                      <Progress value={provider.patientSatisfaction} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        Patient-reported experience and satisfaction scores
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Clinical Outcomes</span>
                        <span>{provider.outcomeScore}%</span>
                      </div>
                      <Progress value={provider.outcomeScore} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        Measured treatment success rates and patient outcomes
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Efficiency</span>
                        <span>{provider.efficiency}%</span>
                      </div>
                      <Progress value={provider.efficiency} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        Resource utilization and operational efficiency metrics
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Documentation Quality</span>
                        <span>{provider.documentation}%</span>
                      </div>
                      <Progress value={provider.documentation} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        Completeness and accuracy of clinical documentation
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Protocol Adherence</span>
                        <span>{provider.adherence}%</span>
                      </div>
                      <Progress value={provider.adherence} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        Compliance with clinical protocols and best practices
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Patient Load</span>
                        <span>{provider.patientLoad} patients</span>
                      </div>
                      <Progress value={provider.patientLoad} max={100} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        Current active patient panel size
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-lg">Performance Summary</h4>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      Above Average
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {provider.name} demonstrates strong performance across key clinical metrics, with particular strengths 
                    in {provider.patientSatisfaction > 90 ? 'patient satisfaction' : 
                       provider.outcomeScore > 90 ? 'clinical outcomes' : 
                       provider.efficiency > 90 ? 'operational efficiency' : 
                       provider.documentation > 90 ? 'documentation quality' : 'protocol adherence'}.
                    Further improvement opportunities exist in 
                    {provider.patientSatisfaction < 85 ? ' patient satisfaction' : 
                     provider.outcomeScore < 85 ? ' clinical outcomes' : 
                     provider.efficiency < 85 ? ' operational efficiency' : 
                     provider.documentation < 85 ? ' documentation quality' : ' protocol adherence'}.
                  </p>
                  
                  <div className="flex gap-2">
                    <Button size="sm">View Full Profile</Button>
                    <Button size="sm" variant="outline">View Improvement Plan</Button>
                  </div>
                </div>
              </TabsContent>
            ))}
            
            <TabsContent value="more">
              <div className="flex items-center justify-center p-12">
                <div className="text-center">
                  <User className="h-12 w-12 mx-auto text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium">More Provider Metrics</h3>
                  <p className="mt-2 mb-4 text-sm text-muted-foreground max-w-sm">
                    View detailed metrics for additional providers in the complete provider metrics dashboard.
                  </p>
                  <Button>View All Providers</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default ProviderMetricsPage;
