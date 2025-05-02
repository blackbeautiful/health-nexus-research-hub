
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowDown, 
  ArrowUp, 
  Check, 
  Copy, 
  Edit, 
  Eye, 
  GripVertical, 
  Plus, 
  Save, 
  Settings, 
  Trash, 
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export interface FormField {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  description?: string;
  required: boolean;
  options?: string[];
  defaultValue?: string | boolean | string[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number;
    max?: number;
  };
}

export interface FormBuilderProps {
  initialFields?: FormField[];
  onSave?: (fields: FormField[]) => void;
  readOnly?: boolean;
}

const FormBuilder = ({ initialFields = [], onSave, readOnly = false }: FormBuilderProps) => {
  const [fields, setFields] = useState<FormField[]>(initialFields);
  const [activeTab, setActiveTab] = useState('edit');
  const [editingField, setEditingField] = useState<FormField | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const generateId = () => `field_${Date.now()}`;

  const addNewField = (type: string) => {
    const newField: FormField = {
      id: generateId(),
      type,
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      required: false,
    };
    
    // Add specific properties based on field type
    switch (type) {
      case 'select':
      case 'checkbox-group':
      case 'radio-group':
        newField.options = ['Option 1', 'Option 2', 'Option 3'];
        break;
      case 'number':
        newField.validation = { min: 0 };
        break;
    }
    
    setFields([...fields, newField]);
    
    toast({
      title: "Field added",
      description: `A new ${type} field has been added to the form.`
    });
  };

  const openEditDialog = (field: FormField) => {
    setEditingField({ ...field });
    setEditDialogOpen(true);
  };

  const saveFieldChanges = () => {
    if (!editingField) return;
    
    const updatedFields = fields.map(field => 
      field.id === editingField.id ? editingField : field
    );
    
    setFields(updatedFields);
    setEditDialogOpen(false);
    
    toast({
      title: "Field updated",
      description: "Your changes have been saved."
    });
  };

  const deleteField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
    
    toast({
      title: "Field removed",
      description: "The field has been removed from the form."
    });
  };

  const duplicateField = (field: FormField) => {
    const newField = {
      ...field,
      id: generateId(),
      label: `${field.label} (Copy)`
    };
    
    setFields([...fields, newField]);
    
    toast({
      title: "Field duplicated",
      description: "A copy of the field has been created."
    });
  };

  const moveField = (id: string, direction: 'up' | 'down') => {
    const index = fields.findIndex(field => field.id === id);
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === fields.length - 1)
    ) {
      return;
    }
    
    const newFields = [...fields];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    [newFields[index], newFields[newIndex]] = [newFields[newIndex], newFields[index]];
    
    setFields(newFields);
  };

  const handleAddOption = () => {
    if (!editingField || !editingField.options) return;
    
    setEditingField({
      ...editingField,
      options: [...editingField.options, `Option ${editingField.options.length + 1}`]
    });
  };

  const handleRemoveOption = (index: number) => {
    if (!editingField || !editingField.options) return;
    
    const newOptions = [...editingField.options];
    newOptions.splice(index, 1);
    
    setEditingField({
      ...editingField,
      options: newOptions
    });
  };

  const handleChangeOption = (index: number, value: string) => {
    if (!editingField || !editingField.options) return;
    
    const newOptions = [...editingField.options];
    newOptions[index] = value;
    
    setEditingField({
      ...editingField,
      options: newOptions
    });
  };

  const handleSaveForm = () => {
    if (onSave) {
      onSave(fields);
    }
    
    toast({
      title: "Form saved",
      description: "Your form has been saved successfully."
    });
  };

  // Render a preview of the field based on its type
  const renderFieldPreview = (field: FormField) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'url':
        return (
          <div className="space-y-2">
            <Label>{field.label} {field.required && <span className="text-destructive">*</span>}</Label>
            <Input 
              type={field.type} 
              placeholder={field.placeholder} 
              disabled={activeTab === 'edit' || readOnly}
            />
            {field.description && (
              <p className="text-xs text-muted-foreground">{field.description}</p>
            )}
          </div>
        );
        
      case 'textarea':
        return (
          <div className="space-y-2">
            <Label>{field.label} {field.required && <span className="text-destructive">*</span>}</Label>
            <Textarea 
              placeholder={field.placeholder} 
              disabled={activeTab === 'edit' || readOnly}
            />
            {field.description && (
              <p className="text-xs text-muted-foreground">{field.description}</p>
            )}
          </div>
        );
        
      case 'number':
        return (
          <div className="space-y-2">
            <Label>{field.label} {field.required && <span className="text-destructive">*</span>}</Label>
            <Input 
              type="number" 
              placeholder={field.placeholder}
              disabled={activeTab === 'edit' || readOnly}
              min={field.validation?.min}
              max={field.validation?.max}
            />
            {field.description && (
              <p className="text-xs text-muted-foreground">{field.description}</p>
            )}
          </div>
        );
        
      case 'date':
        return (
          <div className="space-y-2">
            <Label>{field.label} {field.required && <span className="text-destructive">*</span>}</Label>
            <Input 
              type="date" 
              disabled={activeTab === 'edit' || readOnly}
            />
            {field.description && (
              <p className="text-xs text-muted-foreground">{field.description}</p>
            )}
          </div>
        );
        
      case 'select':
        return (
          <div className="space-y-2">
            <Label>{field.label} {field.required && <span className="text-destructive">*</span>}</Label>
            <Select disabled={activeTab === 'edit' || readOnly}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option, i) => (
                  <SelectItem key={i} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {field.description && (
              <p className="text-xs text-muted-foreground">{field.description}</p>
            )}
          </div>
        );
        
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              className="h-4 w-4 rounded border-gray-300"
              disabled={activeTab === 'edit' || readOnly}
            />
            <Label>{field.label} {field.required && <span className="text-destructive">*</span>}</Label>
            {field.description && (
              <p className="text-xs text-muted-foreground ml-6">{field.description}</p>
            )}
          </div>
        );
        
      case 'checkbox-group':
        return (
          <div className="space-y-2">
            <Label>{field.label} {field.required && <span className="text-destructive">*</span>}</Label>
            <div className="space-y-2">
              {field.options?.map((option, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 rounded border-gray-300"
                    disabled={activeTab === 'edit' || readOnly}
                  />
                  <Label>{option}</Label>
                </div>
              ))}
            </div>
            {field.description && (
              <p className="text-xs text-muted-foreground">{field.description}</p>
            )}
          </div>
        );
        
      case 'radio-group':
        return (
          <div className="space-y-2">
            <Label>{field.label} {field.required && <span className="text-destructive">*</span>}</Label>
            <div className="space-y-2">
              {field.options?.map((option, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <input 
                    type="radio"
                    name={`radio-${field.id}`}
                    className="h-4 w-4 border-gray-300"
                    disabled={activeTab === 'edit' || readOnly}
                  />
                  <Label>{option}</Label>
                </div>
              ))}
            </div>
            {field.description && (
              <p className="text-xs text-muted-foreground">{field.description}</p>
            )}
          </div>
        );
        
      case 'switch':
        return (
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{field.label} {field.required && <span className="text-destructive">*</span>}</Label>
              {field.description && (
                <p className="text-xs text-muted-foreground">{field.description}</p>
              )}
            </div>
            <Switch disabled={activeTab === 'edit' || readOnly} />
          </div>
        );
        
      default:
        return (
          <div>Unknown field type: {field.type}</div>
        );
    }
  };

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="edit" disabled={readOnly}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="preview">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="settings" disabled={readOnly}>
              <Settings className="mr-2 h-4 w-4" />
              Form Settings
            </TabsTrigger>
          </TabsList>
          
          {!readOnly && (
            <Button onClick={handleSaveForm}>
              <Save className="mr-2 h-4 w-4" />
              Save Form
            </Button>
          )}
        </div>
        
        <TabsContent value="edit" className="border-none p-0 space-y-4">
          {fields.map((field) => (
            <Card key={field.id}>
              <CardContent className="pt-6 pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 mr-4">
                    {renderFieldPreview(field)}
                  </div>
                  
                  {!readOnly && (
                    <div className="flex flex-col space-y-1">
                      <Button variant="ghost" size="sm" onClick={() => openEditDialog(field)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => duplicateField(field)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => moveField(field.id, 'up')}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => moveField(field.id, 'down')}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => deleteField(field.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          
          {!readOnly && (
            <div className="flex flex-wrap gap-2 pt-4">
              <Button 
                variant="outline" 
                className="flex items-center"
                onClick={() => addNewField('text')}
              >
                <Plus className="mr-1 h-4 w-4" />
                Text
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center"
                onClick={() => addNewField('textarea')}
              >
                <Plus className="mr-1 h-4 w-4" />
                Text Area
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center"
                onClick={() => addNewField('number')}
              >
                <Plus className="mr-1 h-4 w-4" />
                Number
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center"
                onClick={() => addNewField('select')}
              >
                <Plus className="mr-1 h-4 w-4" />
                Dropdown
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center"
                onClick={() => addNewField('date')}
              >
                <Plus className="mr-1 h-4 w-4" />
                Date
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center"
                onClick={() => addNewField('checkbox')}
              >
                <Plus className="mr-1 h-4 w-4" />
                Checkbox
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center"
                onClick={() => addNewField('checkbox-group')}
              >
                <Plus className="mr-1 h-4 w-4" />
                Checkbox Group
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center"
                onClick={() => addNewField('radio-group')}
              >
                <Plus className="mr-1 h-4 w-4" />
                Radio Group
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center"
                onClick={() => addNewField('switch')}
              >
                <Plus className="mr-1 h-4 w-4" />
                Switch
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center"
                onClick={() => addNewField('email')}
              >
                <Plus className="mr-1 h-4 w-4" />
                Email
              </Button>
            </div>
          )}
          
          {fields.length === 0 && (
            <Card className="border-dashed">
              <CardContent className="pt-6 pb-8 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="p-3 bg-muted rounded-full">
                    <Plus className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium text-lg">Add Form Fields</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Use the buttons below to add fields to your form. You can rearrange, edit, or remove them anytime.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="preview" className="border-none p-0">
          <Card>
            <CardHeader>
              <CardTitle>Form Preview</CardTitle>
              <CardDescription>This is how your form will appear to users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {fields.map((field) => (
                <div key={field.id}>
                  {renderFieldPreview(field)}
                </div>
              ))}
              
              {fields.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No form fields have been added yet. Switch to the Edit tab to add fields.
                </p>
              )}
            </CardContent>
            {fields.length > 0 && (
              <CardFooter className="border-t pt-6 flex justify-between">
                <Button variant="outline" disabled>Cancel</Button>
                <Button disabled>Submit</Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="border-none p-0">
          <Card>
            <CardHeader>
              <CardTitle>Form Settings</CardTitle>
              <CardDescription>Configure general form settings and behaviors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="form-title">Form Title</Label>
                  <Input id="form-title" placeholder="Enter form title" defaultValue="New Form" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="form-description">Form Description</Label>
                  <Input id="form-description" placeholder="Brief description of the form" />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Form Behavior</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Progress Bar</Label>
                    <p className="text-sm text-muted-foreground">Display completion progress to users</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Save Progress</Label>
                    <p className="text-sm text-muted-foreground">Allow users to save and continue later</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Authentication</Label>
                    <p className="text-sm text-muted-foreground">Users must be logged in to submit form</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Completion Actions</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="success-message">Success Message</Label>
                  <Textarea 
                    id="success-message" 
                    placeholder="Message to display after successful submission"
                    defaultValue="Thank you for your submission!"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="redirect-url">Redirect URL (Optional)</Label>
                  <Input id="redirect-url" placeholder="https://example.com/thank-you" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6 flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Field Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Field</DialogTitle>
            <DialogDescription>
              Customize the properties for this field
            </DialogDescription>
          </DialogHeader>
          
          {editingField && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="field-label">Field Label</Label>
                  <Input 
                    id="field-label"
                    value={editingField.label}
                    onChange={(e) => setEditingField({...editingField, label: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="field-type">Field Type</Label>
                  <Select 
                    disabled={true} 
                    value={editingField.type}
                  >
                    <SelectTrigger id="field-type">
                      <SelectValue placeholder="Select field type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text Input</SelectItem>
                      <SelectItem value="textarea">Text Area</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="select">Dropdown</SelectItem>
                      <SelectItem value="checkbox">Checkbox</SelectItem>
                      <SelectItem value="checkbox-group">Checkbox Group</SelectItem>
                      <SelectItem value="radio-group">Radio Group</SelectItem>
                      <SelectItem value="switch">Switch</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Field type cannot be changed after creation</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="field-placeholder">Placeholder Text</Label>
                <Input 
                  id="field-placeholder"
                  value={editingField.placeholder || ''}
                  onChange={(e) => setEditingField({...editingField, placeholder: e.target.value})}
                  disabled={['checkbox', 'checkbox-group', 'radio-group', 'switch', 'date'].includes(editingField.type)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="field-description">Description (Helper Text)</Label>
                <Textarea 
                  id="field-description"
                  value={editingField.description || ''}
                  onChange={(e) => setEditingField({...editingField, description: e.target.value})}
                  placeholder="Additional information about this field"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="field-required"
                  checked={editingField.required}
                  onChange={(e) => setEditingField({...editingField, required: e.target.checked})}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="field-required">This field is required</Label>
              </div>
              
              {/* Field-specific options */}
              {['select', 'checkbox-group', 'radio-group'].includes(editingField.type) && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label>Options</Label>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleAddOption}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Option
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {editingField.options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                        <Input 
                          value={option}
                          onChange={(e) => handleChangeOption(index, e.target.value)}
                          className="flex-1"
                        />
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRemoveOption(index)}
                          disabled={editingField.options?.length === 1}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Validation options based on field type */}
              {editingField.type === 'text' && (
                <div className="space-y-3">
                  <Label>Validation</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="min-length">Min Length</Label>
                      <Input 
                        id="min-length"
                        type="number"
                        value={editingField.validation?.minLength || ''}
                        onChange={(e) => setEditingField({
                          ...editingField, 
                          validation: {
                            ...editingField.validation,
                            minLength: e.target.value ? parseInt(e.target.value) : undefined
                          }
                        })}
                        min={0}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-length">Max Length</Label>
                      <Input 
                        id="max-length"
                        type="number"
                        value={editingField.validation?.maxLength || ''}
                        onChange={(e) => setEditingField({
                          ...editingField, 
                          validation: {
                            ...editingField.validation,
                            maxLength: e.target.value ? parseInt(e.target.value) : undefined
                          }
                        })}
                        min={0}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {editingField.type === 'number' && (
                <div className="space-y-3">
                  <Label>Validation</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="min-value">Min Value</Label>
                      <Input 
                        id="min-value"
                        type="number"
                        value={editingField.validation?.min !== undefined ? editingField.validation.min : ''}
                        onChange={(e) => setEditingField({
                          ...editingField, 
                          validation: {
                            ...editingField.validation,
                            min: e.target.value ? parseInt(e.target.value) : undefined
                          }
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-value">Max Value</Label>
                      <Input 
                        id="max-value"
                        type="number"
                        value={editingField.validation?.max !== undefined ? editingField.validation.max : ''}
                        onChange={(e) => setEditingField({
                          ...editingField, 
                          validation: {
                            ...editingField.validation,
                            max: e.target.value ? parseInt(e.target.value) : undefined
                          }
                        })}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveFieldChanges} type="submit">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormBuilder;
