
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MonitorSpeaker, Plus, Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const EquipmentTrackingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const equipment = [
    { id: 'EQ-001', name: 'Ventilator A', type: 'Ventilator', location: 'ICU-101', status: 'operational', lastMaintenance: '2025-01-01', nextMaintenance: '2025-04-01' },
    { id: 'EQ-002', name: 'MRI Scanner', type: 'Imaging', location: 'Radiology', status: 'operational', lastMaintenance: '2024-12-15', nextMaintenance: '2025-03-15' },
    { id: 'EQ-003', name: 'Cardiac Monitor', type: 'Monitor', location: 'ICU-102', status: 'maintenance', lastMaintenance: '2024-12-20', nextMaintenance: '2025-01-20' },
    { id: 'EQ-004', name: 'X-Ray Machine', type: 'Imaging', location: 'Emergency', status: 'operational', lastMaintenance: '2024-11-30', nextMaintenance: '2025-02-28' },
    { id: 'EQ-005', name: 'Dialysis Unit', type: 'Treatment', location: 'Nephrology', status: 'out-of-order', lastMaintenance: '2024-10-15', nextMaintenance: '2025-01-15' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'secondary';
      case 'maintenance': return 'default';
      case 'out-of-order': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return CheckCircle;
      case 'maintenance': return Activity;
      case 'out-of-order': return AlertTriangle;
      default: return Activity;
    }
  };

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <MainLayout>
      <PageHeader
        title="Equipment Tracking"
        description="Monitor and manage medical equipment inventory and maintenance"
        action={{
          label: 'Add Equipment',
          icon: Plus,
          onClick: () => console.log('Add equipment')
        }}
      />

      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Equipment</p>
                <p className="text-2xl font-bold">{equipment.length}</p>
              </div>
              <MonitorSpeaker className="h-8 w-8 text-primary" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Operational</p>
                <p className="text-2xl font-bold text-green-600">{equipment.filter(e => e.status === 'operational').length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">In Maintenance</p>
                <p className="text-2xl font-bold text-yellow-600">{equipment.filter(e => e.status === 'maintenance').length}</p>
              </div>
              <Activity className="h-8 w-8 text-yellow-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Out of Order</p>
                <p className="text-2xl font-bold text-red-600">{equipment.filter(e => e.status === 'out-of-order').length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="inventory" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Equipment Inventory</CardTitle>
                    <CardDescription>Track all medical equipment across the facility</CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search equipment..."
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
                        <SelectItem value="operational">Operational</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="out-of-order">Out of Order</SelectItem>
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
                        <TableHead>Equipment ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Maintenance</TableHead>
                        <TableHead>Next Maintenance</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEquipment.map((item) => {
                        const StatusIcon = getStatusIcon(item.status);
                        return (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.type}</TableCell>
                            <TableCell>{item.location}</TableCell>
                            <TableCell>
                              <Badge variant={getStatusColor(item.status)} className="flex items-center gap-1 w-fit">
                                <StatusIcon className="h-3 w-3" />
                                {item.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{item.lastMaintenance}</TableCell>
                            <TableCell>{item.nextMaintenance}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Schedule</CardTitle>
                <CardDescription>Manage equipment maintenance schedules and work orders</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Maintenance scheduling interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="locations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Equipment Locations</CardTitle>
                <CardDescription>Track equipment movement and location history</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Location tracking interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Equipment Reports</CardTitle>
                <CardDescription>Generate utilization and maintenance reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Equipment reporting interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default EquipmentTrackingPage;
