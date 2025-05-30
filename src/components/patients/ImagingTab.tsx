
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Scan, Calendar, Download, Eye, FileText, AlertTriangle, CheckCircle } from 'lucide-react';

interface ImagingTabProps {
  patientId?: string;
}

const ImagingTab: React.FC<ImagingTabProps> = ({ patientId }) => {
  const [selectedModality, setSelectedModality] = useState('all');

  const imagingStudies = [
    {
      id: 'IMG001',
      type: 'CT',
      bodyPart: 'Chest/Abdomen/Pelvis',
      date: '2025-01-10',
      status: 'completed',
      contrast: 'With Contrast',
      findings: 'Partial response to treatment. Primary lesion shows 30% reduction in size. No new metastatic lesions identified.',
      radiologist: 'Dr. Sarah Chen',
      urgency: 'routine',
      recist: {
        targetLesions: [
          { location: 'Sigmoid colon', baseline: '4.2cm', current: '2.9cm', change: '-31%' }
        ],
        response: 'Partial Response'
      }
    },
    {
      id: 'IMG002',
      type: 'CT',
      bodyPart: 'Chest',
      date: '2024-12-15',
      status: 'completed',
      contrast: 'With Contrast',
      findings: 'No evidence of pulmonary metastases. Clear lung fields bilaterally.',
      radiologist: 'Dr. Sarah Chen',
      urgency: 'routine',
      recist: null
    },
    {
      id: 'IMG003',
      type: 'MRI',
      bodyPart: 'Abdomen',
      date: '2024-11-20',
      status: 'completed',
      contrast: 'With Gadolinium',
      findings: 'Primary colorectal mass measuring 4.2 x 3.8 cm. No liver metastases detected.',
      radiologist: 'Dr. Michael Rodriguez',
      urgency: 'stat',
      recist: {
        targetLesions: [
          { location: 'Sigmoid colon', baseline: '4.2cm', current: '4.2cm', change: 'Baseline' }
        ],
        response: 'Baseline'
      }
    },
    {
      id: 'IMG004',
      type: 'PET/CT',
      bodyPart: 'Whole Body',
      date: '2024-11-12',
      status: 'completed',
      contrast: 'FDG',
      findings: 'Hypermetabolic activity in sigmoid colon consistent with known primary tumor. No distant metastatic disease.',
      radiologist: 'Dr. Jennifer Park',
      urgency: 'routine',
      recist: null
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

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'stat':
        return <Badge className="bg-red-100 text-red-800">STAT</Badge>;
      case 'urgent':
        return <Badge className="bg-orange-100 text-orange-800">Urgent</Badge>;
      case 'routine':
        return <Badge variant="outline">Routine</Badge>;
      default:
        return <Badge variant="outline">{urgency}</Badge>;
    }
  };

  const getResponseIcon = (response: string) => {
    switch (response) {
      case 'Complete Response':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Partial Response':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'Stable Disease':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'Progressive Disease':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const filteredStudies = selectedModality === 'all' 
    ? imagingStudies 
    : imagingStudies.filter(study => study.type.toLowerCase() === selectedModality.toLowerCase());

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scan className="h-5 w-5" />
            Imaging Studies
          </CardTitle>
          <CardDescription>Diagnostic imaging results and RECIST evaluations</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedModality} onValueChange={setSelectedModality}>
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="all">All Studies</TabsTrigger>
              <TabsTrigger value="ct">CT Scans</TabsTrigger>
              <TabsTrigger value="mri">MRI</TabsTrigger>
              <TabsTrigger value="pet/ct">PET/CT</TabsTrigger>
              <TabsTrigger value="xray">X-Ray</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedModality} className="mt-6">
              <div className="space-y-6">
                {filteredStudies.map((study) => (
                  <Card key={study.id} className="border-l-4 border-l-purple-500">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {study.type} - {study.bodyPart}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <Calendar className="h-4 w-4" />
                            {study.date} | {study.contrast} | Read by {study.radiologist}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          {getUrgencyBadge(study.urgency)}
                          {getStatusBadge(study.status)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-md">
                        <h4 className="font-medium mb-2">Findings:</h4>
                        <p className="text-sm">{study.findings}</p>
                      </div>

                      {study.recist && (
                        <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            RECIST Assessment
                            {getResponseIcon(study.recist.response)}
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Overall Response:</span>
                              <Badge className="bg-blue-100 text-blue-800">
                                {study.recist.response}
                              </Badge>
                            </div>
                            <div className="space-y-1">
                              <span className="font-medium text-sm">Target Lesions:</span>
                              {study.recist.targetLesions.map((lesion, index) => (
                                <div key={index} className="text-sm bg-white p-2 rounded border">
                                  <div className="flex justify-between">
                                    <span>{lesion.location}</span>
                                    <span className="font-medium">
                                      {lesion.baseline} → {lesion.current} ({lesion.change})
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Images
                        </Button>
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

export default ImagingTab;
