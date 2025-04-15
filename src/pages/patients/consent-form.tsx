
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Clipboard, Download, FileSignature, ChevronLeft, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

const ConsentFormPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('research-consent');
  const [consents, setConsents] = useState({
    research: false,
    hipaa: false,
    genetic: false,
    biospecimen: false,
    photography: false
  });
  const [signature, setSignature] = useState({
    name: '',
    date: new Date().toISOString().split('T')[0],
    relationship: 'self'
  });
  
  const handleConsentChange = (consent: keyof typeof consents, checked: boolean) => {
    setConsents({
      ...consents,
      [consent]: checked
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check required consents
    if (!consents.research || !consents.hipaa) {
      toast({
        title: "Missing Required Consents",
        description: "Research participation and HIPAA authorization consents are required.",
        variant: "destructive"
      });
      return;
    }
    
    if (!signature.name) {
      toast({
        title: "Signature Required",
        description: "Please provide your signature to complete the form.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, we would save the consent data
    toast({
      title: "Consent Form Submitted",
      description: "Thank you for completing the consent process.",
    });
    navigate('/patients/123');
  };
  
  return (
    <MainLayout>
      <PageHeader 
        title="Consent Forms" 
        description="Review and sign required consent documents"
        breadcrumbs={[
          { label: 'Patients', link: '/patients' },
          { label: 'John Smith', link: '/patients/123' },
          { label: 'Consent Forms' }
        ]}
      />
      
      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="research-consent">Research Participation</TabsTrigger>
            <TabsTrigger value="hipaa">HIPAA Authorization</TabsTrigger>
            <TabsTrigger value="optional-consents">Optional Consents</TabsTrigger>
            <TabsTrigger value="signature">Signature</TabsTrigger>
          </TabsList>
          
          <TabsContent value="research-consent" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clipboard className="h-5 w-5 mr-2 text-primary" />
                  Research Participation Consent
                </CardTitle>
                <CardDescription>
                  Review the research consent information below
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ScrollArea className="border rounded-md p-4 h-[400px]">
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold">BEACON-CRC Phase II Trial Consent</h3>
                    
                    <p className="font-medium">1. Introduction</p>
                    <p>You are being asked to participate in a research study. This document provides information about the study to help you make an informed decision about whether to participate. Please read this consent form carefully and ask any questions you may have before agreeing to be in the study.</p>
                    
                    <p className="font-medium">2. Purpose of the Study</p>
                    <p>The purpose of this study is to evaluate the efficacy and safety of FOLFOX + Bevacizumab in patients with Stage III Colorectal Cancer. This study aims to determine if this combination therapy improves outcomes compared to standard treatment approaches.</p>
                    
                    <p className="font-medium">3. Study Procedures</p>
                    <p>If you agree to participate in this study, you will be randomly assigned to receive either the study treatment or standard of care. The study will involve:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Regular clinic visits every 2 weeks for treatment administration</li>
                      <li>Blood tests before each treatment</li>
                      <li>CT scans every 8 weeks to assess response</li>
                      <li>Quality of life questionnaires</li>
                      <li>The study will last approximately 24 months</li>
                    </ul>
                    
                    <p className="font-medium">4. Risks and Discomforts</p>
                    <p>Possible side effects from the study treatment include:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Nausea, vomiting, and diarrhea</li>
                      <li>Fatigue</li>
                      <li>Decreased blood counts, which may increase risk of infection</li>
                      <li>Numbness or tingling in hands and feet (neuropathy)</li>
                      <li>Rarely, serious allergic reactions</li>
                    </ul>
                    <p>Your study doctor will monitor you closely for side effects and can provide medications to manage these symptoms.</p>
                    
                    <p className="font-medium">5. Benefits</p>
                    <p>You may or may not benefit directly from participating in this study. The information learned from this research may help improve treatment for future patients with colorectal cancer.</p>
                    
                    <p className="font-medium">6. Alternatives to Participation</p>
                    <p>If you choose not to participate in this study, you will receive standard care for your condition as recommended by your oncologist.</p>
                    
                    <p className="font-medium">7. Costs and Compensation</p>
                    <p>The study medication will be provided at no cost to you. Routine care procedures will be billed to your insurance. You will not be paid for participating in this study.</p>
                    
                    <p className="font-medium">8. Confidentiality</p>
                    <p>Your study records will be kept confidential to the extent permitted by law. Your personal information will be stored securely and identified by a code number rather than your name.</p>
                    
                    <p className="font-medium">9. Voluntary Participation and Withdrawal</p>
                    <p>Participation in this study is completely voluntary. You are free to decline participation or to withdraw from the study at any time without any penalty or loss of benefits to which you are otherwise entitled.</p>
                    
                    <p className="font-medium">10. Contact Information</p>
                    <p>For questions about the study, please contact the study coordinator at (555) 123-4567. For concerns about your rights as a research participant, please contact the Research Ethics Board at (555) 987-6543.</p>
                  </div>
                </ScrollArea>
                
                <div className="flex items-start space-x-3 pt-4">
                  <Checkbox 
                    id="research-consent-checkbox" 
                    checked={consents.research}
                    onCheckedChange={(checked) => handleConsentChange('research', checked === true)}
                    required
                  />
                  <div className="space-y-1">
                    <Label 
                      htmlFor="research-consent-checkbox" 
                      className="font-medium"
                    >
                      I have read and understand the research consent information
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      I agree to participate in this research study as described above.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Consent Form
                </Button>
                <Button type="button" onClick={() => setActiveTab('hipaa')}>Continue to HIPAA</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="hipaa" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileSignature className="h-5 w-5 mr-2 text-primary" />
                  HIPAA Authorization
                </CardTitle>
                <CardDescription>
                  Authorization to use and disclose health information for research
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ScrollArea className="border rounded-md p-4 h-[400px]">
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold">AUTHORIZATION TO USE AND DISCLOSE HEALTH INFORMATION FOR RESEARCH</h3>
                    
                    <p className="font-medium">1. What information may be used or disclosed?</p>
                    <p>By signing this form, you authorize the use and disclosure of your medical and research records for the purpose of this research study. This includes:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Your medical records related to your cancer diagnosis and treatment</li>
                      <li>Laboratory test results obtained during this study</li>
                      <li>Imaging results (CT scans, MRIs, etc.) obtained during this study</li>
                      <li>Information about medications you are taking</li>
                      <li>Your responses to study questionnaires</li>
                    </ul>
                    
                    <p className="font-medium">2. Who may use and disclose the information?</p>
                    <p>The following individuals and organizations may use, disclose, and receive your health information:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>The research team and study staff</li>
                      <li>Healthcare providers who provide services to you as part of this research</li>
                      <li>The sponsor of this research study and its representatives</li>
                      <li>The Institutional Review Board that approved this research</li>
                      <li>Federal and state agencies that oversee or review research (such as the FDA)</li>
                    </ul>
                    
                    <p className="font-medium">3. How will my information be used?</p>
                    <p>Your health information will be used to conduct this research study, to monitor your health status, and to determine research results. Your information may also be used to prepare research publications or presentations, but your identity will not be revealed.</p>
                    
                    <p className="font-medium">4. Will my information be protected?</p>
                    <p>Efforts will be made to protect your health information to the extent permitted by law. However, absolute confidentiality cannot be guaranteed. Information disclosed pursuant to this authorization may be subject to redisclosure by the recipient and may no longer be protected by federal privacy regulations.</p>
                    
                    <p className="font-medium">5. Do I have to sign this authorization?</p>
                    <p>You do not have to sign this authorization. However, if you do not sign, you will not be able to participate in this research study.</p>
                    
                    <p className="font-medium">6. Can I withdraw this authorization?</p>
                    <p>You have the right to withdraw this authorization at any time by providing a written notice to the Principal Investigator. If you withdraw your authorization, you will no longer be able to participate in the research study. Information already collected and disclosed may continue to be used.</p>
                    
                    <p className="font-medium">7. Does this authorization expire?</p>
                    <p>This authorization does not have an expiration date and will remain valid for the duration of the research study and thereafter as necessary for research integrity and compliance with regulations.</p>
                  </div>
                </ScrollArea>
                
                <div className="flex items-start space-x-3 pt-4">
                  <Checkbox 
                    id="hipaa-consent-checkbox" 
                    checked={consents.hipaa}
                    onCheckedChange={(checked) => handleConsentChange('hipaa', checked === true)}
                    required
                  />
                  <div className="space-y-1">
                    <Label 
                      htmlFor="hipaa-consent-checkbox" 
                      className="font-medium"
                    >
                      I authorize the use and disclosure of my health information for this research study
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      I understand how my information will be used and that I can withdraw this authorization in writing at any time.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setActiveTab('research-consent')}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button type="button" onClick={() => setActiveTab('optional-consents')}>Continue</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="optional-consents" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-primary" />
                  Optional Consents
                </CardTitle>
                <CardDescription>
                  Additional optional consents for specialized research activities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/50 p-4 rounded-md">
                  <p className="text-sm mb-2">
                    The following consents are <span className="font-medium">optional</span>. You may participate in the main study even if you decline these additional consents.
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-medium">Genetic Research Consent</h3>
                    <p className="text-sm text-muted-foreground">
                      Permission to analyze your DNA for research purposes related to cancer genetics and treatment response.
                    </p>
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id="genetic-consent-checkbox" 
                        checked={consents.genetic}
                        onCheckedChange={(checked) => handleConsentChange('genetic', checked === true)}
                      />
                      <div className="space-y-1">
                        <Label 
                          htmlFor="genetic-consent-checkbox" 
                          className="font-medium"
                        >
                          I agree to participate in genetic research
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          I consent to the collection and analysis of my DNA for research purposes.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h3 className="font-medium">Biospecimen Storage Consent</h3>
                    <p className="text-sm text-muted-foreground">
                      Permission to store your blood, tissue, and other biological samples for future research.
                    </p>
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id="biospecimen-consent-checkbox" 
                        checked={consents.biospecimen}
                        onCheckedChange={(checked) => handleConsentChange('biospecimen', checked === true)}
                      />
                      <div className="space-y-1">
                        <Label 
                          htmlFor="biospecimen-consent-checkbox" 
                          className="font-medium"
                        >
                          I agree to biospecimen storage
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          I consent to the storage of my biological samples for future research studies.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h3 className="font-medium">Photography and Recording Consent</h3>
                    <p className="text-sm text-muted-foreground">
                      Permission to take photographs or make audio/visual recordings for research or educational purposes.
                    </p>
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id="photography-consent-checkbox" 
                        checked={consents.photography}
                        onCheckedChange={(checked) => handleConsentChange('photography', checked === true)}
                      />
                      <div className="space-y-1">
                        <Label 
                          htmlFor="photography-consent-checkbox" 
                          className="font-medium"
                        >
                          I agree to photography and recordings
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          I consent to the use of photographs and recordings for research and educational purposes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setActiveTab('hipaa')}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button type="button" onClick={() => setActiveTab('signature')}>Continue to Signature</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="signature" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileSignature className="h-5 w-5 mr-2 text-primary" />
                  Electronic Signature
                </CardTitle>
                <CardDescription>
                  Provide your electronic signature to complete the consent process
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 border border-red-100 bg-red-50 rounded-md flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-800">Please read carefully before signing</p>
                    <p className="text-sm text-red-700">
                      By signing below, you confirm that you have read and understood all consent documents, 
                      had an opportunity to ask questions, and agree to participate in this research study 
                      according to the terms described.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signature-name">Full Name (Electronic Signature)</Label>
                    <Input 
                      id="signature-name" 
                      value={signature.name}
                      onChange={(e) => setSignature({...signature, name: e.target.value})}
                      placeholder="Type your full legal name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signature-date">Date</Label>
                    <Input 
                      id="signature-date" 
                      type="date"
                      value={signature.date}
                      onChange={(e) => setSignature({...signature, date: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signature-relationship">Relationship to Patient</Label>
                    <Select 
                      value={signature.relationship} 
                      onValueChange={(value) => setSignature({...signature, relationship: value})}
                    >
                      <SelectTrigger id="signature-relationship">
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="self">Self (Patient)</SelectItem>
                        <SelectItem value="legal-representative">Legal Representative</SelectItem>
                        <SelectItem value="parent-guardian">Parent/Guardian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setActiveTab('optional-consents')}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button type="submit">
                  <FileSignature className="h-4 w-4 mr-2" />
                  Submit Consent Forms
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </MainLayout>
  );
};

export default ConsentFormPage;
