import React from 'react';
import { useAcademicData } from '../../context/AcademicDataContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { AttendanceGauge } from '../../components/common/SimpleCharts';
import { MOCK_ATTENDANCE_SUMMARY } from '../../data/mockData';

export const ParentAttendancePage = () => {
  const { students } = useAcademicData();
  const child = students.find(s => s.id === 'STU2024001') || students[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Ward's Attendance Record ({child.name})
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Real-time institutional attendance compliance tracking
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          title="Attendance Gauge"
          subtitle="Mandatory 75% Criteria"
          className="flex flex-col items-center justify-center p-6 text-center"
        >
          <AttendanceGauge percentage={child.attendanceRate} size={170} threshold={75} />
          <Badge variant="success" size="md" className="mt-4">
            Exam Eligible: {child.attendanceRate}%
          </Badge>
        </Card>

        <Card padding="p-6" className="md:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Institutional Attendance Policy
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Your ward maintains an attendance of <strong>{child.attendanceRate}%</strong>, which is well above the mandatory institutional requirement of 75%. No condonation fee or attendance warnings are applicable.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Sessions</span>
              <span className="font-mono font-bold text-base text-slate-900 dark:text-white mt-1 block">229</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Attended</span>
              <span className="font-mono font-bold text-base text-emerald-600 mt-1 block">204</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Leaves Logged</span>
              <span className="font-mono font-bold text-base text-slate-700 dark:text-slate-300 mt-1 block">25</span>
            </div>
          </div>
        </Card>
      </div>

      <Card padding="p-0" className="overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Subject-Wise Attendance Breakdown
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Subject Incharge</th>
                <th className="py-3 px-4">Conducted</th>
                <th className="py-3 px-4">Attended</th>
                <th className="py-3 px-4">Percentage</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {MOCK_ATTENDANCE_SUMMARY.map((sub) => (
                <tr key={sub.subjectId} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 dark:text-white block">{sub.subjectName}</span>
                    <span className="font-mono text-[11px] text-slate-400">{sub.subjectCode}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{sub.faculty}</td>
                  <td className="py-3 px-4 font-mono">{sub.totalClasses}</td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-600">{sub.attendedClasses}</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">{sub.percentage}%</td>
                  <td className="py-3 px-4 text-right">
                    <Badge variant="success" size="sm">Normal</Badge>
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

export default ParentAttendancePage;
