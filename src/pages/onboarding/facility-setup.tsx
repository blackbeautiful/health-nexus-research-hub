
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowLeft, ArrowRight, Building2, Upload, Users, FileCheck, Settings } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const facilitySchema = z.object({
  facilityName: z.string().min(2, "Facility name must be at least 2 characters"),
  facilityType: z.enum(["hospital", "clinic", "research", "lab", "other"]),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "Zip code is required"),
  country: z.string().min(2, "Country is required"),
  primaryContact: z.string().min(2, "Primary contact name is required"),
  contactEmail: z.string().email("Invalid email address"),
  contactPhone: z.string().min(10, "Phone number is required"),
  description: z.string().optional(),
  moduleSelection: z.enum(["clinical", "research", "both"]),
  subscriptionPlan: z.enum(["starter", "professional", "enterprise"]),
  billingCycle: z.enum(["monthly", "yearly"])
});

type FacilityFormValues = z.infer<typeof facilitySchema>;

const FacilitySetupPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FacilityFormValues>({
    resolver: zodResolver(facilitySchema),
    defaultValues: {
      facilityName: "",
      facilityType: "hospital",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      primaryContact: "",
      contactEmail: "",
      contactPhone: "",
      description: "",
      moduleSelection: "both",
      subscriptionPlan: "professional",
      billingCycle: "yearly",
    }
  });

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: FacilityFormValues) => {
    if (currentStep === totalSteps) {
      toast({
        title: "Facility setup complete!",
        description: "Your facility has been configured successfully.",
      });
      navigate("/");
    } else {
      nextStep();
    }
  };

  const steps = [
    { id: 1, name: "Facility Info", icon: Building2 },
    { id: 2, name: "Module Selection", icon: Settings },
    { id: 3, name: "User Setup", icon: Users },
    { id: 4, name: "Documents", icon: FileCheck },
    { id: 5, name: "Review", icon: CheckCircle },
  ];

  const subscriptionPlans = [
    {
      id: "starter",
      name: "Starter",
      description: "Basic functionalities for small facilities",
      price: {
        monthly: "$299",
        yearly: "$2,990"
      },
      features: [
        "Up to 10 staff accounts",
        "500 patient/participant records",
        "1 facility location",
        "Basic reporting",
        "Email support"
      ]
    },
    {
      id: "professional",
      name: "Professional",
      description: "Full-featured solution for mid-sized facilities",
      price: {
        monthly: "$599",
        yearly: "$5,990"
      },
      features: [
        "Up to 50 staff accounts",
        "5,000 patient/participant records",
        "Up to 3 facility locations",
        "Advanced reporting & analytics",
        "Priority email & phone support",
        "API access",
        "Data export capabilities"
      ]
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Comprehensive solution for large healthcare networks",
      price: {
        monthly: "$1,299",
        yearly: "$12,990"
      },
      features: [
        "Unlimited staff accounts",
        "Unlimited patient/participant records",
        "Unlimited facility locations",
        "Custom reporting & analytics",
        "24/7 dedicated support",
        "Full API access",
        "Data integration services",
        "Customization options",
        "On-site training"
      ]
    }
  ];

  return (
    <MainLayout>
      <div className="py-8 px-4 mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Facility Setup Wizard</h1>
          <p className="text-muted-foreground">Complete the steps below to set up your facility and start using HealthNexus.</p>
        </div>

        <div className="mb-8">
          <Progress value={currentStep / totalSteps * 100} className="h-2" />
          
          <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2">
            {steps.map((step) => (
              <div 
                key={step.id} 
                className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                  currentStep === step.id 
                    ? 'bg-primary text-primary-foreground' 
                    : currentStep > step.id 
                      ? 'bg-muted text-muted-foreground' 
                      : 'bg-background border'
                }`}
              >
                <div className="rounded-full p-2">
                  <step.icon size={20} />
                </div>
                <span className="text-xs mt-1">{step.name}</span>
              </div>
            ))}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Facility Information</CardTitle>
                  <CardDescription>
                    Enter the basic details about your healthcare facility
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="facilityName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facility Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter facility name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="facilityType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facility Type *</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select facility type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="hospital">Hospital</SelectItem>
                            <SelectItem value="clinic">Clinic</SelectItem>
                            <SelectItem value="research">Research Institution</SelectItem>
                            <SelectItem value="lab">Laboratory</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Brief description of your facility" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator className="my-4" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address *</FormLabel>
                          <FormControl>
                            <Input placeholder="Street address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City *</FormLabel>
                          <FormControl>
                            <Input placeholder="City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State/Province *</FormLabel>
                          <FormControl>
                            <Input placeholder="State/Province" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP/Postal Code *</FormLabel>
                          <FormControl>
                            <Input placeholder="ZIP/Postal code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country *</FormLabel>
                          <FormControl>
                            <Input placeholder="Country" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="primaryContact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Contact Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Phone *</FormLabel>
                          <FormControl>
                            <Input placeholder="Phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="button" onClick={nextStep}>
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Module Selection</CardTitle>
                  <CardDescription>
                    Choose which modules you want to activate for your facility
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="moduleSelection"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Modules *</FormLabel>
                        <FormControl>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div 
                              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                field.value === 'clinical' ? 'border-primary bg-primary/5 shadow-sm' : ''
                              }`}
                              onClick={() => form.setValue('moduleSelection', 'clinical')}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <h3 className="font-medium">Clinical Module</h3>
                                {field.value === 'clinical' && <CheckCircle className="h-5 w-5 text-primary" />}
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">Manage daily clinical operations for your healthcare facility</p>
                              <ul className="text-sm space-y-2">
                                <li className="flex items-center">
                                  <CheckCircle className="h-3 w-3 text-green-600 mr-2" />
                                  Patient management
                                </li>
                                <li className="flex items-center">
                                  <CheckCircle className="h-3 w-3 text-green-600 mr-2" />
                                  Clinical workflows
                                </li>
                                <li className="flex items-center">
                                  <CheckCircle className="h-3 w-3 text-green-600 mr-2" />
                                  Appointment scheduling
                                </li>
                              </ul>
                            </div>

                            <div 
                              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                field.value === 'research' ? 'border-primary bg-primary/5 shadow-sm' : ''
                              }`}
                              onClick={() => form.setValue('moduleSelection', 'research')}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <h3 className="font-medium">Research Module</h3>
                                {field.value === 'research' && <CheckCircle className="h-5 w-5 text-primary" />}
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">Manage clinical trials and research studies</p>
                              <ul className="text-sm space-y-2">
                                <li className="flex items-center">
                                  <CheckCircle className="h-3 w-3 text-green-600 mr-2" />
                                  Study management
                                </li>
                                <li className="flex items-center">
                                  <CheckCircle className="h-3 w-3 text-green-600 mr-2" />
                                  Participant tracking
                                </li>
                                <li className="flex items-center">
                                  <CheckCircle className="h-3 w-3 text-green-600 mr-2" />
                                  Data collection & analysis
                                </li>
                              </ul>
                            </div>

                            <div 
                              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                field.value === 'both' ? 'border-primary bg-primary/5 shadow-sm' : ''
                              }`}
                              onClick={() => form.setValue('moduleSelection', 'both')}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <h3 className="font-medium">Both Modules</h3>
                                {field.value === 'both' && <CheckCircle className="h-5 w-5 text-primary" />}
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">Complete solution for clinical care and research</p>
                              <div className="flex items-center justify-center mt-3 mb-1">
                                <Badge variant="secondary">MOST POPULAR</Badge>
                              </div>
                              <p className="text-sm text-center text-green-600">15% discount applied</p>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator className="my-4" />

                  <FormField
                    control={form.control}
                    name="subscriptionPlan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subscription Plan *</FormLabel>
                        <FormControl>
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {subscriptionPlans.map(plan => (
                              <div 
                                key={plan.id}
                                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                  field.value === plan.id ? 'border-primary bg-primary/5 shadow-sm' : ''
                                }`}
                                onClick={() => form.setValue('subscriptionPlan', plan.id as 'starter' | 'professional' | 'enterprise')}
                              >
                                <div className="flex justify-between items-center mb-2">
                                  <h3 className="font-medium">{plan.name}</h3>
                                  {field.value === plan.id && <CheckCircle className="h-5 w-5 text-primary" />}
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">{plan.description}</p>
                                
                                <div className="text-center my-3">
                                  <span className="text-2xl font-bold">{form.getValues('billingCycle') === 'monthly' ? plan.price.monthly : plan.price.yearly}</span>
                                  <span className="text-sm text-muted-foreground">/{form.getValues('billingCycle') === 'monthly' ? 'month' : 'year'}</span>
                                </div>
                                
                                <Separator className="my-3" />
                                
                                <ul className="text-sm space-y-2">
                                  {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start">
                                      <CheckCircle className="h-3 w-3 text-green-600 mr-2 mt-1" />
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="billingCycle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Billing Cycle</FormLabel>
                        <FormControl>
                          <div className="flex items-center space-x-4">
                            <div 
                              className={`border rounded-lg px-4 py-2 cursor-pointer transition-all ${
                                field.value === 'monthly' ? 'border-primary bg-primary/5 shadow-sm' : ''
                              }`}
                              onClick={() => form.setValue('billingCycle', 'monthly')}
                            >
                              <div className="flex items-center">
                                {field.value === 'monthly' && <CheckCircle className="h-4 w-4 text-primary mr-2" />}
                                <span>Monthly</span>
                              </div>
                            </div>
                            
                            <div 
                              className={`border rounded-lg px-4 py-2 cursor-pointer transition-all ${
                                field.value === 'yearly' ? 'border-primary bg-primary/5 shadow-sm' : ''
                              }`}
                              onClick={() => form.setValue('billingCycle', 'yearly')}
                            >
                              <div className="flex items-center">
                                {field.value === 'yearly' && <CheckCircle className="h-4 w-4 text-primary mr-2" />}
                                <span>Yearly (Save 15%)</span>
                                {field.value === 'yearly' && <Badge variant="secondary" className="ml-2">Best Value</Badge>}
                              </div>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button type="button" onClick={nextStep}>
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>User Setup</CardTitle>
                  <CardDescription>
                    Add initial users for your facility and define their roles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Administrator Account</h3>
                      <Badge>Primary Admin</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg">
                      <div>
                        <Label>Name</Label>
                        <div>{form.getValues('primaryContact')}</div>
                      </div>
                      <div>
                        <Label>Email</Label>
                        <div>{form.getValues('contactEmail')}</div>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Additional Users</h3>
                        <Button variant="outline" size="sm">
                          <Users className="mr-2 h-4 w-4" /> Add User
                        </Button>
                      </div>
                      
                      <div className="border rounded-md p-8 text-center">
                        <Users className="h-10 w-10 mx-auto text-muted-foreground" />
                        <p className="mt-2 text-muted-foreground">
                          No additional users added yet. You can add more users after completing setup.
                        </p>
                      </div>
                    </div>

                    <Separator className="my-4" />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Role Templates</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Select role templates to pre-configure in your system.
                      </p>
                      
                      <Tabs defaultValue="clinical">
                        <TabsList className="mb-4">
                          <TabsTrigger value="clinical">Clinical Roles</TabsTrigger>
                          <TabsTrigger value="research">Research Roles</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="clinical" className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {['Physician', 'Nurse', 'Admin Staff', 'Lab Technician', 'Receptionist'].map(role => (
                              <div key={role} className="flex items-center space-x-2 border p-3 rounded-md">
                                <Checkbox id={`role-${role}`} defaultChecked={true} />
                                <Label htmlFor={`role-${role}`}>{role}</Label>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="research" className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {['Principal Investigator', 'Research Coordinator', 'Data Manager', 'Clinical Research Associate', 'Study Nurse', 'Regulatory Officer'].map(role => (
                              <div key={role} className="flex items-center space-x-2 border p-3 rounded-md">
                                <Checkbox id={`role-${role}`} defaultChecked={true} />
                                <Label htmlFor={`role-${role}`}>{role}</Label>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button type="button" onClick={nextStep}>
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle>Document Upload</CardTitle>
                  <CardDescription>
                    Upload required documents for your facility
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border border-dashed rounded-lg p-8 text-center">
                      <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">Upload Facility License</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Drag and drop your facility license or certification, or click to browse.
                      </p>
                      <Button variant="outline" size="sm">Choose File</Button>
                    </div>
                    
                    <div className="border border-dashed rounded-lg p-8 text-center">
                      <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">Upload Insurance Information</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Proof of insurance for your facility (optional).
                      </p>
                      <Button variant="outline" size="sm">Choose File</Button>
                    </div>
                    
                    <div className="border border-dashed rounded-lg p-8 text-center">
                      <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">Upload Logo</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Upload your facility logo (PNG or SVG format recommended).
                      </p>
                      <Button variant="outline" size="sm">Choose File</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button type="button" onClick={nextStep}>
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {currentStep === 5 && (
              <Card>
                <CardHeader>
                  <CardTitle>Review & Confirm</CardTitle>
                  <CardDescription>
                    Review your facility setup information and confirm to complete
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-muted/30 p-4 rounded-lg space-y-4">
                      <h3 className="font-medium">Facility Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-muted-foreground">Facility Name</Label>
                          <div className="font-medium">{form.getValues('facilityName') || "Not provided"}</div>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Facility Type</Label>
                          <div className="font-medium capitalize">{form.getValues('facilityType') || "Not provided"}</div>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Primary Contact</Label>
                          <div className="font-medium">{form.getValues('primaryContact') || "Not provided"}</div>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Contact Email</Label>
                          <div className="font-medium">{form.getValues('contactEmail') || "Not provided"}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg space-y-4">
                      <h3 className="font-medium">Subscription Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label className="text-muted-foreground">Module Selection</Label>
                          <div className="font-medium capitalize">{form.getValues('moduleSelection') || "Not selected"}</div>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Subscription Plan</Label>
                          <div className="font-medium capitalize">{form.getValues('subscriptionPlan') || "Not selected"}</div>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Billing Cycle</Label>
                          <div className="font-medium capitalize">{form.getValues('billingCycle') || "Not selected"}</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg space-y-4">
                      <h3 className="font-medium">Summary</h3>
                      <table className="w-full">
                        <tbody>
                          <tr>
                            <td className="py-2">Selected Plan</td>
                            <td className="py-2 font-medium text-right capitalize">
                              {form.getValues('subscriptionPlan')}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2">Billing Cycle</td>
                            <td className="py-2 font-medium text-right capitalize">
                              {form.getValues('billingCycle')}
                            </td>
                          </tr>
                          <tr className="border-t">
                            <td className="py-2 font-medium">Total</td>
                            <td className="py-2 font-bold text-right">
                              {form.getValues('subscriptionPlan') === 'starter' 
                                ? (form.getValues('billingCycle') === 'monthly' ? "$299.00/month" : "$2,990.00/year")
                                : form.getValues('subscriptionPlan') === 'professional'
                                ? (form.getValues('billingCycle') === 'monthly' ? "$599.00/month" : "$5,990.00/year")
                                : (form.getValues('billingCycle') === 'monthly' ? "$1,299.00/month" : "$12,990.00/year")
                              }
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the terms of service and privacy policy
                      </label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button type="submit">
                    Complete Setup <CheckCircle className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}
          </form>
        </Form>
      </div>
    </MainLayout>
  );
};

export default FacilitySetupPage;

// Need to add these exports for the page to work correctly
export const Label = FormLabel;
export const Checkbox = (props: any) => (
  <input type="checkbox" className="h-4 w-4 rounded border-gray-300" {...props} />
);
