
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Video, Download } from 'lucide-react';

const HelpPage = () => {
  return (
    <Layout title="Help & Documentation">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Help & Documentation</h1>
          <p className="text-muted-foreground">Learn how to use the HealthNexus platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <h3 className="font-semibold">User Guide</h3>
              <p className="text-sm text-muted-foreground">Comprehensive platform documentation</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Video className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <h3 className="font-semibold">Video Tutorials</h3>
              <p className="text-sm text-muted-foreground">Step-by-step video guides</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Download className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <h3 className="font-semibold">Downloads</h3>
              <p className="text-sm text-muted-foreground">Quick reference guides and forms</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default HelpPage;
