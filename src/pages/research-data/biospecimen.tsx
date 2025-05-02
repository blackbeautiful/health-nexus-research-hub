
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, Filter, Microscope, AlertCircle, Search, Plus, Thermometer } from 'lucide-react';
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
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const BiospecimenTrackingPage: React.FC = () => {
  const [studyFilter, setStudyFilter] = useState<string>("BEACON-CRC");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Sample biospecimen data
  const biospecimens = [
    {
      id: 'BIO-2541',
      type: 'Blood',
      subtype: 'Plasma',
      patientId: 'ID-5863',
      collectionDate: '2025-04-30',
      quantity: '3.5 mL',
      location: 'Freezer A-12',
      status: 'stored',
      site: 'Memorial Cancer Center'
    },
    {
      id: 'BIO-2540',
      type: 'Blood',
      subtype: 'Serum',
      patientId: 'ID-5241',
      collectionDate: '2025-04-28',
      quantity: '4.0 mL',
      location: 'Freezer A-12',
      status: 'stored',
      site: 'University Medical Research'
    },
    {
      id: 'BIO-2539',
      type: 'Tissue',
      subtype: 'Tumor Biopsy',
      patientId: 'ID-4926',
      collectionDate: '2025-04-25',
      quantity: '250 mg',
      location: 'Freezer B-08',
      status: 'processing',
      site: 'Pacific Research Institute'
    },
    {
      id: 'BIO-2538',
      type: 'Urine',
      subtype: 'Clean Catch',
      patientId: 'ID-4872',
      collectionDate: '2025-04-23',
      quantity: '20 mL',
      location: 'Freezer C-03',
      status: 'stored',
      site: 'Memorial Cancer Center'
    },
    {
      id: 'BIO-2537',
      type: 'Blood',
      subtype: 'Whole Blood',
      patientId: 'ID-5014',
      collectionDate: '2025-04-20',
      quantity: '6.0 mL',
      location: 'Freezer A-14',
      status: 'in-use',
      site: 'Atlanta Research Institute'
    }
  ];
  
  // Sample specimen distribution data
  const specimenDistribution = [
    { name: 'Blood', value: 524 },
    { name: 'Tissue', value: 218 },
    { name: 'Urine', value: 176 },
    { name: 'Saliva', value: 92 },
    { name: 'CSF', value: 43 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // Sample storage locations
  const storageLocations = [
    {
      id: 'ST-001',
      name: 'Freezer A-12',
      type: '-80°C Freezer',
      capacity: 500,
      occupied: 412,
      temperature: -82.3,
      status: 'normal',
      alarms: 0
    },
    {
      id: 'ST-002',
      name: 'Freezer B-08',
      type: '-80°C Freezer',
      capacity: 500,
      occupied: 356,
      temperature: -80.8,
      status: 'normal',
      alarms: 0
    },
    {
      id: 'ST-003',
      name: 'Freezer C-03',
      type: '-20°C Freezer',
      capacity: 300,
      occupied: 187,
      temperature: -22.6,
      status: 'warning',
      alarms: 1
    },
    {
      id: 'ST-004',
      name: 'Refrigerator D-01',
      type: '4°C Refrigerator',
      capacity: 200,
      occupied: 124,
      temperature: 4.2,
      status: 'normal',
      alarms: 0
    },
    {
      id: 'ST-005',
      name: 'LN2 Tank E-02',
      type: 'Liquid Nitrogen',
      capacity: 1000,
      occupied: 642,
      temperature: -196.0,
      status: 'normal',
      alarms: 0
    }
  ];
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'stored':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Stored</Badge>;
      case 'processing':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Processing</Badge>;
      case 'in-use':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">In Use</Badge>;
      case 'depleted':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">Depleted</Badge>;
      case 'normal':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Normal</Badge>;
      case 'warning':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Warning</Badge>;
      case 'alert':
        return <Badge variant="destructive">Alert</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  return (
    <MainLayout>
      <PageHeader 
        title="Biospecimen Tracking" 
        description="Manage and monitor research biospecimen inventory"
        breadcrumbs={[
          { label: 'Research Data', link: '/research-data' },
          { label: 'Biospecimen Tracking' }
        ]}
        action={{
          label: "Add Specimen",
          icon: Plus,
          onClick: () => console.log("Add new biospecimen")
        }}
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
              placeholder="Search specimens..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Inventory
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Specimens</CardTitle>
            <Microscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,053</div>
            <p className="text-xs text-muted-foreground mt-1">
              From 825 unique patients
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Processing Queue</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">8</div>
            <p className="text-xs text-muted-foreground mt-1">
              Specimens awaiting processing
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Storage Utilization</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">76%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all storage units
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Biospecimen Activity</CardTitle>
            <CardDescription>Recently collected or processed specimens</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Specimen ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Collection Date</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {biospecimens.map((specimen) => (
                  <TableRow key={specimen.id}>
                    <TableCell className="font-medium">{specimen.id}</TableCell>
                    <TableCell>{specimen.type} ({specimen.subtype})</TableCell>
                    <TableCell>{specimen.patientId}</TableCell>
                    <TableCell>{specimen.collectionDate}</TableCell>
                    <TableCell>{specimen.quantity}</TableCell>
                    <TableCell>{specimen.location}</TableCell>
                    <TableCell>{getStatusBadge(specimen.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View All Specimens</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Specimen Distribution</CardTitle>
            <CardDescription>By specimen type</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={specimenDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {specimenDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
              {specimenDistribution.map((item, index) => (
                <div key={item.name} className="flex items-center">
                  <span
                    className="w-3 h-3 rounded-full mr-1"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></span>
                  <span className="text-xs">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="storage" className="mb-6">
        <TabsList>
          <TabsTrigger value="storage">Storage Locations</TabsTrigger>
          <TabsTrigger value="processing">Processing Queue</TabsTrigger>
          <TabsTrigger value="disposition">Specimen Disposition</TabsTrigger>
        </TabsList>
        
        <TabsContent value="storage" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Storage Units</CardTitle>
              <CardDescription>Biospecimen storage locations and status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Utilization</TableHead>
                    <TableHead>Temperature</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Alarms</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {storageLocations.map((location) => (
                    <TableRow key={location.id}>
                      <TableCell className="font-medium">{location.id}</TableCell>
                      <TableCell>{location.name}</TableCell>
                      <TableCell>{location.type}</TableCell>
                      <TableCell>{location.capacity} specimens</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${location.occupied / location.capacity > 0.9 ? 'bg-amber-500' : 'bg-blue-500'}`}
                              style={{ width: `${(location.occupied / location.capacity) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {Math.round((location.occupied / location.capacity) * 100)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{location.temperature}°C</TableCell>
                      <TableCell>{getStatusBadge(location.status)}</TableCell>
                      <TableCell>{location.alarms}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Details</Button>
                        <Button variant="ghost" size="sm">Monitor</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="processing" className="mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-medium">Processing Queue</h3>
                <p className="mt-2 mb-4 text-sm text-muted-foreground max-w-sm">
                  Track specimens in processing workflow. Monitor processing stages 
                  and maintain chain of custody for all biospecimens.
                </p>
                <Button>
                  View Processing Workflow
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="disposition" className="mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <Microscope className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-medium">Specimen Disposition</h3>
                <p className="mt-2 mb-4 text-sm text-muted-foreground max-w-sm">
                  Manage the disposition of biospecimens including transfer, destruction, 
                  or return to patients according to protocol requirements.
                </p>
                <Button>
                  Manage Specimen Disposition
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default BiospecimenTrackingPage;
