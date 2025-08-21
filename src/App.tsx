import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import ForgotPasswordPage from './pages/auth/forgot-password';
import PasswordResetPage from './pages/auth/password-reset';

// Module-specific dashboards
import ClinicalDashboard from './modules/clinical/pages/Dashboard';
import ResearchDashboard from './modules/research/pages/Dashboard';
import AdminDashboard from './modules/admin/pages/Dashboard';

// Shared pages
import AppointmentsPage from './pages/appointments/appointments';
import PatientsPage from './pages/patients';
import MessagesPage from './pages/messages/messages';
import MessagingPage from './pages/messages';

// Clinical module pages
import MedicalRecordsPage from './pages/medical-records';
import ImagingResultsPage from './pages/medical-records/imaging';
import DiagnosesPage from './pages/medical-records/diagnoses';
import PatientHistoryPage from './pages/medical-records/history';
import ExternalRecordsPage from './pages/medical-records/external';
import OncologyStagingPage from './pages/oncology-staging';
import ClinicalDataPage from './pages/clinical-data';

// Research module pages
import StudiesPage from './pages/studies';
import AnalyticsPage from './pages/analytics';

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/password-reset" element={<PasswordResetPage />} />

        {/* Root redirect */}
        <Route path="/" element={<Navigate to="/clinical/dashboard" replace />} />

        {/* Clinical Module Routes */}
        <Route path="/clinical/dashboard" element={<ClinicalDashboard />} />
        <Route path="/clinical/workflows/oncology-staging" element={<OncologyStagingPage />} />
        <Route path="/clinical/medical-records" element={<MedicalRecordsPage />} />
        <Route path="/clinical/medical-records/imaging" element={<ImagingResultsPage />} />
        <Route path="/clinical/medical-records/diagnoses" element={<DiagnosesPage />} />
        <Route path="/clinical/medical-records/history" element={<PatientHistoryPage />} />
        <Route path="/clinical/medical-records/external" element={<ExternalRecordsPage />} />
        <Route path="/clinical/clinical-data" element={<ClinicalDataPage />} />

        {/* Research Module Routes */}
        <Route path="/research/dashboard" element={<ResearchDashboard />} />
        <Route path="/research/studies" element={<StudiesPage />} />
        <Route path="/research/analytics" element={<AnalyticsPage />} />

        {/* Admin Module Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Shared Routes (accessible from both modules) */}
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/messages" element={<MessagingPage />} />

        {/* Legacy routes for backward compatibility */}
        <Route path="/medical-records" element={<Navigate to="/clinical/medical-records" replace />} />
        <Route path="/medical-records/imaging" element={<Navigate to="/clinical/medical-records/imaging" replace />} />
        <Route path="/medical-records/diagnoses" element={<Navigate to="/clinical/medical-records/diagnoses" replace />} />
        <Route path="/medical-records/history" element={<Navigate to="/clinical/medical-records/history" replace />} />
        <Route path="/medical-records/external" element={<Navigate to="/clinical/medical-records/external" replace />} />
        <Route path="/studies" element={<Navigate to="/research/studies" replace />} />
        <Route path="/analytics" element={<Navigate to="/research/analytics" replace />} />
        <Route path="/clinical-data" element={<Navigate to="/clinical/clinical-data" replace />} />
        <Route path="/oncology-staging" element={<Navigate to="/clinical/workflows/oncology-staging" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
