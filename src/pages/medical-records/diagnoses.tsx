
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Download, HeartPulse } from 'lucide-react';

const DiagnosesPage = () => {
  const patientDiagnoses = [
    { 
      id: 'DX-10245', 
      date: '2025-04-10', 
      code: 'C50.911', 
      diagnosis: 'Malignant neoplasm of unspecified site of right female breast',
      diagnosisType: 'Primary',
      status: 'Active',
      provider: 'Dr. Rebecca Martinez',
      notes: 'Stage IIA (T2N0M0). Confirmed via biopsy and imaging.'
    },
    { 
      id: 'DX-10244', 
      date: '2025-04-10', 
      code: 'Z17.0', 
      diagnosis: 'Estrogen receptor positive status',
      diagnosisType: 'Secondary',
      status: 'Active',
      provider: 'Dr. Rebecca Martinez',
      notes: 'ER+/PR+, HER2-'
    },
    { 
      id: 'DX-10243', 
      date: '2025-04-08', 
      code: 'E66.9', 
      diagnosis: 'Obesity, unspecified',
      diagnosisType: 'Secondary',
      status: 'Active',
      provider: 'Dr. James Wilson',
      notes: 'BMI 32.4'
    },
    { 
      id: 'DX-10242', 
      date: '2024-08-15', 
      code: 'I10', 
      diagnosis: 'Essential (primary) hypertension',
      diagnosisType: 'Secondary',
      status: 'Active',
      provider: 'Dr. Elena Rodriguez',
      notes: 'Well-controlled on current medication regimen'
    },
    { 
      id: 'DX-10241', 
      date: '2023-11-22', 
      code: 'J45.909', 
      diagnosis: 'Unspecified asthma, uncomplicated',
      diagnosisType: 'Secondary',
      status: 'Resolved',
      provider: 'Dr. Robert Kim',
      notes: 'No recent exacerbations'
    }
  ];

  return (
    <MainLayout>
      <PageHeader
        title="Diagnoses"
        description="View and manage patient diagnoses and conditions"
        breadcrumbs={[
          { label: 'Medical Records', link: '/medical-records' },
          { label: 'Diagnoses' }
        ]}
        action={{
          label: 'Add Diagnosis',
          icon: HeartPulse,
          onClick: () => console.log('Add new diagnosis')
        }}
      />

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Patient Diagnoses</CardTitle>
              <CardDescription>Sarah Johnson (PT-12345)</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search diagnoses..."
                  className="pl-8 w-[200px] md:w-[300px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Diagnoses</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
              <TabsTrigger value="primary">Primary</TabsTrigger>
              <TabsTrigger value="secondary">Secondary</TabsTrigger>
            </TabsList>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Diagnosis ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>ICD-10 Code</TableHead>
                  <TableHead>Diagnosis</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Provider</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patientDiagnoses.map((dx) => (
                  <TableRow key={dx.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{dx.id}</TableCell>
                    <TableCell>{dx.date}</TableCell>
                    <TableCell>{dx.code}</TableCell>
                    <TableCell>{dx.diagnosis}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={dx.diagnosisType === 'Primary' ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-gray-100 text-gray-800 border-gray-200'}>
                        {dx.diagnosisType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={dx.status === 'Active' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-amber-100 text-amber-800 border-amber-200'}>
                        {dx.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{dx.provider}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t p-4">
          <Button variant="outline" className="w-full">Load More Records</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Diagnosis Details</CardTitle>
          <CardDescription>
            Selected diagnosis information and related clinical data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Malignant neoplasm of unspecified site of right female breast</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Primary</Badge>
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Active</Badge>
                <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">ICD-10: C50.911</Badge>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium mb-1 text-muted-foreground">Diagnosis Date</h4>
                <p>April 10, 2025</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1 text-muted-foreground">Diagnosed By</h4>
                <p>Dr. Rebecca Martinez</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1 text-muted-foreground">Diagnostic Method</h4>
                <p>Core needle biopsy, Mammogram, Ultrasound</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1 text-muted-foreground">Stage</h4>
                <p>Stage IIA (T2N0M0)</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-1 text-muted-foreground">Clinical Notes</h4>
              <p className="text-sm">
                Patient presented with a palpable mass in the right breast. Diagnostic mammogram revealed a 2.3 cm 
                mass in the upper outer quadrant. Core needle biopsy confirmed invasive ductal carcinoma. 
                Immunohistochemistry showed ER+/PR+, HER2-. No evidence of metastatic disease on staging scans.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-1 text-muted-foreground">Treatment Plan</h4>
              <p className="text-sm">
                Surgical resection (lumpectomy) followed by adjuvant radiation therapy and hormone therapy with an aromatase inhibitor.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default DiagnosesPage;
