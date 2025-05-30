import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { 
  ChevronLeft, 
  Calendar, 
  FileText, 
  Activity, 
  User, 
  MessageSquare, 
  List, 
  Clipboard, 
  Stethoscope,
  TestTube,
  LineChart,
  Shield,
  AlertTriangle,
  Dna,
  Pill,
  Scan,
  Microscope
} from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import MedicalHistoryTab from '@/components/patients/MedicalHistoryTab';
import TreatmentPlanTab from '@/components/patients/TreatmentPlanTab';
import InvestigationsTab from '@/components/patients/InvestigationsTab';
import LabResultsTab from '@/components/patients/LabResultsTab';
import VitalSignsTab from '@/components/patients/VitalSignsTab';
import ImagingTab from '@/components/patients/ImagingTab';
import { mockPatients } from '@/data/mockPatients';

const PatientDetailsPage = () => {
  const { patientId } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Find the patient in our mock data
  const patient = mockPatients.find(p => p.id === patientId);
  
  if (!patient) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <h2 className="text-2xl font-bold mb-4">Patient Not Found</h2>
          <p className="text-muted-foreground mb-6">The requested patient record was not found.</p>
          <Button onClick={() => navigate('/patients')}>
            Return to Patients List
          </Button>
        </div>
      </MainLayout>
    );
  }

  const handleAction = (action: string) => {
    toast({
      title: "Action triggered",
      description: `${action} functionality will be implemented soon.`,
    });
  };
  
  // Status colors mapping
  const statusColor = {
    'active': 'bg-blue-500',
    'remission': 'bg-green-500',
    'critical': 'bg-red-500'
  };

  return (
    <MainLayout>
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link to="/patients">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Patient Details</h1>
          <p className="text-muted-foreground">View and manage patient information</p>
        </div>
      </div>
      
      {/* Patient summary card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-16 w-16">
              <div className="flex h-full w-full items-center justify-center bg-primary text-xl font-semibold text-white">
                {patient.name.split(' ').map(n => n[0]).join('')}
              </div>
            </Avatar>
            <div>
              <div className="flex items-center gap-3">
                <CardTitle>{patient.name}</CardTitle>
                <Badge className={`${statusColor[patient.status as keyof typeof statusColor]} text-white`}>
                  {patient.status}
                </Badge>
              </div>
              <CardDescription>
                ID: {patient.id} | {patient.age} years, {patient.gender} | Oncologist: Dr. {patient.physician}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Cancer Type</p>
                <Badge className={`cancer-${patient.cancerType.toLowerCase().replace(' ', '')}`}>
                  {patient.cancerType}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Stage</p>
                <p className="font-medium">{patient.stage}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Diagnosis Date</p>
                <p className="font-medium">{patient.diagnosisDate}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleAction('Edit patient')}>
              Edit Details
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleAction('Print summary')}>
              Print Summary
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Treatment Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Current Cycle</span>
                  <span className="text-sm">3 of 6</span>
                </div>
                <Progress value={50} indicatorClassName="bg-blue-500" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Response to Treatment</span>
                  <span className="text-sm">Partial Response</span>
                </div>
                <Progress value={65} indicatorClassName="bg-green-500" />
              </div>
              <div className="mt-6">
                <p className="text-sm text-muted-foreground mb-1">Next Appointment</p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <p className="font-medium">April 21, 2025 - 10:30 AM</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => setActiveTab('treatment')}>
              View Treatment Plan
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Patient data tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-9">
          <TabsTrigger value="overview">
            <User className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="history">
            <FileText className="h-4 w-4 mr-2" />
            Medical History
          </TabsTrigger>
          <TabsTrigger value="treatment">
            <Pill className="h-4 w-4 mr-2" />
            Treatment
          </TabsTrigger>
          <TabsTrigger value="investigations">
            <Microscope className="h-4 w-4 mr-2" />
            Investigations
          </TabsTrigger>
          <TabsTrigger value="labs">
            <TestTube className="h-4 w-4 mr-2" />
            Lab Results
          </TabsTrigger>
          <TabsTrigger value="vitals">
            <Activity className="h-4 w-4 mr-2" />
            Vitals
          </TabsTrigger>
          <TabsTrigger value="genomics">
            <Dna className="h-4 w-4 mr-2" />
            Genomics
          </TabsTrigger>
          <TabsTrigger value="imaging">
            <Scan className="h-4 w-4 mr-2" />
            Imaging
          </TabsTrigger>
          <TabsTrigger value="notes">
            <Clipboard className="h-4 w-4 mr-2" />
            Notes
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-date">April 10, 2025</div>
                    <p className="font-medium">Blood Test Results</p>
                    <p className="text-sm text-muted-foreground">CBC panel shows improved WBC count</p>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-date">April 5, 2025</div>
                    <p className="font-medium">Chemotherapy - Cycle 3</p>
                    <p className="text-sm text-muted-foreground">Administered FOLFOX protocol</p>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-date">March 28, 2025</div>
                    <p className="font-medium">Oncologist Consultation</p>
                    <p className="text-sm text-muted-foreground">Reviewed CT scan results</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => handleAction('View all activities')}>
                  View All Activities
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-100 p-2 rounded-full">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium">Low Neutrophil Count</p>
                      <p className="text-sm text-muted-foreground">Last result: 1.2 × 10⁹/L (April 10)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-red-100 p-2 rounded-full">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">Medication Interaction Alert</p>
                      <p className="text-sm text-muted-foreground">Potential interaction between Capecitabine and Warfarin</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Shield className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Clinical Trial Match</p>
                      <p className="text-sm text-muted-foreground">New Phase II trial for {patient.cancerType}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleAction('View all alerts')}
                >
                  Review All Alerts
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <MedicalHistoryTab patientId={patient.id} />
        </TabsContent>
        
        <TabsContent value="treatment">
          <TreatmentPlanTab patientId={patient.id} />
        </TabsContent>

        <TabsContent value="investigations">
          <InvestigationsTab patientId={patient.id} />
        </TabsContent>
        
        <TabsContent value="labs">
          <LabResultsTab patientId={patient.id} />
        </TabsContent>

        <TabsContent value="vitals">
          <VitalSignsTab patientId={patient.id} />
        </TabsContent>
        
        <TabsContent value="genomics">
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Genomics Dashboard</CardTitle>
                <CardDescription>Genetic variants, biomarkers, and actionable mutations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8">
                  <Dna className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">Genomics Module</h3>
                  <p className="text-muted-foreground mb-6">
                    This feature will be implemented in the next update, allowing you to view genetic sequencing results,
                    track biomarkers, and identify actionable mutations with treatment recommendations.
                  </p>
                  <Button onClick={() => handleAction('Upload genomic data')}>
                    Upload Genomic Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="imaging">
          <ImagingTab patientId={patient.id} />
        </TabsContent>
        
        <TabsContent value="notes">
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Clinical Notes</CardTitle>
                <CardDescription>Progress notes, consultation records, and clinical documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8">
                  <Clipboard className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">Clinical Notes Module</h3>
                  <p className="text-muted-foreground mb-6">
                    This feature will be implemented in the next update, allowing you to create and view
                    SOAP notes, progress reports, and consultation records.
                  </p>
                  <Button onClick={() => handleAction('Create note')}>
                    Create New Note
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default PatientDetailsPage;
