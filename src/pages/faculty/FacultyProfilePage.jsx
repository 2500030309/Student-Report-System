import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { GraduationCap, Mail, Phone, Calendar, Clock, BookOpen } from 'lucide-react';

export const FacultyProfilePage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Faculty Academic Profile
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Academic credentials, department appointments, and teaching schedule
        </p>
      </div>

      <Card padding="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <img
            src={currentUser?.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"}
            alt={currentUser?.name}
            className="w-24 h-24 rounded-3xl object-cover ring-4 ring-brand-500/20 shadow-md"
          />
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {currentUser?.name || 'Prof. Sneha Sen'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Associate Professor & Class Incharge (CSE-5A)
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="primary" size="sm">
                Dept. of Computer Science
              </Badge>
              <Badge variant="success" size="sm">
                9+ Years Academic Experience
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="space-y-2">
            <p><strong className="text-slate-400">Qualification:</strong> M.Tech (CSE), Ph.D (Pursuing)</p>
            <p><strong className="text-slate-400">Email:</strong> {currentUser?.email || 'faculty@edutrack.edu'}</p>
            <p><strong className="text-slate-400">Phone:</strong> +91 98450 67890</p>
          </div>
          <div className="space-y-2">
            <p><strong className="text-slate-400">Assigned Sections:</strong> CSE-5A, CSE-5B</p>
            <p><strong className="text-slate-400">Office Room:</strong> Tech Block - Room 412</p>
            <p><strong className="text-slate-400">Counseling Hours:</strong> 03:00 PM - 05:00 PM (Mon-Thu)</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FacultyProfilePage;
