
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, Save, FileText, Check } from 'lucide-react';

const ConsentFormPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    patientName: "John Smith",
    participantId: "PT-12345",
    studyTitle: "BEACON-CRC Phase II Trial",
    readAndUnderstood: false,
    willingToParticipate: false,
    allowDataUse: false,
    allowFutureContact: false,
    signature: "",
    relationshipToPatient: "self",
    date: new Date().toISOString().split('T')[0]
  });
  
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.signature) {
      toast({
        title: "Signature Required",
        description: "Please sign the form to continue.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.readAndUnderstood || !formData.willingToParticipate || !formData.allowDataUse) {
      toast({
        title: "Required Consents",
        description: "You must agree to the required items to participate in the study.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Consent Submitted",
      description: "Your consent has been successfully recorded.",
    });
    navigate('/patients');
  };
  
  return (
    <MainLayout>
      <PageHeader 
        title="Informed Consent" 
        description="Please review the study details and provide your consent"
        breadcrumbs={[
          { label: 'Patients', link: '/patients' },
          { label: 'John Smith', link: '/patients/123' },
          { label: 'Informed Consent' }
        ]}
      />
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Study Information</CardTitle>
              <CardDescription>Details about the research study you are consenting to</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studyTitle">Study Title</Label>
                  <Input 
                    id="studyTitle" 
                    value={formData.studyTitle} 
                    readOnly 
                    className="bg-muted" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="participantId">Participant ID</Label>
                  <Input 
                    id="participantId" 
                    value={formData.participantId} 
                    readOnly 
                    className="bg-muted" 
                  />
                </div>
              </div>
              
              <div className="p-4 bg-muted rounded-md space-y-4">
                <h3 className="font-semibold">Study Overview</h3>
                <p className="text-sm">
                  The BEACON-CRC Phase II Trial is a research study investigating the efficacy and safety of FOLFOX + Bevacizumab in patients with Stage III colorectal cancer. The study will last approximately 18 months and involve 12 cycles of treatment.
                </p>
                <h3 className="font-semibold">Procedures</h3>
                <p className="text-sm">
                  As a participant, you will receive chemotherapy treatment every two weeks for a total of 12 cycles. You will attend regular clinic visits for treatment, assessment, and blood tests. You will also complete quality of life questionnaires periodically.
                </p>
                <h3 className="font-semibold">Risks and Benefits</h3>
                <p className="text-sm">
                  Potential risks include side effects from chemotherapy such as nausea, fatigue, neuropathy, and increased risk of infection. Benefits may include potential improvement in cancer treatment outcomes and contribution to medical knowledge.
                </p>
                <h3 className="font-semibold">Confidentiality</h3>
                <p className="text-sm">
                  Your personal information will be kept confidential and secure. Your data will be coded with a unique identifier and stored securely according to HIPAA regulations. Only authorized study personnel will have access to your identifiable information.
                </p>
                <h3 className="font-semibold">Voluntary Participation</h3>
                <p className="text-sm">
                  Your participation in this study is entirely voluntary. You may withdraw at any time without penalty or loss of benefits to which you are otherwise entitled. Your decision will not affect the standard of care you receive.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Consent Statements</CardTitle>
              <CardDescription>Please read and acknowledge each statement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-2 p-3 border rounded-md">
                <Checkbox 
                  id="readAndUnderstood" 
                  checked={formData.readAndUnderstood}
                  onCheckedChange={(checked) => handleChange('readAndUnderstood', checked)}
                  className="mt-1"
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="readAndUnderstood"
                    className="font-medium"
                  >
                    I have read and understood the information provided about this research study.
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    I have had the opportunity to ask questions and have received satisfactory answers.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2 p-3 border rounded-md">
                <Checkbox 
                  id="willingToParticipate" 
                  checked={formData.willingToParticipate}
                  onCheckedChange={(checked) => handleChange('willingToParticipate', checked)}
                  className="mt-1"
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="willingToParticipate"
                    className="font-medium"
                  >
                    I willingly agree to participate in this research study.
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    I understand that I am free to withdraw at any time without giving a reason and without my medical care or legal rights being affected.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2 p-3 border rounded-md">
                <Checkbox 
                  id="allowDataUse" 
                  checked={formData.allowDataUse}
                  onCheckedChange={(checked) => handleChange('allowDataUse', checked)}
                  className="mt-1"
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="allowDataUse"
                    className="font-medium"
                  >
                    I agree to the use of my data for the purposes of this research study.
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    I understand that my information will be kept confidential and secure according to applicable privacy laws and regulations.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2 p-3 border rounded-md">
                <Checkbox 
                  id="allowFutureContact" 
                  checked={formData.allowFutureContact}
                  onCheckedChange={(checked) => handleChange('allowFutureContact', checked)}
                  className="mt-1"
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="allowFutureContact"
                    className="font-medium"
                  >
                    I agree to be contacted in the future about this study or related research.
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    This is optional and does not affect your participation in the current study.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Signature</CardTitle>
              <CardDescription>Please provide your signature to confirm consent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Participant Name</Label>
                <Input 
                  id="patientName" 
                  value={formData.patientName} 
                  onChange={(e) => handleChange('patientName', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signature">Signature</Label>
                <Input 
                  id="signature" 
                  placeholder="Type your full name to sign" 
                  value={formData.signature}
                  onChange={(e) => handleChange('signature', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="relationshipToPatient">Relationship to Patient</Label>
                <Select 
                  value={formData.relationshipToPatient} 
                  onValueChange={(value) => handleChange('relationshipToPatient', value)}
                >
                  <SelectTrigger id="relationshipToPatient">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self">Self</SelectItem>
                    <SelectItem value="parent-guardian">Parent or Legal Guardian</SelectItem>
                    <SelectItem value="caregiver">Authorized Caregiver</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date" 
                  type="date" 
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-between mt-6">
          <Button type="button" variant="outline" onClick={() => navigate('/patients/clinical-information')}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="space-x-2">
            <Button type="button" variant="outline">Save as Draft</Button>
            <Button type="submit">Submit Consent</Button>
          </div>
        </div>
      </form>
    </MainLayout>
  );
};

export default ConsentFormPage;
