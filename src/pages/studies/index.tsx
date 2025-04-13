
import React from 'react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Plus, Search, FileSearch, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

const StudiesPage = () => {
  return (
    <Layout title="Research Studies">
      <PageHeader 
        title="Research Studies" 
        description="Manage and track all clinical research studies"
        breadcrumbs={[
          { label: 'Studies' }
        ]}
        action={{
          label: 'New Study',
          icon: Plus,
          href: '/studies/protocol-setup'
        }}
      />
      
      <div className="mb-6">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="active" className="flex-1 md:flex-initial">Active (8)</TabsTrigger>
            <TabsTrigger value="completed" className="flex-1 md:flex-initial">Completed (12)</TabsTrigger>
            <TabsTrigger value="draft" className="flex-1 md:flex-initial">Draft (3)</TabsTrigger>
            <TabsTrigger value="all" className="flex-1 md:flex-initial">All Studies</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search studies by name, ID, or principal investigator..."
            className="pl-8"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select defaultValue="all-phases">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Study Phase" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-phases">All Phases</SelectItem>
              <SelectItem value="phase-1">Phase I</SelectItem>
              <SelectItem value="phase-2">Phase II</SelectItem>
              <SelectItem value="phase-3">Phase III</SelectItem>
              <SelectItem value="phase-4">Phase IV</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="flex gap-2">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4">
        {mockStudies.map((study) => (
          <Link to={`/studies/${study.id}`} key={study.id} className="block">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-lg">{study.name}</h3>
                        <Badge variant={getStudyStatusBadgeVariant(study.status)}>{study.status}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ID: {study.id} • {study.phase} • {study.type}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {study.tags.map((tag) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Principal Investigator</p>
                      <p className="font-medium">{study.principalInvestigator}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Sites</p>
                      <p className="font-medium">{study.siteCount} active sites</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Enrollment</p>
                      <p className="font-medium">{study.enrollment.current} / {study.enrollment.target} participants</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-xs text-gray-500">Study Timeline</p>
                      <p className="text-xs font-medium">{getTimelineProgress(study.timeline.start, study.timeline.end)}% Complete</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-health-primary h-2 rounded-full"
                        style={{ width: `${getTimelineProgress(study.timeline.start, study.timeline.end)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>{formatDate(study.timeline.start)}</span>
                      <span>{formatDate(study.timeline.end)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

// Helper functions
const getStudyStatusBadgeVariant = (status: string) => {
  switch(status) {
    case 'Active': return 'default';
    case 'Completed': return 'secondary';
    case 'Draft': return 'outline';
    case 'On Hold': return 'destructive';
    default: return 'outline';
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    year: 'numeric'
  });
};

const getTimelineProgress = (start: string, end: string) => {
  const startDate = new Date(start).getTime();
  const endDate = new Date(end).getTime();
  const currentDate = new Date().getTime();
  
  if (currentDate <= startDate) return 0;
  if (currentDate >= endDate) return 100;
  
  const totalDuration = endDate - startDate;
  const elapsedDuration = currentDate - startDate;
  
  return Math.round((elapsedDuration / totalDuration) * 100);
};

// Mock data
const mockStudies = [
  {
    id: "ONCO-2025-001",
    name: "Neoadjuvant Immunotherapy in Resectable NSCLC",
    status: "Active",
    phase: "Phase II",
    type: "Interventional",
    principalInvestigator: "Dr. Rebecca Martinez",
    siteCount: 5,
    enrollment: {
      current: 32,
      target: 50
    },
    timeline: {
      start: "2025-01-15",
      end: "2026-06-30"
    },
    tags: ["Lung Cancer", "Immunotherapy", "Neoadjuvant"]
  },
  {
    id: "ONCO-2025-002",
    name: "CDK4/6 Inhibition in HR+ Metastatic Breast Cancer",
    status: "Active",
    phase: "Phase III",
    type: "Interventional",
    principalInvestigator: "Dr. James Wilson",
    siteCount: 8,
    enrollment: {
      current: 124,
      target: 220
    },
    timeline: {
      start: "2024-11-10",
      end: "2026-12-31"
    },
    tags: ["Breast Cancer", "Metastatic", "HR+"]
  },
  {
    id: "ONCO-2025-003",
    name: "Novel ctDNA Collection Protocol for Early Cancer Detection",
    status: "Draft",
    phase: "Phase I",
    type: "Observational",
    principalInvestigator: "Dr. Sarah Jackson",
    siteCount: 3,
    enrollment: {
      current: 0,
      target: 75
    },
    timeline: {
      start: "2025-06-01",
      end: "2026-03-31"
    },
    tags: ["ctDNA", "Early Detection", "Multiple Cancer Types"]
  },
  {
    id: "ONCO-2024-005",
    name: "PARP Inhibition in BRCA-mutated Ovarian Cancer",
    status: "Active",
    phase: "Phase III",
    type: "Interventional",
    principalInvestigator: "Dr. Michael Brown",
    siteCount: 12,
    enrollment: {
      current: 183,
      target: 300
    },
    timeline: {
      start: "2024-08-15",
      end: "2027-02-28"
    },
    tags: ["Ovarian Cancer", "BRCA", "PARP Inhibitor"]
  },
  {
    id: "ONCO-2024-001",
    name: "CAR-T Cell Therapy in R/R Multiple Myeloma",
    status: "On Hold",
    phase: "Phase II",
    type: "Interventional",
    principalInvestigator: "Dr. Jennifer Adams",
    siteCount: 4,
    enrollment: {
      current: 18,
      target: 60
    },
    timeline: {
      start: "2024-05-20",
      end: "2026-05-31"
    },
    tags: ["Multiple Myeloma", "CAR-T", "Refractory"]
  }
];

export default StudiesPage;
