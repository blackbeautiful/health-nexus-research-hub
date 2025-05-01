import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Plus, Trash2, Save, FileText, Users, Building2, CalendarDays, CheckCircle2, AlertTriangle, Clipboard, FileQuestion, Microscope, Pill, Activity, Clock, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const StudyProtocolSetupPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [procedures, setProcedures] = useState<Array<{name: string, description: string, timing: string, required: boolean}>>([
    { name: 'Blood Draw', description: 'Collection of blood samples for analysis', timing: 'Baseline, Week 4, Week 12', required: true },
    { name: 'Physical Examination', description: 'Complete physical assessment', timing: 'Screening, Week 12, End of Study', required: true },
    { name: 'Quality of Life Questionnaire', description: 'Patient-reported outcomes assessment', timing: 'Baseline, Week 4, Week 8, Week 12', required: false }
  ]);
  
  const [eligibilityCriteria, setEligibilityCriteria] = useState<Array<{type: 'inclusion' | 'exclusion', description: string}>>([
    { type: 'inclusion', description: 'Age ≥ 18 years' },
    { type: 'inclusion', description: 'Histologically confirmed diagnosis of target condition' },
    { type: 'inclusion', description: 'ECOG performance status 0-1' },
    { type: 'exclusion', description: 'Prior treatment with investigational agents within 30 days' },
    { type: 'exclusion', description: 'Known hypersensitivity to study drug components' },
    { type: 'exclusion', description: 'Pregnant or breastfeeding women' }
  ]);

  const handleSaveProtocol = () => {
    toast({
      title: "Protocol saved",
      description: "Your study protocol has been saved successfully.",
    });
  };

  const handleAddProcedure = () => {
    setProcedures([...procedures, { name: '', description: '', timing: '', required: false }]);
  };

  const handleRemoveProcedure = (index: number) => {
    setProcedures(procedures.filter((_, i) => i !== index));
  };

  const handleProcedureChange = (index: number, field: string, value: any) => {
    const updatedProcedures = [...procedures];
    updatedProcedures[index] = { ...updatedProcedures[index], [field]: value };
    setProcedures(updatedProcedures);
  };

  const handleAddCriteria = (type: 'inclusion' | 'exclusion') => {
    setEligibilityCriteria([...eligibilityCriteria, { type, description: '' }]);
  };

  const handleRemoveCriteria = (index: number) => {
    setEligibilityCriteria(eligibilityCriteria.filter((_, i) => i !== index));
  };

  const handleCriteriaChange = (index: number, description: string) => {
    const updatedCriteria = [...eligibilityCriteria];
    updatedCriteria[index] = { ...updatedCriteria[index], description };
    setEligibilityCriteria(updatedCriteria);
  };

  return (
    <Layout title="Protocol Setup">
      <PageHeader 
        title="Study Protocol Setup" 
        description="Create and configure your clinical trial protocol"
        breadcrumbs={[
          { label: 'Studies', href: '/studies' },
          { label: 'Protocol Setup' }
        ]}
      />

      <div className="mb-6">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
            <TabsTrigger value="procedures">Procedures</TabsTrigger>
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Information</CardTitle>
                <CardDescription>
                  Basic information about your clinical trial protocol
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="protocol-id">Protocol ID</Label>
                    <Input id="protocol-id" placeholder="e.g., ONCO-2025-001" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="protocol-title">Protocol Title</Label>
                    <Input id="protocol-title" placeholder="Enter the full title of your study" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="short-title">Short Title</Label>
                  <Input id="short-title" placeholder="A shorter title for easy reference" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Study Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Provide a brief description of the study"
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Study Phase</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select phase" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="phase-1">Phase I</SelectItem>
                        <SelectItem value="phase-2">Phase II</SelectItem>
                        <SelectItem value="phase-3">Phase III</SelectItem>
                        <SelectItem value="phase-4">Phase IV</SelectItem>
                        <SelectItem value="phase-1-2">Phase I/II</SelectItem>
                        <SelectItem value="phase-2-3">Phase II/III</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Study Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="interventional">Interventional</SelectItem>
                        <SelectItem value="observational">Observational</SelectItem>
                        <SelectItem value="expanded-access">Expanded Access</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Therapeutic Area</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select therapeutic area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oncology">Oncology</SelectItem>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="neurology">Neurology</SelectItem>
                      <SelectItem value="immunology">Immunology</SelectItem>
                      <SelectItem value="infectious-diseases">Infectious Diseases</SelectItem>
                      <SelectItem value="endocrinology">Endocrinology</SelectItem>
                      <SelectItem value="gastroenterology">Gastroenterology</SelectItem>
                      <SelectItem value="pulmonology">Pulmonology</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Principal Investigator</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select principal investigator" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dr-martinez">Dr. Rebecca Martinez</SelectItem>
                      <SelectItem value="dr-wilson">Dr. James Wilson</SelectItem>
                      <SelectItem value="dr-jackson">Dr. Sarah Jackson</SelectItem>
                      <SelectItem value="dr-brown">Dr. Michael Brown</SelectItem>
                      <SelectItem value="dr-adams">Dr. Jennifer Adams</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="blinded" />
                    <Label htmlFor="blinded">Blinded Study</Label>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Blinding Type</Label>
                  <RadioGroup defaultValue="double-blind">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="open-label" id="open-label" />
                        <Label htmlFor="open-label">Open Label</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="single-blind" id="single-blind" />
                        <Label htmlFor="single-blind">Single Blind</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="double-blind" id="double-blind" />
                        <Label htmlFor="double-blind">Double Blind</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="triple-blind" id="triple-blind" />
                        <Label htmlFor="triple-blind">Triple Blind</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button onClick={() => setActiveTab('eligibility')}>Next: Eligibility <ChevronRight className="ml-2 h-4 w-4" /></Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="eligibility">
            <Card>
              <CardHeader>
                <CardTitle>Eligibility Criteria</CardTitle>
                <CardDescription>
                  Define inclusion and exclusion criteria for study participants
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Inclusion Criteria</h3>
                    <Button variant="outline" size="sm" onClick={() => handleAddCriteria('inclusion')}>
                      <Plus className="h-4 w-4 mr-1" /> Add Criterion
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {eligibilityCriteria
                      .filter(criterion => criterion.type === 'inclusion')
                      .map((criterion, index) => {
                        const criterionIndex = eligibilityCriteria.findIndex(c => c === criterion);
                        return (
                          <div key={index} className="flex items-center space-x-2">
                            <Input 
                              value={criterion.description} 
                              onChange={(e) => handleCriteriaChange(criterionIndex, e.target.value)}
                              placeholder="Enter inclusion criterion"
                              className="flex-1"
                            />
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleRemoveCriteria(criterionIndex)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Exclusion Criteria</h3>
                    <Button variant="outline" size="sm" onClick={() => handleAddCriteria('exclusion')}>
                      <Plus className="h-4 w-4 mr-1" /> Add Criterion
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {eligibilityCriteria
                      .filter(criterion => criterion.type === 'exclusion')
                      .map((criterion, index) => {
                        const criterionIndex = eligibilityCriteria.findIndex(c => c === criterion);
                        return (
                          <div key={index} className="flex items-center space-x-2">
                            <Input 
                              value={criterion.description} 
                              onChange={(e) => handleCriteriaChange(criterionIndex, e.target.value)}
                              placeholder="Enter exclusion criterion"
                              className="flex-1"
                            />
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleRemoveCriteria(criterionIndex)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="additional-criteria">Additional Eligibility Notes</Label>
                  <Textarea 
                    id="additional-criteria" 
                    placeholder="Any additional notes regarding eligibility criteria"
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab('general')}>Previous</Button>
                <Button onClick={() => setActiveTab('procedures')}>Next: Procedures <ChevronRight className="ml-2 h-4 w-4" /></Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="procedures">
            <Card>
              <CardHeader>
                <CardTitle>Study Procedures</CardTitle>
                <CardDescription>
                  Define the procedures and assessments to be performed during the study
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {procedures.map((procedure, index) => (
                    <div key={index} className="p-4 border rounded-md space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-md font-medium">Procedure {index + 1}</h3>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleRemoveProcedure(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`procedure-name-${index}`}>Procedure Name</Label>
                          <Input 
                            id={`procedure-name-${index}`} 
                            value={procedure.name}
                            onChange={(e) => handleProcedureChange(index, 'name', e.target.value)}
                            placeholder="e.g., Blood Draw"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`procedure-timing-${index}`}>Timing</Label>
                          <Input 
                            id={`procedure-timing-${index}`} 
                            value={procedure.timing}
                            onChange={(e) => handleProcedureChange(index, 'timing', e.target.value)}
                            placeholder="e.g., Baseline, Week 4, Week 12"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`procedure-description-${index}`}>Description</Label>
                        <Textarea 
                          id={`procedure-description-${index}`} 
                          value={procedure.description}
                          onChange={(e) => handleProcedureChange(index, 'description', e.target.value)}
                          placeholder="Describe the procedure"
                          className="min-h-[80px]"
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`procedure-required-${index}`}
                          checked={procedure.required}
                          onCheckedChange={(checked) => handleProcedureChange(index, 'required', checked)}
                        />
                        <Label htmlFor={`procedure-required-${index}`}>Required Procedure</Label>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" onClick={handleAddProcedure}>
                    <Plus className="h-4 w-4 mr-1" /> Add Procedure
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab('eligibility')}>Previous</Button>
                <Button onClick={() => setActiveTab('endpoints')}>Next: Endpoints <ChevronRight className="ml-2 h-4 w-4" /></Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="endpoints">
            <Card>
              <CardHeader>
                <CardTitle>Study Endpoints</CardTitle>
                <CardDescription>
                  Define primary, secondary, and exploratory endpoints
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Primary Endpoint</h3>
                  <div className="space-y-2">
                    <Label htmlFor="primary-endpoint">Definition</Label>
                    <Textarea 
                      id="primary-endpoint" 
                      placeholder="Define the primary endpoint of the study"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Secondary Endpoints</h3>
                  <div className="space-y-2">
                    <Label htmlFor="secondary-endpoints">Definition</Label>
                    <Textarea 
                      id="secondary-endpoints" 
                      placeholder="Define the secondary endpoints of the study"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Exploratory Endpoints</h3>
                  <div className="space-y-2">
                    <Label htmlFor="exploratory-endpoints">Definition</Label>
                    <Textarea 
                      id="exploratory-endpoints" 
                      placeholder="Define any exploratory endpoints of the study"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Statistical Analysis Plan</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not-started">Not Started</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab('procedures')}>Previous</Button>
                <Button onClick={() => setActiveTab('documents')}>Next: Documents <ChevronRight className="ml-2 h-4 w-4" /></Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Protocol Documents</CardTitle>
                <CardDescription>
                  Upload and manage protocol-related documents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-md">Protocol Document</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-md">
                        <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">Drag and drop your protocol document here</p>
                        <Button variant="secondary" size="sm">Browse Files</Button>
                      </div>
                    </CardContent>
                    <CardFooter className="text-xs text-muted-foreground">
                      Accepted formats: PDF, DOCX, DOC (Max: 10MB)
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-md">Informed Consent Form</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-md">
                        <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">Drag and drop your ICF document here</p>
                        <Button variant="secondary" size="sm">Browse Files</Button>
                      </div>
                    </CardContent>
                    <CardFooter className="text-xs text-muted-foreground">
                      Accepted formats: PDF, DOCX, DOC (Max: 10MB)
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-md">Case Report Forms</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-md">
                        <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">Drag and drop your CRF documents here</p>
                        <Button variant="secondary" size="sm">Browse Files</Button>
                      </div>
                    </CardContent>
                    <CardFooter className="text-xs text-muted-foreground">
                      Accepted formats: PDF, XLSX, XLS (Max: 10MB)
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-md">Other Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-md">
                        <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">Drag and drop additional documents here</p>
                        <Button variant="secondary" size="sm">Browse Files</Button>
                      </div>
                    </CardContent>
                    <CardFooter className="text-xs text-muted-foreground">
                      Accepted formats: PDF, DOCX, XLSX, PPT (Max: 20MB)
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab('endpoints')}>Previous</Button>
                <Button onClick={handleSaveProtocol}>
                  <Save className="mr-2 h-4 w-4" /> Save Protocol
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="fixed bottom-4 right-4 flex space-x-2">
        <Button variant="outline" onClick={() => setActiveTab('general')}>Cancel</Button>
        <Button onClick={handleSaveProtocol}>
          <Save className="mr-2 h-4 w-4" /> Save Protocol
        </Button>
      </div>
    </Layout>
  );
};

export default StudyProtocolSetupPage;
