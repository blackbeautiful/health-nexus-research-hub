
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { 
  Download, FileText, Database, Calendar, Filter, Settings, 
  Clock, CheckCircle, AlertCircle, FileX 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DataExportsPage = () => {
  const { toast } = useToast();
  const [selectedFormat, setSelectedFormat] = useState('csv');
  const [selectedStudy, setSelectedStudy] = useState('');
  const [exportProgress, setExportProgress] = useState<number | null>(null);
  const [includePatientData, setIncludePatientData] = useState(false);
  const [includeLabResults, setIncludeLabResults] = useState(false);

  // Export history data
  const exportHistory = [
    {
      id: 'EXP-001',
      name: 'Patient Demographics Export',
      format: 'CSV',
      size: '2.3 MB',
      status: 'completed',
      created: '2025-01-15 14:30',
      downloadCount: 3
    },
    {
      id: 'EXP-002',
      name: 'Lab Results Q4 2024',
      format: 'Excel',
      size: '15.7 MB',
      status: 'completed',
      created: '2025-01-14 09:15',
      downloadCount: 1
    },
    {
      id: 'EXP-003',
      name: 'Study BEACON-CRC Data',
      format: 'JSON',
      size: '45.2 MB',
      status: 'processing',
      created: '2025-01-15 16:45',
      downloadCount: 0
    }
  ];

  const handleExport = () => {
    setExportProgress(0);
    
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev === null) return null;
        const newValue = prev + 20;
        
        if (newValue >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setExportProgress(null);
            toast({
              title: "Export Complete",
              description: "Your data export is ready for download.",
            });
          }, 500);
        }
        
        return newValue;
      });
    }, 500);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="w-3 h-3 mr-1" />Processing</Badge>;
      case 'failed':
        return <Badge variant="destructive"><FileX className="w-3 h-3 mr-1" />Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <MainLayout>
      <PageHeader
        title="Data Exports"
        description="Export research data in various formats for analysis"
        breadcrumbs={[
          { label: 'Research Data', link: '/research-data' },
          { label: 'Data Exports' }
        ]}
        action={{
          label: 'Schedule Export',
          icon: Calendar,
          onClick: () => console.log('Schedule export')
        }}
      />

      <div className="grid gap-6">
        <Tabs defaultValue="export" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="export">Create Export</TabsTrigger>
            <TabsTrigger value="history">Export History</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Exports</TabsTrigger>
          </TabsList>

          <TabsContent value="export" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  Export Configuration
                </CardTitle>
                <CardDescription>
                  Configure your data export settings and format
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="study-select">Study/Dataset</Label>
                      <Select value={selectedStudy} onValueChange={setSelectedStudy}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select study or dataset" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beacon-crc">BEACON-CRC Study</SelectItem>
                          <SelectItem value="heart-trial">HEART Trial</SelectItem>
                          <SelectItem value="patient-registry">Patient Registry</SelectItem>
                          <SelectItem value="all-studies">All Studies</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="format-select">Export Format</Label>
                      <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="csv">CSV (Comma Separated)</SelectItem>
                          <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                          <SelectItem value="json">JSON</SelectItem>
                          <SelectItem value="xml">XML</SelectItem>
                          <SelectItem value="sas">SAS</SelectItem>
                          <SelectItem value="spss">SPSS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Date Range</Label>
                      <DatePickerWithRange className="w-full" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">Data Types to Include</Label>
                      <div className="space-y-3 mt-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="patient-data" 
                            checked={includePatientData}
                            onCheckedChange={(checked) => setIncludePatientData(checked === true)}
                          />
                          <Label htmlFor="patient-data">Patient Demographics</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="lab-results" 
                            checked={includeLabResults}
                            onCheckedChange={(checked) => setIncludeLabResults(checked === true)}
                          />
                          <Label htmlFor="lab-results">Laboratory Results</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="vital-signs" />
                          <Label htmlFor="vital-signs">Vital Signs</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="medications" />
                          <Label htmlFor="medications">Medications</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="procedures" />
                          <Label htmlFor="procedures">Procedures</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="imaging" />
                          <Label htmlFor="imaging">Imaging Results</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {exportProgress !== null && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Exporting data...</span>
                      <span>{exportProgress}%</span>
                    </div>
                    <Progress value={exportProgress} className="h-2" />
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  <Button variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Advanced Options
                  </Button>
                  <Button onClick={handleExport} disabled={exportProgress !== null}>
                    <Download className="w-4 h-4 mr-2" />
                    {exportProgress !== null ? 'Exporting...' : 'Export Data'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Export History</CardTitle>
                <CardDescription>
                  View and download previous data exports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Export Name</TableHead>
                      <TableHead>Format</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Downloads</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {exportHistory.map((export_item) => (
                      <TableRow key={export_item.id}>
                        <TableCell className="font-medium">{export_item.name}</TableCell>
                        <TableCell>{export_item.format}</TableCell>
                        <TableCell>{export_item.size}</TableCell>
                        <TableCell>{getStatusBadge(export_item.status)}</TableCell>
                        <TableCell>{export_item.created}</TableCell>
                        <TableCell>{export_item.downloadCount}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" disabled={export_item.status !== 'completed'}>
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Exports</CardTitle>
                <CardDescription>
                  Manage automated data export schedules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No Scheduled Exports</h3>
                  <p className="text-sm mb-4">Set up automated exports to run on a schedule</p>
                  <Button>
                    <Calendar className="w-4 h-4 mr-2" />
                    Create Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default DataExportsPage;
