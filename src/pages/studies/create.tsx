
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { FormField, FormItem, FormLabel, FormMessage, Form, FormDescription, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, ArrowRight, Check, Upload, Calendar as CalendarIcon, User, FileText, Users, Microscope, Building2, FlaskRound, FileSearch } from 'lucide-react';
import FormBuilder, { FormField as CustomFormField } from '@/components/form-builder/FormBuilder';

const studySchema = z.object({
  title: z.string().min(3, "Study title must be at least 3 characters"),
  shortName: z.string().min(2, "Short name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  studyType: z.enum(["interventional", "observational", "registryBased", "other"]),
  phase: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  targetEnrollment: z.string().min(1, "Target enrollment is required"),
  primaryObjective: z.string().min(10, "Primary objective is required"),
  secondaryObjectives: z.string().optional(),
  inclusionCriteria: z.string().min(10, "Inclusion criteria are required"),
  exclusionCriteria: z.string().min(10, "Exclusion criteria are required"),
  sponsorType: z.enum(["industry", "government", "academic", "other"]),
  sponsorName: z.string().min(2, "Sponsor name is required"),
});

type StudyFormValues = z.infer<typeof studySchema>;

const StudyCreationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [customForms, setCustomForms] = useState<CustomFormField[]>([]);
  const [selectedSites, setSelectedSites] = useState<string[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<StudyFormValues>({
    resolver: zodResolver(studySchema),
    defaultValues: {
      title: "",
      shortName: "",
      description: "",
      studyType: "interventional",
      phase: "",
      targetEnrollment: "",
      primaryObjective: "",
      secondaryObjectives: "",
      inclusionCriteria: "",
      exclusionCriteria: "",
      sponsorType: "industry",
      sponsorName: "",
    }
  });

  const handleNextStep = () => {
    if (currentStep === 1) {
      form.trigger(['title', 'shortName', 'description', 'studyType', 'phase', 'sponsorType', 'sponsorName']);
      const hasErrors = !!form.formState.errors.title || 
                      !!form.formState.errors.shortName ||
                      !!form.formState.errors.description ||
                      !!form.formState.errors.studyType ||
                      !!form.formState.errors.sponsorType ||
                      !!form.formState.errors.sponsorName;
      
      if (!hasErrors) {
        setCurrentStep(currentStep + 1);
      }
    } else if (currentStep === 2) {
      form.trigger(['primaryObjective', 'inclusionCriteria', 'exclusionCriteria', 'targetEnrollment']);
      const hasErrors = !!form.formState.errors.primaryObjective || 
                      !!form.formState.errors.inclusionCriteria ||
                      !!form.formState.errors.exclusionCriteria ||
                      !!form.formState.errors.targetEnrollment;
      
      if (!hasErrors) {
        setCurrentStep(currentStep + 1);
      }
    } else if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormSave = (formFields: CustomFormField[]) => {
    setCustomForms(formFields);
    toast({
      title: "Data collection form saved",
      description: `Form with ${formFields.length} fields has been saved.`
    });
  };

  const handleSiteSelectionChange = (siteId: string) => {
    if (selectedSites.includes(siteId)) {
      setSelectedSites(selectedSites.filter(id => id !== siteId));
    } else {
      setSelectedSites([...selectedSites, siteId]);
    }
  };

  const handleTeamMemberSelectionChange = (userId: string) => {
    if (selectedTeam.includes(userId)) {
      setSelectedTeam(selectedTeam.filter(id => id !== userId));
    } else {
      setSelectedTeam([...selectedTeam, userId]);
    }
  };

  const onSubmit = (data: StudyFormValues) => {
    toast({
      title: "Study created",
      description: "Your study has been successfully created."
    });
    navigate("/studies");
  };

  const siteOptions = [
    { id: "site-1", name: "Memorial Hospital Research Center", location: "New York, NY", investigators: 5 },
    { id: "site-2", name: "Pacific Medical Research Institute", location: "San Francisco, CA", investigators: 8 },
    { id: "site-3", name: "Midwestern Health System", location: "Chicago, IL", investigators: 3 },
    { id: "site-4", name: "Southern University Medical Center", location: "Atlanta, GA", investigators: 6 },
    { id: "site-5", name: "Northwest Regional Hospital", location: "Seattle, WA", investigators: 4 }
  ];

  const teamOptions = [
    { id: "user-1", name: "Dr. Sarah Wilson", role: "Principal Investigator", department: "Oncology" },
    { id: "user-2", name: "Dr. Michael Chen", role: "Co-Investigator", department: "Hematology" },
    { id: "user-3", name: "Jane Roberts", role: "Study Coordinator", department: "Clinical Research" },
    { id: "user-4", name: "Robert Lee", role: "Data Manager", department: "Biostatistics" },
    { id: "user-5", name: "Emma Davis", role: "Research Nurse", department: "Nursing" },
    { id: "user-6", name: "James Miller", role: "Regulatory Specialist", department: "Regulatory Affairs" },
    { id: "user-7", name: "Lisa Garcia", role: "Laboratory Technician", department: "Laboratory Medicine" }
  ];

  const steps = [
    { step: 1, name: "Basic Information", icon: FileText },
    { step: 2, name: "Protocol Details", icon: FileSearch },
    { step: 3, name: "Sites & Team", icon: Building2 },
    { step: 4, name: "Data Collection", icon: Microscope },
    { step: 5, name: "Review & Submit", icon: Check }
  ];

  const formatDate = (date?: Date) => {
    if (!date) return "Not specified";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <MainLayout>
      <div className="py-8 container mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Create New Study</h1>
            <p className="text-muted-foreground">
              Set up your research study in a few simple steps
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Progress 
              value={(currentStep / steps.length) * 100} 
              className="w-24 h-2" 
            />
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}
            </span>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-2 md:grid-cols-5 gap-2">
          {steps.map((step) => (
            <div 
              key={step.step} 
              className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                currentStep === step.step 
                  ? 'bg-primary text-primary-foreground' 
                  : currentStep > step.step 
                    ? 'bg-muted text-muted-foreground' 
                    : 'bg-background border'
              }`}
            >
              <div className="rounded-full p-2">
                <step.icon size={20} />
              </div>
              <span className="text-xs mt-1 text-center">{step.name}</span>
            </div>
          ))}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Basic Study Information</CardTitle>
                  <CardDescription>
                    Enter the fundamental details about your research study
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Study Title *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter the full title of the study" {...field} />
                          </FormControl>
                          <FormDescription>
                            The official title used in documentation.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="shortName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Short Name / Acronym *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter a brief identifier" {...field} />
                          </FormControl>
                          <FormDescription>
                            A shorter name or acronym for the study.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Study Description *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Provide a brief description of the study" 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          A general overview of the study's purpose and design.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="studyType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Study Type *</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select study type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="interventional">Interventional</SelectItem>
                              <SelectItem value="observational">Observational</SelectItem>
                              <SelectItem value="registryBased">Registry-Based</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            The general classification of the study methodology.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phase"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Study Phase</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select study phase" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="phase1">Phase 1</SelectItem>
                              <SelectItem value="phase2">Phase 2</SelectItem>
                              <SelectItem value="phase3">Phase 3</SelectItem>
                              <SelectItem value="phase4">Phase 4</SelectItem>
                              <SelectItem value="na">Not Applicable</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            For clinical trials, the phase of development.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Estimated Start Date</FormLabel>
                          <DatePicker
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                          />
                          <FormDescription>
                            When do you plan to start the study?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Estimated End Date</FormLabel>
                          <DatePicker
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => {
                              const startDate = form.getValues('startDate');
                              return startDate ? date <= startDate : date <= new Date();
                            }}
                          />
                          <FormDescription>
                            When do you expect the study to end?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="sponsorType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sponsor Type *</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select sponsor type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="industry">Industry</SelectItem>
                              <SelectItem value="government">Government</SelectItem>
                              <SelectItem value="academic">Academic/Institution</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            The type of organization funding the study.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="sponsorName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sponsor Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter the sponsor's name" {...field} />
                          </FormControl>
                          <FormDescription>
                            The name of the funding organization.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="button" onClick={handleNextStep}>
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Protocol Details</CardTitle>
                  <CardDescription>
                    Define the scientific aspects of your study protocol
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="primaryObjective"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Objective *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="State the main objective of the study" 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          The main scientific question the study aims to answer.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="secondaryObjectives"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secondary Objectives</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="List any secondary objectives" 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Additional research questions the study may address.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="targetEnrollment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Enrollment *</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Enter number of participants" 
                              min="1"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            The total number of participants to be enrolled.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Separator />
                  
                  <FormField
                    control={form.control}
                    name="inclusionCriteria"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Inclusion Criteria *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="List criteria for participant inclusion" 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Characteristics required for participants to be eligible.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="exclusionCriteria"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exclusion Criteria *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="List criteria that would exclude participants" 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Characteristics that would prevent participation.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="border border-dashed rounded-lg p-8 text-center">
                    <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Upload Protocol Document</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload your full protocol document in PDF format (optional)
                    </p>
                    <Button variant="outline" size="sm">Choose File</Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={handlePrevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button type="button" onClick={handleNextStep}>
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Study Sites & Team</CardTitle>
                  <CardDescription>
                    Select sites and team members involved in the study
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Study Sites</h3>
                    <p className="text-sm text-muted-foreground">
                      Select the clinical sites that will be participating in this study.
                    </p>
                    
                    <div className="space-y-3">
                      {siteOptions.map(site => (
                        <div 
                          key={site.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            selectedSites.includes(site.id) ? 'border-primary bg-primary/5' : ''
                          }`}
                          onClick={() => handleSiteSelectionChange(site.id)}
                        >
                          <div className="flex items-center">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={selectedSites.includes(site.id)}
                                  onChange={() => {}}
                                  className="h-4 w-4 rounded border-gray-300"
                                />
                                <h4 className="font-medium">{site.name}</h4>
                              </div>
                              <div className="mt-1 pl-6 text-sm text-muted-foreground">
                                {site.location} • {site.investigators} investigators
                              </div>
                            </div>
                            <Button variant="outline" size="sm">View Details</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <Building2 className="mr-2 h-4 w-4" />
                      Add New Site
                    </Button>
                  </div>
                  
                  <Separator className="my-8" />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Study Team</h3>
                    <p className="text-sm text-muted-foreground">
                      Select team members who will be working on this study.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {teamOptions.map(member => (
                        <div 
                          key={member.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            selectedTeam.includes(member.id) ? 'border-primary bg-primary/5' : ''
                          }`}
                          onClick={() => handleTeamMemberSelectionChange(member.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={selectedTeam.includes(member.id)}
                              onChange={() => {}}
                              className="h-4 w-4 rounded border-gray-300"
                            />
                            <div>
                              <h4 className="font-medium">{member.name}</h4>
                              <div className="text-sm text-muted-foreground">
                                {member.role} • {member.department}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <Users className="mr-2 h-4 w-4" />
                      Add Team Member
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={handlePrevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button type="button" onClick={handleNextStep}>
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle>Data Collection Forms</CardTitle>
                  <CardDescription>
                    Create custom forms for participant data collection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="screening" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="screening">Screening Form</TabsTrigger>
                      <TabsTrigger value="baseline">Baseline Assessment</TabsTrigger>
                      <TabsTrigger value="followup">Follow-up Visits</TabsTrigger>
                      <TabsTrigger value="ae">Adverse Events</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="screening" className="space-y-4">
                      <div className="bg-muted/40 p-4 rounded-md mb-4">
                        <h3 className="font-medium mb-1">Screening Form</h3>
                        <p className="text-sm text-muted-foreground">
                          Create fields to collect participant screening data based on inclusion/exclusion criteria.
                        </p>
                      </div>
                      <FormBuilder onSave={handleFormSave} />
                    </TabsContent>
                    
                    <TabsContent value="baseline">
                      <div className="bg-muted/40 p-4 rounded-md mb-4">
                        <h3 className="font-medium mb-1">Baseline Assessment Form</h3>
                        <p className="text-sm text-muted-foreground">
                          Create fields to collect participant baseline data at study entry.
                        </p>
                      </div>
                      <FormBuilder />
                    </TabsContent>
                    
                    <TabsContent value="followup">
                      <div className="bg-muted/40 p-4 rounded-md mb-4">
                        <h3 className="font-medium mb-1">Follow-up Visit Form</h3>
                        <p className="text-sm text-muted-foreground">
                          Create fields to collect data during follow-up visits.
                        </p>
                      </div>
                      <FormBuilder />
                    </TabsContent>
                    
                    <TabsContent value="ae">
                      <div className="bg-muted/40 p-4 rounded-md mb-4">
                        <h3 className="font-medium mb-1">Adverse Events Form</h3>
                        <p className="text-sm text-muted-foreground">
                          Create fields to document and track adverse events during the study.
                        </p>
                      </div>
                      <FormBuilder />
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={handlePrevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button type="button" onClick={handleNextStep}>
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {currentStep === 5 && (
              <Card>
                <CardHeader>
                  <CardTitle>Review & Submit</CardTitle>
                  <CardDescription>
                    Review your study information before submitting
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted/30 p-6 rounded-lg space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-xl font-bold">{form.getValues('title') || "Study Title Not Provided"}</h2>
                      <p className="text-muted-foreground">Short Name: {form.getValues('shortName') || "None"}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Study Type</h3>
                        <p>{form.getValues('studyType')?.charAt(0).toUpperCase() + form.getValues('studyType')?.slice(1) || "Not specified"}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Phase</h3>
                        <p>{form.getValues('phase')?.charAt(0).toUpperCase() + form.getValues('phase')?.slice(1) || "Not specified"}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Start Date</h3>
                        <p>{formatDate(form.getValues('startDate'))}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">End Date</h3>
                        <p>{formatDate(form.getValues('endDate'))}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Sponsor</h3>
                        <p>{form.getValues('sponsorName')} ({form.getValues('sponsorType')?.charAt(0).toUpperCase() + form.getValues('sponsorType')?.slice(1)})</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Target Enrollment</h3>
                        <p>{form.getValues('targetEnrollment')} participants</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                      <p className="text-sm">{form.getValues('description')}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Primary Objective</h3>
                      <p className="text-sm">{form.getValues('primaryObjective')}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Sites</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm space-y-1">
                          <p>{selectedSites.length} sites selected</p>
                          <ul className="list-disc list-inside text-muted-foreground">
                            {selectedSites.map(siteId => (
                              <li key={siteId}>
                                {siteOptions.find(s => s.id === siteId)?.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Team</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm space-y-1">
                          <p>{selectedTeam.length} team members selected</p>
                          <ul className="list-disc list-inside text-muted-foreground">
                            {selectedTeam.map(userId => (
                              <li key={userId}>
                                {teamOptions.find(u => u.id === userId)?.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Forms</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm space-y-1">
                          <p>4 data collection forms created</p>
                          <ul className="list-disc list-inside text-muted-foreground">
                            <li>Screening Form ({customForms.length} fields)</li>
                            <li>Baseline Assessment</li>
                            <li>Follow-up Visits</li>
                            <li>Adverse Events</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="confirm"
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor="confirm">
                      I confirm that all information is correct and I am ready to create this study
                    </Label>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={handlePrevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button type="submit">
                    Create Study <Check className="ml-2 h-4 w-4" />
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

export default StudyCreationPage;

// Replace the DatePicker component with a custom implementation that uses the Calendar component
export function DatePicker({ selected, onSelect, disabled }: any) {
  return (
    <div className="flex items-center border rounded-md p-2">
      <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
      <input 
        type="date" 
        className="border-0 focus:outline-none w-full"
        value={selected ? selected.toISOString().split('T')[0] : ''}
        onChange={(e) => {
          const date = e.target.value ? new Date(e.target.value) : undefined;
          onSelect(date);
        }}
      />
    </div>
  );
}
