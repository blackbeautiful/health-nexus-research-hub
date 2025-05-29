
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, Phone, Mail } from 'lucide-react';

const SupportPage = () => {
  return (
    <Layout title="Support">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Support Center</h1>
          <p className="text-muted-foreground">Get help and submit support tickets</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <HelpCircle className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <h3 className="font-semibold">Help Center</h3>
              <p className="text-sm text-muted-foreground">Browse FAQs and documentation</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Phone className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <h3 className="font-semibold">Phone Support</h3>
              <p className="text-sm text-muted-foreground">(555) 123-HELP</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Mail className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <h3 className="font-semibold">Email Support</h3>
              <p className="text-sm text-muted-foreground">support@healthnexus.com</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SupportPage;
