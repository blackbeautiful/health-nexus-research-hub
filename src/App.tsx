import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import LoginPage from '@/pages/auth/login';
import RegisterPage from '@/pages/auth/register';
import ForgotPasswordPage from '@/pages/auth/forgot-password';
import NotFoundPage from '@/pages/404';

// Create a client
const queryClient = new QueryClient();

// Placeholder component for routes that haven't been implemented yet
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p className="text-muted-foreground">This page is under construction</p>
    </div>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster />
        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          
          {/* Main Routes */}
          <Route path="/" element={<PlaceholderPage title="Dashboard" />} />
          <Route path="/dashboard/clinical" element={<PlaceholderPage title="Clinical Dashboard" />} />
          <Route path="/dashboard/researcher" element={<PlaceholderPage title="Researcher Dashboard" />} />
          <Route path="/admin/dashboard" element={<PlaceholderPage title="Admin Dashboard" />} />
          
          {/* Patient Portal Routes */}
          <Route path="/patient-portal/*" element={<PlaceholderPage title="Patient Portal" />} />
          
          {/* Clinical Routes */}
          <Route path="/clinical-data/*" element={<PlaceholderPage title="Clinical Data" />} />
          <Route path="/lab-results/*" element={<PlaceholderPage title="Lab Results" />} />
          
          {/* Research Routes */}
          <Route path="/studies/*" element={<PlaceholderPage title="Studies" />} />
          <Route path="/research-data/*" element={<PlaceholderPage title="Research Data" />} />
          
          {/* Admin Routes */}
          <Route path="/users/*" element={<PlaceholderPage title="Users" />} />
          <Route path="/settings/*" element={<PlaceholderPage title="Settings" />} />
          <Route path="/audit-logs/*" element={<PlaceholderPage title="Audit Logs" />} />
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App; 