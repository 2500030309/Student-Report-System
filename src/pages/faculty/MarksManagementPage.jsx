import React, { useState } from 'react';
import { useAcademicData } from '../../context/AcademicDataContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { calculateGrade } from '../../utils/calculations';
import {
  Award,
  Save,
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const MarksManagementPage = () => {
  const { students, subjects, classes, marks, updateMarks, settings } = useAcademicData();

  const [selectedClass, setSelectedClass] = useState('CSE-5A');
  const [selectedSubject, setSelectedSubject] = useState('SUB-CSE501');
  const [selectedAssessment, setSelectedAssessment] = useState('internal1');
  const [searchTerm, setSearchTerm] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Assessment specifications:
  const assessmentMeta = {
    internal1: { label: 'Internal Assessment 1', max: 50, weight: '20%' },
    internal2: { label: 'Internal Assessment 2', max: 50, weight: '20%' },
    assignment: { label: 'Continuous Assignment & Lab', max: 20, weight: '10%' },
    endSem: { label: 'End Semester Theory Exam', max: 100, weight: '50%' }
  };

  const currentMeta = assessmentMeta[selectedAssessment];

  // Local state for editable table marks
  const [localMarks, setLocalMarks] = useState({});

  // Get student marks records for this class & subject
  const currentSubjectRecords = marks.filter(m => m.subjectId === selectedSubject);

  const handleScoreChange = (recordId, value) => {
    const num = Math.min(Math.max(0, Number(value) || 0), currentMeta.max);
    setLocalMarks(prev => ({
      ...prev,
      [recordId]: num
    }));
  };

  const handleSaveMarks = () => {
    // Commit all local edits into Context / Local Storage
    Object.entries(localMarks).forEach(([recordId, val]) => {
      const existing = marks.find(m => m.id === recordId);
      if (existing) {
        const updatedAssessments = {
          ...existing.assessments,
          [selectedAssessment]: { scored: val, max: currentMeta.max }
        };
        updateMarks(recordId, { assessments: updatedAssessments });
      }
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const currentSubjectObj = subjects.find(s => s.id === selectedSubject);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Examination Marks & Grade Evaluation
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Section 11 • Continuous assessment entry, grade point allocation, and real-time tabulation
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="primary"
            size="sm"
            icon={Save}
            onClick={handleSaveMarks}
            className="shadow-glow"
          >
            Save Marks to Database
          </Button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between animate-slide-up">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">
              Grades updated and stored in institutional local storage! Percentages and points recalculated.
            </span>
          </div>
          <span className="text-[10px] font-mono uppercase bg-emerald-200/50 dark:bg-emerald-900/60 px-2 py-0.5 rounded">
            Auto-Graded
          </span>
        </div>
      )}

      {/* Selectors Bar */}
      <Card padding="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Class Section
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              {classes.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.id})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Subject & Course Code
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              {subjects.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.code}) - {s.credits} Credits
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Assessment Component
            </label>
            <select
              value={selectedAssessment}
              onChange={(e) => setSelectedAssessment(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option value="internal1">Internal Assessment 1 (Max: 50)</option>
              <option value="internal2">Internal Assessment 2 (Max: 50)</option>
              <option value="assignment">Assignment & Lab (Max: 20)</option>
              <option value="endSem">End Semester Exam (Max: 100)</option>
            </select>
          </div>
        </div>

        {/* Current Assessment Banner */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>
            Active Evaluation: <strong className="text-brand-600 dark:text-brand-400 font-bold">{currentMeta.label}</strong>
          </span>
          <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
            Component Max: <strong>{currentMeta.max} Marks</strong> • Weight: {currentMeta.weight}
          </span>
        </div>
      </Card>

      {/* Marks Table */}
      <Card padding="p-0" className="overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="relative max-w-xs w-full">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search candidate by name or roll..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <span className="text-xs text-slate-400">
            Grading Rule: <strong>≥90: O (10) • ≥80: A+ (9) • ≥70: A (8) • &lt;50: F (0)</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Roll Number</th>
                <th className="py-3 px-4">Internal 1 (50)</th>
                <th className="py-3 px-4">Internal 2 (50)</th>
                <th className="py-3 px-4">Assignment (20)</th>
                <th className="py-3 px-4">End Sem (100)</th>
                <th className="py-3 px-4">Current Entry</th>
                <th className="py-3 px-4">Calculated %</th>
                <th className="py-3 px-4">Awarded Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {currentSubjectRecords
                .filter(rec =>
                  rec.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  rec.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((rec) => {
                  const currentEntryValue = localMarks[rec.id] !== undefined
                    ? localMarks[rec.id]
                    : (rec.assessments[selectedAssessment]?.scored || 0);

                  const gradeScale = settings?.gradingScale || [];
                  const gradeInfo = calculateGrade(rec.totalPercentage, gradeScale);

                  return (
                    <tr key={rec.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                        {rec.studentName}
                      </td>

                      <td className="py-3 px-4 font-mono font-semibold text-slate-600 dark:text-slate-300">
                        {rec.rollNumber}
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-300">
                        {rec.assessments.internal1?.scored ?? '-'}/50
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-300">
                        {rec.assessments.internal2?.scored ?? '-'}/50
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-300">
                        {rec.assessments.assignment?.scored ?? '-'}/20
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-300">
                        {rec.assessments.endSem?.scored ?? '-'}/100
                      </td>

                      {/* Editable Field */}
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-1.5">
                          <input
                            type="number"
                            min="0"
                            max={currentMeta.max}
                            value={currentEntryValue}
                            onChange={(e) => handleScoreChange(rec.id, e.target.value)}
                            className="w-16 px-2 py-1 text-center font-mono font-bold text-xs rounded-lg border-2 border-brand-500 bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                          />
                          <span className="text-[10px] text-slate-400 font-mono">/{currentMeta.max}</span>
                        </div>
                      </td>

                      {/* Calculated Percentage */}
                      <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                        {rec.totalPercentage}%
                      </td>

                      {/* Awarded Grade */}
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold font-mono text-xs ${
                          rec.grade === 'O'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : rec.grade === 'A+'
                            ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                            : rec.grade === 'A'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}>
                          Grade {rec.grade} ({rec.gradePoint})
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default MarksManagementPage;
