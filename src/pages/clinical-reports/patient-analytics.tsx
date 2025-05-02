
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Download, Users, Clock, Calendar, MapPin, UserPlus, ArrowUpRight
} from 'lucide-react';
import {
  PieChart, Pie, BarChart, Bar, LineChart, Line, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const PatientAnalyticsPage = () => {
  const ageDemographics = [
    { name: '0-18', value: 32 },
    { name: '19-35', value: 78 },
    { name: '36-50', value: 143 },
    { name: '51-65', value: 187 },
    { name: '66-80', value: 113 },
    { name: '80+', value: 41 }
  ];
  
  const genderDemographics = [
    { name: 'Female', value: 317 },
    { name: 'Male', value: 268 },
    { name: 'Non-binary', value: 9 }
  ];
  
  const ethnicityDemographics = [
    { name: 'Caucasian', value: 246 },
    { name: 'African American', value: 102 },
    { name: 'Hispanic/Latino', value: 124 },
    { name: 'Asian', value: 87 },
    { name: 'Other', value: 35 }
  ];
  
  const diagnosisByType = [
    { name: 'Breast Cancer', value: 98 },
    { name: 'Lung Cancer', value: 72 },
    { name: 'Colorectal Cancer', value: 64 },
    { name: 'Prostate Cancer', value: 57 },
    { name: 'Lymphoma', value: 43 },
    { name: 'Leukemia', value: 38 },
    { name: 'Melanoma', value: 31 },
    { name: 'Other', value: 191 }
  ];
  
  const patientTrends = [
    { month: 'Jan', newPatients: 28, dischargedPatients: 22, activePatients: 476 },
    { month: 'Feb', newPatients: 31, dischargedPatients: 19, activePatients: 488 },
    { month: 'Mar', newPatients: 25, dischargedPatients: 24, activePatients: 489 },
    { month: 'Apr', newPatients: 34, dischargedPatients: 18, activePatients: 505 },
    { month: 'May', newPatients: 29, dischargedPatients: 21, activePatients: 513 },
    { month: 'Jun', newPatients: 32, dischargedPatients: 26, activePatients: 519 },
    { month: 'Jul', newPatients: 37, dischargedPatients: 22, activePatients: 534 },
    { month: 'Aug', newPatients: 30, dischargedPatients: 24, activePatients: 540 },
    { month: 'Sep', newPatients: 33, dischargedPatients: 25, activePatients: 548 },
    { month: 'Oct', newPatients: 39, dischargedPatients: 27, activePatients: 560 },
    { month: 'Nov', newPatients: 35, dischargedPatients: 23, activePatients: 572 },
    { month: 'Dec', newPatients: 42, dischargedPatients: 28, activePatients: 586 }
  ];
  
  const insuranceTypes = [
    { name: 'Private Insurance', value: 312 },
    { name: 'Medicare', value: 173 },
    { name: 'Medicaid', value: 84 },
    { name: 'Self-Pay', value: 18 },
    { name: 'Other', value: 7 }
  ];
  
  const locationData = [
    { name: 'San Francisco', value: 214 },
    { name: 'Oakland', value: 127 },
    { name: 'San Jose', value: 97 },
    { name: 'Palo Alto', value: 58 },
    { name: 'Berkeley', value: 42 },
    { name: 'Other Bay Area', value: 56 }
  ];

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

  return (
    <MainLayout>
      <PageHeader
        title="Patient Analytics"
        description="Demographics and patient population insights"
        breadcrumbs={[
          { label: 'Clinical Reports', link: '/clinical-reports' },
          { label: 'Patient Analytics' }
        ]}
        action={{
          label: 'Export Data',
          icon: Download,
          onClick: () => console.log('Export analytics data')
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div>
                <div className="text-2xl font-bold">594</div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <ArrowUpRight className="h-3.5 w-3.5 mr-1" /> 
                  <span>3.9% from last month</span>
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
            <CardTitle className="text-sm font-medium">New Patients (MTD)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div>
                <div className="text-2xl font-bold">42</div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <ArrowUpRight className="h-3.5 w-3.5 mr-1" /> 
                  <span>20% from previous month</span>
                </div>
              </div>
              <div className="ml-auto p-2 bg-green-50 text-green-500 rounded-full">
                <UserPlus className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Patient Age</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div>
                <div className="text-2xl font-bold">53.7</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <Clock className="h-3.5 w-3.5 mr-1" /> 
                  <span>Years old</span>
                </div>
              </div>
              <div className="ml-auto p-2 bg-amber-50 text-amber-500 rounded-full">
                <Calendar className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Service Area</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div>
                <div className="text-2xl font-bold">86%</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span>Bay Area residents</span>
                </div>
              </div>
              <div className="ml-auto p-2 bg-indigo-50 text-indigo-500 rounded-full">
                <MapPin className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="demographics" className="mb-6">
        <TabsList>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="trends">Patient Trends</TabsTrigger>
          <TabsTrigger value="diagnoses">Diagnoses</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="demographics">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Age Distribution</CardTitle>
                  <CardDescription>Patient population by age group</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={ageDemographics}
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
                        <Bar dataKey="value" name="Patients" fill="#0088FE" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Gender Distribution</CardTitle>
                  <CardDescription>Patient population by gender</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={genderDemographics}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {genderDemographics.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Ethnicity Distribution</CardTitle>
                  <CardDescription>Patient population by ethnicity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={ethnicityDemographics}
                          cx="50%"
                          cy="50%"
                          outerRadius={90}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {ethnicityDemographics.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="trends">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <CardTitle>Patient Population Trends</CardTitle>
                    <CardDescription>12-month patient volume analysis</CardDescription>
                  </div>
                  <Select defaultValue="year">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="year">Last 12 months</SelectItem>
                      <SelectItem value="6months">Last 6 months</SelectItem>
                      <SelectItem value="quarter">Last quarter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={patientTrends}
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
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="newPatients" 
                        name="New Patients" 
                        stroke="#0088FE" 
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="dischargedPatients" 
                        name="Discharged" 
                        stroke="#FF8042" 
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="activePatients" 
                        name="Active Patients" 
                        stroke="#00C49F" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="diagnoses">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Diagnosis Distribution</CardTitle>
                  <CardDescription>Patient population by primary diagnosis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={diagnosisByType}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label
                        >
                          {diagnosisByType.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                  <CardDescription>Patient population by location</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={locationData}
                        layout="vertical"
                        margin={{
                          top: 20,
                          right: 30,
                          left: 60,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" name="Patients" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="insurance">
            <Card>
              <CardHeader>
                <CardTitle>Insurance Coverage</CardTitle>
                <CardDescription>Patient population by insurance type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={insuranceTypes}
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
                      <Bar dataKey="value" name="Patients" fill="#8884d8">
                        {insuranceTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">
                  Note: Insurance data shown is based on current active patients only.
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
      
      <div className="flex justify-end gap-4">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Raw Data
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Charts
        </Button>
      </div>
    </MainLayout>
  );
};

export default PatientAnalyticsPage;
