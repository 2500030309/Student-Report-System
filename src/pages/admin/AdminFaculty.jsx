import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Card, Badge, Modal } from '../../components/common/Card';
import {
  GraduationCap,
  Search,
  Plus,
  Mail,
  Phone,
  BookOpen,
  Award,
  Edit,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';

export const AdminFaculty = () => {
  const { faculty, subjects, addFaculty, updateFaculty } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [modalError, setModalError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    designation: 'Assistant Professor',
    department: 'Computer Science & Engineering',
    qualification: 'M.Tech / Ph.D',
    experience: '5 Years',
    specialization: 'Design & Analysis of Algorithms'
  });

  const filteredFaculty = faculty.filter(f =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isEmailValid = formData.email.includes('@') && formData.email.length >= 3;
  const isPasswordValid = formData.password.trim().length >= 4;

  const handleSaveAdd = (e) => {
    e.preventDefault();
    setModalError('');

    if (!formData.name.trim()) {
      setModalError('Please enter faculty full name');
      return;
    }

    if (!isEmailValid) {
      setModalError('Please enter a valid institutional email containing "@"');
      return;
    }

    if (!isPasswordValid) {
      setModalError('Password must be at least 4 characters long');
      return;
    }

    addFaculty({
      ...formData,
      subjects: [formData.specialization || 'Design & Analysis of Algorithms']
    });

    setIsAddModalOpen(false);
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      designation: 'Assistant Professor',
      department: 'Computer Science & Engineering',
      qualification: 'M.Tech / Ph.D',
      experience: '5 Years',
      specialization: 'Design & Analysis of Algorithms'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Faculty & Department Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Manage academic faculty, subject in-charges, and teaching workloads.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-all shadow-glow flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Faculty Member</span>
        </button>
      </div>

      {/* Search Input */}
      <Card className="p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search faculty by name, department, designation..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
          />
        </div>
      </Card>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFaculty.map((item) => (
          <Card key={item.id} className="p-5 flex flex-col justify-between hover:shadow-card transition-all">
            <div className="space-y-4">
              <div className="flex items-start space-x-3.5">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-brand-500/20 flex-shrink-0"
                />
                <div className="overflow-hidden">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white truncate">
                    {item.name}
                  </h3>
                  <p className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                    {item.designation}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">{item.department}</p>
                </div>
              </div>

              <div className="pt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{item.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>{item.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>{item.qualification} • {item.experience}</span>
                </div>
              </div>

              {/* Assigned Subjects */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Allocated Subjects
                </span>
                <div className="flex flex-wrap gap-1">
                  {(item.subjects || []).map((subj, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-medium text-slate-700 dark:text-slate-300"
                    >
                      {subj}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <Badge variant="success">Active Faculty</Badge>
              <span className="text-xs text-slate-400">ID: {item.id}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Faculty Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => { setIsAddModalOpen(false); setModalError(''); }}
        title="Add Faculty Member (Runtime Creation)"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleSaveAdd} className="space-y-3.5 text-xs">
          {modalError && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{modalError}</span>
            </div>
          )}

          <div>
            <label className="block font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Dr. Arvind Swaminathan"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-bold uppercase text-slate-600 dark:text-slate-400">
                  Email (With @) *
                </label>
                {formData.email && (
                  <span className={`text-[10px] font-bold ${isEmailValid ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {isEmailValid ? '✓ Valid @' : '✗ Missing @'}
                  </span>
                )}
              </div>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="faculty@edutrack.edu"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-bold uppercase text-slate-600 dark:text-slate-400">
                  Password (&ge;4 chars) *
                </label>
                {formData.password && (
                  <span className={`text-[10px] font-bold ${isPasswordValid ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {isPasswordValid ? '✓ OK' : `${formData.password.length}/4`}
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Min 4 characters"
                  className="w-full pl-3 pr-8 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Designation
              </label>
              <select
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              >
                <option value="Professor & HOD">Professor & HOD</option>
                <option value="Associate Professor">Associate Professor</option>
                <option value="Assistant Professor">Assistant Professor</option>
                <option value="Senior Lecturer">Senior Lecturer</option>
                <option value="Adjunct Lecturer">Adjunct Lecturer</option>
              </select>
            </div>
            <div>
              <label className="block font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Department
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              >
                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics & Communication">Electronics & Communication</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Qualification
              </label>
              <input
                type="text"
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                placeholder="e.g. Ph.D, M.Tech"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Allocated Subject
              </label>
              <input
                type="text"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                placeholder="e.g. Artificial Intelligence"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 98450 12345"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => { setIsAddModalOpen(false); setModalError(''); }}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 shadow-glow"
            >
              Save & Create Faculty Login
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminFaculty;
