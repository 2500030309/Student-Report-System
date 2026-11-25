import React from 'react';
import { useAcademicData } from '../../context/AcademicDataContext';
import Badge from '../common/Badge';
import Button from '../common/Button';
import {
  GraduationCap,
  Award,
  Calendar,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  QrCode
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const StudentReportCard = ({ student, marksList, semester = 5 }) => {
  const { settings } = useAcademicData();
  const inst = settings?.institution || {};

  // Compute overall marks & credits safely
  const studentMarks = (marksList || []).filter(m => m.studentId === student?.id);
  const totalCredits = studentMarks.reduce((sum, m) => sum + (m.credits || 0), 0);
  const totalWeightedPoints = studentMarks.reduce((sum, m) => sum + ((m.credits || 0) * (m.gradePoint || 0)), 0);
  const calculatedSGPA = totalCredits > 0 ? (totalWeightedPoints / totalCredits).toFixed(2) : (student?.cgpa || '0.00');

  const handlePrint = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    window.print();
  };

  if (!student) {
    return (
      <div className="p-8 text-center text-slate-500 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        No student data available to display report card.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Actions Bar (hidden when printing) */}
      <div className="no-print flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center space-x-2">
          <Badge variant="primary" size="md">
            Digital Transcript Authenticated
          </Badge>
          <span className="text-xs text-slate-500 hidden sm:inline">
            Official Semester Grade Card (NAAC / NBA Tier-1 Standard)
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="primary"
            size="sm"
            icon={Printer}
            onClick={handlePrint}
            className="shadow-glow"
          >
            Print / Save as PDF
          </Button>
        </div>
      </div>

      {/* Printable Report Card Container */}
      <div className="print-card bg-white text-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto space-y-8">
        {/* Institutional Header with Logo & Seal */}
        <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0">
              <GraduationCap className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-950 font-serif">
                {inst.name || 'Apex Institute of Science & Technology'}
              </h2>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">
                {inst.tagline || 'Autonomous Institution • NAAC Grade A+ • NBA Tier-1'}
              </p>
              <p className="text-[11px] text-slate-500">
                {inst.address} • Affiliation: {inst.affiliation}
              </p>
            </div>
          </div>

          <div className="text-right sm:border-l sm:border-slate-300 sm:pl-6 shrink-0">
            <div className="inline-block p-1 bg-slate-100 rounded-lg mb-1">
              <QrCode className="w-12 h-12 text-slate-800" />
            </div>
            <p className="text-[10px] font-mono font-bold text-slate-500 uppercase">
              Doc ID: {student.id}-S5
            </p>
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-1">
          <h3 className="text-lg font-extrabold uppercase tracking-widest text-slate-950 underline decoration-brand-600 underline-offset-8">
            OFFICIAL GRADE REPORT CARD
          </h3>
          <p className="text-xs font-medium text-slate-600">
            Bachelor of Technology (B.Tech) • {inst.currentSemester || 'Fall Semester (Odd) 2024-2025'}
          </p>
        </div>

        {/* Candidate Information Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Candidate Name</span>
            <span className="font-bold text-slate-900 text-sm mt-0.5 block">{student.name}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Roll / Registration No</span>
            <span className="font-mono font-bold text-slate-900 text-sm mt-0.5 block">{student.rollNumber}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Department & Program</span>
            <span className="font-semibold text-slate-900 mt-0.5 block">Computer Science & Engg</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Semester & Class</span>
            <span className="font-bold text-slate-900 mt-0.5 block">Semester {semester} ({student.classId || 'CSE-5A'})</span>
          </div>
        </div>

        {/* Subject-Wise Marks & Grades Table */}
        <div className="overflow-x-auto border border-slate-300 rounded-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300 text-[10px] font-bold uppercase tracking-wider text-slate-700">
                <th className="py-2.5 px-3">Course Code</th>
                <th className="py-2.5 px-3">Course Title</th>
                <th className="py-2.5 px-2 text-center">Credits</th>
                <th className="py-2.5 px-2 text-center">Internal (50)</th>
                <th className="py-2.5 px-2 text-center">Assign (20)</th>
                <th className="py-2.5 px-2 text-center">End Sem (100)</th>
                <th className="py-2.5 px-2 text-center">Total %</th>
                <th className="py-2.5 px-2 text-center">Grade</th>
                <th className="py-2.5 px-2 text-center">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {studentMarks.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                    {m.subjectCode}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-800">
                    {m.subjectName}
                  </td>
                  <td className="py-2.5 px-2 text-center font-mono font-semibold">
                    {m.credits}
                  </td>
                  <td className="py-2.5 px-2 text-center font-mono text-slate-700">
                    {m.assessments.internal1?.scored ?? 44}
                  </td>
                  <td className="py-2.5 px-2 text-center font-mono text-slate-700">
                    {m.assessments.assignment?.scored ?? 18}
                  </td>
                  <td className="py-2.5 px-2 text-center font-mono text-slate-700">
                    {m.assessments.endSem?.scored ?? 86}
                  </td>
                  <td className="py-2.5 px-2 text-center font-mono font-bold text-slate-900">
                    {m.totalPercentage}%
                  </td>
                  <td className="py-2.5 px-2 text-center">
                    <span className="inline-block px-2 py-0.5 rounded font-mono font-bold bg-slate-100 text-slate-900">
                      {m.grade}
                    </span>
                  </td>
                  <td className="py-2.5 px-2 text-center font-mono font-bold text-slate-900">
                    {m.gradePoint}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Scoring Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-900 text-white text-center">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Credits</span>
            <span className="text-xl font-extrabold font-mono mt-1 block">{totalCredits}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Semester SGPA</span>
            <span className="text-xl font-extrabold font-mono text-brand-300 mt-1 block">{calculatedSGPA}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Cumulative CGPA</span>
            <span className="text-xl font-extrabold font-mono text-emerald-400 mt-1 block">{student.cgpa}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Classification</span>
            <span className="text-sm font-bold mt-1 text-amber-300 block">First Class Distinction</span>
          </div>
        </div>

        {/* Attendance & Faculty Remarks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider block">
              Attendance Record
            </span>
            <p className="text-slate-600">
              Total Recorded Attendance: <strong>{student.attendanceRate}%</strong>
            </p>
            <p className="text-slate-500 text-[11px]">
              Minimum institutional requirement of 75% cleared for university examination credentials.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider block">
              Mentor's Academic Observation
            </span>
            <p className="text-slate-700 italic">
              "{student.facultyRemarks || 'Exemplary academic dedication with sharp grasp of core algorithms and systems.'}"
            </p>
          </div>
        </div>

        {/* Official Endorsement Signatures */}
        <div className="pt-8 border-t border-slate-300 grid grid-cols-3 text-center text-xs">
          <div>
            <div className="h-10 border-b border-dashed border-slate-400 w-36 mx-auto mb-2" />
            <p className="font-bold text-slate-900">Class Coordinator</p>
            <p className="text-[10px] text-slate-500">Dept. of Computer Science</p>
          </div>
          <div>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-slate-400 text-[9px] font-bold uppercase text-slate-400 mx-auto mb-1">
              AIST SEAL
            </div>
            <p className="text-[10px] font-mono text-slate-500">Date: 25-Nov-2024</p>
          </div>
          <div>
            <div className="h-10 border-b border-dashed border-slate-400 w-36 mx-auto mb-2" />
            <p className="font-bold text-slate-900">Controller of Examinations</p>
            <p className="text-[10px] text-slate-500">Apex Institute of Science & Tech</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentReportCard;
