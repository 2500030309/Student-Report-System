import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAcademicData } from '../../context/AcademicDataContext';
import { useAuth } from '../../context/AuthContext';
import StatsCard from '../../components/common/StatsCard';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import {
  PerformanceTrendChart,
  AttendanceGauge,
  SubjectBarChart
} from '../../components/common/SimpleCharts';
import {
  GraduationCap,
  CalendarCheck,
  Award,
  BookOpen,
  FileText,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  MessageSquare
} from 'lucide-react';

export const StudentDashboard = () => {
  const { students, marks, subjects, announcements, settings } = useAcademicData();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Find active student record (or logged-in newly registered student)
  const currentStudent = students.find(
    s => (currentUser?.id && s.id === currentUser.id) || 
         (currentUser?.email && s.email && s.email.toLowerCase() === currentUser.email.toLowerCase())
  ) || {
    id: currentUser?.id || 'STU_CURRENT',
    name: currentUser?.name || 'Student',
    rollNumber: currentUser?.rollNumber || '22CSE099',
    className: currentUser?.className || 'B.Tech CSE - Sem 5A',
    department: currentUser?.department || 'Computer Science & Engineering',
    semester: currentUser?.semester || 5,
    cgpa: currentUser?.cgpa || 8.5,
    attendanceRate: currentUser?.attendanceRate || 90.0,
    avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    status: 'Active'
  };
  const myMarks = marks.filter(m => m.studentId === currentStudent.id);

  // Subject attendance breakdown
  const subjectAttendance = [
    { code: 'CS501', name: 'Design & Analysis of Algorithms', attended: 40, total: 45, pct: 88.9 },
    { code: 'CS502', name: 'Database Management Systems', attended: 38, total: 42, pct: 90.5 },
    { code: 'CS503', name: 'Computer Networks & Security', attended: 33, total: 38, pct: 86.8 },
    { code: 'CS504', name: 'Theory of Computation', attended: 30, total: 36, pct: 83.3 },
    { code: 'CS505', name: 'Full-Stack Web Engineering', attended: 37, total: 40, pct: 92.5 },
    { code: 'CS506P', name: 'DBMS & Algorithms Lab', attended: 26, total: 28, pct: 92.8 }
  ];

  // Semester progression
  const progressionData = [
    { label: 'Sem 1', value: 8.42 },
    { label: 'Sem 2', value: 8.55 },
    { label: 'Sem 3', value: 8.70 },
    { label: 'Sem 4', value: 8.82 },
    { label: 'Sem 5 (Curr)', value: currentStudent.cgpa || 8.64 }
  ];

  // Upcoming examinations
  const upcomingExams = [
    { date: '12 Dec 2024', subject: 'Design & Analysis of Algorithms', code: 'CS501', time: '10:00 AM - 01:00 PM', venue: 'Exam Hall 3' },
    { date: '15 Dec 2024', subject: 'Database Management Systems', code: 'CS502', time: '10:00 AM - 01:00 PM', venue: 'Exam Hall 3' },
    { date: '18 Dec 2024', subject: 'Computer Networks & Security', code: 'CS503', time: '10:00 AM - 01:00 PM', venue: 'Exam Hall 4' }
  ];

  return (
    <div className="space-y-6">
      {/* Student Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <img
              src={currentStudent.avatar}
              alt={currentStudent.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand-400 shadow-md shrink-0"
            />
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-brand-200 text-xs font-semibold mb-1">
                <Sparkles className="w-3 h-3 text-brand-300" />
                <span>Roll: {currentStudent.rollNumber} • {currentStudent.className || 'B.Tech CSE 5A'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Welcome back, {currentStudent.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-normal mt-0.5">
                Semester 5 • CGPA: <strong className="text-brand-300">{currentStudent.cgpa}</strong> • Exam Eligibility: <strong className="text-emerald-400">Approved</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Button
              variant="primary"
              size="sm"
              icon={FileText}
              onClick={() => navigate('/student/reports')}
              className="shadow-glow"
            >
              Print Report Card
            </Button>
            <Button
              variant="secondary"
              size="sm"
              icon={Award}
              onClick={() => navigate('/student/results')}
              className="bg-white/15 text-white hover:bg-white/25 border-white/20"
            >
              View Results
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Cumulative CGPA"
          value={currentStudent.cgpa || '8.64'}
          subtitle="Top 5% in Cohort"
          icon={Award}
          color="indigo"
          trend={{ value: "+0.18 vs Sem 4", positive: true }}
          onClick={() => navigate('/student/progress')}
        />
        <StatsCard
          title="Attendance Rate"
          value={`${currentStudent.attendanceRate}%`}
          subtitle="Cleared for Exams (≥75%)"
          icon={CalendarCheck}
          color="emerald"
          trend={{ value: "Compliant", positive: true }}
          onClick={() => navigate('/student/attendance')}
        />
        <StatsCard
          title="Current Semester"
          value={`Semester ${currentStudent.semester}`}
          subtitle="6 Registered Subjects"
          icon={BookOpen}
          color="purple"
          onClick={() => navigate('/student/subjects')}
        />
        <StatsCard
          title="Total Credits Earned"
          value="109 Credits"
          subtitle="On track for B.Tech Hons."
          icon={GraduationCap}
          color="sky"
        />
      </div>

      {/* Attendance & Progression Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card
          title="My Academic Progression"
          subtitle="SGPA trend across semesters"
          className="lg:col-span-2"
          action={
            <Button
              variant="ghost"
              size="xs"
              onClick={() => navigate('/student/progress')}
              icon={ArrowRight}
              iconPosition="right"
            >
              Full Details
            </Button>
          }
        >
          <PerformanceTrendChart data={progressionData} height={220} />
        </Card>

        {/* Attendance Compliance Gauge */}
        <Card
          title="Attendance Compliance"
          subtitle="Minimum 75% exam gate"
          className="flex flex-col justify-between"
        >
          <div className="py-2 flex flex-col items-center">
            <AttendanceGauge
              percentage={currentStudent.attendanceRate || 88.5}
              size={170}
              threshold={settings?.attendanceThreshold || 75}
            />
            <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-4">
              Your overall attendance is <strong>{currentStudent.attendanceRate}%</strong>. You are fully eligible for semester end examination hall ticket.
            </p>
          </div>
        </Card>
      </div>

      {/* Subject-Wise Attendance Breakdown Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Subject-Wise Attendance Breakdown
          </h3>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => navigate('/student/attendance')}
            icon={ArrowRight}
            iconPosition="right"
          >
            Detailed Log
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjectAttendance.map((sub) => (
            <div
              key={sub.code}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="primary" size="sm" className="font-mono">
                    {sub.code}
                  </Badge>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1 line-clamp-1">
                    {sub.name}
                  </h4>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {sub.pct}%
                </span>
              </div>

              <div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-brand-600 h-2 rounded-full transition-all"
                    style={{ width: `${sub.pct}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>Attended: {sub.attended}/{sub.total} classes</span>
                  <span>Min: 75%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Grid: Upcoming Exams vs Faculty Remarks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Examinations */}
        <Card
          title="Upcoming End-Semester Examinations"
          subtitle="Timetable & Examination Centers"
        >
          <div className="space-y-3">
            {upcomingExams.map((exam, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-100 dark:bg-brand-950 text-brand-600 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                      {exam.subject} ({exam.code})
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {exam.time} • {exam.venue}
                    </p>
                  </div>
                </div>
                <Badge variant="primary" size="sm">
                  {exam.date}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Faculty Remarks & Observation */}
        <Card
          title="Faculty Mentorship & Advisory"
          subtitle="Continuous assessment feedback from instructors"
        >
          <div className="p-4 rounded-2xl bg-brand-50/60 dark:bg-brand-950/40 border border-brand-200/60 dark:border-brand-900/40 space-y-3">
            <div className="flex items-center space-x-2 text-brand-700 dark:text-brand-300 font-semibold text-xs">
              <MessageSquare className="w-4 h-4" />
              <span>Mentor Evaluation • Prof. Sneha Sen</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
              "{currentStudent.facultyRemarks || 'Consistent performer with sharp analytical skills in Algorithms and DBMS. Proactively participates in technical discussions.'}"
            </p>
            <div className="pt-2 border-t border-brand-200/40 text-[11px] text-slate-400 flex justify-between">
              <span>Date: 15-Nov-2024</span>
              <span>Status: Verified</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
