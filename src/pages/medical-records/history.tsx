
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Clock, FileText, Calendar, User, Download, Printer } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const PatientHistoryPage = () => {
  const patientInfo = {
    name: "Sarah Johnson",
    id: "PT-12345",
    dob: "07/15/1982",
    gender: "Female",
    primaryProvider: "Dr. Rebecca Martinez",
    insuranceProvider: "HealthPlus Insurance"
  };
  
  const medicalHistory = [
    { date: "2022-09-15", event: "Initial Diagnosis", description: "Diagnosed with Stage II HER2+ Breast Cancer", provider: "Dr. Rebecca Martinez" },
    { date: "2022-10-03", event: "Surgery", description: "Lumpectomy with sentinel lymph node biopsy", provider: "Dr. James Wilson" },
    { date: "2022-10-25", event: "Pathology Results", description: "Confirmed Stage IIA (T1N1M0) HER2+ Breast Cancer", provider: "Dr. Elena Rodriguez" },
    { date: "2022-11-10", event: "Treatment Start", description: "Initiated adjuvant chemotherapy with docetaxel and carboplatin", provider: "Dr. Rebecca Martinez" },
    { date: "2023-03-05", event: "Treatment Complete", description: "Completed adjuvant chemotherapy", provider: "Dr. Rebecca Martinez" },
    { date: "2023-03-20", event: "Follow-up", description: "Post-treatment evaluation, no evidence of disease", provider: "Dr. Rebecca Martinez" },
    { date: "2023-09-18", event: "Follow-up", description: "6-month follow-up, continued NED status", provider: "Dr. Rebecca Martinez" },
    { date: "2024-03-15", event: "Follow-up", description: "12-month follow-up, continued NED status", provider: "Dr. Rebecca Martinez" }
  ];

  return (
    <MainLayout>
      <PageHeader
        title="Patient History"
        description="Comprehensive patient medical history timeline"
        breadcrumbs={[
          { label: 'Medical Records', link: '/medical-records' },
          { label: 'Patient History' }
        ]}
        action={{
          label: 'Export History',
          icon: Download,
          onClick: () => console.log('Export patient history')
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-3">
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle>Patient Information</CardTitle>
                <CardDescription>Select a patient to view medical history</CardDescription>
              </div>
              <div className="w-full md:w-[300px]">
                <Select defaultValue="PT-12345">
                  <SelectTrigger>
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PT-12345">Sarah Johnson (PT-12345)</SelectItem>
                    <SelectItem value="PT-12346">Michael Smith (PT-12346)</SelectItem>
                    <SelectItem value="PT-12347">Emma Thompson (PT-12347)</SelectItem>
                    <SelectItem value="PT-12348">John Davis (PT-12348)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Name</div>
                <div className="font-medium">{patientInfo.name}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Patient ID</div>
                <div className="font-medium">{patientInfo.id}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Date of Birth</div>
                <div className="font-medium">{patientInfo.dob}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Gender</div>
                <div className="font-medium">{patientInfo.gender}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Primary Provider</div>
                <div className="font-medium">{patientInfo.primaryProvider}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Insurance</div>
                <div className="font-medium">{patientInfo.insuranceProvider}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Medical History Timeline</CardTitle>
              <CardDescription>Chronological record of patient's medical events</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Add Entry
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="timeline">
            <TabsList className="mb-6">
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="conditions">Conditions</TabsTrigger>
              <TabsTrigger value="procedures">Procedures</TabsTrigger>
              <TabsTrigger value="medications">Medications</TabsTrigger>
            </TabsList>
            
            <div className="space-y-6">
              {medicalHistory.map((entry, index) => (
                <div key={index} className="relative pl-8 pb-6">
                  {index !== medicalHistory.length - 1 && (
                    <div className="absolute h-full w-px bg-border left-3 top-2" />
                  )}
                  <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Clock className="h-3 w-3 text-primary-foreground" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        {new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {entry.event}
                      </Badge>
                    </div>
                    <h4 className="text-base font-medium">{entry.description}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>{entry.provider}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default PatientHistoryPage;
