import React, { useState } from 'react';
import { useAcademicData } from '../../context/AcademicDataContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { Download, Printer, Search, FileText } from 'lucide-react';

export const FacultyReportsPage = () => {
  const { students, marks, subjects } = useAcademicData();
  const [selectedSubject, setSelectedSubject] = useState('SUB-CSE501');

  const subjectRecords = marks.filter(m => m.subjectId === selectedSubject);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Class Consolidated Grade Sheet
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Section 7 • Tabulation register for semester continuous evaluation
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="primary"
            size="sm"
            icon={Printer}
            onClick={() => window.print()}
          >
            Print Grade Sheet
          </Button>
        </div>
      </div>

      <Card padding="p-0" className="overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Subject: Design & Analysis of Algorithms (CS501) • Class: CSE-5A
          </span>
          <span className="text-xs text-slate-400">
            Total Evaluated: <strong>{subjectRecords.length} Candidates</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Candidate Name</th>
                <th className="py-3 px-4">Roll Number</th>
                <th className="py-3 px-3 text-center">Int 1 (50)</th>
                <th className="py-3 px-3 text-center">Int 2 (50)</th>
                <th className="py-3 px-3 text-center">Assign (20)</th>
                <th className="py-3 px-3 text-center">End Sem (100)</th>
                <th className="py-3 px-3 text-center">Total %</th>
                <th className="py-3 px-3 text-center">Grade</th>
                <th className="py-3 px-3 text-right">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {subjectRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    {rec.studentName}
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-600 dark:text-slate-300">
                    {rec.rollNumber}
                  </td>
                  <td className="py-3 px-3 text-center font-mono">{rec.assessments.internal1?.scored ?? 44}</td>
                  <td className="py-3 px-3 text-center font-mono">{rec.assessments.internal2?.scored ?? 46}</td>
                  <td className="py-3 px-3 text-center font-mono">{rec.assessments.assignment?.scored ?? 18}</td>
                  <td className="py-3 px-3 text-center font-mono">{rec.assessments.endSem?.scored ?? 86}</td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-slate-900 dark:text-white">
                    {rec.totalPercentage}%
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-extrabold text-brand-600">
                    {rec.grade}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Badge variant={rec.status === 'Pass' ? 'success' : 'danger'} size="sm">
                      {rec.status}
                    </Badge>
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

export default FacultyReportsPage;
