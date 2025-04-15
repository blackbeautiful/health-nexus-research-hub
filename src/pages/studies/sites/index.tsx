import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Phone, Mail, User, Users, Plus, FileText, Edit, Trash2, Search } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface StudySite {
  id: string;
  name: string;
  address: string;
  status: 'active' | 'pending' | 'inactive';
  pi: string;
  coordinator: string;
  phone: string;
  email: string;
  patientCount: number;
  studyCount: number;
}

const mockStudySites: StudySite[] = [
  {
    id: 'site-001',
    name: 'Memorial Research Center',
    address: '1234 Medical Parkway, Boston, MA 02115',
    status: 'active',
    pi: 'Dr. Rebecca Martinez',
    coordinator: 'Sarah Johnson',
    phone: '(617) 555-1234',
    email: 'research@memorialcenter.org',
    patientCount: 42,
    studyCount: 3
  },
  {
    id: 'site-002',
    name: 'University Hospital',
    address: '500 University Ave, San Francisco, CA 94143',
    status: 'active',
    pi: 'Dr. Michael Chen',
    coordinator: 'David Wilson',
    phone: '(415) 555-6789',
    email: 'clinical.research@ucsf.edu',
    patientCount: 36,
    studyCount: 4
  },
  {
    id: 'site-003',
    name: 'Lakeside Medical Center',
    address: '789 Lakeview Blvd, Chicago, IL 60611',
    status: 'pending',
    pi: 'Dr. Emily Rodriguez',
    coordinator: 'Thomas Brown',
    phone: '(312) 555-4321',
    email: 'research@lakesidemc.org',
    patientCount: 0,
    studyCount: 2
  },
  {
    id: 'site-004',
    name: 'Southside Clinical Research',
    address: '567 Oak Street, Atlanta, GA 30308',
    status: 'inactive',
    pi: 'Dr. James Wilson',
    coordinator: 'Lisa Garcia',
    phone: '(404) 555-8765',
    email: 'info@southsideresearch.org',
    patientCount: 28,
    studyCount: 1
  }
];

const StudySitesPage = () => {
  const [sites, setSites] = useState<StudySite[]>(mockStudySites);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingSite, setIsAddingSite] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const filteredSites = sites.filter(site => {
    const matchesSearch = 
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.pi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.coordinator.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'active' && site.status === 'active') ||
      (activeTab === 'pending' && site.status === 'pending') ||
      (activeTab === 'inactive' && site.status === 'inactive');
    
    return matchesSearch && matchesTab;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "pending": return "secondary";
      case "inactive": return "outline";
      default: return "outline";
    }
  };

  return (
    <MainLayout>
      <PageHeader 
        title="Study Sites" 
        description="Manage research locations and facilities"
        breadcrumbs={[
          { label: 'Studies', link: '/studies' },
          { label: 'Study Sites' }
        ]}
      />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All Sites</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search sites, PIs, coordinators..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Dialog open={isAddingSite} onOpenChange={setIsAddingSite}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Site
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Study Site</DialogTitle>
                <DialogDescription>
                  Enter the details for the new research site.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="site-name" className="text-sm font-medium">Site Name</label>
                    <Input id="site-name" placeholder="Enter site name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="site-status" className="text-sm font-medium">Status</label>
                    <select id="site-status" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="active">Active</option>
                      <option value="pending">Pending Activation</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="site-address" className="text-sm font-medium">Address</label>
                  <Input id="site-address" placeholder="Enter full address" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="site-pi" className="text-sm font-medium">Principal Investigator</label>
                    <Input id="site-pi" placeholder="Enter PI name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="site-coordinator" className="text-sm font-medium">Research Coordinator</label>
                    <Input id="site-coordinator" placeholder="Enter coordinator name" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="site-phone" className="text-sm font-medium">Contact Phone</label>
                    <Input id="site-phone" placeholder="Enter phone number" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="site-email" className="text-sm font-medium">Contact Email</label>
                    <Input id="site-email" placeholder="Enter email address" type="email" />
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingSite(false)}>Cancel</Button>
                <Button onClick={() => setIsAddingSite(false)}>Save Site</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {filteredSites.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Building2 className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium">No study sites found</h3>
            <p className="text-muted-foreground text-sm mt-1 mb-4">
              {searchQuery 
                ? "No sites match your search criteria. Try adjusting your filters." 
                : "Add your first study site to get started."}
            </p>
            <Button onClick={() => setIsAddingSite(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Site
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredSites.map((site) => (
            <Card key={site.id}>
              <CardHeader className="pb-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <CardTitle className="flex items-center text-xl">
                      <Building2 className="h-5 w-5 mr-2 text-muted-foreground" />
                      {site.name}
                    </CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <MapPin className="h-3.5 w-3.5 mr-1.5" />
                      {site.address}
                    </CardDescription>
                  </div>
                  <Badge variant={getStatusBadgeVariant(site.status)} className="capitalize">
                    {site.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <User className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Principal Investigator</p>
                        <p className="text-sm text-muted-foreground">{site.pi}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <User className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Research Coordinator</p>
                        <p className="text-sm text-muted-foreground">{site.coordinator}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Phone className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Contact Phone</p>
                        <p className="text-sm text-muted-foreground">{site.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Mail className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Contact Email</p>
                        <p className="text-sm text-muted-foreground">{site.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {site.status === 'active' && (
                  <div className="grid grid-cols-2 gap-4 mt-4 border-t pt-4">
                    <div className="flex items-center justify-center p-3 bg-muted/30 rounded-md">
                      <Users className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <p className="text-2xl font-bold">{site.patientCount}</p>
                        <p className="text-xs text-muted-foreground">Enrolled Patients</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center p-3 bg-muted/30 rounded-md">
                      <FileText className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <p className="text-2xl font-bold">{site.studyCount}</p>
                        <p className="text-xs text-muted-foreground">Active Studies</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <div className="flex flex-wrap gap-2 w-full">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link to={`/studies/sites/${site.id}`}>View Details</Link>
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Site
                  </Button>
                  {site.status === 'active' && (
                    <Button variant="outline" className="flex-1">
                      <FileText className="h-4 w-4 mr-2" />
                      Site Documents
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export default StudySitesPage;
