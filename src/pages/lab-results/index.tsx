
import React, { useState } from 'react';
import { Calendar, ChevronDown, Download, Eye, Filter, Search, TrendingDown, TrendingUp } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format, subDays } from 'date-fns';

type LabResultStatus = 'normal' | 'abnormal' | 'critical';
type LabResultCategory = 'hematology' | 'chemistry' | 'microbiology' | 'pathology' | 'genomic';

type LabTest = {
  name: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: LabResultStatus;
};

type LabResult = {
  id: string;
  category: LabResultCategory;
  date: Date;
  provider: string;
  tests: LabTest[];
  status: LabResultStatus;
  notes?: string;
  isReviewed: boolean;
};

const LabResultsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResult, setSelectedResult] = useState<LabResult | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  
  const labResults: LabResult[] = [
    {
      id: '1',
      category: 'hematology',
      date: new Date('2025-03-05'),
      provider: 'Dr. Rebecca Martinez',
      tests: [
        {
          name: 'White Blood Cell Count',
          value: '3.2',
          unit: '10^9/L',
          referenceRange: '4.0-11.0',
          status: 'abnormal'
        },
        {
          name: 'Red Blood Cell Count',
          value: '4.1',
          unit: '10^12/L',
          referenceRange: '4.0-5.5',
          status: 'normal'
        },
        {
          name: 'Hemoglobin',
          value: '10.2',
          unit: 'g/dL',
          referenceRange: '12.0-16.0',
          status: 'abnormal'
        },
        {
          name: 'Hematocrit',
          value: '31.5',
          unit: '%',
          referenceRange: '36.0-46.0',
          status: 'abnormal'
        },
        {
          name: 'Platelet Count',
          value: '145',
          unit: '10^9/L',
          referenceRange: '150-400',
          status: 'abnormal'
        }
      ],
      status: 'abnormal',
      notes: 'Signs of mild neutropenia and anemia. Patient is currently undergoing chemotherapy cycle 4.',
      isReviewed: true
    },
    {
      id: '2',
      category: 'chemistry',
      date: new Date('2025-03-05'),
      provider: 'Dr. Rebecca Martinez',
      tests: [
        {
          name: 'Sodium',
          value: '138',
          unit: 'mmol/L',
          referenceRange: '135-145',
          status: 'normal'
        },
        {
          name: 'Potassium',
          value: '3.4',
          unit: 'mmol/L',
          referenceRange: '3.5-5.0',
          status: 'abnormal'
        },
        {
          name: 'Chloride',
          value: '102',
          unit: 'mmol/L',
          referenceRange: '98-107',
          status: 'normal'
        },
        {
          name: 'Carbon Dioxide',
          value: '24',
          unit: 'mmol/L',
          referenceRange: '22-30',
          status: 'normal'
        },
        {
          name: 'BUN',
          value: '18',
          unit: 'mg/dL',
          referenceRange: '7-20',
          status: 'normal'
        },
        {
          name: 'Creatinine',
          value: '0.9',
          unit: 'mg/dL',
          referenceRange: '0.6-1.2',
          status: 'normal'
        },
        {
          name: 'Glucose',
          value: '95',
          unit: 'mg/dL',
          referenceRange: '70-99',
          status: 'normal'
        }
      ],
      status: 'abnormal',
      notes: 'Mild hypokalemia. Recommend increase in potassium-rich foods or supplementation.',
      isReviewed: true
    },
    {
      id: '3',
      category: 'chemistry',
      date: new Date('2025-02-20'),
      provider: 'Dr. Rebecca Martinez',
      tests: [
        {
          name: 'ALT',
          value: '45',
          unit: 'U/L',
          referenceRange: '7-55',
          status: 'normal'
        },
        {
          name: 'AST',
          value: '40',
          unit: 'U/L',
          referenceRange: '8-48',
          status: 'normal'
        },
        {
          name: 'Alkaline Phosphatase',
          value: '95',
          unit: 'U/L',
          referenceRange: '45-115',
          status: 'normal'
        },
        {
          name: 'Total Bilirubin',
          value: '0.8',
          unit: 'mg/dL',
          referenceRange: '0.1-1.2',
          status: 'normal'
        }
      ],
      status: 'normal',
      notes: 'Liver function tests within normal limits.',
      isReviewed: true
    },
    {
      id: '4',
      category: 'hematology',
      date: new Date('2025-02-05'),
      provider: 'Dr. Rebecca Martinez',
      tests: [
        {
          name: 'White Blood Cell Count',
          value: '2.8',
          unit: '10^9/L',
          referenceRange: '4.0-11.0',
          status: 'abnormal'
        },
        {
          name: 'Red Blood Cell Count',
          value: '3.9',
          unit: '10^12/L',
          referenceRange: '4.0-5.5',
          status: 'abnormal'
        },
        {
          name: 'Hemoglobin',
          value: '9.8',
          unit: 'g/dL',
          referenceRange: '12.0-16.0',
          status: 'abnormal'
        },
        {
          name: 'Hematocrit',
          value: '30.2',
          unit: '%',
          referenceRange: '36.0-46.0',
          status: 'abnormal'
        },
        {
          name: 'Platelet Count',
          value: '120',
          unit: '10^9/L',
          referenceRange: '150-400',
          status: 'abnormal'
        }
      ],
      status: 'abnormal',
      notes: 'Moderate neutropenia and anemia. Expected side effects from ongoing chemotherapy. Consider dose adjustment if symptoms worsen.',
      isReviewed: true
    },
    {
      id: '5',
      category: 'genomic',
      date: new Date('2025-01-15'),
      provider: 'Dr. Anna Lopez',
      tests: [
        {
          name: 'KRAS Mutation',
          value: 'Not Detected',
          unit: '',
          referenceRange: 'Not Detected',
          status: 'normal'
        },
        {
          name: 'BRAF V600E Mutation',
          value: 'Not Detected',
          unit: '',
          referenceRange: 'Not Detected',
          status: 'normal'
        },
        {
          name: 'MSI Status',
          value: 'MSS (Stable)',
          unit: '',
          referenceRange: 'MSS',
          status: 'normal'
        },
        {
          name: 'PD-L1 Expression',
          value: '5%',
          unit: '',
          referenceRange: '< 1%',
          status: 'abnormal'
        }
      ],
      status: 'abnormal',
      notes: 'Genomic profile suggests potential benefit from targeted therapy options. Discuss at next tumor board.',
      isReviewed: true
    },
    {
      id: '6',
      category: 'microbiology',
      date: subDays(new Date(), 1),
      provider: 'Dr. James Wilson',
      tests: [
        {
          name: 'Blood Culture',
          value: 'No Growth',
          unit: '',
          referenceRange: 'No Growth',
          status: 'normal'
        }
      ],
      status: 'normal',
      notes: 'No evidence of bloodstream infection.',
      isReviewed: false
    }
  ];
  
  const getStatusBadge = (status: LabResultStatus) => {
    switch(status) {
      case 'normal':
        return <Badge className="bg-green-500">Normal</Badge>;
      case 'abnormal':
        return <Badge className="bg-amber-500">Abnormal</Badge>;
      case 'critical':
        return <Badge className="bg-red-500">Critical</Badge>;
    }
  };
  
  const getCategoryLabel = (category: LabResultCategory) => {
    switch(category) {
      case 'hematology':
        return 'Hematology';
      case 'chemistry':
        return 'Chemistry';
      case 'microbiology':
        return 'Microbiology';
      case 'pathology':
        return 'Pathology';
      case 'genomic':
        return 'Genomic';
    }
  };
  
  const handleViewResult = (result: LabResult) => {
    setSelectedResult(result);
    setIsViewDialogOpen(true);
  };
  
  const filteredResults = labResults.filter(result => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      getCategoryLabel(result.category).toLowerCase().includes(lowerCaseQuery) ||
      result.provider.toLowerCase().includes(lowerCaseQuery) ||
      result.tests.some(test => test.name.toLowerCase().includes(lowerCaseQuery))
    );
  });

  return (
    <Layout title="Lab Results">
      <PageHeader 
        title="Lab Results" 
        description="View and track your laboratory test results"
        breadcrumbs={[{ label: 'Lab Results' }]}
      />
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Lab Results</CardTitle>
          <CardDescription>
            View your laboratory test results, including bloodwork, chemistry panels, and more.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <TabsList>
                <TabsTrigger value="all">All Results</TabsTrigger>
                <TabsTrigger value="abnormal">Abnormal</TabsTrigger>
                <TabsTrigger value="unreviewed">Unreviewed</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search results..."
                    className="pl-8 w-[200px] md:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>All Categories</DropdownMenuItem>
                    <DropdownMenuItem>Hematology</DropdownMenuItem>
                    <DropdownMenuItem>Chemistry</DropdownMenuItem>
                    <DropdownMenuItem>Microbiology</DropdownMenuItem>
                    <DropdownMenuItem>Pathology</DropdownMenuItem>
                    <DropdownMenuItem>Genomic</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <TabsContent value="all" className="m-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResults.length > 0 ? (
                      filteredResults
                        .sort((a, b) => b.date.getTime() - a.date.getTime())
                        .map((result) => (
                          <TableRow key={result.id}>
                            <TableCell>
                              <div className="font-medium">{format(result.date, 'MMM d, yyyy')}</div>
                            </TableCell>
                            <TableCell>{getCategoryLabel(result.category)}</TableCell>
                            <TableCell>{result.provider}</TableCell>
                            <TableCell>{getStatusBadge(result.status)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleViewResult(result)}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-1" />
                                  Export
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center h-24">
                          No results found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="abnormal" className="m-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResults
                      .filter(result => result.status === 'abnormal' || result.status === 'critical')
                      .sort((a, b) => b.date.getTime() - a.date.getTime())
                      .map((result) => (
                        <TableRow key={result.id}>
                          <TableCell>
                            <div className="font-medium">{format(result.date, 'MMM d, yyyy')}</div>
                          </TableCell>
                          <TableCell>{getCategoryLabel(result.category)}</TableCell>
                          <TableCell>{result.provider}</TableCell>
                          <TableCell>{getStatusBadge(result.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleViewResult(result)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Export
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="unreviewed" className="m-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResults
                      .filter(result => !result.isReviewed)
                      .sort((a, b) => b.date.getTime() - a.date.getTime())
                      .map((result) => (
                        <TableRow key={result.id}>
                          <TableCell>
                            <div className="font-medium">{format(result.date, 'MMM d, yyyy')}</div>
                          </TableCell>
                          <TableCell>{getCategoryLabel(result.category)}</TableCell>
                          <TableCell>{result.provider}</TableCell>
                          <TableCell>{getStatusBadge(result.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleViewResult(result)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Export
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        {selectedResult && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Lab Result Details</DialogTitle>
              <DialogDescription>
                {getCategoryLabel(selectedResult.category)} - {format(selectedResult.date, 'MMMM d, yyyy')}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <p className="text-sm font-medium">Provider</p>
                <p className="text-sm">{selectedResult.provider}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <div>{getStatusBadge(selectedResult.status)}</div>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium">Provider Notes</p>
                <p className="text-sm">{selectedResult.notes || 'No notes provided'}</p>
              </div>
            </div>
            
            <ScrollArea className="h-[300px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Test</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Reference Range</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedResult.tests.map((test, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{test.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>
                            {test.value} {test.unit}
                          </span>
                          {test.status === 'abnormal' && test.referenceRange && (
                            test.value > test.referenceRange.split('-')[1] ? 
                              <TrendingUp className="h-4 w-4 text-red-500" /> : 
                              <TrendingDown className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{test.referenceRange} {test.unit}</TableCell>
                      <TableCell className="text-right">{getStatusBadge(test.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Close</Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </Layout>
  );
};

export default LabResultsPage;
