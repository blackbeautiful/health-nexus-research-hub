
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send } from 'lucide-react';

const MessagesPage = () => {
  return (
    <MainLayout>
      <PageHeader
        title="Messages"
        description="Communication center for patients and staff"
        action={{
          label: 'New Message',
          icon: Send,
          onClick: () => console.log('New message')
        }}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            Message Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <MessageSquare className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No Messages</h3>
            <p className="text-sm">Your messages will appear here</p>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default MessagesPage;
