
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface MedicalHistoryTabProps {
  patientId?: string;
}

const MedicalHistoryTab: React.FC<MedicalHistoryTabProps> = ({ patientId }) => {
  // In a real app, we would fetch the medical history based on patientId
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Diagnosis History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-lg">Stage III Colorectal Adenocarcinoma</h4>
                  <p className="text-sm text-muted-foreground">Primary diagnosis - Nov 12, 2024</p>
                </div>
                <Badge>Active</Badge>
              </div>
              <p className="text-sm mb-3">
                Sigmoid colon, 4.2cm lesion, moderately differentiated adenocarcinoma.
                Invasion through muscularis propria.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium block">TNM Staging:</span>
                  <span>T3 N1 M0</span>
                </div>
                <div>
                  <span className="font-medium block">Histology:</span>
                  <span>Adenocarcinoma</span>
                </div>
                <div>
                  <span className="font-medium block">Differentiation:</span>
                  <span>Moderately differentiated</span>
                </div>
                <div>
                  <span className="font-medium block">ICD-10:</span>
                  <span>C18.7</span>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-lg">Hypertension</h4>
                  <p className="text-sm text-muted-foreground">Secondary diagnosis - Jan 05, 2023</p>
                </div>
                <Badge variant="outline">Managed</Badge>
              </div>
              <p className="text-sm">
                Essential hypertension, well-controlled on current medication regimen.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Medical History</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-sm">Type 2 Diabetes</span>
                <span className="text-sm text-muted-foreground">Since 2018</span>
              </li>
              <li className="flex justify-between">
                <span className="text-sm">Cholecystectomy</span>
                <span className="text-sm text-muted-foreground">2017</span>
              </li>
              <li className="flex justify-between">
                <span className="text-sm">Appendectomy</span>
                <span className="text-sm text-muted-foreground">2005</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Family History</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-sm">Colorectal Cancer (Father)</span>
                <span className="text-sm text-muted-foreground">Age 58</span>
              </li>
              <li className="flex justify-between">
                <span className="text-sm">Hypertension (Mother)</span>
                <span className="text-sm text-muted-foreground">Age 62</span>
              </li>
              <li className="flex justify-between">
                <span className="text-sm">Type 2 Diabetes (Sibling)</span>
                <span className="text-sm text-muted-foreground">Age 45</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Allergies & Adverse Reactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Penicillin</Badge>
              <span className="text-sm">Rash, difficulty breathing</span>
              <span className="text-sm text-muted-foreground">Severity: High</span>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Sulfa Drugs</Badge>
              <span className="text-sm">Mild skin rash</span>
              <span className="text-sm text-muted-foreground">Severity: Moderate</span>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Contrast Media</Badge>
              <span className="text-sm">Nausea, flushing</span>
              <span className="text-sm text-muted-foreground">Severity: Moderate</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalHistoryTab;
