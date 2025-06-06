
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';

// Authentication Pages
import LoginPage from '@/pages/auth/login';
import RegisterPage from '@/pages/auth/register';
import ForgotPasswordPage from '@/pages/auth/forgot-password';
import PasswordResetPage from '@/pages/auth/password-reset';

// Dashboard Pages
import DashboardPage from '@/pages/dashboards/dashboard';
import AdminDashboard from '@/pages/dashboards/admin-dashboard';
import ClinicalDashboard from '@/pages/dashboards/clinical-dashboard';
import ResearcherDashboard from '@/pages/dashboards/researcher-dashboard';
import PatientDashboard from '@/pages/dashboards/patient-dashboard';
import NurseDashboard from '@/pages/dashboards/nurse-dashboard';
import LabTechDashboard from '@/pages/dashboards/lab-tech-dashboard';
import ReceptionistDashboard from '@/pages/dashboards/receptionist-dashboard';
import ParticipantDashboard from '@/pages/dashboards/participant-dashboard';
import CoordinatorDashboard from '@/pages/dashboards/coordinator-dashboard';
import PIDashboard from '@/pages/dashboards/pi-dashboard';

// Patient Portal
import PatientPortalDashboard from '@/pages/patient-portal/dashboard';
import PatientPortalSupport from '@/pages/patient-portal/support';

// Messages
import MessagesPage from '@/pages/messages';

// New facility management imports
import BedManagementPage from '@/pages/facility-management/beds';
import RoomAllocationPage from '@/pages/facility-management/rooms';
import EquipmentTrackingPage from '@/pages/facility-management/equipment';
import MaintenancePage from '@/pages/facility-management/maintenance';

// New staff management imports
import StaffDirectoryPage from '@/pages/staff-management/directory';
import DutySchedulesPage from '@/pages/staff-management/schedules';

// New imports for HR Management
import EmployeeRecordsPage from '@/pages/hr-management/employees';
import PayrollPage from '@/pages/hr-management/payroll';
import BenefitsPage from '@/pages/hr-management/benefits';
import TrainingPage from '@/pages/hr-management/training';
import PerformanceReviewsPage from '@/pages/hr-management/performance';

// New imports for Staff Management
import TimeTrackingPage from '@/pages/staff-management/time-tracking';
import ShiftManagementPage from '@/pages/staff-management/shifts';
import LeaveManagementPage from '@/pages/staff-management/leave';

// Special Navigation
import AllLinksPage from '@/pages/all-links';

// Placeholder components for missing pages
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p className="text-muted-foreground">This page is under development.</p>
    </div>
  </div>
);

// Create placeholder components
const PatientsListPage = () => <PlaceholderPage title="Patients List" />;
const PatientDetailsPage = () => <PlaceholderPage title="Patient Details" />;
const PatientRegistrationPage = () => <PlaceholderPage title="Patient Registration" />;
const ClinicalInformationPage = () => <PlaceholderPage title="Clinical Information" />;
const InsuranceInformationPage = () => <PlaceholderPage title="Insurance Information" />;
const ClinicalCheckInPage = () => <PlaceholderPage title="Clinical Check-In" />;
const ClinicalQueuePage = () => <PlaceholderPage title="Clinical Queue" />;
const TriagePage = () => <PlaceholderPage title="Triage" />;
const SOAPNotesPage = () => <PlaceholderPage title="SOAP Notes" />;
const ClinicalNotesPage = () => <PlaceholderPage title="Clinical Notes" />;
const NewClinicalNotePage = () => <PlaceholderPage title="New Clinical Note" />;
const NursingNotesPage = () => <PlaceholderPage title="Nursing Notes" />;
const NewNursingNotePage = () => <PlaceholderPage title="New Nursing Note" />;
const PrescriptionsPage = () => <PlaceholderPage title="Prescriptions" />;
const NewPrescriptionPage = () => <PlaceholderPage title="New Prescription" />;
const TreatmentPlansPage = () => <PlaceholderPage title="Treatment Plans" />;
const MedicalOrdersPage = () => <PlaceholderPage title="Medical Orders" />;
const PatientEducationPage = () => <PlaceholderPage title="Patient Education" />;
const MedicationsPage = () => <PlaceholderPage title="Medications" />;
const DischargePage = () => <PlaceholderPage title="Discharge" />;
const ClinicalDataPage = () => <PlaceholderPage title="Clinical Data" />;
const VitalSignsPage = () => <PlaceholderPage title="Vital Signs" />;
const LabResultsPage = () => <PlaceholderPage title="Lab Results" />;
const QualityControlPage = () => <PlaceholderPage title="Quality Control" />;
const SamplesPage = () => <PlaceholderPage title="Samples" />;
const MedicalRecordsPage = () => <PlaceholderPage title="Medical Records" />;
const PatientHistoryPage = () => <PlaceholderPage title="Patient History" />;
const DiagnosesPage = () => <PlaceholderPage title="Diagnoses" />;
const ImagingResultsPage = () => <PlaceholderPage title="Imaging Results" />;
const ExternalRecordsPage = () => <PlaceholderPage title="External Records" />;
const AppointmentsPage = () => <PlaceholderPage title="Appointments" />;
const CheckInPage = () => <PlaceholderPage title="Check-In" />;
const StudiesPage = () => <PlaceholderPage title="Studies" />;
const StudyDetailsPage = () => <PlaceholderPage title="Study Details" />;
const ProtocolSetupPage = () => <PlaceholderPage title="Protocol Setup" />;
const StudySitesPage = () => <PlaceholderPage title="Study Sites" />;
const ProtocolDocumentsPage = () => <PlaceholderPage title="Protocol Documents" />;
const ConsentTrackingPage = () => <PlaceholderPage title="Consent Tracking" />;
const PatientRandomizationPage = () => <PlaceholderPage title="Patient Randomization" />;
const ProtocolDeviationsPage = () => <PlaceholderPage title="Protocol Deviations" />;
const SiteVisitsPage = () => <PlaceholderPage title="Site Visits" />;
const StudyFinancePage = () => <PlaceholderPage title="Study Finance" />;
const QuizManagementPage = () => <PlaceholderPage title="Quiz Management" />;
const RecruitmentPage = () => <PlaceholderPage title="Recruitment" />;
const DataCollectionPage = () => <PlaceholderPage title="Data Collection" />;
const DataExportsPage = () => <PlaceholderPage title="Data Exports" />;
const ResearchLabResultsPage = () => <PlaceholderPage title="Research Lab Results" />;
const BiospecimenTrackingPage = () => <PlaceholderPage title="Biospecimen Tracking" />;
const FormBuilderPage = () => <PlaceholderPage title="Form Builder" />;
const CRFsPage = () => <PlaceholderPage title="CRFs" />;
const DataQueryPage = () => <PlaceholderPage title="Data Query" />;
const AnalyticsPage = () => <PlaceholderPage title="Analytics" />;
const EnrollmentAnalyticsPage = () => <PlaceholderPage title="Enrollment Analytics" />;
const StudyOutcomesPage = () => <PlaceholderPage title="Study Outcomes" />;
const SitePerformancePage = () => <PlaceholderPage title="Site Performance" />;
const DataQualityPage = () => <PlaceholderPage title="Data Quality" />;
const GeographicDistributionPage = () => <PlaceholderPage title="Geographic Distribution" />;
const UsageAnalyticsPage = () => <PlaceholderPage title="Usage Analytics" />;
const RevenueReportsPage = () => <PlaceholderPage title="Revenue Reports" />;
const ClinicalReportsPage = () => <PlaceholderPage title="Clinical Reports" />;
const TreatmentOutcomesPage = () => <PlaceholderPage title="Treatment Outcomes" />;
const PatientAnalyticsPage = () => <PlaceholderPage title="Patient Analytics" />;
const ProviderMetricsPage = () => <PlaceholderPage title="Provider Metrics" />;
const MedicationReportsPage = () => <PlaceholderPage title="Medication Reports" />;
const HandoffReportsPage = () => <PlaceholderPage title="Handoff Reports" />;
const UsersPage = () => <PlaceholderPage title="Users" />;
const RolesPermissionsPage = () => <PlaceholderPage title="Roles & Permissions" />;
const AccessRequestsPage = () => <PlaceholderPage title="Access Requests" />;
const FacilitiesPage = () => <PlaceholderPage title="Facilities" />;
const SettingsPage = () => <PlaceholderPage title="Settings" />;
const BillingPage = () => <PlaceholderPage title="Billing" />;
const NotificationsPage = () => <PlaceholderPage title="Notifications" />;
const SystemConfigPage = () => <PlaceholderPage title="System Configuration" />;
const CompliancePage = () => <PlaceholderPage title="Compliance" />;
const AuditLogsPage = () => <PlaceholderPage title="Audit Logs" />;
const SupportPage = () => <PlaceholderPage title="Support" />;
const HelpPage = () => <PlaceholderPage title="Help" />;
const NotFoundPage = () => <PlaceholderPage title="Page Not Found" />;

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <Toaster />
          <Routes>
            {/* Authentication Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/password-reset" element={<PasswordResetPage />} />

            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/dashboard/clinical" element={<ClinicalDashboard />} />
            <Route path="/dashboard/researcher" element={<ResearcherDashboard />} />
            <Route path="/dashboard/patient" element={<PatientDashboard />} />
            <Route path="/dashboard/nurse" element={<NurseDashboard />} />
            <Route path="/dashboard/lab-tech" element={<LabTechDashboard />} />
            <Route path="/dashboard/receptionist" element={<ReceptionistDashboard />} />
            <Route path="/dashboard/participant" element={<ParticipantDashboard />} />
            <Route path="/dashboard/coordinator" element={<CoordinatorDashboard />} />
            <Route path="/dashboard/pi" element={<PIDashboard />} />

            {/* Patient Portal */}
            <Route path="/patient-portal/dashboard" element={<PatientPortalDashboard />} />
            <Route path="/patient-portal/support" element={<PatientPortalSupport />} />

            {/* Messages */}
            <Route path="/messages" element={<MessagesPage />} />

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
            <Route path="/staff-management/shifts" element={<ShiftManagementPage />} />
            <Route path="/staff-management/time-tracking" element={<TimeTrackingPage />} />
            <Route path="/staff-management/leave" element={<LeaveManagementPage />} />

            {/* HR Management Routes */}
            <Route path="/hr-management/employees" element={<EmployeeRecordsPage />} />
            <Route path="/hr-management/payroll" element={<PayrollPage />} />
            <Route path="/hr-management/benefits" element={<BenefitsPage />} />
            <Route path="/hr-management/training" element={<TrainingPage />} />
            <Route path="/hr-management/performance" element={<PerformanceReviewsPage />} />

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
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
