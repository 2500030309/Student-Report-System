import React, { useState } from 'react';
import { useAcademicData } from '../../context/AcademicDataContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { Search, GraduationCap, CalendarCheck, MessageSquare, Eye } from 'lucide-react';
import Modal from '../../components/common/Modal';

export const FacultyStudents = () => {
  const { students } = useAcademicData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const myStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Students (Section CSE-5A)
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            42 Candidates enrolled in Design & Analysis of Algorithms and Computer Networks
          </p>
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search student..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myStudents.map((s) => (
          <Card key={s.id} padding="p-5" hover className="flex flex-col justify-between">
            <div>
              <div className="flex items-start space-x-3.5">
                <img
                  src={s.avatar}
                  alt={s.name}
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-brand-500/20 shrink-0"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {s.name}
                  </h3>
                  <Badge variant="primary" size="sm" className="font-mono mt-0.5">
                    {s.rollNumber}
                  </Badge>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {s.className} • Sem {s.semester}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-[10px] text-slate-400 block font-semibold">Attendance</span>
                  <span className={`font-mono font-bold ${s.attendanceRate < 75 ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {s.attendanceRate}%
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-[10px] text-slate-400 block font-semibold">CGPA</span>
                  <span className="font-mono font-bold text-brand-600 dark:text-brand-400">
                    {s.cgpa}
                  </span>
                </div>
              </div>

              {s.facultyRemarks && (
                <div className="mt-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/30 text-[11px] text-slate-600 dark:text-slate-300 italic line-clamp-2">
                  "{s.facultyRemarks}"
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono">ID: {s.id}</span>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setSelectedStudent(s)}
                icon={Eye}
              >
                View Record
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={`Academic Record: ${selectedStudent.name}`}
          subtitle={`Roll: ${selectedStudent.rollNumber} • ${selectedStudent.department}`}
          maxWidth="max-w-lg"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-2">
              <p><strong className="text-slate-500">Parent / Guardian:</strong> {selectedStudent.parentName || 'Mr. Ramesh Sharma'}</p>
              <p><strong className="text-slate-500">Parent Phone:</strong> {selectedStudent.parentPhone || '+91 98111 22334'}</p>
              <p><strong className="text-slate-500">Current CGPA:</strong> <span className="font-mono font-bold text-brand-600">{selectedStudent.cgpa}</span></p>
              <p><strong className="text-slate-500">Attendance:</strong> <span className="font-mono font-bold">{selectedStudent.attendanceRate}%</span></p>
            </div>

            <div>
              <span className="font-bold text-slate-900 dark:text-white uppercase text-[10px] block mb-1">
                Faculty Observation & Advisory:
              </span>
              <p className="p-3 rounded-xl bg-brand-50/60 dark:bg-brand-950/40 text-slate-700 dark:text-slate-300 italic">
                "{selectedStudent.facultyRemarks || 'Active participation in technical discussions and laboratory tasks.'}"
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="primary" size="sm" onClick={() => setSelectedStudent(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default FacultyStudents;
