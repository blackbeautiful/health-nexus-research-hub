
import React, { useState } from 'react';
import { Search, Plus, Filter, FileText, Clock, ArrowUpDown } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ClinicalNotesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Mock notes data
  const notes = [
    {
      id: '1',
      title: 'Initial Consultation',
      patientName: 'Sarah Parker',
      patientId: 'PT-1024',
      author: 'Dr. Rebecca Martinez',
      authorAvatar: 'RM',
      type: 'consultation',
      createdAt: new Date('2025-04-10T09:30:00'),
      status: 'complete',
      tags: ['initial visit', 'diagnosis']
    },
    {
      id: '2',
      title: 'Treatment Response Evaluation',
      patientName: 'John Davis',
      patientId: 'PT-1056',
      author: 'Dr. James Wilson',
      authorAvatar: 'JW',
      type: 'progress',
      createdAt: new Date('2025-04-09T14:15:00'),
      status: 'complete',
      tags: ['treatment', 'evaluation']
    },
    {
      id: '3',
      title: 'Post-Chemotherapy Follow-up',
      patientName: 'Emma Thompson',
      patientId: 'PT-1078',
      author: 'Dr. Anna Lopez',
      authorAvatar: 'AL',
      type: 'follow-up',
      createdAt: new Date('2025-04-08T11:45:00'),
      status: 'complete',
      tags: ['follow-up', 'chemotherapy']
    },
    {
      id: '4',
      title: 'Adverse Event Report',
      patientName: 'Michael Brown',
      patientId: 'PT-1132',
      author: 'Dr. Rebecca Martinez',
      authorAvatar: 'RM',
      type: 'adverse-event',
      createdAt: new Date('2025-04-08T09:20:00'),
      status: 'complete',
      tags: ['adverse event', 'grade 2']
    },
    {
      id: '5',
      title: 'Pre-Surgery Assessment',
      patientName: 'Linda Wilson',
      patientId: 'PT-1085',
      author: 'Dr. James Wilson',
      authorAvatar: 'JW',
      type: 'consultation',
      createdAt: new Date('2025-04-07T16:30:00'),
      status: 'draft',
      tags: ['surgery', 'assessment']
    },
    {
      id: '6',
      title: 'Treatment Plan Review',
      patientName: 'Robert Garcia',
      patientId: 'PT-1099',
      author: 'Dr. Anna Lopez',
      authorAvatar: 'AL',
      type: 'progress',
      createdAt: new Date('2025-04-07T10:15:00'),
      status: 'draft',
      tags: ['treatment plan', 'review']
    }
  ];
  
  // Format date relative to now
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  const getNoteTypeColor = (type: string) => {
    switch (type) {
      case 'consultation':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'progress':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'follow-up':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'adverse-event':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'draft':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const handleSortChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  
  // Filter notes based on active tab and search term
  const filteredNotes = notes.filter((note) => {
    const matchesSearch = searchTerm === '' 
      || note.title.toLowerCase().includes(searchTerm.toLowerCase())
      || note.patientName.toLowerCase().includes(searchTerm.toLowerCase())
      || note.patientId.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (activeTab === 'all') {
      return matchesSearch;
    } else if (activeTab === 'draft') {
      return matchesSearch && note.status === 'draft';
    } else if (activeTab === 'complete') {
      return matchesSearch && note.status === 'complete';
    } else {
      return matchesSearch && note.type === activeTab;
    }
  });
  
  // Sort notes
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });
  
  return (
    <Layout title="Clinical Notes">
      <PageHeader 
        title="Clinical Notes" 
        description="Manage patient clinical documentation"
        breadcrumbs={[
          { label: 'Clinical Workflows', link: '/clinical-workflows' },
          { label: 'Clinical Notes' }
        ]}
      />
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search notes..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by type" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Note Types</SelectItem>
              <SelectItem value="consultation">Consultation Notes</SelectItem>
              <SelectItem value="progress">Progress Notes</SelectItem>
              <SelectItem value="follow-up">Follow-up Notes</SelectItem>
              <SelectItem value="adverse-event">Adverse Event Reports</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Note
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">All Notes</TabsTrigger>
                <TabsTrigger value="consultation">Consultation</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="adverse-event">Adverse Events</TabsTrigger>
                <TabsTrigger value="draft">Drafts</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center"
                  onClick={handleSortChange}
                >
                  <Clock className="mr-1 h-4 w-4" />
                  Date 
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
                
                <Select defaultValue="this-week">
                  <SelectTrigger className="w-[140px] h-8 text-xs">
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                    <SelectItem value="all-time">All Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <TabsContent value="all" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Note Title</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedNotes.map((note) => (
                    <TableRow key={note.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          {note.title}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{note.patientName}</p>
                          <p className="text-xs text-muted-foreground">{note.patientId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getNoteTypeColor(note.type)}>
                          {note.type.replace('-', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <div className="flex h-full w-full items-center justify-center bg-health-primary text-white text-xs">
                              {note.authorAvatar}
                            </div>
                          </Avatar>
                          <span className="text-sm">{note.author}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          {formatDate(note.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(note.status)}>
                          {note.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          {note.status === 'draft' ? 'Edit' : 'View'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="consultation" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Note Title</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedNotes.filter(n => n.type === 'consultation').map((note) => (
                    <TableRow key={note.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          {note.title}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{note.patientName}</p>
                          <p className="text-xs text-muted-foreground">{note.patientId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <div className="flex h-full w-full items-center justify-center bg-health-primary text-white text-xs">
                              {note.authorAvatar}
                            </div>
                          </Avatar>
                          <span className="text-sm">{note.author}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          {formatDate(note.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(note.status)}>
                          {note.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          {note.status === 'draft' ? 'Edit' : 'View'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            {/* Similar TabsContent components for other tabs would go here */}
          </Tabs>
        </CardHeader>
      </Card>
    </Layout>
  );
};

export default ClinicalNotesPage;
