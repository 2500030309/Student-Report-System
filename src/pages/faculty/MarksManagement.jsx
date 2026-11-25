import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Card, Badge, Modal } from '../../components/common/Card';
import {
  Award,
  Search,
  Save,
  CheckCircle2,
  Calculator,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

export const MarksManagement = () => {
  const { students, subjects, classes, marks, updateStudentMarks, settings } = useData();

  // Filters
  const [selectedClass, setSelectedClass] = useState('CSE-5A');
  const [selectedSubject, setSelectedSubject] = useState('SUB-CSE501');
  const [selectedAssessment, setSelectedAssessment] = useState('internal1');
  const [searchTerm, setSearchTerm] = useState('');
  const [savedNotification, setSavedNotification] = useState(false);

  // Local state for live marks inputs
  const [localScores, setLocalScores] = useState({});

  const assessmentMaxMap = {
    internal1: 50,
    internal2: 50,
    assignment: 20,
    endSem: 100
  };

  const assessmentLabelMap = {
    internal1: 'Internal Assessment 1 (Max 50)',
    internal2: 'Internal Assessment 2 (Max 50)',
    assignment: 'Capstone Project / Assignment (Max 20)',
    endSem: 'End-Semester Final (Max 100)'
  };

  const maxMarks = assessmentMaxMap[selectedAssessment] || 50;

  // Filter marks records matching class and subject
  const relevantMarks = marks.filter(
    m => m.classId === selectedClass && m.subjectId === selectedSubject
  );

  const handleScoreChange = (recordId, val) => {
    const num = Math.min(maxMarks, Math.max(0, Number(val) || 0));
    setLocalScores(prev => ({
      ...prev,
      [`${recordId}_${selectedAssessment}`]: num
    }));
  };

  const handleSaveMarks = (record) => {
    const currentScore =
      localScores[`${record.id}_${selectedAssessment}`] !== undefined
        ? localScores[`${record.id}_${selectedAssessment}`]
        : record.assessments[selectedAssessment]?.scored || 0;

    const updatedAssessments = {
      ...record.assessments,
      [selectedAssessment]: { scored: currentScore, max: maxMarks }
    };

    updateStudentMarks(record.id, { assessments: updatedAssessments });
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  const handleSaveAll = () => {
    relevantMarks.forEach(rec => {
      const currentScore =
        localScores[`${rec.id}_${selectedAssessment}`] !== undefined
          ? localScores[`${rec.id}_${selectedAssessment}`]
          : rec.assessments[selectedAssessment]?.scored || 0;

      const updatedAssessments = {
        ...rec.assessments,
        [selectedAssessment]: { scored: currentScore, max: maxMarks }
      };

      updateStudentMarks(rec.id, { assessments: updatedAssessments });
    });

    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Marks & Academic Grading Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Enter continuous evaluation scores, compute grade points, and assign feedback.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-glow transition-all flex items-center space-x-2 self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save All Marks</span>
        </button>
      </div>

      {savedNotification && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center space-x-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Evaluation marks saved! Automated grades and SGPA recalibrated.</span>
        </div>
      )}

      {/* Control Selector Bar */}
      <Card className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Class Section
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
            >
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
            >
              {subjects.map(s => (
                <option key={s.id} value={s.id}>{s.code} - {s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Assessment Scheme
            </label>
            <select
              value={selectedAssessment}
              onChange={(e) => setSelectedAssessment(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-semibold"
            >
              <option value="internal1">Internal Assessment 1 (Max 50)</option>
              <option value="internal2">Internal Assessment 2 (Max 50)</option>
              <option value="assignment">Assignment / Project (Max 20)</option>
              <option value="endSem">End Semester Final (Max 100)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Filter Students
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by student name..."
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Evaluation Banner Info */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-semibold">
            Active Assessment: <strong className="text-brand-600 dark:text-brand-400">{assessmentLabelMap[selectedAssessment]}</strong>
          </span>
          <span className="text-slate-400">
            Passing Criteria: 50% Aggregate • Automatic NAAC Grading
          </span>
        </div>
      </Card>

      {/* Marks Management Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Roll Number</th>
                <th className="py-3 px-4">Marks Scored (/{maxMarks})</th>
                <th className="py-3 px-4">Calculated %</th>
                <th className="py-3 px-4">Auto Grade</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {relevantMarks
                .filter(m => m.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || m.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((record) => {
                  const currentScore =
                    localScores[`${record.id}_${selectedAssessment}`] !== undefined
                      ? localScores[`${record.id}_${selectedAssessment}`]
                      : record.assessments[selectedAssessment]?.scored || 0;

                  return (
                    <tr key={record.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                        {record.studentName}
                      </td>

                      <td className="py-3 px-4 font-mono font-semibold text-slate-700 dark:text-slate-300">
                        {record.rollNumber}
                      </td>

                      {/* Marks Input */}
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            min="0"
                            max={maxMarks}
                            value={currentScore}
                            onChange={(e) => handleScoreChange(record.id, e.target.value)}
                            className="w-20 px-3 py-1.5 text-xs font-mono font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-center"
                          />
                          <span className="text-slate-400 font-mono">/ {maxMarks}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                        {record.totalPercentage}%
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-mono font-extrabold text-sm px-2.5 py-0.5 rounded-md bg-brand-50 text-brand-700 dark:bg-brand-950/70 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                          {record.grade}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <Badge variant={record.status === 'Pass' ? 'success' : 'danger'}>
                          {record.status}
                        </Badge>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleSaveMarks(record)}
                          className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-brand-950 hover:text-brand-600 transition-colors"
                        >
                          Update
                        </button>
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

export default MarksManagement;
