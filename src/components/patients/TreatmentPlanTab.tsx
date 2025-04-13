
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, AlertTriangle, Calendar, FileText, Activity } from 'lucide-react';

interface TreatmentPlanTabProps {
  patientId?: string;
}

const TreatmentPlanTab: React.FC<TreatmentPlanTabProps> = ({ patientId }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>FOLFOX + Bevacizumab</CardTitle>
              <CardDescription>Adjuvant Chemotherapy Protocol</CardDescription>
            </div>
            <Badge>Active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Protocol Start</p>
                <p className="font-medium">Jan 15, 2025</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Planned End</p>
                <p className="font-medium">July 25, 2025</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cycles Completed</p>
                <p className="font-medium">4 of 12</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Protocol Status</p>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  <p className="font-medium">On Schedule</p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Treatment Progress</span>
                <span className="text-sm font-medium">33%</span>
              </div>
              <Progress value={33} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="cycles">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cycles">
            <Calendar className="h-4 w-4 mr-2" />
            Treatment Cycles
          </TabsTrigger>
          <TabsTrigger value="medications">
            <FileText className="h-4 w-4 mr-2" />
            Current Medications
          </TabsTrigger>
          <TabsTrigger value="toxicities">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Toxicities
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="cycles" className="pt-4 space-y-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="py-3">
                <div className="flex justify-between">
                  <CardTitle className="text-base">Cycle {i + 1}</CardTitle>
                  <Badge variant="outline" className="ml-2">Completed</Badge>
                </div>
              </CardHeader>
              <CardContent className="py-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="text-sm">{`Jan ${15 + i * 14}, 2025`}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Dose Adjustments</p>
                    <p className="text-sm">{i > 1 ? "5-FU reduced to 80%" : "None"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Attending Provider</p>
                    <p className="text-sm">Dr. Rebecca Martinez</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Card>
            <CardHeader className="py-3">
              <div className="flex justify-between">
                <CardTitle className="text-base">Cycle 5</CardTitle>
                <Badge variant="secondary">Scheduled</Badge>
              </div>
            </CardHeader>
            <CardContent className="py-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="text-sm">Mar 12, 2025</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expected Dose</p>
                  <p className="text-sm">5-FU at 80%, other agents at 100%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Attending Provider</p>
                  <p className="text-sm">Dr. Rebecca Martinez</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="medications" className="pt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {[
                  {
                    name: "Oxaliplatin",
                    dose: "85 mg/m² IV",
                    schedule: "Day 1 of each 14-day cycle",
                    class: "Platinum-based agent"
                  },
                  {
                    name: "Leucovorin",
                    dose: "400 mg/m² IV",
                    schedule: "Day 1 of each 14-day cycle",
                    class: "Folate"
                  },
                  {
                    name: "5-Fluorouracil (5-FU)",
                    dose: "400 mg/m² IV bolus, then 2400 mg/m² over 46 hours",
                    schedule: "Day 1-2 of each 14-day cycle",
                    class: "Anti-metabolite"
                  },
                  {
                    name: "Bevacizumab",
                    dose: "5 mg/kg IV",
                    schedule: "Day 1 of each 14-day cycle",
                    class: "Anti-angiogenesis monoclonal antibody"
                  },
                  {
                    name: "Ondansetron",
                    dose: "8 mg oral",
                    schedule: "30 minutes before chemotherapy and every 12h for 3 days",
                    class: "Anti-emetic"
                  }
                ].map((med, i) => (
                  <div key={i} className="border rounded-md p-3">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                      <div>
                        <h4 className="font-medium">{med.name}</h4>
                        <p className="text-sm text-muted-foreground">{med.class}</p>
                      </div>
                      <Badge variant="outline" className="mt-2 md:mt-0 md:ml-2 w-fit">Active</Badge>
                    </div>
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Dosage: </span>
                        <span>{med.dose}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Schedule: </span>
                        <span>{med.schedule}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="toxicities" className="pt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {[
                  {
                    name: "Peripheral Neuropathy",
                    grade: "Grade 2",
                    onset: "After cycle 3",
                    management: "Continuing observation, symptom management with gabapentin"
                  },
                  {
                    name: "Neutropenia",
                    grade: "Grade 3",
                    onset: "After cycle 2",
                    management: "5-FU dose reduction to 80% from cycle 3 onwards"
                  },
                  {
                    name: "Nausea/Vomiting",
                    grade: "Grade 1",
                    onset: "Cycles 1-4",
                    management: "Well controlled with anti-emetics"
                  }
                ].map((toxicity, i) => (
                  <div key={i} className="border rounded-md p-3">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                      <div>
                        <h4 className="font-medium">{toxicity.name}</h4>
                        <div className="flex items-center mt-1">
                          <Activity className="h-4 w-4 text-amber-500 mr-1" />
                          <p className="text-sm">{toxicity.grade}</p>
                        </div>
                      </div>
                      <Badge 
                        className={`mt-2 md:mt-0 md:ml-2 w-fit ${
                          toxicity.grade.includes('3') ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' :
                          toxicity.grade.includes('2') ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' :
                          'bg-green-100 text-green-800 hover:bg-green-100'
                        }`}
                      >
                        {toxicity.grade}
                      </Badge>
                    </div>
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Onset: </span>
                        <span>{toxicity.onset}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Management: </span>
                        <span>{toxicity.management}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TreatmentPlanTab;
