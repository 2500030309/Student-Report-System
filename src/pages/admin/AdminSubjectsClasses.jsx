import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Card, Badge, Modal } from '../../components/common/Card';
import {
  BookOpen,
  Building2,
  Plus,
  Users,
  Award,
  Clock,
  Layers,
  GraduationCap
} from 'lucide-react';

export const AdminSubjectsClasses = () => {
  const { subjects, classes, faculty } = useData();
  const [activeTab, setActiveTab] = useState('subjects'); // 'subjects' | 'classes'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Curriculum, Courses & Sections
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Structure academic credit allocations, syllabus codes, and physical classroom batches.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('subjects')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'subjects'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Subjects & Modules ({subjects.length})
          </button>
          <button
            onClick={() => setActiveTab('classes')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'classes'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Class Sections ({classes.length})
          </button>
        </div>
      </div>

      {/* Subjects View */}
      {activeTab === 'subjects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {subjects.map((subj) => (
            <Card key={subj.id} className="p-5 flex flex-col justify-between hover:shadow-card transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300">
                    {subj.code}
                  </span>
                  <Badge variant="info">{subj.credits} Credits</Badge>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {subj.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Semester {subj.semester} • {subj.department}
                  </p>
                </div>

                <div className="pt-2 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Faculty In-Charge:</span>
                    <span className="font-semibold">{subj.facultyName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Total Planned Classes:</span>
                    <span className="font-mono font-bold">{subj.totalClasses} Lectures</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Course ID: {subj.id}</span>
                <span className="text-emerald-500 font-semibold">Active Syllabus</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Classes View */}
      {activeTab === 'classes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {classes.map((cls) => (
            <Card key={cls.id} className="p-6 hover:shadow-card transition-all space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-brand-600 dark:text-brand-400 block mb-1">
                    Section Code: {cls.id}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {cls.name}
                  </h3>
                </div>
                <Badge variant="primary">{cls.department}</Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-slate-400 block font-medium">Students Enrolled</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {cls.studentsCount} Students
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-slate-400 block font-medium">Class Teacher</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {cls.classTeacher}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 col-span-2 sm:col-span-1">
                  <span className="text-slate-400 block font-medium">Classroom</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {cls.room}
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

export default AdminSubjectsClasses;
