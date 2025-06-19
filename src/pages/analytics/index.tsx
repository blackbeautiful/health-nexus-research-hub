
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, FileText, Activity, Calendar, Download } from 'lucide-react';

const AnalyticsPage = () => {
  const enrollmentData = [
    { month: 'Jan', enrolled: 23, target: 30 },
    { month: 'Feb', enrolled: 28, target: 30 },
    { month: 'Mar', enrolled: 31, target: 30 },
    { month: 'Apr', enrolled: 27, target: 30 },
    { month: 'May', enrolled: 34, target: 30 },
    { month: 'Jun', enrolled: 29, target: 30 }
  ];

  const studyStatusData = [
    { name: 'Recruiting', value: 12, color: '#10B981' },
    { name: 'Active', value: 8, color: '#3B82F6' },
    { name: 'Completed', value: 5, color: '#6B7280' },
    { name: 'On Hold', value: 2, color: '#F59E0B' }
  ];

  const sitePerformanceData = [
    { site: 'Site A', enrollment: 85, target: 100, completion: 92 },
    { site: 'Site B', enrollment: 76, target: 80, completion: 88 },
    { site: 'Site C', enrollment: 92, target: 90, completion: 95 },
    { site: 'Site D', enrollment: 68, target: 75, completion: 84 }
  ];

  return (
    <MainLayout>
      <PageHeader
        title="Analytics Dashboard"
        description="Clinical research analytics and insights"
        action={{
          label: 'Export Report',
          icon: Download,
          onClick: () => console.log('Export analytics report')
        }}
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Total Participants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">1,247</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Active Studies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">27</div>
            <p className="text-xs text-muted-foreground">Across 12 sites</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Enrollment Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">87%</div>
            <p className="text-xs text-muted-foreground">Above target</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Data Quality
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">94%</div>
            <p className="text-xs text-muted-foreground">Query resolution</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="enrollment" className="space-y-6">
        <TabsList>
          <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
          <TabsTrigger value="studies">Study Status</TabsTrigger>
          <TabsTrigger value="sites">Site Performance</TabsTrigger>
          <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
        </TabsList>

        <TabsContent value="enrollment">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Enrollment Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="enrolled" fill="#3B82F6" name="Enrolled" />
                    <Bar dataKey="target" fill="#E5E7EB" name="Target" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enrollment by Study Phase</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Phase I</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <span className="text-sm font-medium">156/240</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Phase II</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '82%' }}></div>
                      </div>
                      <span className="text-sm font-medium">492/600</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Phase III</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '91%' }}></div>
                      </div>
                      <span className="text-sm font-medium">599/660</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="studies">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Study Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={studyStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({name, value}) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {studyStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Study Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">KEYNOTE-189 Extension</div>
                      <div className="text-sm text-muted-foreground">Phase III NSCLC Study</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Completed</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">ADAURA Follow-up</div>
                      <div className="text-sm text-muted-foreground">EGFR+ Adjuvant Study</div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">DESTINY-Breast04</div>
                      <div className="text-sm text-muted-foreground">HER2-low Breast Cancer</div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Recruiting</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sites">
          <Card>
            <CardHeader>
              <CardTitle>Site Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={sitePerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="site" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="enrollment" fill="#3B82F6" name="Enrollment %" />
                  <Bar dataKey="completion" fill="#10B981" name="Completion %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outcomes">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Primary Endpoint Achievement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Overall Response Rate</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Disease Control Rate</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '84%' }}></div>
                      </div>
                      <span className="text-sm font-medium">84%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Safety Profile</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Adverse Events Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Grade 1-2 AEs</span>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700">76%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Grade 3-4 AEs</span>
                    <Badge variant="outline" className="bg-orange-50 text-orange-700">18%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Serious AEs</span>
                    <Badge variant="outline" className="bg-red-50 text-red-700">6%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Treatment Discontinuation</span>
                    <Badge variant="outline" className="bg-gray-50 text-gray-700">8%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default AnalyticsPage;
