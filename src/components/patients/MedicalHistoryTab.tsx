
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Edit, AlertCircle, Heart, Lungs, Droplets, Shield, Brain, Dna } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MedicalHistoryTabProps {
  patientId: string;
}

const MedicalHistoryTab: React.FC<MedicalHistoryTabProps> = ({ patientId }) => {
  const { toast } = useToast();
  
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
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Medical Conditions</CardTitle>
              <CardDescription>Current and past diagnosed conditions</CardDescription>
            </div>
            <Button variant="outline" size="icon" onClick={() => handleAction('Add condition')}>
              <Plus className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">Colorectal Adenocarcinoma</h4>
                    <Badge className="cancer-colorectal">Primary</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Diagnosed: Jan 15, 2025</p>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b">
                <div>
                  <h4 className="font-medium">Type 2 Diabetes Mellitus</h4>
                  <p className="text-sm text-muted-foreground">Diagnosed: Mar 2018</p>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b">
                <div>
                  <h4 className="font-medium">Hypertension</h4>
                  <p className="text-sm text-muted-foreground">Diagnosed: Nov 2015</p>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-medium">Gallstones</h4>
                  <p className="text-sm text-muted-foreground">Diagnosed: Jul 2019</p>
                </div>
                <Badge variant="outline">Resolved</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Surgical History</CardTitle>
              <CardDescription>Previous surgical procedures</CardDescription>
            </div>
            <Button variant="outline" size="icon" onClick={() => handleAction('Add surgery')}>
              <Plus className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b">
                <div>
                  <h4 className="font-medium">Right Hemicolectomy</h4>
                  <p className="text-sm text-muted-foreground">Feb 10, 2025 - Memorial Hospital</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleAction('View surgical notes')}>
                  View Notes
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b">
                <div>
                  <h4 className="font-medium">Cholecystectomy</h4>
                  <p className="text-sm text-muted-foreground">Aug 5, 2019 - St. Mary's Hospital</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleAction('View surgical notes')}>
                  View Notes
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-medium">Appendectomy</h4>
                  <p className="text-sm text-muted-foreground">May 22, 2002 - County General Hospital</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleAction('View surgical notes')}>
                  View Notes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Current Medications</CardTitle>
              <CardDescription>Prescribed and OTC medications</CardDescription>
            </div>
            <Button variant="outline" size="icon" onClick={() => handleAction('Add medication')}>
              <Plus className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">FOLFOX Chemotherapy Protocol</h4>
                    <Badge className="bg-blue-100 text-blue-800">Oncology</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">5-FU, Leucovorin, Oxaliplatin - Every 2 weeks</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Cycle 3/6</Badge>
                  <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b">
                <div>
                  <h4 className="font-medium">Metformin</h4>
                  <p className="text-sm text-muted-foreground">1000mg - Twice daily with meals</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Active</Badge>
                  <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b">
                <div>
                  <h4 className="font-medium">Lisinopril</h4>
                  <p className="text-sm text-muted-foreground">10mg - Once daily</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Active</Badge>
                  <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">Ondansetron (Zofran)</h4>
                    <Badge className="bg-purple-100 text-purple-800">Antiemetic</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">8mg - As needed for nausea</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Active</Badge>
                  <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center gap-2 text-sm text-muted-foreground w-full">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <p>Potential interaction between Oxaliplatin and Lisinopril. Monitor blood pressure.</p>
            </div>
          </CardFooter>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Allergies & Sensitivities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="destructive">Penicillin</Badge>
                <span className="text-sm text-muted-foreground">Severe rash</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="destructive">Sulfa Drugs</Badge>
                <span className="text-sm text-muted-foreground">Hives</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Latex</Badge>
                <span className="text-sm text-muted-foreground">Mild sensitivity</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" onClick={() => handleAction('Add allergy')}>
              <Plus className="h-4 w-4 mr-2" /> Add Allergy
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Family Cancer History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="font-medium">Father</p>
                <div className="flex items-center gap-2">
                  <Badge className="cancer-colorectal">Colorectal Cancer</Badge>
                  <span className="text-sm text-muted-foreground">Age 68</span>
                </div>
              </div>
              <div>
                <p className="font-medium">Paternal Grandmother</p>
                <div className="flex items-center gap-2">
                  <Badge className="cancer-breast">Breast Cancer</Badge>
                  <span className="text-sm text-muted-foreground">Age 71</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" onClick={() => handleAction('Update family history')}>
              <Plus className="h-4 w-4 mr-2" /> Update Family History
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Risk Factors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Heart className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <p className="font-medium">Cardiovascular</p>
                  <p className="text-sm text-muted-foreground">Hypertension, Hyperlipidemia</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Droplets className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium">Metabolic</p>
                  <p className="text-sm text-muted-foreground">Type 2 Diabetes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Dna className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <p className="font-medium">Genetic</p>
                  <p className="text-sm text-muted-foreground">Family history of colorectal cancer</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MedicalHistoryTab;
