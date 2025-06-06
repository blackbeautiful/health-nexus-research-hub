
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Building2, Plus, Users, Bed, Activity } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const RoomAllocationPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFloor, setFilterFloor] = useState('all');

  const rooms = [
    { id: 'R-101', number: '101', floor: '1', type: 'ICU', capacity: 1, occupied: 1, status: 'full', department: 'Critical Care' },
    { id: 'R-102', number: '102', floor: '1', type: 'ICU', capacity: 1, occupied: 0, status: 'available', department: 'Critical Care' },
    { id: 'R-201', number: '201', floor: '2', type: 'General', capacity: 2, occupied: 1, status: 'partial', department: 'General Medicine' },
    { id: 'R-202', number: '202', floor: '2', type: 'General', capacity: 2, occupied: 2, status: 'full', department: 'General Medicine' },
    { id: 'R-301', number: '301', floor: '3', type: 'Private', capacity: 1, occupied: 1, status: 'full', department: 'Oncology' },
    { id: 'R-302', number: '302', floor: '3', type: 'Private', capacity: 1, occupied: 0, status: 'available', department: 'Oncology' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'full': return 'destructive';
      case 'partial': return 'default';
      case 'available': return 'secondary';
      default: return 'outline';
    }
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.number.includes(searchTerm) ||
                         room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFloor = filterFloor === 'all' || room.floor === filterFloor;
    return matchesSearch && matchesFloor;
  });

  return (
    <MainLayout>
      <PageHeader
        title="Room Allocation"
        description="Manage room assignments and capacity planning"
        action={{
          label: 'Add Room',
          icon: Plus,
          onClick: () => console.log('Add room')
        }}
      />

      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Rooms</p>
                <p className="text-2xl font-bold">{rooms.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-primary" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Full Occupancy</p>
                <p className="text-2xl font-bold text-red-600">{rooms.filter(r => r.status === 'full').length}</p>
              </div>
              <Users className="h-8 w-8 text-red-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-2xl font-bold text-green-600">{rooms.filter(r => r.status === 'available').length}</p>
              </div>
              <Bed className="h-8 w-8 text-green-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round((rooms.reduce((acc, r) => acc + r.occupied, 0) / rooms.reduce((acc, r) => acc + r.capacity, 0)) * 100)}%
                </p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Room Overview</TabsTrigger>
            <TabsTrigger value="allocation">Allocation Planning</TabsTrigger>
            <TabsTrigger value="reports">Occupancy Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Room Status</CardTitle>
                    <CardDescription>Current room occupancy and availability</CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search rooms..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 w-full sm:w-[300px]"
                      />
                    </div>
                    <Select value={filterFloor} onValueChange={setFilterFloor}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by floor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Floors</SelectItem>
                        <SelectItem value="1">Floor 1</SelectItem>
                        <SelectItem value="2">Floor 2</SelectItem>
                        <SelectItem value="3">Floor 3</SelectItem>
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
                        <TableHead>Room</TableHead>
                        <TableHead>Floor</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Capacity</TableHead>
                        <TableHead>Occupied</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRooms.map((room) => (
                        <TableRow key={room.id}>
                          <TableCell className="font-medium">{room.number}</TableCell>
                          <TableCell>{room.floor}</TableCell>
                          <TableCell>{room.type}</TableCell>
                          <TableCell>{room.department}</TableCell>
                          <TableCell>{room.capacity}</TableCell>
                          <TableCell>{room.occupied}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(room.status)}>
                              {room.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Manage
                            </Button>
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
                <CardTitle>Allocation Planning</CardTitle>
                <CardDescription>Plan and optimize room assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Room allocation planning interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Occupancy Reports</CardTitle>
                <CardDescription>View detailed occupancy analytics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Occupancy reporting interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default RoomAllocationPage;
