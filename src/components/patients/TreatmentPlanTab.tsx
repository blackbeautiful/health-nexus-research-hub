
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, AlertTriangle, BarChart, Beaker, FileText, Plus, Pill } from 'lucide-react';

const TreatmentPlanTab = () => {
  return (
    <Tabs defaultValue="overview">
      <TabsList className="grid grid-cols-4 mb-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="chemotherapy">Chemotherapy</TabsTrigger>
        <TabsTrigger value="radiation">Radiation</TabsTrigger>
        <TabsTrigger value="surgery">Surgery</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="md:col-span-2">
            <CardHeader className="bg-muted/50">
              <CardTitle>Current Treatment Plan</CardTitle>
              <CardDescription>
                Breast Cancer - Stage II - Initiated Feb 28, 2025
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Current Phase</Badge>
                      <h3 className="font-medium">Neoadjuvant Chemotherapy</h3>
                    </div>
                    <Badge>2 of 6 Cycles Completed</Badge>
                  </div>
                  <Progress value={33} className="h-2" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-health-primary" />
                        <span className="text-sm font-medium">Next Appointment</span>
                      </div>
                      <Badge variant="outline" className="ml-auto">Cycle 3</Badge>
                    </div>
                    <p className="font-medium mt-2">April 19, 2025</p>
                    <p className="text-sm text-gray-500">10:30 AM - Oncology Center</p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-health-primary" />
                      <span className="text-sm font-medium">Treatment Duration</span>
                    </div>
                    <p className="font-medium mt-2">4 Months Remaining</p>
                    <p className="text-sm text-gray-500">Expected completion: Jun 28, 2025</p>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-medium">Recent Toxicities</span>
                    </div>
                    <p className="font-medium mt-2">Grade 2 Neutropenia</p>
                    <p className="text-sm text-gray-500">Reported on Apr 5, 2025</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Treatment Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[250px] pr-4">
                <ol className="relative border-l border-gray-200 ml-3">
                  {timelineEvents.map((event, idx) => (
                    <li key={idx} className="mb-6 ml-6">
                      <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-white bg-health-primary">
                        <event.icon className="w-3 h-3 text-white" />
                      </span>
                      <h3 className="flex items-center mb-1 text-sm font-medium">{event.title}</h3>
                      <time className="block mb-2 text-xs font-normal leading-none text-gray-500">{event.date}</time>
                      <p className="text-xs text-gray-500">{event.description}</p>
                    </li>
                  ))}
                </ol>
              </ScrollArea>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Response Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Tumor Size Reduction</span>
                    <span className="text-sm font-medium">28%</span>
                  </div>
                  <Progress value={28} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Lymph Node Response</span>
                    <span className="text-sm font-medium">Partial</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                
                <div className="flex justify-between items-center p-3 rounded-md bg-blue-50 mt-4">
                  <div className="flex items-center gap-2">
                    <BarChart className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Next Assessment</span>
                  </div>
                  <span className="text-sm">Apr 26, 2025</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="chemotherapy">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>AC-T Chemotherapy Regimen</CardTitle>
                <CardDescription>Dose-dense protocol</CardDescription>
              </div>
              <Badge>Current</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Regimen Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-3 border rounded-md">
                    <span className="text-xs text-gray-500">Total Cycles</span>
                    <p className="font-medium">8 (4 AC + 4 T)</p>
                  </div>
                  <div className="p-3 border rounded-md">
                    <span className="text-xs text-gray-500">Frequency</span>
                    <p className="font-medium">Every 2 weeks</p>
                  </div>
                  <div className="p-3 border rounded-md">
                    <span className="text-xs text-gray-500">Current Cycle</span>
                    <p className="font-medium">2 of 8</p>
                  </div>
                  <div className="p-3 border rounded-md">
                    <span className="text-xs text-gray-500">Completion</span>
                    <p className="font-medium">25%</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-2">Current Medications</h3>
                <div className="space-y-3">
                  {chemoMedications.map((med, idx) => (
                    <div key={idx} className="p-3 border rounded-md">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <Beaker className="h-4 w-4 text-health-primary" />
                          <h4 className="font-medium">{med.name}</h4>
                        </div>
                        <Badge variant="outline">{med.category}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-gray-500">Dosage</p>
                          <p className="text-sm">{med.dosage}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Route</p>
                          <p className="text-sm">{med.route}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Schedule</p>
                          <p className="text-sm">{med.schedule}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-2">Reported Side Effects</h3>
                <ScrollArea className="h-[200px] pr-4">
                  <div className="space-y-2">
                    {sideEffects.map((effect, idx) => (
                      <div key={idx} className="flex items-center p-2 border-l-4 rounded-md" style={{ borderLeftColor: getSeverityColor(effect.grade) }}>
                        <div className="flex-1">
                          <div className="flex items-center gap-1">
                            <h4 className="text-sm font-medium">{effect.name}</h4>
                            <Badge variant={effect.grade > 2 ? 'destructive' : 'outline'} className="ml-2">
                              Grade {effect.grade}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500">{effect.reported}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-medium">{effect.status}</p>
                          <p className="text-xs text-gray-500">{effect.action}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 flex justify-between">
            <div className="text-sm text-gray-500">
              <p>Protocol: NSABP B-38</p>
              <p>Last updated: Apr 5, 2025</p>
            </div>
            <Button size="sm">
              <FileText className="h-4 w-4 mr-1" />
              View Complete Plan
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="radiation">
        <Card>
          <CardHeader>
            <CardTitle>Radiation Therapy Plan</CardTitle>
            <CardDescription>Scheduled to begin after chemotherapy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-6 rounded-lg bg-muted/50 text-center">
              <h3 className="text-xl font-medium mb-2">Planned for July 2025</h3>
              <p className="text-gray-500 mb-4">After completion of chemotherapy and surgical evaluation</p>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                View Tentative Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="surgery">
        <Card>
          <CardHeader>
            <CardTitle>Surgical Plan</CardTitle>
            <CardDescription>Pending completion of neoadjuvant therapy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-6 rounded-lg bg-muted/50">
                <h3 className="font-medium mb-2">Tentative Plan</h3>
                <p className="text-gray-600">The surgical approach will be determined based on response to neoadjuvant chemotherapy. Options being considered:</p>
                
                <div className="mt-4 space-y-3">
                  <div className="p-3 border rounded-md bg-white">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Breast Conservation Surgery (Lumpectomy)</h4>
                      <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Preferred</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">If good response to chemotherapy is observed</p>
                  </div>
                  
                  <div className="p-3 border rounded-md bg-white">
                    <h4 className="font-medium">Modified Radical Mastectomy</h4>
                    <p className="text-sm text-gray-500 mt-1">Alternative if inadequate response to neoadjuvant therapy</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Both options will include axillary lymph node dissection due to positive sentinel nodes.</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-4">Surgical Evaluation Timeline</h3>
                
                <div className="relative">
                  <div className="absolute left-5 h-full w-0.5 bg-gray-200"></div>
                  
                  <div className="relative pl-10 pb-8">
                    <div className="absolute -left-1 mt-1.5 h-6 w-6 rounded-full border-4 border-white bg-green-500 flex items-center justify-center">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Completed</span>
                      <span className="font-medium">Initial Surgical Consultation</span>
                      <span className="text-sm text-gray-500">February 18, 2025</span>
                    </div>
                  </div>
                  
                  <div className="relative pl-10 pb-8">
                    <div className="absolute -left-1 mt-1.5 h-6 w-6 rounded-full border-4 border-white bg-blue-500"></div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Current</span>
                      <span className="font-medium">Neoadjuvant Chemotherapy</span>
                      <span className="text-sm text-gray-500">Feb 28 - Jun 28, 2025</span>
                    </div>
                  </div>
                  
                  <div className="relative pl-10 pb-8">
                    <div className="absolute -left-1 mt-1.5 h-6 w-6 rounded-full border-4 border-white bg-gray-300"></div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Upcoming</span>
                      <span className="font-medium">Mid-treatment Surgical Re-evaluation</span>
                      <span className="text-sm text-gray-500">Apr 26, 2025</span>
                    </div>
                  </div>
                  
                  <div className="relative pl-10">
                    <div className="absolute -left-1 mt-1.5 h-6 w-6 rounded-full border-4 border-white bg-gray-300"></div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Upcoming</span>
                      <span className="font-medium">Final Surgical Planning</span>
                      <span className="text-sm text-gray-500">Jun 30, 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Schedule Plastic Surgery Consultation
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

// Helper function to get color based on severity
const getSeverityColor = (grade) => {
  switch (grade) {
    case 1: return '#10b981'; // green
    case 2: return '#f59e0b'; // amber
    case 3: return '#f97316'; // orange
    case 4:
    default: return '#ef4444'; // red
  }
};

const timelineEvents = [
  {
    title: 'Diagnosis Confirmed',
    date: 'Feb 10, 2025',
    description: 'IDC confirmed via core needle biopsy',
    icon: FileText
  },
  {
    title: 'Treatment Planning',
    date: 'Feb 20, 2025',
    description: 'Multidisciplinary tumor board review',
    icon: Calendar
  },
  {
    title: 'Chemotherapy Initiated',
    date: 'Feb 28, 2025',
    description: 'First cycle of AC (doxorubicin/cyclophosphamide)',
    icon: Beaker
  },
  {
    title: 'Cycle 2 Administered',
    date: 'Mar 14, 2025',
    description: 'Second cycle of AC with G-CSF support',
    icon: Beaker
  },
  {
    title: 'Side Effect Management',
    date: 'Mar 20, 2025',
    description: 'Antiemetics adjusted due to persistent nausea',
    icon: Pill
  },
];

const chemoMedications = [
  {
    name: 'Doxorubicin (Adriamycin)',
    category: 'Anthracycline',
    dosage: '60mg/m²',
    route: 'IV',
    schedule: 'Day 1 of each cycle'
  },
  {
    name: 'Cyclophosphamide',
    category: 'Alkylating Agent',
    dosage: '600mg/m²',
    route: 'IV',
    schedule: 'Day 1 of each cycle'
  },
  {
    name: 'Pegfilgrastim (Neulasta)',
    category: 'G-CSF',
    dosage: '6mg',
    route: 'Subcutaneous',
    schedule: 'Day 2 of each cycle'
  },
  {
    name: 'Ondansetron',
    category: 'Antiemetic',
    dosage: '8mg',
    route: 'Oral',
    schedule: 'Every 8 hours PRN'
  }
];

const sideEffects = [
  {
    name: 'Neutropenia',
    grade: 2,
    reported: 'Apr 5, 2025',
    status: 'Resolving',
    action: 'G-CSF administered'
  },
  {
    name: 'Nausea',
    grade: 2,
    reported: 'Mar 16, 2025',
    status: 'Resolved',
    action: 'Antiemetic regimen adjusted'
  },
  {
    name: 'Fatigue',
    grade: 1,
    reported: 'Mar 18, 2025',
    status: 'Ongoing',
    action: 'Activity modification'
  },
  {
    name: 'Alopecia',
    grade: 2,
    reported: 'Mar 20, 2025',
    status: 'Ongoing',
    action: 'Supportive care'
  }
];

export default TreatmentPlanTab;
