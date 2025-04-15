
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pill, Plus, Search, Filter, FileText, AlertTriangle, CheckCircle2, Clock, RefreshCw, Eye } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Prescription {
  id: string;
  patientName: string;
  patientId: string;
  medication: string;
  dosage: string;
  frequency: string;
  prescribedDate: string;
  status: 'active' | 'completed' | 'pending' | 'cancelled';
  prescriber: string;
  refills: number;
}

const mockPrescriptions: Prescription[] = [
  {
    id: "RX-001",
    patientName: "John Smith",
    patientId: "PT-001",
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    prescribedDate: "2025-04-10",
    status: "active",
    prescriber: "Dr. Rebecca Martinez",
    refills: 2
  },
  {
    id: "RX-002",
    patientName: "Mary Johnson",
    patientId: "PT-002",
    medication: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    prescribedDate: "2025-04-08",
    status: "active",
    prescriber: "Dr. James Wilson",
    refills: 3
  },
  {
    id: "RX-003",
    patientName: "Robert Brown",
    patientId: "PT-003",
    medication: "Ondansetron",
    dosage: "8mg",
    frequency: "As needed",
    prescribedDate: "2025-04-05",
    status: "pending",
    prescriber: "Dr. Rebecca Martinez",
    refills: 0
  },
  {
    id: "RX-004",
    patientName: "Linda Davis",
    patientId: "PT-004",
    medication: "Oxycodone",
    dosage: "5mg",
    frequency: "Every 4-6 hours as needed",
    prescribedDate: "2025-04-01",
    status: "completed",
    prescriber: "Dr. Michael Chen",
    refills: 0
  },
  {
    id: "RX-005",
    patientName: "John Smith",
    patientId: "PT-001",
    medication: "Atorvastatin",
    dosage: "20mg",
    frequency: "Once daily at bedtime",
    prescribedDate: "2025-04-09",
    status: "active",
    prescriber: "Dr. Rebecca Martinez",
    refills: 5
  }
];

const PrescriptionsPage = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(mockPrescriptions);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter prescriptions based on active tab and search query
  const filteredPrescriptions = prescriptions.filter(rx => {
    // Filter by tab
    if (activeTab !== 'all' && rx.status !== activeTab) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        rx.patientName.toLowerCase().includes(query) ||
        rx.medication.toLowerCase().includes(query) ||
        rx.id.toLowerCase().includes(query) ||
        rx.patientId.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 hover:bg-green-500">Active</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'completed':
        return <Badge variant="outline">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <MainLayout>
      <PageHeader 
        title="Prescriptions" 
        description="Manage patient medication prescriptions"
        breadcrumbs={[{ label: 'Clinical Workflows' }, { label: 'Prescriptions' }]}
        action={{
          label: "New Prescription",
          icon: Plus,
          href: "/clinical-workflows/prescriptions/new"
        }}
      />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search prescriptions..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Prescription List</CardTitle>
          <CardDescription>
            {filteredPrescriptions.length} {filteredPrescriptions.length === 1 ? 'prescription' : 'prescriptions'} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredPrescriptions.length === 0 ? (
            <div className="text-center py-8">
              <Pill className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
              <h3 className="text-lg font-medium mb-2">No Prescriptions Found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery 
                  ? "No prescriptions match your search criteria. Try adjusting your filters." 
                  : "No prescriptions have been recorded yet."}
              </p>
              <Button asChild>
                <Link to="/clinical-workflows/prescriptions/new">
                  <Plus className="h-4 w-4 mr-2" />
                  New Prescription
                </Link>
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prescription ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrescriptions.map((rx) => (
                    <TableRow key={rx.id}>
                      <TableCell className="font-medium">{rx.id}</TableCell>
                      <TableCell>
                        <div>
                          <p>{rx.patientName}</p>
                          <p className="text-xs text-muted-foreground">{rx.patientId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{rx.medication}</p>
                          <p className="text-xs text-muted-foreground">
                            {rx.frequency}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{rx.dosage}</TableCell>
                      <TableCell>{rx.prescribedDate}</TableCell>
                      <TableCell>{getStatusBadge(rx.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/clinical-workflows/prescriptions/${rx.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default PrescriptionsPage;
