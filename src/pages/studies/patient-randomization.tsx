
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Shuffle, ListChecks, UserPlus, FileInput, History, RotateCw, Download, Filter } from 'lucide-react';

// Define proper interfaces for better type safety
interface StudyArm {
  name: string;
}

interface Study {
  id: string;
  name: string;
  arms: string[];
}

interface RandomizationRecord {
  id: string;
  patientId: string;
  studyId: string;
  assignment: string;
  date: string;
  by: string;
}

interface ArmDistribution {
  [key: string]: number;
}

interface StudyDistribution {
  [key: string]: ArmDistribution;
}

// Mock data
const mockStudies: Study[] = [
  { id: 'ONCO-2025-001', name: 'Neoadjuvant Immunotherapy in Resectable NSCLC', arms: ['Treatment', 'Placebo'] },
  { id: 'ONCO-2025-002', name: 'CDK4/6 Inhibition in HR+ Metastatic Breast Cancer', arms: ['Standard of Care', 'Experimental Arm A', 'Experimental Arm B'] },
  { id: 'ONCO-2025-003', name: 'Novel ctDNA Collection Protocol for Early Cancer Detection', arms: ['Collection Method A', 'Collection Method B'] },
];

const mockRandomizations: RandomizationRecord[] = [
  { id: 'R-001', patientId: 'PT-12345', studyId: 'ONCO-2025-001', assignment: 'Treatment', date: '2025-03-15', by: 'Dr. Rebecca Martinez' },
  { id: 'R-002', patientId: 'PT-12378', studyId: 'ONCO-2025-001', assignment: 'Placebo', date: '2025-03-16', by: 'Dr. James Wilson' },
  { id: 'R-003', patientId: 'PT-12403', studyId: 'ONCO-2025-002', assignment: 'Experimental Arm A', date: '2025-03-20', by: 'Dr. Rebecca Martinez' },
];

// Randomization distributions
const mockDistribution: StudyDistribution = {
  'ONCO-2025-001': { 'Treatment': 12, 'Placebo': 10 },
  'ONCO-2025-002': { 'Standard of Care': 8, 'Experimental Arm A': 7, 'Experimental Arm B': 6 },
};

const PatientRandomizationPage = () => {
  const { toast } = useToast();
  const [selectedStudy, setSelectedStudy] = useState<string>('');
  const [patientId, setPatientId] = useState<string>('');
  const [randomizationResult, setRandomizationResult] = useState<{ arm: string; probability: number } | null>(null);
  const [isRandomizing, setIsRandomizing] = useState<boolean>(false);
  const [recentRandomizations, setRecentRandomizations] = useState<RandomizationRecord[]>(mockRandomizations);
  const [activeTab, setActiveTab] = useState<string>('randomize');
  
  // Get study details based on selection
  const selectedStudyDetails = mockStudies.find(study => study.id === selectedStudy);
  
  // Perform randomization
  const handleRandomize = () => {
    if (!selectedStudy || !patientId) {
      toast({
        title: "Missing Information",
        description: "Please select a study and enter a patient ID to randomize.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate randomization process
    setIsRandomizing(true);
    
    setTimeout(() => {
      const studyDetails = mockStudies.find(study => study.id === selectedStudy);
      
      if (studyDetails) {
        // Select a random arm
        const randomArm = studyDetails.arms[Math.floor(Math.random() * studyDetails.arms.length)];
        
        // Set the result
        setRandomizationResult({
          arm: randomArm,
          probability: Math.random() * 0.5 + 0.5 // Random probability between 50-100%
        });
        
        // Add to recent randomizations
        const newRandomization: RandomizationRecord = {
          id: `R-00${recentRandomizations.length + 1}`,
          patientId: patientId,
          studyId: selectedStudy,
          assignment: randomArm,
          date: new Date().toISOString().split('T')[0],
          by: 'Dr. Jane Roberts'
        };
        
        setRecentRandomizations([newRandomization, ...recentRandomizations]);
        
        toast({
          title: "Randomization Complete",
          description: `Patient ${patientId} has been randomized to ${randomArm}`,
        });
      }
      
      setIsRandomizing(false);
    }, 2000);
  };
  
  // Generate study distribution chart data
  const getStudyDistribution = (studyId: string): ArmDistribution => {
    return mockDistribution[studyId] || {};
  };
  
  return (
    <MainLayout>
      <PageHeader 
        title="Patient Randomization" 
        description="Randomize patients to treatment arms for clinical studies"
        breadcrumbs={[
          { label: 'Studies', link: '/studies' },
          { label: 'Patient Randomization' }
        ]}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="randomize">
            <Shuffle className="mr-2 h-4 w-4" />
            Randomize Patient
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="mr-2 h-4 w-4" />
            Randomization History
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="randomize">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Randomization</CardTitle>
                  <CardDescription>Assign a patient to a treatment arm in a study</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="study-select">Select Study</Label>
                    <Select 
                      value={selectedStudy} 
                      onValueChange={setSelectedStudy}
                    >
                      <SelectTrigger id="study-select">
                        <SelectValue placeholder="Select a study" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockStudies.map(study => (
                          <SelectItem key={study.id} value={study.id}>
                            {study.name} ({study.id})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedStudyDetails && (
                    <div className="p-4 border rounded-md bg-muted/40">
                      <h3 className="font-medium mb-2">Study Arms:</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedStudyDetails.arms.map((arm, index) => (
                          <Badge key={index} variant="outline">{arm}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="patient-id">Patient ID</Label>
                    <Input 
                      id="patient-id" 
                      placeholder="Enter patient identifier"
                      value={patientId}
                      onChange={(e) => setPatientId(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="p-3 border rounded-md bg-amber-50 text-amber-800 text-sm">
                    <p>
                      <strong>Important:</strong> Randomization is irreversible. Please ensure all eligibility criteria
                      are met before proceeding.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleRandomize} 
                    disabled={isRandomizing || !selectedStudy || !patientId}
                    className="w-full"
                  >
                    {isRandomizing ? (
                      <>
                        <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                        Randomizing...
                      </>
                    ) : (
                      <>
                        <Shuffle className="mr-2 h-4 w-4" />
                        Randomize Patient
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
              
              {randomizationResult && (
                <Card className="mt-4 border-primary animate-fade-in">
                  <CardHeader className="bg-primary/10">
                    <CardTitle>Randomization Result</CardTitle>
                    <CardDescription>Patient assignment has been recorded</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Patient ID</p>
                        <p className="font-medium">{patientId}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Study</p>
                        <p className="font-medium">{selectedStudyDetails?.name}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Assignment</p>
                        <p className="font-bold text-primary">{randomizationResult.arm}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Randomization Date</p>
                        <p className="font-medium">{new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button className="w-full" variant="outline">
                        <FileInput className="mr-2 h-4 w-4" />
                        Print Randomization Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Treatment Arm Distribution</CardTitle>
                  <CardDescription>Current distribution of patients in study arms</CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedStudy ? (
                    <div className="space-y-4">
                      {Object.entries(getStudyDistribution(selectedStudy)).map(([arm, count]) => (
                        <div key={arm} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span>{arm}</span>
                            <span className="font-medium">{count}</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ 
                                width: `${(count / Object.values(getStudyDistribution(selectedStudy)).reduce((a, b) => a + b, 0)) * 100}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="pt-4 border-t mt-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Total participants</span>
                          <span className="font-medium">
                            {Object.values(getStudyDistribution(selectedStudy)).reduce((a, b) => a + b, 0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <ListChecks className="h-12 w-12 mx-auto text-muted-foreground/50" />
                      <h3 className="mt-2 font-medium">No Study Selected</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Select a study to view arm distribution
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Randomization History</CardTitle>
                  <CardDescription>Record of all patient randomizations</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Study</TableHead>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Randomized By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentRandomizations.map((rand) => (
                    <TableRow key={rand.id}>
                      <TableCell>{rand.id}</TableCell>
                      <TableCell>{rand.patientId}</TableCell>
                      <TableCell>{rand.studyId}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{rand.assignment}</Badge>
                      </TableCell>
                      <TableCell>{rand.date}</TableCell>
                      <TableCell>{rand.by}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="border-t pt-6 flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {recentRandomizations.length} randomizations
              </div>
              <Button variant="outline" size="sm">Load More</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default PatientRandomizationPage;
