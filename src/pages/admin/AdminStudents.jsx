import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Card, Badge, Modal } from '../../components/common/Card';
import {
  Users,
  Search,
  Plus,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  AlertTriangle,
  Mail,
  Phone,
  GraduationCap,
  CheckCircle,
  X
} from 'lucide-react';

export const AdminStudents = () => {
  const { students, classes, addStudent, updateStudent, deleteStudent, settings } = useData();
  const threshold = settings?.attendanceThreshold || 75;

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [attendanceFilter, setAttendanceFilter] = useState('All');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [activeStudent, setActiveStudent] = useState(null);

  // Form State
  const initialFormState = {
    name: '',
    rollNumber: '',
    email: '',
    password: 'password123',
    gender: 'Male',
    department: 'Computer Science & Engineering',
    classId: 'CSE-5A',
    className: 'B.Tech CSE - Sem 5A',
    semester: 5,
    cgpa: 8.0,
    attendanceRate: 85.0,
    parentName: '',
    parentPhone: '',
    bloodGroup: 'O+',
    facultyRemarks: ''
  };
  const [formData, setFormData] = useState(initialFormState);

  
  const filteredStudents = students.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClass = selectedClass === 'All' || s.classId === selectedClass;

    const matchesAttendance =
      attendanceFilter === 'All'
        ? true
        : attendanceFilter === 'low'
        ? s.attendanceRate < threshold
        : s.attendanceRate >= threshold;

    return matchesSearch && matchesClass && matchesAttendance;
  });

  const handleOpenAdd = () => {
    setFormData(initialFormState);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (student) => {
    setActiveStudent(student);
    setFormData(student);
    setIsEditModalOpen(true);
  };

  const handleOpenView = (student) => {
    setActiveStudent(student);
    setIsViewModalOpen(true);
  };

  const handleOpenDelete = (student) => {
    setActiveStudent(student);
    setIsDeleteModalOpen(true);
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.email.includes('@')) {
      alert('Please enter a valid email address containing "@"');
      return;
    }
    if (!formData.password || formData.password.trim().length < 4) {
      alert('Password must be at least 4 characters long');
      return;
    }
    addStudent(formData);
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (activeStudent) {
      updateStudent(activeStudent.id, formData);
      setIsEditModalOpen(false);
    }
  };

  const handleConfirmDelete = () => {
    if (activeStudent) {
      deleteStudent(activeStudent.id);
      setIsDeleteModalOpen(false);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Roll Number,Name,Email,Class,Semester,Attendance Rate,CGPA,Status\n'];
    const rows = filteredStudents.map(
      s => `${s.rollNumber},"${s.name}",${s.email},${s.classId},${s.semester},${s.attendanceRate}%,${s.cgpa},${s.status}`
    );
    const blob = new Blob([headers.concat(rows.join('\n'))], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EduTrack_Students_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Student Academic Records
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Manage student enrollments, profiles, attendance thresholds, and grade metrics.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center space-x-1.5"
          >
            <Download className="w-4 h-4 text-slate-400" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-all shadow-glow flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Student</span>
          </button>
        </div>
      </div>

      {/* Search & Filters Card */}
      <Card className="p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="sm:col-span-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, roll number, or email..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            />
          </div>

          {/* Class Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            >
              <option value="All">All Classes</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.id} - {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Attendance Status Filter */}
          <div className="sm:col-span-3">
            <select
              value={attendanceFilter}
              onChange={(e) => setAttendanceFilter(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            >
              <option value="All">All Attendance</option>
              <option value="low">Critical (&lt; {threshold}%)</option>
              <option value="normal">Satisfactory (&ge; {threshold}%)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
          <span>Showing <strong>{filteredStudents.length}</strong> of {students.length} enrolled students</span>
          {attendanceFilter === 'low' && (
            <span className="text-rose-600 font-semibold flex items-center space-x-1">
              <AlertTriangle className="w-3.5 h-3.5 mr-1" /> Filtering by critical attendance shortage
            </span>
          )}
        </div>
      </Card>

      {/* Students Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Student Details</th>
                <th className="px-4 py-4">Class / Sem</th>
                <th className="px-4 py-4">Attendance</th>
                <th className="px-4 py-4">Current CGPA</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-400 text-sm">
                    No students match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  const isLowAttendance = student.attendanceRate < threshold;
                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Name & Roll */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-100 dark:ring-slate-800 flex-shrink-0"
                          />
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">
                              {student.name}
                            </p>
                            <div className="flex items-center space-x-2 text-xs text-slate-400">
                              <span className="font-mono">{student.rollNumber}</span>
                              <span>•</span>
                              <span>{student.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Class */}
                      <td className="px-4 py-4 text-xs">
                        <p className="font-semibold text-slate-800 dark:text-slate-200">
                          {student.classId}
                        </p>
                        <p className="text-slate-400">Semester {student.semester}</p>
                      </td>

                      {/* Attendance */}
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`font-mono text-xs font-bold px-2 py-0.5 rounded-full border ${
                              isLowAttendance
                                ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200'
                                : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200'
                            }`}
                          >
                            {student.attendanceRate}%
                          </span>
                          {isLowAttendance && (
                            <AlertTriangle className="w-4 h-4 text-rose-500" title="Below institutional threshold" />
                          )}
                        </div>
                      </td>

                      {/* CGPA */}
                      <td className="px-4 py-4">
                        <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300">
                          {student.cgpa} / 10.0
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <Badge variant="success">{student.status}</Badge>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <button
                            onClick={() => handleOpenView(student)}
                            title="View Full Profile"
                            className="p-1.5 text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(student)}
                            title="Edit Student"
                            className="p-1.5 text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenDelete(student)}
                            title="Delete Student"
                            className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Student Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Enroll New Student"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSaveAdd} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Rahul Verma"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Roll Number
              </label>
              <input
                type="text"
                required
                value={formData.rollNumber}
                onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                placeholder="e.g. 22CSE050"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Email Address (Must contain @) *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="student@gmail.com"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Account Password (Min 4 chars) *
              </label>
              <input
                type="text"
                required
                minLength={4}
                value={formData.password || ''}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter password (min 4 chars)"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Class / Section
              </label>
              <select
                value={formData.classId}
                onChange={(e) => {
                  const selClass = classes.find(c => c.id === e.target.value);
                  setFormData({
                    ...formData,
                    classId: e.target.value,
                    className: selClass ? selClass.name : e.target.value,
                    semester: selClass ? selClass.semester : 5
                  });
                }}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              >
                {classes.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Initial CGPA
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={formData.cgpa}
                onChange={(e) => setFormData({ ...formData, cgpa: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Parent / Guardian Name
              </label>
              <input
                type="text"
                value={formData.parentName}
                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                placeholder="Mr. Verma"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Parent Contact Phone
              </label>
              <input
                type="tel"
                value={formData.parentPhone}
                onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                placeholder="+91 98000 11223"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 shadow-glow"
            >
              Save Student Record
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Student Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Edit Student: ${activeStudent?.name}`}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Roll Number
              </label>
              <input
                type="text"
                required
                value={formData.rollNumber}
                onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Attendance Percentage (%)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={formData.attendanceRate}
                onChange={(e) => setFormData({ ...formData, attendanceRate: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Cumulative CGPA
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={formData.cgpa}
                onChange={(e) => setFormData({ ...formData, cgpa: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Faculty Academic Remarks
              </label>
              <textarea
                rows="3"
                value={formData.facultyRemarks || ''}
                onChange={(e) => setFormData({ ...formData, facultyRemarks: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              ></textarea>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 shadow-glow"
            >
              Update Record
            </button>
          </div>
        </form>
      </Modal>

      {/* View Student Profile Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Student Profile Overview"
        maxWidth="max-w-xl"
      >
        {activeStudent && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <img
                src={activeStudent.avatar}
                alt={activeStudent.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand-500/30"
              />
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {activeStudent.name}
                </h3>
                <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold font-mono">
                  {activeStudent.rollNumber} • {activeStudent.className}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{activeStudent.department}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block font-medium">Attendance Rate</span>
                <span className="text-base font-bold font-mono text-slate-900 dark:text-white">
                  {activeStudent.attendanceRate}%
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block font-medium">Cumulative CGPA</span>
                <span className="text-base font-bold font-mono text-slate-900 dark:text-white">
                  {activeStudent.cgpa} / 10.0
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block font-medium">Parent / Guardian</span>
                <span className="text-xs font-semibold text-slate-900 dark:text-white">
                  {activeStudent.parentName || 'Mr. Sharma'}
                </span>
                <span className="text-[10px] text-slate-400 block">{activeStudent.parentPhone || '+91 98111 22334'}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block font-medium">Residential Address</span>
                <span className="text-xs text-slate-700 dark:text-slate-300 line-clamp-2">
                  {activeStudent.address || 'Knowledge City Campus, Bengaluru'}
                </span>
              </div>
            </div>

            {activeStudent.facultyRemarks && (
              <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-xs">
                <p className="font-bold text-indigo-950 dark:text-indigo-300 mb-1">
                  Faculty Observation:
                </p>
                <p className="text-indigo-900/80 dark:text-indigo-200/80 italic">
                  "{activeStudent.facultyRemarks}"
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Student Deletion"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Are you sure you want to remove <strong>{activeStudent?.name}</strong> ({activeStudent?.rollNumber}) from institutional records?
          </p>
          <p className="text-xs text-rose-500">
            This action will update local storage state and unenroll the student from active sections.
          </p>
          <div className="pt-2 flex justify-end space-x-2">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700"
            >
              Confirm Removal
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminStudents;
