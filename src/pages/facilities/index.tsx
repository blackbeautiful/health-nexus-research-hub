import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Plus,
  Building2,
  Users,
  MapPin,
  Calendar,
  Edit,
  Trash2,
  Phone,
  Mail,
  Globe,
  CheckCircle,
  AlertCircle,
  Clock,
  TestTube,
  Activity
} from 'lucide-react';

const facilityFormSchema = z.object({
  name: z.string().min(2, 'Facility name must be at least 2 characters'),
  type: z.string().min(1, 'Please select a facility type'),
  modules: z.array(z.string()).min(1, 'Please select at least one module'),
  adminEmail: z.string().email('Please enter a valid email address'),
  location: z.string().min(2, 'Location must be at least 2 characters'),
  subscriptionTier: z.string().min(1, 'Please select a subscription tier'),
});

type FacilityFormData = z.infer<typeof facilityFormSchema>;

const FacilitiesPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const form = useForm<FacilityFormData>({
    resolver: zodResolver(facilityFormSchema),
    defaultValues: {
      name: '',
      type: '',
      modules: [],
      adminEmail: '',
      location: '',
      subscriptionTier: '',
    },
  });

  const onSubmit = (data: FacilityFormData) => {
    console.log('Form data:', data);
    toast({
      title: "Facility Added",
      description: `${data.name} has been successfully added to the platform.`,
    });
    setIsAddDialogOpen(false);
    form.reset();
  };

  const facilities = [
    {
      id: 1,
      name: 'City General Hospital',
      type: 'Hospital',
      location: 'New York, NY',
      modules: ['Clinical', 'Research'],
      staff: 245,
      patients: 1250,
      studies: 12,
      status: 'active',
      subscription: 'Enterprise',
      adminName: 'Dr. Sarah Johnson',
      adminEmail: 'sarah.johnson@citygeneral.com',
      phone: '+1 (555) 123-4567',
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Global Research Institute',
      type: 'Research Center',
      location: 'San Francisco, CA',
      modules: ['Research'],
      staff: 85,
      patients: 320,
      studies: 35,
      status: 'active',
      subscription: 'Premium',
      adminName: 'Dr. David Lee',
      adminEmail: 'david.lee@globalresearch.org',
      phone: '+1 (555) 987-6543',
      joinDate: '2024-02-20'
    },
    {
      id: 3,
      name: 'Community Health Clinic',
      type: 'Clinic',
      location: 'Chicago, IL',
      modules: ['Clinical'],
      staff: 30,
      patients: 800,
      studies: 0,
      status: 'active',
      subscription: 'Standard',
      adminName: 'Maria Rodriguez',
      adminEmail: 'maria.rodriguez@communityhealth.com',
      phone: '+1 (555) 345-6789',
      joinDate: '2024-03-01'
    },
    {
      id: 4,
      name: 'Advanced Medical Labs',
      type: 'Laboratory',
      location: 'Houston, TX',
      modules: [],
      staff: 45,
      patients: 0,
      studies: 0,
      status: 'pending',
      subscription: 'Basic',
      adminName: 'James Wilson',
      adminEmail: 'james.wilson@advancedlabs.com',
      phone: '+1 (555) 456-7890',
      joinDate: '2024-03-10'
    },
    {
      id: 5,
      name: 'Coastal Rehabilitation Center',
      type: 'Rehabilitation Center',
      location: 'Miami, FL',
      modules: ['Clinical'],
      staff: 60,
      patients: 450,
      studies: 5,
      status: 'active',
      subscription: 'Premium',
      adminName: 'Emily Chen',
      adminEmail: 'emily.chen@coastalrehab.com',
      phone: '+1 (555) 567-8901',
      joinDate: '2024-03-15'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getFacilityTypeIcon = (type: string) => {
    switch (type) {
      case 'Hospital':
        return <Building2 className="h-4 w-4 mr-2" />;
      case 'Research Center':
        return <Globe className="h-4 w-4 mr-2" />;
      case 'Clinic':
        return <MapPin className="h-4 w-4 mr-2" />;
      case 'Laboratory':
        return <TestTube className="h-4 w-4 mr-2" />;
      case 'Rehabilitation Center':
        return <Activity className="h-4 w-4 mr-2" />;
      default:
        return <Building2 className="h-4 w-4 mr-2" />;
    }
  };

  return (
    <Layout>
      <PageHeader
        title="Facilities Management"
        description="Manage healthcare facilities and research institutions"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Admin', link: '/admin/dashboard' },
          { label: 'Facilities' }
        ]}
      />

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Input
            placeholder="Search facilities..."
            className="w-64"
          />
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Facility
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Facility</DialogTitle>
              <DialogDescription>
                Add a new healthcare facility or research institution to the platform.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facility Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter facility name" {...field} />
                      </FormControl>
                      <FormMessage />
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
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Hospital">Hospital</SelectItem>
                          <SelectItem value="Clinic">Clinic</SelectItem>
                          <SelectItem value="Research Center">Research Center</SelectItem>
                          <SelectItem value="Laboratory">Laboratory</SelectItem>
                          <SelectItem value="Rehabilitation Center">Rehabilitation Center</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="modules"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Modules</FormLabel>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="clinical"
                            checked={field.value.includes('clinical')}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, 'clinical'])
                                : field.onChange(field.value.filter((value) => value !== 'clinical'))
                            }}
                          />
                          <Label htmlFor="clinical" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                            Clinical
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="research"
                            checked={field.value.includes('research')}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, 'research'])
                                : field.onChange(field.value.filter((value) => value !== 'research'))
                            }}
                          />
                          <Label htmlFor="research" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                            Research
                          </Label>
                        </div>
                      </div>
                      <FormMessage />
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
                        <Input type="email" placeholder="admin@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="City, State" {...field} />
                      </FormControl>
                      <FormMessage />
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
                            <SelectValue placeholder="Select a tier" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Basic">Basic</SelectItem>
                          <SelectItem value="Standard">Standard</SelectItem>
                          <SelectItem value="Premium">Premium</SelectItem>
                          <SelectItem value="Enterprise">Enterprise</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Facility</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 h-12 p-1 bg-muted/50 rounded-lg border">
          <TabsTrigger 
            value="all" 
            className="h-10 px-6 font-medium transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border"
          >
            All Facilities
          </TabsTrigger>
          <TabsTrigger 
            value="hospitals" 
            className="h-10 px-6 font-medium transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border"
          >
            Hospitals
          </TabsTrigger>
          <TabsTrigger 
            value="research" 
            className="h-10 px-6 font-medium transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border"
          >
            Research Centers
          </TabsTrigger>
          <TabsTrigger 
            value="pending" 
            className="h-10 px-6 font-medium transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border"
          >
            Pending Approval
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Facilities</CardTitle>
              <CardDescription>A comprehensive list of all facilities in the system.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {facilities.map(facility => (
                  <div key={facility.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center space-x-3 text-sm">
                      {getFacilityTypeIcon(facility.type)}
                      <span className="font-semibold">{facility.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{facility.location}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      {getStatusBadge(facility.status)}
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Manage
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hospitals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hospitals</CardTitle>
              <CardDescription>List of all hospital facilities.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {facilities
                  .filter(facility => facility.type === 'Hospital')
                  .map(facility => (
                    <div key={facility.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center space-x-3 text-sm">
                        {getFacilityTypeIcon(facility.type)}
                        <span className="font-semibold">{facility.name}</span>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{facility.location}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        {getStatusBadge(facility.status)}
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="research" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Research Centers</CardTitle>
              <CardDescription>List of all research facilities.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {facilities
                  .filter(facility => facility.type === 'Research Center')
                  .map(facility => (
                    <div key={facility.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center space-x-3 text-sm">
                        {getFacilityTypeIcon(facility.type)}
                        <span className="font-semibold">{facility.name}</span>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{facility.location}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        {getStatusBadge(facility.status)}
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approval</CardTitle>
              <CardDescription>Facilities awaiting approval.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {facilities
                  .filter(facility => facility.status === 'pending')
                  .map(facility => (
                    <div key={facility.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center space-x-3 text-sm">
                        {getFacilityTypeIcon(facility.type)}
                        <span className="font-semibold">{facility.name}</span>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{facility.location}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        {getStatusBadge(facility.status)}
                        <Button variant="outline" size="sm">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default FacilitiesPage;
