import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Card, Badge } from '../../components/common/Card';
import {
  Settings,
  Shield,
  Save,
  RotateCcw,
  CheckCircle2,
  Building2,
  Sliders
} from 'lucide-react';
import { storageService } from '../../utils/storage';

export const AdminSettings = () => {
  const { settings, updateSettings } = useData();

  const [threshold, setThreshold] = useState(settings?.attendanceThreshold || 75);
  const [instName, setInstName] = useState(settings?.institution?.name || "Apex Institute of Science & Technology");
  const [affiliation, setAffiliation] = useState(settings?.institution?.affiliation || "Affiliated to State Technological University");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateSettings({
      attendanceThreshold: Number(threshold),
      institution: {
        ...settings?.institution,
        name: instName,
        affiliation
      }
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleResetData = () => {
    if (window.confirm("Are you sure you want to reset all data back to the clean initial demo state?")) {
      storageService.resetAll();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Institutional Academic Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Configure grading policies, attendance thresholds, and university parameters.
        </p>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center space-x-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Institutional configurations updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Attendance Rule Setting */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center space-x-2 text-brand-600 dark:text-brand-400 font-bold text-sm">
            <Sliders className="w-4 h-4" />
            <span>Attendance Policy & Compliance Threshold</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Minimum Attendance Criteria (%)
              </label>
              <input
                type="number"
                min="50"
                max="90"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono font-bold"
              />
              <p className="text-[11px] text-slate-400">
                Students below this threshold trigger academic alert flags on dashboards.
              </p>
            </div>
          </div>
        </Card>

        {/* Institution Metadata */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center space-x-2 text-brand-600 dark:text-brand-400 font-bold text-sm">
            <Building2 className="w-4 h-4" />
            <span>Institution Branding & Accreditation</span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="block font-semibold text-slate-700 dark:text-slate-300">
                Institution Full Name
              </label>
              <input
                type="text"
                value={instName}
                onChange={(e) => setInstName(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-semibold text-slate-700 dark:text-slate-300">
                Affiliation & Approvals
              </label>
              <input
                type="text"
                value={affiliation}
                onChange={(e) => setAffiliation(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium"
              />
            </div>
          </div>
        </Card>

        {/* Grading Scale Reference */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center space-x-2 text-brand-600 dark:text-brand-400 font-bold text-sm">
            <Shield className="w-4 h-4" />
            <span>UGC 10-Point Absolute Grading Scale</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 font-mono">
              <span className="font-bold text-emerald-600">O (90-100%)</span>
              <p className="text-[11px] text-slate-400">Point 10 • Outstanding</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 font-mono">
              <span className="font-bold text-brand-600">A+ (80-89%)</span>
              <p className="text-[11px] text-slate-400">Point 9 • Excellent</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 font-mono">
              <span className="font-bold text-blue-600">A (70-79%)</span>
              <p className="text-[11px] text-slate-400">Point 8 • Very Good</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 font-mono">
              <span className="font-bold text-amber-600">B+ (60-69%)</span>
              <p className="text-[11px] text-slate-400">Point 7 • Good</p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={handleResetData}
            className="px-4 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-800 transition-colors flex items-center space-x-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 shadow-glow transition-all flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Configurations</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
