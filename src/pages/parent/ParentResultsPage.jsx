import React from 'react';
import { useAcademicData } from '../../context/AcademicDataContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';

export const ParentResultsPage = () => {
  const { students, marks } = useAcademicData();
  const child = students.find(s => s.id === 'STU2024001') || students[0];
  const childMarks = marks.filter(m => m.studentId === child.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Ward's Examination & Grade Performance
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Continuous internal evaluations and semester exam results for {child.name} ({child.rollNumber})
        </p>
      </div>

      <Card padding="p-0" className="overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Current CGPA: <strong className="text-brand-600 dark:text-brand-400 font-mono text-sm">{child.cgpa}</strong> / 10.0
          </span>
          <Badge variant="primary" size="md">
            Classification: First Class Distinction
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4 text-center">Credits</th>
                <th className="py-3 px-4 text-center">Internal 1 (50)</th>
                <th className="py-3 px-4 text-center">Internal 2 (50)</th>
                <th className="py-3 px-4 text-center">Assignment (20)</th>
                <th className="py-3 px-4 text-center">End Sem (100)</th>
                <th className="py-3 px-4 text-center">Total %</th>
                <th className="py-3 px-4 text-center">Letter Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {childMarks.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 dark:text-white block">{m.subjectName}</span>
                    <span className="font-mono text-[11px] text-slate-400">{m.subjectCode}</span>
                  </td>
                  <td className="py-3 px-4 text-center font-mono">{m.credits}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ParentResultsPage;
