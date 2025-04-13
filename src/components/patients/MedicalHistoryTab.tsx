
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Heart, Shield, Activity, Pill, TestTube } from 'lucide-react';

const MedicalHistoryTab = () => {
  return (
    <Tabs defaultValue="conditions">
      <TabsList className="grid grid-cols-5 mb-4">
        <TabsTrigger value="conditions">Conditions</TabsTrigger>
        <TabsTrigger value="medications">Medications</TabsTrigger>
        <TabsTrigger value="allergies">Allergies</TabsTrigger>
        <TabsTrigger value="procedures">Procedures</TabsTrigger>
        <TabsTrigger value="family">Family History</TabsTrigger>
      </TabsList>

      <TabsContent value="conditions">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-health-primary" />
              Medical Conditions
            </CardTitle>
            <CardDescription>Patient's diagnosed conditions and status</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              {conditions.map((condition, idx) => (
                <React.Fragment key={idx}>
                  <div className="mb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{condition.name}</h4>
                        <p className="text-sm text-gray-500">Diagnosed: {condition.diagnosedDate}</p>
                      </div>
                      <Badge variant={condition.status === 'Active' ? 'default' : 'outline'}>
                        {condition.status}
                      </Badge>
                    </div>
                    <p className="text-sm mt-2">{condition.notes}</p>
                  </div>
                  {idx < conditions.length - 1 && <Separator className="my-2" />}
                </React.Fragment>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="medications">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-5 w-5 text-health-primary" />
              Medications
            </CardTitle>
            <CardDescription>Current and past medications</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              {medications.map((medication, idx) => (
                <React.Fragment key={idx}>
                  <div className="mb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{medication.name}</h4>
                        <p className="text-sm">
                          {medication.dosage} - {medication.frequency}
                        </p>
                      </div>
                      <Badge variant={medication.status === 'Current' ? 'default' : 'outline'}>
                        {medication.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Prescribed: {medication.prescribed} | Ends: {medication.ends}
                    </p>
                  </div>
                  {idx < medications.length - 1 && <Separator className="my-2" />}
                </React.Fragment>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="allergies">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-health-primary" />
              Allergies
            </CardTitle>
            <CardDescription>Known allergies and reactions</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              {allergies.map((allergy, idx) => (
                <React.Fragment key={idx}>
                  <div className="mb-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{allergy.allergen}</h4>
                      <Badge variant={allergy.severity === 'Severe' ? 'destructive' : allergy.severity === 'Moderate' ? 'default' : 'outline'}>
                        {allergy.severity}
                      </Badge>
                    </div>
                    <p className="text-sm mt-2">Reaction: {allergy.reaction}</p>
                  </div>
                  {idx < allergies.length - 1 && <Separator className="my-2" />}
                </React.Fragment>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="procedures">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-health-primary" />
              Procedures
            </CardTitle>
            <CardDescription>Surgical and diagnostic procedures</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              {procedures.map((procedure, idx) => (
                <React.Fragment key={idx}>
                  <div className="mb-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{procedure.name}</h4>
                      <span className="text-sm text-gray-500">{procedure.date}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Provider: {procedure.provider}</p>
                    <p className="text-sm mt-2">{procedure.notes}</p>
                  </div>
                  {idx < procedures.length - 1 && <Separator className="my-2" />}
                </React.Fragment>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="family">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-5 w-5 text-health-primary" />
              Family Cancer History
            </CardTitle>
            <CardDescription>Cancer history among first-degree relatives</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              {familyHistory.map((family, idx) => (
                <React.Fragment key={idx}>
                  <div className="mb-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{family.relation}</h4>
                      <Badge>{family.status}</Badge>
                    </div>
                    <p className="text-sm mt-1">
                      Cancer Type: <span className="font-medium">{family.cancerType}</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Age at Diagnosis: {family.ageAtDiagnosis}
                    </p>
                    {family.geneticTesting && (
                      <p className="text-sm mt-2">
                        Genetic Testing: <Badge variant="outline">{family.geneticTesting}</Badge>
                      </p>
                    )}
                  </div>
                  {idx < familyHistory.length - 1 && <Separator className="my-2" />}
                </React.Fragment>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

const conditions = [
  {
    name: 'Breast Cancer (invasive ductal carcinoma)',
    diagnosedDate: 'Feb 10, 2025',
    status: 'Active',
    notes: 'Right breast, 2.3cm tumor, ER+/PR+, HER2-',
  },
  {
    name: 'Hypertension',
    diagnosedDate: 'Aug 15, 2022',
    status: 'Active',
    notes: 'Well-controlled with medication',
  },
  {
    name: 'Type 2 Diabetes',
    diagnosedDate: 'Sep 3, 2023',
    status: 'Active',
    notes: 'Currently managed with oral medication and diet',
  },
  {
    name: 'Osteoarthritis',
    diagnosedDate: 'Mar 22, 2021',
    status: 'Chronic',
    notes: 'Affecting both knees, worse in right knee',
  },
];

const medications = [
  {
    name: 'Letrozole',
    dosage: '2.5mg',
    frequency: 'Once daily',
    prescribed: 'Feb 28, 2025',
    ends: 'N/A (long-term)',
    status: 'Current',
  },
  {
    name: 'Metoprolol',
    dosage: '50mg',
    frequency: 'Twice daily',
    prescribed: 'Aug 20, 2022',
    ends: 'N/A (long-term)',
    status: 'Current',
  },
  {
    name: 'Metformin',
    dosage: '1000mg',
    frequency: 'Twice daily',
    prescribed: 'Sep 10, 2023',
    ends: 'N/A (long-term)',
    status: 'Current',
  },
  {
    name: 'Doxorubicin',
    dosage: '60mg/m²',
    frequency: 'Once every 3 weeks',
    prescribed: 'Mar 1, 2025',
    ends: 'May 24, 2025',
    status: 'Current',
  },
  {
    name: 'Cyclophosphamide',
    dosage: '600mg/m²',
    frequency: 'Once every 3 weeks',
    prescribed: 'Mar 1, 2025',
    ends: 'May 24, 2025',
    status: 'Current',
  },
];

const allergies = [
  {
    allergen: 'Penicillin',
    severity: 'Moderate',
    reaction: 'Hives and itching',
  },
  {
    allergen: 'Sulfa Drugs',
    severity: 'Severe',
    reaction: 'Anaphylaxis, difficulty breathing',
  },
  {
    allergen: 'Latex',
    severity: 'Mild',
    reaction: 'Contact dermatitis',
  },
];

const procedures = [
  {
    name: 'Core Needle Biopsy',
    date: 'Feb 5, 2025',
    provider: 'Dr. Rebecca Martinez',
    notes: 'Right breast, confirmed invasive ductal carcinoma',
  },
  {
    name: 'Sentinel Lymph Node Biopsy',
    date: 'Feb 15, 2025',
    provider: 'Dr. James Wilson',
    notes: '2 out of 3 nodes positive for metastatic disease',
  },
  {
    name: 'Port-a-cath Placement',
    date: 'Feb 28, 2025',
    provider: 'Dr. Sarah Jackson',
    notes: 'Placed for chemotherapy administration, no complications',
  },
  {
    name: 'ECHO Cardiogram',
    date: 'Feb 25, 2025',
    provider: 'Dr. Michael Brown',
    notes: 'Baseline prior to chemotherapy, EF 60%, normal function',
  },
];

const familyHistory = [
  {
    relation: 'Mother',
    status: 'Deceased',
    cancerType: 'Breast Cancer',
    ageAtDiagnosis: 48,
    geneticTesting: 'BRCA1 Positive',
  },
  {
    relation: 'Maternal Aunt',
    status: 'Deceased',
    cancerType: 'Ovarian Cancer',
    ageAtDiagnosis: 52,
    geneticTesting: null,
  },
  {
    relation: 'Sister',
    status: 'Living',
    cancerType: 'Breast Cancer',
    ageAtDiagnosis: 51,
    geneticTesting: 'BRCA1 Positive',
  },
  {
    relation: 'Father',
    status: 'Deceased',
    cancerType: 'Prostate Cancer',
    ageAtDiagnosis: 67,
    geneticTesting: null,
  },
];

export default MedicalHistoryTab;
