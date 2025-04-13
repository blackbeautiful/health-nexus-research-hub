import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';

const PatientRegistrationPage = () => {
  const [activeTab, setActiveTab] = useState('demographic');
  const { toast } = useToast();
  
  const handleSaveDraft = () => {
    toast({
      title: 'Draft Saved',
      description: 'Patient information has been saved as draft',
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Patient Registered',
      description: 'New patient has been successfully registered',
    });
  };
  
  return (
    <Layout title="Patient Registration">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4 -ml-2">
          <Link to="/patients">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Patients
          </Link>
        </Button>
        
        <PageHeader 
          title="Register New Patient" 
          description="Enter patient information to create a new record"
          breadcrumbs={[
            { label: 'Patients', link: '/patients' },
            { label: 'Register New Patient' }
          ]}
          action={{
            label: 'Save Draft',
            icon: Save,
            onClick: handleSaveDraft
          }}
        />
      </div>
      
      <form onSubmit={handleSubmit}>
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <TabsList className="w-full justify-start rounded-none border-b-0 p-0">
                  <TabsTrigger 
                    value="demographic" 
                    className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-health-primary px-6 py-3"
                  >
                    Demographics
                  </TabsTrigger>
                  <TabsTrigger 
                    value="contact" 
                    className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-health-primary px-6 py-3"
                  >
                    Contact Information
                  </TabsTrigger>
                  <TabsTrigger 
                    value="insurance" 
                    className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-health-primary px-6 py-3"
                  >
                    Insurance
                  </TabsTrigger>
                  <TabsTrigger 
                    value="clinical" 
                    className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-health-primary px-6 py-3"
                  >
                    Clinical Information
                  </TabsTrigger>
                  <TabsTrigger 
                    value="consent" 
                    className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-health-primary px-6 py-3"
                  >
                    Consent
                  </TabsTrigger>
                </TabsList>
              </div>
            </CardContent>
          </Card>
          
          <TabsContent value="demographic">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name *</Label>
                    <Input 
                      id="first-name" 
                      placeholder="Enter first name" 
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="middle-name">Middle Name</Label>
                    <Input 
                      id="middle-name" 
                      placeholder="Enter middle name" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name *</Label>
                    <Input 
                      id="last-name" 
                      placeholder="Enter last name" 
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date-of-birth">Date of Birth *</Label>
                    <Input 
                      id="date-of-birth" 
                      type="date" 
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="non-binary">Non-binary</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="marital-status">Marital Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                        <SelectItem value="separated">Separated</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="ssn">SSN (last 4 digits)</Label>
                    <Input 
                      id="ssn" 
                      placeholder="XXXX" 
                      maxLength={4}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ethnicity">Ethnicity</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ethnicity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hispanic">Hispanic or Latino</SelectItem>
                        <SelectItem value="not-hispanic">Not Hispanic or Latino</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                        <SelectItem value="declined">Declined to answer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="race">Race</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select race" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="american-indian">American Indian or Alaska Native</SelectItem>
                        <SelectItem value="asian">Asian</SelectItem>
                        <SelectItem value="black">Black or African American</SelectItem>
                        <SelectItem value="pacific-islander">Native Hawaiian or Other Pacific Islander</SelectItem>
                        <SelectItem value="white">White</SelectItem>
                        <SelectItem value="multiple">More than one race</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                        <SelectItem value="declined">Declined to answer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="preferred-language">Preferred Language</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="chinese">Chinese (Mandarin)</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="vietnamese">Vietnamese</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="interpreter-needed">Interpreter Needed?</Label>
                    <RadioGroup defaultValue="no" className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="interpreter-yes" />
                        <Label htmlFor="interpreter-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="interpreter-no" />
                        <Label htmlFor="interpreter-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end mt-6">
              <Button 
                type="button" 
                onClick={() => setActiveTab('contact')}
              >
                Next: Contact Information
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="contact">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Primary Contact Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input 
                        id="phone" 
                        placeholder="(xxx) xxx-xxxx" 
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email"
                        placeholder="email@example.com" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address1">Street Address *</Label>
                    <Input 
                      id="address1" 
                      placeholder="Enter street address" 
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address2">Apartment, Suite, etc.</Label>
                    <Input 
                      id="address2" 
                      placeholder="Apt, Suite, Unit, etc. (optional)" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input 
                        id="city" 
                        placeholder="Enter city" 
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AL">Alabama</SelectItem>
                          <SelectItem value="AK">Alaska</SelectItem>
                          <SelectItem value="AZ">Arizona</SelectItem>
                          <SelectItem value="AR">Arkansas</SelectItem>
                          <SelectItem value="CA">California</SelectItem>
                          {/* Other states would be here */}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code *</Label>
                      <Input 
                        id="zip" 
                        placeholder="Enter ZIP code" 
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Emergency Contact</h3>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="same-as-patient" />
                      <label
                        htmlFor="same-as-patient"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Same as patient
                      </label>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="emergency-name">Full Name</Label>
                      <Input 
                        id="emergency-name" 
                        placeholder="Enter emergency contact's name" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="emergency-relationship">Relationship to Patient</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="spouse">Spouse/Partner</SelectItem>
                          <SelectItem value="parent">Parent</SelectItem>
                          <SelectItem value="child">Child</SelectItem>
                          <SelectItem value="sibling">Sibling</SelectItem>
                          <SelectItem value="friend">Friend</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="emergency-phone">Phone Number</Label>
                      <Input 
                        id="emergency-phone" 
                        placeholder="(xxx) xxx-xxxx" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="emergency-email">Email Address</Label>
                      <Input 
                        id="emergency-email" 
                        type="email"
                        placeholder="email@example.com" 
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between mt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setActiveTab('demographic')}
              >
                Previous: Demographics
              </Button>
              <Button 
                type="button" 
                onClick={() => setActiveTab('insurance')}
              >
                Next: Insurance
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="insurance">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">Insurance Information</h3>
                  <p className="text-gray-500 mt-2">
                    Complete the previous sections first to continue
                  </p>
                  <Button 
                    className="mt-4" 
                    onClick={() => setActiveTab('clinical')}
                  >
                    Continue to Clinical Information
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="clinical">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">Clinical Information</h3>
                  <p className="text-gray-500 mt-2">
                    Complete the previous sections first to continue
                  </p>
                  <Button 
                    className="mt-4" 
                    onClick={() => setActiveTab('consent')}
                  >
                    Continue to Consent
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="consent">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">Consent Forms</h3>
                  <p className="text-gray-500 mt-2">
                    Complete the previous sections first to continue
                  </p>
                  <Button 
                    className="mt-4" 
                    type="submit"
                  >
                    Complete Registration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </Layout>
  );
};

export default PatientRegistrationPage;
