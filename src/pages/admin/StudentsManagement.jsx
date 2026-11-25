import React, { useState } from 'react';
import { useAcademicData } from '../../context/AcademicDataContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import {
  Users,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  AlertTriangle,
  GraduationCap,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

export const StudentsManagement = () => {
  const { students, addStudent, updateStudent, deleteStudent, settings } = useAcademicData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedSem, setSelectedSem] = useState('All');
  const [attendanceFilter, setAttendanceFilter] = useState('All');

  // Modals state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [activeStudent, setActiveStudent] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    department: 'Computer Science & Engineering',
    semester: 5,
    classId: 'CSE-5A',
    cgpa: 8.5,
    attendanceRate: 90,
    parentName: '',
    parentPhone: '',
    address: '',
    bloodGroup: 'B+',
    gender: 'Male',
    facultyRemarks: 'Enthusiastic learner with good aptitude.'
  });

  const resetForm = () => {
    setFormData({
      name: '',
      rollNumber: '',
      email: '',
      department: 'Computer Science & Engineering',
      semester: 5,
      classId: 'CSE-5A',
      cgpa: 8.5,
      attendanceRate: 90,
      parentName: '',
      parentPhone: '',
      address: '',
      bloodGroup: 'B+',
      gender: 'Male',
      facultyRemarks: 'Enthusiastic learner with good aptitude.'
    });
  };

  const handleOpenAdd = () => {
    resetForm();
    setAddModalOpen(true);
  };

  const handleOpenEdit = (student) => {
    setActiveStudent(student);
    setFormData({ ...student });
    setEditModalOpen(true);
  };

  const handleOpenView = (student) => {
    setActiveStudent(student);
    setViewModalOpen(true);
  };

  const handleOpenDelete = (student) => {
    setActiveStudent(student);
    setDeleteModalOpen(true);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addStudent(formData);
    setAddModalOpen(false);
    resetForm();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (activeStudent) {
      updateStudent(activeStudent.id, formData);
      setEditModalOpen(false);
      setActiveStudent(null);
    }
  };

  const handleDeleteConfirm = () => {
    if (activeStudent) {
      deleteStudent(activeStudent.id);
      setDeleteModalOpen(false);
      setActiveStudent(null);
    }
  };

  // Filter students
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = selectedDept === 'All' || s.department.includes(selectedDept);
    const matchesSem = selectedSem === 'All' || s.semester.toString() === selectedSem;

    let matchesAttendance = true;
    const threshold = settings?.attendanceThreshold || 75;
    if (attendanceFilter === 'critical') {
      matchesAttendance = (s.attendanceRate || 0) < threshold;
    } else if (attendanceFilter === 'good') {
      matchesAttendance = (s.attendanceRate || 0) >= threshold;
    }

    return matchesSearch && matchesDept && matchesSem && matchesAttendance;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Student Academic Records
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage student registrations, academic standing, and attendance eligibility
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            icon={Download}
            onClick={() => window.print()}
          >
            Export Roster
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={handleOpenAdd}
            className="shadow-glow"
          >
            Add New Student
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <Card padding="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Department Filter */}
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="All">All Departments</option>
            <option value="Computer Science">Computer Science & Engg</option>
            <option value="Electronics">Electronics & Comm</option>
          </select>

          {/* Semester Filter */}
          <select
            value={selectedSem}
            onChange={(e) => setSelectedSem(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="All">All Semesters</option>
            <option value="3">Semester 3</option>
            <option value="5">Semester 5 (Current)</option>
          </select>

          {/* Attendance Health Filter */}
          <select
            value={attendanceFilter}
            onChange={(e) => setAttendanceFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="All">All Attendance Ranges</option>
            <option value="good">Eligible (≥ 75%)</option>
            <option value="critical">At Risk (&lt; 75%)</option>
          </select>
        </div>
      </Card>

      {/* Student List Table */}
      <Card padding="p-0" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">Roll Number</th>
                <th className="py-3.5 px-4">Class & Sem</th>
                <th className="py-3.5 px-4">Attendance</th>
                <th className="py-3.5 px-4">CGPA</th>
                <th className="py-3.5 px-4">Parent Details</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => {
                  const isLowAttendance = (student.attendanceRate || 0) < (settings?.attendanceThreshold || 75);

                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Name & Avatar */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                          />
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block">
                              {student.name}
                            </span>
                            <span className="text-[11px] text-slate-400 block">
                              {student.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Roll Number */}
                      <td className="py-3.5 px-4 font-mono font-semibold text-slate-700 dark:text-slate-300">
                        {student.rollNumber}
                      </td>

                      {/* Class */}
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          {student.classId}
                        </span>
                        <span className="text-[11px] text-slate-400 block">
                          Sem {student.semester}
                        </span>
                      </td>

                      {/* Attendance */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`font-mono font-bold ${
                              isLowAttendance
                                ? 'text-rose-600 dark:text-rose-400'
                                : 'text-slate-800 dark:text-slate-200'
                            }`}
                          >
                            {student.attendanceRate}%
                          </span>
                          {isLowAttendance ? (
                            <Badge variant="danger" size="sm">
                              Shortage
                            </Badge>
                          ) : (
                            <Badge variant="success" size="sm">
                              Normal
                            </Badge>
                          )}
                        </div>
                      </td>

                      {/* CGPA */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-1.5 font-mono font-extrabold text-brand-700 dark:text-brand-300">
                          <GraduationCap className="w-3.5 h-3.5 text-brand-500" />
                          <span>{student.cgpa}</span>
                        </div>
                      </td>

                      {/* Parent Details */}
                      <td className="py-3.5 px-4">
                        <span className="text-slate-700 dark:text-slate-300 block font-medium">
                          {student.parentName || 'N/A'}
                        </span>
                        <span className="text-[11px] text-slate-400 block font-mono">
                          {student.parentPhone || ''}
                        </span>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <button
                            onClick={() => handleOpenView(student)}
                            title="View Complete Profile"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(student)}
                            title="Edit Student Info"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenDelete(student)}
                            title="Delete Student"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    No students match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Student Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add New Student Registration"
        subtitle="Register a student to the academic database"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Aryan Mittal"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Roll Number *
              </label>
              <input
                type="text"
                required
                value={formData.rollNumber}
                onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                placeholder="e.g. 22CSE050"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. aryan@edutrack.edu"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Class / Section
              </label>
              <select
                value={formData.classId}
                onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="CSE-5A">CSE-5A (Semester 5)</option>
                <option value="CSE-5B">CSE-5B (Semester 5)</option>
                <option value="ECE-5A">ECE-5A (Semester 5)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Parent / Guardian Name
              </label>
              <input
                type="text"
                value={formData.parentName}
                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                placeholder="e.g. Mr. Sanjay Mittal"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Parent Phone
              </label>
              <input
                type="text"
                value={formData.parentPhone}
                onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                placeholder="+91 98111 22334"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Initial CGPA
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={formData.cgpa}
                onChange={(e) => setFormData({ ...formData, cgpa: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Attendance %
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={formData.attendanceRate}
                onChange={(e) => setFormData({ ...formData, attendanceRate: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" size="sm" onClick={() => setAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Student Record
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Student Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Student Information"
        subtitle={`Update records for ${activeStudent?.name} (${activeStudent?.rollNumber})`}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Roll Number
              </label>
              <input
                type="text"
                required
                value={formData.rollNumber || ''}
                onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Cumulative CGPA
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={formData.cgpa || 0}
                onChange={(e) => setFormData({ ...formData, cgpa: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Attendance Percentage
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={formData.attendanceRate || 0}
                onChange={(e) => setFormData({ ...formData, attendanceRate: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Faculty Remarks / Advisory
              </label>
              <textarea
                rows={3}
                value={formData.facultyRemarks || ''}
                onChange={(e) => setFormData({ ...formData, facultyRemarks: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" size="sm" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* View Student Profile Modal */}
      <Modal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title="Student Academic Dossier"
        subtitle="Complete institutional record & faculty evaluations"
        maxWidth="max-w-2xl"
      >
        {activeStudent && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <img
                src={activeStudent.avatar}
                alt={activeStudent.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand-500/30 shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {activeStudent.name}
                  </h3>
                  <Badge variant="primary" size="sm">
                    {activeStudent.rollNumber}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {activeStudent.department} • {activeStudent.className || activeStudent.classId}
                </p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-slate-600 dark:text-slate-300">
                  <span className="flex items-center">
                    <Mail className="w-3.5 h-3.5 mr-1 text-slate-400" />
                    {activeStudent.email}
                  </span>
                  <span className="flex items-center">
                    <Phone className="w-3.5 h-3.5 mr-1 text-slate-400" />
                    {activeStudent.phone || '+91 91234 56789'}
                  </span>
                </div>
              </div>
            </div>

            {/* Performance Snapshot */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/40 dark:border-slate-700/40">
                <span className="text-[10px] uppercase font-bold text-slate-400">CGPA</span>
                <p className="text-lg font-extrabold text-brand-600 dark:text-brand-400 font-mono">
                  {activeStudent.cgpa}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/40 dark:border-slate-700/40">
                <span className="text-[10px] uppercase font-bold text-slate-400">Attendance</span>
                <p className={`text-lg font-extrabold font-mono ${activeStudent.attendanceRate < 75 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {activeStudent.attendanceRate}%
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/40 dark:border-slate-700/40">
                <span className="text-[10px] uppercase font-bold text-slate-400">Semester</span>
                <p className="text-lg font-extrabold text-slate-800 dark:text-slate-200 font-mono">
                  Sem {activeStudent.semester}
                </p>
              </div>
            </div>

            {/* Guardian & Background Info */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                Guardian Details
              </h4>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
                <p><span className="font-semibold text-slate-500">Name:</span> {activeStudent.parentName || 'Mr. Ramesh Sharma'}</p>
                <p><span className="font-semibold text-slate-500">Emergency Phone:</span> {activeStudent.parentPhone || '+91 98111 22334'}</p>
                <p><span className="font-semibold text-slate-500">Residential Address:</span> {activeStudent.address || 'Knowledge City, Bengaluru'}</p>
              </div>
            </div>

            {/* Remarks */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                Faculty Assessment Observation
              </h4>
              <div className="p-3.5 rounded-xl bg-brand-50/60 dark:bg-brand-950/40 border border-brand-200/60 dark:border-brand-900/40 text-slate-700 dark:text-slate-300">
                "{activeStudent.facultyRemarks || 'Student shows consistent commitment and punctuality across laboratory and theory assessments.'}"
                <p className="text-[10px] text-slate-400 mt-2 font-mono">
                  Recorded by: {activeStudent.remarksAuthor || 'Class Incharge'}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="primary" size="sm" onClick={() => setViewModalOpen(false)}>
                Close Profile
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Student Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Student Deletion"
        subtitle="This action will remove the student from active rosters"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Are you sure you want to delete <span className="font-bold">{activeStudent?.name}</span> ({activeStudent?.rollNumber})? This mock data record will be permanently deleted from local storage.
          </p>

          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleDeleteConfirm}>
              Yes, Delete Record
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StudentsManagement;
