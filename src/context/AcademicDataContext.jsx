import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService, initializeStorage } from '../utils/storage';

const AcademicDataContext = createContext();

export const AcademicDataProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [marks, setMarks] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    initializeStorage();
    loadAllData();
  }, []);

  const loadAllData = () => {
    setStudents(storageService.getStudents());
    setFaculty(storageService.getFaculty());
    setSubjects(storageService.getSubjects());
    setClasses(storageService.getClasses());
    setMarks(storageService.getMarks());
    setAttendance(storageService.getAttendance());
    setAnnouncements(storageService.getAnnouncements());
    setSettings(storageService.getSettings());
  };

  // Student CRUD
  const addStudent = (studentData) => {
    const newStudent = {
      ...studentData,
      id: studentData.id || `STU${Date.now().toString().slice(-6)}`,
      status: 'Active',
      cgpa: Number(studentData.cgpa) || 8.0,
      attendanceRate: Number(studentData.attendanceRate) || 85.0,
      avatar: studentData.avatar || (studentData.gender === 'Female' 
        ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80')
    };
    const updated = storageService.addStudent(newStudent);
    setStudents(updated);
    return newStudent;
  };

  const updateStudent = (id, fields) => {
    const updated = storageService.updateStudent(id, fields);
    setStudents(updated);
  };

  const deleteStudent = (id) => {
    const updated = storageService.deleteStudent(id);
    setStudents(updated);
  };

  // Faculty CRUD
  const addFaculty = (facultyData) => {
    const newFac = {
      ...facultyData,
      id: facultyData.id || `FAC${Date.now().toString().slice(-4)}`,
      status: 'Active',
      avatar: facultyData.avatar || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80`
    };
    const updated = storageService.addFaculty(newFac);
    setFaculty(updated);
    return newFac;
  };

  const updateFaculty = (id, fields) => {
    const list = storageService.getFaculty();
    const updated = list.map(f => f.id === id ? { ...f, ...fields } : f);
    storageService.saveFaculty(updated);
    setFaculty(updated);
  };

  // Marks Operations
  const updateMarksRecord = (recordId, updatedFields) => {
    const updated = storageService.updateStudentMarks(recordId, updatedFields);
    setMarks(updated);
  };

  const calculateGrade = (percentage) => {
    const scale = settings?.gradingScale || [];
    for (const item of scale) {
      if (percentage >= item.min && percentage <= item.max) {
        return { grade: item.grade, point: item.point, desc: item.description };
      }
    }
    return { grade: 'F', point: 0, desc: 'Fail' };
  };

  // Attendance Operations
  const saveDailyAttendance = (date, classId, subjectId, statusMap) => {
    const updated = storageService.logDailyAttendance(date, classId, subjectId, statusMap);
    setAttendance(updated);
  };

  // Announcement Operations
  const addAnnouncement = (announcementData) => {
    const newItem = {
      ...announcementData,
      id: `ANN${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0]
    };
    const updated = storageService.addAnnouncement(newItem);
    setAnnouncements(updated);
    return newItem;
  };

  // Settings
  const updateSettings = (newSettings) => {
    storageService.saveSettings(newSettings);
    setSettings(newSettings);
  };

  const resetAllData = () => {
    storageService.resetAll();
  };

  const value = {
    students,
    faculty,
    subjects,
    classes,
    marks,
    attendance,
    dailyAttendance: attendance,
    announcements,
    settings,
    addStudent,
    updateStudent,
    deleteStudent,
    addFaculty,
    updateFaculty,
    updateMarksRecord,
    updateMarks: updateMarksRecord,
    updateStudentMarks: updateMarksRecord,
    calculateGrade,
    saveDailyAttendance,
    addAnnouncement,
    updateSettings,
    resetAllData,
    refreshData: loadAllData
  };

  return (
    <AcademicDataContext.Provider value={value}>
      {children}
    </AcademicDataContext.Provider>
  );
};

export const useAcademicData = () => {
  const context = useContext(AcademicDataContext);
  if (!context) {
    throw new Error('useAcademicData must be used within an AcademicDataProvider');
  }
  return context;
};

// Aliases for compatibility
export const useData = useAcademicData;
export const DataProvider = AcademicDataProvider;
export default AcademicDataProvider;
