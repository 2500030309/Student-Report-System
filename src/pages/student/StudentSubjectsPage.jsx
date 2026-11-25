import React from 'react';
import { useAcademicData } from '../../context/AcademicDataContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { BookOpen, UserCheck, Clock, Award } from 'lucide-react';

export const StudentSubjectsPage = () => {
  const { subjects } = useAcademicData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Enrolled Subjects & Syllabus
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Registered courses for B.Tech Computer Science & Engineering • 5th Semester
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((sub) => (
          <Card key={sub.id} padding="p-6" hover className="flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <Badge variant="primary" size="sm" className="font-mono">
                  {sub.code}
                </Badge>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full font-mono">
                  {sub.credits} Credits
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-3">
                {sub.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                Faculty Guide: <strong className="text-slate-800 dark:text-slate-200">{sub.facultyName}</strong>
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 space-y-1">
                <div className="flex justify-between">
                  <span>Semester:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">5th Semester</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Scheduled Hours:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">{sub.totalClasses} Lectures</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-emerald-600 font-semibold">
              <span>Status: Enrolled</span>
              <span className="text-[11px] text-slate-400 font-mono">ID: {sub.id}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentSubjectsPage;
