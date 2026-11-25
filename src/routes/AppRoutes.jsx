import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppLayout from '../components/layout/AppLayout';

// Auth
import LoginPage from '../pages/auth/LoginPage';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import StudentsManagement from '../pages/admin/StudentsManagement';
import FacultyManagement from '../pages/admin/FacultyManagement';
import ClassesAndSubjects from '../pages/admin/ClassesAndSubjects';
import AcademicReports from '../pages/admin/AcademicReports';
import AnalyticsPage from '../pages/admin/AnalyticsPage';
import AnnouncementsManagement from '../pages/admin/AnnouncementsManagement';
import SettingsPage from '../pages/admin/SettingsPage';

// Faculty Pages
import FacultyDashboard from '../pages/faculty/FacultyDashboard';
import FacultyStudents from '../pages/faculty/FacultyStudents';
import AttendanceManagement from '../pages/faculty/AttendanceManagement';
import MarksManagementPage from '../pages/faculty/MarksManagementPage';
import StudentRemarksPage from '../pages/faculty/StudentRemarksPage';
import FacultyReportsPage from '../pages/faculty/FacultyReportsPage';
import FacultyProfilePage from '../pages/faculty/FacultyProfilePage';

// Student Pages
import StudentDashboard from '../pages/student/StudentDashboard';
import StudentAttendancePage from '../pages/student/StudentAttendancePage';
import StudentResultsPage from '../pages/student/StudentResultsPage';
import StudentSubjectsPage from '../pages/student/StudentSubjectsPage';
import StudentProgressPage from '../pages/student/StudentProgressPage';
import StudentReportCardsPage from '../pages/student/StudentReportCardsPage';
import StudentProfilePage from '../pages/student/StudentProfilePage';

// Parent Pages
import ParentDashboard from '../pages/parent/ParentDashboard';
import ParentAttendancePage from '../pages/parent/ParentAttendancePage';
import ParentResultsPage from '../pages/parent/ParentResultsPage';
import ParentRemarksPage from '../pages/parent/ParentRemarksPage';
import ParentReportsPage from '../pages/parent/ParentReportsPage';
import ParentProfilePage from '../pages/parent/ParentProfilePage';

export const AppRoutes = () => {
  const { role, isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Login Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AppLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="students" element={<StudentsManagement />} />
        <Route path="faculty" element={<FacultyManagement />} />
        <Route path="subjects" element={<ClassesAndSubjects />} />
        <Route path="classes" element={<ClassesAndSubjects />} />
        <Route path="reports" element={<AcademicReports />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="announcements" element={<AnnouncementsManagement />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Faculty Routes */}
      <Route path="/faculty" element={<AppLayout />}>
        <Route index element={<Navigate to="/faculty/dashboard" replace />} />
        <Route path="dashboard" element={<FacultyDashboard />} />
        <Route path="students" element={<FacultyStudents />} />
        <Route path="attendance" element={<AttendanceManagement />} />
        <Route path="marks" element={<MarksManagementPage />} />
        <Route path="assessments" element={<MarksManagementPage />} />
        <Route path="remarks" element={<StudentRemarksPage />} />
        <Route path="reports" element={<FacultyReportsPage />} />
        <Route path="announcements" element={<AnnouncementsManagement />} />
        <Route path="profile" element={<FacultyProfilePage />} />
      </Route>

      {/* Student Routes */}
      <Route path="/student" element={<AppLayout />}>
        <Route index element={<Navigate to="/student/dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="attendance" element={<StudentAttendancePage />} />
        <Route path="results" element={<StudentResultsPage />} />
        <Route path="subjects" element={<StudentSubjectsPage />} />
        <Route path="progress" element={<StudentProgressPage />} />
        <Route path="reports" element={<StudentReportCardsPage />} />
        <Route path="announcements" element={<AnnouncementsManagement />} />
        <Route path="profile" element={<StudentProfilePage />} />
      </Route>

      {/* Parent Routes */}
      <Route path="/parent" element={<AppLayout />}>
        <Route index element={<Navigate to="/parent/dashboard" replace />} />
        <Route path="dashboard" element={<ParentDashboard />} />
        <Route path="attendance" element={<ParentAttendancePage />} />
        <Route path="results" element={<ParentResultsPage />} />
        <Route path="remarks" element={<ParentRemarksPage />} />
        <Route path="reports" element={<ParentReportsPage />} />
        <Route path="announcements" element={<AnnouncementsManagement />} />
        <Route path="profile" element={<ParentProfilePage />} />
      </Route>

      {/* Default Catch-all */}
      <Route
        path="*"
        element={
          isAuthenticated && role ? (
            <Navigate to={`/${role}/dashboard`} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;
