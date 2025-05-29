
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Search, Plus, FileText, Calendar, User, AlertCircle, CheckCircle } from 'lucide-react';

const CRFManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const crfs = [
    {
      id: 'CRF001',
      title: 'Baseline Assessment',
      study: 'ONCO-2025-001',
      patientId: 'P001',
      patientName: 'John Smith',
      status: 'Complete',
      completion: 100,
      lastUpdated: '2025-01-15',
      dueDate: '2025-01-16',
      assignedTo: 'Dr. Sarah Johnson'
    },
    {
      id: 'CRF002',
      title: 'Week 4 Follow-up',
      study: 'ONCO-2025-001',
      patientId: 'P002',
      patientName: 'Maria Garcia',
      status: 'In Progress',
      completion: 65,
      lastUpdated: '2025-01-14',
      dueDate: '2025-01-17',
      assignedTo: 'Dr. Michael Brown'
    },
    {
      id: 'CRF003',
      title: 'Adverse Event Report',
      study: 'CARD-2025-002',
      patientId: 'P003',
      patientName: 'Robert Johnson',
      status: 'Pending',
      completion: 0,
      lastUpdated: '2025-01-13',
      dueDate: '2025-01-16',
      assignedTo: 'Dr. Emily Davis'
    },
    {
      id: 'CRF004',
      title: 'End of Study',
      study: 'ONCO-2025-001',
      patientId: 'P004',
      patientName: 'Lisa Chen',
      status: 'Overdue',
      completion: 30,
      lastUpdated: '2025-01-10',
      dueDate: '2025-01-14',
      assignedTo: 'Dr. Sarah Johnson'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      'Complete': { variant: 'secondary' as const, icon: CheckCircle, color: 'text-green-600' },
      'In Progress': { variant: 'default' as const, icon: AlertCircle, color: 'text-blue-600' },
      'Pending': { variant: 'secondary' as const, icon: FileText, color: 'text-gray-600' },
      'Overdue': { variant: 'destructive' as const, icon: AlertCircle, color: 'text-red-600' }
    };
    
    const config = variants[status as keyof typeof variants];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className={`h-3 w-3 ${config.color}`} />
        {status}
      </Badge>
    );
  };

  const getCompletionColor = (completion: number) => {
    if (completion === 100) return 'bg-green-500';
    if (completion >= 70) return 'bg-blue-500';
    if (completion >= 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const isOverdue = (dueDate: string, status: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    return due < today && status !== 'Complete';
  };

  return (
    <Layout title="CRF Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">CRF Management</h1>
            <p className="text-muted-foreground">Manage Case Report Forms for clinical studies</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create CRF
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total CRFs</p>
                  <p className="text-2xl font-bold">{crfs.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Complete</p>
                  <p className="text-2xl font-bold">{crfs.filter(c => c.status === 'Complete').length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">{crfs.filter(c => c.status === 'In Progress').length}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overdue</p>
                  <p className="text-2xl font-bold">{crfs.filter(c => c.status === 'Overdue').length}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search CRFs by title, patient, or study..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* CRF Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All CRFs</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="progress">In Progress</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="space-y-4">
              {crfs.map((crf) => (
                <Card key={crf.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{crf.title}</CardTitle>
                        <CardDescription>
                          {crf.patientName} (ID: {crf.patientId}) | Study: {crf.study}
                        </CardDescription>
                      </div>
                      {getStatusBadge(crf.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          Assigned to: {crf.assignedTo}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Due: {crf.dueDate}
                          {isOverdue(crf.dueDate, crf.status) && (
                            <AlertCircle className="h-4 w-4 ml-2 text-red-500" />
                          )}
                        </div>
                        <div>
                          Last updated: {crf.lastUpdated}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Completion Progress</span>
                          <span>{crf.completion}%</span>
                        </div>
                        <Progress value={crf.completion} className="h-2" />
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        {crf.status !== 'Complete' && (
                          <Button size="sm">
                            Continue
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <div className="space-y-4">
              {crfs.filter(c => c.status === 'Pending').map((crf) => (
                <Card key={crf.id}>
                  <CardHeader>
                    <CardTitle>{crf.title}</CardTitle>
                    <CardDescription>{crf.patientName} | {crf.study}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            <div className="space-y-4">
              {crfs.filter(c => c.status === 'In Progress').map((crf) => (
                <Card key={crf.id}>
                  <CardHeader>
                    <CardTitle>{crf.title}</CardTitle>
                    <CardDescription>{crf.patientName} | {crf.study}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="overdue" className="space-y-4">
            <div className="space-y-4">
              {crfs.filter(c => c.status === 'Overdue').map((crf) => (
                <Card key={crf.id}>
                  <CardHeader>
                    <CardTitle>{crf.title}</CardTitle>
                    <CardDescription>{crf.patientName} | {crf.study}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CRFManagementPage;
