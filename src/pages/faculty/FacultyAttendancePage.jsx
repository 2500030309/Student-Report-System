import React, { useState } from 'react';
import { useAcademicData } from '../../context/AcademicDataContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import {
  CalendarCheck,
  Save,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  CheckCheck,
  Calendar,
  AlertCircle
} from 'lucide-react';

export const FacultyAttendancePage = () => {
  const { students, subjects, classes, dailyAttendance, saveDailyAttendance, settings } = useAcademicData();

  const [selectedClass, setSelectedClass] = useState('CSE-5A');
  const [selectedSubject, setSelectedSubject] = useState('SUB-CSE501');
  const [selectedDate, setSelectedDate] = useState('2024-11-25');
  const [searchTerm, setSearchTerm] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Filter students belonging to selected class
  const classStudents = students.filter(s => s.classId === selectedClass);

  // Initialize status map from storage or default to "Present"
  const existingRecord = dailyAttendance.find(
    d => d.date === selectedDate && d.classId === selectedClass && d.subjectId === selectedSubject
  );

  const [statusMap, setStatusMap] = useState(() => {
    if (existingRecord?.statusMap) return existingRecord.statusMap;
    const initial = {};
    classStudents.forEach(s => { initial[s.id] = 'Present'; });
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

  const handleSave = () => {
    saveDailyAttendance(selectedDate, selectedClass, selectedSubject, statusMap);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Metrics
  const presentCount = Object.values(statusMap).filter(v => v === 'Present').length;
  const absentCount = Object.values(statusMap).filter(v => v === 'Absent').length;
  const lateCount = Object.values(statusMap).filter(v => v === 'Late').length;
  const attendanceRate = classStudents.length > 0
    ? Math.round(((presentCount + (lateCount * 0.5)) / classStudents.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Class Attendance Register
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Section 10 • Daily lecture roll call, status toggles, and attendance threshold compliance
          </p>
        </div>

        <div className="flex items-center space-x-3">
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

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between animate-slide-up">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">
              Attendance records for {selectedClass} successfully saved into Local Storage!
            </span>
          </div>
          <span className="text-[10px] font-mono uppercase bg-emerald-200/50 dark:bg-emerald-900/60 px-2 py-0.5 rounded">
            Sync: Persistent
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
                <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
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
        </div>

        {/* Live Counters */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Session Rate: <strong className="text-brand-600 font-mono text-sm">{attendanceRate}%</strong>
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-emerald-600 font-medium">{presentCount} Present</span>
            <span className="text-rose-600 font-medium">{absentCount} Absent</span>
            <span className="text-amber-600 font-medium">{lateCount} Late</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleMarkAll('Present')}
              className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 border border-emerald-200 dark:border-emerald-800 flex items-center space-x-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark All Present</span>
            </button>
            <button
              onClick={() => handleMarkAll('Absent')}
              className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 hover:bg-rose-100 border border-rose-200 dark:border-rose-800"
            >
              Clear All
            </button>
          </div>
        </div>
      </Card>

      {/* Attendance Roster Table */}
      <Card padding="p-0" className="overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="relative max-w-xs w-full">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search student in this class..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <span className="text-xs text-slate-400">
            Total Students in {selectedClass}: <strong>{classStudents.length}</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Roll Number</th>
                <th className="py-3 px-4">Cumulative %</th>
                <th className="py-3 px-4">Status Flag</th>
                <th className="py-3 px-4 text-center">Mark Attendance</th>
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
                  const isShortage = (student.attendanceRate || 0) < (settings?.attendanceThreshold || 75);

                  return (
                    <tr key={student.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-8 h-8 rounded-full object-cover shrink-0"
                          />
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block">
                              {student.name}
                            </span>
                            <span className="text-[11px] text-slate-400 block">
                              {student.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-mono font-semibold text-slate-700 dark:text-slate-300">
                        {student.rollNumber}
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <span className={`font-mono font-bold ${isShortage ? 'text-rose-600' : 'text-slate-800 dark:text-slate-200'}`}>
                            {student.attendanceRate}%
                          </span>
                          {isShortage && (
                            <Badge variant="danger" size="sm">
                              Alert &lt; 75%
                            </Badge>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            currentStatus === 'Present'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : currentStatus === 'Absent'
                              ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          }`}
                        >
                          {currentStatus}
                        </span>
                      </td>

                      {/* Status Toggle Buttons */}
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex rounded-xl p-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                          <button
                            onClick={() => handleStatusChange(student.id, 'Present')}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              currentStatus === 'Present'
                                ? 'bg-emerald-500 text-white shadow-sm'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                            }`}
                          >
                            P
                          </button>
                          <button
                            onClick={() => handleStatusChange(student.id, 'Absent')}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              currentStatus === 'Absent'
                                ? 'bg-rose-500 text-white shadow-sm'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                            }`}
                          >
                            A
                          </button>
                          <button
                            onClick={() => handleStatusChange(student.id, 'Late')}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              currentStatus === 'Late'
                                ? 'bg-amber-500 text-white shadow-sm'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                            }`}
                          >
                            L
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

export default FacultyAttendancePage;
