
import React from 'react';
import { ChevronRight, FileText, CheckCheck, Users, Clipboard, Calendar, Beaker, FileX2, BarChart } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const StudyProtocolSetupPage = () => {
  return (
    <Layout title="Study Protocol Setup">
      <PageHeader 
        title="Study Protocol Setup" 
        description="Configure the protocol details and eligibility criteria"
        breadcrumbs={[
          { label: 'Studies', link: '/studies' },
          { label: 'Protocol Setup' }
        ]}
      />
      
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>BEACON-CRC Phase II Trial</CardTitle>
              <CardDescription>Protocol version 2.1 - Last updated: Apr 8, 2025</CardDescription>
            </div>
            <Badge className="ml-2">Draft</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label className="text-sm text-muted-foreground block mb-1">Study ID</Label>
              <p className="font-medium">NCT039281754</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground block mb-1">Phase</Label>
              <p className="font-medium">Phase II</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground block mb-1">Study Type</Label>
              <p className="font-medium">Interventional</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground block mb-1">Sponsor</Label>
              <p className="font-medium">Memorial Cancer Center</p>
            </div>
          </div>
          
          <div className="mt-4">
            <Label className="text-sm text-muted-foreground block mb-1">Study Title</Label>
            <p className="font-medium">A Randomized Phase II Trial of FOLFOX Plus Bevacizumab in Patients With Stage III Colorectal Cancer</p>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="overview" className="text-xs md:text-sm">Overview</TabsTrigger>
          <TabsTrigger value="eligibility" className="text-xs md:text-sm">Eligibility</TabsTrigger>
          <TabsTrigger value="arms" className="text-xs md:text-sm">Arms & Interventions</TabsTrigger>
          <TabsTrigger value="endpoints" className="text-xs md:text-sm">Endpoints</TabsTrigger>
          <TabsTrigger value="schedule" className="text-xs md:text-sm">Visit Schedule</TabsTrigger>
          <TabsTrigger value="procedures" className="text-xs md:text-sm">Procedures</TabsTrigger>
          <TabsTrigger value="safety" className="text-xs md:text-sm">Safety Monitoring</TabsTrigger>
          <TabsTrigger value="data" className="text-xs md:text-sm">Data Collection</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Study Design</CardTitle>
              <CardDescription>General information about the study design and methodology</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm text-muted-foreground block mb-1">Study Description</Label>
                <div className="border rounded-md p-3 bg-muted/30">
                  <p className="text-sm">
                    This randomized phase II trial studies how well FOLFOX plus bevacizumab works in treating patients with stage III 
                    colorectal cancer. Drugs used in chemotherapy, such as fluorouracil, leucovorin, and oxaliplatin (FOLFOX), work 
                    in different ways to stop the growth of tumor cells, either by killing the cells, by stopping them 
                    from dividing, or by stopping them from spreading. Monoclonal antibodies, such as bevacizumab, may 
                    block tumor growth by targeting specific proteins or by stopping blood vessels from growing. 
                    Giving FOLFOX plus bevacizumab may work better in treating colorectal cancer.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground block mb-1">Allocation</Label>
                  <Select defaultValue="randomized">
                    <SelectTrigger>
                      <SelectValue placeholder="Select allocation method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="randomized">Randomized</SelectItem>
                      <SelectItem value="nonrandomized">Non-randomized</SelectItem>
                      <SelectItem value="na">Not applicable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground block mb-1">Masking/Blinding</Label>
                  <Select defaultValue="open">
                    <SelectTrigger>
                      <SelectValue placeholder="Select masking type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="double">Double-blind</SelectItem>
                      <SelectItem value="single">Single-blind</SelectItem>
                      <SelectItem value="open">Open-label</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-sm text-muted-foreground block mb-1">Sample Size</Label>
                  <Input type="number" placeholder="Target enrollment" defaultValue="120" />
                </div>
                
                <div>
                  <Label className="text-sm text-muted-foreground block mb-1">Primary Purpose</Label>
                  <Select defaultValue="treatment">
                    <SelectTrigger>
                      <SelectValue placeholder="Select primary purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="treatment">Treatment</SelectItem>
                      <SelectItem value="prevention">Prevention</SelectItem>
                      <SelectItem value="diagnostic">Diagnostic</SelectItem>
                      <SelectItem value="supportive">Supportive Care</SelectItem>
                      <SelectItem value="screening">Screening</SelectItem>
                      <SelectItem value="basic">Basic Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground block mb-1">Estimated Start Date</Label>
                  <Input type="date" defaultValue="2025-01-15" />
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground block mb-1">Estimated Primary Completion Date</Label>
                  <Input type="date" defaultValue="2027-01-15" />
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground block mb-1">Estimated Study Completion Date</Label>
                  <Input type="date" defaultValue="2027-07-15" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Study Phases and Timeline</CardTitle>
              <CardDescription>Define the phases and timeline for the study</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative pb-12">
                <div className="flex items-center mb-4">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-500">
                    <span className="text-blue-700 font-bold text-sm">1</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium">Screening Phase</h4>
                    <p className="text-sm text-muted-foreground">14 days before treatment initiation</p>
                  </div>
                </div>
                <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-blue-200" />
                
                <div className="flex items-center mb-4 ml-8">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="ml-2 text-sm">Medical history & physical examination</span>
                </div>
                <div className="flex items-center mb-4 ml-8">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="ml-2 text-sm">Laboratory assessments</span>
                </div>
                <div className="flex items-center mb-4 ml-8">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="ml-2 text-sm">Imaging studies</span>
                </div>
                <div className="flex items-center mb-4 ml-8">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="ml-2 text-sm">Eligibility confirmation</span>
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center border-2 border-purple-500">
                    <span className="text-purple-700 font-bold text-sm">2</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium">Treatment Phase</h4>
                    <p className="text-sm text-muted-foreground">12 cycles (each cycle 14 days)</p>
                  </div>
                </div>
                <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-blue-200" />
                
                <div className="flex items-center mb-4 ml-8">
                  <span className="h-2 w-2 rounded-full bg-purple-500" />
                  <span className="ml-2 text-sm">Chemotherapy administration</span>
                </div>
                <div className="flex items-center mb-4 ml-8">
                  <span className="h-2 w-2 rounded-full bg-purple-500" />
                  <span className="ml-2 text-sm">Interim assessments every 4 cycles</span>
                </div>
                <div className="flex items-center mb-4 ml-8">
                  <span className="h-2 w-2 rounded-full bg-purple-500" />
                  <span className="ml-2 text-sm">Safety monitoring</span>
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center border-2 border-green-500">
                    <span className="text-green-700 font-bold text-sm">3</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium">Follow-up Phase</h4>
                    <p className="text-sm text-muted-foreground">Up to 2 years after treatment completion</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4 ml-8">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="ml-2 text-sm">Follow-up visits every 3 months for first year</span>
                </div>
                <div className="flex items-center mb-4 ml-8">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="ml-2 text-sm">Follow-up visits every 6 months for second year</span>
                </div>
                <div className="flex items-center ml-8">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="ml-2 text-sm">Disease-free survival assessment</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end gap-4">
            <Button variant="outline">Save Draft</Button>
            <Button>Continue to Eligibility</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="eligibility" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Eligibility Criteria</CardTitle>
              <CardDescription>Define the inclusion and exclusion criteria for study participants</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Inclusion Criteria</h3>
                <div className="space-y-3">
                  {[
                    "Histologically confirmed stage III colorectal adenocarcinoma",
                    "ECOG performance status 0-1",
                    "Age ≥ 18 years",
                    "Adequate bone marrow function",
                    "Adequate liver function defined as bilirubin < 1.5 × ULN",
                    "Adequate renal function defined as creatinine < 1.5 × ULN",
                    "Negative pregnancy test for women of childbearing potential",
                    "Ability to understand and willingness to sign the informed consent form",
                    "Patient must be at least 14 days beyond any major surgery"
                  ].map((criterion, i) => (
                    <div key={i} className="flex items-start gap-3 p-2 border rounded-md">
                      <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                        <span className="text-blue-700 font-bold text-xs">{i+1}</span>
                      </div>
                      <p className="text-sm">{criterion}</p>
                    </div>
                  ))}
                  
                  <Button variant="outline" size="sm" className="mt-2">
                    + Add Inclusion Criterion
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4">Exclusion Criteria</h3>
                <div className="space-y-3">
                  {[
                    "Prior systemic chemotherapy for colorectal cancer",
                    "Known hypersensitivity to any of the study drugs",
                    "Presence of metastatic disease (stage IV)",
                    "Uncontrolled intercurrent illness including, but not limited to, ongoing or active infection, symptomatic congestive heart failure, unstable angina pectoris, cardiac arrhythmia, or psychiatric illness",
                    "Pregnant or breastfeeding",
                    "Known HIV positivity on antiretroviral therapy",
                    "Other malignancy within 5 years except for adequately treated basal cell or squamous cell carcinoma of the skin or carcinoma in situ of the cervix",
                    "Known CNS disease"
                  ].map((criterion, i) => (
                    <div key={i} className="flex items-start gap-3 p-2 border rounded-md">
                      <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                        <span className="text-red-700 font-bold text-xs">{i+1}</span>
                      </div>
                      <p className="text-sm">{criterion}</p>
                    </div>
                  ))}
                  
                  <Button variant="outline" size="sm" className="mt-2">
                    + Add Exclusion Criterion
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end gap-4">
            <Button variant="outline">Save Draft</Button>
            <Button>Continue to Arms & Interventions</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="arms" className="mt-6">
          <div className="py-8 px-6 text-center">
            <Beaker className="mx-auto h-12 w-12 text-muted-foreground/60" />
            <h3 className="mt-4 text-lg font-medium">Arms & Interventions</h3>
            <p className="mt-2 text-muted-foreground">
              Define study arms, randomization procedures, and interventions
            </p>
            <Button className="mt-4">
              Configure Arms & Interventions
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="endpoints" className="mt-6">
          <div className="py-8 px-6 text-center">
            <BarChart className="mx-auto h-12 w-12 text-muted-foreground/60" />
            <h3 className="mt-4 text-lg font-medium">Study Endpoints</h3>
            <p className="mt-2 text-muted-foreground">
              Define primary, secondary, and exploratory endpoints
            </p>
            <Button className="mt-4">
              Configure Endpoints
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default StudyProtocolSetupPage;
