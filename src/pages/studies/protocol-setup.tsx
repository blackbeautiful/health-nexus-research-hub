
import React from 'react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
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

const StudyProtocolSetupPage = () => {
  return (
    <Layout title="Study Protocol Setup">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4 -ml-2">
          <Link to="/studies">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Studies
          </Link>
        </Button>
        
        <PageHeader 
          title="Create New Study Protocol" 
          description="Set up the parameters for your clinical research study"
          breadcrumbs={[
            { label: 'Studies', link: '/studies' },
            { label: 'New Protocol' }
          ]}
        />
      </div>
      
      <Tabs defaultValue="basic-info" className="space-y-6">
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <TabsList className="w-full justify-start rounded-none border-b-0 p-0">
                <TabsTrigger 
                  value="basic-info" 
                  className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-health-primary px-6 py-3"
                >
                  Basic Information
                </TabsTrigger>
                <TabsTrigger 
                  value="design" 
                  className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-health-primary px-6 py-3"
                >
                  Study Design
                </TabsTrigger>
                <TabsTrigger 
                  value="sites" 
                  className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-health-primary px-6 py-3"
                >
                  Sites & Investigators
                </TabsTrigger>
                <TabsTrigger 
                  value="eligibility" 
                  className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-health-primary px-6 py-3"
                >
                  Eligibility Criteria
                </TabsTrigger>
                <TabsTrigger 
                  value="schedule" 
                  className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-health-primary px-6 py-3"
                >
                  Visit Schedule
                </TabsTrigger>
              </TabsList>
            </div>
          </CardContent>
        </Card>
        
        <TabsContent value="basic-info">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Study Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="study-title">Study Title *</Label>
                    <Input 
                      id="study-title" 
                      placeholder="Enter the full title of the study" 
                    />
                    <p className="text-xs text-muted-foreground">
                      The official title that will appear on all study documentation
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="short-title">Short Title/Acronym</Label>
                    <Input 
                      id="short-title" 
                      placeholder="Enter a short title or acronym" 
                    />
                    <p className="text-xs text-muted-foreground">
                      A brief, easily recognizable name for the study
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="study-description">Study Description *</Label>
                  <Textarea 
                    id="study-description" 
                    placeholder="Provide a brief overview of the study objectives and methodology"
                    rows={4} 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="study-phase">Study Phase *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select phase" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="phase-0">Phase 0</SelectItem>
                        <SelectItem value="phase-1">Phase I</SelectItem>
                        <SelectItem value="phase-1b">Phase Ib</SelectItem>
                        <SelectItem value="phase-2">Phase II</SelectItem>
                        <SelectItem value="phase-2b">Phase IIb</SelectItem>
                        <SelectItem value="phase-3">Phase III</SelectItem>
                        <SelectItem value="phase-4">Phase IV</SelectItem>
                        <SelectItem value="na">Not Applicable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="study-type">Study Type *</Label>
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="therapeutic-area">Therapeutic Area *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="breast">Breast Cancer</SelectItem>
                        <SelectItem value="lung">Lung Cancer</SelectItem>
                        <SelectItem value="colorectal">Colorectal Cancer</SelectItem>
                        <SelectItem value="prostate">Prostate Cancer</SelectItem>
                        <SelectItem value="leukemia">Leukemia</SelectItem>
                        <SelectItem value="lymphoma">Lymphoma</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="target-enrollment">Target Enrollment *</Label>
                    <Input 
                      id="target-enrollment" 
                      type="number" 
                      placeholder="Enter target number of participants" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="enrollment-period">Enrollment Period (months) *</Label>
                    <Input 
                      id="enrollment-period" 
                      type="number" 
                      placeholder="Enter enrollment duration" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">Study Timeline</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="estimated-start">Estimated Start Date *</Label>
                    <Input 
                      id="estimated-start" 
                      type="date" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="estimated-completion">Estimated Completion Date *</Label>
                    <Input 
                      id="estimated-completion" 
                      type="date" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">Study Contacts</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="primary-investigator">Primary Investigator *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select investigator" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dr-martinez">Dr. Rebecca Martinez</SelectItem>
                        <SelectItem value="dr-wilson">Dr. James Wilson</SelectItem>
                        <SelectItem value="dr-jackson">Dr. Sarah Jackson</SelectItem>
                        <SelectItem value="dr-brown">Dr. Michael Brown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="study-coordinator">Study Coordinator *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select coordinator" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lisa-chen">Lisa Chen</SelectItem>
                        <SelectItem value="robert-patel">Robert Patel</SelectItem>
                        <SelectItem value="maria-garcia">Maria Garcia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end mt-6 space-x-4">
            <Button variant="outline">Save as Draft</Button>
            <Button>
              Continue to Study Design
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="design">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">Study Design Content</h3>
                <p className="text-muted-foreground mt-2">
                  Complete the basic information tab first to continue with study design
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sites">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">Sites & Investigators Content</h3>
                <p className="text-muted-foreground mt-2">
                  Complete the previous tabs first to continue
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="eligibility">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">Eligibility Criteria Content</h3>
                <p className="text-muted-foreground mt-2">
                  Complete the previous tabs first to continue
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">Visit Schedule Content</h3>
                <p className="text-muted-foreground mt-2">
                  Complete the previous tabs first to continue
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default StudyProtocolSetupPage;
