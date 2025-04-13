
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageTitle from '@/components/common/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  FileDown,
  Filter,
  User,
  Calendar,
  Activity
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PatientCard from '@/components/patients/PatientCard';
import { mockPatients } from '@/data/mockPatients';

const PatientsPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Filter patients based on search term and filter status
  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterStatus === 'all' || 
      patient.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleAddPatient = () => {
    toast({
      title: "Feature coming soon",
      description: "Patient registration form will be added in the next update.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Exporting patient data",
      description: "Your export will be ready shortly.",
    });
  };

  return (
    <MainLayout>
      <PageTitle 
        title="Patient Management" 
        description="View and manage oncology patients"
        actions={
          <>
            <Button variant="outline" onClick={handleExport}>
              <FileDown className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button onClick={handleAddPatient}>
              <Plus className="mr-2 h-4 w-4" />
              New Patient
            </Button>
          </>
        }
      />

      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search patients by name or ID..."
            className="pl-8 bg-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('all')}
            size="sm"
          >
            All
          </Button>
          <Button 
            variant={filterStatus === 'active' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('active')}
            size="sm"
          >
            Active
          </Button>
          <Button 
            variant={filterStatus === 'remission' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('remission')}
            size="sm"
          >
            In Remission
          </Button>
          <Button 
            variant={filterStatus === 'critical' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('critical')}
            size="sm"
          >
            Critical
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
          </Button>
          <Button 
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('table')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Patients</p>
              <p className="text-2xl font-bold">{mockPatients.length}</p>
            </div>
            <User className="h-8 w-8 text-primary" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-muted-foreground">New This Month</p>
              <p className="text-2xl font-bold">24</p>
            </div>
            <Calendar className="h-8 w-8 text-primary" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-muted-foreground">In Critical Condition</p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <Activity className="h-8 w-8 text-destructive" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-muted-foreground">In Remission</p>
              <p className="text-2xl font-bold">42</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </CardContent>
        </Card>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPatients.map(patient => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age/Gender</TableHead>
                <TableHead>Cancer Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Physician</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map(patient => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.age}, {patient.gender}</TableCell>
                  <TableCell>
                    <Badge className={`cancer-${patient.cancerType.toLowerCase().replace(' ', '')}`}>
                      {patient.cancerType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      patient.status === 'active' ? 'outline' :
                      patient.status === 'remission' ? 'secondary' :
                      'destructive'
                    }>
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{patient.physician}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </MainLayout>
  );
};

export default PatientsPage;
