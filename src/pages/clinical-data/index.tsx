
import React from 'react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FileText, BarChart2, Stethoscope, Calendar, TestTube, Activity, FileX2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ClinicalDataPage = () => {
  return (
    <Layout title="Clinical Data">
      <PageHeader 
        title="Clinical Data" 
        description="Access and manage patient clinical data"
        breadcrumbs={[
          { label: 'Clinical Data' }
        ]}
      />
      
      <Tabs defaultValue="notes">
        <div className="overflow-x-auto pb-2">
          <TabsList>
            <TabsTrigger value="notes" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Clinical Notes
            </TabsTrigger>
            <TabsTrigger value="vitals" className="flex items-center">
              <Activity className="mr-2 h-4 w-4" />
              Vitals
            </TabsTrigger>
            <TabsTrigger value="labs" className="flex items-center">
              <TestTube className="mr-2 h-4 w-4" />
              Lab Results
            </TabsTrigger>
            <TabsTrigger value="imaging" className="flex items-center">
              <Stethoscope className="mr-2 h-4 w-4" />
              Imaging
            </TabsTrigger>
            <TabsTrigger value="procedures" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Procedures
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="mt-6">
          <TabsContent value="notes">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Clinical Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`p-4 ${i % 2 === 0 ? 'bg-muted/30' : ''}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">Oncology Follow-up Visit</h4>
                          <p className="text-sm text-gray-500">Patient: Sarah Johnson</p>
                        </div>
                        <span className="text-sm text-gray-500">Apr {12 - i}, 2025</span>
                      </div>
                      <p className="text-sm line-clamp-2">
                        Patient presents for review of recent chemotherapy cycle. Reports mild fatigue (grade 1) and
                        resolved nausea. Physical exam shows no new concerns. Will continue with current dosing for next cycle.
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-sm text-gray-500">Dr. Rebecca Martinez</div>
                        <Button variant="ghost" size="sm" className="h-auto py-1">View Note</Button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-4 flex justify-center">
                    <Button variant="outline">View All Notes</Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Create New Note</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button className="w-full justify-start" variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        Progress Note
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Stethoscope className="mr-2 h-4 w-4" />
                        Consultation Note
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <BarChart2 className="mr-2 h-4 w-4" />
                        Treatment Response
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <FileX2 className="mr-2 h-4 w-4" />
                        Adverse Event Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Notes Today</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Notes This Week</span>
                        <span className="font-medium">48</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Pending Co-signs</span>
                        <span className="font-medium text-amber-600">3</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="vitals">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Stethoscope className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium">Vitals Dashboard</h3>
                  <p className="mt-2 text-gray-500">
                    Select a patient to view their vitals and trending data
                  </p>
                  <Button className="mt-4">Select Patient</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="labs">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <TestTube className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium">Lab Results</h3>
                  <p className="mt-2 text-gray-500">
                    Select a patient to view their laboratory results
                  </p>
                  <Button className="mt-4">Select Patient</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="imaging">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Stethoscope className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium">Imaging Repository</h3>
                  <p className="mt-2 text-gray-500">
                    Access diagnostic imaging studies and reports
                  </p>
                  <Button className="mt-4">Browse Imaging Studies</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="procedures">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium">Procedures Schedule</h3>
                  <p className="mt-2 text-gray-500">
                    View upcoming and past procedures for patients
                  </p>
                  <Button className="mt-4">View Schedule</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </Layout>
  );
};

export default ClinicalDataPage;
