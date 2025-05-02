
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, FileImage, Eye, Download, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ImagingResultsPage = () => {
  const imagingResults = [
    {
      id: 'IMG-1001',
      type: 'Mammogram',
      date: '2022-09-10',
      provider: 'Dr. Rebecca Martinez',
      status: 'completed',
      findings: 'Suspicious mass in upper outer quadrant of right breast',
      recommendation: 'Recommend ultrasound-guided biopsy'
    },
    {
      id: 'IMG-1002',
      type: 'Breast Ultrasound',
      date: '2022-09-12',
      provider: 'Dr. Rebecca Martinez',
      status: 'completed',
      findings: 'Hypoechoic mass measuring 1.8cm x 1.5cm at 10 o\'clock position, 4cm from nipple',
      recommendation: 'Ultrasound-guided core needle biopsy performed'
    },
    {
      id: 'IMG-1003',
      type: 'Chest CT',
      date: '2022-09-25',
      provider: 'Dr. Elena Rodriguez',
      status: 'completed',
      findings: 'No evidence of metastatic disease',
      recommendation: 'No further imaging needed at this time'
    },
    {
      id: 'IMG-1004',
      type: 'Bone Scan',
      date: '2022-09-27',
      provider: 'Dr. James Wilson',
      status: 'completed',
      findings: 'No evidence of skeletal metastases',
      recommendation: 'No further imaging needed at this time'
    },
    {
      id: 'IMG-1005',
      type: 'Mammogram',
      date: '2023-09-15',
      provider: 'Dr. Rebecca Martinez',
      status: 'completed',
      findings: 'Post-surgical changes in right breast. No suspicious masses or calcifications',
      recommendation: 'Routine follow up in 6 months'
    },
  ];

  return (
    <MainLayout>
      <PageHeader
        title="Imaging Results"
        description="View and manage patient imaging studies and results"
        breadcrumbs={[
          { label: 'Medical Records', link: '/medical-records' },
          { label: 'Imaging Results' }
        ]}
        action={{
          label: 'Upload Images',
          icon: FileImage,
          onClick: () => console.log('Upload images')
        }}
      />

      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Recent Imaging Studies</CardTitle>
              <CardDescription>Patient: Sarah Johnson (PT-12345)</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search studies..."
                  className="pl-8 w-[250px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Studies</TabsTrigger>
              <TabsTrigger value="xray">X-Ray</TabsTrigger>
              <TabsTrigger value="ct">CT Scan</TabsTrigger>
              <TabsTrigger value="mri">MRI</TabsTrigger>
              <TabsTrigger value="ultrasound">Ultrasound</TabsTrigger>
              <TabsTrigger value="mammogram">Mammogram</TabsTrigger>
            </TabsList>
            
            <div className="space-y-4">
              {imagingResults.map((study) => (
                <Card key={study.id} className="border overflow-hidden">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="md:col-span-1 bg-muted/30 flex items-center justify-center p-6">
                      <div className="text-center">
                        <FileImage className="h-16 w-16 mx-auto text-muted-foreground opacity-60" />
                        <div className="mt-2 text-sm font-medium">{study.type}</div>
                        <div className="text-xs text-muted-foreground">{study.date}</div>
                      </div>
                    </div>
                    <div className="md:col-span-2 p-6">
                      <div className="flex justify-between mb-3">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100">
                          {study.id}
                        </Badge>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-100">
                          {study.status.charAt(0).toUpperCase() + study.status.slice(1)}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-lg mb-2">{study.type}</h4>
                      <div className="text-sm mb-2">
                        <span className="text-muted-foreground">Provider: </span>
                        {study.provider}
                      </div>
                      <div className="mb-4">
                        <div className="text-sm font-medium">Findings</div>
                        <div className="text-sm">{study.findings}</div>
                      </div>
                      <div className="mb-4">
                        <div className="text-sm font-medium">Recommendation</div>
                        <div className="text-sm">{study.recommendation}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary">
                          <Eye className="mr-2 h-4 w-4" />
                          View Images
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t p-4">
          <Button variant="outline" className="w-full">Load More Results</Button>
        </CardFooter>
      </Card>
    </MainLayout>
  );
};

export default ImagingResultsPage;
