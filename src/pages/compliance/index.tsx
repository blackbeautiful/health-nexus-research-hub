
import React from 'react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertCircle, CheckCircle, Clock, Download, FileText, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const CompliancePage = () => {
  return (
    <Layout title="Compliance">
      <PageHeader
        title="Regulatory Compliance"
        description="Monitor and manage regulatory compliance requirements"
        breadcrumbs={[{ label: 'Compliance' }]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" /> Generate Report
            </Button>
            <Button size="sm">
              <CheckCircle className="h-4 w-4 mr-2" /> Run Assessment
            </Button>
          </div>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">HIPAA Compliance</CardTitle>
            <CardDescription>Overall compliance level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">92%</span>
                <Badge className="bg-green-500">Compliant</Badge>
              </div>
              <Progress value={92} className="h-2" />
              <p className="text-xs text-muted-foreground">Last assessment: 3 days ago</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">GDPR Compliance</CardTitle>
            <CardDescription>Overall compliance level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">87%</span>
                <Badge className="bg-amber-500">Action Required</Badge>
              </div>
              <Progress value={87} className="h-2" />
              <p className="text-xs text-muted-foreground">Last assessment: 7 days ago</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">FDA 21 CFR Part 11</CardTitle>
            <CardDescription>Overall compliance level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">95%</span>
                <Badge className="bg-green-500">Compliant</Badge>
              </div>
              <Progress value={95} className="h-2" />
              <p className="text-xs text-muted-foreground">Last assessment: 2 days ago</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Latest Compliance Issues</CardTitle>
              <CardDescription>
                Issues requiring attention or remediation
              </CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search issues..."
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4 bg-amber-50 text-amber-800 border-amber-200">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Data Retention Policy Update Required</AlertTitle>
            <AlertDescription>
              GDPR requirements for data retention periods need to be updated in the system settings.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-3">
                <h4 className="font-medium">Incomplete Data Processing Agreement</h4>
                <p className="text-sm text-muted-foreground">
                  The data processing agreement with third-party analytics provider needs to be updated to comply with GDPR Article 28.
                </p>
              </div>
              <div className="flex items-center justify-end gap-2">
                <Badge variant="outline" className="text-amber-500 border-amber-500">
                  <Clock className="h-3 w-3 mr-1" /> Medium Priority
                </Badge>
                <Button size="sm" variant="outline">View</Button>
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-3">
                <h4 className="font-medium">User Access Review Needed</h4>
                <p className="text-sm text-muted-foreground">
                  Quarterly access review for system users is due according to security policy requirements.
                </p>
              </div>
              <div className="flex items-center justify-end gap-2">
                <Badge variant="outline" className="text-red-500 border-red-500">
                  <AlertCircle className="h-3 w-3 mr-1" /> High Priority
                </Badge>
                <Button size="sm" variant="outline">View</Button>
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-3">
                <h4 className="font-medium">Audit Log Retention Configuration</h4>
                <p className="text-sm text-muted-foreground">
                  Audit logs must be retained for a minimum of 2 years per FDA 21 CFR Part 11 requirements.
                </p>
              </div>
              <div className="flex items-center justify-end gap-2">
                <Badge variant="outline" className="text-amber-500 border-amber-500">
                  <Clock className="h-3 w-3 mr-1" /> Medium Priority
                </Badge>
                <Button size="sm" variant="outline">View</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="hipaa" className="w-full">
        <TabsList className="w-full md:w-auto grid grid-cols-3 md:flex">
          <TabsTrigger value="hipaa" className="flex-1">HIPAA</TabsTrigger>
          <TabsTrigger value="gdpr" className="flex-1">GDPR</TabsTrigger>
          <TabsTrigger value="fda" className="flex-1">FDA 21 CFR Part 11</TabsTrigger>
        </TabsList>
        
        <Card className="mt-6 border-t-0 rounded-t-none">
          <TabsContent value="hipaa" className="mt-0">
            <CardHeader>
              <CardTitle>HIPAA Compliance Requirements</CardTitle>
              <CardDescription>
                Health Insurance Portability and Accountability Act requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg">Administrative Safeguards</h3>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium">Security Management Process</p>
                          <p className="text-sm text-muted-foreground">Risk analysis and management procedures are in place.</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium">Security Personnel</p>
                          <p className="text-sm text-muted-foreground">Security officer has been appointed and trained.</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium">Information Access Management</p>
                          <p className="text-sm text-muted-foreground">Access authorization controls are implemented.</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium">Security Awareness Training</p>
                          <p className="text-sm text-muted-foreground">All staff have completed required training.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg">Technical Safeguards</h3>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium">Access Controls</p>
                          <p className="text-sm text-muted-foreground">Unique user identification and emergency access procedures.</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium">Audit Controls</p>
                          <p className="text-sm text-muted-foreground">Hardware, software, and procedural mechanisms record and examine activity.</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium">Integrity Controls</p>
                          <p className="text-sm text-muted-foreground">Electronic measures to confirm that PHI has not been altered or destroyed.</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-amber-500" />
                        <div>
                          <p className="font-medium">Transmission Security</p>
                          <p className="text-sm text-muted-foreground">Some older transmission protocols need to be updated.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" /> Download Full Report
                    </Button>
                    <Button>
                      <CheckCircle className="h-4 w-4 mr-2" /> Address Issues
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="gdpr" className="mt-0">
            <CardHeader>
              <CardTitle>GDPR Compliance Requirements</CardTitle>
              <CardDescription>
                General Data Protection Regulation requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Alert className="bg-amber-50 text-amber-800 border-amber-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Action Required</AlertTitle>
                  <AlertDescription>
                    2 GDPR compliance issues need to be addressed before the next assessment.
                  </AlertDescription>
                </Alert>
                
                {/* GDPR content would go here, similar to HIPAA section */}
                <Button>View GDPR Compliance Details</Button>
              </div>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="fda" className="mt-0">
            <CardHeader>
              <CardTitle>FDA 21 CFR Part 11 Compliance</CardTitle>
              <CardDescription>
                Electronic records and electronic signatures requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Alert className="bg-green-50 text-green-800 border-green-200">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Fully Compliant</AlertTitle>
                  <AlertDescription>
                    All FDA 21 CFR Part 11 requirements have been met and verified.
                  </AlertDescription>
                </Alert>
                
                {/* FDA content would go here, similar to HIPAA section */}
                <Button>View FDA Compliance Details</Button>
              </div>
            </CardContent>
          </TabsContent>
        </Card>
      </Tabs>
    </Layout>
  );
};

export default CompliancePage;
