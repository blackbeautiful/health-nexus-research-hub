
import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Save, Eye, Copy, Trash2, Edit, FileText, Calendar, GripVertical, Type, List, Calendar as CalendarIcon, Upload } from 'lucide-react';

interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date' | 'file';
  label: string;
  required: boolean;
  options?: string[];
}

interface SortableFieldProps {
  field: FormField;
  onDelete: (id: string) => void;
}

const SortableField: React.FC<SortableFieldProps> = ({ field, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab hover:cursor-grabbing p-1 text-gray-400 hover:text-gray-600"
          >
            <GripVertical className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-medium">{field.label}</span>
              {field.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
              <Badge variant="outline" className="text-xs">{field.type}</Badge>
            </div>
            {field.type === 'text' && <Input placeholder={field.label} disabled />}
            {field.type === 'textarea' && <Textarea placeholder={field.label} disabled rows={2} />}
            {field.type === 'select' && (
              <select className="w-full border rounded p-2" disabled>
                <option>Select an option...</option>
                {field.options?.map((option, i) => (
                  <option key={i} value={option}>{option}</option>
                ))}
              </select>
            )}
            {field.type === 'date' && <Input type="date" disabled />}
            {field.type === 'file' && <Input type="file" disabled />}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(field.id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

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
    }
  ]);

  const [selectedForm, setSelectedForm] = useState(null);
  const [isBuilding, setIsBuilding] = useState(false);
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const fieldTypes = [
    { type: 'text', label: 'Text Input', icon: Type },
    { type: 'textarea', label: 'Text Area', icon: FileText },
    { type: 'select', label: 'Select Dropdown', icon: List },
    { type: 'date', label: 'Date Picker', icon: CalendarIcon },
    { type: 'file', label: 'File Upload', icon: Upload },
  ];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setFormFields((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addField = (type: string) => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type: type as FormField['type'],
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      required: false,
      options: type === 'select' ? ['Option 1', 'Option 2', 'Option 3'] : undefined,
    };
    setFormFields([...formFields, newField]);
  };

  const deleteField = (fieldId: string) => {
    setFormFields(formFields.filter(field => field.id !== fieldId));
  };

  const getStatusBadge = (status: string) => {
    return status === 'Published' ? 
      <Badge className="bg-green-100 text-green-800">Published</Badge> : 
      <Badge variant="secondary">Draft</Badge>;
  };

  const handleCreateForm = () => {
    setIsBuilding(true);
    setSelectedForm(null);
    setFormFields([]);
    setFormName('');
    setFormDescription('');
  };

  const handleEditForm = (form: any) => {
    setSelectedForm(form);
    setIsBuilding(true);
    setFormName(form.name);
    setFormDescription(form.description);
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Form Properties */}
            <Card>
              <CardHeader>
                <CardTitle>Form Properties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Form Name</label>
                  <Input 
                    value={formName} 
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Enter form name" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea 
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
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
                <CardDescription>Drag or click to add fields</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {fieldTypes.map((fieldType) => (
                  <Button 
                    key={fieldType.type}
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => addField(fieldType.type)}
                  >
                    <fieldType.icon className="h-4 w-4 mr-2" />
                    {fieldType.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Form Builder Canvas */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Form Builder</CardTitle>
                <CardDescription>Drag to reorder fields</CardDescription>
              </CardHeader>
              <CardContent>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext items={formFields} strategy={verticalListSortingStrategy}>
                    <div className="space-y-4 min-h-[400px]">
                      {formFields.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                          <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No fields added yet</p>
                          <p className="text-sm">Click on field types to add them to your form</p>
                        </div>
                      ) : (
                        formFields.map((field) => (
                          <SortableField
                            key={field.id}
                            field={field}
                            onDelete={deleteField}
                          />
                        ))
                      )}
                    </div>
                  </SortableContext>
                </DndContext>
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
