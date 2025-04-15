
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Stethoscope, ChevronLeft, Save, Plus, Pill, AlertTriangle, FileText } from 'lucide-react';

const ClinicalInformationPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('medical-history');
  const [medicalHistory, setMedicalHistory] = useState({
    diagnoses: [{ condition: '', diagnosisDate: '', notes: '' }],
    surgeries: [{ procedure: '', procedureDate: '', surgeon: '', facility: '', notes: '' }],
    allergies: [{ allergen: '', reaction: '', severity: '', notes: '' }],
    medications: [{ name: '', dosage: '', frequency: '', startDate: '', purpose: '' }]
  });
  
  const handleAddItem = (category: keyof typeof medicalHistory) => {
    const newItems = [...medicalHistory[category]];
    
    if (category === 'diagnoses') {
      newItems.push({ condition: '', diagnosisDate: '', notes: '' });
    } else if (category === 'surgeries') {
      newItems.push({ procedure: '', procedureDate: '', surgeon: '', facility: '', notes: '' });
    } else if (category === 'allergies') {
      newItems.push({ allergen: '', reaction: '', severity: '', notes: '' });
    } else if (category === 'medications') {
      newItems.push({ name: '', dosage: '', frequency: '', startDate: '', purpose: '' });
    }
    
    setMedicalHistory({
      ...medicalHistory,
      [category]: newItems
    });
  };
  
  const handleRemoveItem = (category: keyof typeof medicalHistory, index: number) => {
    const newItems = [...medicalHistory[category]];
    newItems.splice(index, 1);
    setMedicalHistory({
      ...medicalHistory,
      [category]: newItems
    });
  };
  
  const handleDiagnosisChange = (index: number, field: string, value: string) => {
    const newDiagnoses = [...medicalHistory.diagnoses];
    newDiagnoses[index] = { ...newDiagnoses[index], [field]: value };
    setMedicalHistory({
      ...medicalHistory,
      diagnoses: newDiagnoses
    });
  };
  
  const handleSurgeryChange = (index: number, field: string, value: string) => {
    const newSurgeries = [...medicalHistory.surgeries];
    newSurgeries[index] = { ...newSurgeries[index], [field]: value };
    setMedicalHistory({
      ...medicalHistory,
      surgeries: newSurgeries
    });
  };
  
  const handleAllergyChange = (index: number, field: string, value: string) => {
    const newAllergies = [...medicalHistory.allergies];
    newAllergies[index] = { ...newAllergies[index], [field]: value };
    setMedicalHistory({
      ...medicalHistory,
      allergies: newAllergies
    });
  };
  
  const handleMedicationChange = (index: number, field: string, value: string) => {
    const newMedications = [...medicalHistory.medications];
    newMedications[index] = { ...newMedications[index], [field]: value };
    setMedicalHistory({
      ...medicalHistory,
      medications: newMedications
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would save the data to a database
    toast({
      title: "Information Saved",
      description: "Patient clinical information has been updated.",
    });
    navigate('/patients/consent-form');
  };
  
  return (
    <MainLayout>
      <PageHeader 
        title="Clinical Information" 
        description="Record patient's medical history and clinical data"
        breadcrumbs={[
          { label: 'Patients', link: '/patients' },
          { label: 'John Smith', link: '/patients/123' },
          { label: 'Clinical Information' }
        ]}
      />
      
      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full md:w-auto grid grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="medical-history">Medical History</TabsTrigger>
            <TabsTrigger value="allergies">Allergies</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="vitals">Vitals & Labs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="medical-history" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Diagnoses</CardTitle>
                <CardDescription>Record patient's medical diagnoses and conditions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {medicalHistory.diagnoses.map((diagnosis, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-md">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Diagnosis {index + 1}</h4>
                      {medicalHistory.diagnoses.length > 1 && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleRemoveItem('diagnoses', index)}
                        >
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`condition-${index}`}>Condition</Label>
                        <Input 
                          id={`condition-${index}`} 
                          value={diagnosis.condition}
                          onChange={(e) => handleDiagnosisChange(index, 'condition', e.target.value)}
                          placeholder="e.g., Type 2 Diabetes"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`diagnosisDate-${index}`}>Date of Diagnosis</Label>
                        <Input 
                          id={`diagnosisDate-${index}`} 
                          type="date"
                          value={diagnosis.diagnosisDate}
                          onChange={(e) => handleDiagnosisChange(index, 'diagnosisDate', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`diagnosisNotes-${index}`}>Notes</Label>
                      <Textarea 
                        id={`diagnosisNotes-${index}`} 
                        value={diagnosis.notes}
                        onChange={(e) => handleDiagnosisChange(index, 'notes', e.target.value)}
                        placeholder="Additional details about the diagnosis"
                      />
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => handleAddItem('diagnoses')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Diagnosis
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Surgical History</CardTitle>
                <CardDescription>Record patient's past surgeries and procedures</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {medicalHistory.surgeries.map((surgery, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-md">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Procedure {index + 1}</h4>
                      {medicalHistory.surgeries.length > 1 && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleRemoveItem('surgeries', index)}
                        >
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`procedure-${index}`}>Procedure</Label>
                        <Input 
                          id={`procedure-${index}`} 
                          value={surgery.procedure}
                          onChange={(e) => handleSurgeryChange(index, 'procedure', e.target.value)}
                          placeholder="e.g., Appendectomy"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`procedureDate-${index}`}>Date of Procedure</Label>
                        <Input 
                          id={`procedureDate-${index}`} 
                          type="date"
                          value={surgery.procedureDate}
                          onChange={(e) => handleSurgeryChange(index, 'procedureDate', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`surgeon-${index}`}>Surgeon</Label>
                        <Input 
                          id={`surgeon-${index}`} 
                          value={surgery.surgeon}
                          onChange={(e) => handleSurgeryChange(index, 'surgeon', e.target.value)}
                          placeholder="Surgeon's name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`facility-${index}`}>Facility</Label>
                        <Input 
                          id={`facility-${index}`} 
                          value={surgery.facility}
                          onChange={(e) => handleSurgeryChange(index, 'facility', e.target.value)}
                          placeholder="Hospital or facility name"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`surgeryNotes-${index}`}>Notes</Label>
                      <Textarea 
                        id={`surgeryNotes-${index}`} 
                        value={surgery.notes}
                        onChange={(e) => handleSurgeryChange(index, 'notes', e.target.value)}
                        placeholder="Additional details about the procedure"
                      />
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => handleAddItem('surgeries')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Surgical Procedure
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="allergies" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Allergies and Reactions</CardTitle>
                <CardDescription>Record patient's allergies and adverse reactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {medicalHistory.allergies.map((allergy, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-md">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Allergy {index + 1}</h4>
                      {medicalHistory.allergies.length > 1 && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleRemoveItem('allergies', index)}
                        >
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`allergen-${index}`}>Allergen</Label>
                        <Input 
                          id={`allergen-${index}`} 
                          value={allergy.allergen}
                          onChange={(e) => handleAllergyChange(index, 'allergen', e.target.value)}
                          placeholder="e.g., Penicillin"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`reaction-${index}`}>Reaction</Label>
                        <Input 
                          id={`reaction-${index}`} 
                          value={allergy.reaction}
                          onChange={(e) => handleAllergyChange(index, 'reaction', e.target.value)}
                          placeholder="e.g., Hives, Difficulty breathing"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`severity-${index}`}>Severity</Label>
                      <Select 
                        value={allergy.severity} 
                        onValueChange={(value) => handleAllergyChange(index, 'severity', value)}
                      >
                        <SelectTrigger id={`severity-${index}`}>
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mild">Mild</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="severe">Severe</SelectItem>
                          <SelectItem value="life-threatening">Life-threatening</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`allergyNotes-${index}`}>Notes</Label>
                      <Textarea 
                        id={`allergyNotes-${index}`} 
                        value={allergy.notes}
                        onChange={(e) => handleAllergyChange(index, 'notes', e.target.value)}
                        placeholder="Additional details about the allergy"
                      />
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => handleAddItem('allergies')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Allergy
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="medications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Medications</CardTitle>
                <CardDescription>Record patient's current medications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {medicalHistory.medications.map((medication, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-md">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Medication {index + 1}</h4>
                      {medicalHistory.medications.length > 1 && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleRemoveItem('medications', index)}
                        >
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`medName-${index}`}>Medication Name</Label>
                        <Input 
                          id={`medName-${index}`} 
                          value={medication.name}
                          onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                          placeholder="e.g., Lisinopril"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`dosage-${index}`}>Dosage</Label>
                        <Input 
                          id={`dosage-${index}`} 
                          value={medication.dosage}
                          onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                          placeholder="e.g., 10mg"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`frequency-${index}`}>Frequency</Label>
                        <Input 
                          id={`frequency-${index}`} 
                          value={medication.frequency}
                          onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                          placeholder="e.g., Once daily"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                        <Input 
                          id={`startDate-${index}`} 
                          type="date"
                          value={medication.startDate}
                          onChange={(e) => handleMedicationChange(index, 'startDate', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`purpose-${index}`}>Purpose</Label>
                      <Input 
                        id={`purpose-${index}`} 
                        value={medication.purpose}
                        onChange={(e) => handleMedicationChange(index, 'purpose', e.target.value)}
                        placeholder="e.g., Hypertension management"
                      />
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => handleAddItem('medications')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Medication
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="vitals" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Vitals and Lab Results</CardTitle>
                <CardDescription>Record patient's vital signs and laboratory results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <Stethoscope className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Vitals Tracking</h3>
                  <p className="text-muted-foreground mb-6">
                    This feature will be implemented in the next update.
                  </p>
                  <Button variant="outline">View Implementation Plan</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between mt-6">
          <Button type="button" variant="outline" onClick={() => navigate('/patients/insurance-information')}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Insurance
          </Button>
          <div className="space-x-2">
            <Button type="button" variant="outline">Save as Draft</Button>
            <Button type="submit">Save and Continue</Button>
          </div>
        </div>
      </form>
    </MainLayout>
  );
};

export default ClinicalInformationPage;
