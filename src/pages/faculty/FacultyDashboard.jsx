import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAcademicData } from '../../context/AcademicDataContext';
import { useAuth } from '../../context/AuthContext';
import StatsCard from '../../components/common/StatsCard';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import {
  CalendarCheck,
  Award,
  Users,
  BookOpen,
  Clock,
  AlertTriangle,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const FacultyDashboard = () => {
  const { students, subjects, classes, settings } = useAcademicData();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Faculty specific metrics
  const assignedSubjects = subjects.filter(s => s.facultyId === 'FAC001');
  const myStudentsCount = 42;

  // Students needing attention (<75% attendance)
  const studentsNeedingAttention = students.filter(
    s => (s.attendanceRate || 0) < (settings?.attendanceThreshold || 75)
  );

  // Today's classes schedule
  const todayClasses = [
    { time: '09:30 AM - 10:30 AM', subject: 'Design & Analysis of Algorithms (CS501)', class: 'CSE-5A', room: 'Room 302', status: 'Completed' },
    { time: '11:00 AM - 12:00 PM', subject: 'Computer Networks & Security (CS503)', class: 'CSE-5A', room: 'Room 302', status: 'Next Up' },
    { time: '02:00 PM - 04:00 PM', subject: 'DBMS & Algorithms Lab (CS506P)', class: 'CSE-5A', room: 'Lab 4', status: 'Scheduled' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-brand-200 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-300" />
              <span>Department of Computer Science & Engineering</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Good morning, {currentUser?.name || 'Prof. Sneha Sen'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl font-normal">
              Class Incharge for B.Tech CSE Section 5A • You have 2 lecture sessions and 1 laboratory practical scheduled today.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Button
              variant="primary"
              size="sm"
              icon={CalendarCheck}
              onClick={() => navigate('/faculty/attendance')}
              className="shadow-glow"
            >
              Mark Today's Attendance
            </Button>
            <Button
              variant="secondary"
              size="sm"
              icon={Award}
              onClick={() => navigate('/faculty/marks')}
              className="bg-white/15 text-white hover:bg-white/25 border-white/20"
            >
              Enter Marks
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Assigned Subjects"
          value={assignedSubjects.length || 2}
          subtitle="Algorithms & Networks"
          icon={BookOpen}
          color="indigo"
          onClick={() => navigate('/faculty/marks')}
        />
        <StatsCard
          title="My Students (CSE-5A)"
          value={myStudentsCount}
          subtitle="42 Enrolled Candidates"
          icon={Users}
          color="purple"
          onClick={() => navigate('/faculty/students')}
        />
        <StatsCard
          title="Today's Sessions"
          value="3 Lectures"
          subtitle="2 Theory + 1 Practical"
          icon={Clock}
          color="sky"
        />
        <StatsCard
          title="Class Attendance Rate"
          value="88.5%"
          subtitle="Class Section 5A Average"
          icon={CalendarCheck}
          color="emerald"
          trend={{ value: "Healthy", positive: true }}
          onClick={() => navigate('/faculty/attendance')}
        />
      </div>

      {/* Today's Schedule & Requiring Attention Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Lecture Schedule */}
        <Card
          title="Today's Lecture Schedule"
          subtitle="Fall Semester 2024 • Timetable"
          className="lg:col-span-2"
          action={
            <Badge variant="primary" size="sm">
              Today: 25-Nov-2024
            </Badge>
          }
        >
          <div className="space-y-3">
            {todayClasses.map((cls, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-300 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {cls.subject}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {cls.class} • {cls.room} • {cls.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-end sm:self-center">
                  <Badge
                    variant={
                      cls.status === 'Completed'
                        ? 'success'
                        : cls.status === 'Next Up'
                        ? 'primary'
                        : 'default'
                    }
                    size="sm"
                  >
                    {cls.status}
                  </Badge>
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => navigate('/faculty/attendance')}
                  >
                    Attendance
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Students Requiring Academic Attention */}
        <Card
          title="Students Requiring Attention"
          subtitle="Attendance & Academic Shortage"
          action={
            <Badge variant="danger" size="sm">
              {studentsNeedingAttention.length} Alert
            </Badge>
          }
        >
          <div className="space-y-3">
            {studentsNeedingAttention.map((student) => (
              <div
                key={student.id}
                className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/40 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">
                    {student.name}
                  </span>
                  <span className="font-mono text-xs font-bold text-rose-600 dark:text-rose-400">
                    {student.attendanceRate}% Att.
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  {student.rollNumber} • Attendance below 75% threshold. Needs remediation before end-semester exam.
                </p>
                <div className="flex justify-end pt-1">
                  <Button
                    variant="danger"
                    size="xs"
                    onClick={() => navigate('/faculty/remarks')}
                  >
                    Add Remark
                  </Button>
                </div>
              </div>
            ))}

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs text-slate-500">
              <p className="font-semibold text-slate-700 dark:text-slate-300">Mid-Term Assessment 2 Status:</p>
              <p className="mt-1">All theory marks for Algorithms (CS501) submitted. Lab evaluation pending.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FacultyDashboard;
