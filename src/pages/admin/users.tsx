
import React from 'react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow
} from '@/components/ui/table';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronDown, Filter, MoreHorizontal, 
  PlusCircle, Search, ShieldAlert, User, UserCog
} from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const UserManagementPage = () => {
  return (
    <Layout title="User Management">
      <PageHeader 
        title="User Management" 
        description="Manage user accounts, roles and permissions"
        breadcrumbs={[
          { label: 'Admin', link: '/admin' },
          { label: 'User Management' }
        ]}
        action={{
          label: 'Add User',
          icon: PlusCircle,
          onClick: () => console.log('Add user clicked')
        }}
      />
      
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name, email, or role..."
                className="pl-8"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select defaultValue="all-roles">
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-roles">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="physician">Physician</SelectItem>
                  <SelectItem value="nurse">Nurse</SelectItem>
                  <SelectItem value="researcher">Researcher</SelectItem>
                  <SelectItem value="coordinator">Study Coordinator</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="all-status">
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-status">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="flex gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground text-xs">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {user.role === 'Admin' ? (
                        <ShieldAlert className="h-4 w-4 text-amber-500" />
                      ) : user.role === 'Super Admin' ? (
                        <UserCog className="h-4 w-4 text-red-500" />
                      ) : (
                        <User className="h-4 w-4 text-muted-foreground" />
                      )}
                      {user.role}
                    </div>
                  </TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell>
                    <Badge variant={
                      user.status === 'Active' ? 'default' : 
                      user.status === 'Inactive' ? 'secondary' : 
                      'outline'
                    }>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit User</DropdownMenuItem>
                        <DropdownMenuItem>Manage Permissions</DropdownMenuItem>
                        <DropdownMenuItem>Reset Password</DropdownMenuItem>
                        {user.status === 'Active' ? (
                          <DropdownMenuItem className="text-amber-600">Deactivate</DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="text-green-600">Activate</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-between px-4 py-4">
          <div className="text-sm text-muted-foreground">
            Showing <strong>1</strong> to <strong>10</strong> of <strong>42</strong> users
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Users per page</p>
              <Select defaultValue="10">
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent side="top">
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <span className="sr-only">Go to previous page</span>
                <ChevronDown className="h-4 w-4 rotate-90" />
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <span className="sr-only">Go to next page</span>
                <ChevronDown className="h-4 w-4 -rotate-90" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </Layout>
  );
};

// Mock data
const mockUsers = [
  {
    id: '1',
    name: 'Dr. Jane Roberts',
    email: 'jane.roberts@healthnexus.com',
    role: 'Physician',
    department: 'Oncology',
    lastActive: 'Today, 10:45 AM',
    status: 'Active'
  },
  {
    id: '2',
    name: 'Dr. Michael Brown',
    email: 'michael.brown@healthnexus.com',
    role: 'Physician',
    department: 'Oncology',
    lastActive: 'Today, 9:22 AM',
    status: 'Active'
  },
  {
    id: '3',
    name: 'Sarah Wong',
    email: 'sarah.wong@healthnexus.com',
    role: 'Nurse',
    department: 'Oncology',
    lastActive: 'Yesterday, 4:30 PM',
    status: 'Active'
  },
  {
    id: '4',
    name: 'James Miller',
    email: 'james.miller@healthnexus.com',
    role: 'Researcher',
    department: 'Clinical Research',
    lastActive: 'Apr 11, 2025',
    status: 'Active'
  },
  {
    id: '5',
    name: 'Lisa Chen',
    email: 'lisa.chen@healthnexus.com',
    role: 'Study Coordinator',
    department: 'Clinical Research',
    lastActive: 'Apr 10, 2025',
    status: 'Active'
  },
  {
    id: '6',
    name: 'Robert Johnson',
    email: 'robert.johnson@healthnexus.com',
    role: 'Admin',
    department: 'IT',
    lastActive: 'Today, 11:15 AM',
    status: 'Active'
  },
  {
    id: '7',
    name: 'Emily Davis',
    email: 'emily.davis@healthnexus.com',
    role: 'Data Manager',
    department: 'Clinical Research',
    lastActive: 'Apr 12, 2025',
    status: 'Active'
  },
  {
    id: '8',
    name: 'Carlos Rodriguez',
    email: 'carlos.rodriguez@healthnexus.com',
    role: 'Super Admin',
    department: 'Administration',
    lastActive: 'Today, 8:50 AM',
    status: 'Active'
  },
  {
    id: '9',
    name: 'Jennifer Taylor',
    email: 'jennifer.taylor@healthnexus.com',
    role: 'Researcher',
    department: 'Genomics',
    lastActive: 'Apr 8, 2025',
    status: 'Inactive'
  },
  {
    id: '10',
    name: 'David Kim',
    email: 'david.kim@healthnexus.com',
    role: 'Physician',
    department: 'Radiology',
    lastActive: 'Apr 5, 2025',
    status: 'Pending'
  }
];

export default UserManagementPage;
