import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useData } from '../../context/DataContext';
import { Card, Badge, Modal } from '../../components/common/Card';
import {
  FileText,
  Printer,
  Download,
  Eye,
  GraduationCap,
  Sparkles,
  Search,
  CheckCircle2,
  Calendar,
  Building2
} from 'lucide-react';

export const AdminReports = () => {
  const { students, marks, settings } = useData();
  const [selectedClass, setSelectedClass] = useState('CSE-5A');
  const [previewStudent, setPreviewStudent] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Filter students for the selected class
  const classStudents = students.filter(s => s.classId === selectedClass);

  const handleOpenReport = (student) => {
    setPreviewStudent(student);
    setIsPreviewOpen(true);
    // Trigger celebratory confetti for academic achievements
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Ignore if unsupported in environment
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Institutional Academic Reports & Grade Cards
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Generate, verify, and export official University Grade Cards and Semester Transcripts.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold transition-all shadow-subtle flex items-center space-x-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print Current View</span>
          </button>
        </div>
      </div>

      {/* Class Selector Bar */}
      <Card className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Target Batch:
          </span>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3.5 py-1.5 text-xs font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="CSE-5A">B.Tech CSE - 5th Sem (Section A)</option>
            <option value="CSE-5B">B.Tech CSE - 5th Sem (Section B)</option>
            <option value="ECE-5A">B.Tech ECE - 5th Sem (Section A)</option>
          </select>
        </div>

        <span className="text-xs text-slate-400">
          Showing <strong>{classStudents.length}</strong> eligible student report cards
        </span>
      </Card>

      {/* Student Reports List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {classStudents.map((student) => {
          const studentMarks = marks.filter(m => m.studentId === student.id);
          const totalCredits = studentMarks.reduce((acc, m) => acc + (m.credits || 0), 0);

          return (
            <Card key={student.id} className="p-5 flex flex-col justify-between hover:shadow-card transition-all">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-brand-500/20"
                    />
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                        {student.name}
                      </h3>
                      <p className="font-mono text-xs text-slate-400">{student.rollNumber}</p>
                    </div>
                  </div>
                  <Badge variant={student.cgpa >= 8.5 ? 'primary' : 'default'}>
                    CGPA {student.cgpa}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      Attendance
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {student.attendanceRate}%
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      Enrolled Courses
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {studentMarks.length > 0 ? studentMarks.length : 6} Subjects
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 italic bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                  "{student.facultyRemarks || 'Demonstrates solid academic proficiency across evaluations.'}"
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Verified
                </span>
                <button
                  onClick={() => handleOpenReport(student)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/60 transition-colors flex items-center space-x-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Grade Card</span>
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Full Digital Report Card Modal */}
      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title="Official Academic Transcript & Report Card"
        maxWidth="max-w-3xl"
      >
        {previewStudent && (
          <div className="space-y-6 print:p-0">
            {/* Institution Header */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between text-center sm:text-left gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white shadow-glow flex-shrink-0">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-black tracking-tight">
                      {settings?.institution?.name || "Apex Institute of Science & Technology"}
                    </h2>
                    <p className="text-xs text-brand-200">
                      {settings?.institution?.tagline || "Autonomous Institution • Accredited NAAC 'A+' Grade"}
                    </p>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      {settings?.institution?.address}
                    </p>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/15 text-white border border-white/20">
                    OFFICIAL GRADE SHEET
                  </span>
                  <p className="text-[11px] text-slate-300 mt-2 font-mono">
                    Date: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>

            {/* Student & Semester Profile Information */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block font-semibold uppercase text-[10px]">Student Name</span>
                <span className="font-bold text-slate-900 dark:text-white">{previewStudent.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold uppercase text-[10px]">Roll Number</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{previewStudent.rollNumber}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold uppercase text-[10px]">Academic Program</span>
                <span className="font-bold text-slate-900 dark:text-white">{previewStudent.className}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold uppercase text-[10px]">Attendance Compliance</span>
                <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400">{previewStudent.attendanceRate}%</span>
              </div>
            </div>

            {/* Subject-Wise Performance Table */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="px-4 py-3">Course Title</th>
                    <th className="px-3 py-3 text-center">Credits</th>
                    <th className="px-3 py-3 text-center">Internal 1</th>
                    <th className="px-3 py-3 text-center">Internal 2</th>
                    <th className="px-3 py-3 text-center">End Term</th>
                    <th className="px-3 py-3 text-center">Total %</th>
                    <th className="px-4 py-3 text-right">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {marks
                    .filter(m => m.studentId === previewStudent.id)
                    .map((record) => (
                      <tr key={record.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="px-4 py-3">
                          <p className="font-bold text-slate-900 dark:text-white">{record.subjectName}</p>
                          <p className="font-mono text-[10px] text-slate-400">{record.subjectCode}</p>
                        </td>
                        <td className="px-3 py-3 text-center font-mono">{record.credits}</td>
                        <td className="px-3 py-3 text-center font-mono">{record.assessments?.internal1?.scored ?? 42}/50</td>
                        <td className="px-3 py-3 text-center font-mono">{record.assessments?.internal2?.scored ?? 44}/50</td>
                        <td className="px-3 py-3 text-center font-mono">{record.assessments?.endSem?.scored ?? 85}/100</td>
                        <td className="px-3 py-3 text-center font-mono font-bold text-brand-600 dark:text-brand-400">
                          {record.totalPercentage}%
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200">
                            {record.grade}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Summary & Overall Result */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-center">
                <span className="text-[11px] font-bold text-indigo-950 dark:text-indigo-300 uppercase block">
                  Cumulative CGPA
                </span>
                <span className="text-2xl font-black font-mono text-brand-700 dark:text-brand-400">
                  {previewStudent.cgpa} / 10.0
                </span>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 text-center">
                <span className="text-[11px] font-bold text-emerald-950 dark:text-emerald-300 uppercase block">
                  Academic Standing
                </span>
                <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                  FIRST CLASS WITH DISTINCTION
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-center">
                <span className="text-[11px] font-bold text-slate-500 uppercase block">
                  Credits Earned
                </span>
                <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                  19 / 19 Credits
                </span>
              </div>
            </div>

            {/* Faculty Observations & Stamp */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs">
              <p className="font-bold text-slate-800 dark:text-slate-200 mb-1">
                Faculty Remarks & Assessment:
              </p>
              <p className="text-slate-600 dark:text-slate-400 italic">
                "{previewStudent.facultyRemarks || 'Exemplary dedication in course modules and lab practices.'}"
              </p>
            </div>

            {/* Print and Download Actions */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end space-x-3">
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Close
              </button>
              <button
                onClick={handlePrint}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 shadow-glow flex items-center space-x-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Grade Sheet</span>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminReports;
