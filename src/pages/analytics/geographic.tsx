
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, Filter } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from '@/components/ui/progress';

const GeographicDistributionPage: React.FC = () => {
  const [studyFilter, setStudyFilter] = useState<string>("all");
  
  // Sample geographical distribution data
  const regionData = [
    { name: 'Northeast', patients: 215, sites: 8, percentage: 26.1 },
    { name: 'Southeast', patients: 184, sites: 7, percentage: 22.3 },
    { name: 'Midwest', patients: 156, sites: 6, percentage: 18.9 },
    { name: 'Southwest', patients: 102, sites: 4, percentage: 12.4 },
    { name: 'West', patients: 168, sites: 6, percentage: 20.3 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  const urbanRuralData = [
    { name: 'Urban', value: 62 },
    { name: 'Suburban', value: 28 },
    { name: 'Rural', value: 10 }
  ];
  
  const URBAN_COLORS = ['#8884d8', '#82ca9d', '#ffc658'];
  
  const siteDetails = [
    {
      id: 1,
      name: 'Memorial Cancer Center',
      location: 'New York, NY',
      region: 'Northeast',
      type: 'Urban',
      patients: 68,
      recruitment: 92
    },
    {
      id: 2,
      name: 'Atlanta Research Institute',
      location: 'Atlanta, GA',
      region: 'Southeast',
      type: 'Urban',
      patients: 54,
      recruitment: 86
    },
    {
      id: 3,
      name: 'Midwest Clinical Center',
      location: 'Chicago, IL',
      region: 'Midwest',
      type: 'Urban',
      patients: 61,
      recruitment: 88
    },
    {
      id: 4,
      name: 'University Medical South',
      location: 'Houston, TX',
      region: 'Southwest',
      type: 'Urban',
      patients: 42,
      recruitment: 84
    },
    {
      id: 5,
      name: 'Pacific Research Institute',
      location: 'San Francisco, CA',
      region: 'West',
      type: 'Urban',
      patients: 58,
      recruitment: 90
    },
    {
      id: 6,
      name: 'Cambridge Medical Partners',
      location: 'Boston, MA',
      region: 'Northeast',
      type: 'Urban',
      patients: 52,
      recruitment: 88
    },
  ];
  
  return (
    <MainLayout>
      <PageHeader 
        title="Geographic Distribution" 
        description="Analysis of patient and site distribution across regions"
        breadcrumbs={[
          { label: 'Analytics', link: '/analytics' },
          { label: 'Geographic Distribution' }
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
            Export Map
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Patient Distribution by Region</CardTitle>
            <CardDescription>Number of patients enrolled across geographic regions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={regionData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="patients" name="Patients" fill="#8884d8" />
                <Bar yAxisId="right" dataKey="sites" name="Sites" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Urban/Rural Distribution</CardTitle>
            <CardDescription>Patient distribution by location type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={urbanRuralData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {urbanRuralData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={URBAN_COLORS[index % URBAN_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Regional Patient Distribution</CardTitle>
          <CardDescription>Percentage of patients by geographic region</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {regionData.map((region) => (
              <div key={region.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{region.name}</span>
                  <span className="text-sm text-muted-foreground">{region.patients} patients ({region.percentage}%)</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${region.percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{region.sites} sites</span>
                  <span>Average: {Math.round(region.patients / region.sites)} patients per site</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Clinical Site Locations</CardTitle>
          <CardDescription>List of active research sites by location</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Site Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Patients</TableHead>
                <TableHead>Recruitment Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {siteDetails.map((site) => (
                <TableRow key={site.id}>
                  <TableCell className="font-medium">{site.name}</TableCell>
                  <TableCell>{site.location}</TableCell>
                  <TableCell>{site.region}</TableCell>
                  <TableCell>{site.type}</TableCell>
                  <TableCell>{site.patients}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={site.recruitment} className="h-2 w-20" />
                      <span className="text-sm">{site.recruitment}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default GeographicDistributionPage;
