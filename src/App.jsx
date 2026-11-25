import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AppLayout from './components/layout/AppLayout';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminStudents from './pages/admin/AdminStudents';
import AdminFaculty from './pages/admin/AdminFaculty';
import AdminSubjectsClasses from './pages/admin/AdminSubjectsClasses';
import AdminReports from './pages/admin/AdminReports';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminAnnouncements from './pages/admin/AdminAnnouncements';
import AdminSettings from './pages/admin/AdminSettings';

// Faculty Pages
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import FacultyStudents from './pages/faculty/FacultyStudents';
import FacultyAttendancePage from './pages/faculty/FacultyAttendancePage';
import MarksManagementPage from './pages/faculty/MarksManagementPage';
import StudentRemarksPage from './pages/faculty/StudentRemarksPage';
import FacultyReportsPage from './pages/faculty/FacultyReportsPage';
import FacultyProfilePage from './pages/faculty/FacultyProfilePage';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentAttendancePage from './pages/student/StudentAttendancePage';
import StudentResultsPage from './pages/student/StudentResultsPage';
import StudentSubjectsPage from './pages/student/StudentSubjectsPage';
import StudentProgressPage from './pages/student/StudentProgressPage';
import StudentReportCardsPage from './pages/student/StudentReportCardsPage';
import StudentProfilePage from './pages/student/StudentProfilePage';

// Parent Pages
import ParentDashboard from './pages/parent/ParentDashboard';
import ParentAttendancePage from './pages/parent/ParentAttendancePage';
import ParentResultsPage from './pages/parent/ParentResultsPage';
import ParentReportsPage from './pages/parent/ParentReportsPage';
import ParentProfilePage from './pages/parent/ParentProfilePage';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const RootRedirect = () => {
  return <Navigate to="/login" replace />;
};

export const App = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Authenticated Application Routes with AppLayout */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<AdminStudents />} />
          <Route path="/admin/faculty" element={<AdminFaculty />} />
          <Route path="/admin/classes" element={<AdminSubjectsClasses />} />
          <Route path="/admin/subjects" element={<AdminSubjectsClasses />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/announcements" element={<AdminAnnouncements />} />
          <Route path="/admin/settings" element={<AdminSettings />} />

          {/* Faculty Routes */}
          <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
          <Route path="/faculty/students" element={<FacultyStudents />} />
          <Route path="/faculty/attendance" element={<FacultyAttendancePage />} />
          <Route path="/faculty/marks" element={<MarksManagementPage />} />
          <Route path="/faculty/remarks" element={<StudentRemarksPage />} />
          <Route path="/faculty/reports" element={<FacultyReportsPage />} />
          <Route path="/faculty/announcements" element={<AdminAnnouncements />} />
          <Route path="/faculty/profile" element={<FacultyProfilePage />} />

          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/attendance" element={<StudentAttendancePage />} />
          <Route path="/student/results" element={<StudentResultsPage />} />
          <Route path="/student/subjects" element={<StudentSubjectsPage />} />
          <Route path="/student/progress" element={<StudentProgressPage />} />
          <Route path="/student/reports" element={<StudentReportCardsPage />} />
          <Route path="/student/announcements" element={<AdminAnnouncements />} />
          <Route path="/student/profile" element={<StudentProfilePage />} />

          {/* Parent Routes */}
          <Route path="/parent/dashboard" element={<ParentDashboard />} />
          <Route path="/parent/attendance" element={<ParentAttendancePage />} />
          <Route path="/parent/results" element={<ParentResultsPage />} />
          <Route path="/parent/reports" element={<ParentReportsPage />} />
          <Route path="/parent/remarks" element={<StudentRemarksPage />} />
          <Route path="/parent/announcements" element={<AdminAnnouncements />} />
          <Route path="/parent/profile" element={<ParentProfilePage />} />
        </Route>

        {/* Root and Fallback */}
        <Route path="/" element={<RootRedirect />} />
        <Route path="*" element={<RootRedirect />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
