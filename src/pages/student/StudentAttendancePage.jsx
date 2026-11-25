import React from 'react';
import { useAcademicData } from '../../context/AcademicDataContext';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { AttendanceGauge } from '../../components/common/SimpleCharts';
import { CalendarCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { MOCK_ATTENDANCE_SUMMARY } from '../../data/mockData';

export const StudentAttendancePage = () => {
  const { students, settings } = useAcademicData();
  const { currentUser } = useAuth();

  const currentStudent = students.find(s => s.id === currentUser?.id || s.email === currentUser?.email) || students[0];
  const threshold = settings?.attendanceThreshold || 75;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          My Attendance Records
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Detailed lecture-by-lecture presence audit and institutional eligibility criteria
        </p>
      </div>

      {/* Top Health Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="flex flex-col items-center justify-center p-6">
          <AttendanceGauge percentage={currentStudent.attendanceRate} size={180} threshold={threshold} />
          <span className="text-xs font-semibold text-slate-500 mt-2">
            Overall Attendance Health
          </span>
        </Card>

        <Card className="lg:col-span-2 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Examination Hall Ticket Eligibility Status: Approved
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Your overall attendance is <strong>{currentStudent.attendanceRate}%</strong>, which is comfortably above the university mandatory threshold of <strong>{threshold}%</strong>. No condonation application or medical certificates required.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Classes</span>
              <p className="font-mono font-extrabold text-base mt-0.5 text-slate-900 dark:text-white">229</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
              <span className="text-[10px] uppercase font-bold text-slate-400">Attended</span>
              <p className="font-mono font-extrabold text-base mt-0.5 text-emerald-600">204</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
              <span className="text-[10px] uppercase font-bold text-slate-400">Permitted Leave</span>
              <p className="font-mono font-extrabold text-base mt-0.5 text-slate-900 dark:text-white">25</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Subject-Wise Table */}
      <Card padding="p-0" className="overflow-hidden">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Subject-Wise Attendance Breakdown
          </h4>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Subject Title</th>
                <th className="py-3 px-4">Course Code</th>
                <th className="py-3 px-4">Instructor</th>
                <th className="py-3 px-4 text-center">Attended / Total</th>
                <th className="py-3 px-4 text-center">Percentage</th>
                <th className="py-3 px-4 text-right">Standing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {MOCK_ATTENDANCE_SUMMARY.map((att) => (
                <tr key={att.subjectId} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    {att.subjectName}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-500">
                    {att.subjectCode}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                    {att.faculty}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-semibold">
                    {att.attendedClasses} / {att.totalClasses}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-emerald-600">
                    {att.percentage}%
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Badge variant="success" size="sm">
                      Eligible
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default StudentAttendancePage;
