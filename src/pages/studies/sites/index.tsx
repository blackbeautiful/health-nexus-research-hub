
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Plus, Search, Filter, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StudySiteCard from '@/components/studies/StudySiteCard';

const mockSites = [
  {
    id: 'site-001',
    name: 'Memorial Cancer Institute',
    location: 'New York, NY, USA',
    status: 'active' as const,
    principalInvestigator: 'Dr. Rebecca Martinez',
    contactPhone: '+1 (212) 555-8742',
    enrollmentTarget: 50,
    currentEnrollment: 42,
    startDate: '2025-01-15',
    lastVisit: '2025-03-28',
    nextVisit: '2025-06-28'
  },
  {
    id: 'site-002',
    name: 'University Medical Center',
    location: 'Boston, MA, USA',
    status: 'active' as const,
    principalInvestigator: 'Dr. Michael Chen',
    contactPhone: '+1 (617) 555-3901',
    enrollmentTarget: 40,
    currentEnrollment: 37,
    startDate: '2025-02-01',
    lastVisit: '2025-04-15',
    nextVisit: '2025-07-15'
  },
  {
    id: 'site-003',
    name: 'Southwest Oncology Center',
    location: 'Houston, TX, USA',
    status: 'active' as const,
    principalInvestigator: 'Dr. Sarah Johnson',
    contactPhone: '+1 (713) 555-6274',
    enrollmentTarget: 35,
    currentEnrollment: 20,
    startDate: '2025-02-15',
    lastVisit: '2025-04-10',
    nextVisit: '2025-05-10'
  },
  {
    id: 'site-004',
    name: 'Pacific Research Hospital',
    location: 'San Francisco, CA, USA',
    status: 'pending' as const,
    principalInvestigator: 'Dr. Alex Wong',
    contactPhone: '+1 (415) 555-9382',
    enrollmentTarget: 30,
    currentEnrollment: 0,
    startDate: '2025-05-01'
  },
  {
    id: 'site-005',
    name: 'Midwest Clinical Research',
    location: 'Chicago, IL, USA',
    status: 'closed' as const,
    principalInvestigator: 'Dr. Elisa Thompson',
    contactPhone: '+1 (312) 555-4721',
    enrollmentTarget: 25,
    currentEnrollment: 22,
    startDate: '2024-10-01',
    lastVisit: '2025-03-01'
  }
];

const StudySitesPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');

  const filteredSites = mockSites.filter(site => {
    // Filter by tab (status)
    if (activeTab !== 'all' && site.status !== activeTab) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && !site.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !site.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !site.principalInvestigator.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by region
    if (regionFilter !== 'all') {
      if (regionFilter === 'east' && !['NY', 'MA', 'PA', 'NJ'].some(state => site.location.includes(state))) {
        return false;
      } else if (regionFilter === 'west' && !['CA', 'WA', 'OR', 'NV'].some(state => site.location.includes(state))) {
        return false;
      } else if (regionFilter === 'midwest' && !['IL', 'MI', 'OH', 'WI'].some(state => site.location.includes(state))) {
        return false;
      } else if (regionFilter === 'south' && !['TX', 'FL', 'GA', 'NC'].some(state => site.location.includes(state))) {
        return false;
      }
    }
    
    return true;
  });

  // Counts for tabs
  const activeSitesCount = mockSites.filter(site => site.status === 'active').length;
  const pendingSitesCount = mockSites.filter(site => site.status === 'pending').length;
  const closedSitesCount = mockSites.filter(site => site.status === 'closed').length;

  return (
    <Layout title="Study Sites">
      <PageHeader 
        title="Study Sites" 
        description="Manage and monitor all clinical trial sites"
        breadcrumbs={[
          { label: 'Studies', href: '/studies' },
          { label: 'Sites' }
        ]}
        action={{
          label: 'Add New Site',
          icon: Plus,
          href: '/studies/sites/new'
        }}
      />
      
      <div className="mb-6">
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="all" className="flex-1 md:flex-initial">All Sites ({mockSites.length})</TabsTrigger>
            <TabsTrigger value="active" className="flex-1 md:flex-initial">Active ({activeSitesCount})</TabsTrigger>
            <TabsTrigger value="pending" className="flex-1 md:flex-initial">Pending ({pendingSitesCount})</TabsTrigger>
            <TabsTrigger value="closed" className="flex-1 md:flex-initial">Closed ({closedSitesCount})</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sites by name, location, or PI..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select defaultValue="all" onValueChange={setRegionFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="east">East Coast</SelectItem>
              <SelectItem value="west">West Coast</SelectItem>
              <SelectItem value="midwest">Midwest</SelectItem>
              <SelectItem value="south">South</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="flex gap-2">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>
      </div>
      
      {filteredSites.length === 0 ? (
        <div className="text-center py-12">
          <MapPin className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
          <h3 className="mt-4 text-lg font-medium">No sites found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Try adjusting your filters to find what you're looking for
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredSites.map((site) => (
            <StudySiteCard key={site.id} site={site} />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default StudySitesPage;
