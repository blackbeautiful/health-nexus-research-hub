
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
import ClinicalNotesPage from "./pages/clinical-workflows/notes/index";
import NewNotePage from "./pages/clinical-workflows/notes/new";
import MessagingPage from "./pages/messages/index";
import AppointmentsPage from "./pages/appointments/index";
import LabResultsPage from "./pages/lab-results/index";
import AnalyticsPage from "./pages/analytics/index";
import SettingsPage from "./pages/settings/index";
import CompliancePage from "./pages/compliance/index";
import StudyDetailsPage from "./pages/studies/[studyId]";
import InformedConsentPage from "./pages/studies/consent-tracking";
import StudyFinancePage from "./pages/studies/finance";
import ProtocolDeviationsPage from "./pages/studies/protocol-deviations";
import SiteVisitsPage from "./pages/studies/site-visits";

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
          <Route path="/studies/:studyId" element={<StudyDetailsPage />} />
          <Route path="/studies/consent-tracking" element={<InformedConsentPage />} />
          <Route path="/studies/finance" element={<StudyFinancePage />} />
          <Route path="/studies/protocol-deviations" element={<ProtocolDeviationsPage />} />
          <Route path="/studies/site-visits" element={<SiteVisitsPage />} />
          
          {/* Clinical Data & Workflows */}
          <Route path="/clinical-data" element={<ClinicalDataPage />} />
          <Route path="/clinical-workflows/notes" element={<ClinicalNotesPage />} />
          <Route path="/clinical-workflows/notes/new" element={<NewNotePage />} />
          <Route path="/lab-results" element={<LabResultsPage />} />
          
          {/* Patient Interaction Pages */}
          <Route path="/patient-portal/dashboard" element={<PatientPortalDashboard />} />
          <Route path="/messages" element={<MessagingPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          
          {/* Admin & Analytics Pages */}
          <Route path="/users" element={<UserManagementPage />} />
          <Route path="/audit-logs" element={<AuditLogPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/compliance" element={<CompliancePage />} />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
