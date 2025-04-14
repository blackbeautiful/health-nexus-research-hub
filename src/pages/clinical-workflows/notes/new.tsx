
import React from 'react';
import { ArrowLeft, Save, Clock, Send, AlertTriangle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  noteType: z.string().min(1, { message: "Note type is required" }),
  patientId: z.string().min(1, { message: "Patient is required" }),
  content: z.string().min(1, { message: "Note content is required" }),
  assignTo: z.string().optional(),
  status: z.enum(["draft", "complete"]),
  severity: z.enum(["none", "mild", "moderate", "severe"]).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const NewNotePage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      noteType: "",
      patientId: "",
      content: "",
      assignTo: "",
      status: "draft",
      severity: "none",
    },
  });
  
  const watchNoteType = form.watch("noteType");
  
  const onSubmit = (values: FormValues) => {
    // In a real app, we would save the note to a database
    console.log("Submitted values:", values);
    
    toast({
      title: values.status === "draft" ? "Note saved as draft" : "Note completed",
      description: values.status === "draft" 
        ? "Your note has been saved. You can continue editing it later."
        : "Your note has been saved and is now complete.",
    });
    
    navigate("/clinical-workflows/notes");
  };
  
  return (
    <Layout title="New Clinical Note">
      <PageHeader 
        title="New Clinical Note" 
        description="Create a new patient clinical note"
        breadcrumbs={[
          { label: 'Clinical Workflows', link: '/clinical-workflows' },
          { label: 'Clinical Notes', link: '/clinical-workflows/notes' },
          { label: 'New Note' }
        ]}
      />
      
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate("/clinical-workflows/notes")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Notes
        </Button>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Note Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="noteType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Note Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select note type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="consultation">Consultation Note</SelectItem>
                          <SelectItem value="progress">Progress Note</SelectItem>
                          <SelectItem value="follow-up">Follow-up Note</SelectItem>
                          <SelectItem value="treatment-response">Treatment Response</SelectItem>
                          <SelectItem value="adverse-event">Adverse Event Report</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="patientId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patient</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select patient" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="PT-1024">Sarah Parker (PT-1024)</SelectItem>
                          <SelectItem value="PT-1056">John Davis (PT-1056)</SelectItem>
                          <SelectItem value="PT-1078">Emma Thompson (PT-1078)</SelectItem>
                          <SelectItem value="PT-1085">Linda Wilson (PT-1085)</SelectItem>
                          <SelectItem value="PT-1099">Robert Garcia (PT-1099)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a title for this note" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note Content</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter clinical notes here..." 
                        className="min-h-[200px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {watchNoteType === "adverse-event" && (
                <FormField
                  control={form.control}
                  name="severity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Severity</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="mild" id="mild" />
                            <Label htmlFor="mild">Mild (Grade 1)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="moderate" id="moderate" />
                            <Label htmlFor="moderate">Moderate (Grade 2)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="severe" id="severe" />
                            <Label htmlFor="severe">Severe (Grade 3+)</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              <FormField
                control={form.control}
                name="assignTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assign To (Optional)</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Assign to another provider" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="dr-martinez">Dr. Rebecca Martinez</SelectItem>
                        <SelectItem value="dr-wilson">Dr. James Wilson</SelectItem>
                        <SelectItem value="dr-lopez">Dr. Anna Lopez</SelectItem>
                        <SelectItem value="nurse-chen">Nurse Michael Chen</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.setValue("status", "draft")}
            >
              <Clock className="mr-2 h-4 w-4" />
              Save as Draft
            </Button>
            
            <div className="flex gap-3">
              <Button
                type="submit"
                variant="outline"
                onClick={() => form.setValue("status", "draft")}
              >
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              
              <Button
                type="submit"
                onClick={() => form.setValue("status", "complete")}
              >
                <Send className="mr-2 h-4 w-4" />
                Complete &amp; Submit
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </Layout>
  );
};

export default NewNotePage;
