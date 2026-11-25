import React, { useState } from 'react';
import { useAcademicData } from '../../context/AcademicDataContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import {
  CalendarCheck,
  Calendar,
  Save,
  CheckCheck,
  Users,
  Search,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Filter
} from 'lucide-react';

export const AttendanceManagementPage = () => {
  const { students, subjects, classes, dailyAttendance, saveDailyAttendance, settings } = useAcademicData();

  const [selectedClass, setSelectedClass] = useState('CSE-5A');
  const [selectedSubject, setSelectedSubject] = useState('SUB-CSE501');
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [savedNotification, setSavedNotification] = useState(false);

  // Filter students for the chosen class
  const classStudents = students.filter(s => s.classId === selectedClass);

  // Check if attendance already recorded for this date & class & subject
  const existingRecord = dailyAttendance.find(
    d => d.date === selectedDate && d.classId === selectedClass && d.subjectId === selectedSubject
  );

  // Local state for daily status map: { [studentId]: 'Present' | 'Absent' | 'Late' }
  const [statusMap, setStatusMap] = useState(() => {
    if (existingRecord?.statusMap) {
      return { ...existingRecord.statusMap };
    }
    const initial = {};
    classStudents.forEach(s => {
      initial[s.id] = 'Present';
    });
    return initial;
  });

  const handleStatusChange = (studentId, status) => {
    setStatusMap(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleMarkAll = (status) => {
    const updated = {};
    classStudents.forEach(s => {
      updated[s.id] = status;
    });
    setStatusMap(updated);
  };

  const handleSaveAttendance = () => {
    saveDailyAttendance(selectedDate, selectedClass, selectedSubject, statusMap);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  // Summary Metrics for this lecture session
  const totalCount = classStudents.length;
  const presentCount = classStudents.filter(s => (statusMap[s.id] || 'Present') === 'Present').length;
  const absentCount = classStudents.filter(s => statusMap[s.id] === 'Absent').length;
  const lateCount = classStudents.filter(s => statusMap[s.id] === 'Late').length;
  const sessionAttendanceRate = totalCount > 0 ? (((presentCount + lateCount) / totalCount) * 100).toFixed(1) : 100;

  // Search filter
  const displayedStudents = classStudents.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const threshold = settings?.attendanceThreshold || 75;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Daily Lecture Attendance Register
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Section 10 • Record classroom presence, monitor threshold compliance, and synchronize with student portals
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="primary"
            size="sm"
            icon={Save}
            onClick={handleSaveAttendance}
            className="shadow-glow"
          >
            Save Session Attendance
          </Button>
        </div>
      </div>

      {savedNotification && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center justify-between animate-slide-up">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Attendance records logged and stored in local storage for {selectedDate}!</span>
          </div>
          <span className="font-mono text-[10px] uppercase bg-emerald-200/50 px-2 py-0.5 rounded">
            Rate: {sessionAttendanceRate}%
          </span>
        </div>
      )}

      {/* Control Selector Bar */}
      <Card padding="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                <option key={c.id} value={c.id}>{c.name}</option>
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
                <option key={s.id} value={s.id}>{s.code} - {s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Lecture Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Search Student
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Name or roll..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Quick Bulk Actions & Summary Pills */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Quick Actions:</span>
            <button
              type="button"
              onClick={() => handleMarkAll('Present')}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 hover:bg-emerald-100 border border-emerald-200 dark:border-emerald-800"
            >
              Mark All Present
            </button>
            <button
              type="button"
              onClick={() => handleMarkAll('Absent')}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-rose-50 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 hover:bg-rose-100 border border-rose-200 dark:border-rose-800"
            >
              Mark All Absent
            </button>
          </div>

          <div className="flex items-center space-x-3 font-semibold text-xs">
            <span className="text-slate-500">Enrolled: {totalCount}</span>
            <span className="text-emerald-600 dark:text-emerald-400">Present: {presentCount}</span>
            <span className="text-amber-600 dark:text-amber-400">Late: {lateCount}</span>
            <span className="text-rose-600 dark:text-rose-400">Absent: {absentCount}</span>
            <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-brand-600 dark:text-brand-400 font-bold">
              Session Rate: {sessionAttendanceRate}%
            </span>
          </div>
        </div>
      </Card>

      {/* Attendance Interactive Register Table */}
      <Card padding="p-0" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">Roll Number</th>
                <th className="py-3.5 px-4">Overall Attendance</th>
                <th className="py-3.5 px-4">Eligibility Status</th>
                <th className="py-3.5 px-4 text-center">Session Status for {selectedDate}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayedStudents.map((s) => {
                const currentStatus = statusMap[s.id] || 'Present';
                const isShortage = (s.attendanceRate || 0) < threshold;

                return (
                  <tr key={s.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{s.name}</p>
                          <p className="text-[11px] text-slate-400">{s.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-700 dark:text-slate-300">
                      {s.rollNumber}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`font-mono font-bold ${isShortage ? 'text-rose-600' : 'text-slate-800 dark:text-slate-200'}`}>
                        {s.attendanceRate}%
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {isShortage ? (
                        <Badge variant="danger" size="sm">
                          Shortage (&lt;{threshold}%)
                        </Badge>
                      ) : (
                        <Badge variant="success" size="sm">
                          Eligible (≥{threshold}%)
                        </Badge>
                      )}
                    </td>

                    {/* Interactive Button Group */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex rounded-lg p-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <button
                          type="button"
                          onClick={() => handleStatusChange(s.id, 'Present')}
                          className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                            currentStatus === 'Present'
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          Present
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(s.id, 'Late')}
                          className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                            currentStatus === 'Late'
                              ? 'bg-amber-500 text-white shadow-sm'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          Late
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(s.id, 'Absent')}
                          className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                            currentStatus === 'Absent'
                              ? 'bg-rose-600 text-white shadow-sm'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          Absent
                        </button>
                      </div>
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

export default AttendanceManagementPage;
