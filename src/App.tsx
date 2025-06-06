
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import LoginPage from '@/pages/auth/login';
import RegisterPage from '@/pages/auth/register';
import ForgotPasswordPage from '@/pages/auth/forgot-password';
import DashboardPage from '@/pages/dashboards/clinical-dashboard';
import ResearcherDashboardPage from '@/pages/dashboards/researcher-dashboard';
import AdminDashboardPage from '@/pages/dashboards/admin-dashboard';
import PatientDashboard from '@/pages/dashboards/patient-dashboard';
import AllLinksPage from '@/pages/all-links';
import PatientsListPage from '@/pages/patients/list';
import PatientDetailsPage from '@/pages/patients/[patientId]';
import PatientRegistrationPage from '@/pages/patients/register';
import ClinicalInformationPage from '@/pages/patients/clinical-information';
import InsuranceInformationPage from '@/pages/patients/insurance-information';
import ClinicalNotesPage from '@/pages/clinical-workflows/notes';
import NewClinicalNotePage from '@/pages/clinical-workflows/notes/new';
import NursingNotesPage from '@/pages/clinical-workflows/nursing-notes';
import NewNursingNotePage from '@/pages/clinical-workflows/nursing-notes/new';
import PrescriptionsPage from '@/pages/clinical-workflows/prescriptions';
import NewPrescriptionPage from '@/pages/clinical-workflows/prescriptions/new';
import TreatmentPlansPage from '@/pages/clinical-workflows/treatment-plans';
import MedicalOrdersPage from '@/pages/clinical-workflows/medical-orders';
import PatientEducationPage from '@/pages/clinical-workflows/patient-education';
import MedicationsPage from '@/pages/clinical-workflows/medications';
import DischargePage from '@/pages/clinical-workflows/discharge';
import ClinicalDataPage from '@/pages/clinical-data/clinical-data';
import VitalSignsPage from '@/pages/clinical-data/vitals';
import LabResultsPage from '@/pages/lab/lab-results';
import QualityControlPage from '@/pages/lab/quality-control';
import SamplesPage from '@/pages/lab/samples';
import PatientHistoryPage from '@/pages/medical-records/history';
import DiagnosesPage from '@/pages/medical-records/diagnoses';
import ImagingResultsPage from '@/pages/medical-records/imaging';
import ExternalRecordsPage from '@/pages/medical-records/external';
import MedicalRecordsPage from '@/pages/medical-records/index';
import AppointmentsPage from '@/pages/appointments/appointments';
import CheckInPage from '@/pages/appointments/checkin';
import MessagesPage from '@/pages/messages/messages';
import StudiesPage from '@/pages/studies/studies';
import StudyDetailsPage from '@/pages/studies/[studyId]';
import ProtocolSetupPage from '@/pages/studies/protocol-setup';
import StudySitesPage from '@/pages/studies/sites';
import ProtocolDocumentsPage from '@/pages/studies/protocol-documents';
import ConsentTrackingPage from '@/pages/studies/consent-tracking';
import PatientRandomizationPage from '@/pages/studies/patient-randomization';
import ProtocolDeviationsPage from '@/pages/studies/protocol-deviations';
import SiteVisitsPage from '@/pages/studies/site-visits';
import StudyFinancePage from '@/pages/studies/finance';
import QuizManagementPage from '@/pages/studies/quiz-management';
import RecruitmentPage from '@/pages/studies/recruitment';
import DataCollectionPage from '@/pages/research-data/collection';
import DataExportsPage from '@/pages/research-data/exports';
import ResearchLabResultsPage from '@/pages/research-data/lab-results';
import BiospecimenTrackingPage from '@/pages/research-data/biospecimen';
import FormBuilderPage from '@/pages/forms/builder';
import CRFsPage from '@/pages/forms/crfs';
import DataQueryPage from '@/pages/data/queries';
import AnalyticsPage from '@/pages/analytics/analytics';
import EnrollmentAnalyticsPage from '@/pages/analytics/enrollment';
import StudyOutcomesPage from '@/pages/analytics/outcomes';
import SitePerformancePage from '@/pages/analytics/site-performance';
import DataQualityPage from '@/pages/analytics/data-quality';
import GeographicDistributionPage from '@/pages/analytics/geographic';
import UsageAnalyticsPage from '@/pages/analytics/usage';
import RevenueReportsPage from '@/pages/analytics/revenue';
import ClinicalReportsPage from '@/pages/clinical-reports/clinical-reports';
import TreatmentOutcomesPage from '@/pages/clinical-reports/outcomes';
import PatientAnalyticsPage from '@/pages/clinical-reports/patient-analytics';
import ProviderMetricsPage from '@/pages/clinical-reports/provider-metrics';
import MedicationReportsPage from '@/pages/clinical-reports/medication-reports';
import HandoffReportsPage from '@/pages/clinical-reports/handoff';
import UsersPage from '@/pages/users/users';
import RolesPermissionsPage from '@/pages/users/roles';
import AccessRequestsPage from '@/pages/users/access-requests';
import FacilitiesPage from '@/pages/facilities/facilities';
import SettingsPage from '@/pages/settings/settings';
import BillingPage from '@/pages/settings/billing';
import NotificationsPage from '@/pages/settings/notifications';
import SystemConfigPage from '@/pages/settings/system';
import CompliancePage from '@/pages/compliance/compliance';
import AuditLogsPage from '@/pages/audit-logs/audit-logs';
import SupportPage from '@/pages/support/support';
import HelpPage from '@/pages/help/help';
import NotFoundPage from '@/pages/404';
import ClinicalQueuePage from '@/pages/clinical-workflows/clinical-queue';
import TriagePage from '@/pages/clinical-workflows/triage';
import SOAPNotesPage from '@/pages/clinical-workflows/soap-notes';
import ClinicalCheckInPage from '@/pages/clinical-workflows/check-in';

// New facility management imports
import BedManagementPage from '@/pages/facility-management/beds';
import RoomAllocationPage from '@/pages/facility-management/rooms';
import EquipmentTrackingPage from '@/pages/facility-management/equipment';
import MaintenancePage from '@/pages/facility-management/maintenance';

// New staff management imports
import StaffDirectoryPage from '@/pages/staff-management/directory';
import DutySchedulesPage from '@/pages/staff-management/schedules';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="App">
            <Routes>
              {/* Authentication Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              
              {/* Role-based Dashboard Routes */}
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dashboard/clinical" element={<DashboardPage />} />
              <Route path="/dashboard/researcher" element={<ResearcherDashboardPage />} />
              <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
              <Route path="/dashboard/patient" element={<PatientDashboard />} />
              
              {/* Special Navigation Routes */}
              <Route path="/all-links" element={<AllLinksPage />} />
              
              {/* Patient Management Routes */}
              <Route path="/patients" element={<PatientsListPage />} />
              <Route path="/patients/:patientId" element={<PatientDetailsPage />} />
              <Route path="/patients/register" element={<PatientRegistrationPage />} />
              <Route path="/patients/clinical-information" element={<ClinicalInformationPage />} />
              <Route path="/patients/insurance-information" element={<InsuranceInformationPage />} />

              {/* Clinical Workflow Routes */}
              <Route path="/clinical-workflows/check-in" element={<ClinicalCheckInPage />} />
              <Route path="/clinical-workflows/clinical-queue" element={<ClinicalQueuePage />} />
              <Route path="/clinical-workflows/triage" element={<TriagePage />} />
              <Route path="/clinical-workflows/soap-notes" element={<SOAPNotesPage />} />
              <Route path="/clinical-workflows/notes" element={<ClinicalNotesPage />} />
              <Route path="/clinical-workflows/notes/new" element={<NewClinicalNotePage />} />
              <Route path="/clinical-workflows/nursing-notes" element={<NursingNotesPage />} />
              <Route path="/clinical-workflows/nursing-notes/new" element={<NewNursingNotePage />} />
              <Route path="/clinical-workflows/prescriptions" element={<PrescriptionsPage />} />
              <Route path="/clinical-workflows/prescriptions/new" element={<NewPrescriptionPage />} />
              <Route path="/clinical-workflows/treatment-plans" element={<TreatmentPlansPage />} />
              <Route path="/clinical-workflows/medical-orders" element={<MedicalOrdersPage />} />
              <Route path="/clinical-workflows/patient-education" element={<PatientEducationPage />} />
              <Route path="/clinical-workflows/medications" element={<MedicationsPage />} />
              <Route path="/clinical-workflows/discharge" element={<DischargePage />} />

              {/* Facility Management Routes */}
              <Route path="/facility-management/beds" element={<BedManagementPage />} />
              <Route path="/facility-management/rooms" element={<RoomAllocationPage />} />
              <Route path="/facility-management/equipment" element={<EquipmentTrackingPage />} />
              <Route path="/facility-management/maintenance" element={<MaintenancePage />} />

              {/* Staff Management Routes */}
              <Route path="/staff-management/directory" element={<StaffDirectoryPage />} />
              <Route path="/staff-management/schedules" element={<DutySchedulesPage />} />
              <Route path="/staff-management/shifts" element={<div className="p-8 text-center">Shift Management - Coming Soon</div>} />
              <Route path="/staff-management/time-tracking" element={<div className="p-8 text-center">Time Tracking - Coming Soon</div>} />
              <Route path="/staff-management/leave" element={<div className="p-8 text-center">Leave Management - Coming Soon</div>} />

              {/* HR Management Routes */}
              <Route path="/hr-management/employees" element={<div className="p-8 text-center">Employee Records - Coming Soon</div>} />
              <Route path="/hr-management/payroll" element={<div className="p-8 text-center">Payroll - Coming Soon</div>} />
              <Route path="/hr-management/benefits" element={<div className="p-8 text-center">Benefits - Coming Soon</div>} />
              <Route path="/hr-management/training" element={<div className="p-8 text-center">Training & Certification - Coming Soon</div>} />
              <Route path="/hr-management/performance" element={<div className="p-8 text-center">Performance Reviews - Coming Soon</div>} />

              {/* Clinical Data Routes */}
              <Route path="/clinical-data" element={<ClinicalDataPage />} />
              <Route path="/clinical-data/vitals" element={<VitalSignsPage />} />

              {/* Laboratory Routes */}
              <Route path="/lab-results" element={<LabResultsPage />} />
              <Route path="/lab/quality-control" element={<QualityControlPage />} />
              <Route path="/lab/samples" element={<SamplesPage />} />

              {/* Medical Records Routes */}
              <Route path="/medical-records" element={<MedicalRecordsPage />} />
              <Route path="/medical-records/history" element={<PatientHistoryPage />} />
              <Route path="/medical-records/diagnoses" element={<DiagnosesPage />} />
              <Route path="/medical-records/imaging" element={<ImagingResultsPage />} />
              <Route path="/medical-records/external" element={<ExternalRecordsPage />} />

              {/* Appointment Routes */}
              <Route path="/appointments" element={<AppointmentsPage />} />
              <Route path="/appointments/checkin" element={<CheckInPage />} />

              {/* Messages Routes */}
              <Route path="/messages" element={<MessagesPage />} />

              {/* Studies Routes */}
              <Route path="/studies" element={<StudiesPage />} />
              <Route path="/studies/create" element={<StudiesPage />} />
              <Route path="/studies/:studyId" element={<StudyDetailsPage />} />
              <Route path="/studies/protocol-setup" element={<ProtocolSetupPage />} />
              <Route path="/studies/sites" element={<StudySitesPage />} />
              <Route path="/studies/protocol-documents" element={<ProtocolDocumentsPage />} />
              <Route path="/studies/consent-tracking" element={<ConsentTrackingPage />} />
              <Route path="/studies/patient-randomization" element={<PatientRandomizationPage />} />
              <Route path="/studies/protocol-deviations" element={<ProtocolDeviationsPage />} />
              <Route path="/studies/site-visits" element={<SiteVisitsPage />} />
              <Route path="/studies/finance" element={<StudyFinancePage />} />
              <Route path="/studies/quiz-management" element={<QuizManagementPage />} />
              <Route path="/studies/recruitment" element={<RecruitmentPage />} />

              {/* Research Data Routes */}
              <Route path="/research-data/collection" element={<DataCollectionPage />} />
              <Route path="/research-data/exports" element={<DataExportsPage />} />
              <Route path="/research-data/lab-results" element={<ResearchLabResultsPage />} />
              <Route path="/research-data/biospecimen" element={<BiospecimenTrackingPage />} />

              {/* Forms Routes */}
              <Route path="/forms/builder" element={<FormBuilderPage />} />
              <Route path="/forms/crfs" element={<CRFsPage />} />

              {/* Data Management Routes */}
              <Route path="/data/queries" element={<DataQueryPage />} />

              {/* Analytics Routes */}
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/analytics/enrollment" element={<EnrollmentAnalyticsPage />} />
              <Route path="/analytics/outcomes" element={<StudyOutcomesPage />} />
              <Route path="/analytics/site-performance" element={<SitePerformancePage />} />
              <Route path="/analytics/data-quality" element={<DataQualityPage />} />
              <Route path="/analytics/geographic" element={<GeographicDistributionPage />} />
              <Route path="/analytics/usage" element={<UsageAnalyticsPage />} />
              <Route path="/analytics/revenue" element={<RevenueReportsPage />} />

              {/* Clinical Reports Routes */}
              <Route path="/clinical-reports" element={<ClinicalReportsPage />} />
              <Route path="/clinical-reports/outcomes" element={<TreatmentOutcomesPage />} />
              <Route path="/clinical-reports/patient-analytics" element={<PatientAnalyticsPage />} />
              <Route path="/clinical-reports/provider-metrics" element={<ProviderMetricsPage />} />
              <Route path="/clinical-reports/medications" element={<MedicationReportsPage />} />
              <Route path="/clinical-reports/handoff" element={<HandoffReportsPage />} />

              {/* User Management Routes */}
              <Route path="/users" element={<UsersPage />} />
              <Route path="/users/roles" element={<RolesPermissionsPage />} />
              <Route path="/users/access-requests" element={<AccessRequestsPage />} />

              {/* Facility Management Routes */}
              <Route path="/facilities" element={<FacilitiesPage />} />

              {/* Settings Routes */}
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/settings/billing" element={<BillingPage />} />
              <Route path="/settings/notifications" element={<NotificationsPage />} />
              <Route path="/settings/system" element={<SystemConfigPage />} />

              {/* Compliance & Audit Routes */}
              <Route path="/compliance" element={<CompliancePage />} />
              <Route path="/audit-logs" element={<AuditLogsPage />} />

              {/* Support Routes */}
              <Route path="/support" element={<SupportPage />} />
              <Route path="/help" element={<HelpPage />} />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Toaster />
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
