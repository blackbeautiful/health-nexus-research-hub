
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Download, Pill, Search, FileText, Filter, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, LineChart, Line
} from 'recharts';

const MedicationReportsPage = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('quarter');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data for medication usage
  const topMedicationsByVolume = [
    { name: "Paclitaxel", count: 387, cost: 542980, category: "Chemotherapy" },
    { name: "Trastuzumab", count: 245, cost: 1245000, category: "Targeted Therapy" },
    { name: "Dexamethasone", count: 412, cost: 45320, category: "Supportive Care" },
    { name: "Ondansetron", count: 384, cost: 76800, category: "Supportive Care" },
    { name: "Pembrolizumab", count: 156, cost: 1123200, category: "Immunotherapy" },
    { name: "Carboplatin", count: 298, cost: 268200, category: "Chemotherapy" },
    { name: "Filgrastim", count: 265, cost: 238500, category: "Supportive Care" },
    { name: "Docetaxel", count: 208, cost: 249600, category: "Chemotherapy" }
  ];
  
  const medicationCostTrend = [
    { month: 'Jan', chemotherapy: 423000, targeted: 845000, immunotherapy: 620000, supportive: 124000 },
    { month: 'Feb', chemotherapy: 410000, targeted: 862000, immunotherapy: 645000, supportive: 118000 },
    { month: 'Mar', chemotherapy: 435000, targeted: 890000, immunotherapy: 680000, supportive: 132000 },
    { month: 'Apr', chemotherapy: 428000, targeted: 910000, immunotherapy: 710000, supportive: 129000 },
    { month: 'May', chemotherapy: 442000, targeted: 925000, immunotherapy: 695000, supportive: 135000 },
    { month: 'Jun', chemotherapy: 450000, targeted: 935000, immunotherapy: 705000, supportive: 140000 }
  ];
  
  const categoryDistribution = [
    { name: "Chemotherapy", value: 32 },
    { name: "Targeted Therapy", value: 28 },
    { name: "Immunotherapy", value: 24 },
    { name: "Supportive Care", value: 16 }
  ];
  
  const adherenceRates = [
    { name: "Paclitaxel", rate: 92 },
    { name: "Trastuzumab", rate: 88 },
    { name: "Pembrolizumab", rate: 94 },
    { name: "Carboplatin", rate: 90 },
    { name: "Docetaxel", rate: 86 }
  ];
  
  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const filteredMedications = topMedicationsByVolume.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || med.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const totalCost = topMedicationsByVolume.reduce((acc, med) => acc + med.cost, 0);
  const totalPrescriptions = topMedicationsByVolume.reduce((acc, med) => acc + med.count, 0);
  
  return (
    <MainLayout>
      <PageHeader
        title="Medication Reports"
        description="Prescribing patterns, costs, and analytics"
        breadcrumbs={[
          { label: 'Clinical Reports', link: '/clinical-reports' },
          { label: 'Medication Reports' }
        ]}
        action={{
          label: 'Generate Report',
          icon: FileText,
          onClick: () => console.log('Generate medication report')
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
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Medication category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Chemotherapy">Chemotherapy</SelectItem>
              <SelectItem value="Targeted Therapy">Targeted Therapy</SelectItem>
              <SelectItem value="Immunotherapy">Immunotherapy</SelectItem>
              <SelectItem value="Supportive Care">Supportive Care</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Medication Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalCost)}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span className="text-amber-500 mr-1">↑ 8.4%</span> from previous period
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Prescriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPrescriptions}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span className="text-green-500 mr-1">↑ 5.2%</span> from previous period
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Cost Per Prescription</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalCost / totalPrescriptions)}
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span className="text-amber-500 mr-1">↑ 3.1%</span> from previous period
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Medication Category Distribution</CardTitle>
            <CardDescription>Prescription breakdown by therapeutic class</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  <Legend layout="vertical" align="center" verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Medication Adherence Rates</CardTitle>
            <CardDescription>Patient adherence to medication regimens</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={adherenceRates}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 30,
                  left: 80,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="name" width={120} />
                <Tooltip formatter={(value) => [`${value}%`, 'Adherence Rate']} />
                <Bar dataKey="rate" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Medication Cost Trends</CardTitle>
          <CardDescription>Monthly expenditure by medication category</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={medicationCostTrend}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [formatCurrency(value as number), 'Cost']} />
              <Legend />
              <Line type="monotone" dataKey="chemotherapy" name="Chemotherapy" stroke="#4F46E5" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="targeted" name="Targeted Therapy" stroke="#10B981" />
              <Line type="monotone" dataKey="immunotherapy" name="Immunotherapy" stroke="#F59E0B" />
              <Line type="monotone" dataKey="supportive" name="Supportive Care" stroke="#8B5CF6" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>Top Medications by Volume</CardTitle>
              <CardDescription>Most frequently prescribed medications</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search medications..."
                className="pl-8 w-full md:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="volume">
            <TabsList className="mb-6">
              <TabsTrigger value="volume">By Volume</TabsTrigger>
              <TabsTrigger value="cost">By Cost</TabsTrigger>
              <TabsTrigger value="growth">By Growth Rate</TabsTrigger>
            </TabsList>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medication</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Prescriptions</TableHead>
                  <TableHead className="text-right">Total Cost</TableHead>
                  <TableHead className="text-right">Avg. Cost Per Rx</TableHead>
                  <TableHead>% of Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMedications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No medications match your search criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMedications
                    .sort((a, b) => b.count - a.count) // Sort by prescription count for "By Volume" tab
                    .map((medication) => {
                      const percentOfTotal = (medication.count / totalPrescriptions) * 100;
                      
                      return (
                        <TableRow key={medication.name}>
                          <TableCell>
                            <div className="flex items-center">
                              <Pill className="h-4 w-4 mr-2 text-primary" />
                              {medication.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                              {medication.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">{medication.count}</TableCell>
                          <TableCell className="text-right font-medium">{formatCurrency(medication.cost)}</TableCell>
                          <TableCell className="text-right">{formatCurrency(medication.cost / medication.count)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={percentOfTotal} className="h-2 w-20" />
                              <span className="text-xs">{percentOfTotal.toFixed(1)}%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                  })
                )}
              </TableBody>
            </Table>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t p-4 flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredMedications.length} of {topMedicationsByVolume.length} medications
          </div>
          <Button variant="outline" size="sm">
            <DollarSign className="mr-2 h-4 w-4" />
            Cost Analysis
          </Button>
        </CardFooter>
      </Card>
    </MainLayout>
  );
};

export default MedicationReportsPage;
