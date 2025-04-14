
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MessageSquare, FileText, PieChart, Bell, Pill, Clock, CheckCircle2, BookOpen } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import Quiz from '@/components/patient-education/Quiz';

const PatientDashboard = () => {
  const [showEducationQuiz, setShowEducationQuiz] = useState(false);
  
  const treatmentQuestions = [
    {
      id: 'q1',
      question: 'Which of the following is NOT a common side effect of FOLFOX chemotherapy?',
      options: [
        'Neuropathy (tingling in hands/feet)',
        'Hair loss',
        'Nausea',
        'Fatigue'
      ],
      correctAnswer: 1,
      explanation: 'While many chemotherapies cause hair loss, FOLFOX typically causes less hair loss than other regimens. The most common side effects are neuropathy, nausea, fatigue, and increased risk of infection.'
    },
    {
      id: 'q2',
      question: 'How long should you avoid cold food and drinks after oxaliplatin infusion?',
      options: [
        '24 hours',
        '3-5 days',
        'No restriction necessary',
        '2 weeks'
      ],
      correctAnswer: 1,
      explanation: 'Cold sensitivity is a common side effect of oxaliplatin. Patients should avoid cold food/drinks for 3-5 days after treatment to minimize neuropathy symptoms.'
    },
    {
      id: 'q3',
      question: 'When should you contact your care team about nausea?',
      options: [
        'Only if you can't keep any food down for 24 hours',
        'If you feel nauseated at all',
        'If anti-nausea medications don't help or you vomit more than twice in 24 hours',
        'Only if you become dehydrated'
      ],
      correctAnswer: 2,
      explanation: 'You should contact your care team if your prescribed anti-nausea medications aren't controlling your symptoms or if you vomit multiple times in a day. Early intervention can prevent dehydration and improve your comfort.'
    }
  ];
  
  return (
    <Layout title="Patient Dashboard">
      <PageHeader 
        title="My Health Dashboard" 
        description="Welcome back, Sarah. Here's an overview of your health information."
        breadcrumbs={[{ label: 'Patient Dashboard' }]}
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
                  date: "Apr 15, 2025",
                  time: "9:00 AM - 12:00 PM"
                },
                {
                  title: "Follow-up Consultation",
                  provider: "Dr. James Wilson",
                  date: "Apr 22, 2025",
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
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link to="/appointments">
                <Calendar className="h-4 w-4 mr-2" />
                View All Appointments
              </Link>
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
                { name: "Oxaliplatin", timing: "Next dose: Apr 15", status: "Active" },
                { name: "Leucovorin", timing: "Next dose: Apr 15", status: "Active" },
                { name: "5-Fluorouracil", timing: "Next dose: Apr 15", status: "Active" },
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
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link to="/messages">
                <MessageSquare className="h-4 w-4 mr-2" />
                View All Messages
              </Link>
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
        {showEducationQuiz ? (
          <Card>
            <CardHeader>
              <CardTitle>Treatment Knowledge Quiz</CardTitle>
              <CardDescription>Test your understanding of your treatment</CardDescription>
            </CardHeader>
            <CardContent>
              <Quiz 
                title="Understanding Your FOLFOX Treatment" 
                description="Answer these questions to test your knowledge about your chemotherapy protocol"
                questions={treatmentQuestions}
                onComplete={(score) => {
                  console.log(`Quiz completed with score: ${score}`);
                }}
              />
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Patient Education</CardTitle>
              <CardDescription>Resources to help you understand your condition and treatment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Understanding FOLFOX Treatment</h4>
                      <p className="text-sm text-muted-foreground mt-1">Learn about your chemotherapy protocol and what to expect</p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">Read Article</Button>
                        <Button size="sm" onClick={() => setShowEducationQuiz(true)}>Take Quiz</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Managing Side Effects</h4>
                      <p className="text-sm text-muted-foreground mt-1">Tips and strategies for coping with treatment side effects</p>
                      <Button size="sm" variant="outline" className="mt-3">Read Guide</Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Pill className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Medication Guide</h4>
                      <p className="text-sm text-muted-foreground mt-1">Detailed information about your prescribed medications</p>
                      <Button size="sm" variant="outline" className="mt-3">View Guide</Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <Calendar className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Daily Health Journal</h4>
                      <p className="text-sm text-muted-foreground mt-1">Keep track of your symptoms and daily wellbeing</p>
                      <Button size="sm" variant="outline" className="mt-3">Start Journal</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Browse All Resources</Button>
            </CardFooter>
          </Card>
        )}
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
                    <div className="text-sm">Quality of Life Survey Due <span className="font-medium">Apr 17, 2025</span></div>
                  </div>
                  <div className="flex items-center p-2 rounded-md">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div className="text-sm">Additional Blood Draw <span className="font-medium">Apr 15, 2025</span></div>
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
    </Layout>
  );
};

export default PatientDashboard;
