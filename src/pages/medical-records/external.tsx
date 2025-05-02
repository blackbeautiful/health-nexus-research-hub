
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, Filter, Download, FileUp, ExternalLink, Eye, File, FileText, 
  Building, Calendar, MoreHorizontal 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ExternalRecord {
  id: string;
  recordType: string;
  facility: string;
  date: string;
  description: string;
  fileType: string;
  uploadedBy: string;
  uploadDate: string;
  status: "verified" | "pending" | "rejected";
  size: string;
}

const ExternalRecordsPage = () => {
  const externalRecords: ExternalRecord[] = [
    {
      id: "EXT-1001",
      recordType: "Mammogram Report",
      facility: "Westside Imaging Center",
      date: "2025-03-22",
      description: "Diagnostic mammogram with suspicious findings",
      fileType: "PDF",
      uploadedBy: "Dr. Rebecca Martinez",
      uploadDate: "2025-03-25",
      status: "verified",
      size: "1.2 MB"
    },
    {
      id: "EXT-1002",
      recordType: "Pathology Report",
      facility: "Central City Laboratory",
      date: "2025-03-24",
      description: "Breast biopsy pathology results",
      fileType: "PDF",
      uploadedBy: "Dr. Rebecca Martinez",
      uploadDate: "2025-03-26",
      status: "verified",
      size: "3.5 MB"
    },
    {
      id: "EXT-1003",
      recordType: "Surgical Consultation",
      facility: "Memorial General Hospital",
      date: "2025-03-30",
      description: "Surgical oncology consultation notes",
      fileType: "PDF",
      uploadedBy: "Dr. Michael Chen",
      uploadDate: "2025-04-01",
      status: "verified",
      size: "852 KB"
    },
    {
      id: "EXT-1004",
      recordType: "Prior Imaging",
      facility: "Westside Imaging Center",
      date: "2024-03-15",
      description: "Previous screening mammogram for comparison",
      fileType: "DICOM",
      uploadedBy: "External Records Dept",
      uploadDate: "2025-03-25",
      status: "verified",
      size: "24.6 MB"
    },
    {
      id: "EXT-1005",
      recordType: "Medical Oncology Notes",
      facility: "City Cancer Center",
      date: "2025-04-05",
      description: "Initial medical oncology consultation",
      fileType: "PDF",
      uploadedBy: "Dr. Sarah Williams",
      uploadDate: "2025-04-06",
      status: "pending",
      size: "1.8 MB"
    },
    {
      id: "EXT-1006",
      recordType: "Radiation Oncology Notes",
      facility: "Regional Radiation Center",
      date: "2025-04-08",
      description: "Radiation therapy planning consultation",
      fileType: "PDF",
      uploadedBy: "Dr. James Wilson",
      uploadDate: "2025-04-09",
      status: "pending",
      size: "2.1 MB"
    },
    {
      id: "EXT-1007",
      recordType: "Laboratory Results",
      facility: "Memorial General Hospital",
      date: "2025-04-02",
      description: "Preoperative laboratory studies",
      fileType: "PDF",
      uploadedBy: "Dr. Elena Rodriguez",
      uploadDate: "2025-04-03",
      status: "verified",
      size: "756 KB"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Verified</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Pending</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
      default:
        return null;
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'PDF':
        return <FileText className="h-4 w-4 text-red-500" />;
      case 'DICOM':
        return <File className="h-4 w-4 text-blue-500" />;
      default:
        return <File className="h-4 w-4" />;
    }
  };

  return (
    <MainLayout>
      <PageHeader
        title="External Records"
        description="View and manage records from external facilities"
        breadcrumbs={[
          { label: 'Medical Records', link: '/medical-records' },
          { label: 'External Records' }
        ]}
        action={{
          label: 'Upload Record',
          icon: FileUp,
          onClick: () => console.log('Upload external record')
        }}
      />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Request Records</CardTitle>
          <CardDescription>Request patient records from external facilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Facility Name</label>
                  <Input placeholder="Enter facility name" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Contact Person</label>
                    <Input placeholder="Name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Contact Email/Phone</label>
                    <Input placeholder="Email or phone number" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Records Description</label>
                  <Input placeholder="Type of records needed" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Date Range From</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Date Range To</label>
                    <Input type="date" />
                  </div>
                </div>
                <Button>
                  Submit Request
                </Button>
              </div>
            </div>
            
            <Card className="bg-muted/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Patient Authorization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs space-y-2">
                  <p>Before requesting records, ensure patient authorization is obtained.</p>
                  <div className="flex items-center mt-4 text-sm">
                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Authorization Form
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>External Records</CardTitle>
              <CardDescription>Records uploaded from outside facilities</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search records..."
                  className="pl-8 w-[200px] md:w-[250px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Record ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Facility</TableHead>
                <TableHead>Record Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {externalRecords.map((record) => (
                <TableRow key={record.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{record.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getFileIcon(record.fileType)}
                      <span>{record.recordType}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-sm">
                      <Building className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{record.facility}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-sm">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{record.date}</span>
                    </div>
                  </TableCell>
                  <TableCell>{record.description}</TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => console.log(`View ${record.id}`)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Record
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log(`Download ${record.id}`)}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => console.log(`Verify ${record.id}`)}>
                          {record.status === "pending" ? (
                            <>
                              <FileText className="mr-2 h-4 w-4" />
                              Verify Record
                            </>
                          ) : (
                            <>
                              <FileText className="mr-2 h-4 w-4" />
                              Update Status
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log(`Link ${record.id}`)}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Link to Patient Record
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="border-t p-4 flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {externalRecords.length} records
          </div>
          <Button variant="outline" size="sm">Load More</Button>
        </CardFooter>
      </Card>
    </MainLayout>
  );
};

export default ExternalRecordsPage;
