import React, { useState } from 'react';
import { useAcademicData } from '../../context/AcademicDataContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import {
  PerformanceTrendChart,
  SubjectBarChart,
  DistributionBars,
  AttendanceGauge
} from '../../components/common/SimpleCharts';
import { BarChart3, TrendingUp, Award, Users, Download, ArrowUpRight } from 'lucide-react';

export const AnalyticsPage = () => {
  const { students, subjects, settings } = useAcademicData();
  const [selectedSemester, setSelectedSemester] = useState('5');

  // Semester trends
  const semesterProgression = [
    { label: 'Sem 1', value: 8.12 },
    { label: 'Sem 2', value: 8.35 },
    { label: 'Sem 3', value: 8.48 },
    { label: 'Sem 4', value: 8.61 },
    { label: 'Sem 5', value: 8.64 },
  ];

  // Subject comparison
  const subjectComparison = [
    { subject: 'Algorithms (CS501)', marks: 88, max: 100 },
    { subject: 'DBMS (CS502)', marks: 86, max: 100 },
    { subject: 'Networks (CS503)', marks: 84, max: 100 },
    { subject: 'Theory of Comp (CS504)', marks: 76, max: 100 },
    { subject: 'Web Engg (CS505)', marks: 94, max: 100 },
    { subject: 'DBMS Lab (CS506P)', marks: 95, max: 100 }
  ];

  // Grade breakdown
  const gradeDistribution = [
    { label: 'O (90-100%)', count: 14 },
    { label: 'A+ (80-89%)', count: 19 },
    { label: 'A (70-79%)', count: 6 },
    { label: 'B+ (60-69%)', count: 2 },
    { label: 'B (55-59%)', count: 1 }
  ];

  const avgAttendance = 88.5;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Institutional Academic Analytics
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Continuous comprehensive evaluation analytics for NAAC & NBA criteria
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            icon={Download}
            onClick={() => window.print()}
          >
            Export Analytics PDF
          </Button>
        </div>
      </div>

      {/* Top Benchmark KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Pass Percentage
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <h3 className="text-2xl font-extrabold text-emerald-600 font-mono">98.4%</h3>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              +1.2% <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">41 of 42 students cleared</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Median CGPA
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <h3 className="text-2xl font-extrabold text-brand-600 dark:text-brand-400 font-mono">8.64</h3>
            <span className="text-xs font-semibold text-brand-600 flex items-center">
              Top Decile
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Grade 'A+' Institutional Band</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Attendance Health
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <h3 className="text-2xl font-extrabold text-sky-600 font-mono">88.5%</h3>
            <Badge variant="success" size="sm">Compliant</Badge>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Threshold: ≥75% requirement</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Distinction Ratio
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <h3 className="text-2xl font-extrabold text-purple-600 font-mono">78.5%</h3>
            <span className="text-xs font-semibold text-purple-600">33 Students</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">CGPA &gt; 8.0 criteria</p>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card
          title="Batch Performance Trajectory (Sem 1 - Sem 5)"
          subtitle="Longitudinal progression tracking institutional cohort"
          className="lg:col-span-2"
        >
          <PerformanceTrendChart data={semesterProgression} height={250} />
        </Card>

        <Card
          title="Campus Attendance Metric"
          subtitle="Eligibility Distribution"
          className="flex flex-col justify-between"
        >
          <div className="py-2 flex flex-col items-center">
            <AttendanceGauge percentage={avgAttendance} size={180} threshold={settings?.attendanceThreshold || 75} />
            <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-4">
              97.6% of candidates meet minimum criteria for university end-semester examinations.
            </p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card
          title="Subject-Wise Examination Benchmark"
          subtitle="Relative mean performance across subjects"
        >
          <SubjectBarChart data={subjectComparison} />
        </Card>

        <Card
          title="Relative Grade Distribution"
          subtitle="Standard Normal curve mapping under Autonomous regulation"
        >
          <DistributionBars distribution={gradeDistribution} />
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
