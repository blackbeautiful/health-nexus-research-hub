
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { Users, TrendingUp, Calendar, Target, Filter, Download, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const EnrollmentAnalyticsPage = () => {
  const [selectedStudy, setSelectedStudy] = useState('all');
  const [selectedSite, setSelectedSite] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  const [dateRange, setDateRange] = useState<any>(null);

  const enrollmentData = [
    { month: 'Jan 2025', enrolled: 12, screened: 18, target: 15 },
    { month: 'Feb 2025', enrolled: 15, screened: 22, target: 15 },
    { month: 'Mar 2025', enrolled: 18, screened: 25, target: 15 },
    { month: 'Apr 2025', enrolled: 14, screened: 20, target: 15 },
    { month: 'May 2025', enrolled: 20, screened: 28, target: 15 },
    { month: 'Jun 2025', enrolled: 16, screened: 24, target: 15 }
  ];

  const sitePerformance = [
    { site: 'Memorial Hospital', enrolled: 45, target: 50, percentage: 90 },
    { site: 'City Medical Center', enrolled: 38, target: 45, percentage: 84 },
    { site: 'Regional Cancer Center', enrolled: 32, target: 40, percentage: 80 },
    { site: 'University Hospital', enrolled: 28, target: 35, percentage: 80 },
    { site: 'Community Health', enrolled: 22, target: 30, percentage: 73 }
  ];

  const demographicsData = [
    { name: 'Age 18-30', value: 15, color: '#8884d8' },
    { name: 'Age 31-50', value: 35, color: '#82ca9d' },
    { name: 'Age 51-70', value: 40, color: '#ffc658' },
    { name: 'Age 70+', value: 10, color: '#ff7300' }
  ];

  const studyStats = [
    {
      study: 'BEACON-CRC',
      enrolled: 89,
      target: 100,
      percentage: 89,
      sites: 5,
      avgMonthly: 15,
      status: 'active'
    },
    {
      study: 'KEYNOTE-189',
      enrolled: 156,
      target: 150,
      percentage: 104,
      sites: 8,
      avgMonthly: 18,
      status: 'completed'
    },
    {
      study: 'DESTINY-Lung01',
      enrolled: 67,
      target: 120,
      percentage: 56,
      sites: 4,
      avgMonthly: 12,
      status: 'active'
    }
  ];

  return (
    <Layout title="Enrollment Analytics">
      <div className="space-y-6">
        {/* Header with Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Enrollment Analytics</h1>
            <p className="text-muted-foreground">Track study enrollment performance and trends</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={selectedStudy} onValueChange={setSelectedStudy}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Study" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Studies</SelectItem>
                <SelectItem value="beacon">BEACON-CRC</SelectItem>
                <SelectItem value="keynote">KEYNOTE-189</SelectItem>
                <SelectItem value="destiny">DESTINY-Lung01</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedSite} onValueChange={setSelectedSite}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Site" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sites</SelectItem>
                <SelectItem value="memorial">Memorial Hospital</SelectItem>
                <SelectItem value="city">City Medical Center</SelectItem>
                <SelectItem value="regional">Regional Cancer Center</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Enrolled</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">312</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enrollment Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+5%</span> from target
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Screen Failure Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">22%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600">+3%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Monthly Enrollment</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">16</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">Target: 15</span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <Tabs defaultValue="trends" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trends">Enrollment Trends</TabsTrigger>
            <TabsTrigger value="sites">Site Performance</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="studies">Study Overview</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Enrollment vs Target Trends</CardTitle>
                <CardDescription>Monthly enrollment performance against targets</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="screened" fill="#e2e8f0" name="Screened" />
                    <Bar dataKey="enrolled" fill="#3b82f6" name="Enrolled" />
                    <Line type="monotone" dataKey="target" stroke="#ef4444" name="Target" strokeWidth={2} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sites" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Site Performance Ranking</CardTitle>
                <CardDescription>Enrollment performance by study site</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sitePerformance.map((site, index) => (
                    <div key={site.site} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium">{site.site}</h4>
                          <p className="text-sm text-muted-foreground">
                            {site.enrolled} of {site.target} participants
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${site.percentage}%` }}
                          ></div>
                        </div>
                        <Badge variant={site.percentage >= 80 ? "default" : "secondary"}>
                          {site.percentage}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demographics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Age Distribution</CardTitle>
                  <CardDescription>Participant age demographics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={demographicsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {demographicsData.map((entry, index) => (
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
                  <CardTitle>Enrollment Funnel</CardTitle>
                  <CardDescription>Patient progression through enrollment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                      <span>Pre-screened</span>
                      <span className="font-bold">450</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-100 rounded">
                      <span>Screened</span>
                      <span className="font-bold">380</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-200 rounded">
                      <span>Eligible</span>
                      <span className="font-bold">340</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-300 rounded">
                      <span>Consented</span>
                      <span className="font-bold">325</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-400 rounded text-white">
                      <span>Enrolled</span>
                      <span className="font-bold">312</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="studies" className="space-y-4">
            <div className="space-y-4">
              {studyStats.map((study) => (
                <Card key={study.study}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{study.study}</CardTitle>
                        <CardDescription>
                          {study.sites} sites • Average {study.avgMonthly} enrollments/month
                        </CardDescription>
                      </div>
                      <Badge variant={study.status === 'active' ? 'default' : 'secondary'}>
                        {study.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        Enrollment Progress: {study.enrolled}/{study.target}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {study.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${study.percentage >= 100 ? 'bg-green-600' : 'bg-blue-600'}`}
                        style={{ width: `${Math.min(study.percentage, 100)}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default EnrollmentAnalyticsPage;
