import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, Save, Plus } from 'lucide-react';
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
              <CardContent className="p-6 space-y-6">
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Primary Insurance</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="insurance-provider">Insurance Provider *</Label>
                      <Input 
                        id="insurance-provider" 
                        placeholder="Enter insurance provider"
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="insurance-plan">Plan Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select plan type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hmo">HMO</SelectItem>
                          <SelectItem value="ppo">PPO</SelectItem>
                          <SelectItem value="epo">EPO</SelectItem>
                          <SelectItem value="pos">POS</SelectItem>
                          <SelectItem value="hdhp">HDHP</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="policy-number">Policy Number *</Label>
                      <Input 
                        id="policy-number" 
                        placeholder="Enter policy number"
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="group-number">Group Number</Label>
                      <Input 
                        id="group-number" 
                        placeholder="Enter group number"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="effective-date">Effective Date *</Label>
                    <Input 
                      id="effective-date" 
                      type="date"
                      required 
                    />
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-4">Policyholder Information</h4>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <Checkbox id="same-as-patient" />
                        <label
                          htmlFor="same-as-patient"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Same as patient
                        </label>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="policyholder-name">Policyholder Name *</Label>
                          <Input 
                            id="policyholder-name" 
                            placeholder="Enter policyholder name"
                            required 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="relationship">Relationship to Patient</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select relationship" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="self">Self</SelectItem>
                              <SelectItem value="spouse">Spouse</SelectItem>
                              <SelectItem value="parent">Parent</SelectItem>
                              <SelectItem value="guardian">Legal Guardian</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="policyholder-dob">Date of Birth *</Label>
                          <Input 
                            id="policyholder-dob" 
                            type="date"
                            required 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="policyholder-ssn">SSN (last 4 digits)</Label>
                          <Input 
                            id="policyholder-ssn" 
                            placeholder="XXXX"
                            maxLength={4} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Secondary Insurance</h3>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="has-secondary" />
                        <label
                          htmlFor="has-secondary"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I have secondary insurance
                        </label>
                      </div>
                    </div>
                    
                    {/* Secondary insurance fields will be shown/hidden based on checkbox */}
                    <div className="space-y-6 opacity-50">
                      {/* Same fields as primary insurance but with different IDs */}
                      {/* This section would be conditionally rendered based on checkbox state */}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between mt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setActiveTab('contact')}
              >
                Previous: Contact Information
              </Button>
              <Button 
                type="button" 
                onClick={() => setActiveTab('clinical')}
              >
                Next: Clinical Information
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="clinical">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Medical History</h3>
                    <div className="space-y-4">
                      <div>
                        <Label>Current Medical Conditions</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                          {[
                            'Diabetes',
                            'Hypertension',
                            'Heart Disease',
                            'Asthma',
                            'Cancer',
                            'Arthritis',
                            'Depression',
                            'Anxiety',
                            'Other'
                          ].map((condition) => (
                            <div key={condition} className="flex items-center space-x-2">
                              <Checkbox id={`condition-${condition.toLowerCase()}`} />
                              <Label htmlFor={`condition-${condition.toLowerCase()}`}>{condition}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="other-conditions">Other Medical Conditions</Label>
                        <Textarea 
                          id="other-conditions" 
                          placeholder="Please specify any other medical conditions"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-lg font-medium mb-4">Current Medications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <Checkbox id="no-medications" />
                        <Label htmlFor="no-medications">No current medications</Label>
                      </div>

                      <div className="space-y-4">
                        {[1, 2, 3].map((index) => (
                          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`medication-${index}`}>Medication Name</Label>
                              <Input 
                                id={`medication-${index}`} 
                                placeholder="Enter medication name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`dosage-${index}`}>Dosage</Label>
                              <Input 
                                id={`dosage-${index}`} 
                                placeholder="Enter dosage"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`frequency-${index}`}>Frequency</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select frequency" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="daily">Daily</SelectItem>
                                  <SelectItem value="twice-daily">Twice Daily</SelectItem>
                                  <SelectItem value="three-times">Three Times Daily</SelectItem>
                                  <SelectItem value="four-times">Four Times Daily</SelectItem>
                                  <SelectItem value="as-needed">As Needed</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Button type="button" variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Another Medication
                      </Button>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-lg font-medium mb-4">Allergies</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <Checkbox id="no-allergies" />
                        <Label htmlFor="no-allergies">No known allergies</Label>
                      </div>

                      <div className="space-y-4">
                        {[1, 2].map((index) => (
                          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`allergy-${index}`}>Allergy</Label>
                              <Input 
                                id={`allergy-${index}`} 
                                placeholder="Enter allergy"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`reaction-${index}`}>Reaction</Label>
                              <Input 
                                id={`reaction-${index}`} 
                                placeholder="Enter reaction"
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <Button type="button" variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Another Allergy
                      </Button>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-lg font-medium mb-4">Primary Care Provider</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="provider-name">Provider Name</Label>
                        <Input 
                          id="provider-name" 
                          placeholder="Enter provider's name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="provider-phone">Provider Phone</Label>
                        <Input 
                          id="provider-phone" 
                          placeholder="(xxx) xxx-xxxx"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="provider-practice">Practice Name</Label>
                        <Input 
                          id="provider-practice" 
                          placeholder="Enter practice name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-visit">Last Visit Date</Label>
                        <Input 
                          id="last-visit" 
                          type="date"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between mt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setActiveTab('insurance')}
              >
                Previous: Insurance
              </Button>
              <Button 
                type="button" 
                onClick={() => setActiveTab('consent')}
              >
                Next: Consent Forms
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="consent">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Consent Forms</h3>
                    <p className="text-muted-foreground mb-6">
                      Please review and acknowledge the following consent forms. These are required to complete your registration.
                    </p>

                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-2">General Consent for Treatment</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            I hereby consent to medical treatment, diagnostic tests, and procedures which the healthcare providers at Health Nexus Research Hub may consider or recommend.
                          </p>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="consent-treatment" required />
                            <Label htmlFor="consent-treatment" className="text-sm">
                              I acknowledge and agree to the General Consent for Treatment
                            </Label>
                          </div>
                        </div>

                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-2">Privacy Practices Acknowledgment</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            I acknowledge that I have received the Notice of Privacy Practices, which describes how health information about me may be used and disclosed.
                          </p>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="consent-privacy" required />
                            <Label htmlFor="consent-privacy" className="text-sm">
                              I acknowledge receipt of the Notice of Privacy Practices
                            </Label>
                          </div>
                        </div>

                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-2">Financial Agreement</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            I understand that I am financially responsible for any charges not covered by my insurance and agree to pay any applicable co-pays, deductibles, or non-covered services.
                          </p>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="consent-financial" required />
                            <Label htmlFor="consent-financial" className="text-sm">
                              I agree to the Financial Agreement terms
                            </Label>
                          </div>
                        </div>

                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-2">Research Participation (Optional)</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            I agree to be contacted about potential participation in future research studies conducted at Health Nexus Research Hub.
                          </p>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="consent-research" />
                            <Label htmlFor="consent-research" className="text-sm">
                              I agree to be contacted about research opportunities
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label htmlFor="signature">Electronic Signature *</Label>
                        <Input 
                          id="signature" 
                          placeholder="Type your full legal name"
                          required 
                        />
                        <p className="text-sm text-muted-foreground">
                          By typing my name above, I understand that this constitutes a legal signature confirming that I acknowledge and agree to all the terms described in the consent forms.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <Label htmlFor="signature-date">Date *</Label>
                        <Input 
                          id="signature-date" 
                          type="date"
                          required 
                          value={new Date().toISOString().split('T')[0]}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between mt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setActiveTab('clinical')}
              >
                Previous: Clinical Information
              </Button>
              <Button 
                type="submit"
                className="bg-health-primary hover:bg-health-primary/90"
              >
                Complete Registration
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </Layout>
  );
};

export default PatientRegistrationPage;
