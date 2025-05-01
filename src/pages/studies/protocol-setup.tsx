
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Save, FileText, User, Calendar, Building2, FlaskRound } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const protocolSchema = z.object({
  title: z.string().min(5, { message: 'Protocol title must be at least 5 characters' }),
  identifier: z.string().min(3, { message: 'Identifier is required' }),
  version: z.string().min(1, { message: 'Version is required' }),
  phase: z.enum(['1', '2', '3', '4']),
  description: z.string().min(20, { message: 'Description must be at least 20 characters' }),
  primaryObjective: z.string().min(10, { message: 'Primary objective is required' }),
  secondaryObjectives: z.string().optional(),
  inclusionCriteria: z.string().min(10, { message: 'Inclusion criteria are required' }),
  exclusionCriteria: z.string().min(10, { message: 'Exclusion criteria are required' }),
  sponsorName: z.string().min(2, { message: 'Sponsor name is required' }),
  sponsorContact: z.string().email({ message: 'Valid sponsor email is required' }),
  startDate: z.string().min(1, { message: 'Start date is required' }),
  endDate: z.string().min(1, { message: 'End date is required' }),
});

type ProtocolFormValues = z.infer<typeof protocolSchema>;

const ProtocolSetupPage = () => {
  const [activeTab, setActiveTab] = useState('details');
  const { toast } = useToast();
  
  const form = useForm<ProtocolFormValues>({
    resolver: zodResolver(protocolSchema),
    defaultValues: {
      title: '',
      identifier: '',
      version: '1.0',
      phase: '2',
      description: '',
      primaryObjective: '',
      secondaryObjectives: '',
      inclusionCriteria: '',
      exclusionCriteria: '',
      sponsorName: '',
      sponsorContact: '',
      startDate: '',
      endDate: '',
    },
  });

  const onSubmit = (data: ProtocolFormValues) => {
    console.log('Protocol data submitted:', data);
    toast({
      title: "Protocol saved",
      description: "Protocol has been successfully saved.",
    });
  };

  return (
    <Layout title="Protocol Setup">
      <PageHeader
        title="Study Protocol Setup"
        description="Create and manage clinical research protocols"
        breadcrumbs={[
          { label: 'Studies', link: '/studies' }, // Fixed: Changed href to link
          { label: 'Protocol Setup' }
        ]}
        action={{
          label: 'Save Protocol',
          icon: Save,
          onClick: () => form.handleSubmit(onSubmit)()
        }}
      />

      <Card className="mb-6">
        <CardContent className="p-6">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 w-full justify-start overflow-x-auto">
              <TabsTrigger value="details" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Protocol Details
              </TabsTrigger>
              <TabsTrigger value="criteria" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Eligibility Criteria
              </TabsTrigger>
              <TabsTrigger value="timeline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Timeline
              </TabsTrigger>
              <TabsTrigger value="sponsor" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Sponsor
              </TabsTrigger>
              <TabsTrigger value="objectives" className="flex items-center gap-2">
                <FlaskRound className="h-4 w-4" />
                Objectives
              </TabsTrigger>
            </TabsList>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <TabsContent value="details" className="space-y-4 mt-2">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Protocol Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter protocol title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="identifier"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Protocol Identifier</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. ONCO-2025-001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="version"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Protocol Version</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 1.0" {...field} />
                          </FormControl>
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
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select phase" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">Phase 1</SelectItem>
                              <SelectItem value="2">Phase 2</SelectItem>
                              <SelectItem value="3">Phase 3</SelectItem>
                              <SelectItem value="4">Phase 4</SelectItem>
                            </SelectContent>
                          </Select>
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
                        <FormLabel>Study Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter a detailed description of the study protocol" 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="objectives" className="space-y-4 mt-2">
                  <FormField
                    control={form.control}
                    name="primaryObjective"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Objective</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter the primary objective of this study" 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
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
                            placeholder="Enter any secondary objectives (optional)" 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="criteria" className="space-y-4 mt-2">
                  <FormField
                    control={form.control}
                    name="inclusionCriteria"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Inclusion Criteria</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter inclusion criteria for participants" 
                            className="min-h-[150px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          List all criteria that participants must meet to be included in the study
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
                        <FormLabel>Exclusion Criteria</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter exclusion criteria for participants" 
                            className="min-h-[150px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          List all criteria that would exclude participants from the study
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="timeline" className="space-y-4 mt-2">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Study Start Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estimated End Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="sponsor" className="space-y-4 mt-2">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="sponsorName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sponsor Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter sponsor organization name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="sponsorContact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sponsor Contact Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter contact email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
                
                <div className="flex justify-end pt-4">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Protocol
                  </Button>
                </div>
              </form>
            </Form>
          </Tabs>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default ProtocolSetupPage;
