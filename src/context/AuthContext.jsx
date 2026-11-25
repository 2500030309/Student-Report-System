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
    // Frontend demo authentication
    let target = null;
    if (selectedRole) {
      target = MOCK_USERS.find(u => u.role === selectedRole);
    } else if (email) {
      target = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    }

    if (!target) {
      target = MOCK_USERS.find(u => u.role === (selectedRole || 'admin')) || MOCK_USERS[0];
    }

    setUser(target);
    return { success: true, user: target };
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
