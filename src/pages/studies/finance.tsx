
import React, { useState } from 'react';
import { DollarSign, Download, Filter, Plus, BarChart2, Printer, FileText, CoinsIcon, ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Separator } from '@/components/ui/separator';

const StudyFinancePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Sample budget data
  const budgetData = {
    total: 750000,
    allocated: 620000,
    spent: 398500,
    remaining: 351500
  };
  
  // Sample expense categories
  const expenseCategories = [
    { name: 'Personnel Costs', amount: 182000, percentage: 45.7 },
    { name: 'Patient Stipends', amount: 87500, percentage: 21.9 },
    { name: 'Equipment & Supplies', amount: 62000, percentage: 15.6 },
    { name: 'Laboratory Services', amount: 45000, percentage: 11.3 },
    { name: 'Other Expenses', amount: 22000, percentage: 5.5 }
  ];
  
  // Sample expense data
  const expenses = [
    { id: 'EXP-1001', date: new Date('2025-04-01'), category: 'Personnel Costs', description: 'Research Coordinator Salary - Q1', amount: 45000, status: 'approved' },
    { id: 'EXP-1002', date: new Date('2025-03-15'), category: 'Patient Stipends', description: 'Patient Travel Reimbursements - March', amount: 12500, status: 'approved' },
    { id: 'EXP-1003', date: new Date('2025-03-10'), category: 'Equipment & Supplies', description: 'Lab Equipment Rental - March', amount: 8500, status: 'approved' },
    { id: 'EXP-1004', date: new Date('2025-03-05'), category: 'Laboratory Services', description: 'External Lab Testing - Batch #12', amount: 15000, status: 'approved' },
    { id: 'EXP-1005', date: new Date('2025-04-05'), category: 'Personnel Costs', description: 'Study Nurse Overtime - March', amount: 3500, status: 'pending' }
  ];
  
  // Sample monthly spending data for chart
  const monthlySpendingData = [
    { name: 'Jan', amount: 65000 },
    { name: 'Feb', amount: 72500 },
    { name: 'Mar', amount: 88000 },
    { name: 'Apr', amount: 75000 },
    { name: 'May', amount: 98000 },
    { name: 'Jun', amount: 0 }, // Projected
    { name: 'Jul', amount: 0 }, // Projected
    { name: 'Aug', amount: 0 }, // Projected
    { name: 'Sep', amount: 0 }, // Projected
    { name: 'Oct', amount: 0 }, // Projected
    { name: 'Nov', amount: 0 }, // Projected
    { name: 'Dec', amount: 0 }  // Projected
  ];
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <Layout title="Study Finance">
      <PageHeader 
        title="Study Finance & Budget" 
        description="Financial management and budget tracking for research studies"
        breadcrumbs={[
          { label: 'Studies', link: '/studies' },
          { label: 'Finance' }
        ]}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(budgetData.total)}</div>
            <p className="text-xs text-muted-foreground mt-1">FY 2025-2027</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{formatCurrency(budgetData.spent)}</div>
            <Progress 
              value={(budgetData.spent / budgetData.total) * 100} 
              className="mt-2 h-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((budgetData.spent / budgetData.total) * 100)}% of total
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(budgetData.remaining)}</div>
            <Progress 
              value={(budgetData.remaining / budgetData.total) * 100} 
              className="mt-2 h-2 bg-muted"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((budgetData.remaining / budgetData.total) * 100)}% of total
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Burn Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(78500)}/month</div>
            <div className="flex items-center mt-1">
              <ArrowUpRight className="h-4 w-4 text-red-500 mr-1" />
              <p className="text-xs text-red-500">8.2% higher than previous month</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6 flex flex-wrap gap-3 justify-between items-center">
        <div className="flex items-center gap-3">
          <h3 className="font-medium">Active Study:</h3>
          <Select defaultValue="BEACON-CRC">
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select study" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BEACON-CRC">BEACON-CRC Phase II Trial</SelectItem>
              <SelectItem value="BRAVADO">BRAVADO Metastatic Breast Cancer Study</SelectItem>
              <SelectItem value="PALADIN">PALADIN Lung Cancer Immunotherapy Trial</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Reports
          </Button>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Expense
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
              <TabsTrigger value="budget">Budget Planning</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <TabsContent value="overview" className="space-y-6 mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Monthly Spending</CardTitle>
                  <CardDescription>Current vs. planned expenditure</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={monthlySpendingData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => formatCurrency(Number(value))}
                        labelFormatter={(label) => `${label} 2025`}
                      />
                      <Bar dataKey="amount" fill="#6366F1" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Expenses by Category</CardTitle>
                  <CardDescription>Budget allocation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expenseCategories.map((category) => (
                      <div key={category.name}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">{category.name}</span>
                          <span className="text-sm font-medium">{formatCurrency(category.amount)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={category.percentage} className="h-2" />
                          <span className="text-xs text-muted-foreground">
                            {category.percentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <BarChart2 className="mr-2 h-4 w-4" />
                    Detailed Breakdown
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell className="font-medium">{expense.id}</TableCell>
                        <TableCell>{expense.date.toLocaleDateString()}</TableCell>
                        <TableCell>{expense.description}</TableCell>
                        <TableCell>{expense.category}</TableCell>
                        <TableCell className="text-right">{formatCurrency(expense.amount)}</TableCell>
                        <TableCell>
                          <Badge variant={expense.status === 'approved' ? 'outline' : 'secondary'} className={expense.status === 'approved' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-amber-100 text-amber-800 border-amber-200'}>
                            {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-center border-t p-2">
                <Button variant="ghost" size="sm">
                  View All Transactions
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="expenses" className="mt-0">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="personnel">Personnel Costs</SelectItem>
                    <SelectItem value="stipends">Patient Stipends</SelectItem>
                    <SelectItem value="equipment">Equipment & Supplies</SelectItem>
                    <SelectItem value="lab">Laboratory Services</SelectItem>
                    <SelectItem value="other">Other Expenses</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="all-time">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="this-quarter">This Quarter</SelectItem>
                    <SelectItem value="last-quarter">Last Quarter</SelectItem>
                    <SelectItem value="this-year">This Year</SelectItem>
                    <SelectItem value="all-time">All Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Expense
                </Button>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Submitted By</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">{expense.id}</TableCell>
                      <TableCell>{expense.date.toLocaleDateString()}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>Dr. Elena Rodriguez</TableCell>
                      <TableCell className="text-right">{formatCurrency(expense.amount)}</TableCell>
                      <TableCell>
                        <Badge variant={expense.status === 'approved' ? 'outline' : 'secondary'} className={expense.status === 'approved' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-amber-100 text-amber-800 border-amber-200'}>
                          {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="invoices" className="mt-0">
            <div className="flex items-center justify-center p-12">
              <div className="text-center">
                <CoinsIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-medium">Invoices</h3>
                <p className="mt-2 mb-4 text-sm text-muted-foreground max-w-sm">
                  Track invoices, payments, and reconcile financial transactions with your institution and sponsors.
                </p>
                <Button>
                  Set Up Invoicing
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="budget" className="mt-0">
            <div className="flex items-center justify-center p-12">
              <div className="text-center">
                <DollarSign className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-medium">Budget Planning</h3>
                <p className="mt-2 mb-4 text-sm text-muted-foreground max-w-sm">
                  Create and manage detailed study budgets with forecasting, allocation, and variance analysis.
                </p>
                <Button>
                  Create Budget Plan
                </Button>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default StudyFinancePage;
