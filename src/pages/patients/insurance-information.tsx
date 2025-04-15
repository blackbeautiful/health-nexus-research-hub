
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { IdCard, Save, ChevronLeft, FileSymlink, Trash2, CreditCard, Building, User } from 'lucide-react';

const InsuranceInformationPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [insuranceType, setInsuranceType] = useState('primary');
  const [hasSecondaryInsurance, setHasSecondaryInsurance] = useState(false);
  const [formData, setFormData] = useState({
    primary: {
      insuranceProvider: '',
      policyNumber: '',
      groupNumber: '',
      policyHolder: '',
      relationship: 'self',
      policyHolderDob: '',
      insurancePhone: '',
      effectiveDate: '',
      expiryDate: ''
    },
    secondary: {
      insuranceProvider: '',
      policyNumber: '',
      groupNumber: '',
      policyHolder: '',
      relationship: 'self',
      policyHolderDob: '',
      insurancePhone: '',
      effectiveDate: '',
      expiryDate: ''
    }
  });
  
  const handleChange = (type: 'primary' | 'secondary', field: string, value: string) => {
    setFormData({
      ...formData,
      [type]: {
        ...formData[type],
        [field]: value
      }
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would save the data to a database
    toast({
      title: "Information Saved",
      description: "Patient insurance information has been updated.",
    });
    navigate('/patients/clinical-information');
  };
  
  return (
    <MainLayout>
      <PageHeader 
        title="Insurance Information" 
        description="Collect patient insurance details"
        breadcrumbs={[
          { label: 'Patients', link: '/patients' },
          { label: 'John Smith', link: '/patients/123' },
          { label: 'Insurance Information' }
        ]}
      />
      
      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <IdCard className="h-5 w-5 mr-2 text-primary" />
              Primary Insurance
            </CardTitle>
            <CardDescription>Enter patient's primary insurance information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                <Input 
                  id="insuranceProvider" 
                  value={formData.primary.insuranceProvider}
                  onChange={(e) => handleChange('primary', 'insuranceProvider', e.target.value)}
                  placeholder="e.g., Blue Cross Blue Shield"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="policyNumber">Policy Number / Member ID</Label>
                <Input 
                  id="policyNumber" 
                  value={formData.primary.policyNumber}
                  onChange={(e) => handleChange('primary', 'policyNumber', e.target.value)}
                  placeholder="e.g., XYZ123456789"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="groupNumber">Group Number</Label>
                <Input 
                  id="groupNumber" 
                  value={formData.primary.groupNumber}
                  onChange={(e) => handleChange('primary', 'groupNumber', e.target.value)}
                  placeholder="e.g., G12345"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insurancePhone">Insurance Phone Number</Label>
                <Input 
                  id="insurancePhone" 
                  value={formData.primary.insurancePhone}
                  onChange={(e) => handleChange('primary', 'insurancePhone', e.target.value)}
                  placeholder="e.g., (555) 123-4567"
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label htmlFor="policyHolder">Policy Holder</Label>
              <Input 
                id="policyHolder" 
                value={formData.primary.policyHolder}
                onChange={(e) => handleChange('primary', 'policyHolder', e.target.value)}
                placeholder="Full name of policy holder"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="relationship">Relationship to Patient</Label>
                <Select 
                  value={formData.primary.relationship} 
                  onValueChange={(value) => handleChange('primary', 'relationship', value)}
                >
                  <SelectTrigger id="relationship">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self">Self</SelectItem>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="policyHolderDob">Policy Holder Date of Birth</Label>
                <Input 
                  id="policyHolderDob" 
                  type="date"
                  value={formData.primary.policyHolderDob}
                  onChange={(e) => handleChange('primary', 'policyHolderDob', e.target.value)}
                  required={formData.primary.relationship !== 'self'}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="effectiveDate">Effective Date</Label>
                <Input 
                  id="effectiveDate" 
                  type="date"
                  value={formData.primary.effectiveDate}
                  onChange={(e) => handleChange('primary', 'effectiveDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiration Date (if applicable)</Label>
                <Input 
                  id="expiryDate" 
                  type="date"
                  value={formData.primary.expiryDate}
                  onChange={(e) => handleChange('primary', 'expiryDate', e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="hasSecondaryInsurance" 
                checked={hasSecondaryInsurance} 
                onCheckedChange={setHasSecondaryInsurance}
              />
              <Label htmlFor="hasSecondaryInsurance">Patient has secondary insurance</Label>
            </div>
          </CardContent>
        </Card>
        
        {hasSecondaryInsurance && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-primary" />
                Secondary Insurance
              </CardTitle>
              <CardDescription>Enter patient's secondary insurance information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="secondaryInsuranceProvider">Insurance Provider</Label>
                  <Input 
                    id="secondaryInsuranceProvider" 
                    value={formData.secondary.insuranceProvider}
                    onChange={(e) => handleChange('secondary', 'insuranceProvider', e.target.value)}
                    placeholder="e.g., Aetna"
                    required={hasSecondaryInsurance}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryPolicyNumber">Policy Number / Member ID</Label>
                  <Input 
                    id="secondaryPolicyNumber" 
                    value={formData.secondary.policyNumber}
                    onChange={(e) => handleChange('secondary', 'policyNumber', e.target.value)}
                    placeholder="e.g., ABC987654321"
                    required={hasSecondaryInsurance}
                  />
                </div>
              </div>
              
              {/* Additional fields similar to primary insurance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="secondaryGroupNumber">Group Number</Label>
                  <Input 
                    id="secondaryGroupNumber" 
                    value={formData.secondary.groupNumber}
                    onChange={(e) => handleChange('secondary', 'groupNumber', e.target.value)}
                    placeholder="e.g., G67890"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryInsurancePhone">Insurance Phone Number</Label>
                  <Input 
                    id="secondaryInsurancePhone" 
                    value={formData.secondary.insurancePhone}
                    onChange={(e) => handleChange('secondary', 'insurancePhone', e.target.value)}
                    placeholder="e.g., (555) 987-6543"
                  />
                </div>
              </div>
              
              {/* Similar fields to primary insurance */}
            </CardContent>
          </Card>
        )}
        
        <div className="flex justify-between mt-6">
          <Button type="button" variant="outline" onClick={() => navigate('/patients/123')}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Patient
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

export default InsuranceInformationPage;
