
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, BarChart, Plus, Star, Calendar, TrendingUp, Users } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PerformanceReviewsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const reviews = [
    { 
      id: 'REV-001', 
      employee: 'Dr. Sarah Johnson', 
      reviewer: 'Dr. Smith',
      reviewPeriod: '2024 Annual',
      dueDate: '2025-01-31',
      completedDate: '2025-01-20',
      overallRating: 4.5,
      status: 'completed',
      goals: 8,
      goalsCompleted: 7
    },
    { 
      id: 'REV-002', 
      employee: 'Nurse Mike Wilson', 
      reviewer: 'Nurse Supervisor',
      reviewPeriod: '2024 Annual',
      dueDate: '2025-01-31',
      completedDate: null,
      overallRating: null,
      status: 'in-progress',
      goals: 6,
      goalsCompleted: 4
    },
    { 
      id: 'REV-003', 
      employee: 'Dr. Emily Chen', 
      reviewer: 'Dr. Roberts',
      reviewPeriod: '2024 Annual',
      dueDate: '2025-01-31',
      completedDate: '2025-01-25',
      overallRating: 4.8,
      status: 'completed',
      goals: 10,
      goalsCompleted: 9
    },
    { 
      id: 'REV-004', 
      employee: 'Tech Lisa Brown', 
      reviewer: 'Lab Manager',
      reviewPeriod: '2024 Annual',
      dueDate: '2025-01-31',
      completedDate: null,
      overallRating: null,
      status: 'pending',
      goals: 5,
      goalsCompleted: 3
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'secondary';
      case 'in-progress': return 'default';
      case 'pending': return 'outline';
      case 'overdue': return 'destructive';
      default: return 'outline';
    }
  };

  const getRatingStars = (rating: number | null) => {
    if (!rating) return '-';
    return '★'.repeat(Math.floor(rating)) + (rating % 1 ? '☆' : '') + ` (${rating})`;
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.reviewer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || review.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <MainLayout>
      <PageHeader
        title="Performance Reviews"
        description="Manage employee performance evaluations and development"
        action={{
          label: 'Create Review',
          icon: Plus,
          onClick: () => console.log('Create review')
        }}
      />

      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Completed Reviews</p>
                <p className="text-2xl font-bold text-green-600">{reviews.filter(r => r.status === 'completed').length}</p>
              </div>
              <BarChart className="h-8 w-8 text-green-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{reviews.filter(r => r.status === 'in-progress').length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{reviews.filter(r => r.status === 'pending').length}</p>
              </div>
              <Users className="h-8 w-8 text-yellow-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold text-purple-600">
                  {reviews.filter(r => r.overallRating).length > 0 
                    ? (reviews.reduce((acc, r) => acc + (r.overallRating || 0), 0) / reviews.filter(r => r.overallRating).length).toFixed(1)
                    : '-'
                  }
                </p>
              </div>
              <Star className="h-8 w-8 text-purple-600" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="reviews" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="reviews">Performance Reviews</TabsTrigger>
            <TabsTrigger value="goals">Goals & Objectives</TabsTrigger>
            <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
            <TabsTrigger value="templates">Review Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Performance Reviews</CardTitle>
                    <CardDescription>Track and manage employee performance evaluations</CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search reviews..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 w-full sm:w-[300px]"
                      />
                    </div>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Reviewer</TableHead>
                        <TableHead>Review Period</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Overall Rating</TableHead>
                        <TableHead>Goals Progress</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReviews.map((review) => (
                        <TableRow key={review.id}>
                          <TableCell className="font-medium">{review.employee}</TableCell>
                          <TableCell>{review.reviewer}</TableCell>
                          <TableCell>{review.reviewPeriod}</TableCell>
                          <TableCell>{review.dueDate}</TableCell>
                          <TableCell>{getRatingStars(review.overallRating)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">{review.goalsCompleted}/{review.goals}</span>
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full" 
                                  style={{ width: `${(review.goalsCompleted / review.goals) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(review.status)}>
                              {review.status.replace('-', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                {review.status === 'completed' ? 'View' : 'Edit'}
                              </Button>
                              {review.status === 'pending' && (
                                <Button variant="outline" size="sm">
                                  Start
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Goals & Objectives</CardTitle>
                <CardDescription>Track employee goals and objectives</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Goals and objectives interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>Analyze performance trends and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Performance analytics interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Review Templates</CardTitle>
                <CardDescription>Manage performance review templates and criteria</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Review templates interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default PerformanceReviewsPage;
