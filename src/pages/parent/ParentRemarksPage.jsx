import React from 'react';
import { useAcademicData } from '../../context/AcademicDataContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { MessageSquare, Phone, Mail } from 'lucide-react';

export const ParentRemarksPage = () => {
  const { students } = useAcademicData();
  const child = students.find(s => s.id === 'STU2024001') || students[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Teacher Observations & Feedback
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Direct remarks and feedback from university faculty guides for {child.name}
        </p>
      </div>

      <Card padding="p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-300 flex items-center justify-center shrink-0">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Prof. Sneha Sen
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Class Coordinator & Associate Professor (Dept. of CSE)
                </p>
              </div>
              <Badge variant="primary" size="sm">
                Official Remark
              </Badge>
            </div>

            <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
              "{child.facultyRemarks || 'Consistent performer with sharp analytical skills in Algorithms and DBMS. Proactively participates in technical discussions.'}"
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
              <span>Date of submission: <strong>{child.remarksDate || '15-Nov-2024'}</strong></span>
              <span>Next Review: <strong>Parent-Teacher Meeting (30-Nov-2024)</strong></span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ParentRemarksPage;
