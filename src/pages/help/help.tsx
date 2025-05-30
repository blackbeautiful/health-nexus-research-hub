
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, Book, Video, MessageCircle } from 'lucide-react';

const HelpPage = () => {
  return (
    <MainLayout>
      <PageHeader
        title="Help Center"
        description="Documentation and resources to help you use the platform"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Help' }
        ]}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Book className="mr-2 h-5 w-5 text-blue-500" />
              User Guide
            </CardTitle>
            <CardDescription>Comprehensive documentation and guides</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Video className="mr-2 h-5 w-5 text-green-500" />
              Video Tutorials
            </CardTitle>
            <CardDescription>Step-by-step video walkthroughs</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <HelpCircle className="mr-2 h-5 w-5 text-purple-500" />
              FAQ
            </CardTitle>
            <CardDescription>Frequently asked questions and answers</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </MainLayout>
  );
};

export default HelpPage;
