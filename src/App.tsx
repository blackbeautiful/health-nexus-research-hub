import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import ForgotPasswordPage from './pages/auth/forgot-password';
import PasswordResetPage from './pages/auth/password-reset';
import AppointmentsPage from './pages/appointments/appointments';
import PatientsPage from './pages/patients';
import MessagesPage from './pages/messages/messages';
import MessagingPage from './pages/messages';
import MedicalRecordsPage from './pages/medical-records';
import StudiesPage from './pages/studies';
import ClinicalDataPage from './pages/clinical-data';
import AnalyticsPage from './pages/analytics';
import ImagingResultsPage from './pages/medical-records/imaging';
import DiagnosesPage from './pages/medical-records/diagnoses';
import PatientHistoryPage from './pages/medical-records/history';
import ExternalRecordsPage from './pages/medical-records/external';
import OncologyStagingPage from './pages/oncology-staging';

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/password-reset" element={<PasswordResetPage />} />

        {/* Main App Routes */}
        <Route path="/" element={<AppointmentsPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/messages" element={<MessagingPage />} />
        <Route path="/medical-records" element={<MedicalRecordsPage />} />
        <Route path="/studies" element={<StudiesPage />} />
        <Route path="/clinical-data" element={<ClinicalDataPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />

        {/* Medical Records Sub-routes */}
        <Route path="/medical-records/imaging" element={<ImagingResultsPage />} />
        <Route path="/medical-records/diagnoses" element={<DiagnosesPage />} />
        <Route path="/medical-records/history" element={<PatientHistoryPage />} />
        <Route path="/medical-records/external" element={<ExternalRecordsPage />} />

        {/* Oncology Staging Route */}
        <Route path="/oncology-staging" element={<OncologyStagingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
