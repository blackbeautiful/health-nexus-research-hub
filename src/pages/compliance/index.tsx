
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Download, RefreshCw, AlertTriangle, ChevronDown, Shield, FileText } from 'lucide-react';

const CompliancePage = () => {
  return (
    <MainLayout>
      <PageHeader 
        title="Compliance Dashboard" 
        description="Monitor regulatory compliance and audit readiness"
        breadcrumbs={[{ label: 'Compliance' }]}
        action={{
          label: "Export Report",
          icon: Download,
          onClick: () => console.log("Export compliance report")
        }}
      />
      
      <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="audits">Audits</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Button variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Overall Compliance</CardTitle>
            <CardDescription>All regulatory frameworks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">98%</div>
            <div className="mt-2">
              <Progress value={98} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Target: 100%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">HIPAA Compliance</CardTitle>
            <CardDescription>Patient data protection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">100%</div>
            <div className="mt-2">
              <Progress value={100} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Target: 100%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">GCP Compliance</CardTitle>
            <CardDescription>Good Clinical Practice</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-500">94%</div>
            <div className="mt-2">
              <Progress value={94} className="h-2" indicatorClassName="bg-amber-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Target: 100%</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Compliance Alerts</CardTitle>
            <CardDescription>Issues requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-md">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Protocol Deviation Documentation</h4>
                  <p className="text-sm text-muted-foreground">2 protocol deviations require additional documentation</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button size="sm" variant="outline">View Details</Button>
                    <Button size="sm">Resolve</Button>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-md">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Informed Consent Updates</h4>
                  <p className="text-sm text-muted-foreground">Protocol amendment requires consent updates for 8 patients</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button size="sm" variant="outline">View Patients</Button>
                    <Button size="sm">Process Updates</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Audits</CardTitle>
            <CardDescription>Scheduled regulatory reviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <h4 className="font-medium">IRB Annual Review</h4>
                  <p className="text-sm text-muted-foreground">May 15, 2025</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">Prepare</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <h4 className="font-medium">FDA Site Inspection</h4>
                  <p className="text-sm text-muted-foreground">June 22-24, 2025</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">Prepare</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <h4 className="font-medium">Sponsor Monitoring Visit</h4>
                  <p className="text-sm text-muted-foreground">July 8, 2025</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">Prepare</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Regulatory Document Status</CardTitle>
          <CardDescription>Key regulatory document completion status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Informed Consent Forms", status: "Complete", progress: 100, icon: FileText },
              { name: "Case Report Forms", status: "Incomplete", progress: 87, icon: FileText },
              { name: "Training Certificates", status: "Complete", progress: 100, icon: Shield },
              { name: "Protocol Amendments", status: "Complete", progress: 100, icon: FileText },
              { name: "Adverse Event Reports", status: "Incomplete", progress: 92, icon: AlertTriangle }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="bg-muted p-2 rounded-md">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{item.name}</span>
                    <span className={item.status === "Complete" ? "text-green-500" : "text-amber-500"}>
                      {item.status}
                    </span>
                  </div>
                  <Progress value={item.progress} className="h-2" 
                    indicatorClassName={item.status === "Complete" ? "bg-green-500" : "bg-amber-500"} 
                  />
                </div>
                <Button variant="ghost" size="icon">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default CompliancePage;
