
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserPlus, Users } from 'lucide-react';

const UsersPage = () => {
  const users = [
    { id: 'U001', name: 'Dr. Rebecca Martinez', email: 'rebecca.martinez@hospital.com', role: 'Principal Investigator', status: 'Active' },
    { id: 'U002', name: 'John Wilson', email: 'john.wilson@hospital.com', role: 'Research Coordinator', status: 'Active' },
    { id: 'U003', name: 'Sarah Kim', email: 'sarah.kim@hospital.com', role: 'Data Manager', status: 'Active' },
    { id: 'U004', name: 'Mike Chen', email: 'mike.chen@hospital.com', role: 'Lab Technician', status: 'Inactive' }
  ];

  return (
    <MainLayout>
      <PageHeader
        title="User Management"
        description="Manage system users and access permissions"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Users' }
        ]}
        action={{
          label: 'Add User',
          icon: UserPlus,
          onClick: () => console.log('Add user')
        }}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            System Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'Active' ? 'secondary' : 'outline'}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Edit
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

export default UsersPage;
