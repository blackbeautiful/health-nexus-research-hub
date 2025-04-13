
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';
import Header from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 p-4 md:p-6">{children}</main>
          <footer className="text-center text-sm text-gray-500 py-4 border-t">
            &copy; 2025 HealthNexus Research Hub. All rights reserved. HIPAA & GDPR Compliant.
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
