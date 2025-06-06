
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Activity, Thermometer, Heart, Clock } from 'lucide-react';

interface TriagePanelProps {
  patientId?: string;
}

const TriagePanel: React.FC<TriagePanelProps> = ({ patientId }) => {
  const [vitals, setVitals] = useState({
    bloodPressure: { systolic: '', diastolic: '' },
    heartRate: '',
    temperature: '',
    respiratoryRate: '',
    oxygenSaturation: '',
    weight: '',
    height: '',
    painLevel: ''
  });

  const [triageLevel, setTriageLevel] = useState<string>('');
  const [chiefComplaint, setChiefComplaint] = useState('');

  const triageLevels = [
    { level: '1', name: 'Immediate', color: 'bg-red-500', description: 'Life threatening' },
    { level: '2', name: 'Urgent', color: 'bg-orange-500', description: 'Potentially life threatening' },
    { level: '3', name: 'Less Urgent', color: 'bg-yellow-500', description: 'Urgent but stable' },
    { level: '4', name: 'Non-Urgent', color: 'bg-green-500', description: 'Can wait' },
    { level: '5', name: 'Routine', color: 'bg-blue-500', description: 'Routine care' }
  ];

  const handleVitalChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setVitals(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as any,
          [child]: value
        }
      }));
    } else {
      setVitals(prev => ({ ...prev, [field]: value }));
    }
  };

  const calculateTriageScore = () => {
    const systolic = parseInt(vitals.bloodPressure.systolic);
    const heartRate = parseInt(vitals.heartRate);
    const temp = parseFloat(vitals.temperature);
    const painLevel = parseInt(vitals.painLevel);

    let score = 5; // Start with lowest priority

    // High-priority indicators
    if (systolic > 180 || systolic < 90) score = Math.min(score, 2);
    if (heartRate > 120 || heartRate < 50) score = Math.min(score, 2);
    if (temp > 102 || temp < 95) score = Math.min(score, 2);
    if (painLevel >= 8) score = Math.min(score, 2);

    // Medium priority
    if (systolic > 160 || heartRate > 100) score = Math.min(score, 3);
    if (temp > 100.4) score = Math.min(score, 3);
    if (painLevel >= 6) score = Math.min(score, 3);

    return score.toString();
  };

  const handleTriageComplete = () => {
    const calculatedLevel = calculateTriageScore();
    setTriageLevel(calculatedLevel);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Triage Assessment
          </CardTitle>
          <CardDescription>Patient: Sarah Johnson | MRN: 12345</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="vitals">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
              <TabsTrigger value="assessment">Assessment</TabsTrigger>
              <TabsTrigger value="priority">Priority Level</TabsTrigger>
            </TabsList>

            <TabsContent value="vitals" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Blood Pressure</label>
                  <div className="flex gap-1">
                    <Input
                      placeholder="Sys"
                      value={vitals.bloodPressure.systolic}
                      onChange={(e) => handleVitalChange('bloodPressure.systolic', e.target.value)}
                    />
                    <span className="flex items-center">/</span>
                    <Input
                      placeholder="Dia"
                      value={vitals.bloodPressure.diastolic}
                      onChange={(e) => handleVitalChange('bloodPressure.diastolic', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Heart Rate</label>
                  <Input
                    placeholder="bpm"
                    value={vitals.heartRate}
                    onChange={(e) => handleVitalChange('heartRate', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Temperature</label>
                  <Input
                    placeholder="°F"
                    value={vitals.temperature}
                    onChange={(e) => handleVitalChange('temperature', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">O2 Saturation</label>
                  <Input
                    placeholder="%"
                    value={vitals.oxygenSaturation}
                    onChange={(e) => handleVitalChange('oxygenSaturation', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Pain Level (0-10)</label>
                  <Input
                    placeholder="0-10"
                    value={vitals.painLevel}
                    onChange={(e) => handleVitalChange('painLevel', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Weight (lbs)</label>
                  <Input
                    placeholder="lbs"
                    value={vitals.weight}
                    onChange={(e) => handleVitalChange('weight', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Height</label>
                  <Input
                    placeholder="ft'in"
                    value={vitals.height}
                    onChange={(e) => handleVitalChange('height', e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="assessment" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Chief Complaint</label>
                <Input
                  placeholder="Patient's primary concern..."
                  value={chiefComplaint}
                  onChange={(e) => setChiefComplaint(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Quick Assessment Questions:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    <Heart className="h-4 w-4 mr-2" />
                    Chest Pain Protocol
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Thermometer className="h-4 w-4 mr-2" />
                    Fever Assessment
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Fall Risk Assessment
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    Stroke Protocol
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="priority" className="space-y-4">
              <div className="space-y-4">
                <Button onClick={handleTriageComplete} className="w-full" size="lg">
                  Calculate Triage Level
                </Button>

                {triageLevel && (
                  <Card className="border-2 border-orange-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${triageLevels.find(t => t.level === triageLevel)?.color} flex items-center justify-center text-white font-bold`}>
                          {triageLevel}
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            Level {triageLevel}: {triageLevels.find(t => t.level === triageLevel)?.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {triageLevels.find(t => t.level === triageLevel)?.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-2">
                  <h4 className="font-medium">Triage Levels:</h4>
                  {triageLevels.map((level) => (
                    <div key={level.level} className="flex items-center gap-3 p-2 rounded border">
                      <div className={`w-6 h-6 rounded-full ${level.color} flex items-center justify-center text-white text-sm font-bold`}>
                        {level.level}
                      </div>
                      <div>
                        <span className="font-medium">{level.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">{level.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TriagePanel;
