
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShieldAlert, Search, Plus, AlertCircle, Shield, CheckCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

const RolesPermissionsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Sample roles data
  const roles = [
    {
      id: 1,
      name: 'Admin',
      description: 'Full system access with all privileges',
      users: 4,
      permissions: 42,
      isSystemRole: true
    },
    {
      id: 2,
      name: 'Principal Investigator',
      description: 'Leader of research studies with elevated access',
      users: 8,
      permissions: 36,
      isSystemRole: true
    },
    {
      id: 3,
      name: 'Research Coordinator',
      description: 'Manages day-to-day study operations',
      users: 12,
      permissions: 28,
      isSystemRole: true
    },
    {
      id: 4,
      name: 'Data Manager',
      description: 'Manages and validates research data',
      users: 6,
      permissions: 24,
      isSystemRole: true
    },
    {
      id: 5,
      name: 'Research Nurse',
      description: 'Provides clinical care within research protocols',
      users: 15,
      permissions: 22,
      isSystemRole: true
    },
    {
      id: 6,
      name: 'Regulatory Specialist',
      description: 'Manages regulatory documentation and compliance',
      users: 3,
      permissions: 18,
      isSystemRole: true
    },
    {
      id: 7,
      name: 'Monitor',
      description: 'External user with limited access for monitoring',
      users: 5,
      permissions: 14,
      isSystemRole: true
    },
    {
      id: 8,
      name: 'Custom Role - Quality Team',
      description: 'Custom role for quality assurance team members',
      users: 4,
      permissions: 26,
      isSystemRole: false
    }
  ];
  
  // Sample permissions for a role
  const selectedRolePermissions = [
    { id: 1, category: 'Patient Data', name: 'View patient records', enabled: true },
    { id: 2, category: 'Patient Data', name: 'Edit patient records', enabled: true },
    { id: 3, category: 'Patient Data', name: 'Delete patient records', enabled: false },
    { id: 4, category: 'Patient Data', name: 'Export patient records', enabled: true },
    { id: 5, category: 'Research Studies', name: 'View studies', enabled: true },
    { id: 6, category: 'Research Studies', name: 'Create studies', enabled: true },
    { id: 7, category: 'Research Studies', name: 'Edit studies', enabled: true },
    { id: 8, category: 'Research Studies', name: 'Delete studies', enabled: false },
    { id: 9, category: 'User Management', name: 'View users', enabled: true },
    { id: 10, category: 'User Management', name: 'Create users', enabled: false },
    { id: 11, category: 'User Management', name: 'Edit users', enabled: false },
    { id: 12, category: 'User Management', name: 'Delete users', enabled: false },
    { id: 13, category: 'Settings', name: 'View settings', enabled: true },
    { id: 14, category: 'Settings', name: 'Edit settings', enabled: false },
    { id: 15, category: 'Reports', name: 'Generate reports', enabled: true },
    { id: 16, category: 'Reports', name: 'Export reports', enabled: true }
  ];
  
  // Group permissions by category
  const permissionsByCategory: Record<string, typeof selectedRolePermissions> = {};
  selectedRolePermissions.forEach(permission => {
    if (!permissionsByCategory[permission.category]) {
      permissionsByCategory[permission.category] = [];
    }
    permissionsByCategory[permission.category].push(permission);
  });
  
  return (
    <MainLayout>
      <PageHeader 
        title="Roles & Permissions" 
        description="Manage user roles and access permissions"
        breadcrumbs={[
          { label: 'User Management', link: '/users' },
          { label: 'Roles & Permissions' }
        ]}
        action={{
          label: "Create Role",
          icon: Plus,
          onClick: () => console.log("Create new role")
        }}
      />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-[350px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search roles or permissions..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline">
            <Shield className="mr-2 h-4 w-4" />
            Audit Permissions
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>User Roles</CardTitle>
            <CardDescription>System and custom user roles</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-auto max-h-[600px]">
              {roles.map((role) => (
                <div 
                  key={role.id} 
                  className={`border-b px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors ${role.id === 2 ? 'bg-muted' : ''}`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{role.name}</h3>
                    {role.isSystemRole ? (
                      <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100">System</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-100">Custom</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <span>{role.users} users</span>
                    <span>{role.permissions} permissions</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Principal Investigator</CardTitle>
              <CardDescription>Role permissions and access rights</CardDescription>
            </div>
            <Button>Save Changes</Button>
          </CardHeader>
          <CardContent>
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800">System Role Warning</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    This is a system role. Changes to this role will affect 8 users across multiple studies.
                    Consider creating a custom role instead of modifying this system role.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {Object.entries(permissionsByCategory).map(([category, permissions]) => (
                <div key={category}>
                  <h3 className="text-lg font-medium mb-3">{category}</h3>
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Permission</TableHead>
                          <TableHead className="w-[100px] text-right">Access</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {permissions.map((permission) => (
                          <TableRow key={permission.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                {permission.enabled ? (
                                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                                ) : (
                                  <ShieldAlert className="h-4 w-4 text-muted-foreground mr-2" />
                                )}
                                {permission.name}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Switch checked={permission.enabled} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline">Discard Changes</Button>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default RolesPermissionsPage;
