import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Card, Badge } from '../../components/common/Card';
import {
  BarChart3,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export const AdminAnalytics = () => {
  const { students, marks, settings } = useData();

  // Distribution calculations
  const totalStudents = students.length || 1;
  const above9 = students.filter(s => s.cgpa >= 9.0).length;
  const between8and9 = students.filter(s => s.cgpa >= 8.0 && s.cgpa < 9.0).length;
  const between7and8 = students.filter(s => s.cgpa >= 7.0 && s.cgpa < 8.0).length;
  const below7 = students.filter(s => s.cgpa < 7.0).length;

  const lowAttendance = students.filter(s => s.attendanceRate < (settings?.attendanceThreshold || 75)).length;
  const goodAttendance = totalStudents - lowAttendance;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Institutional Analytics & Academic Insights
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Cohort performance trends, CGPA distributions, and continuous assessment outcomes.
        </p>
      </div>

      {/* High-level performance KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Top Achievers (≥ 9.0 CGPA)
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
              {above9} Students
            </h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
              {Math.round((above9 / totalStudents) * 100)}%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Distinction honours eligible</p>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            First Class (8.0 - 8.9 CGPA)
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
              {between8and9} Students
            </h3>
            <span className="text-xs font-bold text-brand-600 bg-brand-50 dark:bg-brand-950/60 px-2 py-0.5 rounded-full">
              {Math.round((between8and9 / totalStudents) * 100)}%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Strong academic baseline</p>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Average Attendance Rate
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
              88.4%
            </h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
              +2.1%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Threshold: 75% minimum</p>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Attendance Alerts
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <h3 className="text-2xl font-bold text-rose-600 dark:text-rose-400 font-mono">
              {lowAttendance} Flagged
            </h3>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full">
              Action Req.
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Requires counseling</p>
        </Card>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CGPA Distribution Bar Visualization */}
        <Card className="p-6 space-y-5">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              CGPA Performance Distribution
            </h3>
            <p className="text-xs text-slate-400">Student segmentation across grade brackets</p>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-emerald-700 dark:text-emerald-400">Grade O (9.0 - 10.0 CGPA)</span>
                <span className="font-mono">{above9} ({Math.round((above9 / totalStudents) * 100)}%)</span>
              </div>
              <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${(above9 / totalStudents) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-brand-600 dark:text-brand-400">Grade A+ (8.0 - 8.9 CGPA)</span>
                <span className="font-mono">{between8and9} ({Math.round((between8and9 / totalStudents) * 100)}%)</span>
              </div>
              <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-500 rounded-full transition-all duration-500"
                  style={{ width: `${(between8and9 / totalStudents) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-blue-600 dark:text-blue-400">Grade A (7.0 - 7.9 CGPA)</span>
                <span className="font-mono">{between7and8} ({Math.round((between7and8 / totalStudents) * 100)}%)</span>
              </div>
              <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${(between7and8 / totalStudents) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-amber-600 dark:text-amber-400">Grade B+ & Below (&lt; 7.0 CGPA)</span>
                <span className="font-mono">{below7} ({Math.round((below7 / totalStudents) * 100)}%)</span>
              </div>
              <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${(below7 / totalStudents) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Subject-Wise Performance Benchmarks */}
        <Card className="p-6 space-y-5">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Subject Average Performance
            </h3>
            <p className="text-xs text-slate-400">Comparing mean scores across Semester 5 courses</p>
          </div>

          <div className="space-y-4 pt-2 text-xs">
            {[
              { code: 'CS501', title: 'Algorithms', score: 88, color: 'bg-indigo-600' },
              { code: 'CS502', title: 'DBMS', score: 86, color: 'bg-blue-600' },
              { code: 'CS503', title: 'Networks', score: 83, color: 'bg-emerald-600' },
              { code: 'CS504', title: 'Theory of Computation', score: 79, color: 'bg-amber-600' },
              { code: 'CS505', title: 'Web Engineering', score: 94, color: 'bg-purple-600' },
            ].map((subj) => (
              <div key={subj.code}>
                <div className="flex justify-between font-semibold mb-1">
                  <span>{subj.title} ({subj.code})</span>
                  <span className="font-mono font-bold">{subj.score}% Avg</span>
                </div>
                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${subj.color} rounded-full transition-all duration-500`}
                    style={{ width: `${subj.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
