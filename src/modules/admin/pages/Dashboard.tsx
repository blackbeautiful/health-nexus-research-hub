import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import StatCard from '@/components/dashboard/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Settings, 
  ShieldAlert, 
  Activity, 
  TrendingUp, 
  Server, 
  Database,
  AlertTriangle,
  CheckCircle,
  Clock,
  UserCog,
  FileText,
  BarChart2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const AdminDashboard = () => {
  const systemStats = [
    { 
      title: "Total Users", 
      value: "1,847", 
      icon: <Users className="h-4 w-4" />,
      trend: { value: 8, isPositive: true }
    },
    { 
      title: "System Uptime", 
      value: "99.8%", 
      icon: <Server className="h-4 w-4" />,
      trend: { value: 0.2, isPositive: true }
    },
    { 
      title: "Active Sessions", 
      value: "342", 
      icon: <Activity className="h-4 w-4" />,
      trend: { value: 5, isPositive: true }
    },
    { 
      title: "Security Alerts", 
      value: "2", 
      icon: <ShieldAlert className="h-4 w-4" />,
      trend: { value: -60, isPositive: true }
    }
  ];

  const userActivity = [
    { role: "Clinicians", count: 156, percentage: 45, color: "bg-blue-500" },
    { role: "Researchers", count: 89, percentage: 25, color: "bg-green-500" },
    { role: "Nurses", count: 67, percentage: 19, color: "bg-purple-500" },
    { role: "Admins", count: 23, percentage: 7, color: "bg-orange-500" },
    { role: "Others", count: 12, percentage: 4, color: "bg-gray-500" }
  ];

  const systemHealth = [
    { component: "Database", status: "Healthy", uptime: "99.9%", color: "text-green-600" },
    { component: "API Gateway", status: "Healthy", uptime: "99.8%", color: "text-green-600" },
    { component: "File Storage", status: "Warning", uptime: "98.2%", color: "text-yellow-600" },
    { component: "Email Service", status: "Healthy", uptime: "99.7%", color: "text-green-600" },
    { component: "Backup System", status: "Maintenance", uptime: "95.1%", color: "text-blue-600" }
  ];

  const recentActions = [
    {
      type: "user",
      message: "New user account created for Dr. Sarah Williams",
      time: "5 min ago",
      severity: "info"
    },
    {
      type: "security",
      message: "Failed login attempts detected from unusual location",
      time: "15 min ago", 
      severity: "warning"
    },
    {
      type: "system",
      message: "Database backup completed successfully",
      time: "1 hour ago",
      severity: "success"
    },
    {
      type: "audit",
      message: "Compliance audit report generated",
      time: "2 hours ago",
      severity: "info"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Maintenance': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getActionColor = (severity: string) => {
    switch (severity) {
      case 'warning': return 'border-l-yellow-500 bg-yellow-50';
      case 'success': return 'border-l-green-500 bg-green-50';
      case 'error': return 'border-l-red-500 bg-red-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  return (
    <MainLayout>
      <PageHeader
        title="System Administration"
        description="Monitor system health, users, and security"
        breadcrumbs={[
          { label: 'Admin', link: '/admin' },
          { label: 'Dashboard' }
        ]}
      />
      
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Activity Breakdown */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                <UserCog className="h-5 w-5 mr-2 text-primary" />
                User Activity Breakdown
              </CardTitle>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userActivity.map((user, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${user.color}`}></div>
                      <span className="text-sm font-medium">{user.role}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-muted-foreground">{user.count}</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${user.color}`}
                          style={{ width: `${user.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-muted-foreground w-8">{user.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                <Server className="h-5 w-5 mr-2 text-primary" />
                System Health
              </CardTitle>
              <Button variant="outline" size="sm">
                View Logs
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemHealth.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium">{item.component}</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getStatusColor(item.status)}`}
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${item.color}`}>{item.uptime}</p>
                      <p className="text-xs text-muted-foreground">Uptime</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent System Actions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                Recent System Actions
              </CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActions.map((action, index) => (
                  <div key={index} className={`p-3 border-l-4 rounded-r-lg ${getActionColor(action.severity)}`}>
                    <p className="text-sm font-medium mb-1">{action.message}</p>
                    <p className="text-xs text-muted-foreground">{action.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Admin Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Admin Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col items-center space-y-2">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Manage Users</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center space-y-2">
                  <Settings className="h-6 w-6" />
                  <span className="text-sm">System Config</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center space-y-2">
                  <FileText className="h-6 w-6" />
                  <span className="text-sm">Audit Logs</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center space-y-2">
                  <BarChart2 className="h-6 w-6" />
                  <span className="text-sm">Analytics</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;