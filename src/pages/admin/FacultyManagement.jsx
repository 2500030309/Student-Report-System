import React, { useState } from 'react';
import { useAcademicData } from '../../context/AcademicDataContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import {
  GraduationCap,
  Plus,
  Mail,
  Phone,
  BookOpen,
  Calendar,
  Award,
  Search,
  CheckCircle2
} from 'lucide-react';

export const FacultyManagement = () => {
  const { faculty, addFaculty } = useAcademicData();
  const [searchTerm, setSearchTerm] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    designation: 'Assistant Professor',
    department: 'Computer Science & Engineering',
    qualification: 'M.Tech (Computer Science)',
    experience: '5 Years',
    subjects: 'Design & Analysis of Algorithms'
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addFaculty({
      ...formData,
      subjects: formData.subjects.split(',').map(s => s.trim()),
      assignedClasses: ['CSE-5A']
    });
    setAddModalOpen(false);
  };

  const filteredFaculty = faculty.filter(f =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Faculty & Department Guides
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Department professors, mentors, and class coordinators
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => setAddModalOpen(true)}
            className="shadow-glow"
          >
            Add Faculty Member
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <Card padding="p-4">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search faculty by name or designation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </Card>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.map((fac) => (
          <Card key={fac.id} padding="p-6" hover className="flex flex-col justify-between">
            <div>
              <div className="flex items-start space-x-4">
                <img
                  src={fac.avatar}
                  alt={fac.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-brand-500/20 shrink-0"
                />
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {fac.name}
                  </h3>
                  <Badge variant="primary" size="sm" className="mt-1">
                    {fac.designation}
                  </Badge>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
                    {fac.department}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2 text-xs">
                <div className="flex items-center text-slate-600 dark:text-slate-300">
                  <GraduationCap className="w-3.5 h-3.5 mr-2 text-brand-500 shrink-0" />
                  <span>{fac.qualification} • {fac.experience} Exp</span>
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-300">
                  <Mail className="w-3.5 h-3.5 mr-2 text-slate-400 shrink-0" />
                  <span className="truncate">{fac.email}</span>
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-300">
                  <Phone className="w-3.5 h-3.5 mr-2 text-slate-400 shrink-0" />
                  <span>{fac.phone}</span>
                </div>
              </div>

              {/* Assigned Subjects */}
              <div className="mt-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Assigned Subjects
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(Array.isArray(fac.subjects) ? fac.subjects : []).map((subj, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {subj}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Active Guide
              </span>
              <span className="text-[11px] font-mono text-slate-400">ID: {fac.id}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Faculty Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add New Faculty Member"
        subtitle="Register an academic instructor or guide"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Full Name with Prefix *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Dr. Anand Verma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Designation
              </label>
              <select
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option>Assistant Professor</option>
                <option>Associate Professor</option>
                <option>Professor & Head of Dept</option>
                <option>Visiting Lecturer</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Experience
              </label>
              <input
                type="text"
                placeholder="e.g. 8 Years"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="faculty@edutrack.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="+91 98450 12345"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Assigned Subjects (comma-separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Machine Learning, Cloud Computing"
              value={formData.subjects}
              onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" size="sm" onClick={() => setAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Faculty Record
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FacultyManagement;
