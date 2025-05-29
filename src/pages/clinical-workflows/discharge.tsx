
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, FileText, Calendar, User, Home, CheckCircle, AlertCircle } from 'lucide-react';

const DischargePlanningPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const dischargePlans = [
    {
      id: 'D001',
      patientId: 'P001',
      patientName: 'John Smith',
      admissionDate: '2025-01-10',
      estimatedDischarge: '2025-01-18',
      status: 'Planning',
      primaryNurse: 'Sarah Wilson',
      dischargeType: 'Home',
      readinessScore: 75
    },
    {
      id: 'D002',
      patientId: 'P002',
      patientName: 'Maria Garcia',
      admissionDate: '2025-01-12',
      estimatedDischarge: '2025-01-19',
      status: 'Ready',
      primaryNurse: 'Sarah Wilson',
      dischargeType: 'Skilled Nursing Facility',
      readinessScore: 95
    },
    {
      id: 'D003',
      patientId: 'P003',
      patientName: 'Robert Johnson',
      admissionDate: '2025-01-08',
      estimatedDischarge: '2025-01-16',
      status: 'Barriers',
      primaryNurse: 'Jennifer Lopez',
      dischargeType: 'Home with Services',
      readinessScore: 45
    }
  ];

  const dischargeChecklist = [
    { id: 1, task: 'Physician discharge orders completed', completed: true },
    { id: 2, task: 'Medication reconciliation completed', completed: true },
    { id: 3, task: 'Follow-up appointments scheduled', completed: false },
    { id: 4, task: 'Transportation arranged', completed: false },
    { id: 5, task: 'Discharge instructions provided', completed: false },
    { id: 6, task: 'Equipment/supplies ordered', completed: true },
    { id: 7, task: 'Home care services arranged', completed: false },
    { id: 8, task: 'Patient education completed', completed: true }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      'Planning': { variant: 'secondary' as const, icon: Calendar },
      'Ready': { variant: 'secondary' as const, icon: CheckCircle },
      'Barriers': { variant: 'destructive' as const, icon: AlertCircle },
      'Discharged': { variant: 'secondary' as const, icon: Home }
    };
    
    const config = variants[status as keyof typeof variants];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const getReadinessColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Layout title="Discharge Planning">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Discharge Planning</h1>
            <p className="text-muted-foreground">Coordinate safe and effective patient discharge</p>
          </div>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            New Discharge Plan
          </Button>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by patient name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Discharge Planning Tabs */}
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active Plans</TabsTrigger>
            <TabsTrigger value="checklist">Discharge Checklist</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            <div className="space-y-4">
              {dischargePlans.filter(p => p.status !== 'Discharged').map((plan) => (
                <Card key={plan.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{plan.patientName}</CardTitle>
                        <CardDescription>
                          ID: {plan.patientId} | Admitted: {plan.admissionDate}
                        </CardDescription>
                      </div>
                      {getStatusBadge(plan.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Estimated Discharge:</span>
                          <div>{plan.estimatedDischarge}</div>
                        </div>
                        <div>
                          <span className="font-medium">Discharge To:</span>
                          <div>{plan.dischargeType}</div>
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          <span className="font-medium">Primary Nurse:</span>
                          <div className="ml-1">{plan.primaryNurse}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Discharge Readiness</span>
                          <span className={`font-bold ${getReadinessColor(plan.readinessScore)}`}>
                            {plan.readinessScore}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${plan.readinessScore >= 80 ? 'bg-green-500' : plan.readinessScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${plan.readinessScore}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm">
                          Update Plan
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="checklist" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Discharge Checklist Template</CardTitle>
                <CardDescription>Standard checklist for safe patient discharge</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dischargeChecklist.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 border rounded">
                      <Checkbox 
                        checked={item.completed}
                        className="data-[state=checked]:bg-green-500"
                      />
                      <span className={`flex-1 ${item.completed ? 'text-muted-foreground line-through' : ''}`}>
                        {item.task}
                      </span>
                      {item.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                  ))}
                  
                  <div className="mt-6 pt-4 border-t">
                    <div className="text-sm text-muted-foreground mb-2">Additional Notes:</div>
                    <Textarea 
                      placeholder="Add any specific discharge planning notes..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Save Draft</Button>
                    <Button>Complete Discharge</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Completed Discharge Plans</CardTitle>
                <CardDescription>Recently discharged patients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  No completed discharge plans in the current period
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DischargePlanningPage;
