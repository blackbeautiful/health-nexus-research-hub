
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Save, Send, Clock } from 'lucide-react';

interface SOAPNoteProps {
  patientId?: string;
  encounterId?: string;
}

const SOAPNote: React.FC<SOAPNoteProps> = ({ patientId, encounterId }) => {
  const [soapData, setSoapData] = useState({
    subjective: '',
    objective: '',
    assessment: '',
    plan: ''
  });

  const [templates] = useState([
    {
      name: 'Annual Physical',
      subjective: 'Patient presents for routine annual physical examination. No acute complaints.',
      objective: 'Vital signs stable. Physical examination unremarkable.',
      assessment: 'Healthy adult for age. No acute concerns.',
      plan: 'Continue current medications. Return in 1 year for routine follow-up.'
    },
    {
      name: 'Hypertension Follow-up',
      subjective: 'Patient returns for hypertension follow-up. Reports good medication compliance.',
      objective: 'BP: [insert], HR: [insert]. No peripheral edema.',
      assessment: 'Hypertension, well-controlled.',
      plan: 'Continue current antihypertensive regimen. Return in 3 months.'
    },
    {
      name: 'Acute Upper Respiratory',
      subjective: 'Patient presents with [duration] history of cough, congestion, and fatigue.',
      objective: 'T: [temp], RR: [rate]. Upper respiratory examination shows [findings].',
      assessment: 'Acute upper respiratory infection, likely viral.',
      plan: 'Supportive care. Return if symptoms worsen or persist beyond 10 days.'
    }
  ]);

  const handleSectionChange = (section: keyof typeof soapData, value: string) => {
    setSoapData(prev => ({ ...prev, [section]: value }));
  };

  const loadTemplate = (template: typeof templates[0]) => {
    setSoapData({
      subjective: template.subjective,
      objective: template.objective,
      assessment: template.assessment,
      plan: template.plan
    });
  };

  const handleSave = () => {
    console.log('Saving SOAP note:', soapData);
    // Implementation for saving
  };

  const handleSign = () => {
    console.log('Signing SOAP note:', soapData);
    // Implementation for electronic signature
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                SOAP Note
              </CardTitle>
              <CardDescription>
                Patient: Sarah Johnson | DOB: 03/15/1985 | MRN: 12345
                <br />
                Encounter: {new Date().toLocaleDateString()} | Provider: Dr. Martinez
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Draft
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="compose">
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger value="compose">Compose Note</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="compose" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subjective</label>
                  <Textarea
                    placeholder="Chief complaint, history of present illness, review of systems..."
                    value={soapData.subjective}
                    onChange={(e) => handleSectionChange('subjective', e.target.value)}
                    className="min-h-24"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Objective</label>
                  <Textarea
                    placeholder="Vital signs, physical examination findings, diagnostic results..."
                    value={soapData.objective}
                    onChange={(e) => handleSectionChange('objective', e.target.value)}
                    className="min-h-24"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Assessment</label>
                  <Textarea
                    placeholder="Diagnosis, clinical impression, differential diagnosis..."
                    value={soapData.assessment}
                    onChange={(e) => handleSectionChange('assessment', e.target.value)}
                    className="min-h-24"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Plan</label>
                  <Textarea
                    placeholder="Treatment plan, medications, follow-up, patient education..."
                    value={soapData.plan}
                    onChange={(e) => handleSectionChange('plan', e.target.value)}
                    className="min-h-24"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button onClick={handleSave} variant="outline">
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                <Button onClick={handleSign}>
                  <Send className="h-4 w-4 mr-2" />
                  Sign & Complete
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium">Available Templates</h4>
                {templates.map((template, index) => (
                  <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h5 className="font-medium">{template.name}</h5>
                          <p className="text-sm text-muted-foreground mt-1">
                            {template.subjective.substring(0, 80)}...
                          </p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => loadTemplate(template)}
                        >
                          Use Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SOAPNote;
