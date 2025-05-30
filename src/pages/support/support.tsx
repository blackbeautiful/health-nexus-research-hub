
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, MessageCircle, Phone, Mail } from 'lucide-react';

const SupportPage = () => {
  return (
    <MainLayout>
      <PageHeader
        title="Support"
        description="Get help and support for the platform"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Support' }
        ]}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="mr-2 h-5 w-5" />
              Contact Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Email Support
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Phone className="mr-2 h-4 w-4" />
              Call Support
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <MessageCircle className="mr-2 h-4 w-4" />
              Live Chat
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="mr-2 h-5 w-5" />
              Help Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline">
              <HelpCircle className="mr-2 h-4 w-4" />
              Documentation
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <HelpCircle className="mr-2 h-4 w-4" />
              Video Tutorials
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <HelpCircle className="mr-2 h-4 w-4" />
              FAQ
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SupportPage;
