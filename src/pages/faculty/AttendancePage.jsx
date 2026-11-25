import React, { useState, useEffect } from 'react';
import { useAcademicData } from '../../context/AcademicDataContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Save,
  Search,
  Filter,
  Users,
  AlertTriangle,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const AttendancePage = () => {
  const { students, subjects, classes, settings, saveDailyAttendance } = useAcademicData();

  // Selectors
  const [selectedClass, setSelectedClass] = useState('CSE-5A');
  const [selectedSubject, setSelectedSubject] = useState('SUB-CSE501');
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Status mapping: { studentId: 'Present' | 'Absent' | 'Late' }
  const [statusMap, setStatusMap] = useState({});

  // Filter students by selected class
  const classStudents = students.filter(s => s.classId === selectedClass);

  // Initialize statusMap with 'Present' by default whenever class changes
  useEffect(() => {
    const initial = {};
    classStudents.forEach(s => {
      // Default initial status
      initial[s.id] = (s.rollNumber === '22CSE045') ? 'Absent' : 'Present';
    });
    setStatusMap(initial);
  }, [selectedClass, students]);

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
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Summary counts
  const total = classStudents.length;
  const presentCount = Object.values(statusMap).filter(v => v === 'Present').length;
  const absentCount = Object.values(statusMap).filter(v => v === 'Absent').length;
  const lateCount = Object.values(statusMap).filter(v => v === 'Late').length;
  const todayPercentage = total > 0 ? (((presentCount + lateCount * 0.5) / total) * 100).toFixed(1) : 0;

  // Filtered by search
  const displayedStudents = classStudents.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Daily Student Attendance Log
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Section 10 • Record classroom roll call, mark leaves, and sync with institutional database
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
            Save Attendance
          </Button>
        </div>
      </div>

      {/* Save Success Banner */}
      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between animate-slide-up">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">
              Attendance records for {selectedClass} on {selectedDate} saved successfully to Local Storage!
            </span>
          </div>
          <span className="text-[10px] font-mono uppercase bg-emerald-200/50 dark:bg-emerald-900/60 px-2 py-0.5 rounded">
            Persisted
          </span>
        </div>
      )}

      {/* Selector Filters Bar */}
      <Card padding="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Class Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Target Class & Section
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {classes.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.id})
                </option>
              ))}
            </select>
          </div>

          {/* Subject Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Course / Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {subjects.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>

          {/* Date Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Attendance Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>
      </Card>

      {/* Summary KPI Badges Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle text-center">
          <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Total Enrolled</span>
          <p className="text-xl font-extrabold text-slate-900 dark:text-white font-mono mt-0.5">{total}</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/60 shadow-subtle text-center">
          <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">Present</span>
          <p className="text-xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono mt-0.5">{presentCount}</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/60 shadow-subtle text-center">
          <span className="text-[10px] font-bold uppercase text-rose-600 dark:text-rose-400 tracking-wider">Absent</span>
          <p className="text-xl font-extrabold text-rose-700 dark:text-rose-300 font-mono mt-0.5">{absentCount}</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/60 shadow-subtle text-center">
          <span className="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400 tracking-wider">Late / Excused</span>
          <p className="text-xl font-extrabold text-amber-700 dark:text-amber-300 font-mono mt-0.5">{lateCount}</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200/60 dark:border-brand-900/60 shadow-subtle text-center col-span-2 sm:col-span-1">
          <span className="text-[10px] font-bold uppercase text-brand-600 dark:text-brand-400 tracking-wider">Today's Rate</span>
          <p className="text-xl font-extrabold text-brand-700 dark:text-brand-300 font-mono mt-0.5">{todayPercentage}%</p>
        </div>
      </div>

      {/* Action Bar & Student Table */}
      <Card padding="p-0" className="overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative max-w-xs w-full">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by student name or roll..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-semibold text-slate-400">Quick Fill:</span>
            <button
              onClick={() => handleMarkAll('Present')}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 transition-colors"
            >
              All Present
            </button>
            <button
              onClick={() => handleMarkAll('Absent')}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-rose-100 text-rose-800 hover:bg-rose-200 dark:bg-rose-950 dark:text-rose-300 transition-colors"
            >
              All Absent
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Roll Number</th>
                <th className="py-3 px-4">Overall Attendance</th>
                <th className="py-3 px-4">Eligibility Status</th>
                <th className="py-3 px-4 text-center">Mark Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayedStudents.map((student) => {
                const currentStatus = statusMap[student.id] || 'Present';
                const isBelowThreshold = (student.attendanceRate || 0) < (settings?.attendanceThreshold || 75);

                return (
                  <tr key={student.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                        />
                        <span className="font-bold text-slate-900 dark:text-white">
                          {student.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono font-semibold text-slate-600 dark:text-slate-300">
                      {student.rollNumber}
                    </td>

                    <td className="py-3 px-4">
                      <span className={`font-mono font-bold ${isBelowThreshold ? 'text-rose-600 dark:text-rose-400' : 'text-slate-800 dark:text-slate-200'}`}>
                        {student.attendanceRate}%
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      {isBelowThreshold ? (
                        <span className="inline-flex items-center text-[11px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-900">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Shortage (&lt;75%)
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Eligible
                        </span>
                      )}
                    </td>

                    {/* Status Toggles */}
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center space-x-1.5">
                        <button
                          onClick={() => handleStatusChange(student.id, 'Present')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            currentStatus === 'Present'
                              ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-500/30'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                          }`}
                        >
                          P
                        </button>
                        <button
                          onClick={() => handleStatusChange(student.id, 'Late')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            currentStatus === 'Late'
                              ? 'bg-amber-500 text-white shadow-sm ring-2 ring-amber-500/30'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                          }`}
                        >
                          L
                        </button>
                        <button
                          onClick={() => handleStatusChange(student.id, 'Absent')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            currentStatus === 'Absent'
                              ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-500/30'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                          }`}
                        >
                          A
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

export default AttendancePage;
