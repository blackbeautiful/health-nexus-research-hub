
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { Download, FileText, Database, Calendar, Users, Filter, Settings, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const DataExportsPage = () => {
  const [selectedStudy, setSelectedStudy] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('csv');
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<any>(null);
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [anonymizeData, setAnonymizeData] = useState(false);

  const availableFields = [
    { id: 'demographics', label: 'Demographics', category: 'Patient Data' },
    { id: 'medical_history', label: 'Medical History', category: 'Patient Data' },
    { id: 'lab_results', label: 'Laboratory Results', category: 'Clinical Data' },
    { id: 'vital_signs', label: 'Vital Signs', category: 'Clinical Data' },
    { id: 'medications', label: 'Medications', category: 'Clinical Data' },
    { id: 'adverse_events', label: 'Adverse Events', category: 'Safety Data' },
    { id: 'concomitant_meds', label: 'Concomitant Medications', category: 'Safety Data' },
    { id: 'efficacy', label: 'Efficacy Endpoints', category: 'Outcomes' },
    { id: 'quality_of_life', label: 'Quality of Life', category: 'Outcomes' },
    { id: 'imaging', label: 'Imaging Results', category: 'Diagnostic Data' },
    { id: 'biomarkers', label: 'Biomarkers', category: 'Diagnostic Data' }
  ];

  const exportHistory = [
    {
      id: 'EXP001',
      name: 'BEACON-CRC Complete Dataset',
      study: 'BEACON-CRC',
      format: 'CSV',
      size: '15.2 MB',
      records: 1250,
      created: '2025-01-15 14:30',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: 'EXP002',
      name: 'Demographics Export',
      study: 'KEYNOTE-189',
      format: 'Excel',
      size: '2.8 MB',
      records: 340,
      created: '2025-01-14 09:15',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: 'EXP003',
      name: 'Safety Data Analysis',
      study: 'DESTINY-Lung01',
      format: 'SAS',
      size: '8.7 MB',
      records: 850,
      created: '2025-01-13 16:45',
      status: 'processing',
      downloadUrl: null
    }
  ];

  const studies = [
    { id: 'beacon', name: 'BEACON-CRC', participants: 125 },
    { id: 'keynote', name: 'KEYNOTE-189', participants: 89 },
    { id: 'destiny', name: 'DESTINY-Lung01', participants: 67 }
  ];

  const handleFieldToggle = (fieldId: string) => {
    setSelectedFields(prev => 
      prev.includes(fieldId) 
        ? prev.filter(id => id !== fieldId)
        : [...prev, fieldId]
    );
  };

  const handleSelectAllFields = (category: string) => {
    const categoryFields = availableFields
      .filter(field => field.category === category)
      .map(field => field.id);
    
    const allSelected = categoryFields.every(id => selectedFields.includes(id));
    
    if (allSelected) {
      setSelectedFields(prev => prev.filter(id => !categoryFields.includes(id)));
    } else {
      setSelectedFields(prev => [...new Set([...prev, ...categoryFields])]);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="h-3 w-3 mr-1" />Processing</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800"><AlertCircle className="h-3 w-3 mr-1" />Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const fieldsByCategory = availableFields.reduce((acc, field) => {
    if (!acc[field.category]) acc[field.category] = [];
    acc[field.category].push(field);
    return acc;
  }, {} as Record<string, typeof availableFields>);

  return (
    <Layout title="Data Exports">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Data Exports</h1>
          <p className="text-muted-foreground">Export study data for analysis and reporting</p>
        </div>

        <Tabs defaultValue="new-export" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="new-export">New Export</TabsTrigger>
            <TabsTrigger value="history">Export History</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Exports</TabsTrigger>
          </TabsList>

          <TabsContent value="new-export" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Export Configuration */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Export Configuration</CardTitle>
                  <CardDescription>Configure your data export parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Settings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Study</Label>
                      <Select value={selectedStudy} onValueChange={setSelectedStudy}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select study" />
                        </SelectTrigger>
                        <SelectContent>
                          {studies.map(study => (
                            <SelectItem key={study.id} value={study.id}>
                              {study.name} ({study.participants} participants)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Export Format</Label>
                      <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="csv">CSV</SelectItem>
                          <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                          <SelectItem value="sas">SAS Dataset</SelectItem>
                          <SelectItem value="spss">SPSS</SelectItem>
                          <SelectItem value="json">JSON</SelectItem>
                          <SelectItem value="xml">XML</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Date Range */}
                  <div className="space-y-2">
                    <Label>Date Range (Optional)</Label>
                    <DatePickerWithRange
                      value={dateRange}
                      onChange={setDateRange}
                      className="w-full"
                    />
                  </div>

                  {/* Export Options */}
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Export Options</Label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="headers" 
                          checked={includeHeaders}
                          onCheckedChange={setIncludeHeaders}
                        />
                        <Label htmlFor="headers">Include column headers</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="anonymize" 
                          checked={anonymizeData}
                          onCheckedChange={setAnonymizeData}
                        />
                        <Label htmlFor="anonymize">Anonymize patient data</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="audit" />
                        <Label htmlFor="audit">Include audit trail information</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="validation" />
                        <Label htmlFor="validation">Include data validation flags</Label>
                      </div>
                    </div>
                  </div>

                  {/* Field Selection */}
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Data Fields</Label>
                    <div className="space-y-4">
                      {Object.entries(fieldsByCategory).map(([category, fields]) => (
                        <div key={category} className="border rounded-lg p-4">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-medium">{category}</h4>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleSelectAllFields(category)}
                            >
                              {fields.every(field => selectedFields.includes(field.id)) ? 'Deselect All' : 'Select All'}
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {fields.map(field => (
                              <div key={field.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={field.id}
                                  checked={selectedFields.includes(field.id)}
                                  onCheckedChange={() => handleFieldToggle(field.id)}
                                />
                                <Label htmlFor={field.id} className="text-sm">{field.label}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Export Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Export Summary</CardTitle>
                  <CardDescription>Review your export configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Study:</span>
                      <span className="font-medium">
                        {selectedStudy ? studies.find(s => s.id === selectedStudy)?.name : 'Not selected'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Format:</span>
                      <span className="font-medium">{selectedFormat.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Fields:</span>
                      <span className="font-medium">{selectedFields.length} selected</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Estimated Records:</span>
                      <span className="font-medium">
                        {selectedStudy ? studies.find(s => s.id === selectedStudy)?.participants || 0 : 0}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button 
                      className="w-full" 
                      disabled={!selectedStudy || selectedFields.length === 0}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Create Export
                    </Button>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    <p>Large exports may take several minutes to process. You'll receive an email notification when your export is ready.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Export History</CardTitle>
                <CardDescription>Download or re-run previous exports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {exportHistory.map(export_ => (
                    <div key={export_.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">{export_.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{export_.study}</span>
                            <span>•</span>
                            <span>{export_.format}</span>
                            <span>•</span>
                            <span>{export_.size}</span>
                            <span>•</span>
                            <span>{export_.records} records</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{export_.created}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(export_.status)}
                        {export_.status === 'completed' && (
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          Re-run Export
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Exports</CardTitle>
                <CardDescription>Automate regular data exports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Scheduled Exports</h3>
                  <p className="text-muted-foreground mb-4">
                    Create automated exports that run on a schedule
                  </p>
                  <Button>
                    <Settings className="h-4 w-4 mr-2" />
                    Create Scheduled Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DataExportsPage;
