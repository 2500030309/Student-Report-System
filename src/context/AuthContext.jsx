import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USERS } from '../data/mockData';
import { getStorageItem, setStorageItem, KEYS } from '../utils/storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = getStorageItem(KEYS.CURRENT_USER);
    return stored || null;
  });

  useEffect(() => {
    if (user) {
      setStorageItem(KEYS.CURRENT_USER, user);
    }
  }, [user]);

  const login = (email, password, selectedRole) => {
    // 1. If explicit role selected from demo persona
    if (selectedRole) {
      const demoTarget = MOCK_USERS.find(u => u.role === selectedRole);
      if (demoTarget) {
        setUser(demoTarget);
        return { success: true, user: demoTarget };
      }
    }

    const cleanEmail = email?.trim().toLowerCase();
    const cleanPass = password?.trim();

    // 2. Check all students in localStorage (including runtime-created students!)
    const allStudents = getStorageItem(KEYS.STUDENTS, []);
    const foundStudent = allStudents.find(
      s => (s.email && s.email.toLowerCase() === cleanEmail) ||
           (s.rollNumber && s.rollNumber.toLowerCase() === cleanEmail)
    );

    if (foundStudent) {
      // Validate password if student record has a password set
      if (foundStudent.password && cleanPass && foundStudent.password !== cleanPass) {
        return { success: false, error: 'Incorrect password for this student account. Please try again.' };
      }

      const studentUser = {
        id: foundStudent.id,
        role: 'student',
        name: foundStudent.name,
        email: foundStudent.email,
        rollNumber: foundStudent.rollNumber,
        department: foundStudent.department || 'Computer Science & Engineering',
        className: foundStudent.className || 'B.Tech CSE - Sem 5A',
        classId: foundStudent.classId || 'CSE-5A',
        semester: foundStudent.semester || 5,
        cgpa: foundStudent.cgpa || 8.5,
        attendanceRate: foundStudent.attendanceRate || 90.0,
        avatar: foundStudent.avatar || (foundStudent.gender === 'Female'
          ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80')
      };

      setUser(studentUser);
      return { success: true, user: studentUser };
    }

    // 3. Check demo user accounts by email
    const demoByEmail = MOCK_USERS.find(u => u.email.toLowerCase() === cleanEmail);
    if (demoByEmail) {
      setUser(demoByEmail);
      return { success: true, user: demoByEmail };
    }

    // 4. If email contains @ and password is provided, fallback/create student session
    return {
      success: false,
      error: 'Account not found with this email. Click "Create Student Account" above to register!'
    };
  };

  const registerStudent = (studentData) => {
    const name = studentData.name?.trim();
    const email = studentData.email?.trim().toLowerCase();
    const password = studentData.password?.trim();

    // Strict Validation:
    // 1. Email must contain '@'
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address containing "@"' };
    }

    // 2. Password minimum 4 characters
    if (!password || password.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters long' };
    }

    if (!name) {
      return { success: false, error: 'Please enter student full name' };
    }

    const allStudents = getStorageItem(KEYS.STUDENTS, []);
    const existing = allStudents.find(s => s.email && s.email.toLowerCase() === email);
    if (existing) {
      return { success: false, error: 'An account with this email already exists. Please sign in!' };
    }

    const rollNo = studentData.rollNumber?.trim() || `22CSE0${Math.floor(Math.random() * 89) + 10}`;
    const newStudent = {
      id: `STU${Date.now()}`,
      name,
      email,
      password, // Stored password (min 4 chars)
      rollNumber: rollNo,
      department: studentData.department || 'Computer Science & Engineering',
      className: studentData.className || 'B.Tech CSE - Sem 5A',
      classId: studentData.classId || 'CSE-5A',
      semester: Number(studentData.semester) || 5,
      gender: studentData.gender || 'Male',
      cgpa: 8.5,
      attendanceRate: 90.0,
      avatar: studentData.gender === 'Female'
        ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      parentName: studentData.parentName || '',
      parentPhone: studentData.parentPhone || '',
      facultyRemarks: 'Enrolled student account. Good academic standing.',
      status: 'Active'
    };

    // Save to localStorage
    const updated = [newStudent, ...allStudents];
    setStorageItem(KEYS.STUDENTS, updated);

    // Create session
    const studentUser = {
      id: newStudent.id,
      role: 'student',
      name: newStudent.name,
      email: newStudent.email,
      rollNumber: newStudent.rollNumber,
      department: newStudent.department,
      className: newStudent.className,
      classId: newStudent.classId,
      semester: newStudent.semester,
      cgpa: newStudent.cgpa,
      attendanceRate: newStudent.attendanceRate,
      avatar: newStudent.avatar
    };

    setUser(studentUser);
    return { success: true, user: studentUser };
  };

  const switchRole = (role) => {
    const found = MOCK_USERS.find(u => u.role === role);
    if (found) {
      setUser(found);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(KEYS.CURRENT_USER);
  };

  const updateProfile = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        currentUser: user,
        isAuthenticated: !!user,
        role: user ? user.role : null,
        login,
        registerStudent,
        switchRole,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
