
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Plus, GripVertical, Trash2, Save } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

interface DocumentSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'heading' | 'subheading' | 'list' | 'table';
}

const ProtocolDocumentsPage = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [documentTitle, setDocumentTitle] = useState('');
  const [documentType, setDocumentType] = useState('protocol');
  const [sections, setSections] = useState<DocumentSection[]>([
    { 
      id: '1', 
      title: 'Introduction', 
      content: 'This protocol outlines the procedures for the clinical trial.',
      type: 'heading'
    },
    { 
      id: '2', 
      title: 'Study Objectives', 
      content: 'The primary objective of this study is to evaluate the efficacy and safety of the intervention.',
      type: 'text'
    },
    { 
      id: '3', 
      title: 'Eligibility Criteria', 
      content: 'Inclusion and exclusion criteria for study participants.',
      type: 'subheading'
    }
  ]);
  
  const { toast } = useToast();
  
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setSections(items);
  };
  
  const addSection = (type: DocumentSection['type']) => {
    const newSection: DocumentSection = {
      id: Date.now().toString(),
      title: `New ${type} section`,
      content: '',
      type
    };
    
    setSections([...sections, newSection]);
  };
  
  const updateSection = (id: string, field: keyof DocumentSection, value: string) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, [field]: value } : section
    ));
  };
  
  const removeSection = (id: string) => {
    setSections(sections.filter(section => section.id !== id));
  };
  
  const saveDocument = () => {
    if (!documentTitle) {
      toast({
        title: "Error",
        description: "Document title is required",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, we would save the document to a database
    toast({
      title: "Document Saved",
      description: `${documentTitle} has been saved successfully.`,
    });
  };
  
  return (
    <MainLayout>
      <PageHeader 
        title="Protocol Documents" 
        description="Create and manage study protocol documentation"
        breadcrumbs={[
          { label: 'Studies', link: '/studies' },
          { label: 'Protocol Documents' }
        ]}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-6">
        <TabsList>
          <TabsTrigger value="create">Create Document</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="library">Document Library</TabsTrigger>
        </TabsList>
        
        <TabsContent value="create" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Builder</CardTitle>
              <CardDescription>Create protocol documents with a drag-and-drop interface</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="doc-title">Document Title</Label>
                  <Input 
                    id="doc-title" 
                    value={documentTitle} 
                    onChange={(e) => setDocumentTitle(e.target.value)} 
                    placeholder="Enter document title" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doc-type">Document Type</Label>
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger id="doc-type">
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="protocol">Study Protocol</SelectItem>
                      <SelectItem value="icf">Informed Consent</SelectItem>
                      <SelectItem value="sop">Standard Operating Procedure</SelectItem>
                      <SelectItem value="worksheet">Study Worksheet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Add Section</h3>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => addSection('heading')}>
                    <Plus className="h-3 w-3 mr-1" /> Heading
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => addSection('subheading')}>
                    <Plus className="h-3 w-3 mr-1" /> Subheading
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => addSection('text')}>
                    <Plus className="h-3 w-3 mr-1" /> Text Block
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => addSection('list')}>
                    <Plus className="h-3 w-3 mr-1" /> List
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => addSection('table')}>
                    <Plus className="h-3 w-3 mr-1" /> Table
                  </Button>
                </div>
              </div>
              
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="document-sections">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4 mt-4"
                    >
                      {sections.map((section, index) => (
                        <Draggable key={section.id} draggableId={section.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="border rounded-md p-4"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center">
                                  <div {...provided.dragHandleProps} className="mr-2 cursor-move">
                                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                                  </div>
                                  <Select 
                                    value={section.type} 
                                    onValueChange={(value) => updateSection(section.id, 'type', value as DocumentSection['type'])}
                                  >
                                    <SelectTrigger className="w-[140px]">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="heading">Heading</SelectItem>
                                      <SelectItem value="subheading">Subheading</SelectItem>
                                      <SelectItem value="text">Text Block</SelectItem>
                                      <SelectItem value="list">List</SelectItem>
                                      <SelectItem value="table">Table</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => removeSection(section.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              
                              <div className="space-y-3">
                                <Input
                                  placeholder="Section title"
                                  value={section.title}
                                  onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                                  className="mb-2"
                                />
                                <Textarea
                                  placeholder="Section content"
                                  value={section.content}
                                  onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                                  rows={4}
                                />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Preview</Button>
              <Button onClick={saveDocument}>
                <Save className="h-4 w-4 mr-2" /> Save Document
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Templates</CardTitle>
              <CardDescription>Start with pre-built templates for common study documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: 'Study Protocol Template', description: 'Standard protocol format with required sections' },
                  { title: 'Informed Consent Form', description: 'Template with all required elements for participant consent' },
                  { title: 'Adverse Event Reporting', description: 'Documentation for reporting and tracking adverse events' },
                  { title: 'Data Management Plan', description: 'Template for data collection and management procedures' },
                  { title: 'Recruitment Materials', description: 'Templates for participant recruitment documents' },
                  { title: 'Statistical Analysis Plan', description: 'Template for study statistical methods' },
                ].map((template, index) => (
                  <Card key={index} className="h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-primary" />
                        {template.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">Use Template</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="library" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Library</CardTitle>
              <CardDescription>Browse and access all protocol documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium">No documents created yet</h3>
                <p className="text-muted-foreground mt-1 mb-4">
                  Start by creating a new document or use one of our templates
                </p>
                <Button onClick={() => setActiveTab('create')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Document
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default ProtocolDocumentsPage;
