import React from 'react';
import { useAcademicData } from '../../context/AcademicDataContext';
import StudentReportCard from '../../components/reports/StudentReportCard';

export const ParentReportsPage = () => {
  const { students, marks } = useAcademicData();
  const child = students.find(s => s.id === 'STU2024001') || students[0];

  return (
    <div className="space-y-6">
      <div className="no-print">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Ward's Official Progress Report Card
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Authorized university transcript for parent evaluation and records
        </p>
      </div>

      <StudentReportCard
        student={child}
        marksList={marks}
        semester={5}
      />
    </div>
  );
};

export default ParentReportsPage;
