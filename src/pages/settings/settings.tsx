
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, CreditCard, Bell, Server } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <PageHeader
        title="Settings"
        description="Configure system settings and preferences"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Settings' }
        ]}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/settings/billing')}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-blue-500" />
              Billing & Subscription
            </CardTitle>
            <CardDescription>Manage your subscription and billing information</CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/settings/notifications')}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5 text-green-500" />
              Notifications
            </CardTitle>
            <CardDescription>Configure notification preferences</CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/settings/system')}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Server className="mr-2 h-5 w-5 text-purple-500" />
              System Configuration
            </CardTitle>
            <CardDescription>System-wide settings and configuration</CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5 text-orange-500" />
              General Settings
            </CardTitle>
            <CardDescription>Basic application settings and preferences</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
