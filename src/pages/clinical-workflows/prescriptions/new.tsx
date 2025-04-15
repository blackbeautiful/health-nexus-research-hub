
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Pill, ChevronLeft, Search, AlertTriangle, Save, FilePlus } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const NewPrescriptionPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('basic-info');
  const [prescriptionType, setPrescriptionType] = useState('medication');
  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    medication: '',
    dosage: '',
    route: 'oral',
    frequency: '',
    duration: '',
    quantity: '',
    refills: '0',
    instructions: '',
    reason: '',
    controlled: false,
    daw: false,
    prn: false
  });
  
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.patientId || !formData.medication || !formData.dosage || !formData.frequency) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, we would save the prescription data to a database
    toast({
      title: "Prescription Created",
      description: "The prescription has been successfully created.",
    });
    navigate('/clinical-workflows/prescriptions');
  };
  
  const mockPatients = [
    { id: 'PT-001', name: 'John Smith' },
    { id: 'PT-002', name: 'Mary Johnson' },
    { id: 'PT-003', name: 'Robert Brown' },
    { id: 'PT-004', name: 'Linda Davis' }
  ];
  
  const mockMedications = [
    { name: 'Lisinopril', dosages: ['5mg', '10mg', '20mg'], controlled: false },
    { name: 'Metformin', dosages: ['500mg', '850mg', '1000mg'], controlled: false },
    { name: 'Atorvastatin', dosages: ['10mg', '20mg', '40mg'], controlled: false },
    { name: 'Oxycodone', dosages: ['5mg', '10mg', '15mg'], controlled: true },
    { name: 'Ondansetron', dosages: ['4mg', '8mg'], controlled: false }
  ];
  
  return (
    <MainLayout>
      <PageHeader 
        title="New Prescription" 
        description="Create a new medication prescription"
        breadcrumbs={[
          { label: 'Clinical Workflows', link: '/clinical-workflows' },
          { label: 'Prescriptions', link: '/clinical-workflows/prescriptions' },
          { label: 'New Prescription' }
        ]}
      />
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList>
                <TabsTrigger value="basic-info">Basic Information</TabsTrigger>
                <TabsTrigger value="details">Prescription Details</TabsTrigger>
                <TabsTrigger value="notes">Notes & Instructions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic-info" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Search className="h-5 w-5 mr-2 text-muted-foreground" />
                      Patient Information
                    </CardTitle>
                    <CardDescription>Select the patient for this prescription</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="patientId">Patient</Label>
                      <Select
                        value={formData.patientId}
                        onValueChange={(value) => {
                          const patient = mockPatients.find(p => p.id === value);
                          handleInputChange('patientId', value);
                          handleInputChange('patientName', patient?.name || '');
                        }}
                      >
                        <SelectTrigger id="patientId">
                          <SelectValue placeholder="Select patient" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockPatients.map((patient) => (
                            <SelectItem key={patient.id} value={patient.id}>
                              {patient.name} ({patient.id})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {formData.patientId && (
                      <div className="p-4 bg-muted rounded-md">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">Patient ID</p>
                            <p className="text-sm">{formData.patientId}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Patient Name</p>
                            <p className="text-sm">{formData.patientName}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <Separator className="my-2" />
                    
                    <div className="space-y-2">
                      <Label>Prescription Type</Label>
                      <RadioGroup
                        value={prescriptionType}
                        onValueChange={setPrescriptionType}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="medication" id="medication" />
                          <Label htmlFor="medication">Medication</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="supply" id="supply" />
                          <Label htmlFor="supply">Medical Supply</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="compound" id="compound" />
                          <Label htmlFor="compound">Compound Medication</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => navigate('/clinical-workflows/prescriptions')}>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button type="button" onClick={() => setActiveTab('details')}>
                    Continue
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Pill className="h-5 w-5 mr-2 text-muted-foreground" />
                      Medication Details
                    </CardTitle>
                    <CardDescription>Enter medication and dosage information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="medication">Medication Name</Label>
                        <Select
                          value={formData.medication}
                          onValueChange={(value) => {
                            const medication = mockMedications.find(m => m.name === value);
                            handleInputChange('medication', value);
                            handleInputChange('controlled', medication?.controlled || false);
                          }}
                        >
                          <SelectTrigger id="medication">
                            <SelectValue placeholder="Select medication" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockMedications.map((medication) => (
                              <SelectItem key={medication.name} value={medication.name}>
                                {medication.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dosage">Dosage</Label>
                        <Select
                          value={formData.dosage}
                          onValueChange={(value) => handleInputChange('dosage', value)}
                          disabled={!formData.medication}
                        >
                          <SelectTrigger id="dosage">
                            <SelectValue placeholder="Select dosage" />
                          </SelectTrigger>
                          <SelectContent>
                            {formData.medication && 
                              mockMedications
                                .find(m => m.name === formData.medication)
                                ?.dosages.map((dosage) => (
                                  <SelectItem key={dosage} value={dosage}>
                                    {dosage}
                                  </SelectItem>
                                ))
                            }
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="route">Route</Label>
                        <Select
                          value={formData.route}
                          onValueChange={(value) => handleInputChange('route', value)}
                        >
                          <SelectTrigger id="route">
                            <SelectValue placeholder="Select route" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="oral">Oral</SelectItem>
                            <SelectItem value="topical">Topical</SelectItem>
                            <SelectItem value="subcutaneous">Subcutaneous</SelectItem>
                            <SelectItem value="intramuscular">Intramuscular</SelectItem>
                            <SelectItem value="intravenous">Intravenous</SelectItem>
                            <SelectItem value="inhaled">Inhaled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="frequency">Frequency</Label>
                        <Select
                          value={formData.frequency}
                          onValueChange={(value) => handleInputChange('frequency', value)}
                        >
                          <SelectTrigger id="frequency">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="once-daily">Once Daily</SelectItem>
                            <SelectItem value="twice-daily">Twice Daily</SelectItem>
                            <SelectItem value="three-times-daily">Three Times Daily</SelectItem>
                            <SelectItem value="four-times-daily">Four Times Daily</SelectItem>
                            <SelectItem value="as-needed">As Needed (PRN)</SelectItem>
                            <SelectItem value="every-4-hours">Every 4 Hours</SelectItem>
                            <SelectItem value="every-6-hours">Every 6 Hours</SelectItem>
                            <SelectItem value="every-8-hours">Every 8 Hours</SelectItem>
                            <SelectItem value="every-12-hours">Every 12 Hours</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Input
                          id="duration"
                          value={formData.duration}
                          onChange={(e) => handleInputChange('duration', e.target.value)}
                          placeholder="e.g., 14 days"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                          id="quantity"
                          value={formData.quantity}
                          onChange={(e) => handleInputChange('quantity', e.target.value)}
                          placeholder="e.g., 30 tablets"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="refills">Number of Refills</Label>
                        <Input
                          id="refills"
                          type="number"
                          min="0"
                          value={formData.refills}
                          onChange={(e) => handleInputChange('refills', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="daw"
                            checked={formData.daw}
                            onCheckedChange={(checked) => handleInputChange('daw', checked)}
                          />
                          <Label htmlFor="daw">Dispense as Written (DAW)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="prn"
                            checked={formData.prn}
                            onCheckedChange={(checked) => handleInputChange('prn', checked)}
                          />
                          <Label htmlFor="prn">As Needed (PRN)</Label>
                        </div>
                      </div>
                      
                      {formData.controlled && (
                        <Alert className="bg-amber-50 border-amber-200">
                          <AlertTriangle className="h-4 w-4 text-amber-600" />
                          <AlertTitle className="text-amber-800">Controlled Substance</AlertTitle>
                          <AlertDescription className="text-amber-700">
                            This medication is classified as a controlled substance and requires additional documentation.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setActiveTab('basic-info')}>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button type="button" onClick={() => setActiveTab('notes')}>
                    Continue
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="notes" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Instructions and Notes</CardTitle>
                    <CardDescription>Provide additional instructions for this prescription</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="instructions">Patient Instructions</Label>
                      <Textarea
                        id="instructions"
                        value={formData.instructions}
                        onChange={(e) => handleInputChange('instructions', e.target.value)}
                        placeholder="Instructions for the patient (e.g., Take with food)"
                        rows={3}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reason">Reason for Prescription</Label>
                      <Textarea
                        id="reason"
                        value={formData.reason}
                        onChange={(e) => handleInputChange('reason', e.target.value)}
                        placeholder="Clinical reason for this prescription"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setActiveTab('details')}>
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                    <div className="space-x-2">
                      <Button type="button" variant="outline">
                        <Save className="h-4 w-4 mr-2" />
                        Save as Draft
                      </Button>
                      <Button type="submit">
                        <FilePlus className="h-4 w-4 mr-2" />
                        Complete Prescription
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Prescription Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {formData.patientId ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Patient</p>
                      <p className="text-sm">{formData.patientName} ({formData.patientId})</p>
                    </div>
                    
                    {formData.medication && (
                      <>
                        <Separator />
                        <div>
                          <p className="text-sm font-medium">Medication</p>
                          <p className="text-sm">{formData.medication}</p>
                        </div>
                        
                        {formData.dosage && (
                          <div>
                            <p className="text-sm font-medium">Dosage</p>
                            <p className="text-sm">{formData.dosage}</p>
                          </div>
                        )}
                        
                        {formData.route && (
                          <div>
                            <p className="text-sm font-medium">Route</p>
                            <p className="text-sm">{formData.route}</p>
                          </div>
                        )}
                        
                        {formData.frequency && (
                          <div>
                            <p className="text-sm font-medium">Frequency</p>
                            <p className="text-sm">{formData.frequency.replace(/-/g, ' ')}</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">
                      Select a patient and medication to see prescription summary
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Patient Medication History</CardTitle>
              </CardHeader>
              <CardContent>
                {formData.patientId ? (
                  <div className="space-y-2">
                    {formData.patientId === 'PT-001' && (
                      <>
                        <div className="p-3 border rounded-md">
                          <p className="text-sm font-medium">Lisinopril 10mg</p>
                          <p className="text-xs text-muted-foreground">Once daily</p>
                          <p className="text-xs text-muted-foreground mt-1">Started: Apr 10, 2025</p>
                        </div>
                        <div className="p-3 border rounded-md">
                          <p className="text-sm font-medium">Atorvastatin 20mg</p>
                          <p className="text-xs text-muted-foreground">Once daily at bedtime</p>
                          <p className="text-xs text-muted-foreground mt-1">Started: Apr 09, 2025</p>
                        </div>
                      </>
                    )}
                    {formData.patientId === 'PT-002' && (
                      <div className="p-3 border rounded-md">
                        <p className="text-sm font-medium">Metformin 500mg</p>
                        <p className="text-xs text-muted-foreground">Twice daily</p>
                        <p className="text-xs text-muted-foreground mt-1">Started: Apr 08, 2025</p>
                      </div>
                    )}
                    {formData.patientId === 'PT-003' && (
                      <div className="p-3 border rounded-md">
                        <p className="text-sm font-medium">Ondansetron 8mg</p>
                        <p className="text-xs text-muted-foreground">As needed</p>
                        <p className="text-xs text-muted-foreground mt-1">Started: Apr 05, 2025</p>
                      </div>
                    )}
                    {formData.patientId === 'PT-004' && (
                      <div className="p-3 border rounded-md">
                        <p className="text-sm font-medium">Oxycodone 5mg</p>
                        <p className="text-xs text-muted-foreground">Every 4-6 hours as needed</p>
                        <p className="text-xs text-muted-foreground mt-1">Started: Apr 01, 2025</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">
                      Select a patient to see medication history
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </MainLayout>
  );
};

export default NewPrescriptionPage;
