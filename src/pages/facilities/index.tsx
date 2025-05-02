
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Building2, Plus, FileSearch, Users, Search, BarChart2, Briefcase, FlaskRound } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const facilityFormSchema = z.object({
  name: z.string().min(2, "Facility name is required"),
  type: z.string().min(1, "Facility type is required"),
  modules: z.array(z.string()).nonempty("Select at least one module"),
  adminEmail: z.string().email("Valid email is required"),
  location: z.string().min(2, "Location is required"),
  subscriptionTier: z.string().min(1, "Subscription tier is required"),
});

const facilities = [
  {
    id: '1',
    name: 'General Hospital',
    type: 'Hospital',
    location: 'New York, USA',
    modules: ['clinical'],
    admins: 3,
    users: 48,
    status: 'active',
    subscription: 'Enterprise',
    lastActive: '2 hours ago'
  },
  {
    id: '2',
    name: 'Medical Research Institute',
    type: 'Research',
    location: 'Boston, USA',
    modules: ['research'],
    admins: 2,
    users: 27,
    status: 'active',
    subscription: 'Professional',
    lastActive: '5 minutes ago'
  },
  {
    id: '3',
    name: 'City Health Clinic',
    type: 'Clinic',
    location: 'Chicago, USA',
    modules: ['clinical', 'research'],
    admins: 1,
    users: 15,
    status: 'active',
    subscription: 'Professional',
    lastActive: '1 day ago'
  },
  {
    id: '4',
    name: 'Wellness Medical Center',
    type: 'Clinic',
    location: 'Los Angeles, USA',
    modules: ['clinical'],
    admins: 2,
    users: 22,
    status: 'inactive',
    subscription: 'Starter',
    lastActive: '10 days ago'
  },
  {
    id: '5',
    name: 'Advanced Cancer Research',
    type: 'Research',
    location: 'Seattle, USA',
    modules: ['research'],
    admins: 4,
    users: 36,
    status: 'pending',
    subscription: 'Enterprise',
    lastActive: 'Never'
  }
];

const FacilitiesPage = () => {
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [addFacilityOpen, setAddFacilityOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(facilityFormSchema),
    defaultValues: {
      name: '',
      type: '',
      modules: [],
      adminEmail: '',
      location: '',
      subscriptionTier: ''
    }
  });

  const onSubmit = (data: z.infer<typeof facilityFormSchema>) => {
    toast({
      title: "Facility created",
      description: `${data.name} has been created successfully.`,
    });
    setAddFacilityOpen(false);
    form.reset();
  };

  const filteredFacilities = facilities.filter(facility => {
    const matchesSearch = facility.name.toLowerCase().includes(searchText.toLowerCase()) ||
                        facility.location.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = filterStatus === 'all' || facility.status === filterStatus;
    const matchesType = filterType === 'all' || facility.type.toLowerCase() === filterType.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="text-gray-500">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getModuleBadges = (modules: string[]) => {
    return modules.map(module => {
      if (module === 'clinical') {
        return (
          <Badge key={module} variant="secondary" className="mr-1">
            <Briefcase className="h-3 w-3 mr-1" />
            Clinical
          </Badge>
        );
      } else {
        return (
          <Badge key={module} variant="secondary" className="mr-1">
            <FlaskRound className="h-3 w-3 mr-1" />
            Research
          </Badge>
        );
      }
    });
  };

  return (
    <Layout>
      <PageHeader
        title="Facilities Management"
        description="Manage all healthcare facilities and research institutions registered on the platform"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Facilities' }
        ]}
      />

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <div className="relative w-full sm:w-80">
            <Search className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search facilities..." 
              className="pl-9" 
              value={searchText} 
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Facility Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="hospital">Hospital</SelectItem>
                <SelectItem value="clinic">Clinic</SelectItem>
                <SelectItem value="research">Research</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Dialog open={addFacilityOpen} onOpenChange={setAddFacilityOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add Facility
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Facility</DialogTitle>
              <DialogDescription>Create a new healthcare facility or research institution.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facility Name</FormLabel>
                      <FormControl>
                        <Input placeholder="General Hospital" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facility Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select facility type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="hospital">Hospital</SelectItem>
                          <SelectItem value="clinic">Clinic</SelectItem>
                          <SelectItem value="research">Research Institution</SelectItem>
                          <SelectItem value="laboratory">Laboratory</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="modules"
                  render={() => (
                    <FormItem>
                      <div className="mb-2">
                        <FormLabel>Modules</FormLabel>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <FormField
                          control={form.control}
                          name="modules"
                          render={({ field }) => {
                            return (
                              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes('clinical')}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, 'clinical'])
                                        : field.onChange(field.value?.filter((value) => value !== 'clinical'))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  <div className="flex items-center">
                                    <Briefcase className="h-4 w-4 mr-2" />
                                    Clinical Module
                                  </div>
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                        <FormField
                          control={form.control}
                          name="modules"
                          render={({ field }) => {
                            return (
                              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes('research')}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, 'research'])
                                        : field.onChange(field.value?.filter((value) => value !== 'research'))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  <div className="flex items-center">
                                    <FlaskRound className="h-4 w-4 mr-2" />
                                    Research Module
                                  </div>
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="adminEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Admin Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="admin@facility.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        Primary admin will receive an invitation email.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="City, Country" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subscriptionTier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subscription Tier</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select tier" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="starter">Starter</SelectItem>
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="enterprise">Enterprise</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                
                <DialogFooter className="pt-4">
                  <Button type="submit">Create Facility</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Facilities</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Facilities ({filteredFacilities.length})</CardTitle>
              <CardDescription>
                Manage all healthcare facilities and research institutions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Facility</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Modules</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFacilities.map((facility) => (
                    <TableRow key={facility.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-3">
                            <div className="flex h-full w-full items-center justify-center bg-muted rounded-full">
                              <Building2 className="h-4 w-4" />
                            </div>
                          </Avatar>
                          <div>
                            <div className="font-medium">{facility.name}</div>
                            <div className="text-xs text-muted-foreground">{facility.type}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{facility.location}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {getModuleBadges(facility.modules)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-muted-foreground" /> 
                          <span>{facility.users}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(facility.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => navigate(`/facilities/${facility.id}`)}
                          >
                            <FileSearch className="h-4 w-4 mr-1" /> View
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => navigate(`/analytics/site-performance?facilityId=${facility.id}`)}
                          >
                            <BarChart2 className="h-4 w-4 mr-1" /> Analytics
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Facility</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Modules</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Subscription</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFacilities
                    .filter(facility => facility.status === 'active')
                    .map((facility) => (
                      <TableRow key={facility.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-3">
                              <div className="flex h-full w-full items-center justify-center bg-muted rounded-full">
                                <Building2 className="h-4 w-4" />
                              </div>
                            </Avatar>
                            <div>
                              <div className="font-medium">{facility.name}</div>
                              <div className="text-xs text-muted-foreground">{facility.type}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{facility.location}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {getModuleBadges(facility.modules)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1 text-muted-foreground" /> 
                            <span>{facility.users}</span>
                          </div>
                        </TableCell>
                        <TableCell>{facility.subscription}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => navigate(`/facilities/${facility.id}`)}
                            >
                              <FileSearch className="h-4 w-4 mr-1" /> View
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => navigate(`/analytics/site-performance?facilityId=${facility.id}`)}
                            >
                              <BarChart2 className="h-4 w-4 mr-1" /> Analytics
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Facility</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Modules</TableHead>
                    <TableHead>Requested On</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFacilities
                    .filter(facility => facility.status === 'pending')
                    .map((facility) => (
                      <TableRow key={facility.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-3">
                              <div className="flex h-full w-full items-center justify-center bg-muted rounded-full">
                                <Building2 className="h-4 w-4" />
                              </div>
                            </Avatar>
                            <div>
                              <div className="font-medium">{facility.name}</div>
                              <div className="text-xs text-muted-foreground">{facility.type}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{facility.location}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {getModuleBadges(facility.modules)}
                          </div>
                        </TableCell>
                        <TableCell>5 days ago</TableCell>
                        <TableCell>
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                            Pending
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" onClick={() => {
                              toast({
                                title: "Facility approved",
                                description: `${facility.name} has been approved.`
                              });
                            }}>
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => {
                              toast({
                                title: "Facility rejected",
                                description: `${facility.name} has been rejected.`
                              });
                            }}>
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default FacilitiesPage;
