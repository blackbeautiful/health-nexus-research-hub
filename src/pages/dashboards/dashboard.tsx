
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, TestTube, FileText, Calendar, Activity, TrendingUp } from 'lucide-react';

const DashboardPage = () => {
  const navigate = useNavigate();

  const stats = [
    { title: 'Active Patients', value: '1,234', change: '+12%', icon: Users },
    { title: 'Ongoing Studies', value: '18', change: '+2', icon: TestTube },
    { title: 'Pending Reports', value: '56', change: '-8%', icon: FileText },
    { title: 'Today\'s Appointments', value: '24', change: '+3', icon: Calendar }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to HealthNexus Research Hub</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                      {stat.change}
                    </span>{' '}
                    from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and workflows</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/patients/register')}
              >
                <Users className="mr-2 h-4 w-4" />
                Register New Patient
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/studies')}
              >
                <TestTube className="mr-2 h-4 w-4" />
                View Studies
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/lab-results')}
              >
                <Activity className="mr-2 h-4 w-4" />
                Check Lab Results
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/appointments')}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Manage Appointments
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>New patient enrolled in BEACON-CRC</span>
                  <span className="text-muted-foreground">2h ago</span>
                </div>
                <div className="flex justify-between">
                  <span>Lab results ready for Patient #1234</span>
                  <span className="text-muted-foreground">4h ago</span>
                </div>
                <div className="flex justify-between">
                  <span>Protocol deviation reported</span>
                  <span className="text-muted-foreground">6h ago</span>
                </div>
                <div className="flex justify-between">
                  <span>Data export completed</span>
                  <span className="text-muted-foreground">1d ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
