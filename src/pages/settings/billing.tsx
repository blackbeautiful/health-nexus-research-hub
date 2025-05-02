
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, CreditCard, Download, FileText, Users, AlertCircle, Building2, ArrowRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { DialogTrigger } from '@radix-ui/react-dialog';

const BillingPage = () => {
  const [activeTab, setActiveTab] = useState('subscription');
  const [changePlanModalOpen, setChangePlanModalOpen] = useState(false);
  const { toast } = useToast();

  const subscriptionData = {
    plan: 'Professional',
    billingCycle: 'Annual',
    price: '$5,990.00',
    status: 'Active',
    nextBillingDate: 'May 15, 2025',
    includedModules: ['Clinical Module', 'Research Module'],
    users: {
      total: 50,
      used: 32,
      remaining: 18
    },
    patients: {
      total: 5000,
      used: 2134,
      remaining: 2866
    },
    facilities: {
      total: 3,
      used: 2,
      remaining: 1
    }
  };

  const billingHistory = [
    { date: 'May 15, 2024', description: 'Annual Subscription - Professional Plan', amount: '$5,990.00', status: 'Paid', invoice: 'INV-2024-05-001' },
    { date: 'May 15, 2023', description: 'Annual Subscription - Professional Plan', amount: '$5,790.00', status: 'Paid', invoice: 'INV-2023-05-001' },
    { date: 'May 15, 2022', description: 'Annual Subscription - Standard Plan', amount: '$3,590.00', status: 'Paid', invoice: 'INV-2022-05-001' }
  ];

  const handlePlanChange = () => {
    setChangePlanModalOpen(false);
    toast({
      title: "Plan change requested",
      description: "Your plan change request has been submitted for review.",
    });
  };

  const handleDownloadInvoice = (invoice: string) => {
    toast({
      title: "Invoice downloaded",
      description: `Invoice ${invoice} has been downloaded.`,
    });
  };

  return (
    <Layout>
      <PageHeader 
        title="Billing & Subscription" 
        description="Manage your subscription, payment methods, and billing history"
        breadcrumbs={[
          { label: 'Settings', link: '/settings' },
          { label: 'Billing & Subscription' }
        ]}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
          <TabsTrigger value="subscription">Current Subscription</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          <TabsTrigger value="history">Billing History</TabsTrigger>
        </TabsList>
        
        {/* Subscription Information Tab */}
        <TabsContent value="subscription" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>Your active subscription details</CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{subscriptionData.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Plan</h4>
                  <p className="text-lg font-semibold">{subscriptionData.plan}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Billing Cycle</h4>
                  <p className="text-lg font-semibold">{subscriptionData.billingCycle}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Price</h4>
                  <p className="text-lg font-semibold">{subscriptionData.price}<span className="text-sm font-normal text-muted-foreground">/year</span></p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Active Modules</h4>
                  <div className="flex flex-wrap gap-2">
                    {subscriptionData.includedModules.map((module, index) => (
                      <Badge key={index} variant="secondary" className="font-normal">
                        {module}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Next Billing Date</h4>
                  <p className="text-lg font-semibold">{subscriptionData.nextBillingDate}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Payment Method</h4>
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span>VISA ending in 4242</span>
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <h3 className="text-lg font-semibold">Usage & Limits</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Users</h4>
                    <span className="text-sm text-muted-foreground">
                      {subscriptionData.users.used} / {subscriptionData.users.total} used
                    </span>
                  </div>
                  <Progress value={(subscriptionData.users.used / subscriptionData.users.total) * 100} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Patient Records</h4>
                    <span className="text-sm text-muted-foreground">
                      {subscriptionData.patients.used} / {subscriptionData.patients.total} used
                    </span>
                  </div>
                  <Progress value={(subscriptionData.patients.used / subscriptionData.patients.total) * 100} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Facilities</h4>
                    <span className="text-sm text-muted-foreground">
                      {subscriptionData.facilities.used} / {subscriptionData.facilities.total} used
                    </span>
                  </div>
                  <Progress value={(subscriptionData.facilities.used / subscriptionData.facilities.total) * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Dialog open={changePlanModalOpen} onOpenChange={setChangePlanModalOpen}>
                <DialogTrigger asChild>
                  <Button>
                    Change Plan
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Change Subscription Plan</DialogTitle>
                    <DialogDescription>
                      Select a new plan that better suits your needs. Changes will be effective on your next billing cycle.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="py-6 space-y-6">
                    <RadioGroup defaultValue="professional">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-start space-x-3 border rounded-md p-3">
                          <RadioGroupItem value="starter" id="starter" />
                          <div className="grid gap-1.5 w-full">
                            <Label htmlFor="starter" className="font-medium">Starter Plan</Label>
                            <div className="text-sm text-muted-foreground">
                              $299/month or $2,990/year
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span>Up to 10 staff accounts, 500 records, 1 facility</span>
                              <Badge variant="outline">Downgrade</Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3 border rounded-md p-3 border-primary bg-primary/5">
                          <RadioGroupItem value="professional" id="professional" />
                          <div className="grid gap-1.5 w-full">
                            <Label htmlFor="professional" className="font-medium">Professional Plan</Label>
                            <div className="text-sm text-muted-foreground">
                              $599/month or $5,990/year
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span>Up to 50 staff accounts, 5,000 records, 3 facilities</span>
                              <Badge variant="secondary">Current Plan</Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3 border rounded-md p-3">
                          <RadioGroupItem value="enterprise" id="enterprise" />
                          <div className="grid gap-1.5 w-full">
                            <Label htmlFor="enterprise" className="font-medium">Enterprise Plan</Label>
                            <div className="text-sm text-muted-foreground">
                              $1,299/month or $12,990/year
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span>Unlimited accounts, records, and facilities</span>
                              <Badge variant="outline">Upgrade</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </RadioGroup>
                    
                    <div className="bg-muted/40 p-3 rounded-md">
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium">Important Note</p>
                          <p className="text-muted-foreground">Plan changes will be effective at the start of your next billing cycle. You will receive a prorated credit or charge for any difference in plan pricing.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setChangePlanModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handlePlanChange}>
                      Confirm Change
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline">
                Cancel Subscription
              </Button>
              
              <div className="flex-1 text-right hidden sm:block">
                <Button variant="link">
                  View Plan Comparison
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Add-ons & Extensions</CardTitle>
              <CardDescription>Enhance your subscription with additional features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="shadow-none border">
                  <CardContent className="pt-6">
                    <div className="flex flex-col space-y-2">
                      <h3 className="font-medium flex items-center">
                        <Users className="mr-2 h-4 w-4 text-muted-foreground" /> Additional Users
                      </h3>
                      <p className="text-sm text-muted-foreground">Add more user accounts beyond your plan limit</p>
                      <div className="mt-2 font-medium">$25 per user / month</div>
                      <Button className="mt-3" size="sm">Add Users</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-none border">
                  <CardContent className="pt-6">
                    <div className="flex flex-col space-y-2">
                      <h3 className="font-medium flex items-center">
                        <Building2 className="mr-2 h-4 w-4 text-muted-foreground" /> Additional Facilities
                      </h3>
                      <p className="text-sm text-muted-foreground">Add more facility locations beyond your plan limit</p>
                      <div className="mt-2 font-medium">$99 per facility / month</div>
                      <Button className="mt-3" size="sm">Add Facilities</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-none border">
                  <CardContent className="pt-6">
                    <div className="flex flex-col space-y-2">
                      <h3 className="font-medium flex items-center">
                        <FileText className="mr-2 h-4 w-4 text-muted-foreground" /> Enhanced Reporting
                      </h3>
                      <p className="text-sm text-muted-foreground">Advanced analytics and custom reporting capabilities</p>
                      <div className="mt-2 font-medium">$199 / month</div>
                      <Button className="mt-3" size="sm">Add Feature</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Payment Methods Tab */}
        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods for subscription billing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4 flex justify-between items-center bg-muted/10">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 text-blue-800 p-2 rounded-md">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium">VISA ending in 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 05/2026</p>
                  </div>
                </div>
                <Badge>Default</Badge>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline">
                  Add Payment Method
                </Button>
                <Button variant="outline">
                  Edit Default
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Manage your billing details and tax information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Billing Contact</h3>
                  <p>John Smith</p>
                  <p>billing@healthnexus.com</p>
                  <p>+1 (555) 123-4567</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Billing Address</h3>
                  <p>HealthNexus Research Institute</p>
                  <p>123 Medical Center Drive</p>
                  <p>San Francisco, CA 94107</p>
                  <p>United States</p>
                </div>
              </div>
              
              <Button variant="outline">
                Update Billing Information
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tax Information</CardTitle>
              <CardDescription>Manage tax settings for your invoices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Company Name</h3>
                  <p>HealthNexus Research Institute</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Tax ID / VAT Number</h3>
                  <p>US123456789</p>
                </div>
              </div>
              
              <Button variant="outline">
                Update Tax Information
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Billing History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View your past invoices and payment records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="filter">Filter by:</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="filter" className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Invoices</SelectItem>
                      <SelectItem value="paid">Paid Only</SelectItem>
                      <SelectItem value="pending">Pending Only</SelectItem>
                      <SelectItem value="failed">Failed Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export All
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Invoice</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billingHistory.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.amount}</TableCell>
                      <TableCell>
                        <Badge variant={
                          item.status === 'Paid' ? 'default' : 
                          item.status === 'Pending' ? 'outline' :
                          'destructive'
                        }>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDownloadInvoice(item.invoice)}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          {item.invoice}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {billingHistory.length} of {billingHistory.length} invoices
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default BillingPage;

// Add missing RadioGroup components
export function RadioGroup(props: any) {
  return <div className="grid gap-2" {...props} />;
}

export function RadioGroupItem({ id, ...props }: any) {
  return (
    <span className="flex items-center">
      <input
        type="radio"
        id={id}
        className="h-4 w-4 rounded-full border border-primary text-primary focus:ring-primary"
        {...props}
      />
    </span>
  );
}
