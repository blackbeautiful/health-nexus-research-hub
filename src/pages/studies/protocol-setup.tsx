import React, { useState } from 'react';
import { ChevronRight, FileText, CheckCheck, Users, Clipboard, Calendar, Beaker, FileX2, BarChart } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';

const StudyProtocolSetupPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { register, handleSubmit, watch, setValue, getValues } = useForm({
    defaultValues: {
      studyTitle: '',
      studyId: '',
      phase: '',
      studyType: '',
      sponsor: '',
      description: '',
      allocation: '',
      masking: '',
      sampleSize: '',
      primaryPurpose: '',
      startDate: '',
      primaryCompletionDate: '',
      studyCompletionDate: '',
      inclusionCriteria: [''],
      exclusionCriteria: [''],
      arms: [{
        name: '',
        type: '',
        description: '',
        interventions: [{
          name: '',
          type: '',
          description: '',
          dosage: '',
          frequency: '',
          duration: '',
          route: ''
        }]
      }],
      randomizationRatio: '',
      endpoints: {
        primary: {
          name: '',
          description: '',
          timeFrame: '',
          measurementType: ''
        },
        secondary: [{
          name: '',
          description: '',
          timeFrame: '',
          measurementType: ''
        }],
        exploratory: [{
          name: '',
          description: '',
          timeFrame: '',
          measurementType: ''
        }]
      },
      visits: [{
        name: '',
        timepoint: '',
        windowBefore: '',
        windowAfter: '',
        procedures: [],
        assessments: [],
        labTests: []
      }],
      procedures: {
        clinical: [{
          name: '',
          description: '',
          frequency: '',
          timing: ''
        }],
        laboratory: [{
          name: '',
          description: '',
          frequency: '',
          timing: ''
        }],
        imaging: [{
          name: '',
          description: '',
          frequency: '',
          timing: ''
        }],
        questionnaires: [{
          name: '',
          description: '',
          frequency: '',
          timing: ''
        }]
      },
      safetyMonitoring: {
        adverseEventReporting: {
          reportingTimelines: '',
          grading: '',
          attribution: '',
          expeditedReporting: ''
        },
        doseModifications: {
          rules: [],
          guidelines: '',
          stoppingCriteria: ''
        },
        safetyReviewCommittee: {
          composition: '',
          meetingFrequency: '',
          reviewCriteria: ''
        },
        riskMitigation: '',
        safetyParameters: []
      },
      dataCollection: {
        eCRFs: [{
          name: '',
          description: '',
          timing: '',
          required: true
        }],
        sourceDocuments: [],
        qualityControl: {
          monitoringPlan: '',
          dataValidation: '',
          queryManagement: ''
        },
        dataManagement: {
          database: '',
          validation: '',
          coding: ''
        }
      }
    }
  });

  const [armCount, setArmCount] = useState(1);
  const [secondaryEndpointCount, setSecondaryEndpointCount] = useState(1);
  const [visitCount, setVisitCount] = useState(1);

  const addArm = () => {
    const currentArms = getValues('arms') || [];
    setValue('arms', [...currentArms, {
      name: '',
      type: '',
      description: '',
      interventions: [{
        name: '',
        type: '',
        description: '',
        dosage: '',
        frequency: '',
        duration: '',
        route: ''
      }]
    }]);
    setArmCount(armCount + 1);
  };

  const addSecondaryEndpoint = () => {
    const currentEndpoints = getValues('endpoints.secondary') || [];
    setValue('endpoints.secondary', [...currentEndpoints, {
      name: '',
      description: '',
      timeFrame: '',
      measurementType: ''
    }]);
    setSecondaryEndpointCount(secondaryEndpointCount + 1);
  };

  const addVisit = () => {
    const currentVisits = getValues('visits') || [];
    setValue('visits', [...currentVisits, {
      name: '',
      timepoint: '',
      windowBefore: '',
      windowAfter: '',
      procedures: [],
      assessments: [],
      labTests: []
    }]);
    setVisitCount(visitCount + 1);
  };

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    // Handle form submission
  };

  return (
    <Layout title="Create New Study">
      <PageHeader 
        title="Create New Study" 
        description="Set up a new clinical study protocol"
        breadcrumbs={[
          { label: 'Studies', link: '/studies' },
          { label: 'New Study' }
        ]}
      />
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Study Information</CardTitle>
                <CardDescription>Enter the basic information about your study</CardDescription>
              </div>
              <Badge className="ml-2">Draft</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="studyTitle">Study Title *</Label>
                <Input 
                  id="studyTitle"
                  placeholder="Enter the full title of your study"
                  {...register('studyTitle', { required: true })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="studyId">Study ID</Label>
                  <Input 
                    id="studyId"
                    placeholder="e.g., NCT number"
                    {...register('studyId')}
                  />
                </div>
                <div>
                  <Label htmlFor="phase">Phase *</Label>
                  <Select onValueChange={(value) => setValue('phase', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select study phase" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Phase 0</SelectItem>
                      <SelectItem value="1">Phase I</SelectItem>
                      <SelectItem value="1/2">Phase I/II</SelectItem>
                      <SelectItem value="2">Phase II</SelectItem>
                      <SelectItem value="2/3">Phase II/III</SelectItem>
                      <SelectItem value="3">Phase III</SelectItem>
                      <SelectItem value="4">Phase IV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="studyType">Study Type *</Label>
                  <Select onValueChange={(value) => setValue('studyType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select study type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="interventional">Interventional</SelectItem>
                      <SelectItem value="observational">Observational</SelectItem>
                      <SelectItem value="expanded_access">Expanded Access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sponsor">Sponsor *</Label>
                  <Input 
                    id="sponsor"
                    placeholder="Enter sponsor name"
                    {...register('sponsor', { required: true })}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="overview" className="text-xs md:text-sm">Overview</TabsTrigger>
            <TabsTrigger value="eligibility" className="text-xs md:text-sm">Eligibility</TabsTrigger>
            <TabsTrigger value="arms" className="text-xs md:text-sm">Arms & Interventions</TabsTrigger>
            <TabsTrigger value="endpoints" className="text-xs md:text-sm">Endpoints</TabsTrigger>
            <TabsTrigger value="schedule" className="text-xs md:text-sm">Visit Schedule</TabsTrigger>
            <TabsTrigger value="procedures" className="text-xs md:text-sm">Procedures</TabsTrigger>
            <TabsTrigger value="safety" className="text-xs md:text-sm">Safety Monitoring</TabsTrigger>
            <TabsTrigger value="data" className="text-xs md:text-sm">Data Collection</TabsTrigger>
          </TabsList>
        
          <TabsContent value="overview" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Study Design</CardTitle>
                <CardDescription>Define the general study design and methodology</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="description">Study Description *</Label>
                  <Textarea 
                    id="description"
                    placeholder="Provide a detailed description of your study..."
                    className="min-h-[150px]"
                    {...register('description', { required: true })}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="allocation">Allocation</Label>
                    <Select onValueChange={(value) => setValue('allocation', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select allocation method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="randomized">Randomized</SelectItem>
                        <SelectItem value="nonrandomized">Non-randomized</SelectItem>
                        <SelectItem value="na">Not applicable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="masking">Masking/Blinding</Label>
                    <Select onValueChange={(value) => setValue('masking', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select masking type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="double">Double-blind</SelectItem>
                        <SelectItem value="single">Single-blind</SelectItem>
                        <SelectItem value="open">Open-label</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="sampleSize">Target Sample Size *</Label>
                    <Input 
                      id="sampleSize"
                      type="number"
                      placeholder="Enter target enrollment"
                      {...register('sampleSize', { required: true })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="primaryPurpose">Primary Purpose *</Label>
                    <Select onValueChange={(value) => setValue('primaryPurpose', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select primary purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="treatment">Treatment</SelectItem>
                        <SelectItem value="prevention">Prevention</SelectItem>
                        <SelectItem value="diagnostic">Diagnostic</SelectItem>
                        <SelectItem value="supportive">Supportive Care</SelectItem>
                        <SelectItem value="screening">Screening</SelectItem>
                        <SelectItem value="basic">Basic Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="startDate">Estimated Start Date *</Label>
                    <Input 
                      id="startDate"
                      type="date"
                      {...register('startDate', { required: true })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="primaryCompletionDate">Estimated Primary Completion *</Label>
                    <Input 
                      id="primaryCompletionDate"
                      type="date"
                      {...register('primaryCompletionDate', { required: true })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="studyCompletionDate">Estimated Study Completion *</Label>
                    <Input 
                      id="studyCompletionDate"
                      type="date"
                      {...register('studyCompletionDate', { required: true })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => setActiveTab('eligibility')}>
                Continue to Eligibility
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="eligibility" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Eligibility Criteria</CardTitle>
                <CardDescription>Define the inclusion and exclusion criteria for study participants</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Inclusion Criteria</h3>
                  <div className="space-y-3">
                    {watch('inclusionCriteria').map((_, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-1">
                          <Input
                            placeholder={`Inclusion criterion ${index + 1}`}
                            {...register(`inclusionCriteria.${index}`)}
                          />
                        </div>
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const current = getValues('inclusionCriteria');
                              setValue(
                                'inclusionCriteria',
                                current.filter((_, i) => i !== index)
                              );
                            }}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                    
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const current = getValues('inclusionCriteria');
                        setValue('inclusionCriteria', [...current, '']);
                      }}
                    >
                      + Add Inclusion Criterion
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Exclusion Criteria</h3>
                  <div className="space-y-3">
                    {watch('exclusionCriteria').map((_, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-1">
                          <Input
                            placeholder={`Exclusion criterion ${index + 1}`}
                            {...register(`exclusionCriteria.${index}`)}
                          />
                        </div>
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const current = getValues('exclusionCriteria');
                              setValue(
                                'exclusionCriteria',
                                current.filter((_, i) => i !== index)
                              );
                            }}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                    
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const current = getValues('exclusionCriteria');
                        setValue('exclusionCriteria', [...current, '']);
                      }}
                    >
                      + Add Exclusion Criterion
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => setActiveTab('overview')}>
                Back to Overview
              </Button>
              <Button type="button" onClick={() => setActiveTab('arms')}>
                Continue to Arms & Interventions
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="arms" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Study Arms</CardTitle>
                <CardDescription>Define the study arms and their interventions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {watch('arms').map((_, armIndex) => (
                  <div key={armIndex} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Arm {armIndex + 1}</h4>
                      {armIndex > 0 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const current = getValues('arms');
                            setValue(
                              'arms',
                              current.filter((_, i) => i !== armIndex)
                            );
                            setArmCount(armCount - 1);
                          }}
                        >
                          Remove Arm
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Arm Name *</Label>
                        <Input
                          placeholder="e.g., Treatment Arm A"
                          {...register(`arms.${armIndex}.name`, { required: true })}
                        />
                      </div>
                      <div>
                        <Label>Arm Type *</Label>
                        <Select
                          onValueChange={(value) =>
                            setValue(`arms.${armIndex}.type`, value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select arm type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="experimental">Experimental</SelectItem>
                            <SelectItem value="active_comparator">Active Comparator</SelectItem>
                            <SelectItem value="placebo_comparator">Placebo Comparator</SelectItem>
                            <SelectItem value="sham_comparator">Sham Comparator</SelectItem>
                            <SelectItem value="no_intervention">No Intervention</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label>Description *</Label>
                      <Textarea
                        placeholder="Describe the arm and its purpose"
                        {...register(`arms.${armIndex}.description`, { required: true })}
                      />
                    </div>

                    <div className="space-y-4">
                      <h5 className="font-medium">Interventions</h5>
                      {watch(`arms.${armIndex}.interventions`).map((_, intIndex) => (
                        <div key={intIndex} className="border rounded-lg p-4 space-y-4">
                          <div className="flex items-center justify-between">
                            <h6 className="font-medium">Intervention {intIndex + 1}</h6>
                            {intIndex > 0 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const current = getValues(`arms.${armIndex}.interventions`);
                                  setValue(
                                    `arms.${armIndex}.interventions`,
                                    current.filter((_, i) => i !== intIndex)
                                  );
                                }}
                              >
                                Remove
                              </Button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Name *</Label>
                              <Input
                                placeholder="Intervention name"
                                {...register(
                                  `arms.${armIndex}.interventions.${intIndex}.name`,
                                  { required: true }
                                )}
                              />
                            </div>
                            <div>
                              <Label>Type *</Label>
                              <Select
                                onValueChange={(value) =>
                                  setValue(
                                    `arms.${armIndex}.interventions.${intIndex}.type`,
                                    value
                                  )
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="drug">Drug</SelectItem>
                                  <SelectItem value="device">Device</SelectItem>
                                  <SelectItem value="procedure">Procedure</SelectItem>
                                  <SelectItem value="behavioral">Behavioral</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Dosage</Label>
                              <Input
                                placeholder="e.g., 100mg"
                                {...register(
                                  `arms.${armIndex}.interventions.${intIndex}.dosage`
                                )}
                              />
                            </div>
                            <div>
                              <Label>Route</Label>
                              <Select
                                onValueChange={(value) =>
                                  setValue(
                                    `arms.${armIndex}.interventions.${intIndex}.route`,
                                    value
                                  )
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select route" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="oral">Oral</SelectItem>
                                  <SelectItem value="iv">Intravenous</SelectItem>
                                  <SelectItem value="sc">Subcutaneous</SelectItem>
                                  <SelectItem value="im">Intramuscular</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Frequency</Label>
                              <Input
                                placeholder="e.g., Once daily"
                                {...register(
                                  `arms.${armIndex}.interventions.${intIndex}.frequency`
                                )}
                              />
                            </div>
                            <div>
                              <Label>Duration</Label>
                              <Input
                                placeholder="e.g., 12 weeks"
                                {...register(
                                  `arms.${armIndex}.interventions.${intIndex}.duration`
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const current = getValues(`arms.${armIndex}.interventions`);
                          setValue(`arms.${armIndex}.interventions`, [
                            ...current,
                            {
                              name: '',
                              type: '',
                              description: '',
                              dosage: '',
                              frequency: '',
                              duration: '',
                              route: ''
                            }
                          ]);
                        }}
                      >
                        + Add Intervention
                      </Button>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addArm}
                >
                  + Add Study Arm
                </Button>

                <Separator />

                <div>
                  <Label>Randomization Ratio</Label>
                  <Input
                    placeholder="e.g., 1:1 or 2:1"
                    {...register('randomizationRatio')}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => setActiveTab('eligibility')}>
                Back to Eligibility
              </Button>
              <Button type="button" onClick={() => setActiveTab('endpoints')}>
                Continue to Endpoints
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="endpoints" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Study Endpoints</CardTitle>
                <CardDescription>Define the primary, secondary, and exploratory endpoints</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Primary Endpoint</h3>
                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Endpoint Name *</Label>
                        <Input
                          placeholder="e.g., Overall Survival"
                          {...register('endpoints.primary.name', { required: true })}
                        />
                      </div>
                      <div>
                        <Label>Measurement Type *</Label>
                        <Select
                          onValueChange={(value) =>
                            setValue('endpoints.primary.measurementType', value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="time_to_event">Time to Event</SelectItem>
                            <SelectItem value="continuous">Continuous</SelectItem>
                            <SelectItem value="categorical">Categorical</SelectItem>
                            <SelectItem value="binary">Binary</SelectItem>
                            <SelectItem value="count">Count</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label>Description *</Label>
                      <Textarea
                        placeholder="Describe how this endpoint will be measured and analyzed"
                        {...register('endpoints.primary.description', { required: true })}
                      />
                    </div>

                    <div>
                      <Label>Time Frame *</Label>
                      <Input
                        placeholder="e.g., Up to 24 months"
                        {...register('endpoints.primary.timeFrame', { required: true })}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Secondary Endpoints</h3>
                  <div className="space-y-4">
                    {watch('endpoints.secondary').map((_, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Secondary Endpoint {index + 1}</h4>
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const current = getValues('endpoints.secondary');
                                setValue(
                                  'endpoints.secondary',
                                  current.filter((_, i) => i !== index)
                                );
                                setSecondaryEndpointCount(secondaryEndpointCount - 1);
                              }}
                            >
                              Remove
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Endpoint Name *</Label>
                            <Input
                              placeholder="e.g., Progression-free Survival"
                              {...register(`endpoints.secondary.${index}.name`, { required: true })}
                            />
                          </div>
                          <div>
                            <Label>Measurement Type *</Label>
                            <Select
                              onValueChange={(value) =>
                                setValue(`endpoints.secondary.${index}.measurementType`, value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="time_to_event">Time to Event</SelectItem>
                                <SelectItem value="continuous">Continuous</SelectItem>
                                <SelectItem value="categorical">Categorical</SelectItem>
                                <SelectItem value="binary">Binary</SelectItem>
                                <SelectItem value="count">Count</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label>Description *</Label>
                          <Textarea
                            placeholder="Describe how this endpoint will be measured and analyzed"
                            {...register(`endpoints.secondary.${index}.description`, { required: true })}
                          />
                        </div>

                        <div>
                          <Label>Time Frame *</Label>
                          <Input
                            placeholder="e.g., Up to 24 months"
                            {...register(`endpoints.secondary.${index}.timeFrame`, { required: true })}
                          />
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={addSecondaryEndpoint}
                    >
                      + Add Secondary Endpoint
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Exploratory Endpoints</h3>
                  <div className="space-y-4">
                    {watch('endpoints.exploratory').map((_, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Exploratory Endpoint {index + 1}</h4>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const current = getValues('endpoints.exploratory');
                              setValue(
                                'endpoints.exploratory',
                                current.filter((_, i) => i !== index)
                              );
                            }}
                          >
                            Remove
                          </Button>
                        </div>

                        <div>
                          <Label>Endpoint Name</Label>
                          <Input
                            placeholder="e.g., Biomarker Analysis"
                            {...register(`endpoints.exploratory.${index}.name`)}
                          />
                        </div>

                        <div>
                          <Label>Description</Label>
                          <Textarea
                            placeholder="Describe how this endpoint will be measured and analyzed"
                            {...register(`endpoints.exploratory.${index}.description`)}
                          />
                        </div>

                        <div>
                          <Label>Time Frame</Label>
                          <Input
                            placeholder="e.g., Throughout study"
                            {...register(`endpoints.exploratory.${index}.timeFrame`)}
                          />
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const current = getValues('endpoints.exploratory');
                        setValue('endpoints.exploratory', [
                          ...current,
                          {
                            name: '',
                            description: '',
                            timeFrame: '',
                            measurementType: ''
                          }
                        ]);
                      }}
                    >
                      + Add Exploratory Endpoint
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => setActiveTab('arms')}>
                Back to Arms & Interventions
              </Button>
              <Button type="button" onClick={() => setActiveTab('schedule')}>
                Continue to Visit Schedule
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Visit Schedule</CardTitle>
                <CardDescription>Define the study visits and assessments timeline</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {watch('visits').map((_, visitIndex) => (
                  <div key={visitIndex} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Visit {visitIndex + 1}</h4>
                      {visitIndex > 0 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const current = getValues('visits');
                            setValue(
                              'visits',
                              current.filter((_, i) => i !== visitIndex)
                            );
                            setVisitCount(visitCount - 1);
                          }}
                        >
                          Remove Visit
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Visit Name *</Label>
                        <Input
                          placeholder="e.g., Screening Visit"
                          {...register(`visits.${visitIndex}.name`, { required: true })}
                        />
                      </div>
                      <div>
                        <Label>Timepoint *</Label>
                        <Input
                          placeholder="e.g., Day -14 to Day -1"
                          {...register(`visits.${visitIndex}.timepoint`, { required: true })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Window Before</Label>
                        <Input
                          placeholder="e.g., -3 days"
                          {...register(`visits.${visitIndex}.windowBefore`)}
                        />
                      </div>
                      <div>
                        <Label>Window After</Label>
                        <Input
                          placeholder="e.g., +3 days"
                          {...register(`visits.${visitIndex}.windowAfter`)}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h5 className="font-medium">Required Procedures</h5>
                      <div className="space-y-2">
                        {watch(`visits.${visitIndex}.procedures`).map((_, procIndex) => (
                          <div key={procIndex} className="flex items-center gap-2">
                            <div className="flex-1">
                              <Input
                                placeholder="Enter procedure"
                                {...register(`visits.${visitIndex}.procedures.${procIndex}`)}
                              />
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const current = getValues(`visits.${visitIndex}.procedures`);
                                setValue(
                                  `visits.${visitIndex}.procedures`,
                                  current.filter((_, i) => i !== procIndex)
                                );
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const current = getValues(`visits.${visitIndex}.procedures`);
                            setValue(`visits.${visitIndex}.procedures`, [...current, '']);
                          }}
                        >
                          + Add Procedure
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h5 className="font-medium">Required Assessments</h5>
                      <div className="space-y-2">
                        {watch(`visits.${visitIndex}.assessments`).map((_, assessIndex) => (
                          <div key={assessIndex} className="flex items-center gap-2">
                            <div className="flex-1">
                              <Input
                                placeholder="Enter assessment"
                                {...register(`visits.${visitIndex}.assessments.${assessIndex}`)}
                              />
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const current = getValues(`visits.${visitIndex}.assessments`);
                                setValue(
                                  `visits.${visitIndex}.assessments`,
                                  current.filter((_, i) => i !== assessIndex)
                                );
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const current = getValues(`visits.${visitIndex}.assessments`);
                            setValue(`visits.${visitIndex}.assessments`, [...current, '']);
                          }}
                        >
                          + Add Assessment
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h5 className="font-medium">Required Lab Tests</h5>
                      <div className="space-y-2">
                        {watch(`visits.${visitIndex}.labTests`).map((_, labIndex) => (
                          <div key={labIndex} className="flex items-center gap-2">
                            <div className="flex-1">
                              <Input
                                placeholder="Enter lab test"
                                {...register(`visits.${visitIndex}.labTests.${labIndex}`)}
                              />
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const current = getValues(`visits.${visitIndex}.labTests`);
                                setValue(
                                  `visits.${visitIndex}.labTests`,
                                  current.filter((_, i) => i !== labIndex)
                                );
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const current = getValues(`visits.${visitIndex}.labTests`);
                            setValue(`visits.${visitIndex}.labTests`, [...current, '']);
                          }}
                        >
                          + Add Lab Test
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addVisit}
                >
                  + Add Visit
                </Button>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => setActiveTab('endpoints')}>
                Back to Endpoints
              </Button>
              <Button type="button" onClick={() => setActiveTab('procedures')}>
                Continue to Procedures
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="procedures" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Study Procedures</CardTitle>
                <CardDescription>Define the procedures and assessments to be performed during the study</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Clinical Assessments</h3>
                  <div className="space-y-4">
                    {watch('procedures.clinical').map((_, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Clinical Assessment {index + 1}</h4>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const current = getValues('procedures.clinical');
                              setValue(
                                'procedures.clinical',
                                current.filter((_, i) => i !== index)
                              );
                            }}
                          >
                            Remove
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Name *</Label>
                            <Input
                              placeholder="e.g., Physical Examination"
                              {...register(`procedures.clinical.${index}.name`, { required: true })}
                            />
                          </div>
                          <div>
                            <Label>Frequency *</Label>
                            <Input
                              placeholder="e.g., Every visit"
                              {...register(`procedures.clinical.${index}.frequency`, { required: true })}
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Description *</Label>
                          <Textarea
                            placeholder="Describe the assessment procedure"
                            {...register(`procedures.clinical.${index}.description`, { required: true })}
                          />
                        </div>

                        <div>
                          <Label>Timing</Label>
                          <Input
                            placeholder="e.g., Before drug administration"
                            {...register(`procedures.clinical.${index}.timing`)}
                          />
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const current = getValues('procedures.clinical');
                        setValue('procedures.clinical', [
                          ...current,
                          {
                            name: '',
                            description: '',
                            frequency: '',
                            timing: ''
                          }
                        ]);
                      }}
                    >
                      + Add Clinical Assessment
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Laboratory Tests</h3>
                  <div className="space-y-4">
                    {watch('procedures.laboratory').map((_, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Laboratory Test {index + 1}</h4>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const current = getValues('procedures.laboratory');
                              setValue(
                                'procedures.laboratory',
                                current.filter((_, i) => i !== index)
                              );
                            }}
                          >
                            Remove
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Name *</Label>
                            <Input
                              placeholder="e.g., Complete Blood Count"
                              {...register(`procedures.laboratory.${index}.name`, { required: true })}
                            />
                          </div>
                          <div>
                            <Label>Frequency *</Label>
                            <Input
                              placeholder="e.g., Every cycle"
                              {...register(`procedures.laboratory.${index}.frequency`, { required: true })}
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Description *</Label>
                          <Textarea
                            placeholder="Describe the laboratory test requirements"
                            {...register(`procedures.laboratory.${index}.description`, { required: true })}
                          />
                        </div>

                        <div>
                          <Label>Timing</Label>
                          <Input
                            placeholder="e.g., Within 3 days before dosing"
                            {...register(`procedures.laboratory.${index}.timing`)}
                          />
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const current = getValues('procedures.laboratory');
                        setValue('procedures.laboratory', [
                          ...current,
                          {
                            name: '',
                            description: '',
                            frequency: '',
                            timing: ''
                          }
                        ]);
                      }}
                    >
                      + Add Laboratory Test
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Imaging Studies</h3>
                  <div className="space-y-4">
                    {watch('procedures.imaging').map((_, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Imaging Study {index + 1}</h4>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const current = getValues('procedures.imaging');
                              setValue(
                                'procedures.imaging',
                                current.filter((_, i) => i !== index)
                              );
                            }}
                          >
                            Remove
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Name *</Label>
                            <Input
                              placeholder="e.g., CT Scan"
                              {...register(`procedures.imaging.${index}.name`, { required: true })}
                            />
                          </div>
                          <div>
                            <Label>Frequency *</Label>
                            <Input
                              placeholder="e.g., Every 8 weeks"
                              {...register(`procedures.imaging.${index}.frequency`, { required: true })}
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Description *</Label>
                          <Textarea
                            placeholder="Describe the imaging requirements"
                            {...register(`procedures.imaging.${index}.description`, { required: true })}
                          />
                        </div>

                        <div>
                          <Label>Timing</Label>
                          <Input
                            placeholder="e.g., ±7 days from scheduled date"
                            {...register(`procedures.imaging.${index}.timing`)}
                          />
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const current = getValues('procedures.imaging');
                        setValue('procedures.imaging', [
                          ...current,
                          {
                            name: '',
                            description: '',
                            frequency: '',
                            timing: ''
                          }
                        ]);
                      }}
                    >
                      + Add Imaging Study
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Quality of Life Assessments</h3>
                  <div className="space-y-4">
                    {watch('procedures.questionnaires').map((_, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Assessment {index + 1}</h4>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const current = getValues('procedures.questionnaires');
                              setValue(
                                'procedures.questionnaires',
                                current.filter((_, i) => i !== index)
                              );
                            }}
                          >
                            Remove
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Name *</Label>
                            <Input
                              placeholder="e.g., EORTC QLQ-C30"
                              {...register(`procedures.questionnaires.${index}.name`, { required: true })}
                            />
                          </div>
                          <div>
                            <Label>Frequency *</Label>
                            <Input
                              placeholder="e.g., Baseline and every 3 months"
                              {...register(`procedures.questionnaires.${index}.frequency`, { required: true })}
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Description *</Label>
                          <Textarea
                            placeholder="Describe the questionnaire and its purpose"
                            {...register(`procedures.questionnaires.${index}.description`, { required: true })}
                          />
                        </div>

                        <div>
                          <Label>Timing</Label>
                          <Input
                            placeholder="e.g., Before clinical assessments"
                            {...register(`procedures.questionnaires.${index}.timing`)}
                          />
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const current = getValues('procedures.questionnaires');
                        setValue('procedures.questionnaires', [
                          ...current,
                          {
                            name: '',
                            description: '',
                            frequency: '',
                            timing: ''
                          }
                        ]);
                      }}
                    >
                      + Add Quality of Life Assessment
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => setActiveTab('schedule')}>
                Back to Visit Schedule
              </Button>
              <Button type="button" onClick={() => setActiveTab('safety')}>
                Continue to Safety Monitoring
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="safety" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Safety Monitoring</CardTitle>
                <CardDescription>Define safety monitoring procedures and adverse event reporting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Adverse Event Reporting</h3>
                  <div className="border rounded-lg p-4 space-y-4">
                    <div>
                      <Label>Reporting Timelines *</Label>
                      <Textarea
                        placeholder="Specify timelines for reporting different types of adverse events"
                        {...register('safetyMonitoring.adverseEventReporting.reportingTimelines', { required: true })}
                      />
                    </div>

                    <div>
                      <Label>Grading System *</Label>
                      <Select
                        onValueChange={(value) =>
                          setValue('safetyMonitoring.adverseEventReporting.grading', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select grading system" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ctcae_v5">CTCAE v5.0</SelectItem>
                          <SelectItem value="ctcae_v4">CTCAE v4.0</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Attribution Assessment *</Label>
                      <Textarea
                        placeholder="Describe how adverse event attribution will be assessed"
                        {...register('safetyMonitoring.adverseEventReporting.attribution', { required: true })}
                      />
                    </div>

                    <div>
                      <Label>Expedited Reporting Requirements *</Label>
                      <Textarea
                        placeholder="Specify requirements for expedited reporting of serious adverse events"
                        {...register('safetyMonitoring.adverseEventReporting.expeditedReporting', { required: true })}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Dose Modifications</h3>
                  <div className="border rounded-lg p-4 space-y-4">
                    <div>
                      <Label>Dose Modification Rules *</Label>
                      <div className="space-y-2">
                        {watch('safetyMonitoring.doseModifications.rules').map((_, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="flex-1">
                              <Input
                                placeholder="Enter dose modification rule"
                                {...register(`safetyMonitoring.doseModifications.rules.${index}`)}
                              />
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const current = getValues('safetyMonitoring.doseModifications.rules');
                                setValue(
                                  'safetyMonitoring.doseModifications.rules',
                                  current.filter((_, i) => i !== index)
                                );
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const current = getValues('safetyMonitoring.doseModifications.rules');
                            setValue('safetyMonitoring.doseModifications.rules', [...current, '']);
                          }}
                        >
                          + Add Rule
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label>Modification Guidelines *</Label>
                      <Textarea
                        placeholder="Provide general guidelines for dose modifications"
                        {...register('safetyMonitoring.doseModifications.guidelines', { required: true })}
                      />
                    </div>

                    <div>
                      <Label>Stopping Criteria *</Label>
                      <Textarea
                        placeholder="Define criteria for stopping treatment"
                        {...register('safetyMonitoring.doseModifications.stoppingCriteria', { required: true })}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Safety Review Committee</h3>
                  <div className="border rounded-lg p-4 space-y-4">
                    <div>
                      <Label>Committee Composition *</Label>
                      <Textarea
                        placeholder="Describe the composition of the safety review committee"
                        {...register('safetyMonitoring.safetyReviewCommittee.composition', { required: true })}
                      />
                    </div>

                    <div>
                      <Label>Meeting Frequency *</Label>
                      <Input
                        placeholder="e.g., Every 3 months"
                        {...register('safetyMonitoring.safetyReviewCommittee.meetingFrequency', { required: true })}
                      />
                    </div>

                    <div>
                      <Label>Review Criteria *</Label>
                      <Textarea
                        placeholder="Define the criteria for safety review"
                        {...register('safetyMonitoring.safetyReviewCommittee.reviewCriteria', { required: true })}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Risk Mitigation</h3>
                  <div className="border rounded-lg p-4 space-y-4">
                    <div>
                      <Label>Risk Mitigation Plan *</Label>
                      <Textarea
                        placeholder="Describe the risk mitigation strategies"
                        {...register('safetyMonitoring.riskMitigation', { required: true })}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Safety Parameters</h3>
                  <div className="space-y-2">
                    {watch('safetyMonitoring.safetyParameters').map((_, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="flex-1">
                          <Input
                            placeholder="Enter safety parameter"
                            {...register(`safetyMonitoring.safetyParameters.${index}`)}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const current = getValues('safetyMonitoring.safetyParameters');
                            setValue(
                              'safetyMonitoring.safetyParameters',
                              current.filter((_, i) => i !== index)
                            );
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const current = getValues('safetyMonitoring.safetyParameters');
                        setValue('safetyMonitoring.safetyParameters', [...current, '']);
                      }}
                    >
                      + Add Safety Parameter
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => setActiveTab('procedures')}>
                Back to Procedures
              </Button>
              <Button type="button" onClick={() => setActiveTab('data')}>
                Continue to Data Collection
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="data" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Collection</CardTitle>
                <CardDescription>Define the data collection plan for the study</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>eCRFs</Label>
                  <div className="space-y-3">
                    {watch('dataCollection.eCRFs').map((_, ecrfIndex) => (
                      <div key={ecrfIndex} className="flex items-start gap-3">
                        <div className="flex-1">
                          <Input
                            placeholder={`eCRF ${ecrfIndex + 1}`}
                            {...register(`dataCollection.eCRFs.${ecrfIndex}`)}
                          />
                        </div>
                        {ecrfIndex > 0 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const current = getValues('dataCollection.eCRFs');
                              setValue(
                                'dataCollection.eCRFs',
                                current.filter((_, i) => i !== ecrfIndex)
                              );
                            }}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                    
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const current = getValues('dataCollection.eCRFs');
                        setValue('dataCollection.eCRFs', [...current, '']);
                      }}
                    >
                      + Add eCRF
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label>Source Documents</Label>
                  <div className="space-y-3">
                    {watch('dataCollection.sourceDocuments').map((_, docIndex) => (
                      <div key={docIndex} className="flex items-start gap-3">
                        <div className="flex-1">
                          <Input
                            placeholder={`Source Document ${docIndex + 1}`}
                            {...register(`dataCollection.sourceDocuments.${docIndex}`)}
                          />
                        </div>
                        {docIndex > 0 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const current = getValues('dataCollection.sourceDocuments');
                              setValue(
                                'dataCollection.sourceDocuments',
                                current.filter((_, i) => i !== docIndex)
                              );
                            }}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                    
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const current = getValues('dataCollection.sourceDocuments');
                        setValue('dataCollection.sourceDocuments', [...current, '']);
                      }}
                    >
                      + Add Source Document
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label>Quality Control</Label>
                  <div className="space-y-3">
                    <div>
                      <Label>Monitoring Plan</Label>
                      <Input
                        placeholder="Enter the monitoring plan for data quality control"
                        {...register('dataCollection.qualityControl.monitoringPlan')}
                      />
                    </div>
                    <div>
                      <Label>Data Validation</Label>
                      <Input
                        placeholder="Enter the data validation process for data quality control"
                        {...register('dataCollection.qualityControl.dataValidation')}
                      />
                    </div>
                    <div>
                      <Label>Query Management</Label>
                      <Input
                        placeholder="Enter the query management process for data quality control"
                        {...register('dataCollection.qualityControl.queryManagement')}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label>Data Management</Label>
                  <div className="space-y-3">
                    <div>
                      <Label>Database</Label>
                      <Input
                        placeholder="Enter the database for data management"
                        {...register('dataCollection.dataManagement.database')}
                      />
                    </div>
                    <div>
                      <Label>Validation</Label>
                      <Input
                        placeholder="Enter the validation process for data management"
                        {...register('dataCollection.dataManagement.validation')}
                      />
                    </div>
                    <div>
                      <Label>Coding</Label>
                      <Input
                        placeholder="Enter the coding process for data management"
                        {...register('dataCollection.dataManagement.coding')}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => setActiveTab('safety')}>
                Back to Safety Monitoring
              </Button>
              <Button type="submit">Create Study</Button>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </Layout>
  );
};

export default StudyProtocolSetupPage;
