import React, { useState } from 'react';
import { useAcademicData } from '../../context/AcademicDataContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { MessageSquare, Save, CheckCircle2, Search, Edit } from 'lucide-react';

export const StudentRemarksPage = () => {
  const { students, updateStudent } = useAcademicData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [remarksText, setRemarksText] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleOpenEdit = (student) => {
    setSelectedStudent(student);
    setRemarksText(student.facultyRemarks || '');
  };

  const handleSaveRemarks = (e) => {
    e.preventDefault();
    if (selectedStudent) {
      updateStudent(selectedStudent.id, {
        facultyRemarks: remarksText,
        remarksDate: new Date().toISOString().split('T')[0],
        remarksAuthor: 'Prof. Sneha Sen'
      });
      setSelectedStudent(null);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Student Observations & Remarks
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Section 7 • Provide qualitative feedback on academic performance and laboratory conduct
          </p>
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search candidate..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center space-x-2 animate-slide-up">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Feedback remark stored and synced to Student & Parent Dashboards!</span>
        </div>
      )}

      {/* Remarks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStudents.map((s) => (
          <Card key={s.id} padding="p-5" hover className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={s.avatar}
                    alt={s.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {s.name}
                    </h4>
                    <span className="font-mono text-[11px] text-slate-400">
                      {s.rollNumber} • {s.classId}
                    </span>
                  </div>
                </div>
                <Badge variant={s.attendanceRate < 75 ? 'danger' : 'primary'} size="sm">
                  {s.attendanceRate}% Att.
                </Badge>
              </div>

              <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 italic">
                "{s.facultyRemarks || 'No formal observations submitted yet.'}"
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>Date: {s.remarksDate || '15-Nov-2024'}</span>
              <Button
                variant="outline"
                size="xs"
                icon={Edit}
                onClick={() => handleOpenEdit(s)}
              >
                Update Remark
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Edit Remark Modal */}
      {selectedStudent && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={`Update Remarks for ${selectedStudent.name}`}
          subtitle={`Roll: ${selectedStudent.rollNumber} • ${selectedStudent.classId}`}
          maxWidth="max-w-lg"
        >
          <form onSubmit={handleSaveRemarks} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Academic & Behavioral Observations *
              </label>
              <textarea
                rows={4}
                required
                value={remarksText}
                onChange={(e) => setRemarksText(e.target.value)}
                placeholder="Enter formal observations regarding academic dedication, lab submissions, attendance, or areas needing improvement..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedStudent(null)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" icon={Save}>
                Save & Broadcast Remark
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default StudentRemarksPage;
