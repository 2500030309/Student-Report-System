import React, { useState } from 'react';
import { useAcademicData } from '../../context/AcademicDataContext';
import StudentReportCard from '../../components/reports/StudentReportCard';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { FileText, Users, Search, Download, Printer } from 'lucide-react';

export const AcademicReports = () => {
  const { students, marks } = useAcademicData();
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || 'STU2024001');
  const [selectedSemester, setSelectedSemester] = useState(5);
  const [searchFilter, setSearchFilter] = useState('');

  const activeStudent = students.find(s => s.id === selectedStudentId) || students[0];

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    s.rollNumber.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Institutional Report Cards & Transcripts
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Official digital transcripts with autonomous grade calculations and credit audit
          </p>
        </div>
      </div>

      {/* Student Picker Bar */}
      <Card padding="p-4" className="no-print">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3 overflow-x-auto pb-2 md:pb-0">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">
              Select Candidate:
            </span>
            <div className="flex space-x-2">
              {students.slice(0, 6).map((stu) => (
                <button
                  key={stu.id}
                  onClick={() => setSelectedStudentId(stu.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                    selectedStudentId === stu.id
                      ? 'bg-brand-600 text-white shadow-glow'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {stu.name.split(' ')[0]} ({stu.rollNumber.slice(-3)})
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-500">Semester:</span>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(Number(e.target.value))}
              className="px-3 py-1.5 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option value={5}>Semester 5 (Current)</option>
              <option value={4}>Semester 4</option>
              <option value={3}>Semester 3</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Render the full authentic Report Card */}
      {activeStudent && (
        <StudentReportCard
          student={activeStudent}
          marksList={marks}
          semester={selectedSemester}
        />
      )}
    </div>
  );
};

export default AcademicReports;
