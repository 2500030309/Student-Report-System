import React from 'react';
import { useAcademicData } from '../../context/AcademicDataContext';
import { useAuth } from '../../context/AuthContext';
import StudentReportCard from '../../components/reports/StudentReportCard';

export const StudentReportCardsPage = () => {
  const { students, marks } = useAcademicData();
  const { currentUser } = useAuth();

  const currentStudent = students.find(s => s.id === currentUser?.id || s.email === currentUser?.email) || students[0];

  return (
    <div className="space-y-6">
      <div className="no-print">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Official Digital Report Card
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Authorized university transcript with digital authentication barcode and grading summary
        </p>
      </div>

      <StudentReportCard
        student={currentStudent}
        marksList={marks}
        semester={5}
      />
    </div>
  );
};

export default StudentReportCardsPage;
