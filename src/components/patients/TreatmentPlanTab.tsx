
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp,
  FileCog,
  Pill,
  Syringe,
  Zap,
  Activity,
  ListChecks
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TreatmentPlanTabProps {
  patientId: string;
}

const TreatmentPlanTab: React.FC<TreatmentPlanTabProps> = ({ patientId }) => {
  const { toast } = useToast();
  const [showCompleted, setShowCompleted] = React.useState(false);
  
  const handleAction = (action: string) => {
    toast({
      title: "Action triggered",
      description: `${action} functionality will be implemented soon.`,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Current Treatment Protocol</span>
              <Badge className="bg-blue-100 text-blue-800">FOLFOX</Badge>
            </CardTitle>
            <CardDescription>Colorectal Cancer - Stage III - Adjuvant</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p className="font-medium">March 1, 2025</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expected End Date</p>
                <p className="font-medium">August 15, 2025</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Protocol</p>
                <p className="font-medium">FOLFOX (5-FU + Leucovorin + Oxaliplatin)</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Frequency</p>
                <p className="font-medium">Every 2 weeks, 6 cycles total</p>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Treatment Progress</span>
                <span className="text-sm">3 of 6 cycles (50%)</span>
              </div>
              <Progress value={50} indicatorClassName="bg-blue-500" />
            </div>
            
            <div>
              <p className="font-medium mb-2">Medications in Protocol</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dose</TableHead>
                    <TableHead>Administration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Oxaliplatin</TableCell>
                    <TableCell>85 mg/m²</TableCell>
                    <TableCell>IV infusion, day 1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Leucovorin</TableCell>
                    <TableCell>400 mg/m²</TableCell>
                    <TableCell>IV infusion, day 1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>5-Fluorouracil</TableCell>
                    <TableCell>400 mg/m² bolus, 2400 mg/m² continuous</TableCell>
                    <TableCell>IV bolus, then 46-hour infusion</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            <div>
              <p className="font-medium mb-2">Protocol Notes</p>
              <p className="text-sm text-muted-foreground">
                Adjuvant chemotherapy following complete resection of stage III colorectal cancer. 
                Monitor for peripheral neuropathy from Oxaliplatin. Administer antiemetics before chemotherapy.
                Adjust dose based on toxicity.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <Button variant="outline" className="sm:flex-1" onClick={() => handleAction('View protocol details')}>
                <FileCog className="mr-2 h-4 w-4" />
                Protocol Details
              </Button>
              <Button variant="outline" className="sm:flex-1" onClick={() => handleAction('Adjust doses')}>
                <Pill className="mr-2 h-4 w-4" />
                Adjust Doses
              </Button>
              <Button className="sm:flex-1" onClick={() => handleAction('Record administration')}>
                <Syringe className="mr-2 h-4 w-4" />
                Record Administration
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Treatment Timeline</CardTitle>
              <CardDescription>Schedule and history of treatment cycles</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Next scheduled cycle */}
              <div className="flex items-start gap-4 p-3 bg-blue-50 rounded-md">
                <div className="mt-1">
                  <Clock className="h-5 w-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-medium">FOLFOX - Cycle 4</h4>
                      <p className="text-sm text-muted-foreground">Scheduled: April 19, 2025</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 w-fit">Upcoming</Badge>
                  </div>
                  <div className="mt-2">
                    <Button variant="outline" size="sm" onClick={() => handleAction('View cycle details')}>
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Current cycle */}
              <div className="flex items-start gap-4 p-3 bg-green-50 rounded-md">
                <div className="mt-1">
                  <Activity className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-medium">FOLFOX - Cycle 3</h4>
                      <p className="text-sm text-muted-foreground">Administered: April 5, 2025</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 w-fit">Current</Badge>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm mb-2">Notes: Patient tolerated treatment well, mild nausea controlled with antiemetics.</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleAction('View cycle details')}>
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleAction('Record side effects')}>
                        Record Side Effects
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Previous cycles */}
              <div className="flex items-start gap-4 p-3 rounded-md">
                <div className="mt-1">
                  <CheckCircle className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-medium">FOLFOX - Cycle 2</h4>
                      <p className="text-sm text-muted-foreground">Administered: March 22, 2025</p>
                    </div>
                    <Badge variant="outline" className="w-fit">Completed</Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-3 rounded-md">
                <div className="mt-1">
                  <CheckCircle className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-medium">FOLFOX - Cycle 1</h4>
                      <p className="text-sm text-muted-foreground">Administered: March 8, 2025</p>
                    </div>
                    <Badge variant="outline" className="w-fit">Completed</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" onClick={() => setShowCompleted(!showCompleted)}>
              {showCompleted ? (
                <>
                  <ChevronUp className="mr-2 h-4 w-4" />
                  Hide Previous Treatments
                </>
              ) : (
                <>
                  <ChevronDown className="mr-2 h-4 w-4" />
                  Show Previous Treatments
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Treatment Response</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Last Evaluation</p>
              <p className="font-medium">April 1, 2025</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">RECIST Assessment</p>
              <Badge className="bg-green-100 text-green-800">Partial Response (PR)</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tumor Size Change</p>
              <p className="font-medium text-green-600">-32% from baseline</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => handleAction('View radiological reports')}>
              View Radiological Reports
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Side Effects & Toxicity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <p className="font-medium">Peripheral Neuropathy</p>
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-100 text-amber-800">Grade 2</Badge>
                  <span className="text-sm text-muted-foreground">CTCAE v5.0</span>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <p className="font-medium">Neutropenia</p>
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-100 text-amber-800">Grade 2</Badge>
                  <span className="text-sm text-muted-foreground">CTCAE v5.0</span>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <p className="font-medium">Nausea</p>
                <div className="flex items-center gap-2">
                  <Badge className="bg-yellow-100 text-yellow-800">Grade 1</Badge>
                  <span className="text-sm text-muted-foreground">CTCAE v5.0</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => handleAction('Record new side effect')}>
              <Plus className="mr-2 h-4 w-4" />
              Record New Side Effect
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Supportive Care</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium">Antiemetics</h4>
              <p className="text-sm text-muted-foreground">Ondansetron 8mg before chemotherapy</p>
            </div>
            <div>
              <h4 className="font-medium">Growth Factors</h4>
              <p className="text-sm text-muted-foreground">Filgrastim if ANC &lt; 1.5 × 10⁹/L</p>
            </div>
            <div>
              <h4 className="font-medium">Neuropathy Management</h4>
              <p className="text-sm text-muted-foreground">Gabapentin 300mg TID as needed</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => handleAction('Update supportive care')}>
              <ListChecks className="mr-2 h-4 w-4" />
              Update Care Plan
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default TreatmentPlanTab;
