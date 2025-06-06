
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Bed, Plus, Edit, Users } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const BedManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const beds = [
    { id: 'B-001', room: '101', ward: 'ICU', status: 'occupied', patient: 'John Smith', admissionDate: '2025-01-10', type: 'ICU' },
    { id: 'B-002', room: '102', ward: 'ICU', status: 'available', patient: null, admissionDate: null, type: 'ICU' },
    { id: 'B-003', room: '201', ward: 'General', status: 'occupied', patient: 'Sarah Johnson', admissionDate: '2025-01-12', type: 'General' },
    { id: 'B-004', room: '202', ward: 'General', status: 'maintenance', patient: null, admissionDate: null, type: 'General' },
    { id: 'B-005', room: '301', ward: 'Oncology', status: 'occupied', patient: 'Michael Brown', admissionDate: '2025-01-08', type: 'Private' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'occupied': return 'destructive';
      case 'available': return 'secondary';
      case 'maintenance': return 'outline';
      default: return 'outline';
    }
  };

  const filteredBeds = beds.filter(bed => {
    const matchesSearch = bed.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bed.room.includes(searchTerm) ||
                         bed.ward.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (bed.patient && bed.patient.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterStatus === 'all' || bed.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <MainLayout>
      <PageHeader
        title="Bed Management"
        description="Monitor and manage hospital bed allocation and availability"
        action={{
          label: 'Add Bed',
          icon: Plus,
          onClick: () => console.log('Add bed')
        }}
      />

      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Beds</p>
                <p className="text-2xl font-bold">{beds.length}</p>
              </div>
              <Bed className="h-8 w-8 text-primary" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Occupied</p>
                <p className="text-2xl font-bold text-red-600">{beds.filter(b => b.status === 'occupied').length}</p>
              </div>
              <Users className="h-8 w-8 text-red-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-2xl font-bold text-green-600">{beds.filter(b => b.status === 'available').length}</p>
              </div>
              <Bed className="h-8 w-8 text-green-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Maintenance</p>
                <p className="text-2xl font-bold text-yellow-600">{beds.filter(b => b.status === 'maintenance').length}</p>
              </div>
              <Edit className="h-8 w-8 text-yellow-600" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="allocation">Bed Allocation</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Bed Status Overview</CardTitle>
                    <CardDescription>Real-time bed availability and occupancy</CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search beds..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 w-full sm:w-[300px]"
                      />
                    </div>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="occupied">Occupied</SelectItem>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Bed ID</TableHead>
                        <TableHead>Room</TableHead>
                        <TableHead>Ward</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Admission Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBeds.map((bed) => (
                        <TableRow key={bed.id}>
                          <TableCell className="font-medium">{bed.id}</TableCell>
                          <TableCell>{bed.room}</TableCell>
                          <TableCell>{bed.ward}</TableCell>
                          <TableCell>{bed.type}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(bed.status)}>
                              {bed.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{bed.patient || '-'}</TableCell>
                          <TableCell>{bed.admissionDate || '-'}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="allocation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Bed Allocation</CardTitle>
                <CardDescription>Assign beds to patients and manage transfers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Bed allocation interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Schedule</CardTitle>
                <CardDescription>Schedule and track bed maintenance activities</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Maintenance scheduling interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default BedManagementPage;
