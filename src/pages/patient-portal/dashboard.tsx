import React from 'react';
import { Calendar, MessageSquare, FileText, PieChart, Bell, Pill, Clock } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';

const PatientPortalDashboard = () => {
  return (
    <Layout title="Patient Portal">
      <PageHeader 
        title="Patient Portal" 
        description="Welcome back, Sarah. Here's an overview of your health information."
        breadcrumbs={[{ label: 'Patient Portal' }]}
      />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-base">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              Upcoming Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  title: "Chemotherapy - Cycle 5",
                  provider: "Dr. Rebecca Martinez",
                  date: "Mar 12, 2025",
                  time: "9:00 AM - 12:00 PM"
                },
                {
                  title: "Follow-up Consultation",
                  provider: "Dr. James Wilson",
                  date: "Mar 19, 2025",
                  time: "2:30 PM - 3:00 PM"
                }
              ].map((appointment, i) => (
                <div key={i} className={`p-3 rounded-md ${i % 2 === 0 ? 'bg-muted/50' : ''}`}>
                  <div className="flex justify-between">
                    <h4 className="font-medium text-sm">{appointment.title}</h4>
                    {i === 0 && <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Next</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">{appointment.provider}</p>
                  <div className="flex justify-between mt-2 text-xs">
                    <span>{appointment.date}</span>
                    <span>{appointment.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              View All Appointments
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-base">
              <Pill className="h-4 w-4 mr-2 text-muted-foreground" />
              Medications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Oxaliplatin", timing: "Next dose: Mar 12", status: "Active" },
                { name: "Leucovorin", timing: "Next dose: Mar 12", status: "Active" },
                { name: "5-Fluorouracil", timing: "Next dose: Mar 12", status: "Active" },
                { name: "Ondansetron", timing: "As needed for nausea", status: "Active" }
              ].map((med, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">{med.name}</h4>
                    <p className="text-xs text-muted-foreground">{med.timing}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">{med.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full">
              <Pill className="h-4 w-4 mr-2" />
              Medication Schedule
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-base">
              <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
              Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  from: "Dr. Rebecca Martinez",
                  subject: "Pre-treatment Instructions",
                  time: "Today, 11:23 AM",
                  read: false
                },
                {
                  from: "Nurse Jessica Lee",
                  subject: "Symptom Check-in",
                  time: "Yesterday",
                  read: true
                }
              ].map((message, i) => (
                <div key={i} className={`p-3 rounded-md ${!message.read ? 'bg-blue-50' : ''} ${i % 2 === 0 && message.read ? 'bg-muted/50' : ''}`}>
                  <div className="flex justify-between">
                    <h4 className={`text-sm ${!message.read ? 'font-medium' : ''}`}>{message.from}</h4>
                    {!message.read && <Badge variant="default" className="bg-blue-500">New</Badge>}
                  </div>
                  <p className="text-xs truncate">{message.subject}</p>
                  <p className="text-xs text-muted-foreground mt-1">{message.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full">
              <MessageSquare className="h-4 w-4 mr-2" />
              View All Messages
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-base">
              <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
              Treatment Progress
            </CardTitle>
            <CardDescription>FOLFOX + Bevacizumab Protocol</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Cycles Completed</span>
                <span className="font-medium">4 of 12</span>
              </div>
              <Progress value={33} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Treatment started Jan 15, 2025. Expected completion: July 25, 2025.
              </p>
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="border rounded-md p-2 text-center">
                <div className="text-2xl font-bold">4</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
              <div className="border rounded-md p-2 text-center">
                <div className="text-2xl font-bold">1</div>
                <div className="text-xs text-muted-foreground">Scheduled</div>
              </div>
              <div className="border rounded-md p-2 text-center">
                <div className="text-2xl font-bold">7</div>
                <div className="text-xs text-muted-foreground">Remaining</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">View Treatment Details</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-base">
              <PieChart className="h-4 w-4 mr-2 text-muted-foreground" />
              Symptom Tracker
            </CardTitle>
            <CardDescription>Report and track your symptoms</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="current">
              <TabsList className="w-full">
                <TabsTrigger value="current" className="flex-1">Current Symptoms</TabsTrigger>
                <TabsTrigger value="report" className="flex-1">Report Symptoms</TabsTrigger>
              </TabsList>
              <TabsContent value="current" className="mt-4">
                <div className="space-y-3">
                  {[
                    { symptom: "Neuropathy", severity: "Mild", trend: "Stable" },
                    { symptom: "Fatigue", severity: "Moderate", trend: "Improving" },
                    { symptom: "Nausea", severity: "Mild", trend: "Improving" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-2 border rounded-md">
                      <div>
                        <h4 className="text-sm font-medium">{item.symptom}</h4>
                        <p className="text-xs text-muted-foreground">Severity: {item.severity}</p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={item.trend === "Improving" ? "text-green-600" : item.trend === "Worsening" ? "text-red-600" : ""}
                      >
                        {item.trend}
                      </Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="report" className="mt-4">
                <div className="text-center py-6">
                  <PieChart className="mx-auto h-12 w-12 text-muted-foreground/60" />
                  <h3 className="mt-2 font-medium">Report New Symptoms</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Track changes in your health to help your care team provide better treatment
                  </p>
                  <Button className="mt-4">Start Symptom Report</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Clinical Trial Participation</CardTitle>
            <CardDescription>You are currently enrolled in 1 research study</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md p-4">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h3 className="font-medium">BEACON-CRC Phase II Trial</h3>
                  <p className="text-sm text-muted-foreground">FOLFOX + Bevacizumab in Stage III Colorectal Cancer</p>
                </div>
                <Badge className="mt-2 md:mt-0 w-fit">Active</Badge>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Study ID</p>
                  <p>NCT039281754</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Enrollment Date</p>
                  <p>Jan 10, 2025</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Principal Investigator</p>
                  <p>Dr. Rebecca Martinez</p>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Upcoming Research Activities:</p>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center p-2 bg-muted/50 rounded-md">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div className="text-sm">Quality of Life Survey Due <span className="font-medium">Mar 10, 2025</span></div>
                  </div>
                  <div className="flex items-center p-2 rounded-md">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div className="text-sm">Additional Blood Draw <span className="font-medium">Mar 12, 2025</span></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col xs:flex-row gap-2 w-full">
              <Button variant="outline" className="flex-1">View Study Details</Button>
              <Button variant="outline" className="flex-1">Complete Surveys</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Care Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Dr. Rebecca Martinez",
                  role: "Oncologist",
                  avatar: "RM"
                },
                {
                  name: "Dr. James Wilson",
                  role: "Surgeon",
                  avatar: "JW"
                },
                {
                  name: "Nurse Jessica Lee",
                  role: "Oncology Nurse",
                  avatar: "JL"
                }
              ].map((member, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <Avatar>
                    <div className="flex h-full w-full items-center justify-center bg-health-primary text-white">
                      {member.avatar}
                    </div>
                  </Avatar>
                  <div>
                    <h4 className="text-sm font-medium">{member.name}</h4>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Care Team
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Education & Resources</CardTitle>
            <CardDescription>Resources related to your condition and treatment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                {
                  title: "Understanding Your Treatment",
                  description: "Learn about FOLFOX and Bevacizumab therapy",
                  type: "Article"
                },
                {
                  title: "Managing Side Effects",
                  description: "Tips for coping with chemotherapy side effects",
                  type: "Video"
                },
                {
                  title: "Nutrition During Treatment",
                  description: "Dietary guidelines for colorectal cancer patients",
                  type: "PDF"
                },
                {
                  title: "Support Groups",
                  description: "Connect with other patients and survivors",
                  type: "Link"
                }
              ].map((resource, i) => (
                <div key={i} className="border rounded-md p-3">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-medium">{resource.title}</h4>
                    <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{resource.description}</p>
                  <Button variant="link" className="p-0 h-auto text-sm mt-2">View Resource</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PatientPortalDashboard;
