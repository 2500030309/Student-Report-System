import React, { useState } from 'react';
import { useAcademicData } from '../../context/AcademicDataContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { BookOpen, Users, Clock, Award, CheckCircle } from 'lucide-react';

export const ClassesAndSubjects = () => {
  const { subjects, classes } = useAcademicData();
  const [activeTab, setActiveTab] = useState('subjects');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Academic Curriculum & Classes
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Core subjects, credit weightages, and classroom allocations
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex rounded-xl p-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 self-start">
          <button
            onClick={() => setActiveTab('subjects')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'subjects'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Courses ({subjects.length})
          </button>
          <button
            onClick={() => setActiveTab('classes')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'classes'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Class Sections ({classes.length})
          </button>
        </div>
      </div>

      {activeTab === 'subjects' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((sub) => (
            <Card key={sub.id} padding="p-6" hover className="flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <Badge variant="primary" size="sm" className="font-mono">
                    {sub.code}
                  </Badge>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                    {sub.credits} Credits
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-3">
                  {sub.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Dept: {sub.department} • Semester {sub.semester}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Faculty Guide:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{sub.facultyName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Scheduled Hours:</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">{sub.totalClasses} Lectures</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center">
                  <CheckCircle className="w-3.5 h-3.5 mr-1" />
                  Syllabus Active
                </span>
                <span className="text-[11px] font-mono text-slate-400">ID: {sub.id}</span>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {classes.map((cls) => (
            <Card key={cls.id} padding="p-6" hover>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {cls.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {cls.room}
                  </p>
                </div>
                <Badge variant="primary" size="md">
                  {cls.id}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block">Class Teacher:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">
                    {cls.classTeacher}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Enrolled Strength:</span>
                  <span className="font-mono font-bold text-brand-600 dark:text-brand-400 text-sm mt-0.5 block">
                    {cls.studentsCount} Students
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassesAndSubjects;
