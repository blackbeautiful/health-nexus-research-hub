
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TestTube, Scan, Heart, Eye, Microscope, Activity, Calendar, Download, FileText } from 'lucide-react';

interface InvestigationsTabProps {
  patientId?: string;
}

const InvestigationsTab: React.FC<InvestigationsTabProps> = ({ patientId }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const investigations = [
    {
      id: 'INV001',
      type: 'lab',
      name: 'Complete Blood Count (CBC)',
      date: '2025-01-15',
      status: 'completed',
      results: 'WBC: 4.2, RBC: 4.1, Hemoglobin: 12.8',
      orderedBy: 'Dr. Martinez',
      category: 'Hematology'
    },
    {
      id: 'INV002',
      type: 'imaging',
      name: 'CT Chest/Abdomen/Pelvis',
      date: '2025-01-10',
      status: 'completed',
      results: 'Partial response to treatment, 30% reduction in primary lesion',
      orderedBy: 'Dr. Martinez',
      category: 'Radiology'
    },
    {
      id: 'INV003',
      type: 'pathology',
      name: 'Tumor Biopsy',
      date: '2024-11-12',
      status: 'completed',
      results: 'Moderately differentiated adenocarcinoma, Stage IIIA',
      orderedBy: 'Dr. Wilson',
      category: 'Pathology'
    },
    {
      id: 'INV004',
      type: 'cardiac',
      name: 'Echocardiogram',
      date: '2024-12-05',
      status: 'completed',
      results: 'LVEF 60%, normal wall motion',
      orderedBy: 'Dr. Martinez',
      category: 'Cardiology'
    },
    {
      id: 'INV005',
      type: 'lab',
      name: 'Comprehensive Metabolic Panel',
      date: '2025-01-15',
      status: 'pending',
      results: 'Pending results',
      orderedBy: 'Dr. Martinez',
      category: 'Chemistry'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lab':
        return <TestTube className="h-4 w-4 text-blue-500" />;
      case 'imaging':
        return <Scan className="h-4 w-4 text-purple-500" />;
      case 'cardiac':
        return <Heart className="h-4 w-4 text-red-500" />;
      case 'pathology':
        return <Microscope className="h-4 w-4 text-green-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredInvestigations = selectedCategory === 'all' 
    ? investigations 
    : investigations.filter(inv => inv.type === selectedCategory);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Patient Investigations</CardTitle>
          <CardDescription>Complete history of all diagnostic tests and procedures</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="lab">Lab Tests</TabsTrigger>
              <TabsTrigger value="imaging">Imaging</TabsTrigger>
              <TabsTrigger value="cardiac">Cardiac</TabsTrigger>
              <TabsTrigger value="pathology">Pathology</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-6">
              <div className="space-y-4">
                {filteredInvestigations.map((investigation) => (
                  <Card key={investigation.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          {getTypeIcon(investigation.type)}
                          <div>
                            <CardTitle className="text-base">{investigation.name}</CardTitle>
                            <CardDescription>
                              {investigation.category} | Ordered by {investigation.orderedBy}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(investigation.status)}
                          <Badge variant="outline">
                            <Calendar className="h-3 w-3 mr-1" />
                            {investigation.date}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted/50 p-3 rounded-md">
                        <h4 className="font-medium mb-2">Results:</h4>
                        <p className="text-sm">{investigation.results}</p>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          View Report
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
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

export default InvestigationsTab;
