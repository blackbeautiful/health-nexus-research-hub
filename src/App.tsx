
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PatientsPage from "./pages/patients/index";
import PatientDetailsPage from "./pages/patients/[patientId]";
import StudiesPage from "./pages/studies/index";
import LoginPage from "./pages/auth/login";
import PasswordResetPage from "./pages/auth/password-reset";
import UserManagementPage from "./pages/admin/users";
import AuditLogPage from "./pages/admin/audit-logs";
import PatientRegistrationPage from "./pages/patients/register";
import StudyProtocolSetupPage from "./pages/studies/protocol-setup";
import ClinicalDataPage from "./pages/clinical-data/index";
import PatientPortalDashboard from "./pages/patient-portal/dashboard";
import ClinicalNotesPage from "./pages/clinical-workflows/notes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Authentication Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/password-reset" element={<PasswordResetPage />} />
          
          {/* Main App Pages */}
          <Route path="/" element={<Index />} />
          
          {/* Patient Management */}
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/patients/register" element={<PatientRegistrationPage />} />
          <Route path="/patients/:patientId" element={<PatientDetailsPage />} />
          
          {/* Research Study Pages */}
          <Route path="/studies" element={<StudiesPage />} />
          <Route path="/studies/protocol-setup" element={<StudyProtocolSetupPage />} />
          
          {/* Clinical Data & Workflows */}
          <Route path="/clinical-data" element={<ClinicalDataPage />} />
          <Route path="/clinical-workflows/notes" element={<ClinicalNotesPage />} />
          
          {/* Patient Portal */}
          <Route path="/patient-portal/dashboard" element={<PatientPortalDashboard />} />
          
          {/* Admin Pages */}
          <Route path="/users" element={<UserManagementPage />} />
          <Route path="/audit-logs" element={<AuditLogPage />} />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
