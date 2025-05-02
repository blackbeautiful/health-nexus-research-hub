
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
import PatientDashboard from "./pages/dashboards/patient-dashboard";
import ResearcherDashboard from "./pages/dashboards/researcher-dashboard";
import AdminDashboard from "./pages/dashboards/admin-dashboard";
import StudySitesPage from "./pages/studies/sites/index";
import ProtocolDocumentsPage from "./pages/studies/protocol-documents";
import PatientRandomizationPage from "./pages/studies/patient-randomization";
import InsuranceInformationPage from "./pages/patients/insurance-information";
import ClinicalInformationPage from "./pages/patients/clinical-information";
import ConsentFormPage from "./pages/patients/consent-form";
import PrescriptionsPage from "./pages/clinical-workflows/prescriptions/index";
import NewPrescriptionPage from "./pages/clinical-workflows/prescriptions/new";
import QuizManagementPage from "./pages/studies/quiz-management";
import CreateQuizPage from "./pages/studies/quiz-management/create";
import QuizDetailsPage from "./pages/studies/quiz-management/[quizId]";
import EditQuizPage from "./pages/studies/quiz-management/[quizId]/edit";

// New pages
import MedicalRecordsPage from "./pages/medical-records/index";
import PatientHistoryPage from "./pages/medical-records/history";
import DiagnosesPage from "./pages/medical-records/diagnoses";
import ImagingResultsPage from "./pages/medical-records/imaging";
import ExternalRecordsPage from "./pages/medical-records/external";
import ClinicalReportsPage from "./pages/clinical-reports/index";
import TreatmentOutcomesPage from "./pages/clinical-reports/outcomes";
import PatientAnalyticsPage from "./pages/clinical-reports/patient-analytics";
import ProviderMetricsPage from "./pages/clinical-reports/provider-metrics";
import MedicationReportsPage from "./pages/clinical-reports/medications";
import TreatmentPlansPage from "./pages/clinical-workflows/treatment-plans/index";
import MedicalOrdersPage from "./pages/clinical-workflows/medical-orders/index";
import PatientEducationPage from "./pages/clinical-workflows/patient-education/index";

// Analytics pages
import EnrollmentAnalyticsPage from "./pages/analytics/enrollment";
import StudyOutcomesPage from "./pages/analytics/outcomes";
import SitePerformancePage from "./pages/analytics/site-performance";
import DataQualityPage from "./pages/analytics/data-quality";
import GeographicDistributionPage from "./pages/analytics/geographic";

// Research data pages
import DataCollectionPage from "./pages/research-data/collection";
import DataExportsPage from "./pages/research-data/exports";
import ResearchLabResultsPage from "./pages/research-data/lab-results";
import BiospecimenTrackingPage from "./pages/research-data/biospecimen";

// Admin & Settings pages
import RolesPermissionsPage from "./pages/users/roles";
import AccessRequestsPage from "./pages/users/access-requests";
import NotificationsSettingsPage from "./pages/settings/notifications";
import SystemSettingsPage from "./pages/settings/system";
import BillingPage from "./pages/settings/billing";
import AdminDashboardPage from "./pages/admin/dashboard";

// Onboarding and facility setup
import FacilitySetupPage from "./pages/onboarding/facility-setup";

// Study creation and form builder
import StudyCreationPage from "./pages/studies/create";

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
          
          {/* User Dashboards */}
          <Route path="/dashboard/patient" element={<PatientDashboard />} />
          <Route path="/dashboard/researcher" element={<ResearcherDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          
          {/* Patient Management */}
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/patients/register" element={<PatientRegistrationPage />} />
          <Route path="/patients/:patientId" element={<PatientDetailsPage />} />
          <Route path="/patients/insurance-information" element={<InsuranceInformationPage />} />
          <Route path="/patients/clinical-information" element={<ClinicalInformationPage />} />
          <Route path="/patients/consent-form" element={<ConsentFormPage />} />
          
          {/* Research Study Pages */}
          <Route path="/studies" element={<StudiesPage />} />
          <Route path="/studies/create" element={<StudyCreationPage />} />
          <Route path="/studies/protocol-setup" element={<StudyProtocolSetupPage />} />
          <Route path="/studies/:studyId" element={<StudyDetailsPage />} />
          <Route path="/studies/consent-tracking" element={<InformedConsentPage />} />
          <Route path="/studies/finance" element={<StudyFinancePage />} />
          <Route path="/studies/protocol-deviations" element={<ProtocolDeviationsPage />} />
          <Route path="/studies/site-visits" element={<SiteVisitsPage />} />
          <Route path="/studies/sites" element={<StudySitesPage />} />
          <Route path="/studies/protocol-documents" element={<ProtocolDocumentsPage />} />
          <Route path="/studies/patient-randomization" element={<PatientRandomizationPage />} />
          
          {/* Quiz Management Routes */}
          <Route path="/studies/quiz-management" element={<QuizManagementPage />} />
          <Route path="/studies/quiz-management/create" element={<CreateQuizPage />} />
          <Route path="/studies/quiz-management/:quizId" element={<QuizDetailsPage />} />
          <Route path="/studies/quiz-management/:quizId/edit" element={<EditQuizPage />} />
          
          {/* Clinical Data & Workflows */}
          <Route path="/clinical-data" element={<ClinicalDataPage />} />
          <Route path="/clinical-workflows/notes" element={<ClinicalNotesPage />} />
          <Route path="/clinical-workflows/notes/new" element={<NewNotePage />} />
          <Route path="/clinical-workflows/prescriptions" element={<PrescriptionsPage />} />
          <Route path="/clinical-workflows/prescriptions/new" element={<NewPrescriptionPage />} />
          <Route path="/clinical-workflows/treatment-plans" element={<TreatmentPlansPage />} />
          <Route path="/clinical-workflows/medical-orders" element={<MedicalOrdersPage />} />
          <Route path="/clinical-workflows/patient-education" element={<PatientEducationPage />} />
          <Route path="/lab-results" element={<LabResultsPage />} />
          
          {/* Medical Records */}
          <Route path="/medical-records" element={<MedicalRecordsPage />} />
          <Route path="/medical-records/history" element={<PatientHistoryPage />} />
          <Route path="/medical-records/diagnoses" element={<DiagnosesPage />} />
          <Route path="/medical-records/imaging" element={<ImagingResultsPage />} />
          <Route path="/medical-records/external" element={<ExternalRecordsPage />} />
          
          {/* Clinical Reports */}
          <Route path="/clinical-reports" element={<ClinicalReportsPage />} />
          <Route path="/clinical-reports/outcomes" element={<TreatmentOutcomesPage />} />
          <Route path="/clinical-reports/patient-analytics" element={<PatientAnalyticsPage />} />
          <Route path="/clinical-reports/provider-metrics" element={<ProviderMetricsPage />} />
          <Route path="/clinical-reports/medications" element={<MedicationReportsPage />} />
          
          {/* Patient Interaction Pages */}
          <Route path="/patient-portal/dashboard" element={<PatientPortalDashboard />} />
          <Route path="/messages" element={<MessagingPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          
          {/* Admin & Analytics Pages */}
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/users" element={<UserManagementPage />} />
          <Route path="/users/roles" element={<RolesPermissionsPage />} />
          <Route path="/users/access-requests" element={<AccessRequestsPage />} />
          <Route path="/audit-logs" element={<AuditLogPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/analytics/enrollment" element={<EnrollmentAnalyticsPage />} />
          <Route path="/analytics/outcomes" element={<StudyOutcomesPage />} />
          <Route path="/analytics/site-performance" element={<SitePerformancePage />} />
          <Route path="/analytics/data-quality" element={<DataQualityPage />} />
          <Route path="/analytics/geographic" element={<GeographicDistributionPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/notifications" element={<NotificationsSettingsPage />} />
          <Route path="/settings/system" element={<SystemSettingsPage />} />
          <Route path="/settings/billing" element={<BillingPage />} />
          <Route path="/compliance" element={<CompliancePage />} />
          
          {/* Research Data Pages */}
          <Route path="/research-data/collection" element={<DataCollectionPage />} />
          <Route path="/research-data/exports" element={<DataExportsPage />} />
          <Route path="/research-data/lab-results" element={<ResearchLabResultsPage />} />
          <Route path="/research-data/biospecimen" element={<BiospecimenTrackingPage />} />
          
          {/* Onboarding */}
          <Route path="/onboarding/facility-setup" element={<FacilitySetupPage />} />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
