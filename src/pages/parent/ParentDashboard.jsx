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
  AttendanceGauge
} from '../../components/common/SimpleCharts';
import {
  HeartHandshake,
  Award,
  CalendarCheck,
  FileText,
  Printer,
  Sparkles,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Phone
} from 'lucide-react';
import { MOCK_ATTENDANCE_SUMMARY } from '../../data/mockData';

export const ParentDashboard = () => {
  const { students, marks, announcements } = useAcademicData();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Associated child is Rohan Sharma
  const child = students.find(s => s.id === 'STU2024001') || students[0];
  const childMarks = marks.filter(m => m.studentId === child.id);

  const progressionData = [
    { label: 'Sem 1', value: 8.42 },
    { label: 'Sem 2', value: 8.55 },
    { label: 'Sem 3', value: 8.70 },
    { label: 'Sem 4', value: 8.82 },
    { label: 'Sem 5', value: child.cgpa }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
              <HeartHandshake className="w-9 h-9 text-brand-300" />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-brand-200 text-xs font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-brand-300" />
                <span>Parent & Guardian Academic Portal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome, {currentUser?.name || 'Mr. Ramesh Sharma'}
              </h1>
              <p className="text-xs text-slate-300 mt-0.5 font-normal">
                Monitoring academic progression for ward: <strong className="text-white">{child.name}</strong> ({child.rollNumber})
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Button
              variant="primary"
              size="sm"
              icon={Printer}
              onClick={() => navigate('/parent/reports')}
              className="shadow-glow"
            >
              Download Progress Report
            </Button>
          </div>
        </div>
      </div>

      {/* Ward Snapshot Card */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <img
            src={child.avatar}
            alt={child.name}
            className="w-12 h-12 rounded-2xl object-cover ring-2 ring-brand-500/20 shrink-0"
          />
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {child.name} • {child.rollNumber}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {child.program || 'B.Tech CSE'} • Semester {child.semester} • Section {child.classId}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Badge variant="success" size="md">
            Academic Standing: Good
          </Badge>
          <Badge variant="primary" size="md">
            Verified Ward
          </Badge>
        </div>
      </div>

      {/* Key Academic Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Cumulative CGPA"
          value={child.cgpa}
          subtitle="Out of 10.0 scale"
          icon={Award}
          color="indigo"
          trend={{ value: "Grade: Distinction", positive: true }}
          onClick={() => navigate('/parent/results')}
        />
        <StatsCard
          title="Attendance Compliance"
          value={`${child.attendanceRate}%`}
          subtitle="Min threshold: 75%"
          icon={CalendarCheck}
          color={child.attendanceRate >= 75 ? 'emerald' : 'rose'}
          trend={{ value: "Exam Eligible", positive: true }}
          onClick={() => navigate('/parent/attendance')}
        />
        <StatsCard
          title="Class Teacher"
          value="Prof. Sneha Sen"
          subtitle="Dept. of CSE"
          icon={HeartHandshake}
          color="sky"
        />
        <StatsCard
          title="Parent-Teacher Meet"
          value="30 Nov 2024"
          subtitle="Hybrid mode meeting"
          icon={CalendarCheck}
          color="amber"
        />
      </div>

      {/* Progress Chart & Attendance Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card
          title="Longitudinal Academic Performance"
          subtitle="Ward's SGPA across all 5 semesters"
          className="lg:col-span-2"
        >
          <PerformanceTrendChart data={progressionData} height={230} />
        </Card>

        <Card
          title="Attendance Health"
          subtitle="Semester 5 Compliance"
          className="flex flex-col justify-between"
        >
          <div className="py-2 flex flex-col items-center">
            <AttendanceGauge percentage={child.attendanceRate} size={170} threshold={75} />
            <div className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center w-full">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                Attendance Shortage: None
              </span>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                Eligible for end-semester assessments without condonation fees.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Teacher Remarks & Subject Marks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mentor Remarks */}
        <Card
          title="Faculty Academic Observation"
          subtitle="Submitted by Class Incharge & Mentors"
          action={
            <Badge variant="primary" size="sm">
              Current Evaluation
            </Badge>
          }
        >
          <div className="p-4 rounded-2xl bg-brand-50/70 dark:bg-brand-950/50 border border-brand-200/60 dark:border-brand-900/60 space-y-2">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-brand-600" />
              <span className="font-bold text-xs text-brand-900 dark:text-brand-200">
                Prof. Sneha Sen (Class Incharge)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
              "{child.facultyRemarks || 'Consistent performer with sharp analytical skills in Algorithms and DBMS. Proactively participates in technical discussions.'}"
            </p>
            <p className="text-[10px] text-slate-400 font-mono pt-1">
              Recorded on: {child.remarksDate || '15-Nov-2024'}
            </p>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between text-xs">
            <span className="text-slate-500">Need to speak with faculty mentor?</span>
            <Button
              variant="outline"
              size="xs"
              icon={Phone}
              onClick={() => alert('Faculty Mentor Phone: +91 98450 67890 (Office Hours: 3 PM - 5 PM)')}
            >
              Mentor Contact
            </Button>
          </div>
        </Card>

        {/* Current Subject Marks */}
        <Card
          title="Semester 5 Performance Snapshot"
          subtitle="Evaluation across 6 registered subjects"
          action={
            <Button
              variant="ghost"
              size="xs"
              onClick={() => navigate('/parent/results')}
            >
              View Full Marks
            </Button>
          }
        >
          <div className="space-y-2.5">
            {childMarks.slice(0, 5).map((m) => (
              <div
                key={m.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-white">
                    {m.subjectName}
                  </h5>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {m.subjectCode} • {m.credits} Credits
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-brand-600 dark:text-brand-400 block">
                    {m.totalPercentage}%
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 uppercase">
                    Grade {m.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ParentDashboard;
