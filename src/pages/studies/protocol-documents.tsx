
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { UploadIcon, FileText, File, FileSymlink, Paperclip, PlusSquare, Trash2, Download, Edit } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Mock document data
const mockDocuments = [
  {
    id: 'doc-1',
    name: 'Protocol Version 2.1',
    type: 'protocol',
    size: '3.2 MB',
    uploadedBy: 'Dr. Rebecca Martinez',
    uploadDate: '2025-02-15',
    status: 'approved'
  },
  {
    id: 'doc-2',
    name: 'Informed Consent Form',
    type: 'consent',
    size: '250 KB',
    uploadedBy: 'John Wilson',
    uploadDate: '2025-02-03',
    status: 'approved'
  },
  {
    id: 'doc-3',
    name: 'Data Collection Form',
    type: 'form',
    size: '876 KB',
    uploadedBy: 'Dr. Sarah Lee',
    uploadDate: '2025-03-01',
    status: 'review'
  },
  {
    id: 'doc-4',
    name: 'Adverse Event Reporting',
    type: 'form',
    size: '520 KB',
    uploadedBy: 'Dr. Michael Brown',
    uploadDate: '2025-03-10',
    status: 'draft'
  }
];

// File type icons
const fileIcons: Record<string, React.ElementType> = {
  protocol: FileSymlink,
  consent: FileText,
  form: File,
  default: Paperclip
};

// Document status badge variants
const statusVariants: Record<string, string> = {
  approved: 'success',
  review: 'warning',
  draft: 'default',
  rejected: 'destructive'
};

const ProtocolDocumentsPage = () => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState(mockDocuments);
  const [activeTab, setActiveTab] = useState('all');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Handle document reordering with drag and drop
  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    
    const items = Array.from(documents);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setDocuments(items);
    toast({
      title: "Documents Reordered",
      description: "The document order has been updated.",
    });
  };
  
  // Filter documents based on active tab and search query
  const filteredDocuments = documents.filter(doc => {
    const matchesTab = activeTab === 'all' || doc.type === activeTab;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });
  
  // Simulated file upload
  const handleUploadClick = () => {
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev === null) return null;
        const newValue = prev + 10;
        
        if (newValue >= 100) {
          clearInterval(interval);
          
          setTimeout(() => {
            setUploadProgress(null);
            
            const newDoc = {
              id: `doc-${documents.length + 1}`,
              name: 'New Uploaded Document',
              type: 'form',
              size: '1.5 MB',
              uploadedBy: 'Dr. Jane Roberts',
              uploadDate: new Date().toISOString().split('T')[0],
              status: 'draft'
            };
            
            setDocuments([...documents, newDoc]);
            
            toast({
              title: "Document Uploaded",
              description: "New document has been uploaded successfully.",
            });
          }, 500);
        }
        
        return newValue;
      });
    }, 300);
  };
  
  // Delete document
  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    toast({
      title: "Document Deleted",
      description: "The document has been removed.",
    });
  };
  
  return (
    <MainLayout>
      <PageHeader 
        title="Protocol Documents" 
        description="Manage and organize study protocol documents"
        breadcrumbs={[
          { label: 'Studies', link: '/studies' },
          { label: 'BEACON-CRC', link: '/studies/ONCO-2025-001' },
          { label: 'Documents' }
        ]}
        action={{
          label: 'Upload Document',
          icon: UploadIcon,
          onClick: handleUploadClick
        }}
      />
      
      <div className="mb-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
              <div>
                <CardTitle>Study Documentation</CardTitle>
                <CardDescription>Protocol files, forms, and consent documents</CardDescription>
              </div>
              
              <div className="flex items-center space-x-2">
                <Input 
                  placeholder="Search documents..." 
                  className="w-full md:w-auto max-w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button size="icon" variant="outline" onClick={() => setSearchQuery('')}>
                  <File className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 md:w-auto md:inline-flex">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="protocol">Protocol</TabsTrigger>
                <TabsTrigger value="consent">Consent</TabsTrigger>
                <TabsTrigger value="form">Forms</TabsTrigger>
              </TabsList>
              
              {uploadProgress !== null && (
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading document...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
              
              <TabsContent value={activeTab} className="mt-4">
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="documents">
                    {(provided) => (
                      <div 
                        {...provided.droppableProps} 
                        ref={provided.innerRef} 
                        className="space-y-2"
                      >
                        {filteredDocuments.length === 0 ? (
                          <div className="text-center py-8 border rounded-md">
                            <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
                            <h3 className="mt-2 font-medium">No Documents Found</h3>
                            <p className="text-sm text-muted-foreground">
                              {activeTab === 'all' 
                                ? "Upload documents to get started" 
                                : `No ${activeTab} documents found`}
                            </p>
                            <Button variant="outline" className="mt-4" onClick={handleUploadClick}>
                              <PlusSquare className="mr-2 h-4 w-4" />
                              Upload Document
                            </Button>
                          </div>
                        ) : (
                          filteredDocuments.map((doc, index) => {
                            const FileIcon = fileIcons[doc.type] || fileIcons.default;
                            
                            return (
                              <Draggable key={doc.id} draggableId={doc.id} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="border rounded-md p-4 bg-card flex items-center justify-between hover:shadow-sm transition"
                                  >
                                    <div className="flex items-center space-x-4">
                                      <div className="bg-muted rounded-md p-2">
                                        <FileIcon className="h-6 w-6 text-primary" />
                                      </div>
                                      <div>
                                        <h4 className="font-medium">{doc.name}</h4>
                                        <div className="flex items-center text-xs text-muted-foreground">
                                          <span>{doc.size}</span>
                                          <span className="mx-2">•</span>
                                          <span>{doc.uploadDate}</span>
                                          <span className="mx-2">•</span>
                                          <span>Uploaded by {doc.uploadedBy}</span>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                      <Badge className="capitalize">{doc.status}</Badge>
                                      <Button variant="ghost" size="icon">
                                        <Download className="h-4 w-4" />
                                      </Button>
                                      <Button variant="ghost" size="icon">
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button 
                                        variant="ghost" 
                                        size="icon"
                                        onClick={() => handleDeleteDocument(doc.id)}
                                      >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            );
                          })
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Document Approval History</CardTitle>
          <CardDescription>Recent document reviews and approvals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { 
                document: "Protocol Version 2.1", 
                action: "approved", 
                by: "IRB Committee", 
                date: "2025-02-20", 
                comments: "Approved without modifications" 
              },
              { 
                document: "Informed Consent Form", 
                action: "revised", 
                by: "Dr. Rebecca Martinez", 
                date: "2025-02-01", 
                comments: "Updated with additional safety information" 
              },
              { 
                document: "Data Collection Form", 
                action: "submitted", 
                by: "Dr. Sarah Lee", 
                date: "2025-03-01", 
                comments: "Pending review by data management team" 
              }
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-3 p-3 border rounded-md">
                <div className={`rounded-full w-2 h-2 mt-2 ${
                  item.action === 'approved' ? 'bg-green-500' : 
                  item.action === 'revised' ? 'bg-amber-500' : 
                  'bg-blue-500'
                }`} />
                <div>
                  <h4 className="font-medium">{item.document}</h4>
                  <p className="text-sm">
                    <span className="capitalize">{item.action}</span> by {item.by} on {item.date}
                  </p>
                  {item.comments && (
                    <p className="text-xs text-muted-foreground mt-1">{item.comments}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">View Full History</Button>
        </CardFooter>
      </Card>
    </MainLayout>
  );
};

export default ProtocolDocumentsPage;
