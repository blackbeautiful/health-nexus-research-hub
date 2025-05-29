
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, FileText, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NursingNotesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const mockNotes = [
    {
      id: 1,
      patientName: 'John Smith',
      patientId: 'P001',
      date: '2025-01-15',
      time: '14:30',
      nurse: 'Sarah Wilson, RN',
      priority: 'High',
      category: 'Assessment',
      note: 'Patient showing signs of improvement. Vital signs stable. Pain level reported as 3/10.'
    },
    {
      id: 2,
      patientName: 'Maria Garcia',
      patientId: 'P002',
      date: '2025-01-15',
      time: '13:15',
      nurse: 'Sarah Wilson, RN',
      priority: 'Normal',
      category: 'Medication',
      note: 'Administered prescribed medication. Patient tolerated well with no adverse reactions.'
    }
  ];

  return (
    <Layout title="Nursing Notes">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Nursing Notes</h1>
            <p className="text-muted-foreground">Document and track patient care notes</p>
          </div>
          <Button onClick={() => navigate('/clinical-workflows/nursing-notes/new')}>
            <Plus className="h-4 w-4 mr-2" />
            New Note
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notes by patient, content, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notes List */}
        <div className="space-y-4">
          {mockNotes.map((note) => (
            <Card key={note.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{note.patientName}</CardTitle>
                    <CardDescription>Patient ID: {note.patientId}</CardDescription>
                  </div>
                  <Badge variant={note.priority === 'High' ? 'destructive' : 'secondary'}>
                    {note.priority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {note.date} at {note.time}
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {note.nurse}
                    </div>
                    <Badge variant="outline">{note.category}</Badge>
                  </div>
                  <p className="text-sm">{note.note}</p>
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View Full Note
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default NursingNotesPage;
