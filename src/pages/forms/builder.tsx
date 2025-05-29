
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Save, Eye, Copy, Trash2, Edit, FileText, Calendar } from 'lucide-react';

const FormBuilderPage = () => {
  const [forms, setForms] = useState([
    {
      id: 'F001',
      name: 'Patient Intake Form',
      description: 'Standard patient registration and medical history form',
      status: 'Published',
      created: '2025-01-10',
      lastModified: '2025-01-14',
      responses: 45,
      fields: 12
    },
    {
      id: 'F002',
      name: 'Adverse Event Report',
      description: 'Form for reporting adverse events during clinical trials',
      status: 'Draft',
      created: '2025-01-12',
      lastModified: '2025-01-15',
      responses: 0,
      fields: 8
    },
    {
      id: 'F003',
      name: 'Quality of Life Assessment',
      description: 'Patient-reported outcome measure for quality of life',
      status: 'Published',
      created: '2025-01-08',
      lastModified: '2025-01-13',
      responses: 23,
      fields: 15
    }
  ]);

  const [selectedForm, setSelectedForm] = useState(null);
  const [isBuilding, setIsBuilding] = useState(false);

  const getStatusBadge = (status: string) => {
    return status === 'Published' ? 
      <Badge className="bg-green-100 text-green-800">Published</Badge> : 
      <Badge variant="secondary">Draft</Badge>;
  };

  const handleCreateForm = () => {
    setIsBuilding(true);
    setSelectedForm(null);
  };

  const handleEditForm = (form: any) => {
    setSelectedForm(form);
    setIsBuilding(true);
  };

  const handleDeleteForm = (formId: string) => {
    setForms(forms.filter(f => f.id !== formId));
  };

  if (isBuilding) {
    return (
      <Layout title="Form Builder">
        <div className="space-y-6">
          {/* Builder Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">
                {selectedForm ? 'Edit Form' : 'Create New Form'}
              </h1>
              <p className="text-muted-foreground">Design and configure your data collection form</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsBuilding(false)}>
                Cancel
              </Button>
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Form
              </Button>
            </div>
          </div>

          {/* Form Builder Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form Properties */}
            <Card>
              <CardHeader>
                <CardTitle>Form Properties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Form Name</label>
                  <Input defaultValue={selectedForm?.name || ''} placeholder="Enter form name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea 
                    defaultValue={selectedForm?.description || ''} 
                    placeholder="Describe the purpose of this form" 
                    rows={3} 
                  />
                </div>
              </CardContent>
            </Card>

            {/* Field Types */}
            <Card>
              <CardHeader>
                <CardTitle>Field Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Text Input
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Text Area
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Select Dropdown
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Radio Buttons
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Checkboxes
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Date Picker
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  File Upload
                </Button>
              </CardContent>
            </Card>

            {/* Form Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Form Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Drag fields here to build your form
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Form Builder">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Form Builder</h1>
            <p className="text-muted-foreground">Create and manage data collection forms</p>
          </div>
          <Button onClick={handleCreateForm}>
            <Plus className="h-4 w-4 mr-2" />
            Create Form
          </Button>
        </div>

        {/* Forms Management */}
        <Tabs defaultValue="forms" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="forms">My Forms</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="forms" className="space-y-4">
            <div className="space-y-4">
              {forms.map((form) => (
                <Card key={form.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{form.name}</CardTitle>
                        <CardDescription>{form.description}</CardDescription>
                      </div>
                      {getStatusBadge(form.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Fields:</span> {form.fields}
                        </div>
                        <div>
                          <span className="font-medium">Responses:</span> {form.responses}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Created: {form.created}
                        </div>
                        <div className="flex items-center">
                          <Edit className="h-4 w-4 mr-1" />
                          Modified: {form.lastModified}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEditForm(form)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteForm(form.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Form Templates
                </CardTitle>
                <CardDescription>Pre-built forms you can customize</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Form templates will be available here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default FormBuilderPage;
