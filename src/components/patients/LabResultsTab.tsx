
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TestTube, TrendingUp, TrendingDown, AlertTriangle, Calendar, Download, Eye } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface LabResultsTabProps {
  patientId?: string;
}

const LabResultsTab: React.FC<LabResultsTabProps> = ({ patientId }) => {
  const [selectedCategory, setSelectedCategory] = useState('recent');

  const labResults = [
    {
      id: 'LAB001',
      test: 'Complete Blood Count (CBC)',
      date: '2025-01-15',
      status: 'completed',
      category: 'Hematology',
      results: [
        { parameter: 'White Blood Cells', value: '4.2', unit: 'x10³/μL', range: '4.0-11.0', status: 'normal' },
        { parameter: 'Red Blood Cells', value: '4.1', unit: 'x10⁶/μL', range: '4.2-5.4', status: 'low' },
        { parameter: 'Hemoglobin', value: '12.8', unit: 'g/dL', range: '12.0-15.5', status: 'normal' },
        { parameter: 'Hematocrit', value: '38.2', unit: '%', range: '36.0-46.0', status: 'normal' },
        { parameter: 'Platelets', value: '285', unit: 'x10³/μL', range: '150-450', status: 'normal' }
      ],
      orderedBy: 'Dr. Martinez'
    },
    {
      id: 'LAB002',
      test: 'Comprehensive Metabolic Panel',
      date: '2025-01-15',
      status: 'completed',
      category: 'Chemistry',
      results: [
        { parameter: 'Glucose', value: '98', unit: 'mg/dL', range: '70-100', status: 'normal' },
        { parameter: 'Creatinine', value: '1.1', unit: 'mg/dL', range: '0.6-1.2', status: 'normal' },
        { parameter: 'BUN', value: '18', unit: 'mg/dL', range: '7-20', status: 'normal' },
        { parameter: 'Sodium', value: '142', unit: 'mmol/L', range: '136-145', status: 'normal' },
        { parameter: 'Potassium', value: '4.2', unit: 'mmol/L', range: '3.5-5.1', status: 'normal' }
      ],
      orderedBy: 'Dr. Martinez'
    },
    {
      id: 'LAB003',
      test: 'Tumor Markers',
      date: '2025-01-10',
      status: 'completed',
      category: 'Oncology',
      results: [
        { parameter: 'CEA', value: '8.2', unit: 'ng/mL', range: '<3.0', status: 'high' },
        { parameter: 'CA 19-9', value: '45', unit: 'U/mL', range: '<37', status: 'high' },
        { parameter: 'AFP', value: '2.1', unit: 'ng/mL', range: '<10', status: 'normal' }
      ],
      orderedBy: 'Dr. Martinez'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'normal':
        return <Badge className="bg-green-100 text-green-800">Normal</Badge>;
      case 'high':
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case 'low':
        return <Badge className="bg-blue-100 text-blue-800">Low</Badge>;
      case 'critical':
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'high':
      case 'critical':
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'low':
        return <TrendingDown className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5" />
            Laboratory Results
          </CardTitle>
          <CardDescription>Complete laboratory test history and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="hematology">Hematology</TabsTrigger>
              <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
              <TabsTrigger value="oncology">Oncology</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-6">
              <div className="space-y-6">
                {labResults
                  .filter(lab => selectedCategory === 'recent' || lab.category.toLowerCase() === selectedCategory)
                  .map((lab) => (
                    <Card key={lab.id} className="border-l-4 border-l-blue-500">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{lab.test}</CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                              <Calendar className="h-4 w-4" />
                              {lab.date} | Ordered by {lab.orderedBy}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Parameter</TableHead>
                              <TableHead>Value</TableHead>
                              <TableHead>Reference Range</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {lab.results.map((result, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{result.parameter}</TableCell>
                                <TableCell className="flex items-center gap-2">
                                  {result.value} {result.unit}
                                  {getStatusIcon(result.status)}
                                </TableCell>
                                <TableCell>{result.range}</TableCell>
                                <TableCell>{getStatusBadge(result.status)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
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

export default LabResultsTab;
