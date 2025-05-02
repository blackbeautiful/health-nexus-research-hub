
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Plus, FileText, Calendar, ArrowUpRight, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Diagnosis {
  id: string;
  code: string;
  name: string;
  category: string;
  date: string;
  provider: string;
  status: 'active' | 'resolved' | 'chronic';
}

const DiagnosesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const diagnoses: Diagnosis[] = [
    { id: 'D-1001', code: 'C50.211', name: 'Malignant neoplasm of upper-inner quadrant of right female breast', category: 'Oncology', date: '2022-09-15', provider: 'Dr. Rebecca Martinez', status: 'active' },
    { id: 'D-1002', code: 'I10', name: 'Essential (primary) hypertension', category: 'Cardiovascular', date: '2020-03-22', provider: 'Dr. James Wilson', status: 'chronic' },
    { id: 'D-1003', code: 'E11.9', name: 'Type 2 diabetes mellitus without complications', category: 'Endocrine', date: '2019-11-05', provider: 'Dr. Elena Rodriguez', status: 'chronic' },
    { id: 'D-1004', code: 'J45.909', name: 'Unspecified asthma, uncomplicated', category: 'Respiratory', date: '2018-06-12', provider: 'Dr. Robert Kim', status: 'chronic' },
    { id: 'D-1005', code: 'M54.5', name: 'Low back pain', category: 'Musculoskeletal', date: '2021-08-30', provider: 'Dr. Anna Lopez', status: 'resolved' },
  ];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'chronic': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return '';
    }
  };
  
  const filteredDiagnoses = diagnoses.filter(diagnosis => {
    const matchesSearch = diagnosis.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          diagnosis.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || diagnosis.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const categories = Array.from(new Set(diagnoses.map(d => d.category)));

  return (
    <MainLayout>
      <PageHeader
        title="Patient Diagnoses"
        description="Manage and track patient diagnostic information"
        breadcrumbs={[
          { label: 'Medical Records', link: '/medical-records' },
          { label: 'Diagnoses' }
        ]}
        action={{
          label: 'New Diagnosis',
          icon: Plus,
          onClick: () => console.log('Add new diagnosis')
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Diagnoses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {diagnoses.filter(d => d.status === 'active').length}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Requiring active management
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Chronic Conditions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {diagnoses.filter(d => d.status === 'chronic').length}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Ongoing management required
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resolved Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {diagnoses.filter(d => d.status === 'resolved').length}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Historical diagnoses
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Diagnosis List</CardTitle>
              <CardDescription>Patient diagnoses and medical conditions</CardDescription>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search diagnoses..."
                  className="pl-8 w-full md:w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="chronic">Chronic</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Diagnosis</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDiagnoses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No diagnoses match your search criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDiagnoses.map((diagnosis) => (
                    <TableRow key={diagnosis.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">{diagnosis.code}</TableCell>
                      <TableCell>{diagnosis.name}</TableCell>
                      <TableCell>{diagnosis.category}</TableCell>
                      <TableCell>{diagnosis.date}</TableCell>
                      <TableCell>{diagnosis.provider}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(diagnosis.status)}>
                          {diagnosis.status.charAt(0).toUpperCase() + diagnosis.status.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4">
          <div className="text-sm text-muted-foreground">
            Showing {filteredDiagnoses.length} of {diagnoses.length} diagnoses
          </div>
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            View Full History
          </Button>
        </CardFooter>
      </Card>
    </MainLayout>
  );
};

export default DiagnosesPage;
