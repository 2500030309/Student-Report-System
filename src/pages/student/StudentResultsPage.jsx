import React from 'react';
import { useAcademicData } from '../../context/AcademicDataContext';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';

export const StudentResultsPage = () => {
  const { students, marks } = useAcademicData();
  const { currentUser } = useAuth();
  const currentStudent = students.find(s => s.id === (currentUser?.id || 'STU2024001')) || students[0];
  const myMarks = marks.filter(m => m.studentId === currentStudent.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Examination Marks & Assessment Results
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Internal assessments, practical evaluations, and end-semester scores
        </p>
      </div>

      {/* Marks Table */}
      <Card padding="p-0" className="overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Semester 5 Continuous Evaluation Record
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Course</th>
                <th className="py-3 px-4 text-center">Credits</th>
                <th className="py-3 px-4 text-center">Internal 1 (50)</th>
                <th className="py-3 px-4 text-center">Internal 2 (50)</th>
                <th className="py-3 px-4 text-center">Assignment (20)</th>
                <th className="py-3 px-4 text-center">End Sem (100)</th>
                <th className="py-3 px-4 text-center">Percentage</th>
                <th className="py-3 px-4 text-center">Grade</th>
                <th className="py-3 px-4 text-center">Grade Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {myMarks.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 dark:text-white block">
                      {m.subjectName}
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">
                      {m.subjectCode}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-semibold">{m.credits}</td>
                  <td className="py-3 px-4 text-center font-mono">{m.assessments.internal1?.scored ?? 44}</td>
                  <td className="py-3 px-4 text-center font-mono">{m.assessments.internal2?.scored ?? 46}</td>
                  <td className="py-3 px-4 text-center font-mono">{m.assessments.assignment?.scored ?? 18}</td>
                  <td className="py-3 px-4 text-center font-mono">{m.assessments.endSem?.scored ?? 86}</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-slate-900 dark:text-white">
                    {m.totalPercentage}%
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="font-mono font-bold px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                      {m.grade}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-brand-600 dark:text-brand-400">
                    {m.gradePoint} / 10
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

export default StudentResultsPage;
