// Storage utility to persist all EduTrack application state in localStorage

import {
  MOCK_USERS,
  MOCK_STUDENTS,
  MOCK_FACULTY_LIST,
  MOCK_SUBJECTS,
  MOCK_CLASSES,
  MOCK_MARKS_RECORDS,
  MOCK_ATTENDANCE_SUMMARY,
  MOCK_DAILY_ATTENDANCE,
  MOCK_ANNOUNCEMENTS,
  MOCK_ACTIVITIES,
  MOCK_NOTIFICATIONS,
  INSTITUTION_INFO,
  GRADING_SCALE
} from '../data/mockData';

export const KEYS = {
  CURRENT_USER: 'edutrack_current_user',
  THEME: 'edutrack_theme',
  STUDENTS: 'edutrack_students',
  FACULTY: 'edutrack_faculty',
  SUBJECTS: 'edutrack_subjects',
  CLASSES: 'edutrack_classes',
  MARKS: 'edutrack_marks',
  ATTENDANCE: 'edutrack_attendance',
  DAILY_ATTENDANCE: 'edutrack_daily_attendance',
  ANNOUNCEMENTS: 'edutrack_announcements',
  ACTIVITIES: 'edutrack_activities',
  NOTIFICATIONS: 'edutrack_notifications',
  SETTINGS: 'edutrack_settings',
  INITIALIZED: 'edutrack_initialized_v3'
};

export const initializeStorage = () => {
  if (localStorage.getItem(KEYS.INITIALIZED)) {
    return;
  }

  // First time initialization
  localStorage.setItem(KEYS.STUDENTS, JSON.stringify(MOCK_STUDENTS));
  localStorage.setItem(KEYS.FACULTY, JSON.stringify(MOCK_FACULTY_LIST));
  localStorage.setItem(KEYS.SUBJECTS, JSON.stringify(MOCK_SUBJECTS));
  localStorage.setItem(KEYS.CLASSES, JSON.stringify(MOCK_CLASSES));
  localStorage.setItem(KEYS.MARKS, JSON.stringify(MOCK_MARKS_RECORDS));
  localStorage.setItem(KEYS.ATTENDANCE, JSON.stringify(MOCK_ATTENDANCE_SUMMARY));
  localStorage.setItem(KEYS.DAILY_ATTENDANCE, JSON.stringify(MOCK_DAILY_ATTENDANCE));
  localStorage.setItem(KEYS.ANNOUNCEMENTS, JSON.stringify(MOCK_ANNOUNCEMENTS));
  localStorage.setItem(KEYS.ACTIVITIES, JSON.stringify(MOCK_ACTIVITIES));
  localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(MOCK_NOTIFICATIONS));
  localStorage.setItem(KEYS.SETTINGS, JSON.stringify({
    institution: INSTITUTION_INFO,
    gradingScale: GRADING_SCALE,
    attendanceThreshold: 75,
    academicTerm: "Fall Semester 2024"
  }));

  // Default active user is the Admin
  if (!localStorage.getItem(KEYS.CURRENT_USER)) {
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(MOCK_USERS[0]));
  }

  localStorage.setItem(KEYS.INITIALIZED, 'true');
};

export const getStorageItem = (key, fallback = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return fallback;
  }
};

export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error setting ${key} in localStorage:`, e);
  }
};

export const resetStorage = () => {
  localStorage.removeItem(KEYS.INITIALIZED);
  initializeStorage();
};

export const storageService = {
  getCurrentUser: () => getStorageItem(KEYS.CURRENT_USER, MOCK_USERS[0]),
  setCurrentUser: (user) => setStorageItem(KEYS.CURRENT_USER, user),
  logoutUser: () => localStorage.removeItem(KEYS.CURRENT_USER),

  getTheme: () => localStorage.getItem(KEYS.THEME) || 'light',
  setTheme: (theme) => localStorage.setItem(KEYS.THEME, theme),

  getStudents: () => getStorageItem(KEYS.STUDENTS, MOCK_STUDENTS),
  saveStudents: (students) => setStorageItem(KEYS.STUDENTS, students),
  addStudent: (student) => {
    const list = storageService.getStudents();
    const updated = [student, ...list];
    storageService.saveStudents(updated);
    return updated;
  },
  updateStudent: (studentId, updatedData) => {
    const list = storageService.getStudents();
    const updated = list.map(s => s.id === studentId ? { ...s, ...updatedData } : s);
    storageService.saveStudents(updated);
    return updated;
  },
  deleteStudent: (studentId) => {
    const list = storageService.getStudents();
    const updated = list.filter(s => s.id !== studentId);
    storageService.saveStudents(updated);
    return updated;
  },

  getFaculty: () => getStorageItem(KEYS.FACULTY, MOCK_FACULTY_LIST),
  saveFaculty: (faculty) => setStorageItem(KEYS.FACULTY, faculty),
  addFaculty: (facultyMember) => {
    const list = storageService.getFaculty();
    const updated = [facultyMember, ...list];
    storageService.saveFaculty(updated);
    return updated;
  },

  getSubjects: () => getStorageItem(KEYS.SUBJECTS, MOCK_SUBJECTS),
  saveSubjects: (subjects) => setStorageItem(KEYS.SUBJECTS, subjects),
  getClasses: () => getStorageItem(KEYS.CLASSES, MOCK_CLASSES),

  getMarks: () => getStorageItem(KEYS.MARKS, MOCK_MARKS_RECORDS),
  saveMarks: (marks) => setStorageItem(KEYS.MARKS, marks),
  updateStudentMarks: (recordId, updatedFields) => {
    const marks = storageService.getMarks();
    const updated = marks.map(m => m.id === recordId ? { ...m, ...updatedFields } : m);
    storageService.saveMarks(updated);
    return updated;
  },

  getAttendance: () => getStorageItem(KEYS.DAILY_ATTENDANCE, MOCK_DAILY_ATTENDANCE),
  saveAttendance: (records) => setStorageItem(KEYS.DAILY_ATTENDANCE, records),
  logDailyAttendance: (date, classId, subjectId, statusMap) => {
    const records = storageService.getAttendance();
    const existingIndex = records.findIndex(r => r.date === date && r.classId === classId && r.subjectId === subjectId);
    let updated;
    if (existingIndex >= 0) {
      updated = [...records];
      updated[existingIndex] = { date, classId, subjectId, statusMap };
    } else {
      updated = [{ date, classId, subjectId, statusMap }, ...records];
    }
    storageService.saveAttendance(updated);
    return updated;
  },

  getAnnouncements: () => getStorageItem(KEYS.ANNOUNCEMENTS, MOCK_ANNOUNCEMENTS),
  saveAnnouncements: (announcements) => setStorageItem(KEYS.ANNOUNCEMENTS, announcements),
  addAnnouncement: (item) => {
    const list = storageService.getAnnouncements();
    const updated = [item, ...list];
    storageService.saveAnnouncements(updated);
    return updated;
  },

  getSettings: () => getStorageItem(KEYS.SETTINGS, {
    institution: INSTITUTION_INFO,
    gradingScale: GRADING_SCALE,
    attendanceThreshold: 75,
    academicTerm: "Fall Semester 2024"
  }),
  saveSettings: (settings) => setStorageItem(KEYS.SETTINGS, settings),

  resetAll: () => {
    localStorage.clear();
    initializeStorage();
    window.location.reload();
  }
};
