import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAcademicData } from '../../context/AcademicDataContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { Mail, Phone, HeartHandshake, UserCheck, ShieldCheck } from 'lucide-react';

export const ParentProfilePage = () => {
  const { currentUser } = useAuth();
  const { students } = useAcademicData();
  const child = students.find(s => s.id === 'STU2024001') || students[0];

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Parent / Guardian Profile
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Registered primary contact and parent-teacher communication preferences
        </p>
      </div>

      <Card padding="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <img
            src={currentUser?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"}
            alt={currentUser?.name}
            className="w-24 h-24 rounded-3xl object-cover ring-4 ring-brand-500/20 shadow-md shrink-0"
          />
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {currentUser?.name || "Mr. Ramesh Sharma"}
              </h2>
              <Badge variant="primary" size="sm">Verified Parent</Badge>
            </div>
            <p className="text-xs font-semibold text-brand-600 dark:text-brand-400">
              Primary Guardian of {child.name} ({child.rollNumber})
            </p>
            <p className="text-xs text-slate-500">
              Occupation: Senior Technical Architect • Relation: Father
            </p>
            <div className="flex items-center space-x-4 pt-2 text-xs text-slate-600 dark:text-slate-300">
              <span className="flex items-center"><Mail className="w-3.5 h-3.5 mr-1 text-slate-400" /> {currentUser?.email || "parent@edutrack.edu"}</span>
              <span className="flex items-center"><Phone className="w-3.5 h-3.5 mr-1 text-slate-400" /> {currentUser?.phone || "+91 98111 22334"}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Linked Student Ward</span>
            <p className="text-sm font-bold text-slate-900 dark:text-white">{child.name}</p>
            <p className="text-slate-500">{child.program} • {child.className}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Notification Channels</span>
            <p className="font-semibold text-emerald-600 flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" /> SMS & Email Alerts Enabled
            </p>
            <p className="text-slate-500">Instant notification on attendance &lt; 75% or new exam results</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ParentProfilePage;
