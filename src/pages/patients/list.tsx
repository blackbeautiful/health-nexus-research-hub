
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, UserPlus, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PatientsListPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const patients = [
    { id: 'PT-001', name: 'Sarah Johnson', age: 45, status: 'Active', lastVisit: '2025-01-15', study: 'BEACON-CRC' },
    { id: 'PT-002', name: 'Michael Smith', age: 62, status: 'Active', lastVisit: '2025-01-14', study: 'HEART Trial' },
    { id: 'PT-003', name: 'Emma Thompson', age: 38, status: 'Screening', lastVisit: '2025-01-12', study: 'BEACON-CRC' },
    { id: 'PT-004', name: 'John Davis', age: 55, status: 'Completed', lastVisit: '2025-01-10', study: 'HEART Trial' }
  ];

  return (
    <MainLayout>
      <PageHeader
        title="Patients"
        description="Manage patient records and information"
        action={{
          label: 'Register Patient',
          icon: UserPlus,
          onClick: () => navigate('/patients/register')
        }}
      />

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Patient List</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-[300px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Study</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id} className="cursor-pointer" onClick={() => navigate(`/patients/${patient.id}`)}>
                  <TableCell className="font-medium">{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>
                    <Badge variant={patient.status === 'Active' ? 'secondary' : 'outline'}>
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{patient.study}</TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default PatientsListPage;
