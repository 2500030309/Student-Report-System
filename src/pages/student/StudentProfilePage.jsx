import React from 'react';
import { useAcademicData } from '../../context/AcademicDataContext';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { GraduationCap, Mail, Phone, MapPin, Calendar, ShieldCheck } from 'lucide-react';

export const StudentProfilePage = () => {
  const { students } = useAcademicData();
  const { currentUser } = useAuth();
  const currentStudent = students.find(s => s.id === (currentUser?.id || 'STU2024001')) || students[0];

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          My Academic Identity & Dossier
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Official university student profile and program registration details
        </p>
      </div>

      <Card padding="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <img
            src={currentStudent.avatar}
            alt={currentStudent.name}
            className="w-24 h-24 rounded-3xl object-cover ring-4 ring-brand-500/20 shadow-md"
          />
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {currentStudent.name}
              </h2>
              <Badge variant="primary" size="md" className="font-mono">
                {currentStudent.rollNumber}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {currentStudent.program || 'B.Tech (Hons.) Computer Science & Engineering'} • Semester {currentStudent.semester}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="success" size="sm">
                Enrolled: Fall 2022 Batch
              </Badge>
              <Badge variant="info" size="sm">
                NAAC Tier-1 Cohort
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              Institutional Information
            </h4>
            <div className="space-y-2 text-slate-600 dark:text-slate-300">
              <p><strong className="text-slate-400">Department:</strong> {currentStudent.department}</p>
              <p><strong className="text-slate-400">Current Class Section:</strong> {currentStudent.className || currentStudent.classId}</p>
              <p><strong className="text-slate-400">Institutional Email:</strong> {currentStudent.email}</p>
              <p><strong className="text-slate-400">Emergency Phone:</strong> {currentStudent.phone || '+91 91234 56789'}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              Guardian & Residential Record
            </h4>
            <div className="space-y-2 text-slate-600 dark:text-slate-300">
              <p><strong className="text-slate-400">Parent / Guardian:</strong> {currentStudent.parentName || 'Mr. Ramesh Sharma'}</p>
              <p><strong className="text-slate-400">Parent Phone:</strong> {currentStudent.parentPhone || '+91 98111 22334'}</p>
              <p><strong className="text-slate-400">Residential Address:</strong> {currentStudent.address || 'Flat 402, Green Meadows Apt, Indiranagar, Bengaluru'}</p>
              <p><strong className="text-slate-400">Blood Group:</strong> {currentStudent.bloodGroup || 'B+'}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StudentProfilePage;
