
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';
import Header from './Header';
import { useToast } from '@/hooks/use-toast';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const { toast } = useToast();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <Header title={title} />
          <main className="flex-1 p-4 md:p-6">{children}</main>
          <footer className="text-center text-sm text-gray-500 py-4 border-t">
            &copy; 2025 HealthNexus Research Hub. All rights reserved. HIPAA & GDPR Compliant.
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
