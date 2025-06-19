
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, FileText, Activity, Microscope, User, Calendar, Clock, AlertCircle } from 'lucide-react';

const OncologyStagingPage = () => {
  const [selectedPatient, setSelectedPatient] = useState('');
  const [stagingData, setStagingData] = useState({
    tCategory: '',
    nCategory: '',
    mCategory: '',
    histology: '',
    grade: '',
    size: '',
    primarySite: '',
    laterality: '',
    multifocal: false,
    invasionDepth: '',
    margins: '',
    biomarkers: {}
  });

  // Recent staging cases for clinical review
  const recentCases = [
    {
      id: 'PT-12345',
      patient: 'Sarah Johnson',
      age: 58,
      diagnosis: 'Invasive Ductal Carcinoma',
      stage: 'T2N1M0 (Stage IIB)',
      stagingDate: '2024-01-15',
      physician: 'Dr. Martinez',
      status: 'Staged',
      urgency: 'routine'
    },
    {
      id: 'PT-12346',
      patient: 'Michael Chen',
      age: 62,
      diagnosis: 'Non-Small Cell Lung Cancer',
      stage: 'T3N2M0 (Stage IIIB)',
      stagingDate: '2024-01-14',
      physician: 'Dr. Wilson',
      status: 'Review Pending',
      urgency: 'urgent'
    },
    {
      id: 'PT-12347',
      patient: 'Emily Rodriguez',
      age: 45,
      diagnosis: 'Colorectal Adenocarcinoma',
      stage: 'T3N0M0 (Stage IIA)',
      stagingDate: '2024-01-13',
      physician: 'Dr. Kim',
      status: 'Staged',
      urgency: 'routine'
    }
  ];

  const pendingCases = [
    {
      id: 'PT-12348',
      patient: 'Robert Thompson',
      age: 67,
      diagnosis: 'Prostate Adenocarcinoma',
      received: '2024-01-16',
      physician: 'Dr. Anderson',
      priority: 'High',
      timeWaiting: '2 hours'
    },
    {
      id: 'PT-12349',
      patient: 'Lisa Wang',
      age: 52,
      diagnosis: 'Ovarian Carcinoma',
      received: '2024-01-16',
      physician: 'Dr. Davis',
      priority: 'Urgent',
      timeWaiting: '45 minutes'
    }
  ];

  const calculateStage = () => {
    const { tCategory, nCategory, mCategory } = stagingData;
    
    if (mCategory === 'M1') return 'IV';
    if (nCategory === 'N3') return 'IIIC';
    if (nCategory === 'N2') return 'IIIB';
    if (nCategory === 'N1' && tCategory === 'T3') return 'IIIA';
    if (tCategory === 'T4') return 'IIIA';
    if (nCategory === 'N1') return 'IIB';
    if (tCategory === 'T3') return 'IIB';
    if (tCategory === 'T2') return 'IIA';
    if (tCategory === 'T1') return 'IA';
    
    return 'Incomplete';
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'routine': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Staged': return 'bg-green-100 text-green-800';
      case 'Review Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <PageHeader
        title="Clinical Staging & Diagnosis"
        description="Comprehensive cancer staging integrated with clinical workflow"
        breadcrumbs={[
          { label: 'Clinical Workflows', link: '/clinical-workflows' },
          { label: 'Staging & Diagnosis' }
        ]}
      />

      {/* Clinical Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Pending Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">12</div>
            <p className="text-xs text-muted-foreground">Awaiting staging</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Urgent Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Completed Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">18</div>
            <p className="text-xs text-muted-foreground">Staging reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <User className="h-4 w-4" />
              MDT Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">7</div>
            <p className="text-xs text-muted-foreground">Multidisciplinary team</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending">Pending Cases</TabsTrigger>
          <TabsTrigger value="staging">New Staging</TabsTrigger>
          <TabsTrigger value="recent">Recent Cases</TabsTrigger>
          <TabsTrigger value="mdt">MDT Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Cases Awaiting Staging</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Diagnosis</TableHead>
                    <TableHead>Physician</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Waiting Time</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingCases.map((case_) => (
                    <TableRow key={case_.id}>
                      <TableCell className="font-medium">{case_.patient}</TableCell>
                      <TableCell>{case_.age}</TableCell>
                      <TableCell>{case_.diagnosis}</TableCell>
                      <TableCell>{case_.physician}</TableCell>
                      <TableCell>
                        <Badge className={getUrgencyColor(case_.priority.toLowerCase())}>
                          {case_.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{case_.timeWaiting}</TableCell>
                      <TableCell>
                        <Button size="sm" onClick={() => setSelectedPatient(case_.patient)}>
                          Begin Staging
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staging">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Patient Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Patient Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Patient Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search patient..."
                      className="pl-10"
                      value={selectedPatient}
                      onChange={(e) => setSelectedPatient(e.target.value)}
                    />
                  </div>
                </div>
                
                {selectedPatient && (
                  <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{selectedPatient}</h4>
                        <p className="text-sm text-gray-600">MRN: 12345678 | Age: 58 | Female</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><strong>DOB:</strong> 03/15/1965</div>
                      <div><strong>Ref. Physician:</strong> Dr. Martinez</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Staging Interface */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Microscope className="h-5 w-5" />
                  Clinical Staging Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Primary Site</Label>
                      <Select onValueChange={(value) => setStagingData({...stagingData, primarySite: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select primary site" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="breast">Breast</SelectItem>
                          <SelectItem value="lung">Lung</SelectItem>
                          <SelectItem value="colorectal">Colorectal</SelectItem>
                          <SelectItem value="prostate">Prostate</SelectItem>
                          <SelectItem value="ovarian">Ovarian</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Histology</Label>
                      <Select onValueChange={(value) => setStagingData({...stagingData, histology: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select histology" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="adenocarcinoma">Adenocarcinoma</SelectItem>
                          <SelectItem value="squamous">Squamous Cell Carcinoma</SelectItem>
                          <SelectItem value="ductal">Invasive Ductal Carcinoma</SelectItem>
                          <SelectItem value="lobular">Invasive Lobular Carcinoma</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>T Category</Label>
                      <Select onValueChange={(value) => setStagingData({...stagingData, tCategory: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="T" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Tis">Tis</SelectItem>
                          <SelectItem value="T1">T1</SelectItem>
                          <SelectItem value="T2">T2</SelectItem>
                          <SelectItem value="T3">T3</SelectItem>
                          <SelectItem value="T4">T4</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>N Category</Label>
                      <Select onValueChange={(value) => setStagingData({...stagingData, nCategory: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="N" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="N0">N0</SelectItem>
                          <SelectItem value="N1">N1</SelectItem>
                          <SelectItem value="N2">N2</SelectItem>
                          <SelectItem value="N3">N3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>M Category</Label>
                      <Select onValueChange={(value) => setStagingData({...stagingData, mCategory: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="M" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="M0">M0</SelectItem>
                          <SelectItem value="M1">M1</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {stagingData.tCategory && stagingData.nCategory && stagingData.mCategory && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Clinical Stage</div>
                        <div className="text-2xl font-bold text-blue-700">
                          Stage {calculateStage()}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {stagingData.tCategory}{stagingData.nCategory}{stagingData.mCategory}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Tumor Size (cm)</Label>
                      <Input 
                        type="number" 
                        placeholder="Enter size"
                        onChange={(e) => setStagingData({...stagingData, size: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Histologic Grade</Label>
                      <Select onValueChange={(value) => setStagingData({...stagingData, grade: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="G1">G1 - Well differentiated</SelectItem>
                          <SelectItem value="G2">G2 - Moderately differentiated</SelectItem>
                          <SelectItem value="G3">G3 - Poorly differentiated</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Clinical Notes</Label>
                    <Textarea 
                      placeholder="Enter clinical findings, pathology details, imaging results..."
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1">
                      Save to Patient Record
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Generate Report
                    </Button>
                    <Button variant="outline">
                      Schedule MDT Review
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recently Completed Staging</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Diagnosis</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Physician</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentCases.map((case_) => (
                    <TableRow key={case_.id}>
                      <TableCell className="font-medium">{case_.id}</TableCell>
                      <TableCell>{case_.patient}</TableCell>
                      <TableCell>{case_.age}</TableCell>
                      <TableCell>{case_.diagnosis}</TableCell>
                      <TableCell>{case_.stage}</TableCell>
                      <TableCell>{case_.stagingDate}</TableCell>
                      <TableCell>{case_.physician}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(case_.status)}>
                          {case_.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mdt">
          <Card>
            <CardHeader>
              <CardTitle>Multidisciplinary Team Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Breast Cancer MDT Meeting</h4>
                      <p className="text-sm text-gray-600">Tomorrow, 2:00 PM - Conference Room A</p>
                      <p className="text-sm text-gray-500">7 cases scheduled for review</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Lung Cancer MDT Meeting</h4>
                      <p className="text-sm text-gray-600">Jan 18, 10:00 AM - Conference Room B</p>
                      <p className="text-sm text-gray-500">5 cases scheduled for review</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default OncologyStagingPage;
