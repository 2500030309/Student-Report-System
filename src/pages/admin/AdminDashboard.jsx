import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAcademicData } from '../../context/AcademicDataContext';
import { useAuth } from '../../context/AuthContext';
import StatsCard from '../../components/common/StatsCard';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import {
  PerformanceTrendChart,
  SubjectBarChart,
  AttendanceGauge,
  DistributionBars
} from '../../components/common/SimpleCharts';
import {
  Users,
  GraduationCap,
  BookOpen,
  CalendarCheck,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Plus,
  FileText,
  Bell,
  Sparkles,
  Download,
  Filter
} from 'lucide-react';
import { MOCK_ACTIVITIES } from '../../data/mockData';

export const AdminDashboard = () => {
  const { students, faculty, subjects, classes, announcements, settings } = useAcademicData();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Calculate KPIs
  const totalStudents = students.length;
  const totalFaculty = faculty.length;
  const totalSubjects = subjects.length;

  const avgAttendance = students.length > 0
    ? (students.reduce((acc, s) => acc + (s.attendanceRate || 0), 0) / students.length).toFixed(1)
    : '85.4';

  const avgCgpa = students.length > 0
    ? (students.reduce((acc, s) => acc + (s.cgpa || 0), 0) / students.length).toFixed(2)
    : '8.21';

  // Critical alerts: students below attendance threshold (75%)
  const criticalStudents = students.filter(s => (s.attendanceRate || 0) < (settings?.attendanceThreshold || 75));

  // Trend data for charts
  const semesterTrends = [
    { label: 'Sem 1', value: 8.12 },
    { label: 'Sem 2', value: 8.35 },
    { label: 'Sem 3', value: 8.48 },
    { label: 'Sem 4', value: 8.61 },
    { label: 'Sem 5 (Curr)', value: parseFloat(avgCgpa) }
  ];

  const subjectPerformanceData = [
    { subject: 'Algorithms (CS501)', marks: 86, max: 100 },
    { subject: 'DBMS (CS502)', marks: 84, max: 100 },
    { subject: 'Networks (CS503)', marks: 81, max: 100 },
    { subject: 'Web Engg (CS505)', marks: 92, max: 100 },
    { subject: 'Theory of Comp (CS504)', marks: 74, max: 100 },
  ];

  const gradeDistribution = [
    { label: 'O (90-100%)', count: 12 },
    { label: 'A+ (80-89%)', count: 18 },
    { label: 'A (70-79%)', count: 8 },
    { label: 'B+ (60-69%)', count: 3 },
    { label: 'B (55-59%)', count: 1 }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-900 via-indigo-900 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-brand-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-brand-200 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-300" />
              <span>Institutional Overview • Autonomous Campus Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Welcome back, {currentUser?.name?.split(' ')[0] || 'Administrator'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-normal">
              {settings?.institution?.name} • Continuous Evaluation System. Real-time academic metrics, student rosters, and accreditation dashboards.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Button
              variant="secondary"
              size="sm"
              icon={Plus}
              onClick={() => navigate('/admin/students')}
              className="bg-white/15 text-white hover:bg-white/25 border-white/20"
            >
              Add Student
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={FileText}
              onClick={() => navigate('/admin/reports')}
              className="shadow-glow"
            >
              Generate Reports
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard
          title="Total Students"
          value={totalStudents}
          subtitle="4 Batches Enrolled"
          icon={Users}
          color="indigo"
          trend={{ value: "+8.4% YoY", positive: true }}
          onClick={() => navigate('/admin/students')}
        />
        <StatsCard
          title="Total Faculty"
          value={totalFaculty}
          subtitle="Ph.D & M.Tech Guides"
          icon={GraduationCap}
          color="purple"
          trend={{ value: "1:14 Ratio", neutral: true }}
          onClick={() => navigate('/admin/faculty')}
        />
        <StatsCard
          title="Active Courses"
          value={totalSubjects}
          subtitle="6 Core & 2 Electives"
          icon={BookOpen}
          color="sky"
          onClick={() => navigate('/admin/classes')}
        />
        <StatsCard
          title="Avg Attendance"
          value={`${avgAttendance}%`}
          subtitle="Min threshold: 75%"
          icon={CalendarCheck}
          color={parseFloat(avgAttendance) >= 75 ? 'emerald' : 'rose'}
          trend={{ value: "+2.1% this week", positive: true }}
        />
        <StatsCard
          title="Institutional CGPA"
          value={avgCgpa}
          subtitle="Class 5A Avg: 8.42"
          icon={TrendingUp}
          color="amber"
          trend={{ value: "Grade: 'O' Peak", positive: true }}
          onClick={() => navigate('/admin/analytics')}
        />
      </div>

      {/* Critical Academic Alerts (if any attendance < 75%) */}
      {criticalStudents.length > 0 && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-rose-900 dark:text-rose-200">
                Academic Attendance Shortage Alert ({criticalStudents.length} Students below 75%)
              </h4>
              <p className="text-xs text-rose-700 dark:text-rose-300">
                {criticalStudents.map(s => `${s.name} (${s.rollNumber}: ${s.attendanceRate}%)`).join(', ')} require mandatory parent notification before end-term examinations.
              </p>
            </div>
          </div>
          <Button
            variant="danger"
            size="xs"
            onClick={() => navigate('/admin/students')}
          >
            Review Attendance Shortage
          </Button>
        </div>
      )}

      {/* Main Charts & Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Semester Trend Chart */}
        <Card
          title="Semester Academic Progression"
          subtitle="Average SGPA performance trend across semesters"
          className="lg:col-span-2"
          action={
            <Button
              variant="ghost"
              size="xs"
              onClick={() => navigate('/admin/analytics')}
              icon={ArrowRight}
              iconPosition="right"
            >
              Full Analytics
            </Button>
          }
        >
          <PerformanceTrendChart data={semesterTrends} height={230} />
        </Card>

        {/* Attendance Distribution Gauge */}
        <Card
          title="Campus Attendance Health"
          subtitle="Institutional compliance gauge"
          className="flex flex-col justify-between"
        >
          <div className="py-2 flex flex-col items-center">
            <AttendanceGauge percentage={parseFloat(avgAttendance)} size={170} threshold={settings?.attendanceThreshold || 75} />
            <div className="mt-4 w-full grid grid-cols-2 gap-2 text-center pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Eligible (≥75%)</span>
                <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                  {students.length - criticalStudents.length} Students
                </p>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">At Risk (&lt;75%)</span>
                <p className="text-sm font-extrabold text-rose-600 dark:text-rose-400">
                  {criticalStudents.length} Students
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Two Column Grid: Subject Performance vs Recent Campus Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject-Wise Pass/Performance */}
        <Card
          title="Subject-Wise Performance Index"
          subtitle="Average score distribution in current term"
          action={
            <Badge variant="primary" size="sm">
              5th Semester CSE
            </Badge>
          }
        >
          <SubjectBarChart data={subjectPerformanceData} />
        </Card>

        {/* Grade Distribution */}
        <Card
          title="Continuous Evaluation Grade Distribution"
          subtitle="Relative grading distribution under NAAC guidelines"
          action={
            <Button
              variant="outline"
              size="xs"
              onClick={() => navigate('/admin/reports')}
              icon={Download}
            >
              Export
            </Button>
          }
        >
          <DistributionBars distribution={gradeDistribution} />
        </Card>
      </div>

      {/* Bottom Grid: Recent Activity Feed & Campus Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <Card
          title="Recent Academic Activity Feed"
          subtitle="Audit log of marks entry, attendance and registrations"
          className="lg:col-span-2"
        >
          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {MOCK_ACTIVITIES.map((act) => (
              <div key={act.id} className="py-3 flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-brand-500 mt-2 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      {act.action}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {act.detail}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-slate-400 shrink-0 ml-4">
                  {act.timestamp}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Active Campus Announcements */}
        <Card
          title="Campus Broadcasts"
          subtitle="Institutional notices"
          action={
            <Button
              variant="ghost"
              size="xs"
              onClick={() => navigate('/admin/announcements')}
            >
              Manage
            </Button>
          }
        >
          <div className="space-y-3">
            {announcements.slice(0, 3).map((ann) => (
              <div
                key={ann.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    {ann.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{ann.date}</span>
                </div>
                <h5 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                  {ann.title}
                </h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {ann.content}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
