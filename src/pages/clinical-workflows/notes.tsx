
import React, { useState } from 'react';
import { Search, PlusCircle, FileText, Calendar, Filter, Clock } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';

const ClinicalNotesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  return (
    <Layout title="Clinical Notes">
      <PageHeader 
        title="Clinical Notes" 
        description="Create, search, and manage clinical documentation"
        breadcrumbs={[{ label: 'Clinical Workflows' }, { label: 'Clinical Notes' }]}
        action={{
          label: "New Note",
          icon: PlusCircle,
          onClick: () => {}
        }}
      />
      
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative w-full md:max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search notes by patient, author or content..." 
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-1 items-center gap-4">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Note Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="progress">Progress Notes</SelectItem>
                    <SelectItem value="consult">Consultation Notes</SelectItem>
                    <SelectItem value="procedure">Procedure Notes</SelectItem>
                    <SelectItem value="treatment">Treatment Notes</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="ml-auto hidden md:flex gap-2">
                  <Filter className="h-4 w-4" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
        
        <Tabs defaultValue="recent">
          <TabsList>
            <TabsTrigger value="recent" className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Recent Notes
            </TabsTrigger>
            <TabsTrigger value="my" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              My Notes
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center">
              <PlusCircle className="mr-2 h-4 w-4" />
              Pending Co-Sign
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent" className="space-y-4 mt-4">
            <div className="border rounded-md">
              <div className="grid grid-cols-[30px_1fr] md:grid-cols-[30px_2fr_1fr_1fr_120px] gap-3 p-3 font-medium text-sm border-b bg-muted/40">
                <div></div>
                <div>Patient & Note Type</div>
                <div className="hidden md:block">Author</div>
                <div className="hidden md:block">Date</div>
                <div className="hidden md:block text-right">Actions</div>
              </div>

              {[
                {
                  id: 1,
                  patient: "Sarah Johnson",
                  noteType: "Progress Note",
                  author: "Dr. Rebecca Martinez",
                  date: "Apr 13, 2025",
                  content: "Patient reports improved neuropathy symptoms. Physical exam shows stable disease."
                },
                {
                  id: 2,
                  patient: "Michael Chen",
                  noteType: "Consultation Note",
                  author: "Dr. James Wilson",
                  date: "Apr 12, 2025",
                  content: "Initial oncology consultation for newly diagnosed stage II NSCLC."
                },
                {
                  id: 3,
                  patient: "Robert Davis",
                  noteType: "Treatment Note",
                  author: "Dr. Rebecca Martinez",
                  date: "Apr 11, 2025",
                  content: "Chemotherapy administration: Cycle 3 of FOLFOX. No immediate adverse reactions."
                },
                {
                  id: 4,
                  patient: "Emily Rodriguez",
                  noteType: "Progress Note",
                  author: "Dr. Jennifer Adams",
                  date: "Apr 10, 2025",
                  content: "Follow-up after radiation therapy. Patient tolerating treatment well."
                },
                {
                  id: 5,
                  patient: "James Wilson",
                  noteType: "Procedure Note",
                  author: "Dr. Michael Smith",
                  date: "Apr 10, 2025",
                  content: "Bone marrow biopsy performed without complications. Specimens sent for analysis."
                }
              ].map(note => (
                <div key={note.id} className="grid grid-cols-[30px_1fr] md:grid-cols-[30px_2fr_1fr_1fr_120px] gap-3 p-3 border-b last:border-0 items-center hover:bg-muted/30 transition-colors">
                  <div>
                    <Checkbox id={`note-${note.id}`} />
                  </div>
                  <div className="overflow-hidden">
                    <div className="font-medium truncate">{note.patient}</div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{note.noteType}</Badge>
                      <span className="text-xs text-muted-foreground truncate">{note.content}</span>
                    </div>
                  </div>
                  <div className="hidden md:block text-sm">
                    {note.author}
                  </div>
                  <div className="hidden md:block text-sm">
                    {note.date}
                  </div>
                  <div className="hidden md:flex justify-end gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="sr-only">View Note</span>
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="sr-only">Note Options</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="h-4 w-4"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="my">
            <div className="py-8 px-6 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground/60" />
              <h3 className="mt-4 text-lg font-medium">Your Clinical Notes</h3>
              <p className="mt-2 text-muted-foreground">
                View and manage notes you've authored here
              </p>
              <Button className="mt-4">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Note
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="pending">
            <div className="py-8 px-6 text-center">
              <PlusCircle className="mx-auto h-12 w-12 text-muted-foreground/60" />
              <h3 className="mt-4 text-lg font-medium">Pending Co-Sign</h3>
              <p className="mt-2 text-muted-foreground">
                Notes requiring your review and co-signature will appear here
              </p>
              <Button className="mt-4" variant="outline">
                Check Pending Notes
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ClinicalNotesPage;
