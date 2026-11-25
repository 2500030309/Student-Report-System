import React from 'react';
import { useAcademicData } from '../../context/AcademicDataContext';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { PerformanceTrendChart } from '../../components/common/SimpleCharts';
import { MOCK_SEMESTER_HISTORY } from '../../data/mockData';
import { Award, TrendingUp, CheckCircle } from 'lucide-react';

export const StudentProgressPage = () => {
  const { students } = useAcademicData();
  const { currentUser } = useAuth();
  const currentStudent = students.find(s => s.id === currentUser?.id || s.email === currentUser?.email) || students[0];

  const trendData = [
    { label: 'Sem 1', value: 8.42 },
    { label: 'Sem 2', value: 8.55 },
    { label: 'Sem 3', value: 8.70 },
    { label: 'Sem 4', value: 8.82 },
    { label: 'Sem 5', value: currentStudent.cgpa || 8.64 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Academic Progression & SGPA Trajectory
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Historical analysis of semester grade point averages and credit accumulation
        </p>
      </div>

      <Card
        title="Longitudinal SGPA Trajectory (Sem 1 to Sem 5)"
        subtitle="Consistent performance in First Class with Distinction band"
      >
        <PerformanceTrendChart data={trendData} height={250} />
      </Card>

      {/* Semester History Table */}
      <Card padding="p-0" className="overflow-hidden">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Semester-by-Semester Academic History
          </h4>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Semester</th>
                <th className="py-3 px-4 text-center">Credits Registered</th>
                <th className="py-3 px-4 text-center">Semester SGPA</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Awarded Distinction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {MOCK_SEMESTER_HISTORY.map((sem, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    {sem.semester}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-semibold text-slate-600 dark:text-slate-300">
                    {sem.credits} Credits
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-brand-600 dark:text-brand-400">
                    {sem.sgpa}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {sem.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Badge variant={sem.badge === 'Distinction' ? 'success' : 'primary'} size="sm">
                      {sem.badge}
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

export default StudentProgressPage;
