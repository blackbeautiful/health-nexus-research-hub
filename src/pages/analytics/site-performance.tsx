
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, Filter, AlertTriangle, Award, BadgeCheck } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';

const SitePerformancePage: React.FC = () => {
  const [studyFilter, setStudyFilter] = useState<string>("all");
  
  // Sample site performance data
  const sitePerformanceData = [
    { 
      id: 1,
      name: "Memorial Cancer Center", 
      location: "Chicago, IL",
      enrollment: 85, 
      retention: 92, 
      dataQuality: 96,
      protocolAdherence: 94,
      overallScore: 91.8,
      status: "top-performer"
    },
    { 
      id: 2,
      name: "University Medical Research", 
      location: "Boston, MA",
      enrollment: 78, 
      retention: 88, 
      dataQuality: 91,
      protocolAdherence: 89,
      overallScore: 86.5,
      status: "good"
    },
    { 
      id: 3,
      name: "Pacific Research Institute", 
      location: "San Francisco, CA",
      enrollment: 90, 
      retention: 85, 
      dataQuality: 87,
      protocolAdherence: 92,
      overallScore: 88.5,
      status: "good"
    },
    { 
      id: 4,
      name: "Midwest Clinical Research", 
      location: "Minneapolis, MN",
      enrollment: 65, 
      retention: 83, 
      dataQuality: 82,
      protocolAdherence: 80,
      overallScore: 77.5,
      status: "needs-improvement"
    },
    { 
      id: 5,
      name: "Southern Medical Center", 
      location: "Atlanta, GA",
      enrollment: 70, 
      retention: 79, 
      dataQuality: 85,
      protocolAdherence: 87,
      overallScore: 80.3,
      status: "good"
    },
  ];
  
  const siteMetricsData = [
    { name: 'Site 1', enrollment: 85, retention: 92, dataQuality: 96, protocolAdherence: 94 },
    { name: 'Site 2', enrollment: 78, retention: 88, dataQuality: 91, protocolAdherence: 89 },
    { name: 'Site 3', enrollment: 90, retention: 85, dataQuality: 87, protocolAdherence: 92 },
    { name: 'Site 4', enrollment: 65, retention: 83, dataQuality: 82, protocolAdherence: 80 },
    { name: 'Site 5', enrollment: 70, retention: 79, dataQuality: 85, protocolAdherence: 87 }
  ];
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "top-performer":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Top Performer</Badge>;
      case "good":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Good Standing</Badge>;
      case "needs-improvement":
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Needs Improvement</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  return (
    <MainLayout>
      <PageHeader 
        title="Site Performance" 
        description="Analytics on research site efficiency and performance metrics"
        breadcrumbs={[
          { label: 'Analytics', link: '/analytics' },
          { label: 'Site Performance' }
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
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Top Performing Site</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Memorial Cancer Center</div>
            <p className="text-sm text-muted-foreground">
              Overall Score: 91.8%
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Site Score</CardTitle>
            <BadgeCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">84.9%</div>
            <p className="text-sm text-muted-foreground">
              Across all active sites
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sites Needing Attention</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">1 site</div>
            <p className="text-sm text-muted-foreground">
              Below 80% performance threshold
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Site Performance Metrics</CardTitle>
          <CardDescription>Comparison of key performance indicators across sites</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={siteMetricsData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Bar dataKey="enrollment" name="Enrollment" fill="#8884d8" />
              <Bar dataKey="retention" name="Retention" fill="#82ca9d" />
              <Bar dataKey="dataQuality" name="Data Quality" fill="#ffc658" />
              <Bar dataKey="protocolAdherence" name="Protocol Adherence" fill="#ff8042" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Site Performance Details</CardTitle>
          <CardDescription>Comprehensive overview of all research sites</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Site Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Enrollment</TableHead>
                <TableHead>Retention</TableHead>
                <TableHead>Data Quality</TableHead>
                <TableHead>Protocol Adherence</TableHead>
                <TableHead>Overall</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sitePerformanceData.map((site) => (
                <TableRow key={site.id}>
                  <TableCell className="font-medium">{site.name}</TableCell>
                  <TableCell>{site.location}</TableCell>
                  <TableCell>{site.enrollment}%</TableCell>
                  <TableCell>{site.retention}%</TableCell>
                  <TableCell>{site.dataQuality}%</TableCell>
                  <TableCell>{site.protocolAdherence}%</TableCell>
                  <TableCell className="font-medium">{site.overallScore}%</TableCell>
                  <TableCell>{getStatusBadge(site.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">View Detailed Site Reports</Button>
        </CardFooter>
      </Card>
    </MainLayout>
  );
};

export default SitePerformancePage;
