import React, { useState } from 'react';
import { useAcademicData } from '../../context/AcademicDataContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import {
  CalendarCheck,
  Check,
  X,
  Clock,
  Save,
  CheckCircle2,
  Users,
  Search,
  Filter
} from 'lucide-react';

export const AttendanceManagement = () => {
  const { students, subjects, classes, saveDailyAttendance, settings } = useAcademicData();

  const [selectedClass, setSelectedClass] = useState('CSE-5A');
  const [selectedSubject, setSelectedSubject] = useState('SUB-CSE501');
  const [selectedDate, setSelectedDate] = useState('2024-11-25');
  const [searchTerm, setSearchTerm] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Status map for candidates on this day
  const [statusMap, setStatusMap] = useState({
    'STU2024001': 'Present',
    'STU2024002': 'Present',
    'STU2024003': 'Present',
    'STU2024004': 'Absent', // Low attendance student
    'STU2024005': 'Present',
    'STU2024006': 'Present',
    'STU2024007': 'Present',
    'STU2024008': 'Late'
  });

  const classStudents = students.filter(s => s.classId === selectedClass || selectedClass === 'CSE-5A');

  const handleStatusChange = (studentId, status) => {
    setStatusMap(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const markAllPresent = () => {
    const updated = {};
    classStudents.forEach(s => {
      updated[s.id] = 'Present';
    });
    setStatusMap(updated);
  };

  const handleSave = () => {
    saveDailyAttendance(selectedDate, selectedClass, selectedSubject, statusMap);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // Calculations for today's roster
  const presentCount = Object.values(statusMap).filter(v => v === 'Present').length;
  const absentCount = Object.values(statusMap).filter(v => v === 'Absent').length;
  const lateCount = Object.values(statusMap).filter(v => v === 'Late').length;
  const total = classStudents.length || 1;
  const todayPercentage = Math.round(((presentCount + lateCount) / total) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Class Attendance Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Section 10 • Record, edit, and track daily session attendance with minimum threshold validation
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={markAllPresent}
          >
            Mark All Present
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Save}
            onClick={handleSave}
            className="shadow-glow"
          >
            Save Attendance
          </Button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between animate-slide-up">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">
              Attendance log successfully saved to Local Storage for {selectedDate}!
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase bg-emerald-200/50 dark:bg-emerald-900/60 px-2 py-0.5 rounded">
            Saved
          </span>
        </div>
      )}

      {/* Selectors Bar */}
      <Card padding="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Class Section
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              {classes.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.id})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              {subjects.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
        </div>
      </Card>

      {/* Today's Metrics Summary Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Enrolled</span>
          <p className="text-xl font-extrabold text-slate-900 dark:text-white font-mono mt-1">
            {classStudents.length} Students
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-emerald-600">Present</span>
          <p className="text-xl font-extrabold text-emerald-600 font-mono mt-1">
            {presentCount} Students
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-rose-600">Absent</span>
          <p className="text-xl font-extrabold text-rose-600 font-mono mt-1">
            {absentCount} Students
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-amber-600">Late / Excused</span>
          <p className="text-xl font-extrabold text-amber-600 font-mono mt-1">
            {lateCount} Students
          </p>
        </div>
      </div>

      {/* Attendance Sheet Table */}
      <Card padding="p-0" className="overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="relative max-w-xs w-full">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter student..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="text-xs text-slate-400">
            Session Compliance: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{todayPercentage}%</strong>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Roll Number</th>
                <th className="py-3 px-4">Cumulative Attendance</th>
                <th className="py-3 px-4 text-center">Status for {selectedDate}</th>
                <th className="py-3 px-4 text-right">Eligibility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {classStudents
                .filter(s =>
                  s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((student) => {
                  const currentStatus = statusMap[student.id] || 'Present';
                  const isLow = (student.attendanceRate || 0) < (settings?.attendanceThreshold || 75);

                  return (
                    <tr key={student.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2.5">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-7 h-7 rounded-full object-cover shrink-0"
                          />
                          <span className="font-bold text-slate-900 dark:text-white">
                            {student.name}
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-mono font-semibold text-slate-600 dark:text-slate-300">
                        {student.rollNumber}
                      </td>

                      <td className="py-3 px-4 font-mono font-bold">
                        <span className={isLow ? 'text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-300'}>
                          {student.attendanceRate}%
                        </span>
                      </td>

                      {/* Status Buttons */}
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex rounded-xl p-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-x-1">
                          <button
                            type="button"
                            onClick={() => handleStatusChange(student.id, 'Present')}
                            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                              currentStatus === 'Present'
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                            }`}
                          >
                            Present
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(student.id, 'Absent')}
                            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                              currentStatus === 'Absent'
                                ? 'bg-rose-600 text-white shadow-sm'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                            }`}
                          >
                            Absent
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(student.id, 'Late')}
                            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                              currentStatus === 'Late'
                                ? 'bg-amber-600 text-white shadow-sm'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                            }`}
                          >
                            Late
                          </button>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-right">
                        {isLow ? (
                          <Badge variant="danger" size="sm">
                            Shortage Alert (&lt;75%)
                          </Badge>
                        ) : (
                          <Badge variant="success" size="sm">
                            Exam Eligible
                          </Badge>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AttendanceManagement;
