import React, { useState } from 'react';
import { useAcademicData } from '../../context/AcademicDataContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { Settings, Save, RotateCcw, CheckCircle2, ShieldAlert } from 'lucide-react';

export const SettingsPage = () => {
  const { settings, updateSettings } = useAcademicData();

  const [threshold, setThreshold] = useState(settings?.attendanceThreshold || 75);
  const [instName, setInstName] = useState(settings?.institution?.name || 'Apex Institute of Science & Technology');
  const [currentYear, setCurrentYear] = useState(settings?.institution?.currentAcademicYear || '2024-2025');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateSettings({
      attendanceThreshold: Number(threshold),
      institution: {
        ...settings?.institution,
        name: instName,
        currentAcademicYear: currentYear
      }
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all mock data back to factory defaults? All changes will be re-seeded.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Institutional & Academic Settings
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Configure grading policies, attendance thresholds, and institution metadata
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center space-x-2 animate-slide-up">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold">Academic parameters successfully updated and saved in Local Storage!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Institutional Identity */}
        <Card padding="p-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
            Institutional Identity & Branding
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Institution Name
              </label>
              <input
                type="text"
                value={instName}
                onChange={(e) => setInstName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Current Academic Year
                </label>
                <input
                  type="text"
                  value={currentYear}
                  onChange={(e) => setCurrentYear(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Autonomous NAAC Accreditation
                </label>
                <input
                  type="text"
                  disabled
                  value="NAAC 'A+' Grade • NBA Tier-1 Accredited"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/50 text-slate-500"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Academic Policies */}
        <Card padding="p-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
            Academic Policy & Minimum Thresholds
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Minimum Mandatory Attendance Threshold (%)
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  min="50"
                  max="100"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  className="w-28 px-3 py-2 text-xs font-mono font-bold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
                <span className="text-slate-400">
                  Students below this percentage will trigger red attendance alerts on all portals.
                </span>
              </div>
            </div>

            {/* Grading Scale Display */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Autonomous 10-Point Relative Grading System
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center">
                  <span className="font-bold text-emerald-600 block">Grade O (10 Pts)</span>
                  <span className="text-slate-400">90% - 100%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center">
                  <span className="font-bold text-brand-600 block">Grade A+ (9 Pts)</span>
                  <span className="text-slate-400">80% - 89%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center">
                  <span className="font-bold text-blue-600 block">Grade A (8 Pts)</span>
                  <span className="text-slate-400">70% - 79%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center">
                  <span className="font-bold text-rose-600 block">Grade F (0 Pts)</span>
                  <span className="text-slate-400">&lt; 50% Fail</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-5 mt-5 border-t border-slate-100 dark:border-slate-800">
            <Button type="submit" variant="primary" size="sm" icon={Save}>
              Save Academic Settings
            </Button>
          </div>
        </Card>

        {/* Database Management / Factory Reset */}
        <Card padding="p-6" className="border-rose-200 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-rose-900 dark:text-rose-300">
                Reset Mock Database to Factory Default
              </h4>
              <p className="text-xs text-rose-700 dark:text-rose-400 mt-0.5">
                Clear all custom students, edited marks, and attendance logs back to initial syllabus mock seed.
              </p>
            </div>
            <Button
              type="button"
              variant="danger"
              size="sm"
              icon={RotateCcw}
              onClick={handleResetData}
            >
              Reset Mock Data
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default SettingsPage;
