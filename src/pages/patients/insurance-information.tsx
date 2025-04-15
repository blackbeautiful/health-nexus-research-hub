
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, ChevronRight, CreditCard, Building, Users, AlertCircle, Upload } from 'lucide-react';

const InsuranceInformationPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('primary');
  
  const [insuranceData, setInsuranceData] = useState({
    primary: {
      insuranceType: 'private',
      insuranceName: '',
      policyNumber: '',
      groupNumber: '',
      policyHolderName: '',
      policyHolderDOB: '',
      policyHolderRelationship: 'self',
      memberID: '',
      cardFrontUploaded: false,
      cardBackUploaded: false
    },
    secondary: {
      hasSecondaryInsurance: false,
      insuranceType: 'private',
      insuranceName: '',
      policyNumber: '',
      groupNumber: '',
      policyHolderName: '',
      policyHolderDOB: '',
      policyHolderRelationship: 'self',
      memberID: '',
      cardFrontUploaded: false,
      cardBackUploaded: false
    }
  });
  
  const handlePrimaryChange = (field: string, value: any) => {
    setInsuranceData(prev => ({
      ...prev,
      primary: {
        ...prev.primary,
        [field]: value
      }
    }));
  };
  
  const handleSecondaryChange = (field: string, value: any) => {
    setInsuranceData(prev => ({
      ...prev,
      secondary: {
        ...prev.secondary,
        [field]: value
      }
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!insuranceData.primary.insuranceName || !insuranceData.primary.policyNumber) {
      toast({
        title: "Missing Information",
        description: "Please complete all required fields in the Primary Insurance section.",
        variant: "destructive"
      });
      return;
    }
    
    if (insuranceData.secondary.hasSecondaryInsurance && 
        (!insuranceData.secondary.insuranceName || !insuranceData.secondary.policyNumber)) {
      toast({
        title: "Missing Information",
        description: "Please complete all required fields in the Secondary Insurance section.",
        variant: "destructive"
      });
      setActiveTab('secondary');
      return;
    }
    
    toast({
      title: "Insurance Information Saved",
      description: "Your insurance information has been successfully saved.",
    });
    
    // Navigate to clinical information page
    navigate('/patients/clinical-information');
  };
  
  const simulateUpload = (insuranceType: 'primary' | 'secondary', side: 'cardFrontUploaded' | 'cardBackUploaded') => {
    toast({
      title: "Upload Started",
      description: "Processing your insurance card image...",
    });
    
    // Simulate upload delay
    setTimeout(() => {
      if (insuranceType === 'primary') {
        handlePrimaryChange(side, true);
      } else {
        handleSecondaryChange(side, true);
      }
      
      toast({
        title: "Upload Complete",
        description: "Insurance card image has been uploaded successfully.",
      });
    }, 1500);
  };
  
  return (
    <MainLayout>
      <PageHeader 
        title="Insurance Information" 
        description="Provide your insurance details for billing purposes"
        breadcrumbs={[
          { label: 'Patients', link: '/patients' },
          { label: 'John Smith', link: '/patients/123' },
          { label: 'Insurance Information' }
        ]}
      />
      
      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:inline-flex mb-6">
            <TabsTrigger value="primary">Primary Insurance</TabsTrigger>
            <TabsTrigger value="secondary">Secondary Insurance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="primary">
            <Card>
              <CardHeader>
                <CardTitle>Primary Insurance Information</CardTitle>
                <CardDescription>Enter details from your primary insurance card</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label>Insurance Type</Label>
                    <RadioGroup 
                      defaultValue="private" 
                      value={insuranceData.primary.insuranceType}
                      onValueChange={(value) => handlePrimaryChange('insuranceType', value)}
                      className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="private" id="primary-private" />
                        <Label htmlFor="primary-private">Private</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medicare" id="primary-medicare" />
                        <Label htmlFor="primary-medicare">Medicare</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medicaid" id="primary-medicaid" />
                        <Label htmlFor="primary-medicaid">Medicaid</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="primary-other" />
                        <Label htmlFor="primary-other">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="primary-insurance-name">Insurance Provider Name</Label>
                      <Input 
                        id="primary-insurance-name" 
                        placeholder="e.g., Blue Cross Blue Shield"
                        value={insuranceData.primary.insuranceName}
                        onChange={(e) => handlePrimaryChange('insuranceName', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="primary-member-id">Member ID / Subscriber Number</Label>
                      <Input 
                        id="primary-member-id" 
                        placeholder="Member identification number"
                        value={insuranceData.primary.memberID}
                        onChange={(e) => handlePrimaryChange('memberID', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="primary-policy-number">Policy Number</Label>
                      <Input 
                        id="primary-policy-number" 
                        placeholder="Policy identification number"
                        value={insuranceData.primary.policyNumber}
                        onChange={(e) => handlePrimaryChange('policyNumber', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="primary-group-number">Group Number (if applicable)</Label>
                      <Input 
                        id="primary-group-number"
                        placeholder="Group identification number"
                        value={insuranceData.primary.groupNumber}
                        onChange={(e) => handlePrimaryChange('groupNumber', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-medium text-lg mb-4">Policyholder Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="primary-policyholder-name">Policyholder Name</Label>
                        <Input 
                          id="primary-policyholder-name" 
                          placeholder="Full name of policyholder"
                          value={insuranceData.primary.policyHolderName}
                          onChange={(e) => handlePrimaryChange('policyHolderName', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="primary-policyholder-dob">Policyholder Date of Birth</Label>
                        <Input 
                          id="primary-policyholder-dob" 
                          type="date"
                          value={insuranceData.primary.policyHolderDOB}
                          onChange={(e) => handlePrimaryChange('policyHolderDOB', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="primary-relationship">Relationship to Policyholder</Label>
                      <Select 
                        value={insuranceData.primary.policyHolderRelationship} 
                        onValueChange={(value) => handlePrimaryChange('policyHolderRelationship', value)}
                      >
                        <SelectTrigger id="primary-relationship">
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="self">Self</SelectItem>
                          <SelectItem value="spouse">Spouse</SelectItem>
                          <SelectItem value="child">Child</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-medium text-lg mb-4">Insurance Card</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-dashed rounded-lg p-4 text-center">
                      {insuranceData.primary.cardFrontUploaded ? (
                        <div className="space-y-2">
                          <div className="bg-green-50 text-green-600 rounded-md p-2 inline-flex items-center">
                            <CreditCard className="h-5 w-5 mr-2" />
                            <span>Front of card uploaded</span>
                          </div>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handlePrimaryChange('cardFrontUploaded', false)}
                          >
                            Replace Image
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <CreditCard className="h-12 w-12 mx-auto text-muted-foreground" />
                          <h4 className="font-medium">Front of Insurance Card</h4>
                          <p className="text-sm text-muted-foreground">Upload an image of the front of your insurance card</p>
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => simulateUpload('primary', 'cardFrontUploaded')}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Image
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <div className="border border-dashed rounded-lg p-4 text-center">
                      {insuranceData.primary.cardBackUploaded ? (
                        <div className="space-y-2">
                          <div className="bg-green-50 text-green-600 rounded-md p-2 inline-flex items-center">
                            <CreditCard className="h-5 w-5 mr-2" />
                            <span>Back of card uploaded</span>
                          </div>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handlePrimaryChange('cardBackUploaded', false)}
                          >
                            Replace Image
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <CreditCard className="h-12 w-12 mx-auto text-muted-foreground" />
                          <h4 className="font-medium">Back of Insurance Card</h4>
                          <p className="text-sm text-muted-foreground">Upload an image of the back of your insurance card</p>
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => simulateUpload('primary', 'cardBackUploaded')}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Image
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => navigate('/patients/register')}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Registration
                </Button>
                <Button type="button" onClick={() => setActiveTab('secondary')}>
                  Continue
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="secondary">
            <Card>
              <CardHeader>
                <CardTitle>Secondary Insurance Information</CardTitle>
                <CardDescription>Enter details from your secondary insurance, if applicable</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2 p-4 border rounded-md">
                  <Switch
                    id="has-secondary"
                    checked={insuranceData.secondary.hasSecondaryInsurance}
                    onCheckedChange={(checked) => handleSecondaryChange('hasSecondaryInsurance', checked)}
                  />
                  <Label htmlFor="has-secondary">I have secondary insurance coverage</Label>
                </div>
                
                {insuranceData.secondary.hasSecondaryInsurance && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="space-y-4">
                      <div>
                        <Label>Insurance Type</Label>
                        <RadioGroup 
                          defaultValue="private" 
                          value={insuranceData.secondary.insuranceType}
                          onValueChange={(value) => handleSecondaryChange('insuranceType', value)}
                          className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="private" id="secondary-private" />
                            <Label htmlFor="secondary-private">Private</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="medicare" id="secondary-medicare" />
                            <Label htmlFor="secondary-medicare">Medicare</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="medicaid" id="secondary-medicaid" />
                            <Label htmlFor="secondary-medicaid">Medicaid</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="secondary-other" />
                            <Label htmlFor="secondary-other">Other</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="secondary-insurance-name">Insurance Provider Name</Label>
                          <Input 
                            id="secondary-insurance-name" 
                            placeholder="e.g., Aetna"
                            value={insuranceData.secondary.insuranceName}
                            onChange={(e) => handleSecondaryChange('insuranceName', e.target.value)}
                            required={insuranceData.secondary.hasSecondaryInsurance}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="secondary-member-id">Member ID / Subscriber Number</Label>
                          <Input 
                            id="secondary-member-id" 
                            placeholder="Member identification number"
                            value={insuranceData.secondary.memberID}
                            onChange={(e) => handleSecondaryChange('memberID', e.target.value)}
                            required={insuranceData.secondary.hasSecondaryInsurance}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="secondary-policy-number">Policy Number</Label>
                          <Input 
                            id="secondary-policy-number" 
                            placeholder="Policy identification number"
                            value={insuranceData.secondary.policyNumber}
                            onChange={(e) => handleSecondaryChange('policyNumber', e.target.value)}
                            required={insuranceData.secondary.hasSecondaryInsurance}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="secondary-group-number">Group Number (if applicable)</Label>
                          <Input 
                            id="secondary-group-number"
                            placeholder="Group identification number"
                            value={insuranceData.secondary.groupNumber}
                            onChange={(e) => handleSecondaryChange('groupNumber', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h3 className="font-medium text-lg mb-4">Policyholder Information</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="secondary-policyholder-name">Policyholder Name</Label>
                            <Input 
                              id="secondary-policyholder-name" 
                              placeholder="Full name of policyholder"
                              value={insuranceData.secondary.policyHolderName}
                              onChange={(e) => handleSecondaryChange('policyHolderName', e.target.value)}
                              required={insuranceData.secondary.hasSecondaryInsurance}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="secondary-policyholder-dob">Policyholder Date of Birth</Label>
                            <Input 
                              id="secondary-policyholder-dob" 
                              type="date"
                              value={insuranceData.secondary.policyHolderDOB}
                              onChange={(e) => handleSecondaryChange('policyHolderDOB', e.target.value)}
                              required={insuranceData.secondary.hasSecondaryInsurance}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="secondary-relationship">Relationship to Policyholder</Label>
                          <Select 
                            value={insuranceData.secondary.policyHolderRelationship} 
                            onValueChange={(value) => handleSecondaryChange('policyHolderRelationship', value)}
                          >
                            <SelectTrigger id="secondary-relationship">
                              <SelectValue placeholder="Select relationship" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="self">Self</SelectItem>
                              <SelectItem value="spouse">Spouse</SelectItem>
                              <SelectItem value="child">Child</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h3 className="font-medium text-lg mb-4">Insurance Card</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-dashed rounded-lg p-4 text-center">
                          {insuranceData.secondary.cardFrontUploaded ? (
                            <div className="space-y-2">
                              <div className="bg-green-50 text-green-600 rounded-md p-2 inline-flex items-center">
                                <CreditCard className="h-5 w-5 mr-2" />
                                <span>Front of card uploaded</span>
                              </div>
                              <Button 
                                type="button" 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleSecondaryChange('cardFrontUploaded', false)}
                              >
                                Replace Image
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <CreditCard className="h-12 w-12 mx-auto text-muted-foreground" />
                              <h4 className="font-medium">Front of Insurance Card</h4>
                              <p className="text-sm text-muted-foreground">Upload an image of the front of your secondary insurance card</p>
                              <Button 
                                type="button" 
                                variant="outline"
                                onClick={() => simulateUpload('secondary', 'cardFrontUploaded')}
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                Upload Image
                              </Button>
                            </div>
                          )}
                        </div>
                        
                        <div className="border border-dashed rounded-lg p-4 text-center">
                          {insuranceData.secondary.cardBackUploaded ? (
                            <div className="space-y-2">
                              <div className="bg-green-50 text-green-600 rounded-md p-2 inline-flex items-center">
                                <CreditCard className="h-5 w-5 mr-2" />
                                <span>Back of card uploaded</span>
                              </div>
                              <Button 
                                type="button" 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleSecondaryChange('cardBackUploaded', false)}
                              >
                                Replace Image
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <CreditCard className="h-12 w-12 mx-auto text-muted-foreground" />
                              <h4 className="font-medium">Back of Insurance Card</h4>
                              <p className="text-sm text-muted-foreground">Upload an image of the back of your secondary insurance card</p>
                              <Button 
                                type="button" 
                                variant="outline"
                                onClick={() => simulateUpload('secondary', 'cardBackUploaded')}
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                Upload Image
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setActiveTab('primary')}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Primary Insurance
                </Button>
                <div className="space-x-2">
                  <Button type="button" variant="outline">Save as Draft</Button>
                  <Button type="submit">Save and Continue</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </MainLayout>
  );
};

export default InsuranceInformationPage;
