
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { UserCog, UserPlus, ShieldAlert, ArrowRightLeft, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Patient {
  id: string;
  name: string;
  gender: string;
  dob: string;
  eligibility: 'eligible' | 'pending' | 'ineligible';
  randomized: boolean;
  arm?: string;
}

interface Study {
  id: string;
  title: string;
  arms: string[];
  randomizationRatio: string;
}

const mockPatients: Patient[] = [
  { id: "PT-001", name: "John Smith", gender: "Male", dob: "1975-05-12", eligibility: "eligible", randomized: false },
  { id: "PT-002", name: "Mary Johnson", gender: "Female", dob: "1982-09-23", eligibility: "eligible", randomized: false },
  { id: "PT-003", name: "Robert Brown", gender: "Male", dob: "1968-11-07", eligibility: "pending", randomized: false },
  { id: "PT-004", name: "Linda Davis", gender: "Female", dob: "1979-03-18", eligibility: "eligible", randomized: true, arm: "Treatment A" },
  { id: "PT-005", name: "Michael Wilson", gender: "Male", dob: "1956-12-30", eligibility: "ineligible", randomized: false }
];

const mockStudies: Study[] = [
  { id: "BEACON-CRC", title: "BEACON-CRC Phase II Trial", arms: ["Treatment A", "Treatment B", "Control"], randomizationRatio: "1:1:1" },
  { id: "STELLAR-001", title: "STELLAR-001 Immunotherapy Study", arms: ["Experimental", "Standard of Care"], randomizationRatio: "2:1" },
  { id: "PRISM-AD", title: "PRISM Alzheimer's Disease Trial", arms: ["High Dose", "Low Dose", "Placebo"], randomizationRatio: "1:1:1" }
];

const PatientRandomizationPage = () => {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [studies, setStudies] = useState<Study[]>(mockStudies);
  const [selectedStudy, setSelectedStudy] = useState<string>("");
  const [selectedPatient, setSelectedPatient] = useState<string>("");
  const [isRandomizing, setIsRandomizing] = useState(false);
  const { toast } = useToast();
  
  const handleRandomize = () => {
    if (!selectedStudy || !selectedPatient) {
      toast({
        title: "Error",
        description: "Please select both a study and a patient",
        variant: "destructive"
      });
      return;
    }
    
    const study = studies.find(s => s.id === selectedStudy);
    const patient = patients.find(p => p.id === selectedPatient);
    
    if (!study || !patient) {
      toast({
        title: "Error",
        description: "Invalid study or patient selection",
        variant: "destructive"
      });
      return;
    }
    
    if (patient.eligibility !== "eligible") {
      toast({
        title: "Cannot Randomize",
        description: "Patient is not eligible for randomization",
        variant: "destructive"
      });
      return;
    }
    
    if (patient.randomized) {
      toast({
        title: "Already Randomized",
        description: "This patient has already been randomized",
        variant: "destructive"
      });
      return;
    }
    
    // Simple randomization algorithm
    const assignedArm = study.arms[Math.floor(Math.random() * study.arms.length)];
    
    // Update patient with randomization
    const updatedPatients = patients.map(p => 
      p.id === patient.id ? { ...p, randomized: true, arm: assignedArm } : p
    );
    
    setPatients(updatedPatients);
    setIsRandomizing(false);
    
    toast({
      title: "Randomization Successful",
      description: `Patient ${patient.id} has been randomized to ${assignedArm}`,
    });
  };
  
  const getEligibilityBadge = (eligibility: string) => {
    switch (eligibility) {
      case 'eligible':
        return <Badge className="bg-green-500 hover:bg-green-500">Eligible</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'ineligible':
        return <Badge variant="outline" className="text-red-500 border-red-200">Ineligible</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <MainLayout>
      <PageHeader 
        title="Patient Randomization" 
        description="Randomize patients to study treatment arms"
        breadcrumbs={[
          { label: 'Studies', link: '/studies' },
          { label: 'Patient Randomization' }
        ]}
      />
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Randomization Tool</CardTitle>
            <CardDescription>Assign patients to study treatment arms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="study-select">Select Study</Label>
              <Select value={selectedStudy} onValueChange={setSelectedStudy}>
                <SelectTrigger id="study-select">
                  <SelectValue placeholder="Select a study" />
                </SelectTrigger>
                <SelectContent>
                  {studies.map(study => (
                    <SelectItem key={study.id} value={study.id}>
                      {study.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedStudy && (
                <div className="mt-4 text-sm p-3 bg-muted rounded-md">
                  <p className="font-medium">Study Arms:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {studies.find(s => s.id === selectedStudy)?.arms.map((arm, i) => (
                      <Badge key={i} variant="outline">{arm}</Badge>
                    ))}
                  </div>
                  <p className="mt-2">
                    <span className="font-medium">Randomization Ratio:</span>{' '}
                    {studies.find(s => s.id === selectedStudy)?.randomizationRatio}
                  </p>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="patient-select">Select Patient</Label>
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger id="patient-select">
                  <SelectValue placeholder="Select a patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients
                    .filter(p => !p.randomized && p.eligibility === "eligible")
                    .map(patient => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.id}: {patient.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              
              {selectedPatient && (
                <div className="mt-4 text-sm p-3 bg-muted rounded-md">
                  <p>
                    <span className="font-medium">Patient ID:</span> {patients.find(p => p.id === selectedPatient)?.id}
                  </p>
                  <p>
                    <span className="font-medium">Name:</span> {patients.find(p => p.id === selectedPatient)?.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-medium">Eligibility:</span>
                    {getEligibilityBadge(patients.find(p => p.id === selectedPatient)?.eligibility || '')}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Dialog open={isRandomizing} onOpenChange={setIsRandomizing}>
              <DialogTrigger asChild>
                <Button 
                  className="w-full" 
                  disabled={!selectedStudy || !selectedPatient || 
                    patients.find(p => p.id === selectedPatient)?.eligibility !== "eligible"}
                >
                  <ArrowRightLeft className="h-4 w-4 mr-2" />
                  Randomize Patient
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Randomization</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to randomize this patient? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Study:</span> {studies.find(s => s.id === selectedStudy)?.title}</p>
                    <p><span className="font-medium">Patient:</span> {patients.find(p => p.id === selectedPatient)?.name} ({patients.find(p => p.id === selectedPatient)?.id})</p>
                    <p><span className="font-medium">Date of Birth:</span> {patients.find(p => p.id === selectedPatient)?.dob}</p>
                  </div>
                  <div className="mt-4 flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-amber-800">Important Note</p>
                      <p className="text-amber-700">Randomization cannot be reversed. Please ensure all eligibility criteria are met before proceeding.</p>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsRandomizing(false)}>Cancel</Button>
                  <Button onClick={handleRandomize}>Confirm Randomization</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Randomization Status</CardTitle>
            <CardDescription>Overview of patient randomization status</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="randomized">
              <TabsList className="w-full">
                <TabsTrigger value="randomized" className="flex-1">Randomized</TabsTrigger>
                <TabsTrigger value="pending" className="flex-1">Pending</TabsTrigger>
                <TabsTrigger value="ineligible" className="flex-1">Ineligible</TabsTrigger>
              </TabsList>
              <TabsContent value="randomized" className="mt-4">
                {patients.filter(p => p.randomized).length === 0 ? (
                  <div className="text-center py-8">
                    <UserCog className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground">No patients have been randomized yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {patients.filter(p => p.randomized).map((patient) => (
                      <div key={patient.id} className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <div className="flex items-center">
                            <p className="font-medium">{patient.name}</p>
                            <Badge className="ml-2 bg-blue-500">{patient.id}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">DOB: {patient.dob}</p>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {patient.arm}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="pending" className="mt-4">
                {patients.filter(p => p.eligibility === "pending").length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground">No patients are pending eligibility review</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {patients.filter(p => p.eligibility === "pending").map((patient) => (
                      <div key={patient.id} className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <div className="flex items-center">
                            <p className="font-medium">{patient.name}</p>
                            <Badge className="ml-2">{patient.id}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">DOB: {patient.dob}</p>
                        </div>
                        {getEligibilityBadge(patient.eligibility)}
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="ineligible" className="mt-4">
                {patients.filter(p => p.eligibility === "ineligible").length === 0 ? (
                  <div className="text-center py-8">
                    <ShieldAlert className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground">No patients have been marked ineligible</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {patients.filter(p => p.eligibility === "ineligible").map((patient) => (
                      <div key={patient.id} className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <div className="flex items-center">
                            <p className="font-medium">{patient.name}</p>
                            <Badge className="ml-2">{patient.id}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">DOB: {patient.dob}</p>
                        </div>
                        {getEligibilityBadge(patient.eligibility)}
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Patient
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default PatientRandomizationPage;
